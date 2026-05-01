import axios from 'axios';

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

export default class TraceCansService {
  static async getCanVolumes(): Promise<ITraceCanVolume[]> {
    const res = await axios.get<ITraceCanVolume[]>(`/api/trace-cans/volumes`);
    return res.data;
  }

  static async getCansWithParams(dto: FetchCansDto): Promise<ITraceCanData[]> {
    const res = await axios.post<ITraceCanData[]>(`/api/trace-cans`, dto);
    return res.data;
  }
}
