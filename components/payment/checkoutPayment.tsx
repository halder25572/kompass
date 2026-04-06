// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function CheckoutPage() {
//     const [firstName, setFirstName] = useState("Jane");
//     const [lastName, setLastName] = useState("");
//     const [street, setStreet] = useState("Musterstraße 123");
//     const [postalCode, setPostalCode] = useState("10115");
//     const [city, setCity] = useState("Berlin");
//     const [country, setCountry] = useState("DE");
//     const [coupon, setCoupon] = useState("");
//     const [delivery, setDelivery] = useState<"regular" | "express">("regular");

//     const productPrice = 49.90;
//     const expressExtra = 12.90;
//     const shippingCost = country === "AT" ? 6.80 : country === "CH" ? 18.90 : 0;
//     const deliveryCost = delivery === "express" ? expressExtra : shippingCost;
//     const total = productPrice + deliveryCost;

//     const countries = [
//         { code: "DE", label: "Germany (DE)" },
//         { code: "AT", label: "Austria (AT)" },
//         { code: "CH", label: "Switzerland (CH)" },
//     ];

//     const InputBase =
//         "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all bg-white placeholder-gray-400";

//     return (
//         <div className="min-h-screen bg-[#F3F3F3]" style={{
//             backgroundImage: "url('/images/bg1.png')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//         }} >

//             {/* ── Navbar ── */}
//             {/* <header className="bg-white border-b border-gray-100 px-5 sm:px-8 py-3.5">
//         <Link href="/" className="inline-flex items-center gap-2 no-underline">
//           <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden bg-[#FFF0F3]">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
//             </svg>
//           </div>
//           <span className="text-[15px] font-bold text-[#1A1A2E]">Mein HerzGeschenk</span>
//         </Link>
//       </header> */}

//             {/* ── Page ── */}
//             <main className="max-w-245 mx-auto px-4 sm:px-6 py-8 sm:py-10">
//                 <header className="py-3.5">
//                     <Link href="/" className="inline-flex items-center gap-2 no-underline">
//                         <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden bg-[#FFF0F3]">
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//                             </svg>
//                         </div>
//                         <span className="text-[15px] font-bold text-[#1A1A2E]">Mein HerzGeschenk</span>
//                     </Link>
//                 </header>

//                 <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#1A1A2E] mb-7">Checkout</h1>

//                 <div className="flex flex-col lg:flex-row gap-5 items-start">

//                     {/* ══ LEFT COLUMN ══ */}
//                     <div className="flex-1 flex flex-col gap-5 w-full">

//                         {/* ── Shipping Address ── */}
//                         <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
//                             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Shipping Address</h2>

//                             {/* First + Last */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">First Name</label>
//                                     <div className="relative">
//                                         <input
//                                             value={firstName}
//                                             onChange={e => setFirstName(e.target.value)}
//                                             className={InputBase}
//                                             placeholder="First Name"
//                                         />
//                                         {firstName && (
//                                             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
//                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                                     <polyline points="20 6 9 17 4 12" />
//                                                 </svg>
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Last Name</label>
//                                     <div className="relative">
//                                         <input
//                                             value={lastName}
//                                             onChange={e => setLastName(e.target.value)}
//                                             className={InputBase}
//                                             placeholder="Last Name"
//                                         />
//                                         {!lastName && (
//                                             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
//                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//                                                 </svg>
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Street */}
//                             <div className="mb-4">
//                                 <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Street + House Number</label>
//                                 <input
//                                     value={street}
//                                     onChange={e => setStreet(e.target.value)}
//                                     className={InputBase}
//                                     placeholder="Street + House Number"
//                                 />
//                             </div>

//                             {/* Postal + City */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Postal Code</label>
//                                     <input
//                                         value={postalCode}
//                                         onChange={e => setPostalCode(e.target.value)}
//                                         className={InputBase}
//                                         placeholder="Postal Code"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">City</label>
//                                     <input
//                                         value={city}
//                                         onChange={e => setCity(e.target.value)}
//                                         className={InputBase}
//                                         placeholder="City"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Country */}
//                             <div className="mb-5">
//                                 <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Country</label>
//                                 <div className="relative">
//                                     <select
//                                         value={country}
//                                         onChange={e => setCountry(e.target.value)}
//                                         className={`${InputBase} appearance-none pr-9 cursor-pointer`}
//                                     >
//                                         {countries.map(c => (
//                                             <option key={c.code} value={c.code}>{c.label}</option>
//                                         ))}
//                                     </select>
//                                     <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <polyline points="6 9 12 15 18 9" />
//                                         </svg>
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Shipping notice */}
//                             <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
//                                     <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
//                                 </svg>
//                                 <div>
//                                     <p className="text-[13px] text-gray-700">
//                                         <span className="text-[#BF003A] font-semibold">Free shipping</span>
//                                         {" "}to Germany
//                                     </p>
//                                     <p className="text-[11px] text-gray-400 mt-0.5">
//                                         Other zones: Austria (6.80 €) • Switzerland (18.90 €)
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ── Delivery Option ── */}
//                         <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
//                             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-1">Delivery Option</h2>
//                             <p className="text-[13px] text-gray-400 mb-4">Choose how quickly you&apos;d like your order to arrive.</p>

