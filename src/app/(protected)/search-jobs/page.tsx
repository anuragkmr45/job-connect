"use client"
import JobListingCard from "@/components/cards/JobListingCard";
import JobSearchFiltersCard from "@/components/cards/JobSearchFiltersCard";
import CustomCarousel from "@/components/CustomCarousel";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FeatureJobCarousel from "@/components/sections/search-job/FeatureJobCarousel";
import { useJobs } from "@/hooks/useJobs";
import { RecommendedJobsResponse } from "@/types/job";

export default function Searchjobs() {

  const { recommendedResult } = useJobs();

  const {
    currentData: {
      jobs: featuredJobs = []
    } = {}
  } = recommendedResult || {};

  return (
    <DashboardLayout>
      <div className="grid grid-cols-6 gap-2">
        <section className="col-span-4 space-y-7  h-full overflow-y-auto pr-4">
          <JobSearchFiltersCard />
          <FeatureJobCarousel featuredJobs={featuredJobs} />
          {/* <JobListingCard /> */}
        </section>
        <aside className="col-span-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa ullam aliquam quis possimus expedita, nihil obcaecati est explicabo eaque reprehenderit totam animi vel maiores corrupti distinctio, culpa deserunt ex ea.
        </aside></div>

    </DashboardLayout >
  );
}
