"use client"
import AppliedJobCard from "@/components/cards/AppliedJobsCard";
import SaveJobCard from "@/components/cards/SaveJobCard";
import CardLayout from "@/components/layouts/CardLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SavedJobsPanel from "@/components/sections/job/SavedJobsPanel";
import Spinner from "@/components/Spinner";
import { useJobs } from "@/hooks/useJobs";
import { IoMdDocument } from "react-icons/io";

export default function Appliedjobs() {
  const { appliedData, savedData, isSavedFetching, isAppliedLoading, isSavedError, isAppliedError } = useJobs("", undefined, { page: 1, pageSize: 10 }, undefined, { page: 1, pageSize: 10 }, { page: 1, pageSize: 10 });

  const { count: appliedJobCount = 0, jobs: appliedJobs = [] } = appliedData || {}
  const { count: savedJobCount = 0, jobs: savedJobs = [] } = savedData || {}

  if (isAppliedLoading || isSavedFetching) return <DashboardLayout><Spinner /></DashboardLayout>
  if (isSavedError || isAppliedError) return <DashboardLayout><p className="p-4 text-red-500">Failed to load your jobs.</p></DashboardLayout>

  const cardData = [
    {
      title: "Total Applications",
      count: appliedJobCount,
      icon: <IoMdDocument />
    },
    {
      title: "Saved Jobs",
      count: savedJobCount,
      icon: <IoMdDocument />
    },
    {
      title: "Interview",
      count: 0,
      icon: <IoMdDocument />
    },
    {
      title: "Offer",
      count: 0,
      icon: <IoMdDocument />
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4">
        {
          cardData.map((data) => {
            const { title, count } = data || {}
            return (
              <CardLayout key={title ?? ""}>
                <div className="grid grid-cols-3 gap-4">
                  <aside className="col-span-3">
                    <h2>{title ?? ""}</h2>
                    <span>{count ?? ""}</span>
                  </aside>
                </div>
              </CardLayout>
            )
          })
        }
      </div>
      <div className="grid grid-cols-6 gap-2">
        <aside className="col-span-4">
          <h2>Your Applications</h2>
          {appliedJobs.map((job) => {
            return (
              <div className="my-3"><AppliedJobCard key={job.id} jobData={job} /></div>
            )
          })}
        </aside>
        <aside className="col-span-2">
          <SavedJobsPanel jobs={savedJobs}  />
        </aside>
      </div>

    </DashboardLayout>
  );
}
