"use client";

import {
  ArrowRight,
  Boxes,
  Code2,
  Cpu,
  FolderGit2,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Logo } from "@/shared/ui/logo";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo href="/" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/dashboard"
              className="hover:text-foreground transition-colors"
            >
              Console
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/analytics"
              className="hover:text-foreground transition-colors"
            >
              Analytics
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard" className="gap-2">
                Open Console <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-[140px]" />
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-6">
              <Sparkles className="size-3.5" />
              <span>Ghosted Architecture Baseline 1.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground sm:leading-[1.1]">
              Autonomous Workspace & <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Feature-Sliced Precision
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Engineered with Next.js 16, React 19, Tailwind CSS v4, and Biome.
              Zero overhead, strict typing, and instant-on developer velocity.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                asChild
                className="gap-2 px-6 shadow-lg shadow-primary/20"
              >
                <Link href="/dashboard">
                  Launch Console <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-6">
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>

            {/* Architecture Highlights Bar */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              {[
                {
                  label: "Core Runtime",
                  value: "Next.js 16 + React 19",
                  icon: Cpu,
                },
                {
                  label: "Design Stack",
                  value: "Tailwind v4 + Radix",
                  icon: Layers,
                },
                {
                  label: "Code Quality",
                  value: "Biome (Zero-Lint-Lag)",
                  icon: Terminal,
                },
                {
                  label: "Architecture",
                  value: "Feature-Sliced Design",
                  icon: Boxes,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
                >
                  <stat.icon className="size-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 border-t border-border/50 bg-secondary/30">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Production-Ready Architectural Layers
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mirrored directly from enterprise patterns for scalable frontend
                engineering.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FolderGit2 className="size-6 text-primary mb-2" />
                  <CardTitle className="text-base">
                    Feature-Sliced Design (FSD)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>
                    Strict vertical slice isolation across{" "}
                    <code className="text-foreground">views</code>,{" "}
                    <code className="text-foreground">widgets</code>,{" "}
                    <code className="text-foreground">features</code>, and{" "}
                    <code className="text-foreground">shared</code>.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code2 className="size-6 text-primary mb-2" />
                  <CardTitle className="text-base">
                    1:1 Core Utilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>
                    Production-tested utility toolchain: Ky API client with
                    automatic token refresh, error boundary mappings, token
                    persistence, and debounce hooks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <ShieldCheck className="size-6 text-primary mb-2" />
                  <CardTitle className="text-base">
                    Type Safety & Modern Tooling
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>
                    Zod schemas, React Hook Form resolvers, TanStack Query v5
                    state management, and Biome linting for instantaneous
                    feedback loops.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Logo variant="icon" />
            <span>© 2026 Ghosted Workspace. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="hover:text-foreground transition-colors"
            >
              Console
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/login"
              className="hover:text-foreground transition-colors"
            >
              Account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
