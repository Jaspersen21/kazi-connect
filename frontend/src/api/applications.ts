import { getToken } from "../lib/auth";
import type { ApplicationsResponse } from "../types/application";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMyApplications() : Promise<ApplicationsResponse> {
    const token = getToken();

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(`${API_URL}/applications/me`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch applications");
    }

    return response.json();
}