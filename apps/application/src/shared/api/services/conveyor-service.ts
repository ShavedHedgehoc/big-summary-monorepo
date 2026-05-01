import { FetchConveyorFilter } from '../../../modules/conveyors/store/use-conveyors-filter-store';
import { $api } from '../http';

export interface FetchConveyorsDto {
  filter: FetchConveyorFilter;
  page: number;
  limit: number;
}

/** @public */
export interface IConveyorData {
  rows: IConveyor[];
  total: number;
}

export default class ConveyorService {
  static getConveyorsList = async (dto: FetchConveyorsDto): Promise<IConveyorData> => {
    const res = await $api.post<IConveyorData>(`/conveyors`, dto);
    return res.data;
  };
  static updateConveyor = async (dto: IConveyorUpdateDto): Promise<IConveyor> => {
    const res = await $api.put<IConveyor>(`/conveyors`, dto);
    return res.data;
  };

  static deleteConveyor = async (id: number): Promise<any> => {
    return $api.delete(`/conveyors/${id}`);
  };
}
