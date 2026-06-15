// 'use client';

// import { useState, memo, lazy, Suspense } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';

// // Lazy load payment modal for faster initial load
// const PaymentModal = lazy(() => import('./PaymentModal').then(m => ({ default: m.PaymentModal })));

// // Memoized shipping form to prevent unnecessary re-renders
// const ShippingForm = memo(function ShippingForm({
//     firstName,
//     lastName,
//     street,
//     postalCode,
//     city,
//     country,
//     email,
//     onFirstNameChange,
//     onLastNameChange,
//     onStreetChange,
//     onPostalCodeChange,
//     onCityChange,
//     onCountryChange,
//     onEmailChange,
// }: {
//     firstName: string;
//     lastName: string;
//     street: string;
//     postalCode: string;
//     city: string;
//     country: string;
//     email: string;
//     onFirstNameChange: (v: string) => void;
//     onLastNameChange: (v: string) => void;
//     onStreetChange: (v: string) => void;
//     onPostalCodeChange: (v: string) => void;
//     onCityChange: (v: string) => void;
//     onCountryChange: (v: string) => void;
//     onEmailChange: (v: string) => void;
// }) {
//     const InputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all bg-white placeholder-gray-400';

//     return (
//         <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">
//             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Shipping Address</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">First Name</label>
//                     <input
//                         value={firstName}
//                         onChange={(e) => onFirstNameChange(e.target.value)}
//                         className={InputClass}
//                         placeholder="First Name"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Last Name</label>
//                     <input
//                         value={lastName}
//                         onChange={(e) => onLastNameChange(e.target.value)}
//                         className={InputClass}
//                         placeholder="Last Name"
//                     />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Street + House Number</label>
//                 <input
//                     value={street}
//                     onChange={(e) => onStreetChange(e.target.value)}
//                     className={InputClass}
//                     placeholder="Street + House Number"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => onEmailChange(e.target.value)}
//                     className={InputClass}
//                     placeholder="Email Address"
//                 />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Postal Code</label>
//                     <input
//                         value={postalCode}
//                         onChange={(e) => onPostalCodeChange(e.target.value)}
//                         className={InputClass}
//                         placeholder="Postal Code"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-[12px] font-medium text-gray-500 mb-1.5">City</label>
//                     <input
//                         value={city}
//                         onChange={(e) => onCityChange(e.target.value)}
//                         className={InputClass}
//                         placeholder="City"
//                     />
//                 </div>
//             </div>

//             <div className="mb-5">
//                 <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Country</label>
//                 <select
//                     value={country}
//                     onChange={(e) => onCountryChange(e.target.value)}
//                     className={`${InputClass} appearance-none cursor-pointer`}
//                 >
//                     <option value="DE">Germany (DE)</option>
//                     <option value="AT">Austria (AT)</option>
//                     <option value="CH">Switzerland (CH)</option>
//                 </select>
//             </div>

//             <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" className="mt-0.5 shrink-0">
//                     <rect x="1" y="3" width="15" height="13" rx="1" />
//                     <path d="M16 8h4l3 5v3h-7V8z" />
//                     <circle cx="5.5" cy="18.5" r="2.5" />
//                     <circle cx="18.5" cy="18.5" r="2.5" />
//                 </svg>
//                 <div>
//                     <p className="text-[13px] text-gray-700">
//                         <span className="text-[#BF003A] font-semibold">Free shipping</span> to Germany
//                     </p>
//                     <p className="text-[11px] text-gray-400 mt-0.5">Austria (6.80 €) • Switzerland (18.90 €)</p>
//                 </div>
//             </div>
//         </div>
//     );
// });

// // Memoized delivery option
// const DeliveryOption = memo(function DeliveryOption({
//     delivery,
//     onDeliveryChange,
// }: {
//     delivery: 'regular' | 'express';
//     onDeliveryChange: (v: 'regular' | 'express') => void;
// }) {
//     return (
//         <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">
//             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-1">Delivery Option</h2>
//             <p className="text-[13px] text-gray-400 mb-4">Choose your delivery speed.</p>

//             <label className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all mb-3 ${delivery === 'regular' ? 'border-[#BF003A] bg-[#FFF8F9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
//                 <div className="flex items-center gap-3">
//                     <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${delivery === 'regular' ? 'border-[#BF003A]' : 'border-gray-300'}`}>
//                         {delivery === 'regular' && <div className="w-2 h-2 rounded-full bg-[#BF003A]" />}
//                     </div>
//                     <div>
//                         <p className="text-[14px] font-semibold text-[#1A1A2E]">Regular</p>
//                         <p className="text-[12px] text-gray-400">3–5 business days</p>
//                     </div>
//                 </div>
//                 <span className="text-[13px] font-semibold text-gray-500">Included</span>
//                 <input type="radio" name="delivery" value="regular" checked={delivery === 'regular'} onChange={() => onDeliveryChange('regular')} className="sr-only" />
//             </label>

