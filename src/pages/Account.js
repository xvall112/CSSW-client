import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Skeleton, Stack } from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import SecurityAccount from 'src/components/account/SecurityAccount';
import SEO from '../components/seo';
import { useQuery, gql } from '@apollo/client';

export const USER = gql`
  query getUserQuery($id: ID!) {
    user(id: $id) {
      name
      id
      utvar
      userName
      phone
      role {
        name
        id
      }
    }
  }
`;

const Account = () => {
  let { userId } = useParams();

  const { loading, error, data } = useQuery(USER, {
    variables: { id: userId }
  });

  if (error) {
    return `Loading user error: ${error.message}`;
  }

  return (
    <>
      <SEO title="ucet" />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={118} />
              ) : (
                <Box position="sticky" top="25px">
                  <AccountProfile user={data.user} />
                </Box>
              )}
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
              ) : (
                <Stack spacing={3}>
                  <AccountProfileDetails user={data.user} />
                  <SecurityAccount user={data.user} />
                </Stack>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
