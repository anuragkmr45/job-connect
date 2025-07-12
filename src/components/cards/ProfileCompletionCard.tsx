// components/cards/ProfileCompletionCard.tsx
import React from 'react'
import { Avatar, Progress, Button } from 'antd'
import { GoStarFill } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import CardLayout from '@/components/layouts/CardLayout'
import { calculateYearsServed } from '@/utils/calculateYearsServed';

interface ProfileCompletionCardPrope {
    avatarImg: string,
    email: string,
    username: string,
    trade: string | number,
    serviceStart: string | number,
    serviceEnd: string | number
}

export default function ProfileCompletionCard({ avatarImg, email, username, trade, serviceStart, serviceEnd }: ProfileCompletionCardPrope) {
    const percent = 75

    const yearsServed = calculateYearsServed(serviceStart, serviceEnd);

    const header = (
        <div className="flex items-center space-x-4">
            <Avatar size={48} icon={<CiUser />} />
            <div>
                <h3 className="text-xl font-semibold text-white">Welcome back, {username}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-300 space-x-2">
                    <span>{trade} · {yearsServed} years served</span>
                    <GoStarFill className="text-yellow-400" />
                </div>
            </div>
        </div>
    )

    return (
        <CardLayout
            header={header}
            elevation="none"
            bordered={false}
            hoverable={false}
            className="text-white"
            style={{ borderRadius: '1rem' }}
            cardBg='bg-[#334155]'
        >
            <div className='flex justify-between align-middle w-full'>
                <div className='w-full'>
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
                </div>
                <Button type="default" size='small' shape="round" className='my-auto'>
                    Complete Now
                </Button>
            </div>
        </CardLayout>
    )
}
