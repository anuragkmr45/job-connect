'use client'

import { useState } from 'react'
import { Form, Input, Button, Typography, message } from 'antd'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/schemas/authSchemas'

const { Title, Text } = Typography

export default function SignIn() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    const result = loginSchema.safeParse(values)
    if (!result.success) {
      message.error(result.error.errors.map(e => e.message).join(', '))
      return
    }
    try {
      await login(values.email, values.password)
      message.success('Signed in successfully!')
      router.replace('/')  // redirect to dashboard or home
    } catch (err: any) {
      message.error(err?.data?.data || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Title level={2}>Sign In</Title>

      <Form
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6 mt-4"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Not a valid email' },
          ]}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            iconRender={visible => (visible ? <FiEyeOff /> : <FiEye />)}
          />
        </Form.Item>

        <div className="text-sm">
          <Link href="/forgot-password" className="text-teal-700 font-semibold">
            Forgot Password ?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="bg-teal-700 border-none"
          >
            Sign In
          </Button>
        </Form.Item>

        <div className="text-sm">
          <Text>
            Don’t have an account?{' '}
            <Link href="/signup" className="text-teal-700 font-semibold">
              Sign Up
            </Link>
            .
          </Text>
        </div>

        {/* <Text className="block text-center text-xs text-gray-500">
          By clicking Continue, you agree to JabConnect’s{' '}
          <Link href="/privacy" className="text-teal-700">Privacy Policy</Link>,{' '}
          <Link href="/terms" className="text-teal-700">Terms & Conditions</Link>.
        </Text> */}
      </Form>
    </AuthLayout>
  )
}
