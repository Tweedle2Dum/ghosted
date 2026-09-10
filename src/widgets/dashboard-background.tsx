"use client";

import { DotPattern } from "@/shared/ui/dot-pattern";

export function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <DotPattern className="opacity-40" />
    </div>
  );
}
