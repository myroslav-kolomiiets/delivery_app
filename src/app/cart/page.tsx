'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeQuantity, clearCart, removeFromCart } from '@/store/cartSlice';
import { useCreateOrderMutation } from '@/store/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email(),
  phone: z
    .string()
    .refine((v) => validator.isMobilePhone(v, 'any'), { message: 'invalid' }),
  address: z.string().min(5),
});

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const [success, setSuccess] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createOrder({
        ...data,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }).unwrap();

      dispatch(clearCart());
      reset();

      setSuccess(true);
    } catch (e) {
      console.error(e);
      alert('Error creating order'); // change to toast or similar
    }
  };

  const total = items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Cart
      </Typography>

      {/* 🛒 Items */}
      {items.length === 0 && !success && <Typography>Your cart is empty</Typography>}

      {success && (
        <Typography color="success.main">Order created successfully 🎉</Typography>
      )}

      {items.map((item) => (
        <Card key={item.product.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.product.name}</Typography>

            <Typography>Price: ${item.product.price}</Typography>

            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  changeQuantity({
                    productId: item.product.id,
                    quantity: Number(e.target.value),
                  }),
                )
              }
              sx={{ mt: 1, width: 100 }}
            />

            <Button
              color="error"
              onClick={() => dispatch(removeFromCart(item.product.id))}
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* 💰 Total */}
      {items.length > 0 && (
        <>
          <Typography variant="h5" mt={2}>
            Total: ${total}
          </Typography>
          <Button onClick={() => dispatch(clearCart())}>Clear cart</Button>
        </>
      )}

      {/* 📋 Form */}
      {items.length > 0 && (
        <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" mb={2}>
            Checkout
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Email"
                fullWidth
                error={!!errors.email}
                {...register('email', { required: true })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Phone"
                fullWidth
                error={!!errors.phone}
                {...register('phone', { required: true })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Address"
                fullWidth
                error={!!errors.address}
                {...register('address', { required: true })}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isLoading}>
            Submit Order
          </Button>
        </Box>
      )}
    </Box>
  );
}
