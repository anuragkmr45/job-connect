// src/components/form/FieldConfig.ts
import type { Option } from '../components/form/SelectField';

/**
 * Describes one field in the signup form wizard.
 */
export type FieldConfig =
  | {
    key: string                // field name (e.g. "email", "otp")
    label: string              // UI label
    placeholder?: string       // optional placeholder
    type: 'input'              // renders InputField
    inputType?: 'text' | 'email' | 'password' | 'tel'
    rules: any[]               // AntD Form validation rules
  }
  | {
    key: string                // e.g. "military_trade_id"
    label: string
    type: 'select'             // renders SelectField
    options: Option[]          // dropdown options
    placeholder?: string
    rules: any[]
    mode: 'single' | 'multiple'
    maxCount?: number
  }
  | {
    key: string                // e.g. "service_start_date"
    label: string
    type: 'date'               // renders DateField
    rules: any[]
  }
