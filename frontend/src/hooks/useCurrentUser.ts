import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";
import { getToken } from "../lib/auth";

export function useCurrentUser() {
    const token = getToken();

    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        enabled: Boolean(token),
    });
}