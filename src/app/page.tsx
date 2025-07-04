import DocumentUploadCard from "@/components/cards/DocumentUploadCard";
import JobListingCard from "@/components/cards/JobListingCard";
import JobSearchFiltersCard from "@/components/cards/JobSearchFiltersCard";
import ProfileCompletionCard from "@/components/cards/ProfileCompletionCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="">
        <JobSearchFiltersCard />
        <ProfileCompletionCard />
        <JobListingCard />
        <DocumentUploadCard />
      </div>
    </DashboardLayout>
  );
}
