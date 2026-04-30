import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Record from './records.model';
import { SeriesModule } from '../series/series.module';
import { ProductsModule } from '../products/products.module';
import { BoilsModule } from '../boils/boils.module';
import { ApparatusesModule } from '../apparatuses/apparatuses.module';
import { CansModule } from '../cans/cans.module';
import { ConveyorsModule } from '../conveyors/conveyors.module';
import { WorkshopsModule } from '../workshops/workshops.module';
import { DocsModule } from '../docs/docs.module';
import { PlantsModule } from '../plants/plants.module';
import { RecordRegulationsModule } from '../record_regulations/record_regulations.module';
import { MarkingSampleModule } from '../marking_sample/marking_sample.module';
import { SemiProductsModule } from '../semi_products/semi_products.module';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [
    SequelizeModule.forFeature([Record]),
    SeriesModule,
    ProductsModule,
    BoilsModule,
    ApparatusesModule,
    CansModule,
    ConveyorsModule,
    WorkshopsModule,
    DocsModule,
    PlantsModule,
    RecordRegulationsModule,
    MarkingSampleModule,
    SemiProductsModule,
  ],
  exports: [RecordsService],
})
export class RecordsModule {}
