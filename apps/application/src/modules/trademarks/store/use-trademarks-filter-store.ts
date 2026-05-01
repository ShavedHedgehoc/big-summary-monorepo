import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { FetchTrademarksFilter } from '../../../shared/api/services/trace-trademark-service';
import { TrademarksFilterParams } from '../filter/trademarks-filter-params';

interface FormField {
  key: TrademarksFilterParams;
  value: string;
  values?: string[];
}

interface TrademarksFilterStore {
  filter: FetchTrademarksFilter;
  clearFilter: () => void;
  changeFilter: (value: FormField) => void;
}

const initFilterValue: FetchTrademarksFilter = {
  trademark: '',
  product_code: '',
  product_name: '',
};

export const useTrademarksFilterStore = create<TrademarksFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    clearFilter: () => set(() => ({ filter: initFilterValue })),
    changeFilter: ({ key, value }) => {
      switch (key) {
        case TrademarksFilterParams.TRADEMARK:
          set((state) => ({
            filter: { ...state.filter, trademark: value },
          }));
          break;
        case TrademarksFilterParams.PRODUCT_CODE:
          set((state) => ({
            filter: { ...state.filter, product_code: value },
          }));
          break;
        case TrademarksFilterParams.PRODUCT_NAME:
          set((state) => ({
            filter: { ...state.filter, product_name: value },
          }));
          break;
        default:
          break;
      }
    },
  })),
);
