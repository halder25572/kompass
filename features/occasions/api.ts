import type { OccasionsResponse } from "@/types/api";

function getAuthToken() {
    if (typeof window === "undefined") {
        return "";
    }

    return localStorage.getItem("token") || "";
}

export async function fetchOccasions(authToken?: string): Promise<OccasionsResponse> {
    const token = authToken || getAuthToken();

    const response = await fetch("/api/user/occasions", {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as OccasionsResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load occasions");
    }

    return result;
}