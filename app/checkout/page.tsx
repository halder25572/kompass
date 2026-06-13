import CheckoutPayment from "@/components/payment/checkoutPayment";
import { Suspense } from "react";

const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Section */}
                    <div className="lg:col-span-2">
                        <Suspense fallback={<div>Loading checkout...</div>}>
                            <CheckoutPayment />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;