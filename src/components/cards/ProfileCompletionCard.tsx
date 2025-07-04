// components/cards/ProfileCompletionCard.tsx
import React from 'react'
import { Avatar, Progress, Button } from 'antd'
import { GoStarFill } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import CardLayout from '@/components/layouts/CardLayout'

export default function ProfileCompletionCard() {
    const percent = 75

    const header = (
        <div className="flex items-center space-x-4">
            <Avatar size={48} icon={<CiUser />} />
            <div>
                <h3 className="text-xl font-semibold text-white">Welcome back, Lt. Rath</h3>
                <div className="mt-1 flex items-center text-sm text-gray-300 space-x-2">
                    <span>Infantry · 8 years served</span>
                    <GoStarFill className="text-yellow-400" />
                </div>
            </div>
        </div>
    )

    const footer = (
        <Button type="default" shape="round">
            Complete Now
        </Button>
    )

    return (
        <CardLayout
            header={header}
            footer={footer}
            elevation="none"
            bordered={false}
            hoverable={false}
            className="bg-[#334155] text-white"
            style={{ borderRadius: '1rem' }}
        >
            <div className="flex items-center">
                <span className="flex-1 text-sm text-gray-300">Profile Completion</span>
                <span className="ml-2 text-sm font-medium">{percent}%</span>
            </div>
            <Progress
                percent={percent}
                showInfo={false}
                strokeColor="#1f2937"
                trailColor="#4b5563"
                className="mt-2"
            />
        </CardLayout>
    )
}
