import { action, makeAutoObservable } from 'mobx';
import { $api } from '../http';
import handleError from '../http/handleError';

interface IRecord {
  id: number;
  doc_id: number;
  productId: number;
  boilId: number;
  apparatusId: number;
  canId: number;
  conveyorId: number;
  plan: number;
  bbf: string;
  note: string;
  workshopId: number;
  isSet: boolean;
}

interface FetchRelatedRecordsDto {
  plant_id: number;
  boil_value: string;
  code: string;
}

export default class RelatedRecordsStore {
  records: IRecord[] = [];
  pending: boolean = false;
  error = '';
  constructor() {
    makeAutoObservable(this, {
      fetchRelatedRecords: action,
    });
  }

  setRecords(records: IRecord[]) {
    this.records = records;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRelatedRecords(dto: FetchRelatedRecordsDto): Promise<void> {
    try {
      this.setError('');
      this.setPending(true);
      const response = await $api.post<IRecord[]>(`/records/related`, dto);
      this.setRecords(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }

  clearRelatedRecords() {
    this.setRecords([]);
  }
}
