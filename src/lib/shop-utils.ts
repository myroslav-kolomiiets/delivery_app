import type { Product, Shop } from '@/store/types';

export const categories = ['Burgers', 'Drinks', 'Desserts', 'Snacks'];

export function filterShopsByRating(shops: Shop[] | undefined, minRating: number) {
  return (shops ?? []).filter((shop) => shop.rating >= minRating);
}

export function filterAndSortProducts(
  products: Product[] | undefined,
  selectedCategories: string[],
  sortOption: string,
) {
  const filtered = (products ?? []).filter((product) =>
    selectedCategories.length === 0
      ? true
      : selectedCategories.includes(product.category),
  );

  return [...filtered].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    return 0;
  });
}

export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  return items.slice((page - 1) * pageSize, page * pageSize);
}

export function getTotalPages(itemsLength: number, pageSize: number) {
  return Math.ceil(itemsLength / pageSize);
}
