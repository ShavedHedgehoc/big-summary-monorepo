"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgPrisma = void 0;
const index_1 = require("./generated/client/index");
exports.pgPrisma = new index_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
//# sourceMappingURL=index.js.map