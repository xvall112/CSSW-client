import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik, FieldArray, getIn, Form } from 'formik';
import { Box, Button, TextField, Stack } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { toast } from 'react-toastify';

interface Stanice {
  name: number;
}

//mutace pro pridani stanice do SIS
const ADD_STATION_TO_SIS = gql`
  mutation addStationToSis($stations: [Int]!) {
    addStationToSis(stations: $stations) {
      name
    }
  }
`;

//query na nacteni vsech stanic v SIS
export const ALL_STATIONS = gql`
  query allStations {
    allStations {
      name
    }
  }
`;

const FunctionAddSISstation = () => {
  const {
    data: dataAllStation,
    loading: loadingAllStation,
    error: errorAllStation
  } = useQuery(ALL_STATIONS);

  const [addStationsToSIS, { data, loading, error }] = useMutation(
    ADD_STATION_TO_SIS,
    {
      onCompleted(data) {
        toast.success(`Stanice byly úspěšně přidány`);
      },
      onError(error) {
        toast.error(`Nepodařilo se přidat stanice`);
      },
      refetchQueries: [
        'GetLicenses',
        'GetStationSoftware',
        'getStationLicenses',
        'allSoftware',
        'allStations'
      ],
      awaitRefetchQueries: true
    }
  );

  return (
    <Box sx={{ height: '100%' }}>
      <Formik
        initialValues={{
          stations: [''],
          cisloPozadavku: ''
        }}
        validationSchema={Yup.object().shape({
          stations: Yup.array().of(
            Yup.string().required('Vyplňte číslo stanice')
          ),
          cisloPozadavku: Yup.string()
            .max(255)
            .required('Vyplňte číslo požadavku')
        })}
        onSubmit={async (values, formik) => {
          addStationsToSIS({
            variables: {
              stations: values.stations
            }
          });
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
          <Form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              height: '100%'
            }}
          >
            <TextField
              error={Boolean(touched.cisloPozadavku && errors.cisloPozadavku)}
              fullWidth
              helperText={touched.cisloPozadavku && errors.cisloPozadavku}
              label="Číslo požadavku"
              margin="normal"
              name="cisloPozadavku"
              onBlur={handleBlur}
              onChange={handleChange}
              type="name"
              value={values.cisloPozadavku}
              variant="outlined"
            />

            <FieldArray name="stations">
              {({ push, remove }) => (
                <div>
                  {values.stations.map((station, index) => {
                    const cisloStanice = `stations[${index}]`;
                    const touchedCisloStanice = getIn(touched, cisloStanice);
                    const errorCisloStanice = getIn(errors, cisloStanice);

                    return (
                      <div key={index}>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <TextField
                            error={Boolean(
                              touchedCisloStanice && errorCisloStanice
                            )}
                            fullWidth
                            helperText={
                              touchedCisloStanice && errorCisloStanice
                            }
                            label="Číslo stanice"
                            margin="normal"
                            name={cisloStanice}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="number"
                            value={station}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {/* overeni zda je stanice v SIS */}
                                  <>
                                    {touchedCisloStanice &&
                                      dataAllStation &&
                                      (dataAllStation.allStations.some(
                                        (Astation: Stanice) => {
                                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                          return (
                                            Astation.name === parseInt(station)
                                          );
                                        }
                                      ) ? (
                                        <CancelIcon color="error" />
                                      ) : (
                                        <DoneIcon color="success" />
                                      ))}
                                  </>
                                </InputAdornment>
                              )
                            }}
                          />
                          {index !== 0 && (
                            <Button color="error" onClick={() => remove(index)}>
                              <CloseIcon />
                            </Button>
                          )}
                        </Stack>
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => push('')}
                  >
                    <AddIcon />
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
            >
              {values.stations.length > 1 ? 'Přidat stanice' : 'Přidat stanici'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FunctionAddSISstation;
