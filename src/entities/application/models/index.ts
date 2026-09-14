export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "ghosted"
  | "withdrew";

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
