import { useQuery, gql } from '@apollo/client';
//materialUI
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
/* import Sales from 'src/components/dashboard/LicenceGraf.tsx'; */
//components
import LicenceCard from '../components/dashboard/LicenceCard.tsx';
import SEO from '../components/seo';

export const GET_ALL_SOFTWARE = gql`
  query allSoftware {
    allSoftware {
      id
      name
      nameOfProduct
      licenses {
        isAssigned
        station {
          name
        }
      }
    }
  }
`;

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_ALL_SOFTWARE, {
    pollInterval: 500
  });
  if (error) return error.message;
  return (
    <>
      <SEO title="Dashboard" />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {loading ? (
              <>
                <Grid item xs={12} md={4}>
                  <Skeleton variant="rectangular" width="100%" height={318} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Skeleton variant="rectangular" width="100%" height={318} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Skeleton variant="rectangular" width="100%" height={318} />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <LicenceCard software={data.allSoftware} />
              </Grid>
            )}

            {/* <Grid item xs={12}>
            <Sales />
          </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
