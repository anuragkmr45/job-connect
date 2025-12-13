// components/cards/DocumentUploadCard.tsx
"use client"

import React from 'react'
import { Upload } from 'antd'
import { IoCloudUploadOutline } from 'react-icons/io5'
import CardLayout from '@/components/layouts/CardLayout'

export default function DocumentUploadCard({title, subtitle, icon}: {title: string, subtitle: string, icon?: React.ReactNode}) {
    return (
        <CardLayout
            elevation="md"
            hoverable
            className="mx-auto w-full h-full"
        >
            <Upload.Dragger
                name="file"
                multiple={false}
                showUploadList={false}
                className="p-6 bg-transparent"
            >
                <div className="text-center">
                    {icon ? icon : <IoCloudUploadOutline className="mx-auto text-4xl text-gray-400" />}
                    <div className="mt-2 font-semibold">{title}</div>
                    <div className="text-xs text-gray-500">{subtitle}</div>
                </div>
            </Upload.Dragger>
        </CardLayout>
    )
}
