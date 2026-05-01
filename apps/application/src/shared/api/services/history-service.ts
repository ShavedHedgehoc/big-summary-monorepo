import { $api } from '../http';
import { AxiosResponse } from 'axios';
import { IHistory } from '../../../types';

/** @public */
export interface HistoryCreateResponce {
  id: number;
  userId: number | null;
  employeeId: number | null;
  note: string;
  recordId: number;
  historyTypeId: number;
  updatedAt: Date;
  createdAt: Date;
}

/** @public */
export interface AddHistoryDto {
  record_id: number | null;
  historyType: string | null;
  boil_value: string | null;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
  history_note: string | null;
}

export default class HistoryService {
  static createHistory = async (
    data: AddHistoryDto,
  ): Promise<AxiosResponse<HistoryCreateResponce>> => {
    return $api.post(`/histories`, data);
  };
  static createHistoryDirect = async (
    data: AddHistoryDto,
  ): Promise<AxiosResponse<HistoryCreateResponce>> => {
    return $api.post(`/histories/direct`, data);
  };

  static createHistoryBaseCheck = async (
    data: AddHistoryDto,
  ): Promise<AxiosResponse<HistoryCreateResponce>> => {
    return $api.post(`/histories/base_check`, data);
  };

  static deleteHistory = async (id: number): Promise<AxiosResponse> => {
    return $api.delete(`/histories/${id}`);
  };
  static getHistoriesByRecordId = async (id: number): Promise<AxiosResponse<IHistory[]>> => {
    return $api.get(`/histories/all/${id}`);
  };

  static getHistoriesByBoilId = async (id: number): Promise<AxiosResponse<IHistory[]>> => {
    return $api.get(`/histories/boil/${id}`);
  };
}
