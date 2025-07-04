// components/form/SelectField.tsx
import { Form, Select } from 'antd'
import type { Rule } from 'antd/es/form'

export interface Option {
    value: number | string
    label: string
}

export interface SelectFieldProps {
    name: string
    label: string
    options: Option[]
    mode?: 'single' | 'multiple'
    placeholder?: string
    rules?: Rule[]
    maxCount?: number       // only for multiple
    showSearch?: boolean
}

export default function SelectField({
    name,
    label,
    options,
    mode = 'single',
    placeholder,
    rules = [],
    maxCount,
    showSearch = true,
}: SelectFieldProps) {
    const selectMode = mode === 'multiple' ? 'multiple' : undefined

    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Select
                mode={selectMode}
                placeholder={placeholder}
                showSearch={showSearch}
                optionFilterProp="label"
                maxTagCount={maxCount}
                options={options}
                size="large"
            />
        </Form.Item>
    )
}
