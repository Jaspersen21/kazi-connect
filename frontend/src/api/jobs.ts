import type { Job, JobsResponse } from '../types/job'


export async function getJobs(): Promise<Job[]> {
  const response = await fetch('http://127.0.0.1:8000/jobs/')

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  const data: JobsResponse = await response.json()

  return data.data
}