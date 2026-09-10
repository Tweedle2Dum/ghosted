import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";

// ─── Fluid Type Scale (1280px → 1920px) ───────────────────────────────────────

export function TypographyDisplay({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "!text-display font-sans font-medium leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("!text-h1 font-sans font-medium leading-[1.1]", className)}
      {...props}
    />
  );
}

export function TypographyH2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("!text-h2 font-sans font-medium leading-[1.2]", className)}
      {...props}
    />
  );
}

export function TypographyH3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("!text-h3 font-sans font-medium leading-[1.2]", className)}
      {...props}
    />
  );
}

export function TypographyH4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("!text-h4 font-sans font-medium leading-[1.3]", className)}
      {...props}
    />
  );
}

export function TypographyH5({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("!text-h5 font-sans font-medium leading-[1.3]", className)}
      {...props}
    />
  );
}

export function TypographyH6({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn("!text-h6 font-sans font-medium leading-[1.4]", className)}
      {...props}
    />
  );
}

export function TypographyP({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("!text-p font-sans leading-[1.5]", className)}
      {...props}
    />
  );
}

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function TypographyInfo({
  className,
  asChild = false,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      className={cn("!text-info font-sans leading-[1.5]", className)}
      {...props}
    />
  );
}

export function TypographyOverline({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("!text-overline font-sans leading-[1.5]", className)}
      {...props}
    />
  );
}

export function TypographyTag({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("!text-tag font-sans font-medium leading-[1.6]", className)}
      {...props}
    />
  );
}

// ─── Utility Components ────────────────────────────────────────────────────────

export function TypographyBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-p", className)}
      {...props}
    />
  );
}

export function TypographyList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc text-p [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export function TypographyInlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.85em] font-medium",
        className,
      )}
      {...props}
    />
  );
}
