"use client";

import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useRef, useSyncExternalStore } from "react";
import { authSync } from "@/shared/auth-sync";
import { SplashLoader } from "@/widgets/loaders";
import { Redirect } from "./redirect";
import type { AuthContextValue, AuthProviderProps } from "./types";

const INITIAL_AUTH_STATE = {
  isInitialized: false,
  isAuthenticated: false,
};

const PRIVATE_AUTH_GROUPS = ["/dashboard", "/projects", "/analytics", "/admin"];

function getAuthLostReason(
  isAuthenticated: boolean,
  hasEverAuthenticated: boolean,
) {
  if (isAuthenticated) return null;
  if (!hasEverAuthenticated) return "never-authed";
  return "session-expired";
}

const AuthContext = createContext<AuthContextValue>(undefined as never);

export const AuthProvider = ({
  children,
  useSession,
  useLoginWithEmail,
  useLoginWithGoogle,
  useRegisterWithEmail,
  useLogout,
  useValidatePasswordResetToken,
  useResendVerificationEmail,
  useRequestPasswordReset,
  useConfirmPasswordReset,
  useVerifyEmail,
  getSearchParams,
  usePathname,
  useNavigate,
}: AuthProviderProps) => {
  const sessionQuery = useSession();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const syncState = useSyncExternalStore(
    authSync.subscribe,
    authSync.getSnapshot,
    () => INITIAL_AUTH_STATE,
  );

  const isInitialized = syncState.isInitialized || !sessionQuery.isLoading;
  const isAuthenticated =
    syncState.isAuthenticated || Boolean(sessionQuery.data);
  const router = useNavigate();

  const isPrivateRoute = PRIVATE_AUTH_GROUPS.some((group) =>
    pathname.startsWith(group),
  );

  const hasEverAuthenticated = useRef(false);
  if (isAuthenticated && !hasEverAuthenticated.current) {
    hasEverAuthenticated.current = true;
  }

  if (isInitialized && isPrivateRoute && !isAuthenticated) {
    const reason = getAuthLostReason(
      isAuthenticated,
      hasEverAuthenticated.current,
    );

    const searchParams = getSearchParams();
    const search = searchParams.toString();
    const query = search ? `?${search}` : "";

    const nextPath = encodeURIComponent(`${pathname}${query}`);
    const redirectUrl =
      reason === "session-expired"
        ? `/login?next=${nextPath}&reason=session-expired`
        : `/login?next=${nextPath}`;

    return (
      <Redirect
        to={redirectUrl}
        router={router}
        onBeforeRedirect={() => {
          queryClient.clear();
        }}
      />
    );
  }

  if (!isInitialized && isPrivateRoute) {
    return <SplashLoader data-testid="auth-loader" />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: !isInitialized,
        user: sessionQuery.data ?? null,
        useLoginWithEmail,
        useLoginWithGoogle,
        useRegisterWithEmail,
        useLogout,
        useValidatePasswordResetToken,
        useResendVerificationEmail,
        useRequestPasswordReset,
        useConfirmPasswordReset,
        useVerifyEmail,
        getSearchParams,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used inside AuthProvider");
  return context;
};

AuthContext.displayName = "AuthContext";
