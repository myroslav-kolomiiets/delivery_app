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
  createdAt: string;
  items: OrderItem[];
};

export type Shop = {
  id: string;
  name: string;
  rating: number;
};

export type CreateOrderBody = {
  email: string;
  phone: string;
  address: string;
  items: {
    productId: string;
    quantity: number;
  }[];
};
