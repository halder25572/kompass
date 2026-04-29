import { useQuery } from "@tanstack/react-query";
import { fetchOccasions, OccasionsResponse } from "@/services/api";

export function useOccasionsQuery() {
	return useQuery<OccasionsResponse, Error>({
		queryKey: ["occasions"],
		queryFn: fetchOccasions,
		retry: false,
	});
}