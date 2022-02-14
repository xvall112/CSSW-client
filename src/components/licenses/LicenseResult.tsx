import React from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
//materialUI
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Stack
} from '@material-ui/core';
import { tableCellClasses } from '@mui/material/TableCell';

//components
import getInitials from 'src/utils/getInitials';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface Props {
  data: any;
}
const LicenseResult = ({ data }: Props): JSX.Element => {
  const {
    softwareAssurance,
    evidenceNumber,
    software,
    contract,
    isAssigned,
    licenseEvents
  } = data.oneLicense;

  function createData(name: string, value: any) {
    return { name, value };
  }

  const rowsSoftware = [
    createData('Název', software.name),
    createData('Název 2', software.nameOfProduct),
    createData('KČM', software.kcm),
    createData('Part Number', software.partNumber)
  ];

  const rowsContract = [
    createData('Číslo smlouvy', contract.contractNumber),
    createData(
      'Životní cyklus',
      contract.dateOfLifeCycle &&
        moment(contract.dateOfLifeCycle).format('DD/MM/YYYY')
    ),
    createData(
      'Platnost SA',
      contract.platnostSA && moment(contract.platnostSA).format('DD/MM/YYYY')
    ),
    createData(
      'Hlavní fáze technické podpory do',
      contract.datumUkonceniHlavniFazeTechnickePodpory &&
        moment(contract.datumUkonceniHlavniFazeTechnickePodpory).format(
          'DD/MM/YYYY'
        )
    ),
    createData(
      'Rozšířená podpora do',
      contract.datumUkonceniRozsirenePodpory &&
        moment(contract.datumUkonceniRozsirenePodpory).format('DD/MM/YYYY')
    ),
    createData(
      'Podpora Aktualizace SP1 do',
      contract.datumUkonceniPodporyAktualizaceSP1 &&
        moment(contract.datumUkonceniPodporyAktualizaceSP1).format('DD/MM/YYYY')
    ),
    createData(
      'Podpora Aktualizace SP2 do',
      contract.datumUkonceniPodporyAktualizaceSP2 &&
        moment(contract.datumUkonceniPodporyAktualizaceSP2).format('DD/MM/YYYY')
    ),
    createData(
      'Podpora Aktualizace SP3 do',
      contract.datumUkonceniPodporyAktualizaceSP3 &&
        moment(contract.datumUkonceniPodporyAktualizaceSP3).format('DD/MM/YYYY')
    ),
    createData(
      'Podpora Aktualizace SP4 do',
      contract.datumUkonceniPodporyAktualizaceSP4 &&
        moment(contract.datumUkonceniPodporyAktualizaceSP4).format('DD/MM/YYYY')
    )
  ];

  console.log('datum:', contract.datumUkonceniHlavniFazeTechnickePodpory);
  return (
    <div>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            component={RouterLink}
            to={`/app/licenses`}
          >
            <ChevronLeft />
            <Typography fontSize={16}>Licence</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Grid item xs={12}>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  Licence
                </Typography>
              </Grid>
              <Grid container direction="row" spacing={3}>
                <Grid item>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                    sx={{ textTransform: 'uppercase', marginBottom: '10px' }}
                  >
                    {evidenceNumber}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box textAlign="right">
                    <Chip
                      variant="outlined"
                      color={isAssigned ? 'warning' : 'success'}
                      size="small"
                      label={isAssigned ? 'přidělena' : 'volná'}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                  >
                    Software Assurance:
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                  >
                    {softwareAssurance === true ? 'Ano' : 'Ne'}
                  </Typography>
                </Stack>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Grid item xs={12}>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  sx={{ textTransform: 'uppercase' }}
                >
                  Software
                </Typography>
                <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsSoftware.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.value}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Grid item xs={12}>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  sx={{ textTransform: 'uppercase' }}
                >
                  Smlouva
                </Typography>
                <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsContract.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.value}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ maxHeight: '50vh', width: '100%', overflow: 'scroll' }}>
            <CardContent>
              <Grid item xs={12}>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  sx={{
                    textTransform: 'uppercase',
                    position: 'sticky',
                    top: '20px'
                  }}
                >
                  Historie licence
                </Typography>
                {licenseEvents.length === 0 ? (
                  <Typography>Licence nemá historii</Typography>
                ) : (
                  <Table
                    sx={{ minWidth: '100%' }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Akce</TableCell>
                        <TableCell>Stanice</TableCell>
                        <TableCell>Ticket</TableCell>
                        <TableCell>Datum</TableCell>
                        <TableCell>User</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {licenseEvents.map((row: any, index: any) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {/*  <Plus /> */}
                            {row.LicenseEventType.value}
                          </StyledTableCell>
                          <StyledTableCell>{row.station.name}</StyledTableCell>
                          <StyledTableCell>{row.ticketId}</StyledTableCell>
                          <StyledTableCell>
                            {moment(row.assignedAt).format('DD/MM/YYYY')}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Avatar
                              component={RouterLink}
                              to={`/app/account/${row.assignedByUser.id}`}
                              sx={{ mr: 2 }}
                            >
                              {getInitials(row.assignedByUser.name)}
                            </Avatar>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LicenseResult;
