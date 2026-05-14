import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../api/applications";

export function useApplications() {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
  });
}