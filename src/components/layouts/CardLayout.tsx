// components/CardLayout.tsx
import React, { ReactNode } from 'react'

export type Elevation = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface CardLayoutProps {
    header?: ReactNode
    children: ReactNode
    footer?: ReactNode
    className?: string
    elevation?: Elevation
    bordered?: boolean
    hoverable?: boolean
    style?: React.CSSProperties
}

const ELEVATION: Record<Elevation, string> = {

    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
}

export default function CardLayout({
    header,
    children,
    footer,
    className = '',
    elevation = 'md',
    bordered = false,
    hoverable = false,
    style,
}: CardLayoutProps) {
    return (
        <div
            className={`
        bg-white rounded-lg overflow-hidden
        ${ELEVATION[elevation]}
        ${bordered ? 'border border-gray-200' : ''}
        ${hoverable ? 'hover:shadow-xl transition-shadow duration-200' : ''}
        ${className}
      `}
            style={style}
        >
            {header && (
                <div className="px-6 py-4 border-b border-gray-200">
                    {header}
                </div>
            )}

            <div className="px-6 py-4">
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    )
}
