// apps/api/src/trpc/trpc.service.ts
import { Injectable } from '@nestjs/common';
import { createTRPCContext } from '@big-summary-monorepo/trpc'; // импорт из вашего пакета
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class TrpcService {
    constructor(
        private readonly employeesService: EmployeesService,
        // Добавьте сюда другие сервисы по мере необходимости
    ) { }

    async create() {
        // Вызываем функцию создания контекста из пакета @repo/trpc
        return createTRPCContext({
            employeesService: this.employeesService,
        });
    }
}
