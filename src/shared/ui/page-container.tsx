import type * as React from "react";
import { cn } from "@/shared/lib/utils";

/**
 * A container component that provides standard page padding and max-width.
 * Can rendered as any HTML element using the 'as' prop.
 */
export function PageContainer({
  className,
  as: Component = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: any }) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 3xl:max-w-[1560px] relative z-10",
        className,
      )}
      {...props}
    />
  );
}
