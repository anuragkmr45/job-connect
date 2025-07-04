"use client"

// components/cards/JobSearchFiltersCard.tsx
import React from 'react'
import { Tag, Button } from 'antd'
import { FiMapPin, FiUser, FiBriefcase } from 'react-icons/fi'
import CardLayout from '@/components/layouts/CardLayout'
import SearchBar from '@/components/form/SearchBar'

const quickFilters = [
    'Remote Jobs', 'Security Roles', 'Manager Roles', 'Admin Roles', 'Startups',
    'Leadership Positions', 'Entry Level', 'Bhubaneswar', 'Banking', 'Experienced',
    'Government Contracts', 'Private Contracts', 'Mumbai', 'Hyderabad',
]

export default function JobSearchFiltersCard() {
    return (
        <CardLayout elevation="sm" hoverable className="max-w-md mx-auto">
            {/* Search */}
            <SearchBar
                placeholder="Search for roles or companies…"
                onSearch={value => console.log('searching for', value)}
                enterButton="Go"
                size="middle"
                className="max-w-md mx-auto"
            />
            {/* Dropdown-like chips */}
            <div className="mt-4 flex space-x-2">
                <Button icon={<FiMapPin />} shape="round">Location</Button>
                <Button icon={<FiUser />} shape="round">Experience</Button>
                <Button icon={<FiBriefcase />} shape="round">Role Type</Button>
            </div>

            {/* Quick filters */}
            <div className="mt-6">
                <div className="text-sm font-medium mb-2">Quick Filters:</div>
                <div className="flex flex-wrap gap-2">
                    {quickFilters.map(f => (
                        <Tag key={f} color="default" className="cursor-pointer">
                            {f}
                        </Tag>
                    ))}
                </div>
            </div>
        </CardLayout>
    )
}