//             <label className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all ${delivery === 'express' ? 'border-[#BF003A] bg-[#FFF8F9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
//                 <div className="flex items-center gap-3">
//                     <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${delivery === 'express' ? 'border-[#BF003A]' : 'border-gray-300'}`}>
//                         {delivery === 'express' && <div className="w-2 h-2 rounded-full bg-[#BF003A]" />}
//                     </div>
//                     <div>
//                         <p className="text-[14px] font-semibold text-[#1A1A2E]">Express</p>
//                         <p className="text-[12px] text-gray-400">1–2 business days</p>
//                     </div>
//                 </div>
//                 <span className="text-[13px] font-semibold text-[#1A1A2E]">+12.90 €</span>
//                 <input type="radio" name="delivery" value="express" checked={delivery === 'express'} onChange={() => onDeliveryChange('express')} className="sr-only" />
//             </label>
//         </div>
//     );
// });

// export default function CheckoutPayment() {
//     const searchParams = useSearchParams();
//     const bookId = searchParams.get('bookId');

//     const [firstName, setFirstName] = useState('Jane');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [street, setStreet] = useState('Musterstraße 123');
//     const [postalCode, setPostalCode] = useState('10115');
//     const [city, setCity] = useState('Berlin');
//     const [country, setCountry] = useState('DE');
//     const [coupon, setCoupon] = useState('');
//     const [delivery, setDelivery] = useState<'regular' | 'express'>('regular');
//     const [showPayment, setShowPayment] = useState(false);

//     const productPrice = 49.9;
//     const expressExtra = 12.9;
//     const shippingCost = country === 'AT' ? 6.8 : country === 'CH' ? 18.9 : 0;
//     const deliveryCost = delivery === 'express' ? expressExtra : shippingCost;
//     const total = productPrice + deliveryCost;

//     return (
//         <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
//                 <header className="py-3.5 mb-7">
//                     <Link href="/" className="inline-flex items-center gap-2 no-underline hover:opacity-80 transition-opacity">
//                         <div className="w-7 h-7 rounded-md bg-[#FFF0F3] flex items-center justify-center shrink-0">
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2">
//                                 <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//                             </svg>
//                         </div>
//                         <span className="text-[15px] font-bold text-[#1A1A2E]">Mein HerzGeschenk</span>
//                     </Link>
//                 </header>

//                 <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#1A1A2E] mb-7">Checkout</h1>

//                 <div className="flex flex-col lg:flex-row gap-5">
//                     <div className="flex-1 flex flex-col gap-5">
//                         <ShippingForm
//                             firstName={firstName}
//                             lastName={lastName}
//                             street={street}
//                             postalCode={postalCode}
//                             city={city}
//                             country={country}
//                             email={email}
//                             onFirstNameChange={setFirstName}
//                             onLastNameChange={setLastName}
//                             onStreetChange={setStreet}
//                             onPostalCodeChange={setPostalCode}
//                             onCityChange={setCity}
//                             onCountryChange={setCountry}
//                             onEmailChange={setEmail}
//                         />
//                         <DeliveryOption delivery={delivery} onDeliveryChange={setDelivery} />
//                     </div>

//                     <div className="w-full lg:w-[320px] shrink-0">
//                         <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(16,24,40,0.06)] sticky top-6">
//                             <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Order Summary</h2>

//                             <div className="flex items-center gap-3 mb-5">
//                                 <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
//                                     <Image src="/images/c1.jpg" alt="Premium Memory Book" fill sizes="56px" className="object-cover" priority={false} />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-[13px] font-bold text-[#1A1A2E] truncate">Premium Memory Book</p>
//                                     <p className="text-[11px] text-gray-400 mt-0.5">Soft Pink • Hardcover</p>
//                                 </div>
//                                 <p className="text-[14px] font-bold text-[#1A1A2E] shrink-0">{productPrice.toFixed(2)} €</p>
//                             </div>

//                             <div className="flex gap-2 mb-5">
//                                 <input
//                                     value={coupon}
//                                     onChange={(e) => setCoupon(e.target.value)}
//                                     placeholder="Coupon code"
//                                     className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all placeholder-gray-300"
//                                 />
//                                 <button className="text-[13px] cursor-pointer font-bold text-[#BF003A] px-3 hover:opacity-80 transition-opacity">Apply</button>
//                             </div>

