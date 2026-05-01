import { useShallow } from 'zustand/react/shallow';
import { useForemanFilterStore } from '../store/use-foreman-filter-store';
import FilterInput, { FilterInputProps } from '../../../shared/ui/filter-input';
import { ForemanFilterParams } from './foreman-filter-params';

export default function ForemanFilterBatchInput() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps<ForemanFilterParams> = {
    id: ForemanFilterParams.BOIL,
    value: filter.boil,
    disabled: filter.boil === '',
    placeholder: 'Партия',
    label: 'Поиск по партии',
    changeFilter: ({ key, value }: { key: ForemanFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
