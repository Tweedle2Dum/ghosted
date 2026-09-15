import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { ResumeVersion } from "@/entities/resume/models";
import { api } from "@/shared/api";

export const resumeKeys = {
  all: ["resumes"] as const,
  lists: () => [...resumeKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...resumeKeys.lists(), { ...filters }] as const,
};

export function useResumes() {
  return useSuspenseQuery({
    queryKey: resumeKeys.lists(),
    queryFn: async () => {
      const res = await api.get<ResumeVersion[]>("resumes");
      return res.data;
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resumeId: string) => {
      await api.delete(`resumes/${resumeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      // We might also want to invalidate applications since we could have unlinked them
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resumeId,
      notes,
      targetRoleType,
    }: {
      resumeId: string;
      notes?: string;
      targetRoleType?: string;
    }) => {
      const res = await api.patch<ResumeVersion>(`resumes/${resumeId}`, {
        json: { notes, targetRoleType },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
  });
}
