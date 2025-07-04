// components/form/InputField.tsx
import { Form, Input } from 'antd'
import type { Rule } from 'antd/es/form'

export interface InputFieldProps {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'tel'
    rules?: Rule[]
}

export default function InputField({
    name,
    label,
    placeholder,
    type = 'text',
    rules = [],
}: InputFieldProps) {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Input
                type={type}
                placeholder={placeholder}
                size="large"
            />
        </Form.Item>
    )
}
