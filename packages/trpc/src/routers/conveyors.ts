import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const conveyorsRouter = router({
    findAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.pg.conveyors.findMany();
    }),

    // Аналог getTasks
    // getTasks: publicProcedure
    //     .input(z.object({
    //         conveyor: z.string().optional(),
    //         record_id: z.number().optional(),
    //         barcode: z.string().optional(),
    //     }))
    //     .query(async ({ ctx, input }) => {
    //         const { conveyor, record_id, barcode } = input;

    //         // 1. Получаем записи (аналог recordsService)
    //         const records = await ctx.pg.records.findMany({
    //             where: {
    //                 id: record_id,
    //                 conveyors: { value: conveyor },
    //                 barcode: barcode,
    //                 // Добавь фильтр по дате (Today), если нужно
    //             },
    //             include: {
    //                 doc: true,
    //                 conveyor: true,
    //                 product: true,
    //                 boil: true,
    //             }
    //         });

    //         // 2. Собираем результат (в Prisma это быстрее сделать через include, но сохраним твою логику)
    //         const recordsResult = await Promise.all(
    //             records.map(async (item) => {
    //                 // Получаем последнюю историю (аналог historiesService)
    //                 const state = await ctx.pg.history.findFirst({
    //                     where: { recordId: item.id },
    //                     orderBy: { createdAt: 'desc' },
    //                     include: { historyType: true }
    //                 });

    //                 return {
    //                     date: item.doc?.date,
    //                     record_id: item.id,
    //                     conveyor_name: item.conveyor?.value,
    //                     code_1C: item.product?.code1C,
    //                     marking: item.product?.marking,
    //                     boil_value: item.boil?.value,
    //                     plan: item.plan,
    //                     state: state?.historyType?.value ?? null,
    //                     state_description: state?.historyType?.description ?? null,
    //                 };
    //             })
    //         );

    //         return recordsResult;
    //     }),
});
