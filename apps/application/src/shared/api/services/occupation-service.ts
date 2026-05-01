import { $api } from '../http';

/** @public */
export interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export default class OccupationService {
  static getOccupations = async (): Promise<IOccupation[]> => {
    const res = await $api.get<IOccupation[]>(`/occupations`);
    return res.data;
  };
}
