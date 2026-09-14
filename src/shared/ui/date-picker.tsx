import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function DatePicker({
  date,
  onSelect,
}: {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "h-11 w-full min-w-0 border border-transparent rounded-[var(--radius)] bg-muted/50 px-3 py-3 text-base transition-colors justify-start text-left font-normal hover:bg-muted/70 outline-none focus-visible:border-input focus-visible:bg-background focus-visible:ring-[3px] focus-visible:ring-primary/10",
            !date && "text-placeholder",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
}
