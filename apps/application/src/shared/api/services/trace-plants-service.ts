import { $api } from '../http';

export interface ITracePlant {
  PlantPK: number;
  PlantName: string;
  PlantAlias: string;
}

export default class TracePlantsService {
  static getAllPlants = async (): Promise<ITracePlant[]> => {
    const res = await $api.get<ITracePlant[]>(`trace-plants`);
    return res.data;
  };
}
