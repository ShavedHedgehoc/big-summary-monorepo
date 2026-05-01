import { $api } from '../http';

export default class BoilService {
  static getHistoriesByBoilId = async (boil_id: number | null): Promise<IHistory[]> => {
    const res = await $api.get<IHistory[]>(`/histories/boil/${boil_id}`);
    return res.data;
  };

  static getBoilsListWithParams = async (dto: FetchBoilsDto): Promise<IBoilData> => {
    const res = await $api.post<IBoilData>(`/boils_list`, dto);
    return res.data;
  };

  static getBoilsReportWithParams = async (dto: FetchBoilsDto): Promise<IBoilReportData> => {
    const res = await $api.post<IBoilReportData>(`/boils_list/report`, dto);
    return res.data;
  };
}
