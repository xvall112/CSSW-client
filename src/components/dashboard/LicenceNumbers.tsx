import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

interface Props {
  pridelene: number;
  volne: number;
  celkem: number;
}
const LicenceNumbers = ({ pridelene, volne, celkem }: Props) => {
  const dluh = 0;

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
              {pridelene}
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
