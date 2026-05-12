import type { JobsResponse, Job } from "../types/job";

const API_URL = import.meta.env.VITE_API_URL;

export async function getJobs(): Promise<JobsResponse> {
  const response = await fetch(`${API_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}

export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
}