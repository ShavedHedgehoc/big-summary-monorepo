import { useShallow } from 'zustand/react/shallow';
import FilterDateInput, { FilterDateInputProps } from '../../../shared/ui/filter-date-input';
import { useInventoriesFilterStore } from '../store/use-inventories-filter-store';
import { InventoriesFilterParams } from './inventories-filter-params';

export default function InventoriesFilterStartDateInput() {
  const filter = useInventoriesFilterStore(useShallow((state) => state.filter));
  const changeFilter = useInventoriesFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps<InventoriesFilterParams> = {
    id: InventoriesFilterParams.START_DATE,
    placeholder: '',
    label: 'Дата начала',
    value: filter.startDate,
    changeFilter: ({ key, value }: { key: InventoriesFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
