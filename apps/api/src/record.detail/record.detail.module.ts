import { Module } from '@nestjs/common';
import { RecordDetailService } from './record.detail.service';
import { RecordDetailController } from './record.detail.controller';
import { HistoriesModule } from '../histories/histories.module';
import { RecordsModule } from '../records/records.module';

@Module({
  providers: [RecordDetailService],
  controllers: [RecordDetailController],
  imports: [HistoriesModule, RecordsModule],
})
export class RecordDetailModule {}
