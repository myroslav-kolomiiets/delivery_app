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
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFormState,
} from 'react-hook-form';
import type { CheckoutFormValues } from '@/hooks/useCheckoutForm';

type CheckoutFormProps = {
  onSubmit: React.FormHTMLAttributes<HTMLFormElement>['onSubmit'];
  register: UseFormRegister<CheckoutFormValues>;
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  isLoading: boolean;
};

export function CheckoutForm({
  onSubmit,
  register,
  control,
  errors,
  isLoading,
}: CheckoutFormProps) {
  const { touchedFields } = useFormState({ control });

  const isEmailValid = touchedFields.email && !errors.email;
  const isPhoneValid = touchedFields.phone && !errors.phone;
  const isAddressValid = touchedFields.address && !errors.address;

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
              placeholder="you@example.com"
              error={!!errors.email}
              helperText={
                errors.email?.message ||
                (isEmailValid ? 'Email looks good' : 'We will send order updates here')
              }
              {...register('email')}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+1 234 567 890"
                  error={!!errors.phone}
                  helperText={
                    errors.phone?.message ||
                    (isPhoneValid
                      ? 'Phone number looks good'
                      : 'Use a valid mobile phone number')
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d()+\-\s]/g, '');
                    field.onChange(value);
                  }}
                />
              )}
            />

            <TextField
              label="Address"
              fullWidth
              multiline
              minRows={3}
              placeholder="Street, house number, apartment, city"
              error={!!errors.address}
              helperText={
                errors.address?.message ||
                (isAddressValid ? 'Address looks good' : 'Delivery address')
              }
              {...register('address')}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
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
