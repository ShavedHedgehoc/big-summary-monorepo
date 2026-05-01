import { action, computed, makeAutoObservable } from 'mobx';
import { $api } from '../http';
import handleError from '../http/handleError';

interface IHistorieRecord {
  id: number;
  createdAt: Date;
  boil: string | null;
  product: string | null;
  base: string | null;
  historyType: string;
  employee: string;
}

export default class RecordsStore {
  records: IHistorieRecord[] = [];
  pending: boolean = false;
  error = '';
  constructor() {
    makeAutoObservable(this, {
      renderTable: computed,
      renderLoader: computed,
      noRecordsFound: computed,
      fetchRecords: action,
    });
  }

  get renderTable() {
    return this.records.length > 0 && !this.pending;
  }

  get renderLoader() {
    return this.pending;
  }

  get noRecordsFound() {
    return this.records.length === 0 && !this.pending;
  }
  setRecords(records: IHistorieRecord[]) {
    this.records = records;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRecords(plant_id: number) {
    try {
      this.setError('');
      this.setPending(true);
      const response = await $api.get<IHistorieRecord[]>(`/histories/last_ten/${plant_id}`);
      this.setRecords(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
