// hooks/useJobs.ts
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useSearchJobsQuery,
  useGetRecommendedJobsQuery,
  useGetSavedJobsQuery,
  useGetAppliedJobsQuery,
  useGetRecentlyViewedQuery,
  useGetJobsSummaryQuery,
  useSaveJobMutation,
  useRemoveSavedJobMutation,
  useApplyJobMutation,
  useRecordJobViewMutation,
} from '../services/jobService';
import type { SearchParams, PaginationParams } from '../types/job';

export const useJobs = (
  searchParams?: SearchParams,
  savedParams?: PaginationParams,
  appliedParams?: PaginationParams,
  recentParams?: PaginationParams
) => {
  const searchResult = useSearchJobsQuery(searchParams ?? skipToken);
  const recommendedResult = useGetRecommendedJobsQuery();
  const savedResult = useGetSavedJobsQuery(savedParams ?? skipToken);
  const appliedResult = useGetAppliedJobsQuery(appliedParams ?? skipToken);
  const recentlyViewedResult = useGetRecentlyViewedQuery(recentParams ?? skipToken);
  const summaryResult = useGetJobsSummaryQuery();

  const [saveJob, saveResult] = useSaveJobMutation();
  const [removeSavedJob, removeSavedResult] = useRemoveSavedJobMutation();
  const [applyJob, applyResult] = useApplyJobMutation();
  const [recordJobView, recordViewResult] = useRecordJobViewMutation();

  return {
    // Queries
    searchResult,
    recommendedResult,
    savedResult,
    appliedResult,
    recentlyViewedResult,
    summaryResult,

    // Mutations
    saveJob,
    saveResult,
    removeSavedJob,
    removeSavedResult,
    applyJob,
    applyResult,
    recordJobView,
    recordViewResult,
  };
};
