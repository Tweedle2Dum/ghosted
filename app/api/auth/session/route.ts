import { jsonError, jsonOk } from "@/shared/lib/api-helpers";
import { getSession } from "@/shared/lib/session";

/**
 * GET /api/auth/session
 * Returns the currently authenticated user based on the HTTP-only session cookie.
 * Returns 401 Unauthorized if no valid session cookie exists.
 */
export async function GET() {
  const user = await getSession();
  if (!user) {
    return jsonError("Unauthorized", 401);
  }
  return jsonOk(user);
}
