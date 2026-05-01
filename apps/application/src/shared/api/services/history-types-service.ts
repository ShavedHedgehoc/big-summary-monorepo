import { $api } from '../http';

export default class HistoryTypeService {
  static getAllHistoryTypes = async (): Promise<IHistoryType[]> => {
    const res = await $api.get<IHistoryType[]>(`/history-types`);
    return res.data;
  };

  static getBoilsHistoryTypes = async (): Promise<IHistoryType[]> => {
    const res = await $api.get<IHistoryType[]>(`/history-types/for_bases`);
    return res.data;
  };

  static getProductsHistoryTypes = async (): Promise<IHistoryType[]> => {
    const res = await $api.get<IHistoryType[]>(`/history-types/for_products`);
    return res.data;
  };
}
