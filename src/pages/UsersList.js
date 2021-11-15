import { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import UserListResults from 'src/components/users/UsersListResults';
import UserListToolbar from 'src/components/users/UsersListToolbar';
import SEO from '../components/seo';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { searchUsersQueryVar } from 'src/graphql/cahce';
//components
import Loading from '../components/Loading';

export const SEARCH_USERS = gql`
  query GetSearchUsers($contains: String) {
    searchUsers(contains: $contains) {
      name
      utvar
      id
      userName
      phone
      role {
        name
      }
      createdAt
    }
  }
`;

const UsersList = () => {
  useEffect(() => {
    searchUsersQueryVar('');
  }, []);

  const searchUsersQuery = useReactiveVar(searchUsersQueryVar);

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: {
      contains: searchUsersQuery
    }
  });

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
            {loading ? (
              <Loading />
            ) : (
              <UserListResults users={data.searchUsers} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UsersList;