//                             <div className="border-t border-gray-100 mb-4" />

//                             <div className="flex justify-between items-center mb-2">
//                                 <span className="text-[13px] text-gray-500">Subtotal</span>
//                                 <span className="text-[13px] font-medium">{productPrice.toFixed(2)} €</span>
//                             </div>
//                             <div className="flex justify-between items-center mb-5">
//                                 <span className="text-[13px] text-gray-500">Shipping</span>
//                                 <span className={`text-[13px] font-semibold ${country === 'DE' ? 'text-green-500' : 'text-[#1A1A2E]'}`}>
//                                     {country === 'DE' ? 'Free' : `${shippingCost.toFixed(2)} €`}
//                                 </span>
//                             </div>

//                             <div className="border-t border-gray-100 mb-4" />

//                             <div className="flex justify-between items-end mb-5">
//                                 <span className="text-[14px] font-bold text-[#1A1A2E]">Total</span>
//                                 <div className="text-right">
//                                     <p className="text-[22px] font-extrabold text-[#1A1A2E]">{total.toFixed(2)} €</p>
//                                     <p className="text-[11px] text-gray-400 mt-0.5">Including VAT</p>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={() => setShowPayment(true)}
//                                 className="w-full py-3.5 rounded-xl cursor-pointer text-white text-[14px] font-bold hover:opacity-90 active:scale-95 transition-all"
//                                 style={{ background: 'linear-gradient(to right, #BF003A, #59001C)' }}
//                             >
//                                 Continue to Payment
//                             </button>

//                             <div className="flex items-center justify-center gap-1.5 mt-3">
//                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
//                                     <rect x="3" y="11" width="18" height="11" rx="2" />
//                                     <path d="M7 11V7a5 5 0 0110 0v4" />
//                                 </svg>
//                                 <span className="text-[11px] text-gray-400">Secure 256-bit SSL</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             {showPayment && (
//                 <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/45" />}>
//                     <PaymentModal 
//                         amount={total} 
//                         onClose={() => setShowPayment(false)} 
//                         checkoutData={{
//                             book_id: Number(bookId),
//                             delivery_type_id: delivery === 'express' ? 2 : 1,
//                             first_name: firstName,
//                             last_name: lastName,
//                             email,
//                             street_house_number: street,
//                             postal_code: postalCode,
//                             city,
//                             country_name: country,
//                             coupon_code: coupon || undefined,
//                         }}
//                     />
//                 </Suspense>
//             )}
//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
//                 @keyframes scaleIn {
//                     from { opacity: 0; transform: scale(0.94) translateY(16px); }
//                     to { opacity: 1; transform: scale(1) translateY(0); }
//                 }
//                 @keyframes fadeOut {
//                     from { opacity: 1; }
//                     to { opacity: 0; }
//                 }
//                 @keyframes scaleOut {
//                     from { opacity: 1; transform: scale(1) translateY(0); }
//                     to { opacity: 0; transform: scale(0.94) translateY(12px); }
//                 }
//                 .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
//                 .animate-scaleIn { animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }
//                 .animate-fadeOut { animation: fadeOut 0.18s ease forwards; }
//                 .animate-scaleOut { animation: scaleOut 0.18s ease forwards; }
//             `}</style>
//         </div>
//     );
// }


'use client';

