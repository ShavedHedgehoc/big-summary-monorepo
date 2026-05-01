import * as React from 'react';
import { Box, FormControl, FormHelperText, Option, Select, SelectStaticProps } from '@mui/joy';

interface FormSelectorOptionProps {
  id: number;
  value: string;
}

export interface FormSelectorProps<T extends string> {
  id: T;
  selectedOption: number | null;
  placeholder: string;
  label: string;
  options: React.ReactNode;
  setSelectedOption: (id: number) => void;
  changeFilter: ({ key, value, values }: { key: T; value: string; values: number[] | [] }) => void;
}

export function FormSelectorOption(props: FormSelectorOptionProps) {
  return (
    <Option value={props.id} key={props.id}>
      <FormControl size="sm">{props.value}</FormControl>
    </Option>
  );
}

export default function FormSelector<T extends string>(props: FormSelectorProps<T>) {
  const action: SelectStaticProps['action'] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && props.setSelectedOption(newValue);
    newValue &&
      props.changeFilter({
        key: props.id,
        value: '',
        values: newValue === 999999 ? [] : [newValue],
      });
  };
  return (
    <Box sx={{ display: 'flex', pt: 1 }}>
      <FormControl size="sm" id={'plants'}>
        <FormHelperText>{props.label}</FormHelperText>
        <Select
          action={action}
          size="sm"
          placeholder={props.placeholder}
          value={props.selectedOption}
          slotProps={{
            button: { sx: { whiteSpace: 'nowrap' } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            minWidth: '220px',
            maxWidth: '220px',
            display: 'flex',
            flexShrink: 1,
            mt: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
            event && newValue && handleChange(newValue);
          }}
        >
          {props.options}
        </Select>
      </FormControl>
    </Box>
  );
}
