import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfile, createProfile, updateProfile } from "../api/profile";


export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

