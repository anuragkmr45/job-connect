// components/Switch.tsx
import React from 'react'
import { Switch as AntdSwitch } from 'antd'
import type { SwitchProps as AntdSwitchProps } from 'antd/lib/switch'

export interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
    size?: AntdSwitchProps['size']
}

export default function Switch({
    checked,
    onChange,
    disabled = false,
    size = 'default',
}: SwitchProps) {
    return (
        <AntdSwitch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            size={size}
        />
    )
}
