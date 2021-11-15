import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Alert, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { UserPlus as UserPlusIcon } from 'react-feather';

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      name
    }
  }
`;

const states = [
  {
    value: 2,
    label: 'User'
  },
  {
    value: 1,
    label: 'Admin'
  }
];

const validationSchema = yup.object({
  name: yup.string().required('Vyplňte jméno'),
  userName: yup.string().required('Vyplňte uživatelské jméno'),
  utvar: yup.number().integer('pouze číslo').required('Vyplňte útvar'),
  phone: yup.number().integer('pouze číslo').required('Vyplňte telefoní číslo'),
  role: yup.string().required('Zvolte roli')
});

const AddUserForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [
      'GetSearchUsers' // Query name
    ]
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      userName: '',
      utvar: '',
      phone: '',
      role: '2'
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await createUser({
        variables: {
          input: { ...values, role: parseInt(values.role) }
        }
      });
      await formik.resetForm();
      await handleClose();
      await toast.success(`Uživatel ${values.name} byl úspěšně přidán`, {});
    }
  });

  return (
    <div>
      <Button
        startIcon={<UserPlusIcon />}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        přidat uživatele
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {loading && <LinearProgress />}

        <DialogTitle>Přidat uživatele</DialogTitle>
        {error && (
          <DialogTitle>
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </DialogTitle>
        )}
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

            <TextField
              sx={{ mt: 2 }}
              error={Boolean(formik.touched.role && formik.errors.role)}
              fullWidth
              helperText={formik.touched.role && formik.errors.role}
              label="Role"
              name="role"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              SelectProps={{ native: true }}
              value={formik.values.role}
              variant="outlined"
            >
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={formik.isSubmitting || loading}
            >
              Zrušit
            </Button>
            <Button
              variant="contained"
              disabled={formik.isSubmitting || loading}
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