//                             {/* Regular */}
//                             <label
//                                 className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all mb-3 ${delivery === "regular"
//                                         ? "border-[#BF003A] bg-[#FFF8F9]"
//                                         : "border-gray-200 bg-white hover:border-gray-300"
//                                     }`}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${delivery === "regular" ? "border-[#BF003A]" : "border-gray-300"}`}>
//                                         {delivery === "regular" && <div className="w-2.5 h-2.5 rounded-full bg-[#BF003A]" />}
//                                     </div>
//                                     <div>
//                                         <p className="text-[14px] font-semibold text-[#1A1A2E]">Regular delivery</p>
//                                         <p className="text-[12px] text-gray-400">Estimated arrival in 3–5 business days.</p>
//                                     </div>
//                                 </div>
//                                 <span className="text-[13px] font-semibold text-gray-500 shrink-0">Included</span>
//                                 <input type="radio" name="delivery" value="regular" checked={delivery === "regular"} onChange={() => setDelivery("regular")} className="sr-only" />
//                             </label>

//                             {/* Express */}
//                             <label
//                                 className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all ${delivery === "express"
//                                         ? "border-[#BF003A] bg-[#FFF8F9]"
//                                         : "border-gray-200 bg-white hover:border-gray-300"
//                                     }`}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${delivery === "express" ? "border-[#BF003A]" : "border-gray-300"}`}>
//                                         {delivery === "express" && <div className="w-2.5 h-2.5 rounded-full bg-[#BF003A]" />}
//                                     </div>
//                                     <div>
//                                         <p className="text-[14px] font-semibold text-[#1A1A2E]">Express delivery</p>
//                                         <p className="text-[12px] text-gray-400">Priority handling with delivery in 1–2 business days.</p>
//                                     </div>
//                                 </div>
//                                 <span className="text-[13px] font-semibold text-[#1A1A2E] shrink-0">+{expressExtra.toFixed(2)} €</span>
//                                 <input type="radio" name="delivery" value="express" checked={delivery === "express"} onChange={() => setDelivery("express")} className="sr-only" />
//                             </label>
//                         </div>

//                     </div>

//                     {/* ══ RIGHT COLUMN — Order Summary ══ */}
//                     <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
//                         <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] sticky top-6">
//                             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Order Summary</h2>

//                             {/* Product row */}
//                             <div className="flex items-center gap-3 mb-5">
//                                 <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
//                                     <Image src="/images/c1.jpg" alt="Premium Memory Book" fill style={{ objectFit: "cover" }} />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-[13px] font-bold text-[#1A1A2E] leading-snug">Premium Memory Book</p>
//                                     <p className="text-[11px] text-gray-400 mt-0.5">Soft Pink • Hardcover</p>
//                                 </div>
//                                 <p className="text-[14px] font-bold text-[#1A1A2E] shrink-0">{productPrice.toFixed(2)} €</p>
//                             </div>

//                             {/* Coupon */}
//                             <div className="flex gap-2 mb-5">
//                                 <input
//                                     value={coupon}
//                                     onChange={e => setCoupon(e.target.value)}
//                                     placeholder="Enter a coupon code"
//                                     className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all placeholder-gray-300 bg-white"
//                                 />
//                                 <button className="text-[13px] font-bold text-[#BF003A] px-3 hover:opacity-80 transition-opacity shrink-0">
//                                     Apply
//                                 </button>
//                             </div>

//                             {/* Divider */}
//                             <div className="border-t border-gray-100 mb-4" />

