import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  TypographyDisplay,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyInfo,
  TypographyOverline,
  TypographyP,
  TypographyTag,
} from "@/shared/ui/typography";

const TYPOGRAPHY_COMPONENTS = {
  display: TypographyDisplay,
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  h5: TypographyH5,
  h6: TypographyH6,
  p: TypographyP,
  info: TypographyInfo,
  tag: TypographyTag,
  overline: TypographyOverline,
} as const;

export type NumericDisplayVariant = keyof typeof TYPOGRAPHY_COMPONENTS;

export interface NumericDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The number to be displayed. Can be a string or a number.
   */
  value: number | string;

  /**
   * Optional variant from Typography components for the base styling.
   * If provided, the numeric display will use that typography component as its root.
   */
  variant?: NumericDisplayVariant;

  /**
   * Optional suffix to display after the number (e.g., "USD", "BTC").
   */
  suffix?: string;

  /**
   * Optional className for the decimal part.
   */
  decimalClassName?: string;

  /**
   * Optional className for the suffix part.
   */
  suffixClassName?: string;

  /**
   * Whether to force 3 decimal places even if they are zero.
   * @default false
   */
  fixedDecimals?: boolean;

  /**
   * Optional prefix to display before the number (e.g., "$").
   */
  prefix?: string;
}

/**
 * NumericDisplay component for formatting numbers with distinct styles
 * for integer and decimal parts. Rounds to at most 3 decimal points.
 * Uses Typography components for consistent styling.
 */
export const NumericDisplay = React.forwardRef<
  HTMLSpanElement,
  NumericDisplayProps
>(
  (
    {
      value,
      variant,
      suffix,
      prefix,
      className,
      decimalClassName,
      suffixClassName,
      fixedDecimals = false,
      ...props
    },
    ref,
  ) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return (
        <span ref={ref} className={cn("font-medium", className)} {...props}>
          {value}
        </span>
      );
    }

    // Format to 3 decimal places maximum
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fixedDecimals ? 3 : 0,
      maximumFractionDigits: 3,
    });

    const formattedValue = formatter.format(numValue);
    const parts = formattedValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Determine the base container component
    const Component = variant
      ? TYPOGRAPHY_COMPONENTS[variant]
      : ("span" as any);

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-baseline font-medium ring-0 border-0 p-0 m-0",
          className,
        )}
        {...props}
      >
        {prefix && <span>{prefix}</span>}
        <span>{integerPart}</span>
        {decimalPart && (
          <span
            className={cn(
              "text-[0.80em] opacity-80 leading-none",
              decimalClassName,
            )}
          >
            .{decimalPart}
          </span>
        )}
        {suffix && (
          <span
            className={cn("ml-1.5 text-[0.85em] font-normal", suffixClassName)}
          >
            {suffix}
          </span>
        )}
      </Component>
    );
  },
);

NumericDisplay.displayName = "NumericDisplay";
