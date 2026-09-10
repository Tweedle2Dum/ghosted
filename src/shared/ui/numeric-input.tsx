"use client";

import type * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "./input";

interface NumericInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  onChange?: (value: string) => void;
  allowDecimals?: boolean;
  maxDecimals?: number;
}

export function NumericInput({
  className,
  allowDecimals = true,
  maxDecimals = 3,
  onChange,
  onKeyDown,
  ...props
}: NumericInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation and deletion keys
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (allowedKeys.includes(e.key)) return;

    // Allow Ctrl/Cmd combos (A, C, V, X, Z)
    if (e.ctrlKey || e.metaKey) return;

    // Allow decimal point if decimals are enabled
    if (allowDecimals && e.key === ".") {
      if (e.currentTarget.value.includes(".")) {
        e.preventDefault();
      }
      return;
    }

    // Block non-numeric characters
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }

    onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onChange?.("");
      return;
    }

    // Basic regex to allow intermediate states like "-" or "1."
    const isPartialNumber = allowDecimals
      ? new RegExp(`^-?[0-9]*\\.?[0-9]{0,${maxDecimals}}$`).test(value)
      : /^-?[0-9]*$/.test(value);

    // Use isNaN for final verification if it's a "complete" number string
    const isNumericValue =
      isPartialNumber ||
      (!isNaN(Number(value)) &&
        (value.split(".")[1]?.length || 0) <= maxDecimals);

    if (isNumericValue) {
      onChange?.(value);
    } else {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    const numValue = Number(pasteData);
    const decimalCount = pasteData.split(".")[1]?.length || 0;

    if (isNaN(numValue) || (allowDecimals && decimalCount > maxDecimals)) {
      e.preventDefault();
    }
  };

  return (
    <Input
      {...props}
      className={cn("font-mono", className)}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onPaste={handlePaste}
      inputMode={allowDecimals ? "decimal" : "numeric"}
    />
  );
}
