import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import History from './histories.model';
import { HistoryTypesModule } from '../history_types/hystory_types.module';
import { RecordsModule } from '../records/records.module';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';
import { BoilsModule } from '../boils/boils.module';
import { EmployeesModule } from '../employees/employees.module';
import { ProductsModule } from '../products/products.module';
import { BasesModule } from '../bases/bases.module';
import { NotesModule } from '../notes/notes.module';
import { AuthModule } from '../auth/auth.module';
import { ApiErrorsModule } from '../api_errors/api_errors.module';

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService],
  imports: [
    SequelizeModule.forFeature([History]),
    HistoryTypesModule,
    HttpModule,
    UsersModule,
    BoilsModule,
    RecordsModule,
    EmployeesModule,
    ProductsModule,
    BasesModule,
    NotesModule,
    AuthModule,
    ApiErrorsModule,
  ],
  exports: [HistoriesService],
})
export class HistoriesModule {}
