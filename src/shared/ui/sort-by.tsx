"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export interface SortOption {
  label?: string;
  field: string;
  direction: "asc" | "desc";
}

export interface SortByProps {
  label?: string;
  options: SortOption[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  className?: string;
  triggerClassName?: string;
}

/**
 * A reusable Sort By component with an accessible label and dropdown.
 */
export function SortBy({
  label = "Sort by:",
  options,
  value,
  onValueChange,
  className,
  triggerClassName,
}: SortByProps) {
  const id = React.useId();

  const getSortValue = (option: SortOption) =>
    `${option.field}:${option.direction}`;

  const getSortLabel = (option: SortOption) => {
    if (option.label) return option.label;
    const directionStr =
      option.direction === "asc" ? "Low to High" : "High to Low";
    // Format field name (e.g., "created_at" -> "Created at")
    const formattedField = option.field
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
    return `${formattedField}: ${directionStr}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 max-w-fit",
        className,
      )}
    >
      <Label
        htmlFor={id}
        className="text-sm font-normal text-foreground whitespace-nowrap"
      >
        {label}
      </Label>
      <Select value={value ?? undefined} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className={cn(
            "w-full md:max-w-56 h-11 text-sm shadow-none",
            triggerClassName,
          )}
        >
          <SelectValue placeholder="Select sort..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const sortValue = getSortValue(option);
            return (
              <SelectItem key={sortValue} value={sortValue}>
                {getSortLabel(option)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
