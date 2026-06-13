import { useMutation } from '@tanstack/react-query';
import { createStripeSession, CreateStripeSessionPayload, CreateStripeSessionResponse } from '@/services/api';

export function useStripeSession() {
    return useMutation<CreateStripeSessionResponse, Error, CreateStripeSessionPayload>({
        mutationFn: (payload) => createStripeSession(payload),
    });
}
