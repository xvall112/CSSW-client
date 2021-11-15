import React from 'react';
import { Box, Container } from '@material-ui/core';
import Loading from 'src/components/Loading';
import SoftwareListResults from 'src/components/software/SoftwareListResults';
import SoftwareListToolbar from 'src/components/software/SoftwareListToolbar';
import { useQuery, gql } from '@apollo/client';
import SoftwareList from 'src/components/software/SoftwareList';

export const LICENSES = gql`
  query GetLicenses {
    licenses {
      id
      software {
        name
        nameOfProduct
      }
      contract {
        contractNumber
      }
      evidenceNumber
      isAssigned
      licenseEvents {
        station
        ticketId
      }
    }
  }
`;

const Licenses = () => {
  const { loading, error, data } = useQuery(LICENSES);
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <SoftwareList />
        <SoftwareListToolbar />
        {error ? (
          `Error! ${error.message}`
        ) : (
          <Box sx={{ pt: 3 }}>
            {loading ? (
              <Loading />
            ) : (
              <SoftwareListResults licenses={data.licenses} />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Licenses;
