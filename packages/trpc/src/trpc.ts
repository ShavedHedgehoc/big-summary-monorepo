import { initTRPC } from '@trpc/server';
import { pgPrisma } from '@big-summary-monorepo/db-postgres';
// import { msPrisma } from '@big-summary-monorepo/db-mssql';

// Создаем контекст (сюда можно добавить сессии, пользователя и т.д.)
export const createTRPCContext = () => ({
    pg: pgPrisma,
    //   ms: msPrisma,
});

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
