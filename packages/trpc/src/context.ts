// packages/trpc/src/context.ts

// Описываем интерфейс, которому должен соответствовать сервис из NestJS
export interface IEmployeesService {
    getAllEmployees(input?: any): Promise<any>;

}

export interface TrpcContext {
    employeesService: IEmployeesService;

}

// Эта функция будет вызываться в NestJS, принимая реальный сервис
export const createTRPCContext = (services: { employeesService: IEmployeesService }) => {
    return {
        employeesService: services.employeesService,
    };
};

export type Context = ReturnType<typeof createTRPCContext>;
