/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useOrderPreview } from '@/features/checkout/hooks/useOrderPreview';
import { useState, useEffect } from 'react';

interface CheckoutSummaryProps {
  bookId?: number;
  deliveryTypeId?: number;
  countryCode?: string;
}

export function CheckoutSummary({ 
  bookId = 123, 
  deliveryTypeId = 2, 
  countryCode = 'BD' 
}: CheckoutSummaryProps) {
  const { mutate, data, isPending, error } = useOrderPreview();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      handlePreview();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handlePreview = () => {
    mutate({
      book_id: bookId,
      delivery_type_id: deliveryTypeId,
      country_code: countryCode,
    });
  };

  const orderData = data?.data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

      {isPending && !orderData && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-500">Calculating order total...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-800 text-sm">{error.message}</p>
          <button
            onClick={handlePreview}
            className="mt-2 text-red-600 font-medium text-sm hover:text-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {orderData && (
        <>
          <div className="space-y-3 mb-6">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-gray-700">
              <span className="text-sm">Subtotal</span>
              <span className="font-medium">
                {orderData.currency} {orderData.subtotal?.toFixed(2) || '0.00'}
              </span>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between items-center text-gray-700">
              <span className="text-sm">Delivery Fee</span>
              <span className="font-medium">
                {orderData.currency} {orderData.delivery_fee?.toFixed(2) || '0.00'}
              </span>
            </div>

            {/* VAT */}
            {orderData.vat_amount > 0 && (
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-sm">VAT (Tax)</span>
                <span className="font-medium">
                  {orderData.currency} {orderData.vat_amount?.toFixed(2) || '0.00'}
                </span>
              </div>
            )}

            {/* Discount */}
            {orderData.discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">Discount</span>
                <span className="font-medium">
                  -{orderData.currency} {orderData.discount?.toFixed(2) || '0.00'}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-lg text-blue-600">
                {orderData.currency} {orderData.total_amount?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handlePreview}
            disabled={isPending}
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Refresh Totals'}
          </button>
        </>
      )}
    </div>
  );
}
