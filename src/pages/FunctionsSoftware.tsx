import React from 'react';

import { Box } from '@material-ui/core';
import SEO from '../components/seo';
import Functions from '../components/functions/Function';

const FunctionsSoftware = () => {
  return (
    <>
      <SEO title="Funkce" />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          p: 3
        }}
      >
        {' '}
        <Functions />
      </Box>
    </>
  );
};

export default FunctionsSoftware;
