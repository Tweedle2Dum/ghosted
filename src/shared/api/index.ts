import type { Options } from "ky";
import ky from "ky";
import { authSync } from "@/shared/auth-sync";
import { env } from "@/shared/env";
import { mapError } from "@/shared/lib/errors";
import { tokenStorage } from "@/shared/lib/tokens";
import type { ApiResponse } from "@/shared/lib/types";

type RequestOptions = Options;

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const apiClient = ky.create({
  prefixUrl:
    typeof window !== "undefined" ? "/api" : `${env.NEXT_PUBLIC_APP_URL}/api`,
  credentials: "include",
  retry: {
    limit: 1,
  },
  timeout: 30000,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === "undefined") return;
        const token = tokenStorage.getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (typeof window === "undefined") return;
        if (response.status === 401) {
          const refreshToken = tokenStorage.getRefreshToken();
          if (!refreshToken) {
            tokenStorage.clearTokens();
            authSync.logout();
            return;
          }

          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = (async () => {
              try {
                const refreshResponse = await ky
                  .post(`${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
                    json: { refresh_token: refreshToken },
                  })
                  .json<{
                    data: { access_token: string; refresh_token: string };
                  }>();

                const { access_token, refresh_token } = refreshResponse.data;
                tokenStorage.setAccessToken(access_token);
                tokenStorage.setRefreshToken(refresh_token);
              } catch (error) {
                tokenStorage.clearTokens();
                authSync.logout();
                throw error;
              } finally {
                isRefreshing = false;
                refreshPromise = null;
              }
            })();
          }

          await refreshPromise;

          const newToken = tokenStorage.getAccessToken();
          if (newToken) {
            request.headers.set("Authorization", `Bearer ${newToken}`);
            return ky(request);
          }
        }
      },
    ],
  },
});

/**
 * Internal helper to perform API requests with automatic error normalization.
 *
 * Catches raw HTTP errors, passes them through `mapError` to produce `AppError` instances,
 * and handles empty paginated array normalization if the server returns `data: null`.
 */
async function performRequest<
  T,
  Mode extends "paginated" | "normal" = "normal",
>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  options?: RequestOptions,
): Promise<ApiResponse<T, Mode>> {
  try {
    const res = await apiClient[method](url, options).json<
      ApiResponse<T, Mode>
    >();
    if (res && "total_count" in res && res.data === null) {
      res.data = [] as any;
    }
    return res;
  } catch (error) {
    throw await mapError(error);
  }
}

/**
 * Centralized HTTP API client for Ghosted.
 *
 * Built on top of Ky with built-in:
 * - Bearer authorization header injection from `tokenStorage`
 * - Automatic 401 token refresh lifecycle with concurrent request queuing
 * - Unified `AppError` mapping for all request failures
 * - Type-safe response envelopes (`ApiResponse<T, "normal" | "paginated">`)
 *
 * @example
 * ```ts
 * // Normal entity request
 * const response = await api.get<UserProfile>("/users/me");
 * console.log(response.data.name);
 *
 * // Paginated list request
 * const page = await api.get<Project, "paginated">("/projects", {
 *   searchParams: { page: 1, limit: 10 }
 * });
 * console.log(page.data, page.total_count);
 * ```
 */
export const api = {
  /**
   * Performs an HTTP GET request.
   *
   * @template T - The entity data type.
   * @template Mode - Response mode: `"normal"` for a single entity or `"paginated"` for a list with total_count.
   * @param url - Relative URL path (prefixed by API base URL).
   * @param options - Additional Ky request options (searchParams, headers, cache, etc.).
   * @returns A Promise resolving to the typed `ApiResponse`.
   */
  get<T, Mode extends "paginated" | "normal" = "normal">(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T, Mode>> {
    return performRequest<T, Mode>("get", url, options);
  },

  /**
   * Performs an HTTP POST request.
   *
   * @template T - The entity data type.
   * @template Mode - Response mode: `"normal"` (default) or `"paginated"`.
   * @param url - Relative URL path (prefixed by API base URL).
   * @param options - Additional Ky request options (e.g. `{ json: payload }`).
   * @returns A Promise resolving to the typed `ApiResponse`.
   */
  post<T, Mode extends "paginated" | "normal" = "normal">(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T, Mode>> {
    return performRequest<T, Mode>("post", url, options);
  },

  /**
   * Performs an HTTP PUT request.
   *
   * @template T - The entity data type.
   * @template Mode - Response mode: `"normal"` (default) or `"paginated"`.
   * @param url - Relative URL path.
   * @param options - Additional Ky request options (e.g. `{ json: payload }`).
   * @returns A Promise resolving to the typed `ApiResponse`.
   */
  put<T, Mode extends "paginated" | "normal" = "normal">(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T, Mode>> {
    return performRequest<T, Mode>("put", url, options);
  },

  /**
   * Performs an HTTP PATCH request.
   *
   * @template T - The entity data type.
   * @template Mode - Response mode: `"normal"` (default) or `"paginated"`.
   * @param url - Relative URL path.
   * @param options - Additional Ky request options (e.g. `{ json: payload }`).
   * @returns A Promise resolving to the typed `ApiResponse`.
   */
  patch<T, Mode extends "paginated" | "normal" = "normal">(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T, Mode>> {
    return performRequest<T, Mode>("patch", url, options);
  },

  /**
   * Performs an HTTP DELETE request.
   *
   * @template T - The entity data type.
   * @template Mode - Response mode: `"normal"` (default) or `"paginated"`.
   * @param url - Relative URL path.
   * @param options - Additional Ky request options.
   * @returns A Promise resolving to the typed `ApiResponse`.
   */
  delete<T, Mode extends "paginated" | "normal" = "normal">(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T, Mode>> {
    return performRequest<T, Mode>("delete", url, options);
  },
};
