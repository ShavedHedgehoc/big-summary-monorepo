import { PrismaClient } from './generated/client';

export const pgPrisma = new PrismaClient();

// ЭТО ВАЖНО для VS Code
export * from './generated/client/index';
