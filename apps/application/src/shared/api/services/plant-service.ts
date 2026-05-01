import { $api } from '../http';

/** @public */
export interface IPlant {
  id: number;
  value: string;
  abb: string;
}

export default class PlantService {
  static getAllPlants = async (): Promise<IPlant[]> => {
    const res = await $api.get<IPlant[]>(`/plants`);
    return res.data;
  };
}
