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
    onMutate: async ({ applicationId, status }) => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });

      const previousApplications = queryClient.getQueryData<Application[]>(
        applicationKeys.lists(),
      );

      if (previousApplications) {
        queryClient.setQueryData<Application[]>(
          applicationKeys.lists(),
          (old) =>
            old?.map((app) =>
              app.id === applicationId
                ? { ...app, currentStatus: status, daysInStatus: 0 }
                : app,
            ) ?? [],
        );
      }

      return { previousApplications };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(
          applicationKeys.lists(),
          context.previousApplications,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    },
  });
}
