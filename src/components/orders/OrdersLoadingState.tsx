import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export function OrdersLoadingState() {
  return (
    <Box p={3}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '50vh' }}
        spacing={2}
      >
        <CircularProgress />
        <Typography color="text.secondary">Loading order history...</Typography>
      </Stack>
    </Box>
  );
}