//                             {/* Price rows */}
//                             <div className="flex justify-between items-center mb-2">
//                                 <span className="text-[13px] text-gray-500">Product subtotal</span>
//                                 <span className="text-[13px] font-medium text-[#1A1A2E]">{productPrice.toFixed(2)} €</span>
//                             </div>
//                             <div className="flex justify-between items-center mb-5">
//                                 <span className="text-[13px] text-gray-500">
//                                     Shipping {country === "DE" ? "(Germany)" : country === "AT" ? "(Austria)" : "(Switzerland)"}
//                                 </span>
//                                 <div className="flex items-center gap-1.5">
//                                     {shippingCost > 0 && (
//                                         <span className="text-[12px] text-gray-300 line-through">{shippingCost.toFixed(2)} €</span>
//                                     )}
//                                     <span className={`text-[13px] font-semibold ${country === "DE" ? "text-green-500" : "text-[#1A1A2E]"}`}>
//                                         {country === "DE" ? "Free" : `${shippingCost.toFixed(2)} €`}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Divider */}
//                             <div className="border-t border-gray-100 mb-4" />

//                             {/* Total */}
//                             <div className="flex justify-between items-end mb-5">
//                                 <span className="text-[14px] font-bold text-[#1A1A2E]">Total</span>
//                                 <div className="text-right">
//                                     <p className="text-[22px] font-extrabold text-[#1A1A2E] leading-none">
//                                         {total.toFixed(2)} €
//                                     </p>
//                                     <p className="text-[11px] text-gray-400 mt-0.5">Including VAT</p>
//                                 </div>
//                             </div>

//                             {/* CTA */}
//                             <button
//                                 className="w-full py-3.5 rounded-xl cursor-pointer text-white text-[14px] font-bold transition-opacity hover:opacity-90 active:scale-[0.98]"
//                                 style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
//                             >
//                                 Continue to Payment
//                             </button>

