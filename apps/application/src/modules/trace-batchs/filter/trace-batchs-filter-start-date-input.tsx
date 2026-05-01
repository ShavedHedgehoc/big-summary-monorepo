import { useShallow } from 'zustand/react/shallow';
import FilterDateInput, { FilterDateInputProps } from '../../../shared/ui/filter-date-input';
import { useTraceBatchsFilterStore } from '../store/use-trace-batchs-filter-store';
import { TraceBatchsFilterParams } from './trace-batchs-filter-params';

export default function TraceBatchsFilterStartDateInput() {
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchsFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps<TraceBatchsFilterParams> = {
    id: TraceBatchsFilterParams.START_DATE,
    placeholder: '',
    label: 'Дата начала',
    value: filter.startDate,
    changeFilter: ({ key, value }: { key: TraceBatchsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
