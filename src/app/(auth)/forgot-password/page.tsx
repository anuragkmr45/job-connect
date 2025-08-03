'use client'

import { useState } from 'react'
import { Form, Button, Typography, message } from 'antd'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/layouts/AuthLayout'
import InputField from '@/components/form/InputField'
import { useAuth } from '@/hooks/useAuth'
import { sendOtpSchema, verifyOtpSchema, forgotPasswordSchema } from '@/schemas/authSchemas'
import Link from 'next/link'
import { useToast } from '@/components/Toaster'

const { Title, Text } = Typography

type Step0 = { email: string }
type Step1 = { email: string; otp: string }
type Step2 = { email: string; otp: string; newPassword: string; confirmPassword: string }

export default function ForgotPassword() {
    const router = useRouter()
    const toast = useToast()
    const { forgotPasswordSendOTP, forgotPasswordVerifyOTP, forgotPassword } = useAuth()
    const [step, setStep] = useState<0 | 1 | 2>(0)
    const [loading, setLoading] = useState(false)

    // Handlers for each step
    const handleSendOtp = async (values: Step0) => {
        setLoading(true)
        // const parsed = sendOtpSchema.safeParse({ email: values.email, type: 'forgot_password' })
        // if (!parsed.success) {
        //     message.error(parsed.error.errors.map(e => e.message).join(', '))
        //     setLoading(false)
        //     return
        // }
        try {
            await forgotPasswordSendOTP(values.email)
            toast.success('OTP sent! Please check your email.')
            setStep(1)
        } catch (err: any) {
            toast.error(err?.data?.error || 'Failed to send OTP')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (values: Step1) => {
        setLoading(true)
        const parsed = verifyOtpSchema.safeParse(values)
        if (!parsed.success) {
            toast.error(parsed.error.errors.map(e => e.message).join(', '))
            setLoading(false)
            return
        }
        try {
            const { email, otp } = values || {};
            await forgotPasswordVerifyOTP(email, otp)
            toast.success('OTP verified! Please set your new password.')
            setStep(2)
        } catch (err: any) {
            toast.error(err?.data?.error || 'OTP verification failed')
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (values: Step2) => {
        setLoading(true)
        
        const { newPassword, confirmPassword } = values || {}
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.')
            setLoading(false)
            return
        }
        // const parsed = forgotPasswordSchema.safeParse({
        //     newPassword: newPassword,
        // })
        // if (!parsed.success) {
        //     toast.error(parsed.error.errors.map(e => e.message).join(', '))
        //     setLoading(false)
        //     return
        // }
        try {
            await forgotPassword(newPassword)
            toast.success('Password reset successful! Redirecting to sign in...')
            router.push('/signin')
        } catch (err: any) {
            toast.error(err?.data?.error || 'Failed to reset password')
        } finally {
            setLoading(false)
        }
    }

    // Decide current onFinish and form items
    const onFinish = step === 0 ? handleSendOtp : step === 1 ? handleVerifyOtp : handleResetPassword
    const buttonText = ['Send OTP', 'Verify OTP', 'Reset Password'][step]
    const titleText = ['Enter your email', 'Enter OTP', 'New Password'][step]

    return (
        <AuthLayout>
            <div className="flex flex-col h-full">
                <div className="p-4">
                    <Title level={2}>{titleText}</Title>
                </div>
                <Form<Step0 | Step1 | Step2>
                    layout="vertical"
                    onFinish={onFinish as any}
                    className="flex-1 flex flex-col px-4 space-y-6 overflow-auto"
                >
                    {/* Step 0: Email */}
                    {step === 0 && (
                        <InputField
                            name="email"
                            label="Email"
                            placeholder="alice@example.com"
                            type="email"
                            rules={[{ required: true, message: 'Enter your email' }, { type: 'email', message: 'Invalid email' }]}
                        />
                    )}

                    {/* Step 1: Email + OTP */}
                    {step === 1 && (
                        <>
                            <InputField
                                name="email"
                                label="Email"
                                placeholder="alice@example.com"
                                type="email"
                                isDisabled={true}
                                rules={[{ required: true, message: 'Enter your email' }]}
                            />
                            <InputField
                                name="otp"
                                label="OTP"
                                placeholder="123456"
                                rules={[{ required: true, message: 'Enter the OTP' }]}
                            />
                        </>
                    )}

                    {/* Step 2: New Password + Confirm */}
                    {step === 2 && (
                        <>
                            <InputField
                                name="email"
                                label="Email"
                                placeholder="alice@example.com"
                                type="email"
                                isDisabled={true}
                                rules={[{ required: true, message: 'Enter your email' }]}
                            />
                            <InputField
                                name="newPassword"
                                label="New Password"
                                placeholder="At least 8 characters"
                                type="password"
                                rules={[{ required: true, message: 'Enter new password' }, { min: 8, message: 'Must be 8+ chars' }]}
                            />
                            <InputField
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                type="password"
                                rules={[{ required: true, message: 'Please confirm your password' }]}
                            />
                        </>
                    )}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                            {buttonText}
                        </Button>
                    </Form.Item>

                    <div className="text-sm">
                        <Text>
                            Remembered your password?{' '}
                            <Link href="/signin" className="text-teal-700 font-semibold">
                                Sign In
                            </Link>
                        </Text>
                    </div>
                </Form>
            </div>
        </AuthLayout>
    )
}
