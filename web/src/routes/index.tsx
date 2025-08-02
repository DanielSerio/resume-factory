import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/modules/Dashboard/pages/DashboardPage";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <DashboardPage />;
}
