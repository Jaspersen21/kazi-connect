import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateApplicationStatus,
  type ApplicationStatus,
} from "../api/employer";

export function useUpdateApplicationStatus(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: ApplicationStatus;
    }) =>
      updateApplicationStatus(applicationId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-applications", jobId],
      });
    },
  });
}