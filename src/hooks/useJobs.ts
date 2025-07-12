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
import type { Option } from '@/components/form/SelectField';

export type FilterSet = Record<
  'location' | 'trade' | 'role' | 'qual' | 'status',
  Option | null
>;

export const useJobs = (
  searchValue: string,
  filters: FilterSet = {
    location: null,
    trade: null,
    role: null,
    qual: null,
    status: null,
  },
  pageParams: PaginationParams = { page: 1, pageSize: 20 },
  recommendedParams: PaginationParams = { page: 1, pageSize: 10 },
  savedParams: PaginationParams | typeof skipToken = skipToken,
  appliedParams: PaginationParams | typeof skipToken = skipToken,
  recentParams: PaginationParams | typeof skipToken = skipToken,
) => {
  const hasSearch =
    Boolean(searchValue) ||
    Boolean(filters.location) ||
    Boolean(filters.trade);

  // build search params
  const searchParams: SearchParams = {
    page: pageParams?.page || 1,
    pageSize: pageParams?.pageSize || 10,
    q: searchValue || "",
    location: filters?.location?.value as string | number || 0 ,
    trade: filters?.trade?.value as string | number ||  0,
  };

  // search
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useSearchJobsQuery(hasSearch ? searchParams : skipToken);

  // recommended
  const {
    data: recommendedData,
    isLoading: isRecLoading,
    isError: isRecError,
  } = useGetRecommendedJobsQuery(recommendedParams);

  // saved
  const {
    data: savedData,
    isLoading: isSavedLoading,
    isFetching: isSavedFetching,
    isError: isSavedError,
  } = useGetSavedJobsQuery(savedParams);

  // applied
  const {
    data: appliedData,
    isLoading: isAppliedLoading,
    isError: isAppliedError,
  } = useGetAppliedJobsQuery(appliedParams);

  // recently viewed
  const {
    data: recentData,
    isLoading: isRecentLoading,
    isError: isRecentError,
  } = useGetRecentlyViewedQuery(skipToken);

  // summary
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useGetJobsSummaryQuery();

  // mutations
  const [saveJob, saveResult] = useSaveJobMutation();
  const [removeSavedJob, removeSavedResult] = useRemoveSavedJobMutation();
  const [applyJob, applyResult] = useApplyJobMutation();
  const [recordJobView, recordViewResult] = useRecordJobViewMutation();

  return {
    // raw data
    searchData,
    recommendedData,
    savedData,
    appliedData,
    recentData,
    summaryData,

    // loading / fetching
    isSearchLoading,
    isSearchFetching,
    isSearchError,
    isRecLoading,
    isRecError,
    isSavedLoading,
    isSavedFetching,
    isSavedError,
    isAppliedLoading,
    isAppliedError,
    isRecentLoading,
    isRecentError,
    isSummaryLoading,
    isSummaryError,

    // mutations
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
