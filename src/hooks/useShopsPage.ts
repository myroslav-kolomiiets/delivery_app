import { useMemo, useState } from 'react';
import { useGetProductsQuery, useGetShopsQuery } from '@/store/api';
import {
  categories as shopCategories,
  filterAndSortProducts,
  filterShopsByRating,
  getTotalPages,
  paginateItems,
} from '@/lib/shop-utils';
import { useAddToCart } from '@/hooks/useAddToCart';

export function useShopsPage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery();

  const filteredShops = useMemo(() => {
    return filterShopsByRating(shops, minRating);
  }, [shops, minRating]);

  const activeShopId = selectedShopId ?? filteredShops[0]?.id ?? null;

  const { data: products, isLoading: productsLoading } = useGetProductsQuery(
    activeShopId!,
    {
      skip: !activeShopId,
    },
  );

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, selectedCategories, sortOption);
  }, [products, selectedCategories, sortOption]);

  const totalPages = useMemo(() => {
    return getTotalPages(filteredProducts.length, pageSize);
  }, [filteredProducts.length, pageSize]);

  const paginatedProducts = useMemo(() => {
    return paginateItems(filteredProducts, page, pageSize);
  }, [filteredProducts, page, pageSize]);

  const { onAddToCart, loadingProductId } = useAddToCart();

  const handleMinRatingChange = (value: number) => {
    setMinRating(value);
    setPage(1);
  };

  const handleShopSelect = (shopId: string) => {
    setSelectedShopId(shopId);
    setPage(1);
  };

  const handleCategoriesChange = (updater: React.SetStateAction<string[]>) => {
    setSelectedCategories(updater);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setPage(1);
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
    shopsLoading,
    productsLoading,
    filteredShops,
    paginatedProducts,
    totalPages,
    loadingProductId,
    onAddToCart,
    onShopSelect: handleShopSelect,
    setSelectedCategories: handleCategoriesChange,
    onSortChange: handleSortChange,
    setMinRating: handleMinRatingChange,
  };
}
