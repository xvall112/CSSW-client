import React from 'react';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
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
  FormLabel
} from '@material-ui/core';
import { licence } from '../../../__mocks__/licence';

const UPDATE_LICENCE = gql`
  mutation UpdateLicence($input: UpdateLicenceInput) {
    updateLicence(input: $input) {
      nazev
      pozadavek
      station
    }
  }
`;

const FunctionAddSoftware = () => {
  const [updateLicence, { data, loading, error }] = useMutation(
    UPDATE_LICENCE,
    {
      refetchQueries: [
        'GetLicences' // Query name
      ]
    }
  );
  const instalSoftware = ['cali', 'office', 'operační systém'];

  return (
    <Grid item xs={12}>
      <Formik
        initialValues={{
          station: '',
          pozadavek: '',
          software: []
        }}
        validationSchema={Yup.object().shape({
          station: Yup.number().required('Vyplňte číslo stanice'),
          pozadavek: Yup.string().max(255).required('Vyplňte číslo požadavku'),
          software: Yup.array().required('Zvolte software')
        })}
        onSubmit={(values, formik) => {
          updateLicence({
            variables: {
              input: {
                station: values.station,
                pozadavek: values.pozadavek
              }
            }
          });
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);

          formik.resetForm();
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
          <form onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.station && errors.station)}
              fullWidth
              helperText={touched.station && errors.station}
              label="Číslo stanice"
              margin="normal"
              name="station"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.station}
              variant="outlined"
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
                  {licence.map((item) => {
                    return (
                      <FormControlLabel
                        disabled={instalSoftware.some(
                          (soft) => soft === item.title
                        )}
                        control={
                          <Checkbox
                            checked={values.software.some(
                              (soft) => soft === item.title
                            )}
                            color="primary"
                            name="software"
                            value={item.title}
                          />
                        }
                        label={item.title}
                        key={item.title}
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
                disabled={isSubmitting}
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
