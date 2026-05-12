import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../api/jobs";

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id!),
    enabled: Boolean(id),
  });
}