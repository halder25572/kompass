import { useQuery } from "@tanstack/react-query";
import { fetchPrivacyPolicies, PrivacyPoliciesResponse } from "@/services/api";

export function usePrivacyPoliciesQuery() {
  return useQuery<PrivacyPoliciesResponse, Error>({
    queryKey: ["privacy-policies"],
    queryFn: fetchPrivacyPolicies,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
