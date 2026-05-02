"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesRouter = void 0;
const trpc_1 = require("../trpc");
exports.employeesRouter = (0, trpc_1.router)({
    findAll: trpc_1.publicProcedure.query(async ({ ctx }) => {
        return await ctx.employeesService.getAllEmployees();
    }),
});
//# sourceMappingURL=conveyors.js.map