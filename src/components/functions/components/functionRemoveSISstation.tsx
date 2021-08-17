import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Formik, FieldArray, getIn, Form } from 'formik';
import { Box, Button, TextField, Stack } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const FunctionRemoveSISstation = () => {
  /*  const navigate = useNavigate(); */
  return (
    <Box sx={{ height: '100%' }}>
      <Formik
        initialValues={{
          stations: [''],
          cisloPozadavku: ''
        }}
        validationSchema={Yup.object().shape({
          stations: Yup.array().of(
            Yup.number().required('Vyplňte číslo stanice')
          ),

          cisloPozadavku: Yup.string()
            .max(255)
            .required('Vyplňte číslo požadavku')
        })}
        onSubmit={(values, formik) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
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
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
            >
              {values.stations.length > 1
                ? 'odebrat stanice'
                : 'odebrat stanici'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FunctionRemoveSISstation;
