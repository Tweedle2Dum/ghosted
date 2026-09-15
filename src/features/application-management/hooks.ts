import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { Application } from "@/entities/application/models";
import { api } from "@/shared/api";
import { createApplication, updateApplicationStatusAction } from "./actions";

export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...applicationKeys.lists(), { ...filters }] as const,
  details: () => [...applicationKeys.all, "detail"] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
};

export function useApplications() {
  return useSuspenseQuery({
    queryKey: applicationKeys.lists(),
    queryFn: async () => {
      const res = await api.get<Application[]>("applications");
      return res.data;
    },
  });
}

export function useAddApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      // Invalidate queries that fetch applications data so the UI updates
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationStatusAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    },
  });
}
