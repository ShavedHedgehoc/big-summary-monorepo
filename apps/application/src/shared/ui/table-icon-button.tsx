// import { IconButton, styled } from '@mui/joy';

// export const TableIconButton: typeof IconButton = styled(IconButton, { slot: 'root' })(({ theme }) => ({
//   '&.MuiIconButton-colorDanger': { color: theme.vars.palette.darkPalette.tableButtonDanger },
//   '&.MuiIconButton-colorSuccess ': { color: theme.vars.palette.darkPalette.tableButtonSuccess },
//   '&.MuiIconButton-colorWarning ': { color: theme.vars.palette.darkPalette.tableButtonWarning },
//   '&.Mui-disabled': { color: theme.vars.palette.text.tertiary },
// }));

import * as React from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/joy';

const StyledIconButton = styled(IconButton, { slot: 'root' })(({ theme }) => ({
  '&.MuiIconButton-colorDanger': { color: theme.vars.palette.darkPalette.tableButtonDanger },
  '&.MuiIconButton-colorSuccess': { color: theme.vars.palette.darkPalette.tableButtonSuccess },
  '&.MuiIconButton-colorWarning': { color: theme.vars.palette.darkPalette.tableButtonWarning },
  '&.Mui-disabled': { color: theme.vars.palette.text.tertiary },
}));

export function TableIconButton(props: IconButtonProps): React.JSX.Element {
  return <StyledIconButton {...props} />;
}
