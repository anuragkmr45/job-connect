// types/auth.ts
export interface SendOtpRequest { email: string; type: 'signup' | 'forgot_password' }
export interface SendOtpResponse { message: string }

export interface VerifyOtpRequest { email: string; otp: string }
export interface VerifyOtpResponse { preSignupToken: string }

export interface SendOtpForgotPassRequest { email: string }
export interface SendOtpForgotPassResponse { message: string }

export interface VerifyOtpForgotPassRequest { email: string; otp: string }
export interface VerifyOtpForgotPassResponse { preSignupToken: string }

export interface RegisterRequest {
    password: string;
    name: string;
    contact: string;
    military_trade_id: number;
    service_status_id: number;
    service_start_date: string; // YYYY-MM-DD
    service_end_date: string; // YYYY-MM-DD
    preferred_location_ids: number[];
    work_role_ids: number[];
    qualification_id: number;
    aadhaar: string;
    pan: string;
}
export interface LoginRequest { email: string; password: string }
export interface LoginResponse { token: string }

export interface VerifyOTPForgotPassRequest { email: string; otp: string }
export interface VerifyOTPForgotPassResponse { preResetToken: string }

export interface ForgotPassRequest { newPassword: string }
export interface ForgotPassResponse { message: string, token: string }

export interface ChangePasswordRequest { currentPassword: string; newPassword: string }
export interface ChangePasswordResponse { message: string }

export type SignupStep0 = { email: string }
export type SignupStep1 = { email: string; otp: string }
export type SignupStep2 = {
    password: string
    confirmPassword: string
}
export type SignupStep3 = {
    password: string
    name: string
    contact: string
    aadhaar: string
    pan: string
    military_trade_id: number
    service_status_id: number
    service_start_date: string
    service_end_date: string
    preferred_location_ids: number[]
    work_role_ids: number[]
    qualification_id: number
}