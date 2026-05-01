import { useShallow } from 'zustand/react/shallow';
import { useBoilsReportFilterStore } from '../store/use-boils-report-filter-store';
import FilterInput, { FilterInputProps } from '../../../shared/ui/filter-input';
import { BoilsReportFilterParams } from './boils-report-filter-params';

export default function BoilsReportFilterMarkingInput() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps<BoilsReportFilterParams> = {
    id: BoilsReportFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === '',
    label: 'Поиск по артикулу',
    placeholder: 'Артикул',
    changeFilter: ({ key, value }: { key: BoilsReportFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
