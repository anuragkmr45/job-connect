// src/constants/auth.config.ts
import type { FieldConfig } from './FieldConfig'
import type { Option } from '@/components/form/SelectField'

export const getStep0Config = (): FieldConfig[] => [
  {
    key: 'email',
    label: 'Email',
    placeholder: 'alice@example.com',
    type: 'input',
    inputType: 'email',
    rules: [
      { required: true, message: 'Enter your email' },
      { type: 'email', message: 'Invalid email' },
    ],
  },
]

export const getStep1Config = (): FieldConfig[] => [
  {
    key: 'email',
    label: 'Email',
    placeholder: 'alice@example.com',
    type: 'input',
    inputType: 'email',
    rules: [{ required: true, message: 'Enter your email' }],
  },
  {
    key: 'otp',
    label: 'OTP',
    placeholder: '123456',
    type: 'input',
    rules: [{ required: true, message: 'Enter the OTP' }],
  },
]

/**
 * Now expects already‐mapped Option[] arrays, not raw API types.
 */
export function getStep2Config(dropdowns: {
  trades:   Option[]
  statuses: Option[]
  locations:Option[]
  roles:    Option[]
  quals:    Option[]
}): FieldConfig[] {
  return [
    { key: 'password', label: 'Password', type: 'input', inputType: 'password', rules: [{ required: true }] },
    { key: 'name',     label: 'Full Name', type: 'input', rules: [{ required: true }] },
    { key: 'contact',  label: 'Contact',    type: 'input', inputType: 'tel', rules: [{ required: true }] },
    { key: 'aadhaar',  label: 'Aadhaar No.',type: 'input',                       rules: [{ required: true }] },
    { key: 'pan',      label: 'PAN No.',    type: 'input',                       rules: [{ required: true }] },

    {
      key: 'military_trade_id',
      label: 'Military Trade',
      type: 'select',
      options: dropdowns.trades,
      rules: [{ required: true }],
      mode: 'single',
    },
    {
      key: 'service_status_id',
      label: 'Service Status',
      type: 'select',
      options: dropdowns.statuses,
      rules: [{ required: true }],
      mode: 'single',
    },

    { key: 'service_start_date', label: 'Service Start Date', type: 'date', rules: [{ required: true }] },
    { key: 'service_end_date',   label: 'Service End Date',   type: 'date', rules: [{ required: true }] },

    {
      key: 'preferred_location_ids',
      label: 'Preferred Locations',
      type: 'select',
      options: dropdowns.locations,
      rules: [{ required: true }],
      mode: 'multiple',
      maxCount: 5,
    },
    {
      key: 'work_role_ids',
      label: 'Work Roles',
      type: 'select',
      options: dropdowns.roles,
      rules: [{ required: true }],
      mode: 'multiple',
      maxCount: 5,
    },

    {
      key: 'qualification_id',
      label: 'Highest Qualification',
      type: 'select',
      options: dropdowns.quals,
      rules: [{ required: true }],
      mode: 'single',
    },
  ]
}
