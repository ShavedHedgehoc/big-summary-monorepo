import { useShallow } from 'zustand/react/shallow';
import FilterInput, { FilterInputProps } from '../../../shared/ui/filter-input';
import { useUsersFilterStore } from '../store/use-users-filter-store';
import { UsersFilterParams } from './users-filter-params';

export default function UsersFilterEmailInput() {
  const filter = useUsersFilterStore(useShallow((state) => state.filter));
  const changeFilter = useUsersFilterStore(useShallow((state) => state.changeFilter));

  const emailInputProps: FilterInputProps<UsersFilterParams> = {
    id: UsersFilterParams.EMAIL,
    value: filter.email,
    disabled: filter.email === '',
    label: 'Поиск по email',
    placeholder: 'Email',
    changeFilter: ({ key, value }: { key: UsersFilterParams; value: string }) =>
      changeFilter({ key, value }),
  };

  return <FilterInput {...emailInputProps} />;
}
