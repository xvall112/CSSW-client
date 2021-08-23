import { Box, Container, Skeleton, Stack } from '@material-ui/core';
import UserListResults from 'src/components/users/UsersListResults';
import UserListToolbar from 'src/components/users/UsersListToolbar';
import SEO from '../components/seo';
import { useQuery, gql } from '@apollo/client';
//components
import Loading from '../components/Loading';

const USERS = gql`
  query GetUsers {
    users {
      id
      utvar
      createdAt
      userName
      name
      phone
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(USERS);

  if (error) return `Error! ${error.message}`;
  return (
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
            {loading ? <Loading /> : <UserListResults users={data.users} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UsersList;
