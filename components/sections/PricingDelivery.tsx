"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";

const pricingTiers = [
    { range: "0 – 4 friends", price: "€5.50", unit: "per friend" },
    { range: "5 – 9 friends", price: "€3.75", unit: "per friend" },
    { range: "10 – 14 friends", price: "€3.05", unit: "per friend" },
    { range: "15 – 19 friends", price: "€2.75", unit: "per friend" },
    { range: "20 – 29 friends", price: "€2.50", unit: "per friend" },
    { range: "30 – 39 friends", price: "€2.35", unit: "per friend" },
    { range: "40 – 49 friends", price: "€1.95", unit: "per friend" },
    { range: "50 – 74 friends", price: "€1.75", unit: "per friend" },
    { range: "75 or more friends", price: "€1.50", unit: "per friend" },
];

const deliveryOptions = [
    {
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
        title: "Standard Shipping",
        description: "Printed books delivered in 7–10 business days. Tracked shipping included.",
    },
    {
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
        title: "Express Shipping",
        description: "Express delivery in 3–5 business days available for printed orders.",
    },
];

export default function PricingDelivery() {
    const { language } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const pricingCardRef = useRef<HTMLDivElement>(null);
    const pricingRowsRef = useRef<HTMLDivElement>(null);
    const extrasRef = useRef<HTMLDivElement>(null);
    const deliveryHeaderRef = useRef<HTMLDivElement>(null);
    const deliveryGridRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const text = language === "de"
        ? {
            simple: "Einfach & transparent",
            title: "Preise & Lieferung",
            subtitle: "Starte kostenlos und upgrade erst beim Druck.",
            freeShipping: "Kostenloser Versand in Deutschland",
            fastDelivery: "Schnelle Lieferung nach Oesterreich und in die Schweiz.",
            costPerFriend: "Kosten pro Freund",
            priceDepends: "Der Preis haengt von der Anzahl der Teilnehmenden ab",
            optionalExtras: "Optionale Extras",
            titleCover: "Personalisierter Titel auf dem Cover",
            photoPage: "Fotoseite",
            perPages: "pro 1-3 Seiten",
            annualReview: "Jahresrueckblick",
            perSeven: "pro 7 Seiten",
            extraCopies: "Weitere Exemplare",
            extraDiscount: "Du erhaeltst 35% Rabatt auf jedes weitere identische Familienbuch.",
            extraContact: "Wenn du mehr als 15 Exemplare bestellen moechtest, helfen wir dir gerne mit einem unverbindlichen Angebot.",
            deliveryOptions: "Lieferoptionen",
            receiveTitlePrefix: "So",
            receiveTitleAccent: "erhaeltst",
            receiveTitleSuffix: "du dein Buch",
            startBook: "Buch starten",
        }
        : {
            simple: "Simple & transparent",
            title: "Pricing & Delivery",
            subtitle: "Start free, upgrade when you're ready to print.",
            freeShipping: "Free shipping in Germany",
            fastDelivery: "Fast delivery to Austria and Switzerland.",
            costPerFriend: "Cost per friend",
            priceDepends: "Price depends on the number of friends participating",
            optionalExtras: "Optional Extras",
            titleCover: "Personalised title on cover",
            photoPage: "Photo page",
            perPages: "per 1-3 pages",
            annualReview: "Annual review",
            perSeven: "per 7 pages",
            extraCopies: "Extra Copies",
            extraDiscount: "You will receive a 35% discount on each additional identical family book.",
            extraContact: "If you would like to order more than 15 copies, please contact us for a no-obligation quote.",
            deliveryOptions: "Delivery Options",
            receiveTitlePrefix: "How You'll",
            receiveTitleAccent: "Receive",
            receiveTitleSuffix: "Your Book",
            startBook: "Start Your Book",
        };

    const localizedTiers = language === "de"
        ? [
            { range: "0 - 4 Freunde", price: "€5.50", unit: "pro Freund" },
            { range: "5 - 9 Freunde", price: "€3.75", unit: "pro Freund" },
            { range: "10 - 14 Freunde", price: "€3.05", unit: "pro Freund" },
            { range: "15 - 19 Freunde", price: "€2.75", unit: "pro Freund" },
            { range: "20 - 29 Freunde", price: "€2.50", unit: "pro Freund" },
            { range: "30 - 39 Freunde", price: "€2.35", unit: "pro Freund" },
            { range: "40 - 49 Freunde", price: "€1.95", unit: "pro Freund" },
            { range: "50 - 74 Freunde", price: "€1.75", unit: "pro Freund" },
            { range: "75 oder mehr Freunde", price: "€1.50", unit: "pro Freund" },
        ]
        : pricingTiers;

    const localizedDelivery = language === "de"
        ? [
            {
                ...deliveryOptions[0],
                title: "Standardversand",
                description: "Gedruckte Buecher in 7-10 Werktagen. Sendungsverfolgung inklusive.",
            },
            {
                ...deliveryOptions[1],
                title: "Expressversand",
                description: "Expresslieferung in 3-5 Werktagen fuer gedruckte Bestellungen.",
            },
        ]
        : deliveryOptions;

    useEffect(() => {
        const observe = (el: HTMLElement | null, fn: () => void, threshold = 0.2) => {
            if (!el) return;
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    fn();
                    obs.unobserve(entry.target);
                });
            }, { threshold });
            obs.observe(el);
        };

        // Header
        const headerChildren = Array.from(headerRef.current?.children ?? []);
        gsap.set(headerChildren, { opacity: 0, y: 30 });
        observe(headerRef.current, () => {
            gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
        });

        // Pricing card slide up
        gsap.set(pricingCardRef.current, { opacity: 0, y: 50, scale: 0.97 });
        observe(pricingCardRef.current, () => {
            gsap.to(pricingCardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
            // Stagger pricing rows
            const rows = pricingRowsRef.current?.querySelectorAll(".pricing-row");
            if (rows) {
                gsap.fromTo(rows,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.3, ease: "power2.out" }
                );
            }
        });

        // Extras cards
        const extraCards = extrasRef.current?.querySelectorAll(".extra-card");
        if (extraCards) gsap.set(extraCards, { opacity: 0, y: 40, scale: 0.96 });
        observe(extrasRef.current, () => {
            if (extraCards) gsap.to(extraCards, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" });
        });

        // Delivery header
        const deliveryHeaderChildren = Array.from(deliveryHeaderRef.current?.children ?? []);
        gsap.set(deliveryHeaderChildren, { opacity: 0, y: 25 });
        observe(deliveryHeaderRef.current, () => {
            gsap.to(deliveryHeaderChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        });

        // Delivery options
        const deliveryItems = deliveryGridRef.current?.querySelectorAll(".delivery-item");
        if (deliveryItems) gsap.set(deliveryItems, { opacity: 0, y: 35 });
        observe(deliveryGridRef.current, () => {
            if (deliveryItems) gsap.to(deliveryItems, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" });
        });

        // CTA
        gsap.set(ctaRef.current, { opacity: 0, y: 25 });
        observe(ctaRef.current, () => {
            gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" });
        }, 0.3);

    }, []);

    // Pricing row hover
    const handleRowEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { backgroundColor: "#fdf2f4", x: 4, duration: 0.2, ease: "power2.out" });
        const price = e.currentTarget.querySelector(".price-val");
        if (price) gsap.to(price, { scale: 1.1, duration: 0.2, ease: "back.out(2)" });
    };
    const handleRowLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { backgroundColor: "", x: 0, duration: 0.2, ease: "power2.inOut" });
        const price = e.currentTarget.querySelector(".price-val");
        if (price) gsap.to(price, { scale: 1, duration: 0.2 });
    };

    // Delivery icon hover
    const handleDeliveryEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const icon = e.currentTarget.querySelector(".delivery-icon");
        if (icon) gsap.to(icon, { scale: 1.12, rotate: 6, duration: 0.25, ease: "back.out(2)" });
        gsap.to(e.currentTarget, { y: -4, duration: 0.25, ease: "power2.out" });
    };
    const handleDeliveryLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const icon = e.currentTarget.querySelector(".delivery-icon");
        if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.inOut" });
        gsap.to(e.currentTarget, { y: 0, duration: 0.25, ease: "power2.inOut" });
    };

    // CTA button hover
    const handleBtnEnter = () => {
        gsap.to(btnRef.current, { scale: 1.06, boxShadow: "0 12px 30px rgba(191,0,58,0.3)", duration: 0.25, ease: "power2.out" });
        const arrow = btnRef.current?.querySelector(".cta-arrow");
        if (arrow) gsap.to(arrow, { x: 5, duration: 0.25, ease: "power2.out" });
    };
    const handleBtnLeave = () => {
        gsap.to(btnRef.current, { scale: 1, boxShadow: "0 4px 14px rgba(191,0,58,0.15)", duration: 0.25, ease: "power2.inOut" });
        const arrow = btnRef.current?.querySelector(".cta-arrow");
        if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.inOut" });
    };

    return (
        <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8" style={{
            backgroundImage: "url('/images/bg1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            {/* Header */}
            <div ref={headerRef} className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[12px] font-semibold text-[#7A1E3A]">{text.simple}</span>
                </div>


                <h2 className="text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-[#1a1a2e] leading-tight">
                    {text.title}
                </h2>
                <p className="text-[13px] sm:text-[15px] text-[#9CA3AF] my-6">
                    {text.subtitle}
                </p>
                <div className="mb-20">
                    <div className="flex items-center gap-2 justify-center">
                        <Image src="/Maskgroup.png" alt="images" width={50} height={38} />
                        <h2 className="text-2xl font-semibold">{text.freeShipping}</h2>
                    </div>
                    <p className="text-[16px] font-medium text-[#9CA3AF] pb-0">{text.fastDelivery}</p>
                </div>
            </div>

            {/* Pricing Card */}
            <div ref={pricingCardRef} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f3f4f6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div>
                        <p className="text-[14px] font-bold text-[#1a1a2e]">{text.costPerFriend}</p>
                        <p className="text-[11px] text-[#9CA3AF]">{text.priceDepends}</p>
                    </div>
                </div>
                <div ref={pricingRowsRef} className="divide-y divide-[#f3f4f6]">
                    {localizedTiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`pricing-row flex items-center justify-between px-6 py-3 cursor-default ${idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}
                            onMouseEnter={handleRowEnter}
                            onMouseLeave={handleRowLeave}
                        >
                            <span className="text-[13px] text-[#374151]">{tier.range}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="price-val text-[14px] font-bold text-[#7A1E3A] inline-block">{tier.price}</span>
                                <span className="text-[11px] text-[#9CA3AF]">{tier.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Extras */}
            <div ref={extrasRef} className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="extra-card bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                        <p className="text-[14px] font-bold text-[#1a1a2e]">{text.optionalExtras}</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] text-[#374151]">{text.titleCover}</span>
                            <span className="text-[13px] font-bold text-[#7A1E3A]">€0.50</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                            <div><p className="text-[12px] text-[#374151]">{text.photoPage}</p><p className="text-[10px] text-[#9CA3AF]">{text.perPages}</p></div>
                            <span className="text-[13px] font-bold text-[#7A1E3A] shrink-0">€2.25</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                            <div><p className="text-[12px] text-[#374151]">{text.annualReview}</p><p className="text-[10px] text-[#9CA3AF]">{text.perSeven}</p></div>
                            <span className="text-[13px] font-bold text-[#7A1E3A] shrink-0">€2.25</span>
                        </div>
                    </div>
                </div>
                <div className="extra-card bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <p className="text-[14px] font-bold text-[#1a1a2e]">{text.extraCopies}</p>
                    </div>
                    <p className="text-[12px] text-[#374151] leading-relaxed">
                        {text.extraDiscount}
                    </p>
                    <p className="text-[12px] text-[#374151] leading-relaxed mt-3">
                        {text.extraContact}
                    </p>
                </div>
            </div>

            {/* Delivery */}
            <div className="max-w-2xl mx-auto">
                <div ref={deliveryHeaderRef} className="text-center mb-8">
                    <p className="text-[11px] font-bold text-[#7A1E3A] uppercase tracking-widest mb-2">{text.deliveryOptions}</p>
                    <h3 className="text-[24px] sm:text-[32px] font-extrabold text-[#1a1a2e] leading-tight">
                        {text.receiveTitlePrefix}{" "}
                        <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Receive</span>{" "}
                        {text.receiveTitleSuffix}
                    </h3>
                </div>

                <div ref={deliveryGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {localizedDelivery.map((opt, idx) => (
                        <div
                            key={idx}
                            className="delivery-item flex flex-col gap-2 cursor-default"
                            onMouseEnter={handleDeliveryEnter}
                            onMouseLeave={handleDeliveryLeave}
                        >
                            <div className="delivery-icon w-10 h-10 rounded-xl bg-[#f9f0f2] flex items-center justify-center">
                                {opt.icon}
                            </div>
                            <p className="text-[14px] font-bold text-[#1a1a2e]">{opt.title}</p>
                            <p className="text-[12px] text-[#6b7280] leading-relaxed">{opt.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="flex justify-center mt-12">
                    <button
                        ref={btnRef}
                        className="flex items-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[14px] font-semibold px-8 py-3.5 rounded-full cursor-pointer"
                        style={{ boxShadow: "0 4px 14px rgba(191,0,58,0.15)" }}
                        onMouseEnter={handleBtnEnter}
                        onMouseLeave={handleBtnLeave}
                    >
                        {text.startBook}
                        <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

        </section>
    );
}