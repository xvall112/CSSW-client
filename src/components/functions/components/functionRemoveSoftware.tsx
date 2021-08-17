import React from 'react';
import * as Yup from 'yup';

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

const FunctionRemoveSoftware = () => {
  const instalSoftware = ['cali', 'office', 'operační systém'];
  return (
    <Grid item xs={12}>
      <Formik
        initialValues={{
          cisloStanice: '',
          cisloPozadavku: '',
          software: []
        }}
        validationSchema={Yup.object().shape({
          cisloStanice: Yup.number().required('Vyplňte číslo stanice'),
          cisloPozadavku: Yup.string()
            .max(255)
            .required('Vyplňte číslo požadavku'),
          software: Yup.array().required('Zvolte software')
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
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
              error={Boolean(touched.cisloStanice && errors.cisloStanice)}
              fullWidth
              helperText={touched.cisloStanice && errors.cisloStanice}
              label="Číslo stanice"
              margin="normal"
              name="cisloStanice"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.cisloStanice}
              variant="outlined"
            />
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
                        disabled={
                          !instalSoftware.some((soft) => soft === item.title)
                        }
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
                odebrat software
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default FunctionRemoveSoftware;
