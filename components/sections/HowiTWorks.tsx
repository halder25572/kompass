"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

const steps = [
    {
        title: "Choose Occasion, Theme & Cover",
        points: [
            { icon: "user", text: "Select Occasion" },
            { icon: "grid", text: "Choose from premium templates" },
        ],
        image: "/1.png",
        blobSide: "left",
    },
    {
        title: "Invite Participants",
        points: [
            { icon: "grid", text: "Gather information by inviting" },
            { icon: "user", text: "Easy invite via link or mail" },
        ],
        image: "/2.png",
        blobSide: "right",
    },
    {
        title: "Preview & Order",
        points: [
            { icon: "grid", text: "Preview and approve your book" },
            { icon: "user", text: "Confirm print order" },
        ],
        image: "/3.png",
        blobSide: "left",
    },
];

function UserIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b1a34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function GridIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b1a34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
        </svg>
    );
}

export default function HowItWorksSection() {
    const { language } = useLanguage();
    const headerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    const text = language === "de"
        ? {
            badge: "So funktioniert's",
            headingBefore: "Drei einfache Schritte zu einem",
            headingAccent: "wunderschoenen Buch",
            subtitle: "Vom Erstellen bis zum gedruckten Buch in deinen Haenden - der Prozess ist einfach, gemeinsam und besonders.",
            createBook: "Buch erstellen",
            step1: "Schritt 1 - Buch erstellen",
            step2: "Schritt 2 - Teilnehmende einladen",
            step3: "Schritt 3 - Vorschau & Bestellung",
            ready: "Bereit, etwas Wunderschoenes zu erstellen?",
            cta: "Buch erstellen",
        }
        : {
            badge: "How it Works",
            headingBefore: "Three Simple Steps to a",
            headingAccent: "Beautiful Book",
            subtitle: "From creating your project to holding a printed book in your hands - the entire process is simple, collaborative, and magical.",
            createBook: "Create Your Book",
            step1: "Step 1 - Create Your Book",
            step2: "Step 2 - Invite Participants",
            step3: "Step 3 - Preview & Order",
            ready: "Ready to Create Something Beautiful?",
            cta: "Create Your Book",
        };

    const localizedSteps = language === "de"
        ? [
            {
                ...steps[0],
                title: "Anlass und Stil waehlen",
                points: [
                    { icon: "user", text: "Anlass waehlen" },
                    { icon: "grid", text: "Premium-Vorlagen auswaehlen" },
                ],
            },
            {
                ...steps[1],
                title: "Teilnehmende einladen",
                points: [
                    { icon: "grid", text: "Informationen per Einladung sammeln" },
                    { icon: "user", text: "Einfach per Link oder E-Mail einladen" },
                ],
            },
            {
                ...steps[2],
                title: "Buch drucken",
                points: [
                    { icon: "grid", text: "Buch in Vorschau pruefen und freigeben" },
                    { icon: "user", text: "Druckbestellung bestaetigen" },
                ],
            },
        ]
        : steps;

    // Header reveal
    useEffect(() => {
        const headerChildren = Array.from(headerRef.current?.children ?? []);
        gsap.set(headerChildren, { opacity: 0, y: 35 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                gsap.to(headerChildren, {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.13,
                    ease: "power3.out",
                });
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.25 });

        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    // Steps reveal — each row slides in from its blob side
    useEffect(() => {
        if (!stepsRef.current) return;
        const rows = stepsRef.current.querySelectorAll<HTMLElement>(".step-row");

        rows.forEach((row, idx) => {
            const blobLeft = steps[idx].blobSide === "left";
            gsap.set(row, { opacity: 0, x: blobLeft ? -80 : 80, scale: 0.96 });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    gsap.to(row, {
                        opacity: 1, x: 0, scale: 1,
                        duration: 0.75,
                        ease: "power3.out",
                        clearProps: "transform",
                    });
                    const content = row.querySelector(".step-content");
                    const title = content?.querySelector("h3");
                    const points = content?.querySelectorAll(".step-point");
                    if (title) gsap.fromTo(title,
                        { opacity: 0, y: 12 },
                        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
                    );
                    if (points) gsap.fromTo(points,
                        { opacity: 0, x: 10 },
                        { opacity: 1, x: 0, duration: 0.4, delay: 0.45, stagger: 0.1, ease: "power2.out" }
                    );
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.2 });

            observer.observe(row);
        });
    }, []);

    return (
        <section className="bg-[#EEE] py-10 px-5" id="how-it-works">

            {/* Header */}
            <div ref={headerRef} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[12px] font-semibold text-[#7A1E3A]">{text.badge}</span>
                </div>

                <h2 className="text-[32px] sm:text-[40px] font-extrabold leading-tight">
                    {text.headingBefore}{" "}
                    <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                        {text.headingAccent}
                    </span>
                </h2>
                <p className="text-[16px] mt-3 text-[#9CA3AF]">
                    {text.subtitle}
                </p>
            </div>

            {/* Steps */}
            <div ref={stepsRef} className="max-w-175 mx-auto flex flex-col gap-10">
                {localizedSteps.map((step, idx) => {
                    const blobLeft = step.blobSide === "left";

                    return (
                        <div
                            key={idx}
                            className="step-row relative w-full bg-no-repeat"
                            style={{
                                paddingBottom: "24.65%",
                                backgroundImage: `url(${step.image})`,
                                backgroundSize: "100% 100%",
                                marginLeft: !blobLeft
                                    ? "clamp(0px, calc((100vw - 1024px) * 300 / 376), 300px)"
                                    : undefined,
                            }}
                        >
                            <div
                                className="step-content absolute inset-y-0 flex flex-col justify-center"
                                style={{
                                    left: blobLeft ? "38%" : "24%",
                                    right: blobLeft ? "3%" : "18%",
                                }}
                            >
                                <h3
                                    className="font-bold text-[#1a1a2e] leading-tight mb-1 mt-10"
                                    style={{ fontSize: "clamp(11px, 1.8vw, 24px)" }}
                                >
                                    {step.title}
                                </h3>

                                <div className="flex flex-col gap-1">
                                    {step.points.map((point, i) => (
                                        <div key={i} className="step-point flex items-center gap-1.5">
                                            {point.icon === "user" ? <UserIcon /> : <GridIcon />}
                                            <span
                                                className="text-[#6b7280]"
                                                style={{ fontSize: "clamp(9px, 1.1vw, 14px)" }}
                                            >
                                                {point.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Detailed Step Sections */}
            <div className="max-w-5xl mx-auto mt-14 rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-[0_16px_50px_rgba(17,24,39,0.08)] text-[#111827]">

                <section className="pb-10 border-b border-[#E5E7EB]">
                    <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-tight text-[#111827]">{text.step1}</h3>
                    <p className="mt-2 text-[18px] font-bold italic">Choose Occasion, Theme & Cover</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-[#374151]">
                        Start by selecting the occasion for your book — birthday, school, work, love, family or a seasonal celebration.
                        This sets the tone and automatically loads the matching question set.
                    </p>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">Then choose:</p>
                    <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#374151] space-y-1">
                        <li><span className="font-bold">Theme:</span> the interior look and feel of the book</li>
                        <li><span className="font-bold">Cover Style:</span> one of our premium, universal cover designs</li>
                        <li><span className="font-bold">Book Details:</span> title, subtitle, recipient name and deadline</li>
                    </ul>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
                        Everything is clean, simple and beautifully designed so your book feels premium from the very beginning.
                    </p>
                    <p className="mt-3 text-[16px] font-bold">Highlights:</p>
                    <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#374151] space-y-1">
                        <li>16 different occasions and sub-occasions</li>
                        <li>Interior theme customization</li>
                        <li>5 elegant, universal cover styles</li>
                        <li>Smart question set based on the selected occasion</li>
                    </ul>
                </section>

                <section className="py-10 border-b border-[#E5E7EB]">
                    <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-tight text-[#111827]">{text.step2}</h3>
                    <p className="mt-2 text-[18px] font-bold italic">Friends, family, classmates or colleagues — everyone can join</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-[#374151]">
                        Share your invitation link with the people who matter most.
                        Each participant fills in their own page with warm messages, memories and photos.
                    </p>
                    <p className="text-[16px] leading-relaxed text-[#374151]">No account needed.</p>
                    <p className="text-[16px] leading-relaxed text-[#374151]">No app download.</p>
                    <p className="text-[16px] leading-relaxed text-[#374151]">Just click, write, upload, done.</p>
                    <p className="mt-3 text-[16px] font-bold">What makes it special:</p>
                    <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#374151] space-y-1">
                        <li>Everyone contributes a personal page</li>
                        <li>Each page has the same easy, guided layout</li>
                        <li>Participants can write in any language</li>
                        <li>Automatic email reminders</li>
                        <li>You can follow the progress at any time</li>
                    </ul>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
                        Together, you create a meaningful gift built from many hearts.
                    </p>
                </section>

                <section className="py-10 border-b border-[#E5E7EB]">
                    <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-tight text-[#111827]">{text.step3}</h3>
                    <p className="mt-2 text-[18px] font-bold italic">See the whole book before printing</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-[#374151]">
                        Once all contributions are in, or when you decide the book is ready, you can:
                    </p>
                    <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#374151] space-y-1">
                        <li>Flip through the complete book</li>
                        <li>Check the layout and content</li>
                        <li>Edit the order of pages</li>
                        <li>Add optional photo pages</li>
                        <li>Make final adjustments</li>
                    </ul>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
                        When everything looks perfect, place your order.
                        We print your book with premium lay-flat quality and deliver it to your door.
                    </p>
                    <p className="mt-3 text-[16px] font-bold">Printing Highlights:</p>
                    <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#374151] space-y-1">
                        <li>Premium lay-flat binding</li>
                        <li>High-quality paper printed in Germany</li>
                        <li>Free shipping within Germany</li>
                        <li>Fast delivery to Austria and Switzerland</li>
                        <li>Printed with care and attention</li>
                    </ul>
                </section>

                <section className="pt-10 text-center">
                    <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-tight text-[#111827]">{text.ready}</h3>
                    <Link
                        href="/create"
                        className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-[14px] font-semibold text-white"
                        style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)" }}
                    >
                        {text.cta}
                    </Link>
                </section>
            </div>
        </section>
    );
}