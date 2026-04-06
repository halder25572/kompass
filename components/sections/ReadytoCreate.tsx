"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ReadytoCreate = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    // Scroll reveal
    useEffect(() => {
        gsap.set([headingRef.current, paraRef.current, btnRef.current], {
            opacity: 0,
            y: 40,
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                gsap.to(headingRef.current, {
                    opacity: 1, y: 0,
                    duration: 0.75,
                    ease: "power3.out",
                });
                gsap.to(paraRef.current, {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    delay: 0.15,
                    ease: "power3.out",
                });
                gsap.to(btnRef.current, {
                    opacity: 1, y: 0,
                    duration: 0.65,
                    delay: 0.3,
                    ease: "back.out(1.6)",
                });

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Button hover
    const handleBtnEnter = () => {
        gsap.to(btnRef.current, {
            scale: 1.06,
            boxShadow: "0 12px 32px rgba(191,0,58,0.35)",
            duration: 0.25,
            ease: "power2.out",
        });
        const arrow = btnRef.current?.querySelector(".btn-arrow");
        if (arrow) {
            gsap.to(arrow, { x: 5, duration: 0.25, ease: "power2.out" });
        }
    };

    const handleBtnLeave = () => {
        gsap.to(btnRef.current, {
            scale: 1,
            boxShadow: "0 4px 16px rgba(191,0,58,0.2)",
            duration: 0.25,
            ease: "power2.inOut",
        });
        const arrow = btnRef.current?.querySelector(".btn-arrow");
        if (arrow) {
            gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.inOut" });
        }
    };

    const handleBtnClick = () => {
        gsap.to(btnRef.current, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.in",
            yoyo: true,
            repeat: 1,
        });
    };

    return (
        <section ref={sectionRef} className="py-18 bg-[#EEE]">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h1
                    ref={headingRef}
                    className="text-2xl lg:text-[36px] font-extrabold leading-snug"
                >
                    Ready to Create Something <br />
                    <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                        Beautiful?
                    </span>
                </h1>

                <p
                    ref={paraRef}
                    className="text-[#9CA3AF] text-[16px] mt-1.5"
                >
                    Start collecting memories today and surprise someone with a <br className="hidden sm:block" />
                    one-of-a-kind book they&apos;ll treasure forever.
                </p>

                <Link
                    ref={btnRef}
                    href="/create"
                    className="inline-flex items-center gap-2 mt-8 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-7 py-3.5 rounded-full cursor-pointer"
                    style={{ boxShadow: "0 4px 16px rgba(191,0,58,0.2)" }}
                    onMouseEnter={handleBtnEnter}
                    onMouseLeave={handleBtnLeave}
                    onClick={handleBtnClick}
                >
                    Create Your First Book
                    <svg
                        className="btn-arrow"
                        width="16" height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default ReadytoCreate;