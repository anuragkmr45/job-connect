"use client"

// pages/auth/signup.tsx
import { useState } from 'react'
import { Form, Button, Typography } from 'antd'
import AuthLayout from '@/components/layouts/AuthLayout'
import InputField from '@/components/form/InputField'
import SelectField, { Option } from '@/components/form/SelectField'
import DateField from '@/components/form/DateField'

const { Title } = Typography

export default function SignUp() {
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            console.log('Sign-up payload:', values)
            // TODO: call your sign-up API here
        } finally {
            setLoading(false)
        }
    }

    // example stub options; swap with real data from your API
    const militaryTrades: Option[] = [
        { value: 1, label: 'Infantry' },
        { value: 2, label: 'Artillery' },
    ]
    const serviceStatuses: Option[] = [
        { value: 1, label: 'Active Duty' },
        { value: 2, label: 'Veteran' },
        { value: 3, label: 'Agniveer' },
    ]
    const qualifications: Option[] = [
        { value: 1, label: 'Undergraduate' },
        { value: 2, label: 'Postgraduate' },
        { value: 3, label: 'Doctorate' },
    ]
    const locations: Option[] = [
        { value: 3, label: 'Delhi' },
        { value: 5, label: 'Mumbai' },
        { value: 7, label: 'Bengaluru' },
    ]
    const roles: Option[] = [
        { value: 1, label: 'Logistics' },
        { value: 4, label: 'Communications' },
        { value: 7, label: 'Engineering' },
    ]

    return (
        <AuthLayout>
            <Title level={2}>Sign Up</Title>

            <Form
                layout="vertical"
                onFinish={onFinish}
                className="space-y-6 mt-4"
            >
                {/* simple inputs */}
                <InputField
                    name="email"
                    label="Email"
                    placeholder="john.doe@example.com"
                    type="email"
                    rules={[
                        { required: true, message: 'Enter your email' },
                        { type: 'email', message: 'Invalid email' },
                    ]}
                />
                <InputField
                    name="otp"
                    label="OTP"
                    placeholder="123456"
                    rules={[{ required: true, message: 'Enter the OTP' }]}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="SecretPass123"
                    type="password"
                    rules={[{ required: true, message: 'Enter a password' }]}
                />
                <InputField
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    rules={[{ required: true, message: 'Enter your name' }]}
                />
                <InputField
                    name="contact"
                    label="Contact"
                    placeholder="+91-9876543210"
                    type="tel"
                    rules={[{ required: true, message: 'Enter phone number' }]}
                />
                <InputField
                    name="aadhaar"
                    label="Aadhaar No."
                    placeholder="1234-5678-9012"
                    rules={[{ required: true, message: 'Enter Aadhaar number' }]}
                />
                <InputField
                    name="pan"
                    label="PAN No."
                    placeholder="ABCDE1234F"
                    rules={[{ required: true, message: 'Enter PAN number' }]}
                />

                {/* searchable dropdowns */}
                <SelectField
                    name="military_trade_id"
                    label="Military Trade"
                    options={militaryTrades}
                    placeholder="Select trade"
                    rules={[{ required: true, message: 'Select a trade' }]}
                    mode="single"
                />
                <SelectField
                    name="service_status_id"
                    label="Service Status"
                    options={serviceStatuses}
                    placeholder="Select status"
                    rules={[{ required: true, message: 'Select status' }]}
                    mode="single"
                />

                {/* date */}
                <DateField
                    name="service_start_date"
                    label="Service Start Date"
                    rules={[{ required: true, message: 'Pick a start date' }]}
                />

                {/* multi-select */}
                <SelectField
                    name="preferred_location_ids"
                    label="Preferred Locations"
                    options={locations}
                    placeholder="Select up to 5"
                    rules={[{ required: true, message: 'Select locations' }]}
                    mode="multiple"
                    maxCount={5}
                />
                <SelectField
                    name="work_role_ids"
                    label="Work Roles"
                    options={roles}
                    placeholder="Select up to 5"
                    rules={[{ required: true, message: 'Select roles' }]}
                    mode="multiple"
                    maxCount={5}
                />

                {/* single-select */}
                <SelectField
                    name="qualification_id"
                    label="Highest Qualification"
                    options={qualifications}
                    placeholder="Select qualification"
                    rules={[{ required: true, message: 'Select qualification' }]}
                    mode="single"
                />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                        className="bg-teal-700 border-none"
                    >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    )
}
