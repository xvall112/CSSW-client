import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Stack
} from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { Search as SearchIcon } from 'react-feather';
import SoftwareImport from './SoftwareImport';
import { loggedUserVar } from 'src/graphql/cahce';

const SoftwareListToolbar = (props) => {
  const loggedUser = useReactiveVar(loggedUserVar);
  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ minWidth: 500 }}>
                <TextField
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
                  placeholder="Vyhledat licence"
                  variant="outlined"
                />
              </Box>
              {(loggedUser.role === 'admin' ||
                loggedUser.role === 'superAdmin') && <SoftwareImport />}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SoftwareListToolbar;
