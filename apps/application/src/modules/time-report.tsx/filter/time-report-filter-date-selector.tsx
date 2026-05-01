import { useShallow } from 'zustand/react/shallow';
import { useTimeReportFilterStore } from '../store/use-time-report-filter-store';
import FilterDateInput, { FilterDateInputProps } from '../../../shared/ui/filter-date-input';
import { TimeReportFilterParams } from './time-report-filter-params';

export default function TimeReportFilterDateInput() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps<TimeReportFilterParams> = {
    id: TimeReportFilterParams.DATE,
    placeholder: '',
    label: 'Дата сводки',
    value: filter.date,
    changeFilter: ({ key, value }: { key: TimeReportFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
