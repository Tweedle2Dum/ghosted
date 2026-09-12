import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export function MarketingCta() {
  return (
    <section className="py-24 border-t border-border/40 bg-secondary/20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
          Ready to stop guessing?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join developers who use Ghosted to take control of their interview
          pipelines, A/B test resumes, and optimize their job hunt—100% free.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="xl"
            asChild
            className="w-full sm:w-auto gap-2 shadow-xs"
          >
            <Link href="/dashboard">
              Start Tracking Now <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            asChild
            className="w-full sm:w-auto gap-2 bg-background"
          >
            <Link
              href="https://github.com/tweedle2dum"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="size-5" /> Star on GitHub
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          No credit card required. Free and open source forever.
        </p>
      </div>
    </section>
  );
}
