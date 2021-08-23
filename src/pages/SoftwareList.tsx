import { Box, Container } from '@material-ui/core';
import SoftwareListResults from 'src/components/software/SoftwareListResults';
import SoftwareListToolbar from 'src/components/software/SoftwareListToolbar';
import { useQuery, gql } from '@apollo/client';
import SEO from '../components/seo';
//components
import Loading from '../components/Loading';

const LICENCES = gql`
  query GetLicences {
    licences {
      id
      kcm
      nazev
      partNumber
      nameProduct
      SA
      SAplatnost
      evidenceNumber
      smlouva
      station
      pozadavek
      dateOfChange
    }
  }
`;

const SoftwareList = () => {
  const { loading, error, data } = useQuery(LICENCES);
  console.log(data);
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <SEO title="Software" />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <SoftwareListToolbar />
          <Box sx={{ pt: 3 }}>
            {loading ? (
              <Loading />
            ) : (
              <SoftwareListResults licences={data.licences} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default SoftwareList;
