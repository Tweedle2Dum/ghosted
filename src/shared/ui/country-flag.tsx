import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "@/shared/lib/utils";

/**
 * Props for the `CountryFlag` component.
 */
export interface CountryFlagProps {
  /** Two-letter ISO 3166-1 alpha-2 country code (e.g., "US", "GB", "IN") */
  country: Country;
  /** Optional custom CSS classes for the flag container */
  className?: string;
}

/**
 * Renders an SVG national flag icon for a specified ISO country code.
 *
 * Sourced from `react-phone-number-input/flags`. If no flag exists for the given code, returns `null`.
 *
 * @param props - Component props containing `country` code and optional `className`.
 *
 * @example
 * ```tsx
 * <CountryFlag country="US" className="size-5" />
 * ```
 */
export function CountryFlag({ country, className }: CountryFlagProps) {
  const Flag = flags[country];

  if (!Flag) return null;

  return (
    <span
      className={cn(
        "flex h-4 w-6 overflow-hidden rounded-[2px] items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover",
        className,
      )}
    >
      <Flag title={country} />
    </span>
  );
}
