import { useState } from 'react';
import PropTypes from 'prop-types';
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
  TableRow
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

interface Props {
  licences?: any;
}
const SoftwareListResults = ({ licences, ...rest }: Props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                <TableCell>KČM</TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Part Number</TableCell>
                <TableCell>Název produktu</TableCell>
                <TableCell>Software Assurance</TableCell>
                <TableCell>Platnost SA</TableCell>
                <TableCell>Evidenční číslo</TableCell>
                <TableCell>Smlouva</TableCell>
                <TableCell>Stanice</TableCell>
                <TableCell>Požadavek</TableCell>
                <TableCell>Datum změny</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {licences.slice(0, limit).map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.kcm}</TableCell>
                  <TableCell>{item.nazev}</TableCell>
                  <TableCell>{item.partNumber}</TableCell>
                  <TableCell>{item.nameProduct}</TableCell>
                  <TableCell>{item.SA}</TableCell>
                  <TableCell>{item.SAplatnost}</TableCell>
                  <TableCell>{item.evidenceNumber}</TableCell>
                  <TableCell>{item.smlouva}</TableCell>
                  <TableCell>{item.station}</TableCell>
                  <TableCell>{item.pozadavek}</TableCell>
                  <TableCell>
                    {moment(item.dateOfChange).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={licences.length}
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
