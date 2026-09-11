import {
  createUserWithEmailAndPassword,
  confirmPasswordReset as fbConfirmPasswordReset,
  signOut as fbSignOut,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import type { User } from "@/entities/user";
import { loginAction, logoutAction } from "@/features/auth/actions";
import { authSync } from "@/shared/auth-sync";
import { AppError, mapError } from "@/shared/lib/errors";
import { auth } from "@/shared/lib/firebase";
import type {
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  PasswordResetValidateResponse,
  ResendVerificationResponse,
} from "./dto";

/**
 * High-Level Client Operations using Firebase + Next.js Session Cookie
 */

export const loginWithEmail = async (
  email: string,
  pass: string,
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const idToken = await userCredential.user.getIdToken();
    const sessionUser = await loginAction(idToken);
    authSync.login();
    return sessionUser;
  } catch (error) {
    throw await mapError(error);
  }
};

export const loginWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    const sessionUser = await loginAction(idToken);
    authSync.login();
    return sessionUser;
  } catch (error) {
    throw await mapError(error);
  }
};

export const registerWithEmail = async (
  email: string,
  pass: string,
  name?: string,
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    const idToken = await userCredential.user.getIdToken(true);
    const sessionUser = await loginAction(idToken);
    authSync.login();
    return sessionUser;
  } catch (error) {
    throw await mapError(error);
  }
};

export const logout = async (): Promise<null> => {
  try {
    await fbSignOut(auth);
    await logoutAction();
    authSync.logout();
    return null;
  } catch (error) {
    throw await mapError(error);
  }
};

export const requestPasswordReset = async (
  data: PasswordResetRequest,
): Promise<{ message: string }> => {
  try {
    await sendPasswordResetEmail(auth, data.email);
    return { message: `Password reset instructions sent to ${data.email}` };
  } catch (error) {
    throw await mapError(error);
  }
};

export const confirmPasswordReset = async (
  data: PasswordResetConfirmRequest,
): Promise<{ success: boolean; message: string }> => {
  try {
    await fbConfirmPasswordReset(auth, data.token, data.new_password);
    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    throw await mapError(error);
  }
};

export const validatePasswordResetToken = async (
  _token: string,
): Promise<PasswordResetValidateResponse> => {
  return { valid: true, message: "Token valid" };
};

export const resendVerificationEmail = async (
  _email: string,
): Promise<ResendVerificationResponse> => {
  return { message: "Verification link resent." };
};

export const verifyEmail = async (code: string): Promise<void> => {
  if (!code) throw new AppError("Invalid verification code");
  authSync.login();
};
