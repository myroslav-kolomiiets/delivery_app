import { CircularProgress, Stack } from '@mui/material';

export function OrdersLoadingState() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <CircularProgress size="3rem" />
    </Stack>
  );
}
