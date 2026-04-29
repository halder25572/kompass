import { useMutation, useQuery } from "@tanstack/react-query";
import { checkInContributor, fetchInviteDetails, submitContribution } from "@/services/api";

export function useCheckInMutation() {
    return useMutation({
        mutationFn: (code: string) => checkInContributor(code),
        onError: (error: Error) => {
            console.error("Check-in failed:", error.message);
        },
    });
}

export function useInviteDetailsQuery(code: string | null) {
    return useQuery({
        queryKey: ["invite", code],
        queryFn: () => fetchInviteDetails(code!),
        enabled: !!code,
    });
}

export function useSubmitContributionMutation() {
    return useMutation({
        mutationFn: ({
            inviterId,
            payload,
        }: {
            inviterId: string | number;
            payload: Parameters<typeof submitContribution>[1];
        }) => submitContribution(inviterId, payload),
        onError: (error: Error) => {
            console.error("Contribution submit failed:", error.message);
        },
    });
}
