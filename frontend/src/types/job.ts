export type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  created_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type JobsResponse = {
  total: number;
  page: number;
  limit: number;
  data: Job[];
};

export type JobFormValues = {
  title: string;
  company: string;
  description: string;
};