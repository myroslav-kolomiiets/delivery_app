import { z } from 'zod';
import validator from 'validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().refine((v) => validator.isMobilePhone(v, 'any'), {
    message: 'invalid',
  }),
  address: z.string().min(5),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function useCheckoutForm() {
  return useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });
}
