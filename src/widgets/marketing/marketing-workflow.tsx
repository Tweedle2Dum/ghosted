import { CheckCircle2, MousePointerClick, TrendingUp } from "lucide-react";

export function MarketingWorkflow() {
  const steps = [
    {
      icon: MousePointerClick,
      title: "1. Log your applications",
      description:
        "Drop in the role, company, and which resume you used. Ghosted tracks the date applied automatically.",
    },
    {
      icon: CheckCircle2,
      title: "2. Drag to update status",
      description:
        "Moving to a screening call or interview? Just drag the card. We log the timeline and calculate days in stage.",
    },
    {
      icon: TrendingUp,
      title: "3. Spot the bottlenecks",
      description:
        "Our analytics engine instantly identifies drop-offs and flags companies that have ghosted you for 21+ days.",
    },
  ];

  return (
    <section className="py-24 border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for engineering velocity
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            No bloated forms. No unnecessary clicks. Just a clean,
            developer-focused workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-border/60 -z-10" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary border border-border/40 shadow-xs mb-6">
                <step.icon className="size-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
