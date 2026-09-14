import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { Application } from "@/entities/application/models";
import { api } from "@/shared/api";
import { createApplication } from "./actions";

export function useApplications() {
  return useSuspenseQuery({
    queryKey: ["applications"],
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
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
