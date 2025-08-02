import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resumes/[id]/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/resumes/[id]/"!</div>;
}
