'use client';

import Link from 'next/link';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={Link} href="/shops">
            Shops
          </Button>

          <Button color="inherit" component={Link} href="/cart">
            Cart
          </Button>

          <Button color="inherit" component={Link} href="/orders">
            History
          </Button>

          <Button color="inherit" component={Link} href="/coupons">
            Coupons
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
