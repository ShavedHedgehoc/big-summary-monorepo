import { useShallow } from 'zustand/react/shallow';
import FilterInput, { FilterInputProps } from '../../../shared/ui/filter-input';
import { useTraceBatchsFilterStore } from '../store/use-trace-batchs-filter-store';
import { TraceBatchsFilterParams } from './trace-batchs-filter-params';

export default function TraceBatchsFilterMarkingInput() {
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchsFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps<TraceBatchsFilterParams> = {
    id: TraceBatchsFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === '',
    label: 'Поиск по артикулу',
    placeholder: 'Артикул',
    maxW: 150,
    changeFilter: ({ key, value }: { key: TraceBatchsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
