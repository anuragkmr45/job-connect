// services/healthService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const healthApi = createApi({
  reducerPath: 'healthApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    ping: builder.query<{ message: string }, void>({ query: () => '/' })
  })
});

export const { usePingQuery } = healthApi;
