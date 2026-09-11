import type { AppError } from "./errors";
/**
 * Standard API response envelope returned by Ghosted backend endpoints.
 *
 * Utilizes conditional types based on `Mode`:
 * - `"normal"`: Returns a single data item `T`.
 * - `"paginated"`: Returns an array of items `T[]` along with a numerical `total_count` property.
 *
 * @template T - The payload data type.
 * @template Mode - Either `"normal"` (default) or `"paginated"`.
 *
 * @example
 * ```ts
 * type UserResponse = ApiResponse<User>;
 * type PaginatedUsers = ApiResponse<User, "paginated">;
 * ```
 */
export type ApiSuccessResponse<T> = {
  /** Indicates whether the request succeeded */
  success: true;
  /** Payload: single entity */
  data: T;
  /** Server-provided status message */
  message: string;
};

export type ApiPaginatedResponse<T> = {
  /** Indicates whether the request succeeded */
  success: true;
  /** Payload: array of entities */
  data: T[];
  /** Total count of records */
  total_count: number;
  /** Server-provided status message */
  message: string;
};

export type ApiErrorResponse = {
  /** Indicates whether the request succeeded */
  success: false;
  /** No payload on error */
  data: null;
  /** Error message */
  message: string;
};

export type ApiResponse<
  T,
  Mode extends "paginated" | "normal" = "normal",
> = Mode extends "paginated" ? ApiPaginatedResponse<T> : ApiSuccessResponse<T>;

/**
 * Standard query parameters for requesting paginated list endpoints.
 */
export interface PaginationParams {
  /** 1-based page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
  /** Search filter keyword */
  search?: string;
  /** Column or attribute name to sort results by */
  sortBy?: string;
  /** Sort order direction */
  order?: "asc" | "desc";
}

/**
 * Standard discriminated result shape for database operations.
 */
export type DbResult<T> =
  | { data: T; error: null }
  | { data: null; error: AppError };
