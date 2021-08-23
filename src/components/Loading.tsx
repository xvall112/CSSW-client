import { Skeleton, Stack } from '@material-ui/core';

const Loading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
    </Stack>
  );
};

export default Loading;
