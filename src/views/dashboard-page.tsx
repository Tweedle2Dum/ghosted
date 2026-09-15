"use client";

import { Columns3, LayoutList } from "lucide-react";
import { useState } from "react";
import { ApplicationsKanban } from "@/features/application-management/applications-kanban";
import { ApplicationsTable } from "@/features/application-management/applications-table";
import { CreateApplicationWizard } from "@/features/application-management/create-application-wizard";
import { useApplications } from "@/features/application-management/hooks";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { TypographyH3, TypographyInfo } from "@/shared/ui/typography";

export function DashboardPage() {
  const [view, setView] = useState<"table" | "kanban">("table");
  const { data: applications } = useApplications();

  const pendingCount = applications.filter(
    (a) => a.currentStatus === "applied",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <TypographyH3>Applications</TypographyH3>
          <TypographyInfo className="text-muted-foreground mt-0.5">
            You have{" "}
            <span className="text-foreground font-medium">
              {pendingCount} pending review
            </span>{" "}
            items requiring action.
          </TypographyInfo>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(val) => val && setView(val as "table" | "kanban")}
            className="border rounded-md p-0.5 bg-muted/20"
          >
            <ToggleGroupItem
              value="table"
              size="sm"
              aria-label="Table View"
              className="px-2"
            >
              <LayoutList className="size-4 mr-1.5" />
              Table
            </ToggleGroupItem>
            <ToggleGroupItem
              value="kanban"
              size="sm"
              aria-label="Kanban View"
              className="px-2"
            >
              <Columns3 className="size-4 mr-1.5" />
              Kanban
            </ToggleGroupItem>
          </ToggleGroup>
          <CreateApplicationWizard />
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {view === "table" ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <ApplicationsTable data={applications} />
          </div>
        ) : (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <ApplicationsKanban data={applications} />
          </div>
        )}
      </div>
    </div>
  );
}
