import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    // shops
    getShops: builder.query<any[], void>({
      query: () => '/shops',
    }),

    // products
    getProducts: builder.query<any[], string>({
      query: (shopId) => `/products?shopId=${shopId}`,
    }),

    // create order
    createOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),

    getOrders: builder.query({
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
