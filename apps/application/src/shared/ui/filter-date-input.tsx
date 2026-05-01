import { Box, FormControl, FormHelperText, Input, useColorScheme } from '@mui/joy';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export interface FilterDateInputProps<T extends string> {
  id: T;
  value: string;
  placeholder: string;
  label: string;
  changeFilter: ({ key, value }: { key: T; value: string }) => void;
}
export default function FilterDateInput<T extends string>(props: FilterDateInputProps<T>) {
  const { mode } = useColorScheme();
  return (
    <Box sx={{ display: 'flex', pt: 1 }}>
      <FormControl size="sm" id={props.id}>
        <Input
          sx={{
            '&:focus-within': {
              '--Input-focusedHighlight':
                mode === 'light'
                  ? 'var(--joy-palette-neutral-400)'
                  : 'var(--joy-palette-neutral-400)',
            },
            minWidth: '150px',
            maxWidth: '150px',
            display: 'flex',
            flexShrink: 1,
          }}
          type="date"
          autoComplete="false"
          value={props.value}
          onChange={(e) => props.changeFilter({ key: props.id, value: e.target.value })}
          placeholder={props.placeholder}
          startDecorator={<CalendarMonthOutlinedIcon />}
        />
        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </Box>
  );
}
