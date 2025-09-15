'use client'

import React, { useState } from 'react';
import JobSearchFiltersCard from '@/components/cards/JobSearchFiltersCard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import FeatureJobCarousel from '@/components/sections/job/FeatureJobCarousel';
import { useJobs } from '@/hooks/useJobs';
import type { Option } from '@/components/form/SelectField';
import JobListingCard from '@/components/cards/JobListingCard';
import Spinner from '@/components/Spinner';

export default function SearchJobs() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<
    Record<'location' | 'trade' | 'role' | 'qual' | 'status', Option | null>
  >({
    location: null,
    trade: null,
    role: null,
    qual: null,
    status: null,
  });

  const {
    // the raw lists
    searchData,
    recommendedData,
    // savedData,
    // appliedData,
    // recentData,
    // summaryData,

    // loading flags
    isSearchLoading,
    isRecLoading,
    // isSavedLoading,
    // isAppliedLoading,
    // isRecentLoading,
    // isSummaryLoading,
  } = useJobs(
    searchValue,
    filters,
    { page: 1, pageSize: 20 },
    { page: 1, pageSize: 10 }
  )

  const featuredJobs = recommendedData?.jobs ?? []
  const searchJobs = searchData?.jobs ?? []
  const searchCount = (searchData?.jobs ?? []).length || 0

  if (isSearchLoading || isRecLoading) {
    return (
      <DashboardLayout><Spinner /></DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <section className="col-span-6 space-y-7 h-full overflow-y-auto pr-4">
        <JobSearchFiltersCard
          searchQuery={searchValue}
          setSearchQuery={setSearchValue}
          filters={filters}
          setFilters={setFilters}
        />
        {
          !isRecLoading && (
            <FeatureJobCarousel featuredJobs={featuredJobs} cardBg='bg-[#ECECEC]' />
          )
        }

        <h2 className="text-2xl text=[#1E293B] font-semibold">Search Result ({searchCount})</h2>

        {isSearchLoading ? <Spinner title='Searching ...' /> : searchJobs.map((job) => {
          return (
            <JobListingCard key={job.id} data={job} />
          )
        })}
      </section>
    </DashboardLayout>
  );
}
