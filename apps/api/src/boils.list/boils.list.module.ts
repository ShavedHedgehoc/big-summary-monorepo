import { Module } from '@nestjs/common';
import { BoilsListService } from './boils.list.service';
import { BoilsListController } from './boils.list.controller';
import { BoilsModule } from '../boils/boils.module';
import { RecordsModule } from '../records/records.module';
import { HistoriesModule } from '../histories/histories.module';
import { BasesModule } from '../bases/bases.module';
import { PlantsModule } from '../plants/plants.module';

@Module({
  providers: [BoilsListService],
  controllers: [BoilsListController],
  imports: [BoilsModule, RecordsModule, HistoriesModule, BasesModule, PlantsModule],
})
export class BoilsListModule {}
