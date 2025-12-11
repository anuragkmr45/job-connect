// services/chatService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { ChatRequest, ChatResponse } from '../types/chat';
import { mapJob } from '../services/jobService';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:4000
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: '/api/chat',
        method: 'POST',
        body,
      }),
      transformResponse: (raw: any): ChatResponse => ({
        reply: raw.reply,
        count: raw.count ?? (raw.jobs?.length ?? 0),
        page: raw.page ?? 1,
        pageSize: raw.pageSize ?? (raw.jobs?.length ?? 0),
        // 🔥 Normalise ALL jobs here
        jobs: (raw.jobs ?? []).map(mapJob),
      }),
    }),
  }),
});

export const { useSendChatMessageMutation } = chatApi;
