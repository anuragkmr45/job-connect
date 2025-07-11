// // components/cards/JobListingCard.tsx
// import React from 'react'
// import { Tag, Button } from 'antd'
// import { AiOutlineEnvironment } from "react-icons/ai";
// import { CiDollar } from "react-icons/ci";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { FaRegBookmark } from "react-icons/fa";
// import { CiExport } from "react-icons/ci";
// import CardLayout from '@/components/layouts/CardLayout';
// import { Job } from '@/types/job';
// import { FilterSet, useJobs } from '@/hooks/useJobs';
// import DashboardLayout from '../layouts/DashboardLayout';
// import Spinner from '../Spinner';

// const defaultFilters: FilterSet = {
//     location: null,
//     trade: null,
//     role: null,
//     qual: null,
//     status: null,
// }

// export default function JobListingCard({ data }: { data: Job }) {
//     const { id: jobId, title, company: { display_name: companyDisplayName }, location: { display_name: locationDisplayName }, salary_min, salary_max, redirect_url: applyLink, created, category: { label: catLabel, tag: catTag }, adref } = data || {}

//     const { saveJob, saveResult,isSavedLoading, applyJob, applyResult } = useJobs('', defaultFilters, { page: 1, pageSize: 1 }, { page: 1, pageSize: 1 })

//     const payload = {
//         id: jobId,
//         title: title,
//         description: data.description,
//         redirect_url: applyLink,
//         adref: adref,
//         contract_type: data.contract_type,
//         contract_time: data.contract_time,
//         salary_min: salary_min,
//         salary_max: salary_max,
//         salary_is_predicted: data.salary_is_predicted,
//         created: data.created,
//         latitude: data.latitude,
//         longitude: data.longitude,
//         category: {
//             label: data.category.label,
//             tag: data.category.tag,
//         },
//         company: {
//             display_name: data.company.display_name,
//         },
//         location: {
//             display_name: data.location.display_name,
//             area: data.location.area,
//         },
//     };

//     const handleApply = async () => {

//         try {
//             // fire off the mutation
//             window.open(applyLink, '_blank', 'noopener,noreferrer');
//             const response = await applyJob({ job: payload }).unwrap()

//             console.log('Applied successfully!', response)
//         } catch (err) {
//             console.error('Failed to apply', err)
//         }
//     }

//     const handleSave = async () => {
//         try {
//             await saveJob({ job: payload }).unwrap()
//             console.log('Saved job!', jobId)
//         } catch (err) {
//             console.error('Save failed', err)
//         }
//     }

//     if (isSavedLoading) {
//         return(
//             <DashboardLayout>
//                 <Spinner title='Save job...' />
//             </DashboardLayout>
//         )
//     }

//     return (
//         <CardLayout elevation="sm" hoverable className=" mx-auto">
//             {/* Title + badge */}
//             <div className="flex justify-between items-start">
//                 <div>
//                     <h3 className="text-lg font-semibold">{title ?? ""}</h3>
//                     <div className="text-sm text-gray-500">{companyDisplayName ?? ""}</div>
//                 </div>
//                 <Tag color="green" className="rounded-full">
//                     92% match
//                 </Tag>
//             </div>

//             {/* Meta info */}
//             <div className={`mt-3 text-sm text-gray-600 flex space-x-1 justify-between flex-wrap`}>
//                 <div className="flex items-center"><AiOutlineEnvironment /><span className="ml-2">{locationDisplayName ?? ""}</span></div>
//                 <div className="flex items-center"><CiDollar /><span className="ml-2">{salary_min ?? ""} - {salary_max ?? ""}</span></div>
//                 <div className="flex items-center"><AiOutlineClockCircle /><span className="ml-2">Posted 2 days ago</span></div>
//             </div>

//             {/* Tags */}
//             <div className="mt-4 flex flex-wrap gap-2">
//                 <Tag>{catLabel ?? ""}</Tag>
//                 <Tag>Leadership</Tag>
//                 <Tag>Government</Tag>
//             </div>

//             {/* Actions */}
//             <div className="mt-4 flex justify-between items-center space-x-2">
//                 <Button type="primary" onClick={handleApply}>Apply Now</Button>
//                 <div className='space-x-2'>
//                     <Button icon={<FaRegBookmark />} onClick={handleSave} />
//                     <Button icon={<CiExport />} />
//                 </div>
//             </div>
//         </CardLayout>
//     )
// }

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
import DashboardLayout from '../layouts/DashboardLayout'
import Spinner from '../Spinner'

export interface JobListingCardProps {
    data: Job
    /** If you know this job is already saved, pass true */
    isSaved?: boolean
}

export default function JobListingCard({
    data,
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
        <CardLayout elevation="sm" hoverable className="mx-auto">
            {/* Title + badge */}
            <div className="flex justify-between items-start">
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
