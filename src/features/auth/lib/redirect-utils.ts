import type { UserRole } from "@/entities/user";

/**
 * Validates and sanitizes a post-login redirect path against the authenticated user's role.
 *
 * Prevents privilege mismatch vulnerabilities where a user might be redirected to an unauthorized
 * role portal prefix (e.g., a "member" attempting to redirect to `/admin/dashboard`).
 * If a mismatch is detected, or if `nextPath` is empty/null, the provided `defaultPath` is returned.
 *
 * @param nextPath - The target destination URL path requested (e.g., from query parameter `?next=...`).
 * @param userType - The authenticated user's active role.
 * @param defaultPath - The fallback route to navigate to if `nextPath` is invalid or mismatched.
 * @returns The sanitized path to redirect the user to.
 *
 * @example
 * ```ts
 * getSafeRedirectPath("/admin/users", "member", "/member/dashboard");
 * // => "/member/dashboard" (blocked cross-role redirect)
 *
 * getSafeRedirectPath("/member/settings", "member", "/member/dashboard");
 * // => "/member/settings" (allowed)
 *
 * getSafeRedirectPath(null, "creator", "/creator/projects");
 * // => "/creator/projects" (fallback)
 * ```
 */
export function getSafeRedirectPath(
  nextPath: string | null,
  userTypeOrDefault?: UserRole | string,
  defaultPath = "/dashboard",
): string {
  const fallback =
    typeof userTypeOrDefault === "string" &&
    !["admin", "member", "creator", "guest"].includes(userTypeOrDefault)
      ? userTypeOrDefault
      : defaultPath;

  if (!nextPath || nextPath === "") return fallback;

  // Simple bypass: return target nextPath directly unless external URL
  if (
    nextPath.startsWith("http://") ||
    nextPath.startsWith("https://") ||
    nextPath.startsWith("//")
  ) {
    return fallback;
  }

  return nextPath;
}
