import { joinInviteByCode, fetchInviteDetails, submitContribution } from "@/services/api";
import type { SubmitContributionPayload, SubmitContributionResponse } from "@/types/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";



type CheckInVariables = {
    code: string;
    name: string;
    email: string;
};

export function useCheckInMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ code, name, email }: CheckInVariables) => joinInviteByCode(code, name, email),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["invite", variables.code] });
        },
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

type SubmitContributionVariables = {
    inviterId: string | number;
    code: string;
    bookId?: string;
    payload: SubmitContributionPayload | FormData;
};

export function useSubmitContributionMutation() {
    const queryClient = useQueryClient();
    return useMutation<SubmitContributionResponse, Error, SubmitContributionVariables>({
        mutationFn: ({ inviterId, payload }) =>
            payload instanceof FormData
                ? submitContribution(inviterId, payload)
                : submitContribution(inviterId, payload),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["invite", variables.code] });
            if (variables.bookId) {
                queryClient.invalidateQueries({ queryKey: ["contributions", variables.bookId] });
                queryClient.invalidateQueries({ queryKey: ["book", variables.bookId] });
            }
        },
        onError: (error: Error) => {
            console.error("Contribution submit failed:", error.message);
        },
    });
}
