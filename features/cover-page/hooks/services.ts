import { useQuery } from "@tanstack/react-query";
import { fetchCoverPageStyles, CoverPageStylesResponse } from "@/services/api";

export function useCoverPageStylesQuery() {
	return useQuery<CoverPageStylesResponse, Error>({
		queryKey: ["cover-page-styles"],
		queryFn: fetchCoverPageStyles,
		retry: false,
	});
}