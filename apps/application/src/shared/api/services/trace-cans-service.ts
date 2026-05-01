import { $api } from '../http';

export interface ITraceCanData {
  id: number;
  name: string;
  volume: number;
  baseContain: string;
  baseContainMarking: string;
  stateValue: string; // value
  state: string; // description
  stateTime: Date;
  author: string;
  isUpdated: boolean;
  plant: string;
  transit: boolean;
}

export interface ITraceCan {
  CanPK: number;
  CanName: string;
  CanVolume: number;
  CanBarcode: string | null;
  PlantPK: number;
  plant_name: string;
}

/** @public */
export interface ITraceCanResponse {
  rows: ITraceCan[];
  total: number;
}

export interface FetchCansListFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
  plants: number[] | [];
}

export interface FetchCansListDto {
  filter: FetchCansListFilter;
  page: number;
  limit: number;
}

export interface FetchCansFilter {
  can: string;
  volumes: number[] | [];
  states: number[] | [];
  plants: number[] | [];
  transit: boolean;
}

export interface FetchCansDto {
  filter: FetchCansFilter;
}

export interface ITraceCanVolume {
  volume: number;
}

export interface ITraceCanRecord {
  CanRecordPK: number;
  CreateDate: Date;
  stateDescription: string;
  authorName: string;
  baseContain: string | null;
}

export default class TraceCansService {
  static getCans = async (): Promise<ITraceCanData[]> => {
    const res = await $api.get<ITraceCanData[]>(`trace-cans`);
    return res.data;
  };

  static getCanVolumes = async (): Promise<ITraceCanVolume[]> => {
    const res = await $api.get<ITraceCanVolume[]>(`trace-cans/volumes`);
    return res.data;
  };
  static getCansWithParams = async (dto: FetchCansDto): Promise<ITraceCanData[]> => {
    const res = await $api.post<ITraceCanData[]>(`trace-cans`, dto);
    return res.data;
  };

  static getCansListWithParams = async (dto: FetchCansListDto): Promise<ITraceCanResponse> => {
    const res = await $api.post<ITraceCanResponse>(`trace-cans/list`, dto);
    return res.data;
  };

  static getLastTenRecords = async (canId: number | null): Promise<ITraceCanRecord[]> => {
    const res = await $api.get<ITraceCanRecord[]>(`trace-can-records/last_ten/${canId}`);
    return res.data;
  };
}
