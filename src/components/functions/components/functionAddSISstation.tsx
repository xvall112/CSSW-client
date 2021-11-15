import React from 'react';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Formik, FieldArray, getIn, Form } from 'formik';
import { Box, Button, TextField, Stack } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const ADD_STATION_TO_SIS = gql`
  mutation addStationToSISMutation($input: addStationToSISinput!) {
    addStationToSIS(input: $input) {
      name
    }
  }
`;
const FunctionAddSISstation = () => {
  const [addStationToSIS, { loading, error }] = useMutation(ADD_STATION_TO_SIS);
  /*  const navigate = useNavigate(); */

  return (
    <Box sx={{ height: '100%' }}>
      <Formik
        initialValues={{
          station: '222',
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
          }, 500);
          await values.stations.map(async (station) => {
            await addStationToSIS({
              variables: {
                input: {
                  stationNumber: station,
                  requirement: values.cisloPozadavku
                }
              }
            });
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
                            type="text"
                            value={station}
                            variant="outlined"
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
