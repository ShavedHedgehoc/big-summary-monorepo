// apps/api/src/trpc/trpc.module.ts
import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { EmployeesModule } from 'src/employees/employees.module';
// import { ConveyorsModule } from '../conveyors/conveyors.module';

@Module({
    imports: [EmployeesModule], // импортируем модули, чьи сервисы нам нужны
    providers: [TrpcService],
    controllers: [TrpcController],
})
export class TrpcModule { }
