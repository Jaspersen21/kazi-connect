import { useMutation } from "@tanstack/react-query";    
import { applyToJob } from "../api/jobs";

export function useApplyToJob(jobId: string | undefined) {
    return useMutation({
        mutationFn: () => applyToJob(jobId!),
    })

}