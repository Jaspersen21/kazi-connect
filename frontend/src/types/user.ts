export type UserRole = "seeker" | "employer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};