'use client'

import { useState } from 'react'
import { Form, Button, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/layouts/AuthLayout'
import InputField from '@/components/form/InputField'
import SelectField from '@/components/form/SelectField'
import DateField from '@/components/form/DateField'
import { useFetchDropdownsQuery } from '@/services/dropdownService'
import { getStep0Config, getStep1Config, getStep2Config, getStep3Config } from '@/constants/auth.config'
import type { SignupStep0, SignupStep1, SignupStep2, SignupStep3 } from '@/types/auth'
import type { Option } from '@/components/form/SelectField'
import { FieldConfig } from '@/constants/FieldConfig'
import { useAuth } from '@/hooks/useAuth'
import { sendOtpSchema, signupSchema, verifyOtpSchema } from '@/schemas/authSchemas'
import Link from 'next/link'
import { useToast } from '@/components/Toaster'

const { Title, Text } = Typography

export default function SignUp() {
  const router = useRouter()
  const toast = useToast()
  const { sendOtp, verifyOtp, register } = useAuth()
  const { data: dd, isLoading, error } = useFetchDropdownsQuery()

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)
  const [loading, setLoading] = useState(false)
  const [pass, setPass] = useState('')

  if (isLoading) return <AuthLayout><div>Loading form data…</div></AuthLayout>
  if (error || !dd) return <AuthLayout><div>Error loading form data</div></AuthLayout>

  // map API dropdowns to Option[]
  const tradeOpts: Option[] = dd.trades.map(t => ({ value: t.id, label: t.name }))
  const statusOpts: Option[] = dd.statuses.map(s => ({ value: s.id, label: s.name }))
  const locationOpts: Option[] = dd.locations.map(l => ({ value: l.id, label: l.name }))
  const roleOpts: Option[] = dd.roles.map(r => ({ value: r.id, label: r.name }))
  const qualOpts: Option[] = dd.quals.map(q => ({ value: q.id, label: `${q.level} – ${q.stream}` }))

  // per-step FieldConfig
  const configs: Record<0 | 1 | 2 | 3, FieldConfig[]> = {
    0: getStep0Config(),
    1: getStep1Config(),
    2: getStep2Config(),
    3: getStep3Config({ trades: tradeOpts, statuses: statusOpts, locations: locationOpts, roles: roleOpts, quals: qualOpts })
  }
  const config = configs[step]

  // step handlers
  const handleSendOtp = async (values: SignupStep0) => {
    setLoading(true)
    const result = sendOtpSchema.safeParse({ email: values.email, type: 'signup' })
    if (!result.success) {
      toast.error(result.error.errors.map(e => e.message).join(', '))
      return
    }
    try {
      await sendOtp(values.email, 'signup')
      toast.success('OTP sent! Please check your email.')
      setStep(1)
    } catch (err: any) {
      toast.error(err?.data?.error || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (values: SignupStep1) => {
    setLoading(true)
    const result = verifyOtpSchema.safeParse(values)
    if (!result.success) {
      toast.error(result.error.errors.map(e => e.message).join(', '))
      return
    }
    try {
      await verifyOtp(values.email, values.otp)
      toast.success('OTP verified! Continue to complete signup.')
      setStep(2)
    } catch (err: any) {
      toast.error(err?.data?.error || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmPassword = async (values: SignupStep2) => {
    setLoading(true)
    const { confirmPassword, password } = values || {};
    if (confirmPassword === password ) {
      setPass(password)
      setStep(3);
    } else {
      toast.warning("Password is not matching")
    }
    setLoading(false)
  }

  const handleSignUp = async (values: SignupStep3) => {
    setLoading(true)
    // const result = signupSchema.safeParse(values)
    // if (!result.success) {
    //   message.error(result.error.errors.map(e => e.message).join(', '))
    //   return
    // }
    try {
      const payload = {...values, password: pass }
      await register(payload)
      
      toast.success('Signup successful! Redirecting to dashboard...')
    } catch (err: any) {
      toast.error(err?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const onFinish = step === 0 ? handleSendOtp : step === 1 ? handleVerifyOtp : step === 2 ? handleConfirmPassword : handleSignUp

  const buttonText = ['Send OTP', 'Verify OTP', 'Set Password', 'Sign Up'][step]!
  const titleText = ['Enter Email', 'Verify OTP', 'Set Password', 'Complete Sign Up'][step]!

  return (
    <AuthLayout>
      <div className="flex flex-col overflow-hidden">
        <div className="flex-none p-4">
          <Title level={2} className='!text-white'>{titleText}</Title>
        </div>

        <Form<any>
          onFinish={onFinish as any}
          layout="vertical"
          className="flex-1 flex flex-col overflow-hidden  white-labels"
        >
          <div className="flex-1 overflow-y-auto px-4 space-y-6">
            {config.map(field => {
              switch (field.type) {
                case 'input':
                  return (
                    <InputField
                      key={field.key}
                      name={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.inputType}
                      rules={field.rules}
                    // isDisabled={}
                    />
                  )
                case 'select':
                  return (
                    <SelectField
                      key={field.key}
                      name={field.key}
                      label={field.label}
                      options={field.options}
                      placeholder={field.placeholder}
                      rules={field.rules}
                      mode={field.mode}
                      maxCount={field.maxCount}
                    />
                  )
                case 'date':
                  return (
                    <DateField
                      key={field.key}
                      name={field.key}
                      label={field.label}
                      rules={field.rules}
                    />
                  )
              }
            })}

            <Form.Item className="flex">
              {step === 1 && (
                <Button
                  type="link"
                  htmlType="button"
                  onClick={() => setStep(0)}
                  size="large"
                >
                  Change Email?
                </Button>
              )}
              {step === 3 && (
                <Button
                  type="link"
                  htmlType="button"
                  onClick={() => setStep(2)}
                  size="large"
                >
                  Change Password?
                </Button>
              )}
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                {buttonText}
              </Button>
            </Form.Item>

            <div className="text-sm  white-labels">
              <Text className="!text-white">
                Haveing an account?{' '}
                <Link href="/signin" className="text-teal-700 font-semibold">
                  Sign In
                </Link>
                .
              </Text>
            </div>
          </div>
        </Form>
      </div>
    </AuthLayout>
  )
}
