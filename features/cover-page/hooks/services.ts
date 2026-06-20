import { useQuery } from "@tanstack/react-query";
import { fetchCoverPageStyles, CoverPageStylesResponse } from "@/services/api";

export function useCoverPageStylesQuery() {
    return useQuery<CoverPageStylesResponse, Error>({
        queryKey: ["coverPageStyles"],
        queryFn: fetchCoverPageStyles,
        staleTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}