export const APPLICATION_STATUSES = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "ghosted",
  "withdrew",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface Application {
  id: string;
  company: string;
  roleTitle: string;
  jobUrl?: string;
  source: string;
  resumeVersionId?: string;
  resumeVersionName?: string;
  dateApplied: string;
  currentStatus: ApplicationStatus;
  priority: number;
  salaryRange?: string;
  notes?: string;
  daysInStatus: number;
  lastUpdateDate: string;
}
