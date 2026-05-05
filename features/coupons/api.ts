import type { CouponsResponse } from "@/types/api";

function getAuthToken() {
    if (typeof window === "undefined") {
        return "";
    }

    return localStorage.getItem("token") || "";
}

export async function fetchActiveCoupons(authToken?: string): Promise<CouponsResponse> {
    const token = authToken || getAuthToken();

    const response = await fetch("/api/coupons/active", {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as CouponsResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load active coupons");
    }

    return result;
}
