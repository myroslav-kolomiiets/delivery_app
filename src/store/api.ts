import {
  Coupon,
  CreateOrderBody,
  Order,
  OrdersResponse,
  ProductsResponse,
  ShopsResponse,
} from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getShops: builder.query<
      ShopsResponse,
      { page: number; limit: number; minRating: number }
    >({
      query: ({ page, limit, minRating }) =>
        `/shops?page=${page}&limit=${limit}&minRating=${minRating}`,
    }),

    getProducts: builder.query<
      ProductsResponse,
      {
        shopId: string;
        page: number;
        limit: number;
        selectedCategories: string[];
        sortOption: string;
      }
    >({
      query: ({ shopId, page, limit, selectedCategories, sortOption }) => {
        const params = new URLSearchParams();
        params.set('shopId', shopId);
        params.set('page', String(page));
        params.set('limit', String(limit));
        params.set('sortOption', sortOption);

        selectedCategories.forEach((category) => {
          params.append('category', category);
        });

        return `/products?${params.toString()}`;
      },
    }),

    createOrder: builder.mutation<Order, CreateOrderBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),

    getOrders: builder.query<OrdersResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/orders?page=${page}&limit=${limit}`,
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
