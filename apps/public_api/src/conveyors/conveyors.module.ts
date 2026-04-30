import { Module } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { ConveyorsController } from './conveyors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Conveyor from '../models/conveyor.model';
import { RecordsModule } from '../records/records.module';
import { HistoriesModule } from '../histories/histories.module';

@Module({
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
  imports: [SequelizeModule.forFeature([Conveyor]), RecordsModule, HistoriesModule],
  exports: [ConveyorsService],
})
export class ConveyorsModule {}
