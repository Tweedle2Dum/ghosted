import { differenceInDays } from "date-fns";
import type { Tables } from "@/shared/lib/database.types";
import type { Application, ApplicationStatus } from "../models";

type ApplicationRow = Tables<"applications"> & {
  resume_versions?: { name: string } | null;
};

export function mapApplicationRecord(data: ApplicationRow): Application {
  const resumeName = data.resume_versions?.name;

  return {
    id: data.id,
    company: data.company,
    roleTitle: data.role_title,
    jobUrl: data.job_url || undefined,
    source: data.source || "",
    resumeVersionId: data.resume_version_id || undefined,
    resumeVersionName: resumeName || undefined,
    dateApplied: data.date_applied || new Date().toISOString(),
    currentStatus: data.current_status as ApplicationStatus,
    priority: data.priority ?? 0,
    salaryRange: data.salary_range || undefined,
    notes: data.notes || undefined,
    daysInStatus: Math.max(
      0,
      differenceInDays(
        new Date(),
        new Date(data.updated_at || data.date_applied || Date.now()),
      ),
    ),
    lastUpdateDate:
      data.updated_at || data.date_applied || new Date().toISOString(),
  };
}
