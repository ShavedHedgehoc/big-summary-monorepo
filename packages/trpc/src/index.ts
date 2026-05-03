import { initTRPC } from '@trpc/server';
import { pgPrisma } from '@big-summary-monorepo/db-postgres';

// 1. Контекст: оставляем только то, что НЕ относится к NestJS (база, типы)
export const createTRPCContext = () => ({
    pg: pgPrisma,
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// 2. Инициализация tRPC
const t = initTRPC.context<Context>().create();

// 3. Экспортируем инструменты для создания роутеров в приложении
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
