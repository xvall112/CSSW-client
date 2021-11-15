import * as Yup from 'yup';
import { useFormik } from 'formik';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  Alert,
  LinearProgress
} from '@material-ui/core';
import { loggedUserVar } from 'src/graphql/cahce';
//components
import ResetPassword from './ResetPassword';

const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword(
    $id: ID!
    $newPassword: String!
    $oldPassword: String!
  ) {
    changeUserPassword(
      id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      name
      userName
    }
  }
`;

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Vyplňte současné heslo'),
  newPassword: Yup.string().required('Vyplňte nové heslo'),
  checkNewPassword: Yup.string()
    .required('Zadejte nové heslo pro overeni')
    .oneOf([Yup.ref('newPassword')], 'Hesla se neshodují')
});

interface Props {
  user: { id: String; name: String };
}
const SecurityAccount = ({ user }: Props) => {
  const logedUser = useReactiveVar(loggedUserVar);
  const { id, name } = user;
  const [changeUserPassword, { data, loading, error }] =
    useMutation(CHANGE_USER_PASSWORD);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      checkNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await changeUserPassword({
        variables: {
          id: id,
          newPassword: values.newPassword,
          oldPassword: values.oldPassword
        }
      });
      await formik.resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Card>
        {loading && <LinearProgress />}

        <CardHeader subheader="Změna hesla" title="ZABEZPEČENÍ" />
        {error && (
          <Box m={1}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        )}
        {data && (
          <Box m={1}>
            <Alert severity="success">{`${data.changeUserPassword.name} Vaše heslo bylo úspěšně změněno`}</Alert>
          </Box>
        )}
        <Divider />
        <CardContent>
          <TextField
            error={Boolean(
              formik.touched.oldPassword && formik.errors.oldPassword
            )}
            fullWidth
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            label="Současné heslo"
            margin="normal"
            name="oldPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.oldPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(
              formik.touched.newPassword && formik.errors.newPassword
            )}
            fullWidth
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            label="Nové heslo"
            margin="normal"
            name="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.newPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(
              formik.touched.checkNewPassword && formik.errors.checkNewPassword
            )}
            fullWidth
            helperText={
              formik.touched.checkNewPassword && formik.errors.checkNewPassword
            }
            label="Ověření nového hesla"
            margin="normal"
            name="checkNewPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.checkNewPassword}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          {logedUser && logedUser['role'] !== 'user' && (
            <ResetPassword
              userData={{ id, name }}
              disabled={formik.isSubmitting || loading}
            />
          )}

          <Button
            color="primary"
            variant="contained"
            disabled={formik.isSubmitting || loading}
            type="submit"
          >
            změnit heslo
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SecurityAccount;
