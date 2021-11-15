import { Box, Stack, Button } from '@material-ui/core';
import SEO from '../seo';

//components

const items = [
  {
    href: '/app/software/oplicences',
    title: 'OPERAČNÍ SYSTÉM'
  },
  {
    title: 'CALI'
  },
  {
    title: 'OFFICE'
  },
  {
    title: 'ANTIVIRUS'
  },
  {
    title: 'MICROSOFT VISIO'
  },
  {
    title: 'MICROSOFT PROJECT'
  },
  {
    title: 'SERVER'
  }
];

const SoftwareList = () => {
  return (
    <>
      <SEO title="Software" />

      <Stack direction="row" spacing={2}>
        {items.map((item) => {
          return (
            <Box key={item.title}>
              <Button>{item.title} </Button>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};
export default SoftwareList;
