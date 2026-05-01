import { $api } from '../http';
interface IXLSBoilsRowRow {
  productid: string;
  productname: string;
  quantity: string;
}

interface IXLSBoilsAttrs {
  apparatus: string;
  batch: string;
  date: string;
  fin_productid: string;
  marking: string;
  plan: string;
  plant: string;
}

interface IXLSBoilsBatchRecord {
  _attributes: IXLSBoilsAttrs;
  row: IXLSBoilsRowRow[];
}

interface IXLSBoilsDocument {
  batch_record: IXLSBoilsBatchRecord;
}

export interface IXLSBoilsRowData {
  document: IXLSBoilsDocument;
}

/** @public */
export interface IBoilsUploadResponse {
  value: number;
}

export default class DirectTraceService {
  static uploadBoil = async (dto: IXLSBoilsRowData): Promise<IBoilsUploadResponse> => {
    const res = await $api.post<IBoilsUploadResponse>(`/trace-direct-connection`, dto);
    return res.data;
  };
}
