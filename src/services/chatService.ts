// // services/chatService.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { RootState } from '../store';
// import type { ChatRequest, ChatResponse } from '../types/chat';
// import { mapJob } from '../services/jobService';

// export const chatApi = createApi({
//   reducerPath: 'chatApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:4000
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     sendChatMessage: builder.mutation<ChatResponse, ChatRequest>({
//       query: (body) => ({
//         url: '/api/chat',
//         method: 'POST',
//         body,
//       }),
//       transformResponse: (raw: any): ChatResponse => ({
//         reply: raw.reply,
//         count: raw.count ?? (raw.jobs?.length ?? 0),
//         page: raw.page ?? 1,
//         pageSize: raw.pageSize ?? (raw.jobs?.length ?? 0),
//         // 🔥 Normalise ALL jobs here
//         jobs: (raw.jobs ?? []).map(mapJob),
//       }),
//     }),
//   }),
// });

// export const { useSendChatMessageMutation } = chatApi;

// services/chatService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { ChatRequest, ChatResponse } from '../types/chat';
import { mapJob } from '../services/jobService';

// Small wrapper to prevent mapJob from crashing the whole transform
const safeMapJob = (rawJob: any) => {
  try {
    return mapJob(rawJob);
  } catch (err) {
    // 👇 This log will show you which job caused the `label` error
    //   and the full raw job from backend.
    //   Check your browser devtools console after you send a chat message.
    // eslint-disable-next-line no-console
    console.error('mapJob failed in chat transformResponse:', err, rawJob);

    // Minimal fallback shape so JobListingCard doesn’t explode
    return {
      id: String(rawJob?.id ?? ''),
      title: rawJob?.title ?? 'Untitled job',
      description: rawJob?.description ?? '',
      redirect_url: rawJob?.redirect_url ?? '',
      location: rawJob?.location?.display_name ?? '',
      company: rawJob?.company?.display_name ?? '',
      salary: null,
      source: rawJob?._source ?? 'unknown',
    } as any; // cast to any to satisfy TS without knowing exact Job type
  }
};

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
        // 🔥 Normalise ALL jobs here with a safe wrapper
        jobs: (raw.jobs ?? []).map(safeMapJob),
      }),
    }),
  }),
});

export const { useSendChatMessageMutation } = chatApi;
