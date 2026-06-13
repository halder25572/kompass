import { useMutation } from '@tanstack/react-query';
import { verifyStripeSession, VerifyStripeSessionPayload, VerifyStripeSessionResponse } from '@/services/api';

export function useVerifyStripeSession() {
    return useMutation<VerifyStripeSessionResponse, Error, VerifyStripeSessionPayload>({
        mutationFn: (payload) => verifyStripeSession(payload),
    });
}
