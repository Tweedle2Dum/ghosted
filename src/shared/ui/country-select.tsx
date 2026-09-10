"use client";

import { ArrowDown01Icon as ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { getCountries } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { CountryFlag } from "@/shared/ui/country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ScrollArea } from "@/shared/ui/scroll-area";

/**
 * Props for the `CountrySelect` component.
 */
export interface CountrySelectProps {
  /** The currently selected country name or code */
  value?: string;
  /** Callback fired when a country is selected, receiving the country name */
  onChange?: (country: string) => void;
  /** Whether the select dropdown is disabled */
  disabled?: boolean;
  /** Optional custom CSS classes for the trigger button */
  className?: string;
}

/**
 * Searchable country picker popover component.
 *
 * Provides searchable list of all global countries with SVG national flag badges,
 * sorted alphabetically by English display name.
 *
 * @example
 * ```tsx
 * const [country, setCountry] = useState("United States");
 * <CountrySelect value={country} onChange={setCountry} />
 * ```
 */
export function CountrySelect({
  value,
  onChange,
  disabled,
  className,
}: CountrySelectProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const countries = React.useMemo(() => {
    return getCountries()
      .map((country) => ({
        value: country,
        label: en[country],
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const selectedCountry = countries.find(
    (c) => c.label === value || c.value === value,
  );

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex w-full items-center justify-between gap-2 border border-input bg-background rounded-xl px-3 h-11 text-sm font-normal shadow-none hover:bg-accent/50",
            className,
          )}
          disabled={disabled}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <CountryFlag country={selectedCountry.value} />
              <span className="text-foreground">{selectedCountry.label}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select a country</span>
          )}
          <HugeiconsIcon
            icon={ChevronDown}
            className={cn(
              "size-4 opacity-50 shrink-0",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 overflow-hidden" align="start">
        <Command className="p-0">
          <CommandInput
            value={searchValue}
            onValueChange={(val) => {
              setSearchValue(val);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]",
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty className="py-6">No country found.</CommandEmpty>
              <CommandGroup className="p-0">
                {countries.map(({ value: countryValue, label }) => (
                  <CommandItem
                    key={countryValue}
                    className="flex items-center gap-3 px-3 py-2"
                    onSelect={() => {
                      onChange?.(label); // Emitting label (Country Name) instead of code
                      setIsOpen(false);
                    }}
                  >
                    <CountryFlag country={countryValue} className="shrink-0" />
                    <span className="flex-1 truncate text-sm">{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
