// apps/api/src/trpc/trpc.module.ts
import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TrpcRouterService } from './trpc.router.service'; // Добавляем этот импорт
import { EmployeesModule } from '../employees/employees.module'; // Используем относительный путь

@Module({
    imports: [EmployeesModule],
    providers: [
        TrpcService,       // Создает контекст (db, user)
        TrpcRouterService  // Содержит сам appRouter с логикой
    ],
    controllers: [TrpcController],
})
export class TrpcModule { }
