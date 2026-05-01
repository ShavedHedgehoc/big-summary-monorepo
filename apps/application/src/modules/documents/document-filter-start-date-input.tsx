import { useShallow } from 'zustand/react/shallow';
import FilterDateInput, { FilterDateInputProps } from '../../shared/ui/filter-date-input';
import { DocumentsFilterParams } from './documents-filter-params';
import { useDocumentsFilterStore } from './store/use-documents-filter-store';

export default function DocumentFilterStartDateInput() {
  const filter = useDocumentsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentsFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps<DocumentsFilterParams> = {
    id: DocumentsFilterParams.START_DATE,
    placeholder: '',
    label: 'Дата начала',
    value: filter.startDate,
    changeFilter: ({ key, value }: { key: DocumentsFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
