// src/hooks/useAuth.ts
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation
} from '@/services/authService'
import {
  setPreSignupToken,
  setToken,
  clearAuth
} from '@/store/authSlice'
import type {
  SendOtpRequest,
  VerifyOtpRequest,
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest
} from '@/types/auth'

export function useAuth() {
  const dispatch = useAppDispatch()
  const { token, preSignupToken } = useAppSelector(s => s.auth)

  const [sendOtpTrigger, sendOtpResult] = useSendOtpMutation()
  const [verifyOtpTrigger, verifyOtpResult] = useVerifyOtpMutation()
  const [registerTrigger, registerResult] = useRegisterMutation()
  const [loginTrigger, loginResult] = useLoginMutation()
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

  const forgotPassword = useCallback(async (email: string, otp: string, newPassword: string) => {
    const payload: ForgotPasswordRequest = { email, otp, newPassword }
    return await forgotTrigger(payload).unwrap()
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
    forgotPassword,
    changePassword,
    logout,

    // raw mutation results for loading & error UI
    sendOtpResult,
    verifyOtpResult,
    registerResult,
    loginResult,
    forgotResult,
    changePassResult
  }
}
