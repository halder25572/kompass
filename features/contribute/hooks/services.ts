import { useMutation, useQuery } from "@tanstack/react-query";
import { joinInviteByCode, fetchInviteDetails, submitContribution } from "@/services/api";
import type { SubmitContributionPayload, SubmitContributionResponse } from "@/types/api";

type SubmitContributionVariables = {
    inviterId: string | number;
    payload: SubmitContributionPayload;
};

type CheckInVariables = {
    code: string;
    name: string;
    email: string;
};

export function useCheckInMutation() {
    return useMutation({
        mutationFn: ({ code, name, email }: CheckInVariables) => joinInviteByCode(code, name, email),
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
    return useMutation<SubmitContributionResponse, Error, SubmitContributionVariables>({
        mutationFn: ({ inviterId, payload }) => submitContribution(inviterId, payload),
        onError: (error: Error) => {
            console.error("Contribution submit failed:", error.message);
        },
    });
}
