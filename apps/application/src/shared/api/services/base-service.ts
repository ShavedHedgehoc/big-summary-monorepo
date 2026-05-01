import { $api } from '../http';

//

export default class BaseService {
  static bulkUpdateBases = async (dto: BulkUpdateBasesDto): Promise<any> => {
    const res = await $api.post<any>(`/bases/bulkupdate`, dto);
    return res.data;
  };
}
