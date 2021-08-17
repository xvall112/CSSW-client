import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import SEO from '../components/seo';
import Logo from '../components/Logo';

const Login = () => {
  const navigate = useNavigate();

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
          <Formik
            initialValues={{
              userName: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string()
                .max(255)
                .required('Vyplňte uživatelské jméno'),
              password: Yup.string().max(255).required('Vyplňte heslo')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
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
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="Uživatelské jméno"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="userName"
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Heslo"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Přihlásit se
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
