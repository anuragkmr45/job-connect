// components/form/DateField.tsx
import { Form, DatePicker } from 'antd'
import type { Rule } from 'antd/es/form'

export interface DateFieldProps {
    name: string
    label: string
    rules?: Rule[]
}

export default function DateField({
    name,
    label,
    rules = [],
}: DateFieldProps) {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            <DatePicker className="w-full" size="large" />
        </Form.Item>
    )
}
