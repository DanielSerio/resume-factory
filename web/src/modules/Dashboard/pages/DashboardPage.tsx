import { GridSection, Page } from "@/components/layout";
import { JobPostingsCard, ResumesCard } from "../components";
import { DashboardProvider } from "../hooks";

export function DashboardPage() {
  return (
    <DashboardProvider>
      <Page>
        <GridSection className="max-w-7xl mx-auto" spacing={4}>
          <ResumesCard />
          <JobPostingsCard />
        </GridSection>
      </Page>
    </DashboardProvider>
  );
}
