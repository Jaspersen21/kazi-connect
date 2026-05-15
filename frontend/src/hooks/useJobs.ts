import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobs";

type UseJobsParams = {
  search: string;
  sort?: string;
  order?: string;
}

export function useJobs(params: UseJobsParams){
    return useQuery({
        queryKey: ['jobs', params],
        queryFn: () => getJobs(params),
    })
}