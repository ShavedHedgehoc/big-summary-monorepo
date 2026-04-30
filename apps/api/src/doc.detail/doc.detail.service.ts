import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Doc from '../docs/docs.model';
import { DocsService } from '../docs/docs.service';
import { HistoriesService } from '../histories/histories.service';
import Record from '../records/records.model';
import { RecordsService } from '../records/records.service';
import { GetCurrentDocDto } from './dto/get-current-doc.dto';
import { GetDocByIdDto } from './dto/get-doc-by-id.dto';
import { SemiProductsService } from '../semi_products/semi_products.service';
import { RecordRegulationsService } from '../record_regulations/record_regulations.service';
import { TimeReportDto } from './dto/time-report.dto';
import { RecordCountersService } from '../record_counters/record_counters.service';

export interface RecordResultDto {
  id: number;
  productId: string;
  product: string;
  boil: string;
  plan: number;
  fact: number;
  apparatus: string;
  bbf: string;
  dm: any;
  note: string;
  can: string;
  conveyor: string;
  workshop: string;
  historiesCount: number;
  state: string;
  stateValue: any;
  stateTime: Date | null;
  isUpdated: boolean;
  isSet: boolean;
  semiProducts: any[];
  regulation: any;
  water_base_id: number;
  plant_id: number;
  history_note: any;
}

export interface DocDetailResponse {
  id?: number;
  plant?: string;
  records: RecordResultDto[];
}

interface TimeResultDto {
  id: number;
  state: string;
  stateValue: string | null;
  conveyor: string | null;
  productId: string | null;
  product: string | null;
  boil: string;
  plan: number;
  lastBaseCheck: Date | null;
  lastPlugPass: Date | null;
  lastProductCheck: Date | null;
  lastProductPass: Date | null;
  lastProductInProgress: Date | null;
  lastProductFinished: Date | null;
}

export interface TimeReportResponse {
  records: TimeResultDto[];
}

@Injectable()
export class DocDetailService {
  constructor(
    private docsService: DocsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
    private semiProductsService: SemiProductsService,
    private recordRegulationsService: RecordRegulationsService,
    private recordsCountersService: RecordCountersService,
  ) {}

  private async handleDocRequest(
    docPromise: Promise<Doc | null>,
    formatter: (doc: Doc) => Promise<DocDetailResponse>,
  ): Promise<DocDetailResponse> {
    const doc = await docPromise;
    if (!doc) {
      return { records: [] };
    }
    return formatter(doc);
  }

  private async formatDocResponse(doc: Doc, records: Record[]): Promise<DocDetailResponse> {
    const recordsResult = await Promise.all(records.map((item) => this.recordResult(item)));
    const { plants: _plants, ...docPlain } = doc.get({ plain: true });
    return {
      ...docPlain,
      plant: doc.plants?.value,
      records: recordsResult,
    };
  }

  private async recordResult(item: Record): Promise<RecordResultDto> {
    const [histories, semiProducts, regulation, doc, fact] = await Promise.all([
      this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id),
      this.semiProductsService.getSemiProductsByRecordId(item.id),
      this.recordRegulationsService.getByRecordId(item.id),
      item.$get('doc'),
      this.recordsCountersService.getTaskSum(item.id),
    ]);

    const historiesCount = histories.length;
    const lastHistory = historiesCount > 0 ? histories[historiesCount - 1] : null;
    const state = lastHistory?.historyType?.description ?? '-';
    const stateValue = lastHistory?.historyType?.value ?? null;
    const stateTime = (lastHistory?.createdAt as Date) ?? null;

    const isUpdated = stateTime ? Date.now() - new Date(stateTime).getTime() < 120000 : false;

    const historyNoteValue = lastHistory?.history_note?.value ?? null;

