import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMemo } from 'react';
import type { CartItem } from '@/store/types';

type CartItemCardProps = {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const lineTotal = useMemo(
    () => (item.product.price * item.quantity).toFixed(2),
    [item.product.price, item.quantity],
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        boxShadow: 0,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 2,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.4fr 0.9fr auto' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight={800}>
                {item.product.name}
              </Typography>
              <Chip
                size="small"
                label={item.product.category}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Unit price: ${item.product.price.toFixed(2)}
            </Typography>
          </Box>

          <Box>
            <TextField
              type="number"
              label="Qty"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.product.id, Number(e.target.value))}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: { xs: '100%', sm: 110 } }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 1.5,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Line total
              </Typography>
              <Typography variant="h6" fontWeight={900}>
                ${lineTotal}
              </Typography>
            </Box>

            <IconButton
              onClick={() => onRemove(item.product.id)}
              color="error"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
