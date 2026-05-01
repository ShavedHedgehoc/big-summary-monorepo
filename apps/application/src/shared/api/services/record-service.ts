import { $api } from '../http';

/** @public */
export interface RecordHistoriesResponse {
  histories: IHistory[];
}

export interface IXLSDocsRowData {
  code1C: string;
  product: string;
  serie: string;
  batch: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  dm: string;
  note: string;
  workshop: string;
  boil1: string;
  boil2: string;
  semi_product: string;
  org_base_min_weight: string;
  org_base_max_weight: string;
  water_base_min_weight: string;
  water_base_max_weight: string;
  per_box: string;
  box_per_row: string;
  row_on_pallet: string;
  gasket: string;
  seal: string;
  technician_note: string;
  packaging_note: string;
  marking_sample: string;
  marking_feature: string;
  ink_color: string;
}

export interface IDocUploadData {
  plantId: string;
  summaryDate: string;
  update: boolean;
  rows: IXLSDocsRowData[];
}

/** @public */
export interface TimeReportFilter {
  boil: string;
  productCode: string;
  marking: string;
  conveyor: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plant: number | null;
  date: string;
}

export interface TimeReportDto {
  filter: TimeReportFilter;
}

export interface TimeReportRowData {
  id: number;
  state: string;
  stateValue: string;
  conveyor: string;
  productId: string;
  product: string;
  boil: string;
  plan: number;
  lastBaseCheck: Date;
  lastPlugPass: Date;
  lastProductCheck: Date;
  lastProductPass: Date;
  lastProductInProgress: Date;
  lastProductFinished: Date;
}

export default class RecordService {
  static getHistoriesByRecordId = async (
    record_id: number | null,
  ): Promise<RecordHistoriesResponse> => {
    const res = await $api.get<RecordHistoriesResponse>(`/record_detail/${record_id}`);
    return res.data;
  };

  static getCurrentRecordsList = async (dto: FetchProductsDto): Promise<SummaryResponse> => {
    const res = await $api.post<SummaryResponse>(`/doc_detail/`, dto);
    return res.data;
  };

  static getRecordsByDocId = async (dto: FetchProductsWithDocIdDto): Promise<SummaryResponse> => {
    const res = await $api.post<SummaryResponse>(`/doc_detail/by_id/`, dto);
    return res.data;
  };

  static deleteRecord = async (record_id: number): Promise<any> => {
    const res = await $api.delete<any>(`/records/${record_id}`);
    return res.data;
  };

  static updateRecord = async (dto: UpdateRecordDto): Promise<IDocRow> => {
    const res = await $api.put<IDocRow>(`/records/`, dto);
    return res.data;
  };

  static bulkCreateRecords = async (dto: IDocUploadData): Promise<any> => {
    const res = await $api.post<any>(`/records/upload_doc`, dto);
    return res.data;
  };

  static timeReport = async (dto: TimeReportDto): Promise<TimeReportRowData[]> => {
    const res = await $api.post<TimeReportRowData[]>(`/doc_detail/time_report`, dto);
    return res.data;
  };
}
