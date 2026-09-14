import type { ApplicationStatus } from "@/entities/application/models";
import { Badge } from "@/shared/ui/badge";

export const statusConfig = {
  applied: { label: "Applied", variant: "default" },
  screening: { label: "Screening", variant: "info" },
  interview: { label: "Interview", variant: "warning" },
  offer: { label: "Offer", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" },
  ghosted: { label: "Ghosted", variant: "muted" },
  withdrew: { label: "Withdrew", variant: "secondary" },
} as const;

export function ApplicationStatusBadge({
  status,
  className,
}: {
  status: ApplicationStatus;
  className?: string;
}) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
