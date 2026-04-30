import { Module } from '@nestjs/common';
import { RegulationsController } from './regulations.controller';
import { RegulationsService } from './regulations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Regulation from './regulations.model';
import { ProductsModule } from '../products/products.module';
import { MarkingSampleModule } from '../marking_sample/marking_sample.module';
import { SeriesModule } from '../series/series.module';

@Module({
  controllers: [RegulationsController],
  imports: [
    SequelizeModule.forFeature([Regulation]),
    ProductsModule,
    MarkingSampleModule,
    SeriesModule,
  ],
  providers: [RegulationsService],
})
export class RegulationsModule {}
