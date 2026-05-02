export interface IEmployeesService {
    getAllEmployees(input?: any): Promise<any>;
}
export interface TrpcContext {
    employeesService: IEmployeesService;
}
export declare const createTRPCContext: (services: {
    employeesService: IEmployeesService;
}) => {
    employeesService: IEmployeesService;
};
export type Context = ReturnType<typeof createTRPCContext>;
