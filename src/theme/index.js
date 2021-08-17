import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import palette from './palette';

const theme = createMuiTheme({
  palette,
  shadows,
  typography
});

export default theme;
