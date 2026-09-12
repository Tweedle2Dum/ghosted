import Link from "next/link";
import { Logo } from "@/shared/ui/logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/40 py-12 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo variant="icon" />
          <p className="text-xs text-muted-foreground mt-2">
            © 2026 Ghosted Workspace. Track your career.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Console
          </Link>
          <Link
            href="/login"
            className="hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="https://github.com/tweedle2dum"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
