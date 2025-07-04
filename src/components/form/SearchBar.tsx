// src/components/ui/SearchBar.tsx
"use client"

import React from 'react'
import { Input } from 'antd'

const { Search } = Input

export interface SearchBarProps {
  placeholder?: string
  defaultValue?: string
  onSearch?: (value: string) => void
  /**
   * If `true`, shows the default "Search" button.
   * Pass a ReactNode to customize the button label/icon.
   */
  enterButton?: boolean | React.ReactNode
  size?: 'small' | 'middle' | 'large'
  className?: string
}

export default function SearchBar({
  placeholder = 'Search…',
  defaultValue,
  onSearch,
  enterButton = true,
  size = 'large',
  className = '',
}: SearchBarProps) {
  return (
    <Search
      placeholder={placeholder}
      defaultValue={defaultValue}
      enterButton={enterButton}
      size={size}
      allowClear
      onSearch={onSearch}
      className={`rounded-md ${className}`}
    />
  )
}
