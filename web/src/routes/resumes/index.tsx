import { ResumeListPage } from "@/modules/Resume/pages/ResumeListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resumes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResumeListPage />;
}
