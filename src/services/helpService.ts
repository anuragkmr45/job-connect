// services/helpService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { FaqResponse, FeedbackRequest, FeedbackResponse } from '../types/help';

export const helpApi = createApi({
  reducerPath: 'helpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Help'],
  endpoints: (builder) => ({
    getFaq: builder.query<FaqResponse, void>({
      query: () => '/api/help/faq',
      providesTags: ['Help'],
    }),
    submitFeedback: builder.mutation<FeedbackResponse, FeedbackRequest>({
      query: (body) => ({
        url: '/api/support/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Help'],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useSubmitFeedbackMutation,
} = helpApi;