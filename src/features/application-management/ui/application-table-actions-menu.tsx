"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
  APPLICATION_STATUSES,
  type Application,
} from "@/entities/application/models";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useUpdateApplicationStatus } from "../hooks";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

export function ApplicationTableActionsMenu({
  application,
}: {
  application: Application;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateStatus = useUpdateApplicationStatus();

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
            Update status
          </DropdownMenuItem>
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit application</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {APPLICATION_STATUSES.map((s) => (
              <Button
                key={s}
                variant="outline"
                className="capitalize justify-start h-auto py-2"
                onClick={() => {
                  updateStatus.mutate(
                    { applicationId: application.id, status: s },
                    {
                      onSuccess: () => setDialogOpen(false),
                    },
                  );
                }}
                disabled={updateStatus.isPending}
              >
                <ApplicationStatusBadge status={s} />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
