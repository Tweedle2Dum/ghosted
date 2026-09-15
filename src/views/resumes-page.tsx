import type { Metadata } from "next";
import { Suspense } from "react";
import { ResumesTable } from "@/features/resume-management/resumes-table";
import { TypographyH3, TypographyInfo } from "@/shared/ui/typography";

export const metadata: Metadata = {
  title: "Resumes | Ghosted",
  description: "Manage your resume versions.",
};

export function ResumesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <TypographyH3>Resume Versions</TypographyH3>
          <TypographyInfo className="text-muted-foreground mt-0.5">
            Manage all the different versions of your uploaded resumes here.
          </TypographyInfo>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <Suspense
            fallback={
              <div className="h-32 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Loading resumes...
                </span>
              </div>
            }
          >
            <ResumesTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
