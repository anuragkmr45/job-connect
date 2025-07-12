// components/cards/JobListingCard.tsx
'use client'

import React from 'react'
import { Tag, Button } from 'antd'
import { AiOutlineEnvironment, AiOutlineClockCircle } from 'react-icons/ai'
import { CiDollar, CiExport } from 'react-icons/ci'
import { FaRegBookmark } from 'react-icons/fa'
import CardLayout from '@/components/layouts/CardLayout'
import type { Job } from '@/types/job'
import { useJobActions } from '@/utils/jobActions'

export interface JobListingCardProps {
    data: Job
    /** If you know this job is already saved, pass true */
    isSaved?: boolean
    cardBg?: string 
}

export default function JobListingCard({
    data,
    cardBg = 'bg-white',
    isSaved = false,
}: JobListingCardProps) {
    const {
        title,
        company: { display_name: companyDisplayName },
        location: { display_name: locationDisplayName },
        salary_min,
        salary_max,
        redirect_url: applyLink,
        category: { label: catLabel },
    } = data

    // <-- use the central hook
    const { toggleSave, doApply } = useJobActions()
    // const cardBg = isFeatures ? 'bg-[#FEF08A]' : 'bg-white';

    const handleApply = async () => {
        try {
            await doApply(data)
            console.log('Applied successfully!')
        } catch (err) {
            console.error('Failed to apply', err)
        }
    }

    const handleSave = async () => {
        try {
            await toggleSave(data, isSaved)
            console.log(isSaved ? 'Removed from saved' : 'Saved job!')
        } catch (err) {
            console.error('Save toggle failed', err)
        }
    }

    return (
        <CardLayout elevation="sm" hoverable className="mx-auto" cardBg={cardBg}>
            {/* Title + badge */}
            <div className="flex justify-between items-start ">
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <div className="text-sm text-gray-500">{companyDisplayName}</div>
                </div>
                <Tag color="green" className="rounded-full">
                    92% match
                </Tag>
            </div>

            {/* Meta info */}
            <div className="mt-3 text-sm text-gray-600 flex space-x-4 flex-wrap">
                <div className="flex items-center">
                    <AiOutlineEnvironment />
                    <span className="ml-2">{locationDisplayName}</span>
                </div>
                <div className="flex items-center">
                    <CiDollar />
                    <span className="ml-2">
                        {salary_min ?? '—'} – {salary_max ?? '—'}
                    </span>
                </div>
                <div className="flex items-center">
                    <AiOutlineClockCircle />
                    <span className="ml-2">Posted 2 days ago</span>
                </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{catLabel}</Tag>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center space-x-2">
                <Button type="primary" onClick={handleApply}>
                    Apply Now
                </Button>
                <div className="flex items-center space-x-2">
                    <Button
                        icon={<CiExport />}
                        onClick={() => window.open(applyLink, '_blank')}
                    />
                    <Button
                        icon={<FaRegBookmark />}
                        onClick={handleSave}
                    />
                </div>
            </div>
        </CardLayout>
    )
}
