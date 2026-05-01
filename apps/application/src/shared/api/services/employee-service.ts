import { $api } from '../http';

interface IOccupation {
  id: number;
  value: string;
  description: string;
}

/** @public */
export interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

/** @public */
export interface IEmployeeResponse {
  rows: IEmployee[];
  total: number;
}

/** @public */
export interface IEmployeeCreateDto {
  name: string;
  barcode: string;
  occupationId: number;
}

/** @public */
export interface IEmployeeUpdateDto {
  id: number;
  name: string;
  barcode: string;
  occupationId: number;
}

export default class EmployeeService {
  static getEmployees = async (): Promise<IEmployee[]> => {
    const res = await $api.get<IEmployee[]>(`/employees`);
    return res.data;
  };

  static getEmployeeListWithParams = async (dto: FetchEmployeesDto): Promise<IEmployeeResponse> => {
    const res = await $api.post<IEmployeeResponse>(`/employees/list`, dto);
    return res.data;
  };

  static createEmployee = async (dto: IEmployeeCreateDto): Promise<IEmployee> => {
    const res = await $api.post<IEmployee>(`/employees`, dto);
    return res.data;
  };

  static updateEmployee = async (dto: IEmployeeUpdateDto): Promise<IEmployee> => {
    const res = await $api.put<IEmployee>(`/employees`, dto);
    return res.data;
  };

  static deleteEmployee = async (id: number): Promise<any> => {
    return $api.delete<any>(`/employees/${id}`);
  };
}
