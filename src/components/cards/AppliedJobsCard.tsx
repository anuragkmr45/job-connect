// components/JobCard.tsx
import React, { useState } from 'react'
import {
    HiOutlineCurrencyDollar,
    HiOutlineEye,
} from 'react-icons/hi'
import CardLayout from '../layouts/CardLayout'
import { Job } from '@/types/job'
import { IoLocation } from "react-icons/io5";
import { Button } from 'antd';
import JobDetailsModal from '../modals/JobDetailsModal';

export default function AppliedJobCard({ jobData }: { jobData: Job }) {
    const { id: jobId, title, company: { display_name: companyDisplayName }, location: { display_name: locationDisplayName }, salary_min, salary_max, redirect_url: applyLink, created, category: { label: catLabel, tag: catTag } } = jobData || {}

    const [isModalVisible, setIsModalVisible] = useState(false)

    // 2. Handlers to open/close
    const onViewDetails = () => {
        setIsModalVisible(true)
    }
    const onClose = () => {
        setIsModalVisible(false)
    }
    return (
        <>
            <CardLayout hoverable elevation="md" className="">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500">{companyDisplayName}</p>
                    </div>
                    <Button
                        onClick={onViewDetails}
                        className="inline-flex items-center text-sm font-medium text-blue-600"
                        type='default'
                    >
                        <HiOutlineEye className="h-4 w-4 mr-1" />
                        View Details
                    </Button>
                </div>

                {/* Body */}
                <div className="flex space-x-3">
                    {
                        locationDisplayName && (
                            <div className="flex items-center text-sm text-[#64748B]">
                                <IoLocation className="h-4 w-4 mr-1" />
                                {locationDisplayName}
                            </div>
                        )
                    }
                    <div className="flex items-center text-sm text-[#64748B]">
                        <HiOutlineCurrencyDollar className="h-4 w-4 mr-1" />
                        {salary_max ?? salary_min ?? ""}
                    </div>

                </div>
                <div>
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                            {catLabel}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            {98}% Match
                        </span>
                        {/* <span className="text-xs text-gray-500">Applied {appliedDate}</span> */}
                    </div>
                </div>
            </CardLayout>
            <JobDetailsModal
                visible={isModalVisible}
                onClose={onClose}
                job={jobData}
            />
        </>
    )
}
