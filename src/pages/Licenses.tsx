import React, { useEffect } from 'react';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
//materialUI
import { Box, Container } from '@material-ui/core';
//components
import Loading from 'src/components/Loading';
import SoftwareListResults from 'src/components/software/SoftwareListResults';
import SoftwareListToolbar from 'src/components/software/SoftwareListToolbar';

import SoftwareList from 'src/components/software/SoftwareList';
import { searchLicensesQueryVar } from 'src/graphql/cahce';

export const LICENSES = gql`
  query GetLicenses($input: String, $limit: Int, $offset: Int) {
    licenses(input: $input, limit: $limit, offset: $offset) {
      countLicenses
      licenses {
        id
        station {
          name
        }
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
          ticketId
        }
      }
    }
  }
`;

const Licenses = () => {
  const searchLicensesQuery = useReactiveVar(searchLicensesQueryVar);

  useEffect(() => {
    /* searchLicensesQueryVar({ name: '', limit: 25, offset: 0, pageNumber: 0 }); */
  }, []);

  const { loading, error, data } = useQuery(LICENSES, {
    variables: {
      input: searchLicensesQuery.name,
      limit: searchLicensesQuery.limit,
      offset: searchLicensesQuery.offset
    }
  });

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
              <SoftwareListResults
                licenses={data.licenses.licenses}
                countLicenses={data.licenses.countLicenses}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Licenses;
