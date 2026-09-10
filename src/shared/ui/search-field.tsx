"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

export function SearchField({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  return (
    <InputGroup className={cn("w-full md:max-w-56", className)}>
      <InputGroupAddon align="inline-start">
        <HugeiconsIcon
          icon={Search01Icon}
          size={18}
          className="text-muted-foreground"
        />
      </InputGroupAddon>
      <InputGroupInput {...props} />
    </InputGroup>
  );
}
