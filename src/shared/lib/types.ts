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
export type ApiResponse<T, Mode extends "paginated" | "normal" = "normal"> = {
  /** Indicates whether the request succeeded */
  success: boolean;
  /** Payload payload: array if paginated, single entity if normal */
  data: Mode extends "paginated" ? T[] : T;
  /** Server-provided status or error message */
  message: string;
} & (Mode extends "paginated"
  ? { total_count: number }
  : Record<string, never>);

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
