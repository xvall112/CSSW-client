import React, { useState } from 'react';
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { debounce } from 'debounce';
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  CircularProgress
} from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

interface Item {
  id: number;
  name: string;
}

interface License {
  software: any;
}
interface Software {
  software: {
    id: any;
  };
}

//mutace na overeni zda je stanice v SIS
export const IS_STATION = gql`
  mutation isStation($station: Int) {
    isStation(station: $station)
  }
`;

//mutace na pridani lecenci na stanici
export const ADD_LICENSES = gql`
  mutation addLicenses(
    $station: Int!
    $requirement: String!
    $softwareId: [String]!
  ) {
    addLicenses(
      station: $station
      requirement: $requirement
      softwareId: $softwareId
    ) {
      id
      evidenceNumber
      software {
        name
      }
      station {
        name
      }
    }
  }
`;

//mutace pro nacteni veskereho softwaru
export const GET_ALL_SOFTWARE = gql`
  query allSoftware {
    allSoftware {
      id
      name
      nameOfProduct
    }
  }
`;

//mutace pro nacteni softwaru na stanici
export const GET_STATION_SOFTWARE = gql`
  query GetStationSoftware($station: Int!) {
    getStationLicenses(station: $station) {
      licenses {
        software {
          id
          name
        }
      }
    }
  }
`;

const FunctionAddSoftware = () => {
  const [station, setStation] = useState(2);

  const [addLicenses, { data, loading, error }] = useMutation(ADD_LICENSES, {
    onCompleted(data) {
      toast.success(
        `Na stanici ${station} byl úspěšně přidán software ${data.addLicenses.map(
          (license: License) => license.software.name
        )}`,
        {}
      );
    },
    onError(error) {
      toast.error(`Nepodařilo se přidat licence: ${error.message}`, {});
    },
    refetchQueries: ['GetLicenses', 'GetStationSoftware', 'allSoftware'],
    awaitRefetchQueries: true
  });

  const [
    isStation,
    { data: dataIsStation, loading: loadingIsStation, error: errorIsStation }
  ] = useMutation(IS_STATION);

  const {
    data: allSoftwareData,
    loading: allSoftwareDataLoading,
    error: allSoftwareDataError
  } = useQuery(GET_ALL_SOFTWARE);

  const {
    data: stationSoftwareData,
    loading: stationSoftwareDataLoading,
    error: stationSoftwareDataError
  } = useQuery(GET_STATION_SOFTWARE, {
    variables: {
      station: station ? station : 0
    }
  });

  //funkce volana po zadani cisla stanice do pole, vrati licence(software), ktery je instalovany na stanici
  const getStationSoftware = debounce((e: any) => {
    setStation(parseInt(e.target.value));
    isStation({ variables: { station: parseInt(e.target.value) } });
  }, 500);

  return (
    <Grid item xs={12}>
      <Formik
        initialValues={{
          station: null,
          pozadavek: '',
          software: []
        }}
        validationSchema={Yup.object().shape({
          station: Yup.number().required('Vyplňte číslo stanice'),
          pozadavek: Yup.string().max(255).required('Vyplňte číslo požadavku'),
          software: Yup.array().of(Yup.number()).required('Zvolte software')
        })}
        onSubmit={async (values, formik) => {
          await addLicenses({
            variables: {
              station: values.station,
              requirement: values.pozadavek,
              softwareId: values.software
            }
          });
          await formik.resetForm();
          await setStation(2);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              error={Boolean(touched.station && errors.station)}
              fullWidth
              helperText={touched.station && errors.station}
              label="Číslo stanice"
              margin="normal"
              name="station"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                getStationSoftware(e);
              }}
              type="number"
              value={values.station}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/*   kontrola zda je stanice v SIS */}
                    <>
                      {touched.station &&
                        (allSoftwareDataLoading ||
                        stationSoftwareDataLoading ||
                        loadingIsStation ? (
                          <CircularProgress />
                        ) : dataIsStation && dataIsStation.isStation ? (
                          <DoneIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        ))}
                    </>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              error={Boolean(touched.pozadavek && errors.pozadavek)}
              fullWidth
              helperText={touched.pozadavek && errors.pozadavek}
              label="Číslo požadavku"
              margin="normal"
              name="pozadavek"
              onBlur={handleBlur}
              onChange={handleChange}
              type="name"
              value={values.pozadavek}
              variant="outlined"
            />
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <FormControl
                sx={{ mt: 2 }}
                component="fieldset"
                variant="standard"
                error={Boolean(touched.software && errors.software)}
                onChange={handleChange}
              >
                <FormLabel component="legend">Software</FormLabel>
                <FormGroup>
                  {allSoftwareData.allSoftware &&
                    allSoftwareData.allSoftware.map((item: Item) => {
                      return (
                        /* disable veskereho softwaru ktery nelze instalovat na stanici */
                        <FormControlLabel
                          disabled={
                            !stationSoftwareDataLoading &&
                            stationSoftwareData.getStationLicenses
                              ? stationSoftwareData.getStationLicenses.licenses.some(
                                  (software: Software) =>
                                    software.software.id === item.id
                                )
                              : true
                          }
                          key={item.id}
                          control={
                            <Checkbox
                              checked={values.software.some(
                                (soft) => parseInt(soft) === item.id
                              )}
                              color="primary"
                              name="software"
                              value={item.id}
                            />
                          }
                          label={item.name}
                        />
                      );
                    })}
                </FormGroup>
                <FormHelperText>
                  {touched.software && errors.software}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Box sx={{ py: 2, mt: 'auto' }}>
              <Button
                color="primary"
                disabled={
                  isSubmitting ||
                  loading ||
                  (dataIsStation && !dataIsStation.isStation)
                }
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                přidat software
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default FunctionAddSoftware;
