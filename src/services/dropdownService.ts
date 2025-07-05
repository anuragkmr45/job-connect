// services/dropdownService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Dropdowns } from '../types/dropdowns';

export const dropdownApi = createApi({
  reducerPath: 'dropdownApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    fetchDropdowns: builder.query<Dropdowns, void>({ query: () => '/api/dropdowns' })
  })
});

export const { useFetchDropdownsQuery } = dropdownApi;
