"use client";

import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/input-group";

interface PasswordFieldProps
  extends React.ComponentProps<typeof InputGroupInput> {
  rootClassName?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ rootClassName, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
      <InputGroup className={cn("relative", rootClassName)}>
        <InputGroupInput
          {...props}
          ref={ref}
          type={isVisible ? "text" : "password"}
          className={cn("pr-10", className)}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="hover:bg-transparent"
          >
            <HugeiconsIcon
              icon={isVisible ? ViewOffSlashIcon : ViewIcon}
              size={18}
              className="text-muted-foreground transition-colors hover:text-foreground"
            />
          </InputGroupButton>
        </div>
      </InputGroup>
    );
  },
);

PasswordField.displayName = "PasswordField";

export { PasswordField };
