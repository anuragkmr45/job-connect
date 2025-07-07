// components/form/InputField.tsx
import { Form, Input } from 'antd'
import type { Rule } from 'antd/es/form'

export interface InputFieldProps {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'tel'
    rules?: Rule[]
    isDisabled?: boolean
}

export default function InputField({
    name,
    label,
    placeholder,
    type = 'text',
    rules = [],
    isDisabled = false
}: InputFieldProps) {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Input
                type={type}
                placeholder={placeholder}
                size="large"
                disabled={isDisabled}
            />
        </Form.Item>
    )
}
