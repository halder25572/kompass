import { useQuery } from "@tanstack/react-query";
import { fetchLegalInformation, LegalInformationResponse } from "@/services/api";

export function useLegalInformationQuery() {
	return useQuery<LegalInformationResponse, Error>({
		queryKey: ["legal-information"],
		queryFn: fetchLegalInformation,
		retry: false,
		staleTime: 1000 * 60 * 10, // 10 minutes
	});
}
