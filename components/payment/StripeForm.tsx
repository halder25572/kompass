/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { createStripePaymentIntent, updateOrderStatus } from "@/services/api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

function InnerForm({ clientSecret, orderId, onComplete }: { clientSecret: string; orderId?: number | string; onComplete: (success: boolean) => void; }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (!card) return;
        setProcessing(true);
        try {
            const res = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (res.error) {
                toast.error(res.error.message || "Payment failed");
                onComplete(false);
            } else if (res.paymentIntent && res.paymentIntent.status === "succeeded") {
                // mark order as paid
                if (orderId) {
                    try {
                        await updateOrderStatus(orderId, { status: "paid" });
                    } catch (err) {
                        console.warn("Failed to update order status", err);
                    }
                }
                toast.success("Payment successful");
                onComplete(true);
            } else {
                toast.error("Payment not completed");
                onComplete(false);
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err?.message || "Payment error");
            onComplete(false);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Card information</label>
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
            </div>
            <div className="flex gap-3">
                <button type="submit" disabled={processing} className="flex-1 py-3 rounded-xl bg-[#0b73ff] text-white font-semibold">
                    {processing ? "Processing…" : "Pay now"}
                </button>
            </div>
        </form>
    );
}

export function StripeForm({ amount, onSuccess, onCancel }: { amount: number; onSuccess: () => void; onCancel: () => void; }) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<number | string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const resp = await createStripePaymentIntent({ amount: Math.round((amount ?? 0) * 100), currency: 'eur' });
                if (!mounted) return;
                setClientSecret(resp.clientSecret ?? null);
                setOrderId(resp.orderId ?? resp.order_id ?? resp.order_id);
            } catch (err: any) {
                console.error("Failed to create payment intent", err);
                toast.error(err?.message || "Unable to initialize payment");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; };
    }, [amount]);

    if (loading) return <div className="p-6">Preparing payment…</div>;
    if (!clientSecret) return <div className="p-6">Unable to initialize payment. Try again later.</div>;

    return (
        <div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <InnerForm clientSecret={clientSecret} orderId={orderId} onComplete={(success) => { if (success) onSuccess(); else onCancel(); }} />
            </Elements>
        </div>
    );
}

export default StripeForm;
