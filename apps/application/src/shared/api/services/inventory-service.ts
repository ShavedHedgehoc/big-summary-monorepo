import { $api } from '../http';

export default class InventoryService {
  static getInventoryListWithParams = async (
    dto: FetchInventoryDocsDto,
  ): Promise<IInventoryDocsData> => {
    const res = await $api.post<IInventoryDocsData>(`/trace-inventory-docs/get-inventories`, dto);
    return res.data;
  };

  static getInventoryById = async (id: string | undefined): Promise<IInventoryDoc> => {
    const res = await $api.get<IInventoryDoc>(`/trace-inventory-docs/${id}`);
    return res.data;
  };
}
