import { useParams } from 'react-router-dom';
import SEO from '../components/seo';
import { useQuery, gql } from '@apollo/client';

//components
import LicenseResult from 'src/components/licenses/LicenseResult';
//material UI
import { Box, Container, Grid, Skeleton, Stack } from '@material-ui/core';

export const LICENSE = gql`
  query oneLicense($id: ID!) {
    oneLicense(id: $id) {
      id
      software {
        name
        nameOfProduct
        kcm
        partNumber
      }
      contract {
        contractNumber
        platnostSA
        dateOfLifeCycle
        datumUkonceniHlavniFazeTechnickePodpory
        datumUkonceniPodporyAktualizaceSP1
        datumUkonceniPodporyAktualizaceSP2
        datumUkonceniPodporyAktualizaceSP3
        datumUkonceniPodporyAktualizaceSP4
      }
      evidenceNumber
      isAssigned
      licenseEvents {
        assignedAt
        assignedByUser {
          name
          id
        }
        LicenseEventType {
          value
        }
        station
        ticketId
      }
    }
  }
`;

const LicenseDetail = () => {
  let { licenseId } = useParams();

  const { data, loading, error } = useQuery(LICENSE, {
    variables: { id: licenseId }
  });

  /*  const { loading, error, data } = useQuery(USER, {
    variables: { id: licenseId }
  });

  if (error) {
    return `Loading user error: ${error.message}`;
  }
 */
  return (
    <>
      <SEO title={`License Detail ${licenseId}`} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%'
        }}
      >
        {error ? (
          error.message
        ) : (
          <Container maxWidth="xl">
            <Box mt={4} mb={2}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={500} />
              ) : (
                <LicenseResult data={data} />
              )}
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default LicenseDetail;
