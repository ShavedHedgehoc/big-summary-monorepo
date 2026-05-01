import { useShallow } from 'zustand/react/shallow';
import FilterDateInput, { FilterDateInputProps } from '../../../shared/ui/filter-date-input';
import { useTraceBatchWeightingsSummaryFilterStore } from '../store/use-trace-batch-weightings-summary-filter-store';
import { TraceBatchWeightingsSummaryFilterParams } from './trace-batch-weightings-summary-filter-params';

export default function TraceBatchWeightingsSummaryFilterStartDateInput() {
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWeightingsSummaryFilterStore(
    useShallow((state) => state.changeFilter),
  );
  const startDateInputProps: FilterDateInputProps<TraceBatchWeightingsSummaryFilterParams> = {
    id: TraceBatchWeightingsSummaryFilterParams.START_DATE,
    placeholder: '',
    label: 'Дата начала',
    value: filter.startDate,
    changeFilter: ({
      key,
      value,
    }: {
      key: TraceBatchWeightingsSummaryFilterParams;
      value: string;
    }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
