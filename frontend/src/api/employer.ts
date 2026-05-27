import { getToken } from "../lib/auth";
import type { JobsResponse } from "../types/job";
import type { JobApplication } from "../types/application";

const API_URL = import.meta.env.VITE_API_URL;

export async function getEmployerJobs(): Promise<JobsResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/jobs/employer/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employer jobs");
  }

  return response.json();
}

export async function getJobApplications(jobId: string): Promise<JobApplication[]> {
    const token = getToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job applications");
    }

    return response.json();
}