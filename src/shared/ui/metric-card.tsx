"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/shared/lib/utils";
import { TypographyInfo, TypographyTag } from "@/shared/ui/typography";

export interface MetricTrend {
  value: number;
  percentage: number;
  direction: "up" | "down" | "neutral";
}

export interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  valueSuffix?: React.ReactNode;
  description?: React.ReactNode;
  trend?: MetricTrend;
  prefix?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  valueSuffix,
  description,
  trend,
  prefix = "",
  className,
}: MetricCardProps) {
  const isUp = trend?.direction === "up";
  const isDown = trend?.direction === "down";
  const isNeutral = trend?.direction === "neutral";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 ring-1 ring-foreground/10 bg-muted/20 min-h-28 h-full rounded-xl",
        className,
      )}
    >
      <TypographyInfo className="text-sm font-normal text-foreground/70">
        {title}
      </TypographyInfo>
      <div className="flex flex-col mt-auto">
        <span className="text-3xl font-medium text-foreground leading-none mt-1">
          {prefix}
          {value}
          {valueSuffix && (
            <TypographyInfo
              asChild
              className="ml-1.5 font-normal opacity-100 text-[0.8em]"
            >
              <span>{valueSuffix}</span>
            </TypographyInfo>
          )}
        </span>
        {description && (
          <TypographyTag className="mt-2 text-foreground/50 leading-none">
            {description}
          </TypographyTag>
        )}
      </div>

      {trend && trend.percentage !== 0 && (
        <div className="mt-1">
          {isNeutral ? (
            <TypographyInfo className="text-xs font-normal">
              {trend.value.toLocaleString()} ({trend.percentage.toFixed(1)}%)
            </TypographyInfo>
          ) : (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-normal",
                isUp && "text-primary",
                isDown && "text-destructive",
              )}
            >
              <HugeiconsIcon
                icon={isUp ? ArrowUpIcon : ArrowDownIcon}
                size={12}
                strokeWidth={2}
              />
              {Math.abs(trend.value).toLocaleString()} (
              {Math.abs(trend.percentage).toFixed(1)}%)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
