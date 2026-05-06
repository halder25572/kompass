import { useQuery } from '@tanstack/react-query';
import { fetchDeliveryTypes } from '@/services/api';

export function useDeliveryTypes(countryCode: string) {
    return useQuery({
        queryKey: ['deliveryTypes', countryCode],
        queryFn: () => fetchDeliveryTypes(countryCode),
        enabled: !!countryCode,
    });
}
