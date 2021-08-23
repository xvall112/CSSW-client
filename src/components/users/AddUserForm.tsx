import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      phone
      utvar
      name
      userName
    }
  }
`;

const validationSchema = yup.object({
  name: yup.string().required('Vyplňte jméno'),
  userName: yup.string().required('Vyplňte uživatelské jméno'),
  utvar: yup.number().integer('pouze číslo').required('Vyplňte útvar'),
  phone: yup.number().integer('pouze číslo').required('Vyplňte telefoní číslo')
});

const AddUserForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [
      'GetUsers' // Query name
    ]
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      userName: '',
      utvar: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createUser({
        variables: {
          input: values
        }
      });
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        formik.resetForm();
        handleClose();
      }, 500);
    }
  });
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        přidat uživatele
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Přidat uživatele</DialogTitle>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <DialogContent>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Jméno"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="name"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="Uživatelské jméno"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="name"
              value={formik.values.userName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.utvar && formik.errors.utvar)}
              fullWidth
              helperText={formik.touched.utvar && formik.errors.utvar}
              label="Útvar"
              margin="normal"
              name="utvar"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.utvar}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Telefonní číslo"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.phone}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={formik.isSubmitting}>
              Zrušit
            </Button>
            <Button
              variant="contained"
              disabled={formik.isSubmitting}
              type="submit"
            >
              Přidat
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddUserForm;
