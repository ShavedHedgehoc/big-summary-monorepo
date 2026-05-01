import { $api } from '../http';

export interface ITrademarkRowData {
  trademark_name: string;
  product_id: string;
  product_name: string;
}

export interface FetchTrademarksFilter {
  trademark: string;
  product_code: string;
  product_name: string;
}

export interface FetchTrademarksDto {
  filter: FetchTrademarksFilter;
  limit: number;
  page: number;
}

/** @public */
export interface ITrademarksListData {
  rows: ITrademarkRowData[];
  total: number;
}

export default class TraceTrademarkService {
  static getTrademarksWithFilter = async (
    dto: FetchTrademarksDto,
  ): Promise<ITrademarksListData> => {
    const res = await $api.post<ITrademarksListData>(`/trace-trademarks`, dto);
    return res.data;
  };
}
