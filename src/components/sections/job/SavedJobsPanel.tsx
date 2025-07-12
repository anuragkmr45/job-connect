// components/cards/SavedJobsPanel.tsx
'use client'

import React, { useState } from 'react'
import CardLayout from '@/components/layouts/CardLayout'
import { CiCircleChevDown, CiCircleChevUp } from 'react-icons/ci'
import type { Job } from '@/types/job'
import SaveJobCard from '@/components/cards/SaveJobCard'
// import { useJobActions } from '@/utils/jobActions'
import { Button } from 'antd'

export interface SavedJobsPanelProps {
    jobs: Job[]
    title?: string
    onViewAll?: () => void
}

export default function SavedJobsPanel({
    jobs,
    title,
    onViewAll,
}: SavedJobsPanelProps) {
    const [isOpen, setIsOpen] = useState(true)
    // const { toggleSave, doApply } = useJobActions()

    return (
        <CardLayout
            elevation="sm"
            bordered
            className="w-full"
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        {title ?? "Saved Jobs"} ({jobs.length ?? 0})
                    </h2>
                    <Button
                        onClick={() => setIsOpen((o) => !o)}
                        aria-label={isOpen ? 'Collapse panel' : 'Expand panel'}
                        className="text-gray-500 hover:text-gray-700"
                        type='text'
                    >
                        {isOpen ? <CiCircleChevUp size={20} /> : <CiCircleChevDown size={20} />}
                    </Button>
                </div>
            }
            footer={
                <div className="text-center">
                    <button
                        onClick={onViewAll}
                        className="text-blue-600 hover:underline"
                    >
                        View All Saved Jobs
                    </button>
                </div>
            }
        >
            {isOpen && (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <SaveJobCard
                            key={job.id}
                            job={job}
                            savedAgoText={getSavedAgoText(job)}
                            matchPercent={getMatch(job)}
                            isSaved={true}
                        />
                    ))}
                </div>
            )}
        </CardLayout>
    )
}

// helpers (you can move these into utils or compute before rendering)
function getSavedAgoText(job: Job): string {
    // e.g. “Saved 2 days ago”
    return `Saved 2 days ago`
}
function getMatch(job: Job): number {
    // pull from job.matchScore or hardcode
    return 92
}
