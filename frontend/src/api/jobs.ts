import type { JobsResponse, Job } from "../types/job";

const API_URL = import.meta.env.VITE_API_URL;

type GetJobsParams = {
  search?: string;
  sort?: string;
  order?: string;
}

export async function getJobs( params: GetJobsParams ): Promise<JobsResponse> {

  const searchParams = new URLSearchParams();

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params?.order) {
    searchParams.set("order", params.order);
  }

  const queryString = searchParams.toString();


  const response = await fetch(`${API_URL}/jobs${queryString ? `?${queryString}` : ""}`);

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

export async function applyToJob( jobId: string): Promise<void> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      
    }
  });

  if (!response.ok) {
    throw new Error("Failed to apply to job");
  }
}