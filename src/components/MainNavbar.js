import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <Box height="50px">
          <Logo />
        </Box>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
