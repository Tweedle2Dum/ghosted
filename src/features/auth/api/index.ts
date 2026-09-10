import type { User, UserRole } from "@/entities/user";
import { api } from "@/shared/api";
import { authSync } from "@/shared/auth-sync";
import { AppError, mapError } from "@/shared/lib/errors";
import { tokenStorage } from "@/shared/lib/tokens";
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  PasswordResetValidateResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ResendVerificationResponse,
} from "./dto";

/**
 * Backend API Calls
 */

export const loginToBackend = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("v1/auth/login", {
      json: data,
    });
    return response.data;
  } catch (error) {
    // Development fallback if endpoint is not connected
    if (process.env.NODE_ENV === "development") {
      return {
        user_id: "usr_mock_01",
        name: data.email.split("@")[0] || "Ghost User",
        email: data.email,
        access_token: `mock_access_token_${Date.now()}`,
        refresh_token: `mock_refresh_token_${Date.now()}`,
        role: data.user_type || "admin",
      };
    }
    throw await mapError(error);
  }
};

export const registerToBackend = async (
  data: RegisterRequest,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("v1/auth/register", {
      json: data,
    });
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return {
        user_id: "usr_mock_02",
        name: data.name,
        email: data.email,
        access_token: `mock_access_token_${Date.now()}`,
        refresh_token: `mock_refresh_token_${Date.now()}`,
        role: data.user_type || "admin",
      };
    }
    throw await mapError(error);
  }
};

export const logoutFromBackend = async (
  role: UserRole,
  data: LogoutRequest,
): Promise<void> => {
  try {
    await api.post(`v1/auth/logout/${role}`, { json: data });
  } catch {
    // Ignore error on logout teardown
  }
};

export const refreshTokenOnBackend = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>("v1/auth/refresh", {
    json: data,
  });
  return response.data;
};

export const requestPasswordReset = async (
  data: PasswordResetRequest,
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      "v1/auth/password-reset/request",
      { json: data },
    );
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return { message: `Password reset instructions sent to ${data.email}` };
    }
    throw await mapError(error);
  }
};

export const confirmPasswordReset = async (
  data: PasswordResetConfirmRequest,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post<{ success: boolean; message: string }>(
      "v1/auth/password-reset/confirm",
      { json: data },
    );
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return { success: true, message: "Password updated successfully." };
    }
    throw await mapError(error);
  }
};

export const validatePasswordResetToken = async (
  token: string,
): Promise<PasswordResetValidateResponse> => {
  try {
    const response = await api.get<PasswordResetValidateResponse>(
      `v1/auth/password-reset/validate/${token}`,
    );
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return { valid: true, message: "Token valid" };
    }
    throw await mapError(error);
  }
};

export const resendVerificationEmail = async (
  email: string,
): Promise<ResendVerificationResponse> => {
  try {
    const response = await api.post<ResendVerificationResponse>(
      `v1/auth/resend-verification?email=${encodeURIComponent(email)}`,
    );
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return { message: "Verification link resent." };
    }
    throw await mapError(error);
  }
};

/**
 * High-Level Client Operations
 */

export const loginWithEmail = async (
  email: string,
  pass: string,
  userType: UserRole = "admin",
): Promise<User> => {
  try {
    const session = await loginToBackend({
      email,
      password: pass,
      user_type: userType,
    });

    tokenStorage.setAccessToken(session.access_token);
    tokenStorage.setRefreshToken(session.refresh_token);
    tokenStorage.setUserType(userType);

    authSync.login();

    return {
      id: session.user_id,
      name: session.name,
      email: session.email,
      role: session.role,
    };
  } catch (error) {
    throw await mapError(error);
  }
};

export const loginWithGoogle = async (
  userType: UserRole = "admin",
): Promise<User> => {
  try {
    const session = await loginToBackend({
      email: "google.user@ghosted.dev",
      id_token: "mock_google_id_token",
      user_type: userType,
    });

    tokenStorage.setAccessToken(session.access_token);
    tokenStorage.setRefreshToken(session.refresh_token);
    tokenStorage.setUserType(userType);

    authSync.login();

    return {
      id: session.user_id,
      name: session.name,
      email: session.email,
      role: session.role,
    };
  } catch (error) {
    throw await mapError(error);
  }
};

export const registerWithEmail = async (
  email: string,
  pass: string,
  userType: UserRole = "admin",
  name?: string,
): Promise<User> => {
  try {
    const session = await registerToBackend({
      name: name || email.split("@")[0],
      email,
      password: pass,
      user_type: userType,
    });

    tokenStorage.setAccessToken(session.access_token);
    tokenStorage.setRefreshToken(session.refresh_token);
    tokenStorage.setUserType(userType);

    authSync.login();

    return {
      id: session.user_id,
      name: session.name,
      email: session.email,
      role: session.role,
    };
  } catch (error) {
    throw await mapError(error);
  }
};

export const logout = async (role?: UserRole): Promise<null> => {
  try {
    const refreshToken = tokenStorage.getRefreshToken();
    const userType = role || tokenStorage.getUserType() || "admin";

    if (refreshToken) {
      await logoutFromBackend(userType, { refresh_token: refreshToken });
    }

    tokenStorage.clearTokens();
    authSync.logout();

    return null;
  } catch (error) {
    throw await mapError(error);
  }
};

export const verifyEmail = async (
  code: string,
  userType: UserRole = "admin",
): Promise<void> => {
  if (!code) throw new AppError("Invalid verification code");
  tokenStorage.setUserType(userType);
  authSync.login();
};
