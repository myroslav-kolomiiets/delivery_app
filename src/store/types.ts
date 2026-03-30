export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  email: string;
  phone: string;
  address: string;
  couponCode?: string | null;
  discount?: number | null;
  createdAt: string;
  items: OrderItem[];
};

export type Shop = {
  id: string;
  name: string;
  rating: number;
};

export type Coupon = {
  id: string;
  code: string;
  discount: number;
  createdAt: string;
};

export type CreateOrderBody = {
  email: string;
  phone: string;
  address: string;
  couponCode?: string;
  discount?: number;
  items: {
    productId: string;
    quantity: number;
  }[];
};
