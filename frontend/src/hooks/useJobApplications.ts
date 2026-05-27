import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "../api/employer";

export function useJobApplications(jobId: string) {
  return useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: () => getJobApplications(jobId),
    enabled: !!jobId,
  });
}