'use client';

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import { useCouponsPage } from '@/hooks/useCouponsPage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

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

  const appliedCoupon = useSelector((state: RootState) => state.cart.appliedCoupon);

  const activeCouponLabel = useMemo(() => {
    if (!appliedCoupon) return null;
    return `Promo ${appliedCoupon.code} · ${appliedCoupon.discount}%`;
  }, [appliedCoupon]);

  return (
    <Box p={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        }}
      >
        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1.25}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: 2,
                flexShrink: 0,
              }}
            >
              <LoyaltyOutlinedIcon fontSize="small" />
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800} lineHeight={1.1}>
                Coupons
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find a promo code, apply it to your cart, and save some money
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {activeCouponLabel ? (
            <Chip
              icon={<LocalOfferOutlinedIcon />}
              label={activeCouponLabel}
              color="success"
              sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No coupon applied yet
            </Typography>
          )}
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={800} mb={2}>
          Apply a coupon
        </Typography>

        <Box display="flex" gap={2} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
          <TextField
            fullWidth
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
          <Typography color="success.main" mt={1.5}>
            Coupon <strong>{foundCoupon.code}</strong> gives {foundCoupon.discount}%
            discount
          </Typography>
        ) : couponCode ? (
          <Typography color="error.main" mt={1.5}>
            Coupon not found
          </Typography>
        ) : null}
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={800} mb={2}>
          Available coupons
        </Typography>

        {isLoading ? (
          <Typography color="text.secondary">Loading coupons...</Typography>
        ) : (
          <Stack spacing={1.5}>
            {coupons.map((coupon) => (
              <Box
                key={coupon.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {coupon.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {coupon.discount}% discount
                  </Typography>
                </Box>

                <Chip
                  label={`${coupon.discount}%`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
