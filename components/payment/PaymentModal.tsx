/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { memo, useRef, useEffect, useState, lazy, Suspense } from "react";

import { usePlaceOrder } from "@/features/checkout/hooks/usePlaceOrder";
import { useStripeSession } from "@/features/checkout/hooks/useStripeSession";
import { toast } from "sonner";
import { PlaceOrderPayload } from "@/types/api";

interface PaymentModalProps {
    onClose: () => void;
    amount?: number;
    checkoutData?: PlaceOrderPayload;
}

const PAYMENT_METHODS = [
    {
        id: "stripe" as const,
        label: "Credit / Debit Card",
        sub: "Secure checkout via Stripe",
        bg: "#635BFF",
        letter: "S",
    },
    {
        id: "paypal" as const,
        label: "PayPal",
        sub: "Pay with your PayPal account",
        bg: "#003087",
        letter: "P",
    },
] as const;

const StripeForm = lazy(() => import("./StripeForm").then((m) => ({ default: m.StripeForm })));

export const PaymentModal = memo(function PaymentModal({ onClose, amount, checkoutData }: PaymentModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    
    const { mutateAsync: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();
    const { mutateAsync: createSession, isPending: isCreatingSession } = useStripeSession();
    
    const isProcessing = isPlacingOrder || isCreatingSession;

    useEffect(() => {
        const overlay = overlayRef.current;
        const modal = modalRef.current;
        if (!overlay || !modal) return;

        // Force layout trigger
        overlay.offsetHeight;

        overlay.classList.add("animate-fadeIn");
        modal.classList.add("animate-scaleIn");

        return () => {
            overlay.classList.remove("animate-fadeIn");
            modal.classList.remove("animate-scaleIn");
        };
    }, []);

    const handleClose = () => {
        const overlay = overlayRef.current;
        const modal = modalRef.current;
        if (!overlay || !modal) return;

        overlay.classList.remove("animate-fadeIn");
        modal.classList.remove("animate-scaleIn");
        overlay.classList.add("animate-fadeOut");
        modal.classList.add("animate-scaleOut");

        setTimeout(onClose, 180);
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-120 overflow-hidden shadow-lg"
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-[#FFF0F3] flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-[#1A1A2E]">Complete Your Order</h3>
                                <p className="text-[12px] text-gray-400 mt-0.5">Choose a payment method</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 shrink-0"
                            aria-label="Close"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Payment methods */}
                <div className="px-5 py-4 flex flex-col gap-2.5">
                    <p className="text-[12px] font-semibold text-gray-500 mb-1">Payment Method</p>

                    {PAYMENT_METHODS.map((method) => (
                        <label
                                key={method.id}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border cursor-pointer hover:border-gray-300 transition-colors ${selectedMethod === method.id ? 'border-[#BF003A] bg-[#FFF8F9]' : ''}`}
                                onClick={() => setSelectedMethod(method.id)}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 ${selectedMethod === method.id ? 'border-[#BF003A]' : 'border-gray-300'} shrink-0`} />
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-extrabold text-[10px]"
                                    style={{ background: method.bg }}
                                >
                                    {method.letter}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{method.label}</p>
                                    <p className="text-[11px] text-gray-400">{method.sub}</p>
                                </div>
                        <input type="radio" name="payment" value={method.id} className="sr-only" checked={selectedMethod === method.id} readOnly />
                    </label>
                ))}
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                    <div>
                        <button
                            disabled={isProcessing}
                            onClick={async () => {
                                if (selectedMethod === 'stripe') {
                                    if (!checkoutData) {
                                        toast.error("Missing checkout details.");
                                        return;
                                    }
                                    if (!checkoutData.book_id) {
                                        toast.error("Book ID is missing. Please select a book to order.");
                                        return;
                                    }
                                    if (!checkoutData.email) {
                                        toast.error("Email is required.");
                                        return;
                                    }
                                    try {
                                        // 1. Place the order
                                        const orderResponse = await placeOrder(checkoutData);
                                        const orderId = orderResponse.data.id;

                                        // 2. Create Stripe Session
                                        const sessionResponse = await createSession({ order_id: orderId });
                                        
                                        // 3. Redirect to Stripe Checkout
                                        if (sessionResponse.data?.checkout_url) {
                                            window.location.href = sessionResponse.data.checkout_url;
                                        } else {
                                            toast.error("Failed to get checkout URL from Stripe.");
                                        }
                                    } catch (error: any) {
                                        console.error("Payment flow error:", error);
                                        toast.error(error.message || "Failed to process payment");
                                    }
                                } else if (selectedMethod === 'paypal') {
                                    window.alert('PayPal flow will open (coming next)');
                                } else {
                                    window.alert('Please select a payment method');
                                }
                            }}
                            className="w-full cursor-pointer py-3.5 rounded-xl text-white text-[14px] font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                        >
                            {isProcessing ? "Processing..." : "Continue"}
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        <span className="text-[11px] text-gray-400">Secure &amp; encrypted</span>
                    </div>
                </div>
            </div>
        </div>
    );
});
