import "server-only";

import type { Json } from "@/shared/lib/database.types";
import { AppError, mapDbError } from "@/shared/lib/errors";
import { supabaseAdmin } from "@/shared/lib/supabase-server";
import type { DbResult } from "@/shared/lib/types";
import type { User } from "../models";

export interface UpsertUserParams {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  phone?: string | null;
  preferences?: Json | null;
}

/**
 * Upserts a user in the Supabase `users` table.
 * Returns a typed `DbResult<User>` containing `AppError` on failure.
 */
export async function upsertUser(
  params: UpsertUserParams,
): Promise<DbResult<User>> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .upsert(
      {
        id: params.id,
        email: params.email,
        name: params.name ?? null,
        avatar: params.avatar ?? null,
        phone: params.phone ?? null,
        ...(params.preferences !== undefined
          ? { preferences: params.preferences }
          : {}),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )
    .select()
    .single()
    .then(
      (res) => res,
      (err: unknown) => ({ data: null, error: err as any }),
    );

  if (error || !data) {
    console.error("[db:user] Failed to upsert user:", error);
    return {
      data: null,
      error: mapDbError(error, "Failed to upsert user record"),
    };
  }

  return {
    data: {
      id: data.id,
      email: data.email,
      name: data.name || "",
      avatar: data.avatar || undefined,
      phone: data.phone || undefined,
      createdAt: data.created_at
        ? new Date(data.created_at).getTime()
        : undefined,
    },
    error: null,
  };
}

/**
 * Fetches a user record by unique ID.
 * Returns a typed `DbResult<User>` containing `AppError` on failure or when not found.
 */
export async function getUserById(id: string): Promise<DbResult<User>> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle()
    .then(
      (res) => res,
      (err: unknown) => ({ data: null, error: err as any }),
    );

  if (error || !data) {
    return {
      data: null,
      error: error
        ? mapDbError(error, "Failed to fetch user")
        : new AppError("User not found", {
            code: "USER_NOT_FOUND",
            status: 404,
          }),
    };
  }

  return {
    data: {
      id: data.id,
      email: data.email,
      name: data.name || "",
      avatar: data.avatar || undefined,
      phone: data.phone || undefined,
      createdAt: data.created_at
        ? new Date(data.created_at).getTime()
        : undefined,
    },
    error: null,
  };
}
