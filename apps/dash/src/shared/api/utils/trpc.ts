// apps/web/src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@big-summary-monorepo/api'; // Импорт типа твоего роутера из бэкенда

// Это создает объект с хуками: trpc.user.get.useQuery() и т.д.
export const trpc = createTRPCReact<AppRouter>();

/**
 * Полезные типы-хелперы (Modern DAL style)
 * Позволяют получить типы входа/выхода любой процедуры прямо на фронте
 */
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
