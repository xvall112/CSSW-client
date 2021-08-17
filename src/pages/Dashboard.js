import { Box, Container, Grid } from '@material-ui/core';
/* import Sales from 'src/components/dashboard/LicenceGraf.tsx'; */

import { licence } from 'src/__mocks__/licence';
import LicenceCard from '../components/dashboard/LicenceCard.tsx';
import SEO from '../components/seo';

const Dashboard = () => (
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
          <Grid item xs={12}>
            <LicenceCard licence={licence} />
          </Grid>
          {/* <Grid item xs={12}>
            <Sales />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
