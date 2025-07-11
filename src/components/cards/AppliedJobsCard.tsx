// components/JobCard.tsx
import React from 'react'
import {
    HiOutlineCurrencyDollar,
    HiOutlineEye,
} from 'react-icons/hi'
import CardLayout from '../layouts/CardLayout'
import { Job } from '@/types/job'

export default function AppliedJobCard({ jobData }: { jobData: Job }) {
    const { id: jobId, title, company: { display_name: companyDisplayName }, location: { display_name: locationDisplayName }, salary_min, salary_max, redirect_url: applyLink, created, category: { label: catLabel, tag: catTag } } = jobData || {}
    const onViewDetails = () => { }
    return (
        <CardLayout hoverable elevation="md" className="">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">{companyDisplayName}</p>
                </div>
                <button
                    onClick={onViewDetails}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                >
                    <HiOutlineEye className="h-4 w-4 mr-1" />
                    View Details
                </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    {/* <HiOutlineMapPin className="h-4 w-4 mr-1" /> */}
                    {locationDisplayName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <HiOutlineCurrencyDollar className="h-4 w-4 mr-1" />
                    {salary_max ?? salary_min}
                </div>
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
    )
}
