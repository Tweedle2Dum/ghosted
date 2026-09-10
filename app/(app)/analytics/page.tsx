import { AnalyticsPage } from "@/views/analytics-page";

export const metadata = {
  title: "Analytics | Ghosted Workspace",
  description:
    "Global latency distributions, compute allocations, and event throughput rates.",
};

export default function Page() {
  return <AnalyticsPage />;
}
