// // components/cards/SaveJobCard.tsx
// import React from 'react'
// import CardLayout from '@/components/layouts/CardLayout'
// import { Button } from 'antd'
// import { AiOutlineClose } from 'react-icons/ai'
// import { CiExport } from 'react-icons/ci'
// import type { Job } from '@/types/job'

// export interface SaveJobCardProps {
//   job: Job
//   /** e.g. “Saved 2 days ago” */
//   savedAgoText?: string
//   /** 0–100 */
//   matchPercentage?: number
//   onRemove?: () => void
//   onApply?: () => void
// }

// export default function SaveJobCard({
//   job,
//   savedAgoText = '',
//   matchPercentage = 0,
//   onRemove,
//   onApply,
// }: SaveJobCardProps) {
//   const {
//     title,
//     company: { display_name: companyName },
//     location: { display_name: locationName },
//     redirect_url: applyLink,
//   } = job || {}

//   return (
//     <CardLayout
//       elevation="sm"
//       hoverable
//       className="relative bg-white rounded-lg"
//     >
//       {/* “×” remove button */}
//       {onRemove && (
//         <button
//           onClick={onRemove}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//           aria-label="Remove saved job"
//         >
//           <AiOutlineClose size={16} />
//         </button>
//       )}

//       {/* Job info */}
//       <div className="space-y-1">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <p className="text-sm text-gray-500">{companyName}</p>
//         <p className="text-sm text-gray-500">{locationName}</p>
//         {savedAgoText && (
//           <p className="text-xs text-gray-400">{savedAgoText}</p>
//         )}
//       </div>

//       {/* Actions & match badge */}
//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Button type="primary" onClick={onApply}>
//             Apply
//           </Button>
//           <a
//             href={applyLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Open original job posting"
//           >
//             <Button icon={<CiExport />} />
//           </a>
//         </div>

//         <span className="inline-block bg-gray-100 text-gray-600 text-sm rounded-full px-3 py-1">
//           {matchPercentage}% match
//         </span>
//       </div>
//     </CardLayout>
//   )
// }

'use client'
import React from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { CiExport }      from 'react-icons/ci'
import { Button }        from 'antd'
import CardLayout        from '@/components/layouts/CardLayout'
import type { Job }      from '@/types/job'
import { useJobActions } from '@/utils/jobActions'
import { AiOutlineEye } from 'react-icons/ai'

interface SaveJobCardProps {
  job: Job
  /** Whether the job is currently saved */
  isSaved: boolean
  /** “Saved 2 days ago”  */
  savedAgoText?: string
  /** 0–100 */
  matchPercent?: number
  /** Callback if you need to drive some parent state */
  onSavedToggled?: (newIsSaved: boolean) => void
}

export default function SaveJobCard({
  job,
  isSaved,
  savedAgoText,
  matchPercent = 0,
  onSavedToggled,
}: SaveJobCardProps) {
  const { toggleSave, doApply } = useJobActions()

  const handleBookmark = async () => {
    try {
      await toggleSave(job, isSaved)
      onSavedToggled?.(!isSaved)
    } catch (e) {
      console.error('Could not toggle save', e)
    }
  }

  const handleApply = () => {
    doApply(job).catch((e) => {
      console.error('Could not apply', e)
    })
  }

  return (
    <CardLayout elevation="sm" hoverable className="relative">
      {/* remove “×” button omitted for brevity */}

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-500">
          {job.company.display_name}
        </p>
        <p className="text-sm text-gray-500">
          {job.location.display_name}
        </p>
        {savedAgoText && (
          <p className="text-xs text-gray-400">{savedAgoText}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2 gap-1">
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>

          <Button
            icon={<AiOutlineEye />}
            onClick={() => window.open(job.redirect_url, '_blank')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-sm rounded-full px-3 py-1">
            {matchPercent}% match
          </span>
          <Button
            icon={<FaRegBookmark />}
            onClick={handleBookmark}
            type='default'
            disabled={!isSaved}
          />
        </div>
      </div>
    </CardLayout>
  )
}
