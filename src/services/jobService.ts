// services/jobService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type {
    Job,
    PaginatedJobsResponse,
    RecommendedJobsResponse,
    JobsSummary,
    SearchParams,
    PaginationParams,
} from '../types/job';

export const mapJob = (raw: any): Job => {
    const categoryLabel =
        raw?.category?.label ??
        raw?._jobpool?.role ?? // for JobPool rows
        '';

    return {
        id: raw.id,
        title: raw.title,
        description: raw.description,
        redirect_url: raw.redirect_url,
        adref: raw.adref,
        contract_type: raw.contract_type,
        contract_time: raw.contract_time,
        salary_min: raw.salary_min,
        salary_max: raw.salary_max,
        salary_is_predicted: raw.salary_is_predicted,
        created: raw.created,
        latitude: raw.latitude,
        longitude: raw.longitude,
        category: {
            label: categoryLabel,
            tag: raw?.category?.tag ?? '',
        },
        company: {
            display_name: raw?.company?.display_name ?? '',
        },
        location: {
            display_name: raw?.location?.display_name ?? '',
            area: raw?.location?.area ?? [],
        },
    };
};

export const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Jobs'],
    endpoints: (builder) => ({
        searchJobs: builder.query<PaginatedJobsResponse, SearchParams>({
            query: (params) => ({
              url: '/api/jobs/search',
              params: {
                page: params.page,
                pageSize: params.pageSize,
                q: params.q,                // PRIMARY keyword; wired from useJobs
                trade: params.trade,
                location: params.location,  
                salary_min: params.salary_min,
                salary_max: params.salary_max,
              },
            }),
            transformResponse: (raw: any): PaginatedJobsResponse => ({
                count: raw.count,
                page: raw.page,
                pageSize: raw.pageSize ?? raw.results_per_page,
                jobs: raw.jobs.map(mapJob),
              }),
            providesTags: ['Jobs'],
        }),
        getRecommendedJobs: builder.query<RecommendedJobsResponse, PaginationParams>({
            query: ({ page = 1, pageSize = 10 } = {}) => ({
                url: '/api/jobs/recommended',
                // params: { page, pageSize },
            }),
            transformResponse: (raw: any): RecommendedJobsResponse => ({
                jobs: raw.jobs.map(mapJob),
            }),
            providesTags: ['Jobs'],
        }),
        saveJob: builder.mutation<{ saved: boolean }, { job: Job }>({
            query: ({ job }) => ({
                url: `/api/jobs/${job.id}/save`,
                method: 'POST',
                body: { job },
            }),
            invalidatesTags: ['Jobs'],
        }),
        removeSavedJob: builder.mutation<{ removed: boolean }, { jobId: string }>({
            query: ({ jobId }) => ({
                url: `/api/jobs/${jobId}/save`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jobs'],
        }),
        getSavedJobs: builder.query<PaginatedJobsResponse, PaginationParams>({
            query: (params) => ({
                url: '/api/jobs/saved',
                params,
            }),
            transformResponse: (raw: any): PaginatedJobsResponse => ({
                count: raw.count,
                page: raw.page,
                pageSize: raw.pageSize,
                jobs: raw.jobs.map(mapJob),
            }),
            providesTags: ['Jobs'],
        }),
        applyJob: builder.mutation<{ applied: boolean }, { job: Job }>({
            query: ({ job }) => ({
                url: `/api/jobs/${job.id}/apply`,
                method: 'POST',
                body: { job },
            }),
            invalidatesTags: ['Jobs'],
        }),
        getAppliedJobs: builder.query<PaginatedJobsResponse, PaginationParams>({
            query: (params) => ({
                url: '/api/jobs/applied',
                params,
            }),
            transformResponse: (raw: any): PaginatedJobsResponse => ({
                count: raw.count,
                page: raw.page,
                pageSize: raw.pageSize,
                jobs: raw.jobs.map(mapJob),
            }),
            providesTags: ['Jobs'],
        }),
        recordJobView: builder.mutation<{ viewed: boolean }, { job: Job }>({
            query: ({ job }) => ({
                url: `/api/jobs/${job.id}/view`,
                method: 'POST',
                body: { job },
            }),
            invalidatesTags: ['Jobs'],
        }),
        getRecentlyViewed: builder.query<PaginatedJobsResponse, PaginationParams>({
            query: (params) => ({
                url: '/api/jobs/recently-viewed',
                params,
            }),
            transformResponse: (raw: any): PaginatedJobsResponse => ({
                count: raw.count,
                page: raw.page,
                pageSize: raw.pageSize,
                jobs: raw.jobs.map(mapJob),
            }),
            providesTags: ['Jobs'],
        }),
        getJobsSummary: builder.query<JobsSummary, void>({
            query: () => '/api/jobs/summary',
            transformResponse: (raw: any): JobsSummary => ({
                saved: raw.saved.map(mapJob),
                applied: raw.applied.map(mapJob),
                viewed: raw.viewed.map(mapJob),
            }),
            providesTags: ['Jobs'],
        }),
    }),
});

export const {
    useSearchJobsQuery,
    useGetRecommendedJobsQuery,
    useSaveJobMutation,
    useRemoveSavedJobMutation,
    useGetSavedJobsQuery,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useRecordJobViewMutation,
    useGetRecentlyViewedQuery,
    useGetJobsSummaryQuery,
} = jobApi;
