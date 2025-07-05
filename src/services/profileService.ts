// services/profileService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { Profile } from '../types/profile';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => '/api/profile/me',
      providesTags: ['Profile']
    }),
    updateProfile: builder.mutation<Profile, FormData>({
      query: (formData) => ({
        url: '/api/profile/me',
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ['Profile']
    })
  })
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
