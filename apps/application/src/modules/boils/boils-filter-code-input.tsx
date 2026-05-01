import { useShallow } from 'zustand/react/shallow';
import { useBoilsFilterStore } from './store/use-boils-filter-store';
import FilterInput, { FilterInputProps } from '../../shared/ui/filter-input';
import { BoilsFilterParams } from './boils-filter-params';

export default function BoilsFilterCodeInput() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps<BoilsFilterParams> = {
    id: BoilsFilterParams.BASE,
    value: filter.baseCode,
    disabled: filter.baseCode === '',
    label: 'Поиск по коду 1С',
    placeholder: 'Код 1С',
    changeFilter: ({ key, value }: { key: BoilsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
