import "server-only";

import type { TablesInsert } from "@/shared/lib/database.types";
import { AppError, mapDbError } from "@/shared/lib/errors";
import { supabaseAdmin } from "@/shared/lib/supabase-server";
import type { DbResult } from "@/shared/lib/types";
import type { Application } from "../models";
import { mapApplicationRecord } from "./mapper";

export type InsertApplicationParams = TablesInsert<"applications">;

/**
 * Fetches all applications for the current user.
 */
export async function getApplications(
  userId: string,
): Promise<DbResult<Application[]>> {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*, resume_versions(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db:application] Failed to fetch applications:", error);
    return {
      data: null,
      error: mapDbError(error, "Failed to fetch applications"),
    };
  }

  return {
    data: data.map(mapApplicationRecord),
    error: null,
  };
}

/**
 * Inserts a new application into the Supabase `applications` table.
 * Returns a typed `DbResult<Application>` containing `AppError` on failure.
 */
export async function insertApplication(
  params: InsertApplicationParams,
): Promise<DbResult<Application>> {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .insert(params)
    .select("*, resume_versions(name)")
    .single()
    .then(
      (res) => res,
      (err: unknown) => ({ data: null, error: err as any }),
    );

  if (error || !data) {
    console.error("[db:application] Failed to insert application:", error);
    return {
      data: null,
      error: error
        ? mapDbError(error, "Failed to create application record")
        : new AppError("Failed to create application record"),
    };
  }

  return {
    data: mapApplicationRecord(data),
    error: null,
  };
}
