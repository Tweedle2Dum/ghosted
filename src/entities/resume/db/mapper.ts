import type { Tables } from "@/shared/lib/database.types";
import type { ResumeVersion } from "../models";

type ResumeRow = Tables<"resume_versions">;

export function mapResumeRecord(data: ResumeRow): ResumeVersion {
  return {
    id: data.id,
    name: data.name,
    filePath: data.file_path || "",
    targetRoleType: data.target_role_type || undefined,
    notes: data.notes || undefined,
    createdAt: data.created_at || new Date().toISOString(),
  };
}
