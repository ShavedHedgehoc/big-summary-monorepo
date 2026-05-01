import { $api } from '../http';

export interface ITraceCanState {
  CanStatePK: number;
  CanStateName: string;
  CanStateDescription: string;
  isBaseState: boolean;
}

export default class TraceCanStatesService {
  static getCanStates = async (): Promise<ITraceCanState[]> => {
    const res = await $api.get<ITraceCanState[]>(`trace-can-states`);
    return res.data;
  };
}
