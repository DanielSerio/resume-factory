import { CreateResumePage } from "@/modules/Resume/pages/CreateResumePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resumes/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateResumePage />;
}
