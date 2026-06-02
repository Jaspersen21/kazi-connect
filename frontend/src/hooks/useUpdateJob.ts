import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../api/jobs";
import type { JobFormValues } from "../types/job";

export function useUpdateJob(jobId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobFormValues) => {
      if (!jobId) {
        throw new Error("Job ID is required");
      }

      return updateJob(jobId, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
    },
  });
}