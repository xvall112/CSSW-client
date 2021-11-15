import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { loggedUserVar } from 'src/graphql/cahce';
import PropTypes from 'prop-types';
import getInitials from 'src/utils/getInitials';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_3.png'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/functions',
    icon: SettingsIcon,
    title: 'Funkce'
  },
  {
    href: '/app/licenses',
    icon: ShoppingBagIcon,
    title: 'Software'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Účty'
  }
];

const userItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/functions',
    icon: SettingsIcon,
    title: 'Funkce'
  },
  {
    href: '/app/licenses',
    icon: ShoppingBagIcon,
    title: 'Software'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const logedUser = useReactiveVar(loggedUserVar);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatarUrl}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to={`/app/account/${logedUser && logedUser.id}`}
        >
          {getInitials(logedUser.name)}
        </Avatar>
        <Typography color="textPrimary" variant="h5">
          {logedUser && logedUser.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {logedUser && logedUser.userName}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {(logedUser.role === 'user' ? userItems : items).map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          Máte připomínky?
        </Typography>
        <Typography align="center" variant="body2">
          Napište nám
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button color="primary" component="a" href="" variant="contained">
            Formulář
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
