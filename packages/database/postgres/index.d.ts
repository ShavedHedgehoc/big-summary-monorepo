import { PrismaClient } from './generated/client/index';
export declare const pgPrisma: PrismaClient<{
    log: ("warn" | "query" | "error")[];
}, "warn" | "query" | "error", import("./generated/client/runtime/library").DefaultArgs>;
