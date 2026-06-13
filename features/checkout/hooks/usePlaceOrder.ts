import { useMutation } from '@tanstack/react-query';
import { placeOrder, PlaceOrderPayload, PlaceOrderResponse } from '@/services/api';

export function usePlaceOrder() {
    return useMutation<PlaceOrderResponse, Error, PlaceOrderPayload>({
        mutationFn: (payload) => placeOrder(payload),
    });
}
