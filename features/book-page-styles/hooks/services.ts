import { useQuery } from "@tanstack/react-query";
import { fetchBookPageStyles, BookPageStylesResponse } from "@/services/api";

export function useBookPageStylesQuery() {
	return useQuery<BookPageStylesResponse, Error>({
		queryKey: ["book-page-styles"],
		queryFn: fetchBookPageStyles,
		retry: false,
	});
}