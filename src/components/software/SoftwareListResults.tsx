import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { searchLicensesQueryVar } from 'src/graphql/cahce';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Chip
} from '@material-ui/core';

interface Props {
  licenses?: any;
  countLicenses?: number;
}
const SoftwareListResults = ({ licenses, countLicenses, ...rest }: Props) => {
  const searchLicensesQuery = useReactiveVar(searchLicensesQueryVar);

  //nastaveni pocet vysledku na stranku
  const handleLimitChange = (event: any) => {
    searchLicensesQueryVar({
      name: searchLicensesQuery.name,
      limit: event.target.value,
      offset: 0,
      pageNumber: 0
    });
  };

  const handlePageChange = (event?: any, newPage?: any) => {
    searchLicensesQueryVar({
      name: searchLicensesQuery.name,
      limit: searchLicensesQuery.limit,
      offset: newPage * searchLicensesQuery.limit,
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
                <TableCell>Evidenční číslo</TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Smlouva</TableCell>
                <TableCell>Stav</TableCell>
                <TableCell>Stanice</TableCell>
                <TableCell>Požadavek</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {licenses
                /* .slice(page * limit, page * limit + limit) */
                .map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.evidenceNumber}</TableCell>
                    <TableCell>{item.software.name}</TableCell>
                    <TableCell>{item.software.nameOfProduct}</TableCell>
                    <TableCell>{item.contract.contractNumber}</TableCell>
                    <TableCell>
                      <Chip
                        variant="outlined"
                        color={item.station ? 'warning' : 'success'}
                        size="small"
                        label={item.station ? 'přidělena' : 'volná'}
                      />
                    </TableCell>
                    <TableCell>{item.station && item.station.name}</TableCell>
                    <TableCell>
                      {item.station && item.licenseEvents[0].ticketId}
                    </TableCell>
                    <TableCell>
                      <RouterLink to={`/app/licenses/${item.id}`}>
                        detail
                      </RouterLink>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={countLicenses ? countLicenses : 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={searchLicensesQuery.pageNumber}
        rowsPerPage={searchLicensesQuery.limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default SoftwareListResults;
