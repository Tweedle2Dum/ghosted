"use client";

import { Kanban, LayoutList, Plus } from "lucide-react";
import { useState } from "react";
import { ApplicationsKanban } from "@/features/application-management/applications-kanban";
import { ApplicationsTable } from "@/features/application-management/applications-table";
import type { Application } from "@/features/application-management/types";
import { Button } from "@/shared/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

// ============================================================================
// MOCK DATA
// ============================================================================
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    company: "Acme Corp",
    roleTitle: "Senior Frontend Engineer",
    source: "LinkedIn",
    resumeVersionName: "Frontend Lead v2",
    dateApplied: "2026-09-01",
    currentStatus: "interview",
    priority: 1,
    daysInStatus: 3,
    lastUpdateDate: "2026-09-09",
  },
  {
    id: "2",
    company: "Vercel",
    roleTitle: "Staff Software Engineer",
    source: "Referral",
    resumeVersionName: "Fullstack Staff",
    dateApplied: "2026-09-05",
    currentStatus: "screening",
    priority: 2,
    daysInStatus: 2,
    lastUpdateDate: "2026-09-10",
  },
  {
    id: "3",
    company: "Supabase",
    roleTitle: "Frontend Engineer",
    source: "Company Website",
    resumeVersionName: "Frontend Lead v2",
    dateApplied: "2026-08-25",
    currentStatus: "rejected",
    priority: 0,
    daysInStatus: 12,
    lastUpdateDate: "2026-08-30",
  },
  {
    id: "4",
    company: "Stripe",
    roleTitle: "UI Engineer",
    source: "Y Combinator",
    resumeVersionName: "Frontend UI Specialist",
    dateApplied: "2026-09-08",
    currentStatus: "applied",
    priority: 1,
    daysInStatus: 4,
    lastUpdateDate: "2026-09-08",
  },
  {
    id: "5",
    company: "Linear",
    roleTitle: "Product Engineer",
    source: "Twitter",
    resumeVersionName: "Fullstack Staff",
    dateApplied: "2026-09-02",
    currentStatus: "offer",
    priority: 3,
    daysInStatus: 1,
    lastUpdateDate: "2026-09-11",
  },
];

export function DashboardPage() {
  const [view, setView] = useState<"table" | "kanban">("table");
  const pendingCount = MOCK_APPLICATIONS.filter(
    (a) => a.currentStatus === "applied",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Applications
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            You have{" "}
            <span className="text-foreground font-medium">
              {pendingCount} pending review
            </span>{" "}
            items requiring action.
          </p>
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
              className="h-7 px-2"
            >
              <LayoutList className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="kanban"
              size="sm"
              aria-label="Kanban View"
              className="h-7 px-2"
            >
              <Kanban className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button size="sm">
            <Plus className="size-3.5 mr-1.5" />
            Add application
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {view === "table" ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <ApplicationsTable data={MOCK_APPLICATIONS} />
          </div>
        ) : (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <ApplicationsKanban data={MOCK_APPLICATIONS} />
          </div>
        )}
      </div>
    </div>
  );
}
