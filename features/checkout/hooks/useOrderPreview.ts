import { useMutation } from '@tanstack/react-query';
import { fetchOrderPreview, OrderPreviewPayload, OrderPreviewResponse } from '@/services/api';

export function useOrderPreview() {
    return useMutation<OrderPreviewResponse, Error, OrderPreviewPayload>({
        mutationFn: (payload) => fetchOrderPreview(payload),
    });
}
