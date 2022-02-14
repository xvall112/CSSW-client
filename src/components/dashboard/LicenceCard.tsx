import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import LicenceNumbers from './LicenceNumbers';
import EmptyLicenceGraph from './EmptyLicenceGraph';
import ComputerIcon from '@material-ui/icons/Computer';

interface Props {
  software: any;
}

const LicenceCard = ({ software }: Props) => {
  return (
    <Grid container direction="row" spacing={2}>
      {software.map((item: any) => {
        const celkem = item.licenses.length;
        const volne = item.licenses.filter(
          (item: any) => item.isAssigned === false
        ).length;
        const pridelene = item.licenses.filter(
          (item: any) => item.isAssigned === true
        ).length;
        return (
          <Grid item xs={12} md={4} key={item.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-around' }}
                  >
                    <Grid item xs={9}>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                      >
                        Licence
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h3"
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {item.name}
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
                    <LicenceNumbers
                      celkem={celkem}
                      pridelene={pridelene}
                      volne={volne}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <EmptyLicenceGraph
                      celkem={celkem}
                      pridelene={pridelene}
                      volne={volne}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default LicenceCard;
