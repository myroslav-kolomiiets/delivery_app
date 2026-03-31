import { z } from 'zod';
import validator from 'validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const checkoutSchema = z.object({
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .trim()
    .min(6, 'Phone is too short')
    .regex(/^[\d()+\-\s]+$/, {
      message: 'Phone can contain only digits, spaces, +, -, and ()',
    })
    .refine((v) => validator.isMobilePhone(v, 'any'), {
      message: 'Invalid phone number',
    }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function useCheckoutForm() {
  return useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  });
}
