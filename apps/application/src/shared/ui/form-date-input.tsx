import { Box, FormControl, FormHelperText, Input, useColorScheme } from '@mui/joy';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export interface FormDateInputProps<T extends string> {
  id: T;
  value: string;
  placeholder: string;
  label: string;
  changeFilter: ({ key, value }: { key: T; value: string }) => void;
}
export default function FormrDateInput<T extends string>(props: FormDateInputProps<T>) {
  const { mode } = useColorScheme();
  return (
    <Box sx={{ display: 'flex', pt: 1 }}>
      <FormControl size="sm" id={props.id}>
        <FormHelperText>{props.label}</FormHelperText>
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
            mt: 1,
          }}
          type="date"
          autoComplete="false"
          value={props.value}
          onChange={(e) => props.changeFilter({ key: props.id, value: e.target.value })}
          placeholder={props.placeholder}
          startDecorator={<CalendarMonthOutlinedIcon />}
        />
      </FormControl>
    </Box>
  );
}
