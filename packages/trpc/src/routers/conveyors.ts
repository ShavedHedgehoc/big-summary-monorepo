import { router, publicProcedure } from '../trpc';
// import { z } from 'zod';

export const employeesRouter = router({
    findAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.employeesService.getAllEmployees();
    }),


});