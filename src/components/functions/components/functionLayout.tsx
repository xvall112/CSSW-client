import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';

interface Props {
  children: any;
  type: string;
  title: string;
  color: string;
}

const FunctionLayout = ({ children, type, title, color }: Props) => {
  return (
    <Card sx={{ height: 'auto' }}>
      <CardContent sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Grid container spacing={3} sx={{ justifyContent: 'space-around' }}>
            <Grid item xs={9}>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
                sx={{ textTransform: 'uppercase' }}
              >
                {type}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
                sx={{ textTransform: 'uppercase' }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Avatar
                sx={{
                  backgroundColor: color,
                  height: 56,
                  width: 56
                }}
              >
                <ComputerIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ height: '100%' }}>{children}</Box>
      </CardContent>
    </Card>
  );
};
export default FunctionLayout;