import { useState, memo, lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Lazy load payment modal for faster initial load
const PaymentModal = lazy(() => import('./PaymentModal').then(m => ({ default: m.PaymentModal })));

// Memoized shipping form to prevent unnecessary re-renders
const ShippingForm = memo(function ShippingForm({
    firstName,
    lastName,
    street,
    postalCode,
    city,
    country,
    email,
    onFirstNameChange,
    onLastNameChange,
    onStreetChange,
    onPostalCodeChange,
    onCityChange,
    onCountryChange,
    onEmailChange,
}: {
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    onFirstNameChange: (v: string) => void;
    onLastNameChange: (v: string) => void;
    onStreetChange: (v: string) => void;
    onPostalCodeChange: (v: string) => void;
    onCityChange: (v: string) => void;
    onCountryChange: (v: string) => void;
    onEmailChange: (v: string) => void;
}) {
    const InputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all bg-white placeholder-gray-400';

    const ValidationIcon = ({ value }: { value: string }) => (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {value.trim() ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            )}
        </span>
    );

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">First Name</label>
                    <div className="relative">
                        <input
                            value={firstName}
                            onChange={(e) => onFirstNameChange(e.target.value)}
                            className={`${InputClass} pr-9`}
                            placeholder="First Name"
                        />
                        <ValidationIcon value={firstName} />
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Last Name</label>
                    <div className="relative">
                        <input
                            value={lastName}
                            onChange={(e) => onLastNameChange(e.target.value)}
                            className={`${InputClass} pr-9`}
                            placeholder="Last Name"
                        />
                        <ValidationIcon value={lastName} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Street + House Number</label>
                <input
                    value={street}
                    onChange={(e) => onStreetChange(e.target.value)}
                    className={InputClass}
                    placeholder="Street + House Number"
                />
            </div>

            <div className="mb-4">
                <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    className={InputClass}
                    placeholder="Email Address"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Postal Code</label>
                    <input
                        value={postalCode}
                        onChange={(e) => onPostalCodeChange(e.target.value)}
                        className={InputClass}
                        placeholder="Postal Code"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5">City</label>
                    <input
                        value={city}
                        onChange={(e) => onCityChange(e.target.value)}
                        className={InputClass}
                        placeholder="City"
                    />
                </div>
            </div>

            <div className="mb-5">
                <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Country</label>
                <select
                    value={country}
                    onChange={(e) => onCountryChange(e.target.value)}
                    className={`${InputClass} appearance-none cursor-pointer`}
                >
                    <option value="DE">Germany (DE)</option>
                    <option value="AT">Austria (AT)</option>
                    <option value="CH">Switzerland (CH)</option>
                </select>
            </div>

            <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" className="mt-0.5 shrink-0">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 5v3h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                    <p className="text-[13px] text-gray-700">
                        <span className="text-[#BF003A] font-semibold">Free shipping</span> to Germany
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Other zones: Austria (6.60 €) • Switzerland (18.90 €)</p>
                </div>
            </div>
        </div>
    );
});

