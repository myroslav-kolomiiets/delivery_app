import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import type { Product } from '@/store/types';

type ProductCartProps = {
  product: Product;
  inCart: boolean;
  onAddToCart: (product: Product) => void;
  loadingProductId: string | null;
  isLoading?: boolean;
};

export function ProductCart({
  product,
  inCart,
  onAddToCart,
  loadingProductId,
  isLoading = false,
}: ProductCartProps) {
  const loading = loadingProductId === product.id;

  if (isLoading) {
    return (
      <Card
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 240,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            '&:last-child': { pb: 2 },
          }}
        >
          <Skeleton variant="text" width="70%" height={32} />
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="text" width="45%" height={28} />
          <Box mt="auto">
            <Skeleton variant="rounded" height={44} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 240,
        border: '1px solid',
        borderColor: inCart ? 'success.main' : 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        boxShadow: inCart ? 2 : 0,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Stack spacing={1.25} sx={{ flex: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={1}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                lineHeight: 1.2,
                pr: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>

            <Chip
              size="small"
              label={product.category}
              variant="outlined"
              sx={{ flexShrink: 0, borderRadius: 2 }}
            />
          </Box>

          <Typography variant="h6" color="primary.main" fontWeight={800}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {inCart ? 'Added to your cart' : 'Tap to add this product'}
          </Typography>

          {inCart && (
            <Chip
              icon={<CheckCircleOutlineIcon />}
              label="In cart"
              color="success"
              size="small"
              sx={{
                alignSelf: 'flex-start',
                borderRadius: 2,
                fontWeight: 600,
              }}
            />
          )}
        </Stack>

        <Button
          fullWidth
          variant={inCart ? 'outlined' : 'contained'}
          color={inCart ? 'success' : 'primary'}
          disabled={inCart || loading}
          onClick={() => onAddToCart(product)}
          startIcon={loading ? undefined : <AddShoppingCartIcon fontSize="small" />}
          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: 2,
            py: 1.1,
            fontWeight: 700,
            minHeight: 44,
            whiteSpace: 'nowrap',
          }}
        >
          {loading
            ? 'Adding...'
            : inCart
              ? 'In cart ✓'
              : `Add for $${product.price.toFixed(2)}`}
        </Button>
      </CardContent>
    </Card>
  );
}
