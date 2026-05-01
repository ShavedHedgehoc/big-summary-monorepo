import { Box, FormControl, FormHelperText, IconButton, Input, useColorScheme } from '@mui/joy';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import React from 'react';

export interface FilterInputWithSortProps<T extends string> {
  id: T;
  value: string;
  sortAscValue: boolean;
  sortKey: T;
  disabled: boolean;
  placeholder: string;
  label: string;
  changeFilter: ({ key, value }: { key: T; value: string }) => void;
}

export default function FilterInputWithSort<T extends string>(props: FilterInputWithSortProps<T>) {
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
          autoComplete="off"
          value={props.value}
          onChange={(e) => props.changeFilter({ key: props.id, value: e.target.value })}
          placeholder={props.placeholder}
          startDecorator={
            <IconButton
              variant="plain"
              onClick={() => {
                props.changeFilter({
                  key: props.sortKey,
                  value: props.sortAscValue ? 'false' : 'true',
                });
              }}
              sx={[
                props.sortAscValue
                  ? { '& svg': { transform: 'rotate(0deg)' } }
                  : { '& svg': { transform: 'rotate(180deg)' } },
              ]}
            >
              <FilterListOutlinedIcon />
            </IconButton>
          }
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === 'dark' ? 'neutral' : 'neutral'}
                disabled={props.disabled}
                onClick={() => {
                  props.changeFilter({ key: props.id, value: '' });
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </Box>
  );
}
