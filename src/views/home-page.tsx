import type { Metadata } from "next";

import {
  MarketingAnalytics,
  MarketingCta,
  MarketingFeatures,
  MarketingFooter,
  MarketingHeader,
  MarketingHero,
  MarketingWorkflow,
} from "@/widgets/marketing";

export const metadata: Metadata = {
  title: "Ghosted | Track your job hunt",
  description:
    "Take control of your career pipeline. Manage applications, A/B test resumes, and visualize your interview funnel so you never get ghosted.",
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary-light selection:text-brand-deep">
      <MarketingHeader />
      <main>
        <MarketingHero />
        <MarketingWorkflow />
        <MarketingFeatures />
        <MarketingAnalytics />
        <MarketingCta />
      </main>
      <MarketingFooter />
    </div>
  );
}
