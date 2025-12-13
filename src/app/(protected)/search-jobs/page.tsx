'use client'

import React, { useEffect, useState } from 'react';
import JobSearchFiltersCard from '@/components/cards/JobSearchFiltersCard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import FeatureJobCarousel from '@/components/sections/job/FeatureJobCarousel';
import { useJobs } from '@/hooks/useJobs';
import type { Option } from '@/components/form/SelectField';
import JobListingCard from '@/components/cards/JobListingCard';
import Spinner from '@/components/Spinner';
import { Pagination } from 'antd';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedJobs = searchJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, filters]);

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

        <h2 className="text-2xl text=[#1E293B] font-semibold">Search Result ({searchCount})</h2>

        {isSearchLoading ? (
          <Spinner title='Searching ...' />
        ) : (
          <>
            {/* Job Cards */}
            <div className="space-y-4">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobListingCard key={job.id} data={job} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No jobs found. Try adjusting your search filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {searchJobs.length > pageSize && (
              <div className="flex justify-center py-6">
                <Pagination
                  current={currentPage}
                  total={searchCount}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} jobs`
                  }
                />
              </div>
            )}
          </>
        )}

        {
          !isRecLoading && (
            <FeatureJobCarousel featuredJobs={featuredJobs} cardBg='bg-[#faf4eb]' />
          )
        }
      </section>
    </DashboardLayout>
  );
}
