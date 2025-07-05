// services/authService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type {
  SendOtpRequest, SendOtpResponse,
  VerifyOtpRequest, VerifyOtpResponse,
  RegisterRequest, LoginRequest, LoginResponse,
  ForgotPasswordRequest, ForgotPasswordResponse,
  ChangePasswordRequest, ChangePasswordResponse
} from '../types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const { token, preSignupToken } = (getState() as RootState).auth;
      if (endpoint === 'register' && preSignupToken) {
        headers.set('Authorization', `Bearer ${preSignupToken}`);
      } else if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({ url: '/api/auth/send-otp', method: 'POST', body })
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({ url: '/api/auth/verify-otp', method: 'POST', body })
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({ url: '/api/auth/register', method: 'POST', body })
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/api/auth/login', method: 'POST', body })
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({ url: '/api/auth/forgot-password', method: 'POST', body })
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (body) => ({ url: '/api/auth/change-password', method: 'POST', body })
    })
  })
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation
} = authApi;
