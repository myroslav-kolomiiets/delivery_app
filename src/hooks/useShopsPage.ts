import { useEffect, useMemo, useState } from 'react';
import { useGetProductsQuery, useGetShopsQuery } from '@/store/api';
import { categories as shopCategories } from '@/lib/shop-utils';
import { useAddToCart } from '@/hooks/useAddToCart';

export function useShopsPage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);

  const pageSize = 10;

  const { data: shopsResponse, isLoading: shopsLoading } = useGetShopsQuery({
    page,
    limit: pageSize,
    minRating,
  });

  const shops = shopsResponse?.items ?? [];
  const totalPages = shopsResponse?.totalPages ?? 0;

  const activeShopId = selectedShopId ?? shops[0]?.id ?? null;

  useEffect(() => {
    setProductsPage(1);
  }, [activeShopId, selectedCategories, sortOption]);

  const productsQueryArgs = activeShopId
    ? {
        shopId: activeShopId,
        page: productsPage,
        limit: pageSize,
        selectedCategories,
        sortOption,
      }
    : {
        shopId: '',
        page: 1,
        limit: pageSize,
        selectedCategories: [],
        sortOption: '',
      };

  const { data: productsResponse, isLoading: productsLoading } = useGetProductsQuery(
    productsQueryArgs,
    {
      skip: !activeShopId,
    },
  );

  const products = productsResponse?.items ?? [];
  const productsTotalPages = productsResponse?.totalPages ?? 0;

  const { onAddToCart, loadingProductId } = useAddToCart();

  const handleMinRatingChange = (value: number) => {
    setMinRating(value);
    setPage(1);
    setSelectedShopId(null);
    setProductsPage(1);
  };

  const handleShopSelect = (shopId: string) => {
    setSelectedShopId(shopId);
    setProductsPage(1);
  };

  const handleCategoriesChange = (updater: React.SetStateAction<string[]>) => {
    setSelectedCategories(updater);
    setProductsPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setProductsPage(1);
  };

  return {
    shopCategories,
    selectedShopId,
    activeShopId,
    selectedCategories,
    sortOption,
    minRating,
    page,
    setPage,
    productsPage,
    setProductsPage,
    shopsLoading,
    productsLoading,
    shops,
    products,
    totalPages,
    productsTotalPages,
    loadingProductId,
    onAddToCart,
    onShopSelect: handleShopSelect,
    setSelectedCategories: handleCategoriesChange,
    onSortChange: handleSortChange,
    setMinRating: handleMinRatingChange,
  };
}
