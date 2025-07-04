"use client"

// pages/auth/signin.tsx
import { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'
import AuthLayout from '@/components/layouts/AuthLayout'

const { Title, Text } = Typography

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      // TODO: call your sign-in API
      console.log('Signing in with', values)
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
            iconRender={visible =>
              visible ? <FiEyeOff /> : <FiEye />
            }
          />
        </Form.Item>

        <div className="text-sm">
          <Text>
            Already having an account?{' '}
            <Link
              href="/auth/signup"
              className="text-teal-700 font-semibold"
            >
              Signup
            </Link>
            .
          </Text>
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

        <Text className="block text-center text-xs text-gray-500">
          By clicking Continue, you agree to Lab-D’s{' '}
          <Link href="/privacy" className="text-teal-700">
            Privacy policy
          </Link>
          ,{' '}
          <Link href="/terms" className="text-teal-700">
            Terms and conditions
          </Link>
          .
        </Text>
      </Form>
    </AuthLayout>
  )
}

export default SignIn
