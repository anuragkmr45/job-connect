// utils/jobActions.ts
import type { Job } from '@/types/job'
import {
    useSaveJobMutation,
    useRemoveSavedJobMutation,
    useApplyJobMutation,
} from '@/services/jobService'

// 1. Hook that returns all three mutation triggers
export function useJobActions() {
    const [saveJob] = useSaveJobMutation()
    const [removeJob] = useRemoveSavedJobMutation()
    const [applyJob] = useApplyJobMutation()

    /**
     * Toggle “saved” state: if `isSaved` = true it will unsave, otherwise save
     */
    async function toggleSave(job: Job, isSaved: boolean) {
        if (isSaved) {
            await removeJob({ jobId: job.id }).unwrap()
        } else {
            await saveJob({ job }).unwrap()
        }
    }

    /**
     * Apply to a job: opens the external link, then fires your apply mutation
     */
    async function doApply(job: Job) {
        window.open(job.redirect_url, '_blank', 'noopener,noreferrer')
        await applyJob({ job }).unwrap()
    }

    return { toggleSave, doApply }
}
