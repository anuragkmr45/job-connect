// // components/cards/SavedJobsPanel.tsx
// 'use client'

// import React, { useState } from 'react'
// import CardLayout from '@/components/layouts/CardLayout'
// import { CiCircleChevDown, CiCircleChevUp } from 'react-icons/ci'
// import type { Job } from '@/types/job'
// import SaveJobCard from '@/components/cards/SaveJobCard'

// export interface SavedJobsPanelProps {
//     jobs: Job[]
//     onViewAll: () => void
// }

// export default function SavedJobsPanel({
//     jobs,
//     onRemove,
//     onApply,
//     onViewAll,
// }: SavedJobsPanelProps) {
//     const [isOpen, setIsOpen] = useState(true)

//     return (
//         <CardLayout
//             elevation="sm"
//             bordered
//             className="w-full"
//             header={
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold">
//                         Saved Jobs ({jobs.length})
//                     </h2>
//                     <button
//                         onClick={() => setIsOpen((o) => !o)}
//                         aria-label={isOpen ? 'Collapse panel' : 'Expand panel'}
//                         className="text-gray-500 hover:text-gray-700"
//                     >
//                         {isOpen ? <CiCircleChevUp size={20} /> : <CiCircleChevDown size={20} />}
//                     </button>
//                 </div>
//             }
//             footer={
//                 <div className="text-center">
//                     <button
//                         onClick={onViewAll}
//                         className="text-blue-600 hover:underline"
//                     >
//                         View All Saved Jobs
//                     </button>
//                 </div>
//             }
//         >
//             {isOpen && (
//                 <div className="space-y-4">
//                     {jobs.map((job) => (
//                         <SaveJobCard
//                             key={job.id}
//                             job={job}
//                             savedAgoText={getSavedAgoText(job)}     // your logic here
//                             matchPercentage={getMatch(job)}         // your logic here
//                             onRemove={() => onRemove(job.id)}
//                             onApply={() => onApply(job)}
//                         />
//                     ))}
//                 </div>
//             )}
//         </CardLayout>
//     )
// }

// // helpers (you can move these into utils or compute before rendering)
// function getSavedAgoText(job: Job): string {
//     // e.g. “Saved 2 days ago”
//     const savedDate = 1
//     return `Saved ${savedDate}`
// }
// function getMatch(job: Job): number {
//     // pull from job.matchScore or hardcode
//     return 92
// }

// components/cards/SavedJobsPanel.tsx
'use client'

import React, { useState } from 'react'
import CardLayout from '@/components/layouts/CardLayout'
import { CiCircleChevDown, CiCircleChevUp } from 'react-icons/ci'
import type { Job } from '@/types/job'
import SaveJobCard from '@/components/cards/SaveJobCard'
import { useJobActions } from '@/utils/jobActions'

export interface SavedJobsPanelProps {
    jobs: Job[]
    /** Navigate to full list of saved jobs */
    onViewAll?: () => void
}

export default function SavedJobsPanel({
    jobs,
    onViewAll,
}: SavedJobsPanelProps) {
    const [isOpen, setIsOpen] = useState(true)
    const { toggleSave, doApply } = useJobActions()

    return (
        <CardLayout
            elevation="sm"
            bordered
            className="w-full"
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Saved Jobs ({jobs.length})
                    </h2>
                    <button
                        onClick={() => setIsOpen((o) => !o)}
                        aria-label={isOpen ? 'Collapse panel' : 'Expand panel'}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {isOpen ? <CiCircleChevUp size={20} /> : <CiCircleChevDown size={20} />}
                    </button>
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
