// components/cards/JobListingCard.tsx
import React from 'react'
import { Tag, Button } from 'antd'
import { AiOutlineEnvironment } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import CardLayout from '@/components/layouts/CardLayout'

export default function JobListingCard() {
    return (
        <CardLayout elevation="sm" hoverable className="max-w-md mx-auto">
            {/* Title + badge */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">Security Operations Manager</h3>
                    <div className="text-sm text-gray-500">Amazon</div>
                </div>
                <Tag color="green" className="rounded-full">
                    92% match
                </Tag>
            </div>

            {/* Meta info */}
            <div className="mt-3 space-y-1 text-sm text-gray-600">
                <div className="flex items-center"><AiOutlineEnvironment /><span className="ml-2">Virginia Beach, VA</span></div>
                <div className="flex items-center"><CiDollar /><span className="ml-2">$75,000 – $95,000</span></div>
                <div className="flex items-center"><AiOutlineClockCircle /><span className="ml-2">Posted 2 days ago</span></div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Tag>Security</Tag>
                <Tag>Leadership</Tag>
                <Tag>Government</Tag>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center space-x-2">
                <Button type="primary">Apply Now</Button>
                <Button icon={<FaRegBookmark />} />
                <Button icon={<CiExport />} />
            </div>
        </CardLayout>
    )
}
