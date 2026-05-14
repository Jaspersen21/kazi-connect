import { useMutation, useQueryClient } from "@tanstack/react-query";    
import { applyToJob } from "../api/jobs";

export function useApplyToJob(jobId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => applyToJob(jobId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-applications"] });
        }
    })

}