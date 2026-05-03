// apps/api/src/trpc/trpc-router.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { router, publicProcedure } from '@big-summary-monorepo/trpc';
import { z } from 'zod';
import type { EmployeesService } from '../employees/employees.service';


export const EmployeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    //   description: z.string().optional(),
});

export const createAppRouter = (employeesService: EmployeesService) => router({
    getAllEmployees: publicProcedure
        .input(z.void())
        .output(z.array(EmployeeSchema))
        .query(async () => {
            const employees = await employeesService.getAllEmployees();
            return z.array(EmployeeSchema).parse(employees);
        }),
});

export type AppRouter = ReturnType<typeof createAppRouter>;

@Injectable()
export class TrpcRouterService {
    public readonly appRouter: AppRouter;

    constructor(private readonly employeesService: EmployeesService) {
        // 3. Инициализируем роутер внутри сервиса
        this.appRouter = createAppRouter(this.employeesService);
    }
}

// export type TEmployee = z.infer<typeof EmployeeSchema>;

// @Injectable()
// export class TrpcRouterService {
//     constructor(private readonly employeesService: EmployeesService) { }



//     // Создаем роутер прямо здесь
//     appRouter = router({

//         getAllEmployees: publicProcedure
//             .input(z.void())
//             .output(z.array(EmployeeSchema))
//             // .input(z.object({
//             //     conveyor: z.string().optional(),
//             //     record_id: z.number().optional(),
//             //     barcode: z.string().optional(),
//             // }))
//             .query(async () => {
//                 // Вызываем метод твоего Nest-сервиса
//                 const employees = await this.employeesService.getAllEmployees();
//                 return z.array(EmployeeSchema).parse(employees);
//             }),

//         // getEmployeesList: publicProcedure
//         //     .input(z.object({
//         //         limit: z.number().default(10),
//         //         page: z.number().default(1),
//         //         filter: z.object({
//         //             name: z.string().optional(),
//         //             nameAsc: z.boolean().default(true),
//         //             occupations: z.array(z.number()).default([]),
//         //         }),
//         //     }))
//         //     .query(async ({ input }) => {
//         //         return this.employeesService.getAllEmployeesWithFilter(input);
//         //     }),

//     });
// }

// // Экспортируем тип для фронтенда
// export type AppRouter = TrpcRouterService['appRouter'];
