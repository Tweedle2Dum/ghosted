import type * as React from "react";
import { NoiseTexture } from "@/shared/ui/noise-texture";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <NoiseTexture
        noiseOpacity={0.3}
        className="mix-blend-overlay opacity-30"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
