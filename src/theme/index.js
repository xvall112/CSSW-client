import { createTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';
import palette from './palette';

const theme = createTheme({
  palette,
  shadows,
  typography
});

export default theme;
