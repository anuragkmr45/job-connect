// services/jobNewsService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface JobNewsItem {
  id: number;
  headline: string;
  body: string;
  source: string | null;
  location: string | null;
  published_on: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const jobNewsApi = createApi({
  reducerPath: 'jobNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getJobNews: builder.query<
      { count: number; page: number; pageSize: number; news: JobNewsItem[] },
      { page?: number; pageSize?: number } | void
    >({
      query: (params) => ({
        url: '/api/job-news',
        params: params || {},
      }),
    }),
  }),
});

export const { useGetJobNewsQuery } = jobNewsApi;
