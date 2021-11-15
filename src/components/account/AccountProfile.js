import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const AccountProfile = ({ user }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h3">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {user.userName}
        </Typography>
        {/*  <Typography color="textSecondary" variant="body1">
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);

export default AccountProfile;
