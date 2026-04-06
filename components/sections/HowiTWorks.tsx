"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
    {
        title: "Choose Occasion & Style",
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
        title: "Print Your Book",
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
            // blob-left rows slide from left, blob-right rows slide from right
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
                    // Animate text content inside
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
                <h1 className="text-[#7A1E3A] uppercase text-[12px] font-bold">How it Works</h1>
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
        </section>
    );
}