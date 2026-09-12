import { ArrowRight, LineChart } from "lucide-react";

export function MarketingAnalytics() {
  return (
    <section id="analytics" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1 text-sm font-medium mb-6">
              <LineChart className="size-4" />
              <span>Advanced Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Visualize your drop-off.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop guessing where things went wrong. Ghosted aggregates your
              status timeline into beautiful Sankey funnel diagrams, showing
              your exact conversion rates from applied to screening, interview,
              and offer.
            </p>
            <ul className="space-y-4">
              {[
                "Identify your biggest pipeline bottlenecks",
                "Compare performance by target role types",
                "Keep historical records of your career growth",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="flex size-6 items-center justify-center rounded-full bg-secondary">
                    <ArrowRight className="size-3 text-foreground" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            {/* Minimalist decorative placeholder for the Sankey diagram */}
            <div className="aspect-square sm:aspect-video lg:aspect-square rounded-2xl border border-border/40 bg-secondary/20 p-8 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="relative z-10 flex flex-col gap-4 w-full max-w-sm">
                <div className="h-12 w-full rounded-md bg-border/40 animate-pulse" />
                <div className="h-12 w-3/4 rounded-md bg-border/40 animate-pulse" />
                <div className="h-12 w-1/2 rounded-md bg-border/40 animate-pulse" />
                <div className="h-12 w-1/4 rounded-md bg-border/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
