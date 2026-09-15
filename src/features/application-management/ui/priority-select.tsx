import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { PriorityBadge, type PriorityLevel } from "./priority-badge";

export function PrioritySelect({
  value,
  onValueChange,
  placeholder = "Select priority",
}: {
  value?: number;
  onValueChange: (value: number) => void;
  placeholder?: string;
}) {
  return (
    <Select
      value={value?.toString() ?? ""}
      onValueChange={(val) => onValueChange(parseInt(val, 10))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {([5, 4, 3, 2, 1, 0] as PriorityLevel[]).map((priority) => (
          <SelectItem key={priority} value={priority.toString()}>
            <PriorityBadge priority={priority} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
