import type { UserRole } from "@/entities/user";

export interface LoginRequest {
  email: string;
  password?: string;
  id_token?: string;
  user_type?: UserRole;
}

export interface LoginResponse {
  user_id: string;
  name: string;
  email: string;
  access_token: string;
  refresh_token: string;
  new_user?: boolean;
  role: UserRole;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  user_type?: UserRole;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

export interface LogoutRequest {
  refresh_token?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}

export interface PasswordResetValidateResponse {
  valid: boolean;
  message?: string;
  email?: string;
}

export interface ResendVerificationResponse {
  message: string;
}
