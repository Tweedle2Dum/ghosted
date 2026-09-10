"use client";

import type { UserRole } from "@/entities/user";

/** LocalStorage key for persisting the active JWT access token */
const ACCESS_TOKEN_KEY = "ghosted_access_token";

/** LocalStorage key for persisting the JWT refresh token */
const REFRESH_TOKEN_KEY = "ghosted_refresh_token";

/** LocalStorage key for persisting the active user role */
const USER_TYPE_KEY = "ghosted_user_type";

/**
 * Client-side token and authentication credential storage utility.
 *
 * Provides a centralized API for storing, reading, and clearing auth tokens
 * (`access_token`, `refresh_token`) and user role metadata in browser `localStorage`.
 *
 * All methods include an SSR safety guard (`typeof window === "undefined"`)
 * to safely execute in Next.js Server Components without throwing runtime exceptions.
 *
 * @example
 * ```ts
 * // On login:
 * tokenStorage.setAccessToken(data.access_token);
 * tokenStorage.setRefreshToken(data.refresh_token);
 * tokenStorage.setUserType(data.user.role);
 *
 * // On logout:
 * tokenStorage.clearTokens();
 * ```
 */
export const tokenStorage = {
  /**
   * Retrieves the stored JWT access token from browser `localStorage`.
   *
   * @returns The access token string if present, or `null` if not found / during SSR.
   */
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Stores the JWT access token into browser `localStorage`.
   *
   * @param token - The raw JWT access token string to persist.
   */
  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  /**
   * Retrieves the stored JWT refresh token from browser `localStorage`.
   *
   * @returns The refresh token string if present, or `null` if not found / during SSR.
   */
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Stores the JWT refresh token into browser `localStorage`.
   *
   * @param token - The raw JWT refresh token string to persist.
   */
  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Retrieves the persisted user role from browser `localStorage`.
   *
   * @returns The current `UserRole` ("admin" | "member" | "creator" | "guest") or `null`.
   */
  getUserType: (): UserRole | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_TYPE_KEY) as UserRole | null;
  },

  /**
   * Persists the active user role into browser `localStorage`.
   *
   * @param type - The user role to store.
   */
  setUserType: (type: UserRole): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_TYPE_KEY, type);
  },

  /**
   * Clears all authentication tokens and user role entries from `localStorage`.
   * Typically invoked on explicit user sign-out or when session refresh fails.
   */
  clearTokens: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
  },
};
