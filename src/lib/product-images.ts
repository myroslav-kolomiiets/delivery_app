const productImagesByCategory: Record<string, string> = {
  Burgers: '/products/burgers.svg',
  Drinks: '/products/drinks.svg',
  Desserts: '/products/desserts.svg',
  Snacks: '/products/snacks.svg',
};

export function getProductImageByCategory(category: string) {
  return productImagesByCategory[category] ?? '/products/placeholder.svg';
}
