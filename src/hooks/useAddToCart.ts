import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import type { Product } from '@/store/types';

export function useAddToCart() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const onAddToCart = useCallback(
    (product: Product) => {
      setLoadingProductId(product.id);

      setTimeout(() => {
        dispatch(addToCart(product));
        enqueueSnackbar(`${product.name} added to cart 🛒`, {
          variant: 'success',
        });
        setLoadingProductId(null);
      }, 400);
    },
    [dispatch, enqueueSnackbar],
  );

  return { onAddToCart, loadingProductId };
}
