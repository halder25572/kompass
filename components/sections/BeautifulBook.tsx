"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const templates = [
  {
    id: 1,
    category: "Birthday",
    categoryColor: "#7A1E3A",
    title: "Classic Elegance",
    description: "Timeless design with serif typography and warm tones.",
    image: "/1.jpg",
  },
  {
    id: 2,
    category: "Anniversary",
    categoryColor: "#7A1E3A",
    title: "Warm Memories",
    description: "Cozy layouts with soft gradients and photo frames.",
    image: "/2.jpg",
  },
  {
    id: 3,
    category: "Farewell",
    categoryColor: "#7A1E3A",
    title: "Modern Minimal",
    description: "Clean lines and generous whitespace for impact.",
    image: "/3.jpg",
  },
  {
    id: 4,
    category: "Graduation",
    categoryColor: "#7A1E3A",
    title: "Joyful Celebration",
    description: "Playful colors with confetti-inspired accents.",
    image: "/4.jpg",
  },
];

export default function TemplatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Badge pop in
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      // Title slide up
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
      });

      // Subtitle fade
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });

      // Cards staggered reveal
      const cards = cardsRef.current?.querySelectorAll(".template-card");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          scale: 0.94,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      // Button fade up
      gsap.from(btnRef.current, {
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover animations
  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -6,
      scale: 1.02,
      boxShadow: "0 12px 32px rgba(122,30,58,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
    const img = e.currentTarget.querySelector(".card-image");
    if (img) gsap.to(img, { scale: 1.07, duration: 0.4, ease: "power2.out" });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    const img = e.currentTarget.querySelector(".card-image");
    if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.inOut" });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4"
      style={{ backgroundColor: "#ECEBEE" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-10 gap-3">
          <span
            ref={badgeRef}
            className="text-[18px] font-bold tracking-[0.18em] uppercase text-[#7A1E3A]"
          >
            Templates
          </span>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e]"
          >
            Beautiful Book{" "}
            <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
              Designs
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-[#6b7280] text-sm sm:text-base max-w-md"
          >
            Choose from professionally crafted templates to make your memory book truly special.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="template-card bg-white rounded-lg overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              {/* Image */}
              <div className="relative w-full h-44 bg-[#f3f4f6] overflow-hidden">
                <Image
                  src={tpl.image}
                  alt={tpl.title}
                  fill
                  className="card-image object-cover"
                />
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col gap-1.5">
                <span
                  className="text-xs font-semibold"
                  style={{ color: tpl.categoryColor }}
                >
                  {tpl.category}
                </span>
                <h3 className="text-[15px] font-bold text-[#1a1a2e]">{tpl.title}</h3>
                <p className="text-[13px] text-[#9CA3AF] leading-relaxed">{tpl.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Browse Button */}
        <div ref={btnRef} className="flex justify-center">
          <Link href="/Templates"
            className="flex items-center gap-2 border border-[#7A1E3A] text-[#7A1E3A] hover:bg-[#7A1E3A] hover:text-white text-sm font-semibold px-7 py-3 rounded-full transition-all duration-200"
          >
            Browse All Templates
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}