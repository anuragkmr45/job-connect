// services/authService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type {
  SendOtpRequest, SendOtpResponse,
  VerifyOtpRequest, VerifyOtpResponse,
  RegisterRequest, LoginRequest, LoginResponse,
  ChangePasswordRequest, ChangePasswordResponse,
  SendOtpForgotPassResponse,
  SendOtpForgotPassRequest,
  VerifyOTPForgotPassResponse,
  VerifyOTPForgotPassRequest,
  ForgotPassResponse,
  ForgotPassRequest
} from '../types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const { token, preSignupToken, preResetToken } = (getState() as RootState).auth;
      if (endpoint === 'register' && preSignupToken) {
        headers.set('Authorization', `Bearer ${preSignupToken}`);
      } else if (endpoint === 'forgotPassword' && preResetToken) {   // 🆕
        headers.set('Authorization', `Bearer ${preResetToken}`);
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
    forgotPasswordSendOTP: builder.mutation<SendOtpForgotPassResponse, SendOtpForgotPassRequest>({
      query: (body) => ({ url: '/api/auth/forgot-password/send-otp', method: 'POST', body })
    }),
    forgotPasswordVerifyOTP: builder.mutation<VerifyOTPForgotPassResponse, VerifyOTPForgotPassRequest>({
      query: (body) => ({ url: '/api/auth/forgot-password/verify-otp', method: 'POST', body })
    }),
    forgotPassword: builder.mutation<ForgotPassResponse, ForgotPassRequest>({
      query: (body) => ({ url: '/api/auth/forgot-password/complete', method: 'POST', body })
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
  useForgotPasswordSendOTPMutation,
  useForgotPasswordVerifyOTPMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation
} = authApi;
