import { Box, Stack, Button, Skeleton, Grid } from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { searchLicensesQueryVar } from 'src/graphql/cahce';

export const GET_ALL_SOFTWARE = gql`
  query allSoftware {
    allSoftware {
      id
      name
      nameOfProduct
    }
  }
`;

interface Item {
  name: string;
  nameOfProduct: string;
  id: number;
}
const SoftwareList = () => {
  const { loading, error, data } = useQuery(GET_ALL_SOFTWARE);
  const searchLicensesQuery = useReactiveVar(searchLicensesQueryVar);

  const handleClick = (software: string) => {
    searchLicensesQueryVar({
      name: software,
      limit: searchLicensesQuery.limit,
      offset: 0,
      pageNumber: 0
    });
  };
  return (
    <>
      {error ? (
        error.message
      ) : loading ? (
        <Skeleton variant="text" />
      ) : (
        <Stack direction="row" spacing={2} sx={{ overflowX: 'scroll' }}>
          <Button
            onClick={() => {
              handleClick('');
            }}
            sx={{
              minWidth: '100px'
            }}
          >
            vše
          </Button>

          {data.allSoftware.map((item: Item) => (
            <Button
              onClick={() => {
                handleClick(item.name);
              }}
              sx={{
                minWidth: '130px'
              }}
              key={item.name}
            >
              {item.name}
            </Button>
          ))}
        </Stack>
      )}
    </>
  );
};
export default SoftwareList;
