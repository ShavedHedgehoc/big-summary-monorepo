import { Module } from '@nestjs/common';
import { HistoryTypesService } from './history-types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import HistoryType from '../models/history_types.model';

@Module({
  providers: [HistoryTypesService],
  imports: [SequelizeModule.forFeature([HistoryType])],
  exports: [HistoryTypesService],
})
export class HistoryTypesModule {}
