import type { ApplicationStatus } from "@/entities/application/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { ApplicationStatusBadge, statusConfig } from "./ApplicationStatusBadge";

export function StatusSelect({
  value,
  onValueChange,
  placeholder = "Select a status",
}: {
  value?: ApplicationStatus;
  onValueChange: (value: ApplicationStatus) => void;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(statusConfig) as ApplicationStatus[]).map((status) => (
          <SelectItem key={status} value={status}>
            <ApplicationStatusBadge status={status} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
