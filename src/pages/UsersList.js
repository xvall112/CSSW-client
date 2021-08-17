import { Box, Container } from '@material-ui/core';
import UserListResults from 'src/components/users/UsersListResults';
import UserListToolbar from 'src/components/users/UsersListToolbar';
import { customers } from 'src/__mocks__/customers';
import SEO from '../components/seo';

const UsersList = () => (
  <>
    <SEO title="Uživatelé" />
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box sx={{ pt: 3 }}>
          <UserListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default UsersList;
