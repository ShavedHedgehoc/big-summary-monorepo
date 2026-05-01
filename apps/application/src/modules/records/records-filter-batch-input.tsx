import { useShallow } from 'zustand/react/shallow';
import FilterInput, { FilterInputProps } from '../../shared/ui/filter-input';
import { useRecordsFilterStore } from './store/use-record-filter-store';
import { RecordsFilterParams } from './records-filter-params';

export default function RecordsFilterBatchInput() {
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps<RecordsFilterParams> = {
    id: RecordsFilterParams.BOIL,
    value: filter.boil,
    disabled: filter.boil === '',
    placeholder: 'Партия',
    label: 'Поиск по партии',
    changeFilter: ({ key, value }: { key: RecordsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
