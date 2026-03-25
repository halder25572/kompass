"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Master timeline — page load entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set(
      [badgeRef.current, headingRef.current, subRef.current,
      ctaRef.current, ratingRef.current, trustRef.current, avatarRef.current],
      { opacity: 0, y: 30 }
    );

    tl
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.75 }, "-=0.3")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
      .to(ratingRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(trustRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
      .to(avatarRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" }, "-=0.2");

    // Stars animate one by one after rating appears
    const stars = ratingRef.current?.querySelectorAll(".star-item");
    if (stars) {
      tl.fromTo(stars,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.3, stagger: 0.07, ease: "back.out(2)" },
        "-=0.4"
      );
    }

    // Avatar images pop in staggered
    const avatarImgs = avatarRef.current?.querySelectorAll(".avatar-img");
    if (avatarImgs) {
      tl.fromTo(avatarImgs,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2)" },
        "-=0.4"
      );
    }

    // Trust badge icons float in
    const trustIcons = trustRef.current?.querySelectorAll(".trust-icon");
    if (trustIcons) {
      tl.fromTo(trustIcons,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: "back.out(1.8)" },
        "-=0.5"
      );
    }

  }, []);

  // Primary button hover
  const handlePrimaryEnter = () => {
    gsap.to(primaryBtnRef.current, { scale: 1.05, boxShadow: "0 12px 28px rgba(191,0,58,0.35)", duration: 0.25, ease: "power2.out" });
    const arrow = primaryBtnRef.current?.querySelector(".primary-arrow");
    if (arrow) gsap.to(arrow, { x: 5, duration: 0.25, ease: "power2.out" });
  };
  const handlePrimaryLeave = () => {
    gsap.to(primaryBtnRef.current, { scale: 1, boxShadow: "0 4px 14px rgba(191,0,58,0.2)", duration: 0.25, ease: "power2.inOut" });
    const arrow = primaryBtnRef.current?.querySelector(".primary-arrow");
    if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.inOut" });
  };

  // Secondary button hover
  const handleSecondaryEnter = () => {
    gsap.to(secondaryBtnRef.current, { scale: 1.04, duration: 0.25, ease: "power2.out" });
  };
  const handleSecondaryLeave = () => {
    gsap.to(secondaryBtnRef.current, { scale: 1, duration: 0.25, ease: "power2.inOut" });
  };

  // Avatar pill hover
  // const handleAvatarEnter = () => {
  //   gsap.to(avatarRef.current, { scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", duration: 0.25, ease: "power2.out" });
  // };
  // const handleAvatarLeave = () => {
  //   gsap.to(avatarRef.current, { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", duration: 0.25, ease: "power2.inOut" });
  // };

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col pt-2.5 items-center text-center max-w-3xl mx-auto gap-6">

        {/* Badge */}
        <div ref={badgeRef} className="flex items-center text-[13px] gap-2 text-[#7A1E3A] text-sm font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Create memories that last forever</span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className="text-[40px] sm:text-[54px] font-extrabold leading-tight tracking-tight">
          <span className="text-[#1a1a2e]">Gather Stories</span>
          <br />
          <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Create Memories</span>{" "}
          <span className="text-[#1a1a2e]">Together</span>
        </h1>

        {/* Subtext */}
        <p ref={subRef} className="text-[#6b7280] text-[16px] max-w-xl leading-relaxed">
          Invite friends and family to contribute personal pages with photos, messages, and memories. We&apos;ll turn them into a beautiful print-ready book.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            ref={primaryBtnRef}
            href="#"
            className="flex items-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-7 py-3.5 rounded-full"
            style={{ boxShadow: "0 4px 14px rgba(191,0,58,0.2)" }}
            onMouseEnter={handlePrimaryEnter}
            onMouseLeave={handlePrimaryLeave}
          >
            Start Your Book
            <svg className="primary-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            ref={secondaryBtnRef}
            href="#"
            className="flex items-center gap-2 border border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
            onMouseEnter={handleSecondaryEnter}
            onMouseLeave={handleSecondaryLeave}
          >
            See How It Works
          </Link>
        </div>

        {/* Rating */}
        <div ref={ratingRef} className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="star-item inline-block" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <svg className="star-item inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="text-[#1a1a2e] text-sm font-bold">4.9/5</span>
          <span className="text-[#9ca3af] text-sm">from 2,400+ creators</span>
        </div>

        {/* Trust badges */}
        <div ref={trustRef} className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6b7280] mt-1">
          {[
            { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, stroke: "#16a34a", label: "Secure & Private" },
            { icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>, stroke: "#6b7280", label: "50,000+ books created" },
            { icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, stroke: "#b91c1c", label: "Loved by families worldwide" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <svg className="trust-icon inline-block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {item.icon}
              </svg>
              {item.label}
            </span>
          ))}
        </div>
        <div className="">
          <div className="flex gap-2">
            <Image src="/Maskgroup.png" alt="images" width={50} height={38} />
            <h2 className="text-2xl font-semibold">Free shipping in Germany, Austria and Switzerland</h2>
          </div>
          <p className="text-[16px] font-medium text-[#9CA3AF] pb-0">Fast delivery to AT & CH.</p>
        </div>
      </div>
    </section>
  );
}