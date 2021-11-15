import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
}
const SoftwareListResults = ({ licenses, ...rest }: Props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  console.log('Software list result', licenses);
  /*  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  }; */

  const handleLimitChange = (event?: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event?: any, newPage?: any) => {
    setPage(newPage);
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
                .slice(page * limit, page * limit + limit)
                .map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.evidenceNumber}</TableCell>
                    <TableCell>{item.software.name}</TableCell>
                    <TableCell>{item.software.nameOfProduct}</TableCell>
                    <TableCell>{item.contract.contractNumber}</TableCell>
                    <TableCell>
                      <Chip
                        variant="outlined"
                        color={item.isAssigned ? 'warning' : 'success'}
                        size="small"
                        label={item.isAssigned ? 'přidělena' : 'volná'}
                      />
                    </TableCell>
                    <TableCell>
                      {item.isAssigned && item.licenseEvents[0].station}
                    </TableCell>
                    <TableCell>
                      {item.isAssigned && item.licenseEvents[0].ticketId}
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
        count={licenses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default SoftwareListResults;
