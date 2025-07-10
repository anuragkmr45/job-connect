// components/cards/JobListingCard.tsx
import React from 'react'
import { Tag, Button } from 'antd'
import { AiOutlineEnvironment } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import CardLayout from '@/components/layouts/CardLayout';
import { Job } from '@/types/job';
import { useJobs } from '@/hooks/useJobs';



export default function JobListingCard({ data }: { data: Job }) {
    const { id: jobId, title, company: { display_name: companyDisplayName }, location: { display_name: locationDisplayName }, salary_min, salary_max, redirect_url: applyLink, created, category: { label: catLabel, tag: catTag } } = data || {}

    const { applyJob, applyResult } = useJobs()

    const handleApply = async () => {

        const payload = {
            __CLASS__: 'Adzuna::API::Response::Job',
            id: data.id,
            title: data.title,
            description: data.description,
            redirect_url: data.redirect_url,
            adref: data.adref,
            contract_type: data.contract_type,
            contract_time: data.contract_time,
            salary_min: data.salary_min,
            salary_max: data.salary_max,
            salary_is_predicted: data.salary_is_predicted,
            created: data.created,
            latitude: data.latitude,
            longitude: data.longitude,
            category: {
                label: data.category.label,
                tag: data.category.tag,
                __CLASS__: 'Adzuna::API::Response::Category',
            },
            company: {
                display_name: data.company.display_name,
                __CLASS__: 'Adzuna::API::Response::Company',
            },
            location: {
                display_name: data.location.display_name,
                area: data.location.area,
                __CLASS__: 'Adzuna::API::Response::Location',
            },
        };

        try {
            // fire off the mutation
            window.open(applyLink, '_blank', 'noopener,noreferrer');
            const response = await applyJob({ job: payload }).unwrap()

            console.log('Applied successfully!', response)
        } catch (err) {
            console.error('Failed to apply', err)
        }
    }

    return (
        <CardLayout elevation="sm" hoverable className=" mx-auto">
            {/* Title + badge */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{title ?? ""}</h3>
                    <div className="text-sm text-gray-500">{companyDisplayName ?? ""}</div>
                </div>
                <Tag color="green" className="rounded-full">
                    92% match
                </Tag>
            </div>

            {/* Meta info */}
            <div className={`mt-3 text-sm text-gray-600 flex space-x-1 justify-between flex-wrap`}>
                <div className="flex items-center"><AiOutlineEnvironment /><span className="ml-2">{locationDisplayName ?? ""}</span></div>
                <div className="flex items-center"><CiDollar /><span className="ml-2">{salary_min ?? ""} - {salary_max ?? ""}</span></div>
                <div className="flex items-center"><AiOutlineClockCircle /><span className="ml-2">Posted 2 days ago</span></div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{catLabel ?? ""}</Tag>
                <Tag>Leadership</Tag>
                <Tag>Government</Tag>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center space-x-2">
                <Button type="primary" onClick={handleApply}>Apply Now</Button>
                <div>
                    <Button icon={<FaRegBookmark />} />
                    <Button icon={<CiExport />} />
                </div>
            </div>
        </CardLayout>
    )
}
