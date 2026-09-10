"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { AppError } from "@/shared/lib/errors";

export function AuthErrorHandler() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const unsubQuery = queryClient.getQueryCache().subscribe((event) => {
      const error = event.query.state.error as AppError | null;
      if (!error) return;
      if (error.status === 401) {
        queryClient.clear();
        router.push("/login");
      }
    });

    const unsubMutation = queryClient.getMutationCache().subscribe((event) => {
      const error = event.mutation?.state.error as AppError | null;
      if (!error) return;
      if (error.status === 401) {
        queryClient.clear();
        router.push("/login");
      }
    });

    return () => {
      unsubQuery();
      unsubMutation();
    };
  }, [queryClient, router]);

  return null;
}
