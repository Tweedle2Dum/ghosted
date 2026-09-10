import { MutationCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const createQueryClient = () => {
  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        toast.error(error.message);
      },
    }),
    defaultOptions: {
      queries: {
        retry: (count, error) => {
          return count < 3 && error.status !== undefined && error.status >= 500;
        },
        throwOnError: (error) => {
          if (error.status === 401) return false;
          return true;
        },
      },
    },
  });
};
