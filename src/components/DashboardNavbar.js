import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logout from 'src/components/account/Logout';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item>
              <Box height="50px">
                <Logo />
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography variant="h4" color="primaryText">
                  CSSW
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/*  menu na odhlaseni */}
        <Logout />

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
