"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthErrorHandler,
  AuthProvider,
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
} from "@/features/auth";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { createQueryClient } from "@/shared/react-query";
import { TooltipProvider } from "@/shared/ui/tooltip";

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthErrorHandler />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider
          getSearchParams={() =>
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search)
              : new URLSearchParams()
          }
          useSession={useSession}
          useLoginWithEmail={useLoginWithEmail}
          useLoginWithGoogle={useLoginWithGoogle}
          useRegisterWithEmail={useRegisterWithEmail}
          useVerifyEmail={useVerifyEmail}
          useLogout={useLogout}
          useValidatePasswordResetToken={useValidatePasswordResetToken}
          useResendVerificationEmail={useResendVerificationEmail}
          useRequestPasswordReset={useRequestPasswordReset}
          useConfirmPasswordReset={useConfirmPasswordReset}
          useNavigate={useRouter}
          usePathname={usePathname}
        >
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
