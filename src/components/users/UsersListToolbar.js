import { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddUserForm from './AddUserForm';
import { debounce } from 'debounce';
import { searchUsersQueryVar } from 'src/graphql/cahce';

const UsersListToolbar = (props) => {
  useEffect(() => {
    searchUsersQueryVar('');
  }, []);
  const handleChange = debounce((event) => {
    searchUsersQueryVar(event.target.value);
  }, 500);
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/*  <Button>
        Import
      </Button>
      <Button sx={{ mx: 1 }}>
        Export
      </Button> */}
        <AddUserForm />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={(event) => handleChange(event)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Vyhledej uživatele"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UsersListToolbar;
