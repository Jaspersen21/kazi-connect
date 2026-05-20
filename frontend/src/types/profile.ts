export type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  location: string | null;
  headline: string | null;
  summary: string | null;
  skills: string[];
  created_at: string; // ISO
  updated_at: string; // ISO
};

