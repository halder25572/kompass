import { useQuery } from "@tanstack/react-query";
import { fetchTermsConditions, type TermsConditionsResponse } from "@/services/api";

export function useTermsConditionsQuery() {
  return useQuery<TermsConditionsResponse, Error>({
    queryKey: ["terms-conditions"],
    queryFn: fetchTermsConditions,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}
