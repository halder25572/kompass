import { useQuery } from "@tanstack/react-query";
import { fetchFaqs, type FaqsResponse } from "@/services/api";

export function useFaqsQuery() {
  return useQuery<FaqsResponse, Error>({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}
