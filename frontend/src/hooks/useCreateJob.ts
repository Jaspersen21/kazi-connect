import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../api/jobs";
import type { JobFormValues } from "../types/job";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobFormValues) => createJob(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
    },
  });
}