import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCoverPageStyles, CoverPageStylesResponse } from "@/services/api";
import { useEffect, useState } from "react";

function getAuthToken() {
	if (typeof window === "undefined") {
		return "";
	}

	return localStorage.getItem("authToken") || localStorage.getItem("token") || localStorage.getItem("accessToken") || "";
}

export function useCoverPageStylesQuery() {
	const queryClient = useQueryClient();
	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		const syncToken = () => setAuthToken(getAuthToken());

		syncToken();
		window.addEventListener("auth-token-updated", syncToken);
		window.addEventListener("storage", syncToken);

		return () => {
			window.removeEventListener("auth-token-updated", syncToken);
			window.removeEventListener("storage", syncToken);
		};
	}, []);

	// Refetch data when token changes or on data-updated event
	useEffect(() => {
		const handleDataUpdated = () => {
			queryClient.invalidateQueries({ queryKey: ["cover-page-styles"] });
		};

		window.addEventListener("data-updated", handleDataUpdated);
		return () => window.removeEventListener("data-updated", handleDataUpdated);
	}, [queryClient]);

	return useQuery<CoverPageStylesResponse, Error>({
		queryKey: ["cover-page-styles", authToken || "anonymous"],
		queryFn: fetchCoverPageStyles,
		retry: 1, // Retry once on failure, then show fallback
		staleTime: 1000 * 60, // Consider data fresh for 1 minute
		refetchOnMount: true, // Fetch when component mounts
		refetchOnWindowFocus: false, // Don't refetch on focus to avoid loops
		refetchInterval: false, // Don't continuously refetch
		gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
	});
}