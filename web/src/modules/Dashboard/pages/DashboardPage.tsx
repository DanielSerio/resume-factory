import { GridSection, Page } from "@/components/layout";
import { JobPostingsCard, ResumesCard } from "../components";

export function DashboardPage() {
  return (
    <Page>
      <GridSection className="max-w-7xl mx-auto" spacing={4}>
        <ResumesCard />
        <JobPostingsCard />
      </GridSection>
    </Page>
  );
}
