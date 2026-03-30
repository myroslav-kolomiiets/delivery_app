'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useCouponsPage } from '@/hooks/useCouponsPage';

export default function CouponsPage() {
  const {
    coupons,
    isLoading,
    couponCode,
    setCouponCode,
    foundCoupon,
    applyCoupon,
    clearAppliedCoupon,
  } = useCouponsPage();

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Coupons
      </Typography>

      <Box mb={3} display="flex" gap={2} alignItems="center">
        <TextField
          label="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        <Button variant="contained" onClick={applyCoupon} disabled={!couponCode.trim()}>
          Apply coupon
        </Button>

        <Button variant="text" color="inherit" onClick={clearAppliedCoupon}>
          Clear coupon
        </Button>
      </Box>

      {foundCoupon ? (
        <Typography color="success.main" mb={2}>
          Coupon {`${foundCoupon.code}`} gives {foundCoupon.discount}% discount
        </Typography>
      ) : couponCode ? (
        <Typography color="error.main" mb={2}>
          Coupon not found
        </Typography>
      ) : null}

      {isLoading ? (
        <Typography>Loading coupons...</Typography>
      ) : (
        <Grid container spacing={2}>
          {coupons.map((coupon) => (
            <Grid key={coupon.id} size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{coupon.code}</Typography>
                  <Typography>Discount: {coupon.discount}%</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
