import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../api/jobs";

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation ({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
    }

  })
}