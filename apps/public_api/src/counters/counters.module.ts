import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import RecordCounter from '../models/record-counters.model';
import { RecordsModule } from '../records/records.module';
import { HistoriesModule } from '../histories/histories.module';
import { HistoryTypesModule } from '../history-types/history-types.module';
import { ProductsModule } from '../products/products.module';
import { BoilsModule } from '../boils/boils.module';

@Module({
  providers: [CountersService],
  controllers: [CountersController],
  imports: [
    SequelizeModule.forFeature([RecordCounter]),
    RecordsModule,
    HistoriesModule,
    HistoryTypesModule,
    ProductsModule,
    BoilsModule,
  ],
  exports: [CountersService],
})
export class CountersModule {}
