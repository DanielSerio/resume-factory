import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/job-postings/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/job-postings/create/"!</div>
}
