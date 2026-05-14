export type Application = {
  application_id: string;
  title: string;
  company: string;
  status: string;
};

export type ApplicationsResponse = {
  total: number;
  page: number;
  limit: number;
  data: Application[];
};