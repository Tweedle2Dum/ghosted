import type * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/logo";
import { Spinner } from "@/shared/ui/spinner";

/**
 * A full-screen loader that covers the entire viewport.
 */
export function ScreenLoader({
  className,
  spinnerClassName,
  ...props
}: React.ComponentProps<"div"> & { spinnerClassName?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <Spinner className={cn("size-8 text-primary", spinnerClassName)} />
    </div>
  );
}

/**
 * A loader that fills its nearest relative-positioned parent.
 */
export function ComponentLoader({
  className,
  spinnerClassName,
  ...props
}: React.ComponentProps<"div"> & { spinnerClassName?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center bg-background/50",
        className,
      )}
      {...props}
    >
      <Spinner className={cn("size-6 text-primary", spinnerClassName)} />
    </div>
  );
}

/**
 * A branded splash loader with logo and spinner.
 */
export function SplashLoader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-[calc(100vh-theme(spacing.16))] w-full flex-col items-center justify-center gap-8 px-6",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
        <Logo variant="stacked" className="scale-110" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Spinner className="size-4 text-primary" />
          <span>Initializing workspace...</span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 blur-[100px]">
        <div className="size-64 rounded-full bg-primary" />
      </div>
    </div>
  );
}
