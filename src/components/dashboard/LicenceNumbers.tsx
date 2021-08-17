import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

const LicenceNumbers = (props: any) => {
  const { celkem, volne, obsazene, dluh } = props.data;
  return (
    <Grid item xs={12}>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={6}>
          <Typography color="textSecondary" gutterBottom variant="caption">
            celkem:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="button">
            <Box sx={{ color: 'info.main', fontWeight: 'bold' }}>{celkem}</Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={6}>
          <Typography color="textSecondary" gutterBottom variant="caption">
            volné:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="button">
            <Box sx={{ color: 'success.light', fontWeight: 'bold' }}>
              {volne}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={6}>
          <Typography color="textSecondary" gutterBottom variant="caption">
            přidělené:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="button">
            <Box sx={{ color: 'warning.light', fontWeight: 'bold' }}>
              {obsazene}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={6}>
          <Typography color="textSecondary" gutterBottom variant="caption">
            dluh:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="button">
            <Box sx={{ color: 'error.light', fontWeight: 'bold' }}>{dluh}</Box>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LicenceNumbers;
