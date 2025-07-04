// components/cards/DocumentUploadCard.tsx
"use client"

import React from 'react'
import { Upload } from 'antd'
import { IoCloudUploadOutline } from 'react-icons/io5'
import CardLayout from '@/components/layouts/CardLayout'   // <-- corrected import

export default function DocumentUploadCard() {
    return (
        <CardLayout
            elevation="md"
            hoverable
            className="max-w-md mx-auto"
        >
            <Upload.Dragger
                name="file"
                multiple={false}
                showUploadList={false}
                className="p-6 bg-transparent"
            >
                <div className="text-center">
                    <IoCloudUploadOutline className="text-3xl text-gray-400" />
                    <div className="mt-2 font-semibold">Upload Document</div>
                    <div className="text-xs text-gray-500">
                        Add resume, certificates, or other documents
                    </div>
                </div>
            </Upload.Dragger>
        </CardLayout>
    )
}
