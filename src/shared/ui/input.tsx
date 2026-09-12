import type * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({
  className,
  type,
  placeholder,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      placeholder={
        type === "password" ? placeholder || "*********" : placeholder
      }
      className={cn(
        "h-11 w-full min-w-0 border border-transparent rounded-[var(--radius)] bg-muted/50 px-3 py-3 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-placeholder focus-visible:border-input focus-visible:bg-background focus-visible:ring-[3px] focus-visible:ring-primary/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
