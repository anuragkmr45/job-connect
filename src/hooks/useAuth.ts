// src/hooks/useAuth.ts
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useForgotPasswordVerifyOTPMutation,
  useForgotPasswordSendOTPMutation
} from '@/services/authService'
import {
  setPreSignupToken,
  setPreResetToken,
  setToken,
  clearAuth
} from '@/store/authSlice'
import type {
  SendOtpRequest,
  VerifyOtpRequest,
  RegisterRequest,
  LoginRequest,
  ForgotPassRequest,
  ChangePasswordRequest,
  SendOtpForgotPassRequest,
  VerifyOTPForgotPassRequest
} from '@/types/auth'

export function useAuth() {
  const dispatch = useAppDispatch()
  const { token, preSignupToken, preResetToken } = useAppSelector(s => s.auth)

  const [sendOtpTrigger, sendOtpResult] = useSendOtpMutation()
  const [verifyOtpTrigger, verifyOtpResult] = useVerifyOtpMutation()
  const [registerTrigger, registerResult] = useRegisterMutation()
  const [loginTrigger, loginResult] = useLoginMutation()
  const [forgotPassSendOTPTrigger, forgotPassSendOTPResult] = useForgotPasswordSendOTPMutation()
  const [forgotPassVerifyOTPTrigger, forgotPassVerifyOTPResult] = useForgotPasswordVerifyOTPMutation()
  const [forgotTrigger, forgotResult] = useForgotPasswordMutation()
  const [changePassTrigger, changePassResult] = useChangePasswordMutation()

  const sendOtp = useCallback(async (email: string, type: 'signup' | 'forgot_password') => {
    const payload: SendOtpRequest = { email, type }
    return await sendOtpTrigger(payload).unwrap()
  }, [sendOtpTrigger])

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    const payload: VerifyOtpRequest = { email, otp }
    const res = await verifyOtpTrigger(payload).unwrap()
    dispatch(setPreSignupToken(res.preSignupToken))
    return res
  }, [verifyOtpTrigger, dispatch])

  const register = useCallback(async (data: RegisterRequest) => {
    const res = await registerTrigger(data).unwrap()
    dispatch(setToken(res.token))
    return res
  }, [registerTrigger, dispatch])

  const login = useCallback(async (email: string, password: string) => {
    const payload: LoginRequest = { email, password }
    const res = await loginTrigger(payload).unwrap()
    dispatch(setToken(res.token))
    return res
  }, [loginTrigger, dispatch])

  const forgotPasswordSendOTP = useCallback(async (email: string) => {
    const payload: SendOtpForgotPassRequest = { email }
    return await forgotPassSendOTPTrigger(payload).unwrap()
  }, [forgotPassSendOTPTrigger])

  const forgotPasswordVerifyOTP = useCallback(
    async (email: string, otp: string) => {
      const payload: VerifyOTPForgotPassRequest = { email, otp };
      const res = await forgotPassVerifyOTPTrigger(payload).unwrap(); // ✅ correct trigger
      dispatch(setPreResetToken(res.preResetToken));                  // ✅ stash token
      return res;
    },
    [forgotPassVerifyOTPTrigger, dispatch]
  );

  const forgotPassword = useCallback(async (newPassword: string) => {
    const res = await forgotTrigger({ newPassword }).unwrap();
    dispatch(setToken(res.token));         // log the user in right away
    return res;
  }, [forgotTrigger])

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const payload: ChangePasswordRequest = { currentPassword, newPassword }
    return await changePassTrigger(payload).unwrap()
  }, [changePassTrigger])

  const logout = useCallback(() => {
    dispatch(clearAuth())
  }, [dispatch])

  return {
    // state
    token,
    preSignupToken,

    // actions
    sendOtp,
    verifyOtp,
    register,
    login,
    forgotPasswordSendOTP,
    forgotPasswordVerifyOTP,
    forgotPassword,
    changePassword,
    logout,

    // raw mutation results for loading & error UI
    sendOtpResult,
    verifyOtpResult,
    registerResult,
    loginResult,
    forgotPassSendOTPResult,
    forgotPassVerifyOTPResult,
    forgotResult,
    changePassResult
  }
}
