export type Job = {
  id: string
  title: string
  description: string
  company: string
  created_by: string
  is_active: boolean
  created_at: string
  updated_at: string
  employer_verified?: boolean
}


export type JobsResponse = {
  total: number
  page: number
  limit: number
  data: Job[]
}