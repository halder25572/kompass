import { useQuery } from "@tanstack/react-query";
import { fetchOccasions } from "../api";
import type { OccasionsResponse } from "@/types/api";
import { useEffect, useState } from "react";

function getAuthToken() {
	if (typeof window === "undefined") {
		return "";
	}

	return localStorage.getItem("token") || "";
}

export function useOccasionsQuery() {
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

	return useQuery<OccasionsResponse, Error>({
		queryKey: ["occasions", authToken || "anonymous"],
		enabled: !!authToken,
		queryFn: () => fetchOccasions(authToken),
		retry: false,
	});
}