import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HistoriesService } from '../histories/histories.service';
import { RecordsService } from '../records/records.service';

@Injectable()
export class TestService {
  constructor(
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
  ) {}
  async getRecordDetail(id: number): Promise<Record<string, unknown>> {
    const record = await this.recordsService.getByIdWitDetailsNew(id);
    if (!record) {
      throw new HttpException('Запись в сводке не найдена', HttpStatus.NOT_FOUND);
    }

    const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(
      id,
      record.boilId ?? null,
    );

    const recordData = record.get({ plain: true });

    return {
      ...(recordData as unknown as Record<string, unknown>),
      histories: histories,
    };
  }
}
