import "server-only";

import { AppError, mapDbError } from "@/shared/lib/errors";
import { supabaseAdmin } from "@/shared/lib/supabase-server";
import type { DbResult } from "@/shared/lib/types";
import type { ResumeVersion } from "../models";
import { mapResumeRecord } from "./mapper";

export async function getResumes(
  userId: string,
): Promise<DbResult<ResumeVersion[]>> {
  const { data, error } = await supabaseAdmin
    .from("resume_versions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db:resume] Failed to fetch resumes:", error);
    return {
      data: null,
      error: mapDbError(error, "Failed to fetch resumes"),
    };
  }

  return {
    data: data.map(mapResumeRecord),
    error: null,
  };
}

export async function updateResume(
  resumeId: string,
  userId: string,
  updates: { notes?: string; targetRoleType?: string },
): Promise<DbResult<ResumeVersion>> {
  const { data, error } = await supabaseAdmin
    .from("resume_versions")
    .update({
      notes: updates.notes,
      target_role_type: updates.targetRoleType,
    })
    .eq("id", resumeId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) {
    console.error("[db:resume] Failed to update resume:", error);
    return {
      data: null,
      error: error
        ? mapDbError(error, "Failed to update resume")
        : new AppError("Failed to update resume"),
    };
  }

  return {
    data: mapResumeRecord(data),
    error: null,
  };
}

export async function deleteResume(
  resumeId: string,
  userId: string,
): Promise<DbResult<null>> {
  // 1. Unlink this resume from any applications so they aren't deleted/blocked
  await supabaseAdmin
    .from("applications")
    .update({ resume_version_id: null })
    .eq("resume_version_id", resumeId)
    .eq("user_id", userId);

  // 2. Fetch file path to delete from storage
  const { data: resume, error: fetchError } = await supabaseAdmin
    .from("resume_versions")
    .select("file_path")
    .eq("id", resumeId)
    .eq("user_id", userId)
    .single();

  if (fetchError || !resume) {
    console.error(
      "[db:resume] Failed to fetch resume for deletion:",
      fetchError,
    );
    return {
      data: null,
      error: fetchError
        ? mapDbError(fetchError, "Failed to find resume")
        : new AppError("Resume not found"),
    };
  }

  // 2. Delete file from Supabase storage
  if (resume.file_path) {
    const { error: storageError } = await supabaseAdmin.storage
      .from("resumes")
      .remove([resume.file_path]);

    if (storageError) {
      console.error(
        "[db:resume] Failed to delete file from storage:",
        storageError,
      );
      // Even if storage deletion fails, we continue to delete the DB record
      // to not leave the DB in a broken state for the user
    }
  }

  // 3. Delete from DB
  const { error: deleteError } = await supabaseAdmin
    .from("resume_versions")
    .delete()
    .eq("id", resumeId)
    .eq("user_id", userId);

  if (deleteError) {
    console.error("[db:resume] Failed to delete resume record:", deleteError);
    return {
      data: null,
      error: mapDbError(deleteError, "Failed to delete resume record"),
    };
  }

  return {
    data: null,
    error: null,
  };
}
