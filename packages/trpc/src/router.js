"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const conveyors_1 = require("./routers/conveyors");
const trpc_1 = require("./trpc");
exports.appRouter = (0, trpc_1.router)({
    employees: conveyors_1.employeesRouter,
});
//# sourceMappingURL=router.js.map