export declare const appRouter: import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").BuiltRouter<{
    ctx: {
        employeesService: import("./context").IEmployeesService;
    };
    meta: object;
    errorShape: import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").DefaultErrorShape;
    transformer: false;
}, import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").DecorateCreateRouterOptions<{
    employees: import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").BuiltRouter<{
        ctx: {
            employeesService: import("./context").IEmployeesService;
        };
        meta: object;
        errorShape: import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").DefaultErrorShape;
        transformer: false;
    }, import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").DecorateCreateRouterOptions<{
        findAll: import("node_modules/@trpc/server/dist/unstable-core-do-not-import.d-Dh9CT5RO.cjs").QueryProcedure<{
            input: void;
            output: any;
            meta: object;
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
