import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack
} from '@material-ui/core';
import DeleteAccount from './DeleteAccount';

const validationSchema = yup.object({
  name: yup.string().required('Vyplňte jméno'),
  userName: yup.string().required('Vyplňte uživatelské jméno'),
  utvar: yup.number().integer('pouze číslo').required('Vyplňte útvar'),
  phone: yup.number().integer('pouze číslo').required('Vyplňte telefoní číslo')
});

const AccountProfileDetails = (props) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      userName: '',
      utvar: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Card>
        <CardHeader
          /* subheader="The information can be edited" */ title="ÚČET"
        />
        <Divider />
        <CardContent>
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
          <Stack direction="row" alignItems="center">
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
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <DeleteAccount />
          <Button
            color="primary"
            variant="contained"
            disabled={formik.isSubmitting}
            type="submit"
          >
            uložit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
