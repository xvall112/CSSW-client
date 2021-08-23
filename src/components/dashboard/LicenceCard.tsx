import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import LicenceNumbers from './LicenceNumbers';
import EmptyLicenceGraph from './EmptyLicenceGraph';
import ComputerIcon from '@material-ui/icons/Computer';

interface Props {
  props: any;
  licence: any;
}

const LicenceCard = (props: Props) => {
  const { licence } = props;
  return (
    <Grid container direction="row" spacing={2}>
      {licence.map((item: any, index: any) => (
        <Grid item xs={12} md={4} key={index}>
          <Card sx={{ height: '100%' }} {...props} key={item.title}>
            <CardContent>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  sx={{ justifyContent: 'space-around' }}
                >
                  <Grid item xs={9}>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      Licence
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h3"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        height: 56,
                        width: 56
                      }}
                    >
                      <ComputerIcon color="secondary" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" item xs={12}>
                <Grid item xs={12} md={6}>
                  <LicenceNumbers data={item.data} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmptyLicenceGraph data={item.data} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default LicenceCard;
