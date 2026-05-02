

import { employeesRouter } from './routers/conveyors';
import { router, publicProcedure } from './trpc';
// import { z } from 'zod';

export const appRouter = router({
    employees: employeesRouter,
    // Пример запроса к Postgres
    // getEmployees: publicProcedure.query(async ({ ctx }) => {
    //     return await ctx.pg.employees.findMany();
    // }),

    // Пример запроса к MSSQL (отчеты)
    //   getMssqlReports: publicProcedure
    //     .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    //     .query(async ({ ctx, input }) => {
    //       // Здесь используем клиент MSSQL
    //       return await ctx.ms.boils.findMany({
    //         take: input.limit,
    //       });
    //     }),
});

// Экспортируем тип роутера для фронтенда
export type AppRouter = typeof appRouter;