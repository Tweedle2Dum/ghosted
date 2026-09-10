import type * as React from "react";
import { DashboardBackground } from "@/widgets";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <DashboardBackground />
      {children}
    </div>
  );
}