//                             {/* SSL */}
//                             <div className="flex items-center justify-center gap-1.5 mt-3">
//                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
//                                 </svg>
//                                 <span className="text-[11px] text-gray-400">Secure 256-bit SSL encryption</span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   PAYMENT MODAL
═══════════════════════════════════════════════════ */
function PaymentModal({ onClose }: { onClose: () => void }) {
    const [selected, setSelected] = useState<"stripe" | "paypal" | "card">("card");
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Animate in
    useEffect(() => {
        const overlay = overlayRef.current;
        const modal = modalRef.current;
        if (!overlay || !modal) return;
        overlay.style.opacity = "0";
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.94) translateY(16px)";
        requestAnimationFrame(() => {
            overlay.style.transition = "opacity 0.2s ease";
            modal.style.transition = "opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)";
            overlay.style.opacity = "1";
            modal.style.opacity = "1";
            modal.style.transform = "scale(1) translateY(0)";
        });
    }, []);

    const close = () => {
        const overlay = overlayRef.current;
        const modal = modalRef.current;
        if (!overlay || !modal) return;
        overlay.style.transition = "opacity 0.18s ease";
        modal.style.transition = "opacity 0.18s ease, transform 0.18s ease";
        overlay.style.opacity = "0";
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.94) translateY(12px)";
        setTimeout(onClose, 180);
    };

    const methods = [
        {
            id: "stripe" as const,
            label: "Stripe",
            sub: "Secure checkout via Stripe",
            bg: "#635BFF",
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
            ),
            letter: "S",
        },
        {
            id: "paypal" as const,
            label: "PayPal",
            sub: "Pay with your PayPal account",
            bg: "#003087",
            icon: null,
            letter: "P",
        },
        {
            id: "card" as const,
            label: "Credit / Debit Card",
            sub: "Visa, Mastercard, Amex",
            bg: "#1A1F71",
            icon: null,
            letter: "VISA",
            isVisa: true,
        },
    ];

    return (
        <div
            ref={overlayRef}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)" }}
        >
            <div
                ref={modalRef}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-85 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-[#FFF0F3] flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-[#1A1A2E] leading-tight">Complete Your Order</h3>
                                <p className="text-[12px] text-gray-400 mt-0.5">Choose a payment method to proceed.</p>
                            </div>
                        </div>
                        <button
                            onClick={close}
                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors shrink-0 ml-2"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Payment methods */}
                <div className="px-5 py-4 flex flex-col gap-2.5">
                    <p className="text-[12px] font-semibold text-gray-500 mb-1">Payment Method</p>

                    {methods.map(m => (
                        <label
                            key={m.id}
                            onClick={() => setSelected(m.id)}
                            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border cursor-pointer transition-all ${selected === m.id
                                ? "border-[#BF003A] bg-[#FFF8F9]"
                                : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            {/* Radio */}
                            <div className={`w-4.25 h-4.25 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected === m.id ? "border-[#BF003A]" : "border-gray-300"
                                }`}>
                                {selected === m.id && (
                                    <div className="w-2 h-2 rounded-full bg-[#BF003A]" />
                                )}
                            </div>

                            {/* Icon badge */}
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-extrabold text-[10px] tracking-wide"
                                style={{ background: m.bg }}
                            >
                                {m.letter}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#1A1A2E]">{m.label}</p>
                                <p className="text-[11px] text-gray-400">{m.sub}</p>
                            </div>

                            {/* External link icon */}
                            {(m.id === "stripe" || m.id === "paypal") && (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            )}
                        </label>
                    ))}
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                    <button
                        className="w-full py-3.5 rounded-xl text-white text-[14px] font-bold transition-opacity hover:opacity-90 active:scale-[0.98] mb-3"
                        style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                    >
                        Continue
                    </button>
                    <div className="flex items-center justify-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        <span className="text-[11px] text-gray-400">Secure &amp; encrypted payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════════════════ */
export default function CheckoutPage() {
    const [firstName, setFirstName] = useState("Jane");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("Musterstraße 123");
    const [postalCode, setPostalCode] = useState("10115");
    const [city, setCity] = useState("Berlin");
    const [country, setCountry] = useState("DE");
    const [coupon, setCoupon] = useState("");
    const [delivery, setDelivery] = useState<"regular" | "express">("regular");
    const [showPayment, setShowPayment] = useState(false);

    const productPrice = 49.90;
    const expressExtra = 12.90;
    const shippingCost = country === "AT" ? 6.80 : country === "CH" ? 18.90 : 0;
    const deliveryCost = delivery === "express" ? expressExtra : shippingCost;
    const total = productPrice + deliveryCost;

    const countries = [
        { code: "DE", label: "Germany (DE)" },
        { code: "AT", label: "Austria (AT)" },
        { code: "CH", label: "Switzerland (CH)"},
    ];

    const InputBase =
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all bg-white placeholder-gray-400";

    return (
        <div className="min-h-screen"
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* ── Page ── */}
            <main className="max-w-245 mx-auto px-4 sm:px-6 py-8 sm:py-10">
                {/* ── Navbar ── */}
                <header className="py-3.5">
                    <Link href="/" className="inline-flex items-center gap-2 no-underline">
                        <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden bg-[#FFF0F3]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                        </div>
                        <span className="text-[15px] font-bold text-[#1A1A2E]">Mein HerzGeschenk</span>
                    </Link>
                </header>

                <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#1A1A2E] my-7">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* ══ LEFT COLUMN ══ */}
                    <div className="flex-1 flex flex-col gap-5 w-full">

                        {/* ── Shipping Address ── */}
                        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
                            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Shipping Address</h2>

                            {/* First + Last */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">First Name</label>
                                    <div className="relative">
                                        <input
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            className={InputBase}
                                            placeholder="First Name"
                                        />
                                        {firstName && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Last Name</label>
                                    <div className="relative">
                                        <input
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            className={InputBase}
                                            placeholder="Last Name"
                                        />
                                        {!lastName && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Street */}
                            <div className="mb-4">
                                <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Street + House Number</label>
                                <input
                                    value={street}
                                    onChange={e => setStreet(e.target.value)}
                                    className={InputBase}
                                    placeholder="Street + House Number"
                                />
                            </div>

                            {/* Postal + City */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Postal Code</label>
                                    <input
                                        value={postalCode}
                                        onChange={e => setPostalCode(e.target.value)}
                                        className={InputBase}
                                        placeholder="Postal Code"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">City</label>
                                    <input
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        className={InputBase}
                                        placeholder="City"
                                    />
                                </div>
                            </div>

                            {/* Country */}
                            <div className="mb-5">
                                <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Country</label>
                                <div className="relative">
                                    <select
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                        className={`${InputBase} appearance-none pr-9 cursor-pointer`}
                                    >
                                        {countries.map(c => (
                                            <option key={c.code} value={c.code}>{c.label}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Shipping notice */}
                            <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                                    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <div>
                                    <p className="text-[13px] text-gray-700">
                                        <span className="text-[#BF003A] font-semibold">Free shipping</span>
                                        {" "}to Germany
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                        Other zones: Austria (6.80 €) • Switzerland (18.90 €)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Delivery Option ── */}
                        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
                            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-1">Delivery Option</h2>
                            <p className="text-[13px] text-gray-400 mb-4">Choose how quickly you&apos;d like your order to arrive.</p>

                            {/* Regular */}
                            <label
                                className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all mb-3 ${delivery === "regular"
                                    ? "border-[#BF003A] bg-[#FFF8F9]"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${delivery === "regular" ? "border-[#BF003A]" : "border-gray-300"}`}>
                                        {delivery === "regular" && <div className="w-2.5 h-2.5 rounded-full bg-[#BF003A]" />}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-semibold text-[#1A1A2E]">Regular delivery</p>
                                        <p className="text-[12px] text-gray-400">Estimated arrival in 3–5 business days.</p>
                                    </div>
                                </div>
                                <span className="text-[13px] font-semibold text-gray-500 shrink-0">Included</span>
                                <input type="radio" name="delivery" value="regular" checked={delivery === "regular"} onChange={() => setDelivery("regular")} className="sr-only" />
                            </label>

                            {/* Express */}
                            <label
                                className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all ${delivery === "express"
                                    ? "border-[#BF003A] bg-[#FFF8F9]"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${delivery === "express" ? "border-[#BF003A]" : "border-gray-300"}`}>
                                        {delivery === "express" && <div className="w-2.5 h-2.5 rounded-full bg-[#BF003A]" />}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-semibold text-[#1A1A2E]">Express delivery</p>
                                        <p className="text-[12px] text-gray-400">Priority handling with delivery in 1–2 business days.</p>
                                    </div>
                                </div>
                                <span className="text-[13px] font-semibold text-[#1A1A2E] shrink-0">+{expressExtra.toFixed(2)} €</span>
                                <input type="radio" name="delivery" value="express" checked={delivery === "express"} onChange={() => setDelivery("express")} className="sr-only" />
                            </label>
                        </div>

                    </div>

                    {/* ══ RIGHT COLUMN — Order Summary ══ */}
                    <div className="w-full lg:w-75 xl:w-[320px] shrink-0">
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] sticky top-6">
                            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Order Summary</h2>

                            {/* Product row */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                                    <Image src="/images/c1.jpg" alt="Premium Memory Book" fill style={{ objectFit: "cover" }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-bold text-[#1A1A2E] leading-snug">Premium Memory Book</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Soft Pink • Hardcover</p>
                                </div>
                                <p className="text-[14px] font-bold text-[#1A1A2E] shrink-0">{productPrice.toFixed(2)} €</p>
                            </div>

                            {/* Coupon */}
                            <div className="flex gap-2 mb-5">
                                <input
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                    placeholder="Enter a coupon code"
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all placeholder-gray-300 bg-white"
                                />
                                <button className="text-[13px] font-bold text-[#BF003A] px-3 hover:opacity-80 transition-opacity shrink-0">
                                    Apply
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mb-4" />

                            {/* Price rows */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[13px] text-gray-500">Product subtotal</span>
                                <span className="text-[13px] font-medium text-[#1A1A2E]">{productPrice.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-[13px] text-gray-500">
                                    Shipping {country === "DE" ? "(Germany)" : country === "AT" ? "(Austria)" : "(Switzerland)"}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    {shippingCost > 0 && (
                                        <span className="text-[12px] text-gray-300 line-through">{shippingCost.toFixed(2)} €</span>
                                    )}
                                    <span className={`text-[13px] font-semibold ${country === "DE" ? "text-green-500" : "text-[#1A1A2E]"}`}>
                                        {country === "DE" ? "Free" : `${shippingCost.toFixed(2)} €`}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mb-4" />

                            {/* Total */}
                            <div className="flex justify-between items-end mb-5">
                                <span className="text-[14px] font-bold text-[#1A1A2E]">Total</span>
                                <div className="text-right">
                                    <p className="text-[22px] font-extrabold text-[#1A1A2E] leading-none">
                                        {total.toFixed(2)} €
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Including VAT</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setShowPayment(true)}
                                className="w-full py-3.5 rounded-xl cursor-pointer text-white text-[14px] font-bold transition-opacity hover:opacity-90 active:scale-[0.98]"
                                style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                            >
                                Continue to Payment
                            </button>

                            {/* SSL */}
                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <span className="text-[11px] text-gray-400">Secure 256-bit SSL encryption</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Payment Modal */}
            {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
        </div>
    );
}