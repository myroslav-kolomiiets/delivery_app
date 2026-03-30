import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormEventHandler } from 'react';
import type { CheckoutFormValues } from '@/hooks/useCheckoutForm';

type CheckoutFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  isLoading: boolean;
};

export function CheckoutForm({
  onSubmit,
  register,
  errors,
  isLoading,
}: CheckoutFormProps) {
  return (
    <Box mt={4} component="form" onSubmit={onSubmit}>
      <Typography variant="h5" mb={2}>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Email"
            fullWidth
            error={!!errors.email}
            {...register('email')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Phone"
            fullWidth
            error={!!errors.phone}
            {...register('phone')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Address"
            fullWidth
            error={!!errors.address}
            {...register('address')}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isLoading}>
        {isLoading ? 'Placing order...' : 'Submit Order'}
      </Button>
    </Box>
  );
}
