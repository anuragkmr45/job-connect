// components/cards/DocumentUploadCard.tsx
"use client"

import React from 'react'
import { Upload } from 'antd'
import { IoCloudUploadOutline } from 'react-icons/io5'
import CardLayout from '@/components/layouts/CardLayout'   // <-- corrected import

export default function DocumentUploadCard({title, subtitle}: {title: string, subtitle: string}) {
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
                    <IoCloudUploadOutline className="text-3xl mx-auto text-gray-400" />
                    <div className="mt-2 font-semibold">{title}</div>
                    <div className="text-xs text-gray-500">{subtitle}</div>
                </div>
            </Upload.Dragger>
        </CardLayout>
    )
}
