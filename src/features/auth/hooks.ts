"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/entities/user";
import { api } from "@/shared/api";
import { authSync } from "@/shared/auth-sync";
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
 * Hook to manage the authentication session based on the server HTTP-only cookie.
 * Queries /api/auth/session using the centralized `api` client.
 */
export const useSession = () => {
  return useQuery<User | null>({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const response = await api.get<User>("auth/session", {
          cache: "no-store",
          retry: 0,
        });
        const user = response.data;
        if (user) {
          authSync.login();
        } else {
          authSync.logout();
        }
        return user;
      } catch (error: any) {
        authSync.logout();
        if (error?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

/**
 * Hook for logging in with email and password.
 */
export const useLoginWithEmail = (
  options?: AuthMutationOptions<LoginWithEmailVariables>,
) => {
  const { onSuccess, ...rest } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, pass }: LoginWithEmailVariables) =>
      loginWithEmail(email, pass),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData(["session"], data);
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};

/**
 * Hook for logging in with Google.
 */
export const useLoginWithGoogle = (options?: AuthMutationOptions<void>) => {
  const { onSuccess, ...rest } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => loginWithGoogle(),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData(["session"], data);
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};

/**
 * Hook for registering with email and password.
 */
export const useRegisterWithEmail = (
  options?: AuthMutationOptions<RegisterWithEmailVariables>,
) => {
  const { onSuccess, ...rest } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, email, pass }: RegisterWithEmailVariables) =>
      registerWithEmail(email, pass, name),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData(["session"], data);
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};

/**
 * Hook for logging out.
 */
export const useLogout = (options?: AuthMutationOptions<void>) => {
  const { onSuccess, ...rest } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData(["session"], null);
      queryClient.clear();
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
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
    mutationFn: ({ code }: VerifyEmailVariables) => verifyEmail(code),
    ...options,
  });
};
