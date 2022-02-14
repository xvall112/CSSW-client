import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Stack
} from '@material-ui/core';
import { debounce } from 'debounce';
import { useReactiveVar } from '@apollo/client';
import { Search as SearchIcon } from 'react-feather';
import SoftwareImport from './SoftwareImport';
import { loggedUserVar, searchLicensesQueryVar } from 'src/graphql/cahce';

const SoftwareListToolbar = (props) => {
  const loggedUser = useReactiveVar(loggedUserVar);
  const searchLicensesQuery = useReactiveVar(searchLicensesQueryVar);
  const handleChange = debounce((event) => {
    searchLicensesQueryVar({
      name: event.target.value,
      limit: searchLicensesQuery.limit,
      offset: 0,
      pageNumber: 0
    });
  }, 500);

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
                  placeholder="Vyhledat licence"
                  variant="outlined"
                />
              </Box>
              {(loggedUser.role === 'admin' || loggedUser.role === 'owner') && (
                <SoftwareImport />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SoftwareListToolbar;
