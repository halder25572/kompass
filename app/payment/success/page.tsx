'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyStripeSession } from '@/services/api';
import Link from 'next/link';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [paymentData, setPaymentData] = useState<any>(null);

    useEffect(() => {
        if (!sessionId) {
            setStatus('error');
            return;
        }

        const verifyPayment = async () => {
            try {
                const response = await verifyStripeSession({ session_id: sessionId });
                if (response.success) {
                    setPaymentData(response.data);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Payment verification failed:", error);
                setStatus('error');
            }
        };

        verifyPayment();
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center p-4">
            {/* Modal Container */}
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-scaleIn relative">
                
                {status === 'loading' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-[#BF003A] rounded-full animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Verifying Payment...</h2>
                        <p className="text-gray-500 text-sm">Please wait while we confirm your payment.</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Payment Verification Failed</h2>
                        <p className="text-gray-500 text-sm mb-6">We couldn't verify your payment. Please contact support or try again.</p>
                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full py-3 rounded-xl bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 transition-colors"
                        >
                            Return to Checkout
                        </button>
                    </div>
                )}

                {status === 'success' && paymentData && (
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Payment Successful!</h2>
                            <p className="text-gray-500 text-sm">Thank you for your order.</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Order Number:</span>
                                <span className="font-semibold text-[#1A1A2E]">{paymentData.order_number}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Amount Paid:</span>
                                <span className="font-semibold text-[#1A1A2E]">{paymentData.total_amount} €</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Receipt Email:</span>
                                <span className="font-semibold text-[#1A1A2E]">{paymentData.receipt_email}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Stripe ID:</span>
                                <span className="font-semibold text-[#1A1A2E] truncate max-w-[150px]" title={sessionId!}>{sessionId}</span>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="block w-full text-center py-3.5 rounded-xl text-white text-[14px] font-bold hover:opacity-90 active:scale-95 transition-all"
                            style={{ background: 'linear-gradient(to right, #BF003A, #59001C)' }}
                        >
                            Continue
                        </Link>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.94) translateY(16px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
            `}</style>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center p-4">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
