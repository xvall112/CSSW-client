import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { searchUsersQueryVar } from 'src/graphql/cahce';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Alert
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import getInitials from 'src/utils/getInitials';

interface Props {
  users?: [];
  countUsers?: number;
}
const UsersListResults = ({ users, countUsers, ...rest }: Props) => {
  const searchUsersQuery = useReactiveVar(searchUsersQueryVar);

  const handleLimitChange = (event?: any) => {
    searchUsersQueryVar({
      name: searchUsersQuery.name,
      limit: event.target.value,
      offset: 0,
      pageNumber: 0
    });
  };

  const handlePageChange = (event?: any, newPage?: any) => {
    searchUsersQueryVar({
      name: searchUsersQuery.name,
      limit: searchUsersQuery.limit,
      offset: newPage * searchUsersQuery.limit,
      pageNumber: newPage
    });
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Jméno</TableCell>
                <TableCell>Uživatelské jméno</TableCell>
                <TableCell>Útvar</TableCell>
                <TableCell>Číslo</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Datum registrace</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length !== 0 ? (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar src={user.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.utvar}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role.name}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component={RouterLink}
                        to={`/app/account/${user.id}`}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    <Alert variant="outlined" severity="info">
                      {`Uživatel ${searchUsersQuery} nenalezen`}
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={countUsers ? countUsers : 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={searchUsersQuery.pageNumber}
        rowsPerPage={searchUsersQuery.limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default UsersListResults;
