"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTRPCContext = void 0;
const createTRPCContext = (services) => {
    return {
        employeesService: services.employeesService,
    };
};
exports.createTRPCContext = createTRPCContext;
//# sourceMappingURL=context.js.map