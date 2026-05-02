// export * from './generated/client';
// // import { PrismaClient } from './generated/client';
import { PrismaClient } from './generated/client/index';

export const pgPrisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});