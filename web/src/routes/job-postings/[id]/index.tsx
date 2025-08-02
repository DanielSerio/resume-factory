import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/job-postings/[id]/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/job-postings/[id]/"!</div>;
}
