import type { Profile } from "../types/profile";

import { getToken } from "../lib/auth";

const API_URL = import.meta.env.VITE_API_URL;

type ProfileCreatePayload = {
  full_name?: Profile["full_name"];
  phone?: Profile["phone"];
  location?: Profile["location"];
  headline?: Profile["headline"];
  summary?: Profile["summary"];
  skills?: Profile["skills"];
};


export async function getProfile(): Promise<Profile> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}

export async function createProfile(payload: ProfileCreatePayload): Promise<Profile> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const response = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create profile");
  }

  return response.json();
}

export async function updateProfile(payload: Partial<ProfileCreatePayload>): Promise<Profile> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
}

