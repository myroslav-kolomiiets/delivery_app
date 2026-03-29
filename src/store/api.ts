import { CreateOrderBody, Order, Product, Shop } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    // shops
    getShops: builder.query<Shop[], void>({
      query: () => '/shops',
    }),

    // products
    getProducts: builder.query<Product[], string>({
      query: (shopId) => `/products?shopId=${shopId}`,
    }),

    // create order
    createOrder: builder.mutation<Order, CreateOrderBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),

    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
} = api;
