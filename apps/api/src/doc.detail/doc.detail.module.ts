import { Module } from '@nestjs/common';
import { DocDetailService } from './doc.detail.service';
import { DocDetailController } from './doc.detail.controller';
import { DocsModule } from '../docs/docs.module';
import { RecordsModule } from '../records/records.module';
import { HistoriesModule } from '../histories/histories.module';
import { SemiProductsModule } from '../semi_products/semi_products.module';
import { RecordRegulationsModule } from '../record_regulations/record_regulations.module';
import { RecordCountersModule } from '../record_counters/record_counters.module';

@Module({
  providers: [DocDetailService],
  controllers: [DocDetailController],
  imports: [
    DocsModule,
    RecordsModule,
    HistoriesModule,
    SemiProductsModule,
    RecordRegulationsModule,
    RecordCountersModule,
  ],
})
export class DocDetailModule {}
