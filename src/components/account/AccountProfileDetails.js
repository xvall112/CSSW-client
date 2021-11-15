import * as yup from 'yup';
import { useFormik } from 'formik';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Button,
  LinearProgress
} from '@material-ui/core';
import DeleteAccount from './DeleteAccount';
import { toast } from 'react-toastify';
import { USER } from '../../pages/Account';
import { loggedUserVar } from 'src/graphql/cahce';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      utvar
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
  utvar: yup.number().integer('pouze číslo').required('Vyplňte útvar'),
  phone: yup.number().integer('pouze číslo').required('Vyplňte telefoní číslo'),
  role: yup.string().required('Zvolte roli')
});

const AccountProfileDetails = (props) => {
  const logedUser = useReactiveVar(loggedUserVar);
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [USER]
  });

  const {
    user: { id, name, userName, utvar, phone, role }
  } = props;

  const formik = useFormik({
    initialValues: {
      name: name,
      utvar: utvar,
      phone: phone,
      role: role.id
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateUser({
        variables: {
          input: { ...values, role: parseInt(values.role) },
          id: id
        }
      });
      await toast.success(
        `Změna údajů uživatele ${values.name} proběhla úspěšně`,
        {}
      );
    }
  });
  if (error) {
    toast.error(
      `Uživateli ${name} se nepodařilo změnit údaje: ${error.message}`
    );
  }
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Card>
        {loading && <LinearProgress />}

        <CardHeader
          /* subheader="The information can be edited" */ title="ÚČET"
        />
        <Divider />
        <CardContent>
          <TextField
            disabled={logedUser.role === 'user'}
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
          <Stack direction="row" alignItems="center">
            <TextField
              disabled
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="Uživatelské jméno"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="name"
              value={userName}
              variant="outlined"
            />
            <TextField
              disabled={logedUser.role === 'user'}
              sx={{ ml: 2, mt: 1 }}
              helperText={formik.touched.role && formik.errors.role}
              error={Boolean(formik.touched.role && formik.errors.role)}
              fullWidth
              label="Role"
              name="role"
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
          </Stack>
          <Stack direction="row" alignItems="center">
            <TextField
              disabled={logedUser.role === 'user'}
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
              disabled={logedUser.role === 'user'}
              sx={{ ml: 2 }}
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
          </Stack>
        </CardContent>
        {logedUser.role !== 'user' && (
          <>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 2
              }}
            >
              <DeleteAccount
                userData={{ id, name }}
                disabled={formik.isSubmitting || loading}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={formik.isSubmitting || loading}
                type="submit"
              >
                uložit
              </Button>
            </Box>
          </>
        )}
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
