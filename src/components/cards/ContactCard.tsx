// components/ContactCard.tsx
import React from 'react'
import {
    HiPencil,
    HiPhone,
    HiMail,
    HiLocationMarker,
    HiCheckCircle,
} from 'react-icons/hi'
import CardLayout from '../layouts/CardLayout'
import { Button } from 'antd'

interface ContactCardProps {
    phone: string,
    email: string,
    location: string
    editProfile?: () => void
}

export default function ContactCard({ phone, email, location, editProfile }: ContactCardProps) {
    const Header = (
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <Button
                type="default"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={editProfile}
            >
                <HiPencil size={20} />
            </Button>
        </div>
    )

    return (
        <CardLayout
            header={Header}
            elevation="sm"
            bordered
            cardBg="bg-white"
        >
            <ul className="space-y-4">
                {/* Phone */}
                <li className="flex items-start space-x-3">
                    <HiPhone size={24} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <div className="mt-1 flex items-center space-x-2">
                            <span className="text-gray-900">{phone}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <HiCheckCircle size={16} className="mr-1" />
                                Verified
                            </span>
                        </div>
                    </div>
                </li>

                {/* Email */}
                <li className="flex items-start space-x-3">
                    <HiMail size={24} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <div className="mt-1 flex items-center space-x-2">
                            <span className="text-gray-900">{email}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <HiCheckCircle size={16} className="mr-1" />
                                Verified
                            </span>
                        </div>
                    </div>
                </li>

                {/* Location */}
                {/* <li className="flex items-start space-x-3">
                    <HiLocationMarker size={24} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1 text-gray-900">{location}</p>
                    </div>
                </li> */}
            </ul>
        </CardLayout>
    )
}
