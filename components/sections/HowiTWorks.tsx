"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const steps = [
    {
        title: "Create Your Book",
        points: [
            { icon: "user", text: "Select occasion, theme & cover style" },
            { icon: "grid", text: "Set title, recipient name and deadline" },
        ],
        image: "/1.png",
        blobSide: "left",
    },
    {
        title: "Invite Participants",
        points: [
            { icon: "grid", text: "Share link — no account or app needed" },
            { icon: "user", text: "Everyone adds their personal page" },
        ],
        image: "/2.png",
        blobSide: "right",
    },
    {
        title: "Preview & Order",
        points: [
            { icon: "grid", text: "Flip through and approve your book" },
            { icon: "user", text: "We print & deliver to your door" },
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
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

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
        <section ref={sectionRef} className="bg-[#EEE] py-10 px-5" id="how-it-works">

            {/* Header */}
            <div ref={headerRef} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[12px] font-semibold text-[#7A1E3A]">How it Works</span>
                </div>



                <h2 className="text-[32px] sm:text-[40px] font-extrabold leading-tight">
                    Three Simple Steps to a{" "}
                    <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                        Beautiful Book
                    </span>
                </h2>
                <p className="text-[16px] mt-3 text-[#9CA3AF]">
                    From creating your project to holding a printed book in your hands — the entire{" "}
                    <br className="hidden sm:block" />
                    process is simple, collaborative, and magical.
                </p>
            </div>

            {/* Steps */}
            <div ref={stepsRef} className="max-w-175 mx-auto flex flex-col gap-10">
                {steps.map((step, idx) => {
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

            {/* CTA — View Full How It Works */}
            <div className="text-center mt-10">
                <Link
                    href="/how-it-works"
                    className="inline-block px-8 py-3 rounded-full border border-[#BF003A] text-[#BF003A] text-[14px] font-semibold hover:bg-[#BF003A] hover:text-white transition-colors duration-200"
                >
                    View Full How It Works
                </Link>
            </div>

        </section>
    );
}