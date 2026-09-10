"use client";

export { AuthErrorHandler } from "./auth-error-handler";
export { AuthProvider, useAuth } from "./auth-provider";
export {
  useConfirmPasswordReset,
  useLoginWithEmail,
  useLoginWithGoogle,
  useLogout,
  useRegisterWithEmail,
  useRequestPasswordReset,
  useResendVerificationEmail,
  useSession,
  useValidatePasswordResetToken,
  useVerifyEmail,
} from "./hooks";
export { LoginForm } from "./login-form";
export { Redirect } from "./redirect";
export { ResetPasswordConfirmForm } from "./reset-password-confirm-form";
export { ResetPasswordRequestForm } from "./reset-password-request-form";
export { RoleGate } from "./role-gate";
export { SignupForm } from "./signup-form";
export type {
  AuthContextValue,
  AuthMutationOptions,
  AuthMutationResult,
  AuthProviderProps,
  ConfirmPasswordResetMutationOptions,
  ConfirmPasswordResetMutationResult,
  ConfirmPasswordResetVariables,
  LoginWithEmailVariables,
  RegisterWithEmailVariables,
  RequestPasswordResetMutationOptions,
  RequestPasswordResetMutationResult,
  RequestPasswordResetVariables,
  ResendVerificationMutationOptions,
  ResendVerificationMutationResult,
  ResendVerificationVariables,
  ValidateResetTokenMutationOptions,
  ValidateResetTokenMutationResult,
  VerifyEmailMutationOptions,
  VerifyEmailMutationResult,
  VerifyEmailVariables,
} from "./types";
export {
  type ConfirmPasswordResetFormData,
  confirmPasswordResetSchema,
  type LoginFormData,
  loginSchema,
  type RegisterFormData,
  type RequestPasswordResetFormData,
  registerSchema,
  requestPasswordResetSchema,
} from "./validators";
