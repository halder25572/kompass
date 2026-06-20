import { useQuery } from '@tanstack/react-query';
import { fetchDeliveryTypes } from '@/services/api';

// export function useDeliveryTypes(countryCode: string) {
//     return useQuery({
//         queryKey: ['deliveryTypes', countryCode],
//         queryFn: () => fetchDeliveryTypes(countryCode),
//         enabled: !!countryCode,
//     });
// }


export function useDeliveryTypes(countryCode: string) {
    return useQuery({
        queryKey: ['deliveryTypes', countryCode],
        queryFn: () => fetchDeliveryTypes(countryCode),
        enabled: !!countryCode,
        staleTime: 1000 * 60 * 60, // 1 hour, optional
    });
}
