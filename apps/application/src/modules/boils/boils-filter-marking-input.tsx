import { useShallow } from 'zustand/react/shallow';
import { useBoilsFilterStore } from './store/use-boils-filter-store';
import FilterInput, { FilterInputProps } from '../../shared/ui/filter-input';
import { BoilsFilterParams } from './boils-filter-params';

export default function BoilsFilterMarkingInput() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps<BoilsFilterParams> = {
    id: BoilsFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === '',
    label: 'Поиск по артикулу',
    placeholder: 'Артикул',
    changeFilter: ({ key, value }: { key: BoilsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
