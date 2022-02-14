import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Alert
} from '@material-ui/core';
import SEO from '../components/seo';
import Logo from '../components/Logo';
import { AuthContext } from '../context/auth-context';

const USER_LOGIN = gql`
  mutation loginUser($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      name
      userName
      token
      role
    }
  }
`;
const validationSchema = yup.object({
  userName: yup.string().max(255).required('Vyplňte uživatelské jméno'),
  password: yup.string().max(255).required('Vyplňte heslo')
});

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginUser, { data, loading, error }] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      //po uspesnem prihlaseni ulozeni udaju o uzivateli do localStorge
      auth.login(
        data.login.id,
        data.login.token,
        data.login.name,
        data.login.userName,
        data.login.role
      );
      formik.resetForm();
      navigate(`/app/dashboard`);
    }
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await loginUser({
        variables: {
          userName: values.userName,
          password: values.password
        }
      });
    }
  });

  return (
    <>
      <SEO title="login" />
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Card>
            {(formik.isSubmitting || loading) && <LinearProgress />}
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Grid container direction="column">
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box height="100px" mb={3}>
                        <Logo />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                        align="center"
                      >
                        Přihlásit se do CSSW
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {error && <Alert severity="error">{error.message}</Alert>}

                <TextField
                  error={Boolean(
                    formik.touched.userName && formik.errors.userName
                  )}
                  fullWidth
                  helperText={formik.touched.userName && formik.errors.userName}
                  label="Uživatelské jméno"
                  margin="normal"
                  name="userName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="userName"
                  value={formik.values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Heslo"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting || loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Přihlásit se
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
