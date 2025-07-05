// src/schemas/authSchemas.ts
import { z } from 'zod'

// Step 0: Send OTP
export const sendOtpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    type: z.literal('signup').or(z.literal('login'))
})

// Step 1: Verify OTP
export const verifyOtpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    otp: z.string().length(6, { message: 'OTP must be 6 digits' })
})

// Step 2: Complete Signup
export const signupSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    name: z.string().min(1, { message: 'Name is required' }),
    contact: z.string().regex(/^\+\d{1,3}-\d{10}$/, { message: 'Contact must be in format +CC-XXXXXXXXXX' }),
    aadhaar: z.string().regex(/^\d{4}-\d{4}-\d{4}$/, { message: 'Aadhaar must be 1234-5678-9012' }),
    pan: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]$/, { message: 'PAN must be in format ABCDE1234F' }),
    military_trade_id: z.number().int(),
    service_status_id: z.number().int(),
    service_start_date: z.string().refine(d => /^\d{4}-\d{2}-\d{2}$/.test(d), { message: 'Invalid date (YYYY-MM-DD)' }),
    service_end_date: z.string().refine(d => /^\d{4}-\d{2}-\d{2}$/.test(d), { message: 'Invalid date (YYYY-MM-DD)' }),
    preferred_location_ids: z.array(z.number().int()).min(1, { message: 'Select at least one location' }),
    work_role_ids: z.array(z.number().int()).min(1, { message: 'Select at least one role' }),
    qualification_id: z.number().int()
})

// Login
export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' })
})

// Forgot Password
export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters' })
})

// Change Password
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters' })
})
