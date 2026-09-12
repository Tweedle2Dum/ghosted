import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Floating3DParticles } from "@/shared/ui/floating-3d-particles";

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-background">
      <Floating3DParticles
        color="#808080"
        quantity={300}
        opacity={0.3}
        className="opacity-50"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-border/20 via-border/5 to-transparent blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-semibold text-foreground mb-6 backdrop-blur-sm">
          <span className="flex size-2 rounded-full bg-primary" />
          <span>Ghosted 1.0 is now live</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-foreground sm:leading-[1.05]">
          Track your job hunt. <br />
          <span className="text-muted-foreground">Don't get Ghosted.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Manage applications in Kanban or Table views, A/B test your resumes,
          and visualize your interview funnel. Take control of your career
          pipeline.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild className="gap-2 px-8 text-base shadow-xs">
            <Link href="/dashboard">
              Start Tracking (Free) <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="px-8 text-base"
          >
            <Link href="#features">See how it works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
