"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "stacked" | "icon";
  href?: string;
}

export const GhostIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("size-7 shrink-0", className)}
  >
    <rect width="32" height="32" rx="8" className="fill-primary/10" />
    <path
      d="M16 6C11.5817 6 8 9.58172 8 14V23.5C8 24.3284 8.67157 25 9.5 25C10.05 25 10.55 24.7 10.8 24.25L12.5 21.5L14.2 24.25C14.55 24.75 15.2 25 15.8 24.8L16 24.75L16.2 24.8C16.8 25 17.45 24.75 17.8 24.25L19.5 21.5L21.2 24.25C21.45 24.7 21.95 25 22.5 25C23.3284 25 24 24.3284 24 23.5V14C24 9.58172 20.4183 6 16 6Z"
      className="fill-primary"
    />
    <circle cx="13.5" cy="13.5" r="1.5" className="fill-primary-foreground" />
    <circle cx="18.5" cy="13.5" r="1.5" className="fill-primary-foreground" />
  </svg>
);

export const Logo = ({ className, variant = "default", href }: LogoProps) => {
  const content = (
    <>
      {variant === "stacked" ? (
        <div className={cn("flex flex-col items-center gap-2", className)}>
          <GhostIcon className="size-10" />
          <span className="font-bold text-xl tracking-tight text-foreground">
            ghosted
          </span>
        </div>
      ) : variant === "icon" ? (
        <div className={cn("flex items-center justify-center", className)}>
          <GhostIcon />
        </div>
      ) : (
        <div className={cn("flex items-center gap-2.5", className)}>
          <GhostIcon />
          <span className="font-bold text-lg tracking-tight text-foreground">
            ghosted<span className="text-primary font-black">.</span>
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center hover:opacity-90 transition-opacity"
      >
        {content}
      </Link>
    );
  }

  return content;
};
