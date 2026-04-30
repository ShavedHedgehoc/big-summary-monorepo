import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BasesService } from '../bases/bases.service';
import Boil from '../boils/boil.model';
import { BoilsService } from '../boils/boils.service';
import { GetBoilsDto } from '../boils/dto/get-boils.dto';
import { HistoriesService } from '../histories/histories.service';
import { RecordsService } from '../records/records.service';
import { PlantsService } from '../plants/plants.service';

export interface BoilResultDto {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number | null;
  stateValue: string | null;
  base_code: string | null;
  base_marking: string | null;
  plant: string | null;
}
interface BoilReportResultDto {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number | null;
  stateValue: string | null;
  base_code: string | null;
  base_marking: string | null;
  plant: string | null;
  firstBaseCheckTime: Date;
  lastBaseCheckTime: Date;
  lastPlugPassTime: Date;
}

export interface BoilReportResponse {
  rows: BoilReportResultDto[];
  total: number;
}

export interface BoilResponse {
  rows: BoilResultDto[];
  total: number;
}

@Injectable()
export class BoilsListService {
  constructor(
    private boilsService: BoilsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
    private basesService: BasesService,
    private plantService: PlantsService,
  ) {}

  private async boilResult(item: Boil): Promise<BoilResultDto> {
    const [records, histories, base, plant] = await Promise.all([
      this.recordsService.getRecordsByBoilId(item.id),
      this.historiesService.getHistoriesByBoilId(item.id),
      this.basesService.getByid(item.base_id),
      this.plantService.getPlantByPk(item.plant_id),
    ]);

    const historiesCount = histories.length;
    const lastHistory = historiesCount > 0 ? histories[historiesCount - 1] : null;
    const state_id = lastHistory?.historyType?.id ?? null;
    const state = lastHistory?.historyType?.description ?? '-';
    const stateValue = lastHistory?.historyType?.value ?? null;

    return {
      ...item,
      base_code: base ? base.code : null,
      base_marking: base ? base.marking : null,
      recordsCount: records.length,
      historiesCount: historiesCount,
      state: state,
      state_id: state_id,
      stateValue: stateValue,
      plant: plant ? plant.abb : null,
    };
  }

  private async boilReportResult(item: Boil): Promise<BoilReportResultDto> {
    const [records, histories, firstBaseCheck, lastBaseCheck, lastPlugPass, base, plant] =
      await Promise.all([
        this.recordsService.getRecordsByBoilId(item.id),
        this.historiesService.getHistoriesByBoilId(item.id),
        this.historiesService.getFirstBaseCheck(item.id),
        this.historiesService.getLastBaseCheck(item.id),
        this.historiesService.getLastPlugPass(item.id),
        this.basesService.getByid(item.base_id),
        this.plantService.getPlantByPk(item.plant_id),
      ]);
    const historiesCount = histories.length;
    const lastHistory = historiesCount > 0 ? histories[historiesCount - 1] : null;
    const state_id = lastHistory?.historyType?.id ?? null;
    const state = lastHistory?.historyType?.description ?? '-';
    const stateValue = lastHistory?.historyType?.value ?? null;
    return {
      ...item,
      base_code: base?.code ?? null,
      base_marking: base?.marking ?? null,
      recordsCount: records.length,
      historiesCount: historiesCount,
      state: state,
      state_id: state_id,
      stateValue: stateValue,
      plant: plant?.abb ?? null,
      firstBaseCheckTime: (firstBaseCheck?.createdAt as Date) ?? null,
      lastBaseCheckTime: (lastBaseCheck?.createdAt as Date) ?? null,
      lastPlugPassTime: (lastPlugPass?.createdAt as Date) ?? null,
    };
  }

  async getBoilsListWithFilter(dto: GetBoilsDto): Promise<BoilResponse> {
    const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
    const result = await Promise.all(boils.map((item) => this.boilResult(item)));
    return { rows: result, total: count };
  }

  async getBoilsReportWithFilter(dto: GetBoilsDto): Promise<BoilReportResponse> {
    const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
    const result = await Promise.all(boils.map((item) => this.boilReportResult(item)));
    return { rows: result, total: count };
  }

  async getBoilsListRow(boilId: number): Promise<BoilResultDto> {
    const boil = await this.boilsService.getBoilListRow(boilId);
    if (!boil) throw new HttpException('', HttpStatus.NOT_FOUND);
    return await this.boilResult(boil);
  }
}
