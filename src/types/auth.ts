// types/auth.ts
export interface SendOtpRequest { email: string; type: 'signup' | 'login' }
export interface SendOtpResponse { message: string }

export interface VerifyOtpRequest { email: string; otp: string }
export interface VerifyOtpResponse { preSignupToken: string }

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

export interface ForgotPasswordRequest { email: string; otp: string; newPassword: string }
export interface ForgotPasswordResponse { message: string }

export interface ChangePasswordRequest { currentPassword: string; newPassword: string }
export interface ChangePasswordResponse { message: string }

export type SignupStep0 = { email: string }
export type SignupStep1 = { email: string; otp: string }
export type SignupStep2 = {
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