"use client"

import JobSearchFiltersCard from "@/components/cards/JobSearchFiltersCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import type { Option } from '@/components/form/SelectField';
import { useJobs } from "@/hooks/useJobs";
import FeatureJobCarousel from "@/components/sections/job/FeatureJobCarousel";
import { useProfile } from "@/hooks/useProfile";
import { AVATAR_FALLBACK } from "@/constants/app.constanst";
import ProfileCompletionCard from "@/components/cards/ProfileCompletionCard";
import DocumentUploadCard from "@/components/cards/DocumentUploadCard";
import SavedJobsPanel from "@/components/sections/job/SavedJobsPanel";
import JobListingCard from "@/components/cards/JobListingCard";
import Spinner from "@/components/Spinner";

export default function Home() {

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
    searchData,
    recommendedData,
    summaryData,

    // loading flags
    isSearchLoading,
    isRecLoading,
    // isSavedLoading,
    // isAppliedLoading,
    // isRecentLoading,
    isSummaryLoading,
  } = useJobs(
    searchValue,
    filters,
    { page: 1, pageSize: 20 },
    { page: 1, pageSize: 10 },
    { page: 1, pageSize: 10 },
    { page: 1, pageSize: 10 },
  )

  const { profile, loadingProfile, fetchError } = useProfile()

  const { applied = [], saved = [], viewed = [] } = summaryData || {};
  const { profile_pic_url = AVATAR_FALLBACK, email, name, military_trade, service_start_date, service_end_date } = profile || {}

  const featuredJobs = recommendedData?.jobs ?? []
  const searchJobs = searchData?.jobs ?? []
  const searchCount = (searchData?.jobs ?? []).length || 0

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 gap-2">
        {!loadingProfile && <ProfileCompletionCard avatarImg={profile_pic_url ?? AVATAR_FALLBACK} email={email ?? ""} username={name ?? ""} trade={military_trade ?? ""} serviceStart={service_start_date ?? 0} serviceEnd={service_end_date ?? 0} />}
        <JobSearchFiltersCard
          searchQuery={searchValue}
          setSearchQuery={setSearchValue}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="my-6">
        <h2 className="text-2xl text=[#1E293B] font-semibold">Search Result ({searchCount})</h2>

        {isSearchLoading ? <Spinner title='Searching ...' /> : (searchJobs ?? []).map((job) => {
          const { id = "" } = job || {};
          return (
            <JobListingCard key={id} data={job} />
          )
        })}
      </div>
      <div className="bg-white my-6">
        {
          !isRecLoading && (
            <FeatureJobCarousel featuredJobs={featuredJobs} />
          )
        }
      </div>
      {!isSummaryLoading && <div>
        <h2 className="text-2xl text=[#1E293B] font-semibold">Application Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <SavedJobsPanel jobs={saved} />
          <SavedJobsPanel jobs={applied} title="Applied Jobs" />
          <SavedJobsPanel jobs={viewed} title="Viewed Jobs" />
        </div>
      </div>}
      <div className="my-6">
        <h2 className="text-2xl text=[#1E293B] font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          <DocumentUploadCard title="Upload Document" subtitle="Add resume, certificates, or other documents" />
          <DocumentUploadCard title="Resume Builder" subtitle="Create or update your military-to-civilian resume" />
          <DocumentUploadCard title="Refer a Friend" subtitle="Help fellow service members find opportunities" />
          <DocumentUploadCard title="Skill Upgrade" subtitle="Explore training programs and certifications" />
        </div>
      </div>
    </DashboardLayout>
  );
}
