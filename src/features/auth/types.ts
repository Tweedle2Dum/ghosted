import type {
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import type { User, UserRole } from "@/entities/user";
import type { AppError } from "@/shared/lib/errors";
import type {
  PasswordResetValidateResponse,
  ResendVerificationResponse,
} from "./api/dto";

export interface LoginWithEmailVariables {
  email: string;
  pass: string;
  userType?: UserRole;
}

export interface RegisterWithEmailVariables {
  name?: string;
  email: string;
  pass: string;
  userType?: UserRole;
}

export type AuthMutationResult<TVariables = void> = UseMutationResult<
  User | undefined | null,
  AppError,
  TVariables,
  unknown
>;

export type AuthMutationOptions<TVariables = void> = UseMutationOptions<
  User | undefined | null,
  AppError,
  TVariables,
  unknown
>;

export interface ResendVerificationVariables {
  email: string;
}

export interface RequestPasswordResetVariables {
  email: string;
}

export interface ConfirmPasswordResetVariables {
  token: string;
  new_password: string;
}

export type ValidateResetTokenMutationResult = UseMutationResult<
  PasswordResetValidateResponse,
  AppError,
  string,
  unknown
>;

export type ValidateResetTokenMutationOptions = UseMutationOptions<
  PasswordResetValidateResponse,
  AppError,
  string,
  unknown
>;

export type RequestPasswordResetMutationResult = UseMutationResult<
  { message: string },
  AppError,
  RequestPasswordResetVariables,
  unknown
>;

export type RequestPasswordResetMutationOptions = UseMutationOptions<
  { message: string },
  AppError,
  RequestPasswordResetVariables,
  unknown
>;

export type ConfirmPasswordResetMutationResult = UseMutationResult<
  { success: boolean; message: string },
  AppError,
  ConfirmPasswordResetVariables,
  unknown
>;

export type ConfirmPasswordResetMutationOptions = UseMutationOptions<
  { success: boolean; message: string },
  AppError,
  ConfirmPasswordResetVariables,
  unknown
>;

export type ResendVerificationMutationResult = UseMutationResult<
  ResendVerificationResponse,
  AppError,
  ResendVerificationVariables,
  unknown
>;

export type ResendVerificationMutationOptions = UseMutationOptions<
  ResendVerificationResponse,
  AppError,
  ResendVerificationVariables,
  unknown
>;

export interface VerifyEmailVariables {
  code: string;
  role?: UserRole;
}

export type VerifyEmailMutationResult = UseMutationResult<
  void,
  AppError,
  VerifyEmailVariables,
  unknown
>;

export type VerifyEmailMutationOptions = UseMutationOptions<
  void,
  AppError,
  VerifyEmailVariables,
  unknown
>;

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  useLoginWithEmail: (
    options?: AuthMutationOptions<LoginWithEmailVariables>,
  ) => AuthMutationResult<LoginWithEmailVariables>;
  useLoginWithGoogle: (
    options?: AuthMutationOptions<{
      userType?: UserRole;
    }>,
  ) => AuthMutationResult<{ userType?: UserRole }>;
  useRegisterWithEmail: (
    options?: AuthMutationOptions<RegisterWithEmailVariables>,
  ) => AuthMutationResult<RegisterWithEmailVariables>;
  useLogout: (
    options?: AuthMutationOptions<{ role?: UserRole } | undefined>,
  ) => AuthMutationResult<{ role?: UserRole } | undefined>;
  useValidatePasswordResetToken: (
    options?: ValidateResetTokenMutationOptions,
  ) => ValidateResetTokenMutationResult;
  useResendVerificationEmail: (
    options?: ResendVerificationMutationOptions,
  ) => ResendVerificationMutationResult;
  useRequestPasswordReset: (
    options?: RequestPasswordResetMutationOptions,
  ) => RequestPasswordResetMutationResult;
  useConfirmPasswordReset: (
    options?: ConfirmPasswordResetMutationOptions,
  ) => ConfirmPasswordResetMutationResult;
  useVerifyEmail: (
    options?: VerifyEmailMutationOptions,
  ) => VerifyEmailMutationResult;
  getSearchParams: () => URLSearchParams;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  useSession: () => UseQueryResult<User | null, AppError>;
  useLoginWithEmail: (
    options?: AuthMutationOptions<LoginWithEmailVariables>,
  ) => AuthMutationResult<LoginWithEmailVariables>;
  useLoginWithGoogle: (
    options?: AuthMutationOptions<{
      userType?: UserRole;
    }>,
  ) => AuthMutationResult<{ userType?: UserRole }>;
  useRegisterWithEmail: (
    options?: AuthMutationOptions<RegisterWithEmailVariables>,
  ) => AuthMutationResult<RegisterWithEmailVariables>;
  useLogout: (
    options?: AuthMutationOptions<{ role?: UserRole } | undefined>,
  ) => AuthMutationResult<{ role?: UserRole } | undefined>;
  useValidatePasswordResetToken: (
    options?: ValidateResetTokenMutationOptions,
  ) => ValidateResetTokenMutationResult;
  useResendVerificationEmail: (
    options?: ResendVerificationMutationOptions,
  ) => ResendVerificationMutationResult;
  useRequestPasswordReset: (
    options?: RequestPasswordResetMutationOptions,
  ) => RequestPasswordResetMutationResult;
  useConfirmPasswordReset: (
    options?: ConfirmPasswordResetMutationOptions,
  ) => ConfirmPasswordResetMutationResult;
  useVerifyEmail: (
    options?: VerifyEmailMutationOptions,
  ) => VerifyEmailMutationResult;
  getSearchParams: () => URLSearchParams;
  usePathname: () => string;
  useNavigate: () => {
    replace: (path: string) => void;
    push: (path: string) => void;
  };
  redirectTo?: string | ((searchParams: URLSearchParams) => string);
}
