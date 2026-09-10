import { HTTPError } from "ky";

/**
 * Custom application error class representing normalized errors across the app.
 *
 * Designed to be the standard error representation for TanStack Query mutations/queries,
 * HTTP API client requests, and UI error handling components (such as toasts and banners).
 *
 * @example
 * ```ts
 * throw new AppError("Resource not found", { status: 404, code: "NOT_FOUND" });
 * ```
 */
export class AppError extends Error {
  /**
   * Application-specific error code (e.g., "UNAUTHORIZED", "VALIDATION_FAILED").
   */
  code?: string;

  /**
   * HTTP status code associated with the error (e.g., 400, 401, 404, 500), if applicable.
   */
  status?: number;

  /**
   * Creates a new instance of `AppError`.
   *
   * @param message - Human-readable error description.
   * @param options - Additional metadata including application error code and HTTP status.
   * @param options.code - Specific machine-readable error code string.
   * @param options.status - Numerical HTTP status code.
   *
   * @example
   * ```ts
   * const error = new AppError("Invalid credentials", { status: 401, code: "AUTH_FAILED" });
   * console.log(error.name); // "AppError"
   * console.log(error.status); // 401
   * ```
   */
  constructor(message: string, options?: { code?: string; status?: number }) {
    super(message);
    this.name = "AppError";
    this.code = options?.code;
    this.status = options?.status;
  }
}

/**
 * Maps an arbitrary unknown error into a normalized, predictable `AppError` instance.
 *
 * Error Resolution Strategy:
 * 1. **`AppError`**: Passed through directly to preserve original status and code.
 * 2. **Ky `HTTPError`**: Attempts to parse the response body as JSON to extract a server-provided
 *    `msg` or `message` property. If parsing fails, falls back to a status code string.
 * 3. **Standard `Error`**: Wrapped into an `AppError` preserving the original `message`.
 * 4. **Unknown / Primitives**: Converted into a generic "Something went wrong" `AppError`.
 *
 * @param error - The caught error of unknown type (from a try/catch block or promise rejection).
 * @returns A Promise resolving to an `AppError` instance with appropriate message and status.
 *
 * @example
 * ```ts
 * try {
 *   await api.get("/users/me");
 * } catch (err) {
 *   const appError = await mapError(err);
 *   toast.error(appError.message);
 * }
 * ```
 */
export async function mapError(error: unknown): Promise<AppError> {
  if (error instanceof AppError) {
    return error;
  }

  // Ky HTTP errors
  if (error instanceof HTTPError) {
    try {
      const body = await error.response.json();
      return new AppError(body?.msg || body?.message || "Request failed", {
        status: error.response.status,
      });
    } catch {
      return new AppError(`Request failed (${error.response.status})`, {
        status: error.response.status,
      });
    }
  }

  // Normal JS errors
  if (error instanceof Error) {
    return new AppError(error.message);
  }

  // Unknown error
  return new AppError("Something went wrong");
}
