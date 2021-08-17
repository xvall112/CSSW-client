import { Box, Container } from '@material-ui/core';
import SoftwareListResults from 'src/components/software/SoftwareListResults';
import SoftwareListToolbar from 'src/components/software/SoftwareListToolbar';
import { customers } from 'src/__mocks__/customers';
import SEO from '../components/seo';

const SoftwareList = () => (
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
        <SoftwareListToolbar />
        <Box sx={{ pt: 3 }}>
          <SoftwareListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default SoftwareList;
