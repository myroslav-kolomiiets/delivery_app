import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export function OrdersEmptyState() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px dashed',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'action.selected',
            color: 'primary.main',
          }}
        >
          <ShoppingBagOutlinedIcon />
        </Box>

        <Box>
          <Typography variant="h6" fontWeight={800}>
            No orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your order history will appear here after checkout.
          </Typography>
        </Box>

        <Button component={Link} href="/shops" variant="contained">
          Browse shops
        </Button>
      </Stack>
    </Paper>
  );
}
