import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
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
    <Accordion
      defaultExpanded
      elevation={0}
      disableGutters
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocalShippingOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="h6" fontWeight={800}>
            Checkout
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message || ' '}
              {...register('email')}
            />

            <TextField
              label="Phone"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message || ' '}
              {...register('phone')}
            />

            <TextField
              label="Address"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message || ' '}
              {...register('address')}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, borderRadius: 2, textTransform: 'none' }}
            disabled={isLoading}
          >
            {isLoading ? 'Placing order...' : 'Submit Order'}
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
