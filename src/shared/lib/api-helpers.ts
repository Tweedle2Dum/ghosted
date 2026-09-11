import "server-only";

import { NextResponse } from "next/server";
import { getSession, type SessionUser } from "@/shared/lib/session";
import type { ApiResponse } from "@/shared/lib/types";

/**
 * Verifies the session cookie and returns the authenticated user.
 * Throws a 401 NextResponse if no valid session exists.
 *
 * Usage in API routes:
 * ```ts
 * export async function GET() {
 *   const session = await requireSession();
 *   // session.id, session.email, etc.
 * }
 * ```
 */
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw NextResponse.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }
  return session;
}

/**
 * Returns a standardized JSON success response adhering to `ApiResponse<T>`.
 */
export function jsonOk<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
    },
    { status },
  );
}

/**
 * Returns a standardized JSON paginated success response adhering to `ApiResponse<T, "paginated">`.
 */
export function jsonPaginated<T>(
  data: T[],
  total_count: number,
  message = "Success",
  status = 200,
) {
  return NextResponse.json<ApiResponse<T, "paginated">>(
    {
      success: true,
      data,
      total_count,
      message,
    },
    { status },
  );
}

/**
 * Returns a standardized JSON error response adhering to `ApiResponse<null>`.
 */
export function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      message,
    },
    { status },
  );
}