// Memoized delivery option
const DeliveryOption = memo(function DeliveryOption({
    delivery,
    onDeliveryChange,
}: {
    delivery: 'regular' | 'express';
    onDeliveryChange: (v: 'regular' | 'express') => void;
}) {
    return (
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-1">Delivery Option</h2>
            <p className="text-[13px] text-gray-400 mb-4">Choose how quickly you&apos;d like your order to arrive.</p>

            <label className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all mb-3 ${delivery === 'regular' ? 'border-[#BF003A] bg-[#FFF8F9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${delivery === 'regular' ? 'border-[#BF003A]' : 'border-gray-300'}`}>
                        {delivery === 'regular' && <div className="w-2 h-2 rounded-full bg-[#BF003A]" />}
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold text-[#1A1A2E]">Regular delivery</p>
                        <p className="text-[12px] text-gray-400">Estimated arrival in 3-5 business days.</p>
                    </div>
                </div>
                <span className="text-[13px] font-semibold text-gray-500">Included</span>
                <input type="radio" name="delivery" value="regular" checked={delivery === 'regular'} onChange={() => onDeliveryChange('regular')} className="sr-only" />
            </label>

            <label className={`flex items-center justify-between px-4 py-4 rounded-xl border cursor-pointer transition-all ${delivery === 'express' ? 'border-[#BF003A] bg-[#FFF8F9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${delivery === 'express' ? 'border-[#BF003A]' : 'border-gray-300'}`}>
                        {delivery === 'express' && <div className="w-2 h-2 rounded-full bg-[#BF003A]" />}
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold text-[#1A1A2E]">Express delivery</p>
                        <p className="text-[12px] text-gray-400">Priority handling with delivery in 1-2 business days.</p>
                    </div>
                </div>
                <span className="text-[13px] font-semibold text-[#1A1A2E]">+12.90 €</span>
                <input type="radio" name="delivery" value="express" checked={delivery === 'express'} onChange={() => onDeliveryChange('express')} className="sr-only" />
            </label>
        </div>
    );
});

export default function CheckoutPayment() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId');

    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('Musterstraße 123');
    const [postalCode, setPostalCode] = useState('10115');
    const [city, setCity] = useState('Berlin');
    const [country, setCountry] = useState('DE');
    const [coupon, setCoupon] = useState('');
    const [delivery, setDelivery] = useState<'regular' | 'express'>('regular');
    const [showPayment, setShowPayment] = useState(false);

    const productPrice = 49.9;
    const expressExtra = 12.9;
    const shippingCost = country === 'AT' ? 6.8 : country === 'CH' ? 18.9 : 0;
    const deliveryCost = delivery === 'express' ? expressExtra : shippingCost;
    const total = productPrice + deliveryCost;

    const countryName = country === 'DE' ? 'Germany' : country === 'AT' ? 'Austria' : 'Switzerland';

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <header className="py-3.5 mb-7">
                    <Link href="/" className="inline-flex items-center gap-2 no-underline hover:opacity-80 transition-opacity">
                        <div className="w-7 h-7 rounded-md bg-[#FFF0F3] flex items-center justify-center shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                        </div>
                        <span className="text-[15px] font-bold text-[#1A1A2E]">Mein HerzGeschenk</span>
                    </Link>
                </header>

                <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#1A1A2E] mb-7">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex-1 flex flex-col gap-5">
                        <ShippingForm
                            firstName={firstName}
                            lastName={lastName}
                            street={street}
                            postalCode={postalCode}
                            city={city}
                            country={country}
                            email={email}
                            onFirstNameChange={setFirstName}
                            onLastNameChange={setLastName}
                            onStreetChange={setStreet}
                            onPostalCodeChange={setPostalCode}
                            onCityChange={setCity}
                            onCountryChange={setCountry}
                            onEmailChange={setEmail}
                        />
                        <DeliveryOption delivery={delivery} onDeliveryChange={setDelivery} />
                    </div>

                    <div className="w-full lg:w-[320px] shrink-0">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(16,24,40,0.06)] sticky top-6">
                            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Order Summary</h2>

                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                                    <Image src="/images/c1.jpg" alt="Premium Memory Book" fill sizes="56px" className="object-cover" priority={false} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-bold text-[#1A1A2E] truncate">Premium Memory Book</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Soft Pink • Hardcover</p>
                                </div>
                                <p className="text-[14px] font-bold text-[#1A1A2E] shrink-0">{productPrice.toFixed(2)} €</p>
                            </div>

                            <div className="flex gap-2 mb-5">
                                <input
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Enter a coupon code"
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/20 transition-all placeholder-gray-300"
                                />
                                <button className="text-[13px] cursor-pointer font-bold text-[#BF003A] px-3 hover:opacity-80 transition-opacity">Apply</button>
                            </div>

                            <div className="border-t border-gray-100 mb-4" />

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[13px] text-gray-500">Product subtotal</span>
                                <span className="text-[13px] font-medium">{productPrice.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-[13px] text-gray-500">Shipping ({countryName})</span>
                                <span className="text-[13px] font-semibold flex items-center gap-1.5">
                                    {country === 'DE' ? (
                                        <>
                                            <span className="text-gray-400 line-through">6.60 €</span>
                                            <span className="text-green-500">Free</span>
                                        </>
                                    ) : (
                                        <span className="text-[#1A1A2E]">{shippingCost.toFixed(2)} €</span>
                                    )}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 mb-4" />

                            <div className="flex justify-between items-end mb-5">
                                <span className="text-[14px] font-bold text-[#1A1A2E]">Total</span>
                                <div className="text-right">
                                    <p className="text-[22px] font-extrabold text-[#1A1A2E]">{total.toFixed(2)} €</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Including VAT</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPayment(true)}
                                className="w-full py-3.5 rounded-xl cursor-pointer text-white text-[14px] font-bold hover:opacity-90 active:scale-95 transition-all"
                                style={{ background: 'linear-gradient(to right, #BF003A, #59001C)' }}
                            >
                                Continue to Payment
                            </button>

                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <span className="text-[11px] text-gray-400">Secure 256-bit SSL encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showPayment && (
                <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/45" />}>
                    <PaymentModal
                        amount={total}
                        onClose={() => setShowPayment(false)}
                        checkoutData={{
                            book_id: Number(bookId),
                            delivery_type_id: delivery === 'express' ? 2 : 1,
                            first_name: firstName,
                            last_name: lastName,
                            email,
                            street_house_number: street,
                            postal_code: postalCode,
                            city,
                            country_name: country,
                            coupon_code: coupon || undefined,
                        }}
                    />
                </Suspense>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.94) translateY(16px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes scaleOut {
                    from { opacity: 1; transform: scale(1) translateY(0); }
                    to { opacity: 0; transform: scale(0.94) translateY(12px); }
                }
                .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
                .animate-scaleIn { animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                .animate-fadeOut { animation: fadeOut 0.18s ease forwards; }
                .animate-scaleOut { animation: scaleOut 0.18s ease forwards; }
            `}</style>
        </div>
    );
}