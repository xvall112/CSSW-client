import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Logout from '@material-ui/icons/Logout';
import { useReactiveVar } from '@apollo/client';
import { loggedUserVar } from 'src/graphql/cahce';

const AccountMenu = () => {
  const userData = useReactiveVar(loggedUserVar);
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          component={Link}
          to={`/app/account/${userData && userData['id']}`}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Nastavení účtu
        </MenuItem>

        <MenuItem onClick={() => auth.logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Odhlásit se
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default AccountMenu;
