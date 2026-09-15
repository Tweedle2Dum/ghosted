import { Badge } from "@/shared/ui/badge";

export const priorityConfig = {
  5: { label: "5 (Highest)", variant: "destructive" },
  4: { label: "4 (High)", variant: "warning" },
  3: { label: "3 (Medium)", variant: "info" },
  2: { label: "2 (Low)", variant: "secondary" },
  1: { label: "1 (Lowest)", variant: "muted" },
  0: { label: "0 (None)", variant: "outline" },
} as const;

export type PriorityLevel = keyof typeof priorityConfig;

export function PriorityBadge({
  priority,
  className,
}: {
  priority: PriorityLevel;
  className?: string;
}) {
  const config = priorityConfig[priority];
  if (!config) return null;

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
