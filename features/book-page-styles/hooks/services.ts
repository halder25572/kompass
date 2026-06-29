import { useQuery } from "@tanstack/react-query";
import { fetchBookPageStyles, BookPageStylesResponse } from "@/services/api";

export function useBookPageStylesQuery() {
    return useQuery<BookPageStylesResponse, Error>({
        queryKey: ["bookPageStyles"],
        queryFn: fetchBookPageStyles,
        staleTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}