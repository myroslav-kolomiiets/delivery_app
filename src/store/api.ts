import { CreateOrderBody, Order, Product, Shop, Coupon } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getShops: builder.query<Shop[], void>({
      query: () => '/shops',
    }),

    getProducts: builder.query<Product[], string>({
      query: (shopId) => `/products?shopId=${shopId}`,
    }),

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

    getCoupons: builder.query<Coupon[], void>({
      query: () => '/coupons',
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetCouponsQuery,
} = api;
