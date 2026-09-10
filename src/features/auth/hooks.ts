"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User, UserRole } from "@/entities/user";
import { authSync } from "@/shared/auth-sync";
import { tokenStorage } from "@/shared/lib/tokens";
import {
  logout as apiLogout,
  confirmPasswordReset,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  requestPasswordReset,
  resendVerificationEmail,
  validatePasswordResetToken,
  verifyEmail,
} from "./api";
import type {
  AuthMutationOptions,
  ConfirmPasswordResetMutationOptions,
  ConfirmPasswordResetVariables,
  LoginWithEmailVariables,
  RegisterWithEmailVariables,
  RequestPasswordResetMutationOptions,
  RequestPasswordResetVariables,
  ResendVerificationMutationOptions,
  ResendVerificationVariables,
  ValidateResetTokenMutationOptions,
  VerifyEmailMutationOptions,
  VerifyEmailVariables,
} from "./types";

/**
 * Hook to manage the authentication session.
 * Syncs with tokenStorage and authSync.
 */
export const useSession = () => {
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      authSync.login();
    } else {
      authSync.logout();
    }
  }, []);

  return useQuery<User | null>({
    queryKey: ["session"],
    queryFn: async () => {
      const token = tokenStorage.getAccessToken();
      if (!token) return null;

      const userType = tokenStorage.getUserType() || "admin";
      return {
        id: "usr_ghost_01",
        shortId: "gh-01",
        name: "Alex Vance",
        email: "alex@ghosted.dev",
        role: userType,
        profile: {
          bio: "Lead System Architect & Core Maintainer",
          location: "San Francisco, CA",
          isOnboarded: true,
        },
      };
    },
    staleTime: Infinity,
  });
};

/**
 * Hook for logging in with email and password.
 */
export const useLoginWithEmail = (
  options?: AuthMutationOptions<LoginWithEmailVariables>,
) => {
  return useMutation({
    mutationFn: ({ email, pass, userType }: LoginWithEmailVariables) =>
      loginWithEmail(email, pass, userType),
    ...options,
  });
};

/**
 * Hook for logging in with Google.
 */
export const useLoginWithGoogle = (
  options?: AuthMutationOptions<{
    userType?: UserRole;
  }>,
) => {
  return useMutation({
    mutationFn: (vars?: { userType?: UserRole }) =>
      loginWithGoogle(vars?.userType),
    ...options,
  });
};

/**
 * Hook for registering with email and password.
 */
export const useRegisterWithEmail = (
  options?: AuthMutationOptions<RegisterWithEmailVariables>,
) => {
  return useMutation({
    mutationFn: ({ name, email, pass, userType }: RegisterWithEmailVariables) =>
      registerWithEmail(email, pass, userType, name),
    ...options,
  });
};

/**
 * Hook for logging out.
 */
export const useLogout = (
  options?: AuthMutationOptions<{ role?: UserRole } | undefined>,
) => {
  return useMutation({
    mutationFn: (vars: { role?: UserRole } | undefined) =>
      apiLogout(vars?.role),
    ...options,
  });
};

/**
 * Hook for validating password reset token.
 */
export const useValidatePasswordResetToken = (
  options?: ValidateResetTokenMutationOptions,
) => {
  return useMutation({
    mutationFn: (token: string) => validatePasswordResetToken(token),
    ...options,
  });
};

/**
 * Hook for resending verification email.
 */
export const useResendVerificationEmail = (
  options?: ResendVerificationMutationOptions,
) => {
  return useMutation({
    mutationFn: ({ email }: ResendVerificationVariables) =>
      resendVerificationEmail(email),
    ...options,
  });
};

/**
 * Hook for requesting a password reset.
 */
export const useRequestPasswordReset = (
  options?: RequestPasswordResetMutationOptions,
) => {
  return useMutation({
    mutationFn: (vars: RequestPasswordResetVariables) =>
      requestPasswordReset(vars),
    ...options,
  });
};

/**
 * Hook for confirming a password reset.
 */
export const useConfirmPasswordReset = (
  options?: ConfirmPasswordResetMutationOptions,
) => {
  return useMutation({
    mutationFn: (vars: ConfirmPasswordResetVariables) =>
      confirmPasswordReset(vars),
    ...options,
  });
};

/**
 * Hook for verifying email with an action code.
 */
export const useVerifyEmail = (options?: VerifyEmailMutationOptions) => {
  return useMutation({
    mutationFn: ({ code, role }: VerifyEmailVariables) =>
      verifyEmail(code, role),
    ...options,
  });
};