    return {
      id: item.id,
      productId: item.product?.code1C,
      product: item.product?.marking,
      boil: item.boil?.value ?? '-',
      plan: item.plan,
      fact: fact,
      apparatus: item.apparatus?.value ?? '-',
      bbf: item.bbf,
      dm: item.dm,
      note: item.note,
      can: item.can ? item.can.value : '-',
      conveyor: item.conveyor?.value,
      workshop: item.workshop?.value,
      historiesCount: historiesCount,
      state: state,
      stateValue: stateValue,
      stateTime: stateTime,
      isUpdated: isUpdated,
      isSet: item.isSet,
      semiProducts: semiProducts,
      regulation: regulation,
      water_base_id: item.water_base_id,
      plant_id: doc!.plantId,
      history_note: historyNoteValue,
    };
  }

  private async timeResult(item: Record): Promise<TimeResultDto> {
    const [
      histories,
      lastBaseCheck,
      lastPlugPass,
      lastProductCheck,
      lastProductPass,
      lastProductInProgress,
      lastProductFinished,
    ] = await Promise.all([
      this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id),
      this.historiesService.getLastBaseCheck(item.water_base_id),
      this.historiesService.getLastPlugPass(item.water_base_id),
      this.historiesService.getLastProductCheck(item.id),
      this.historiesService.getLastProductPass(item.id),
      this.historiesService.getLastProductInProgress(item.id),
      this.historiesService.getLastProductFinished(item.id),
    ]);

    const lastHistory = histories.length > 0 ? histories[histories.length - 1] : null;

    return {
      id: item.id,
      state: lastHistory?.historyType?.description ?? '-',
      stateValue: lastHistory?.historyType?.value ?? null,
      conveyor: item.conveyor?.value,
      productId: item.product?.code1C,
      product: item.product?.marking,
      boil: item.boil?.value ?? '-',
      plan: item.plan,
      lastBaseCheck: (lastBaseCheck?.createdAt as Date) ?? null,
      lastPlugPass: (lastPlugPass?.createdAt as Date) ?? null,
      lastProductCheck: (lastProductCheck?.createdAt as Date) ?? null,
      lastProductPass: (lastProductPass?.createdAt as Date) ?? null,
      lastProductInProgress: (lastProductInProgress?.createdAt as Date) ?? null,
      lastProductFinished: (lastProductFinished?.createdAt as Date) ?? null,
    };
  }

  async getDocDetailData(doc: Doc): Promise<DocDetailResponse> {
    const records = await this.recordsService.getRecordsByDocId(doc.id);
    return this.formatDocResponse(doc, records);
  }

  async getAppDocDetailData(doc: Doc): Promise<DocDetailResponse> {
    const records = await this.recordsService.getAppRecordsByDocId(doc.id);
    return this.formatDocResponse(doc, records);
  }

  async getDocDetailDataWithFilter(doc: Doc, dto: GetCurrentDocDto): Promise<DocDetailResponse> {
    const records = await this.recordsService.getRecordsByDocIdWithFilter(doc.id, dto);
    return this.formatDocResponse(doc, records);
  }

  async getDocRowDetailData(recordId: number): Promise<RecordResultDto> {
    const record = await this.recordsService.getRecordById(recordId);
    if (!record) {
      throw new HttpException('Запись на найдена', HttpStatus.NOT_FOUND);
    }
    const result = await this.recordResult(record);
    return result;
  }

  async getCurrentDocDetail(plantId: number) {
    return this.handleDocRequest(this.docsService.getCurrentDocByPlantId(plantId), (doc) =>
      this.getDocDetailData(doc),
    );
  }

  async getTomorrowAppDocDetail(plantId: number) {
    return this.handleDocRequest(this.docsService.getTomorrowDocByPlantId(plantId), (doc) =>
      this.getAppDocDetailData(doc),
    );
  }

  async getCurrentAppDocDetail(plantId: number) {
    return this.handleDocRequest(this.docsService.getCurrentDocByPlantId(plantId), (doc) =>
      this.getAppDocDetailData(doc),
    );
  }

  async getDocDetailByDocId(docId: number): Promise<DocDetailResponse> {
    return this.handleDocRequest(this.docsService.getDocById(docId), (doc) =>
      this.getAppDocDetailData(doc),
    );
  }

  async getCurrentDocDetailWithFilter(dto: GetCurrentDocDto): Promise<DocDetailResponse> {
    return this.handleDocRequest(
      this.docsService.getCurrentDocByPlantId(dto.filter.plant as number),
      (doc) => this.getAppDocDetailData(doc),
    );
  }

  async getDocDetailByIdWithFilter(dto: GetDocByIdDto): Promise<DocDetailResponse> {
    const doc = await this.docsService.getDocById(Number(dto.doc_id));
    if (!doc) {
      return { records: [] };
    }
    const newDto: GetCurrentDocDto = { filter: { ...dto.filter, plant: null } };
    const result = await this.getDocDetailDataWithFilter(doc, newDto);
    return result;
  }

  async getTimeReport(dto: TimeReportDto): Promise<TimeReportResponse> {
    const doc = await this.docsService.getDocByPlantAndDate(dto.filter.date, dto.filter.plant);
    if (!doc) {
      return { records: [] };
    }
    const doc_recs = await this.recordsService.getRecordsByDocIdWithFilter(doc.id, dto);
    const records = await Promise.all(doc_recs.map((item) => this.timeResult(item)));
    return { records };
  }
}
