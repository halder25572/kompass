"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

type Template = {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
};

const templates: Template[] = [
  {
    id: 1,
    title: "Classic Elegance",
    description: "Timeless design with serif typography and warm tones.",
    image: "/1.jpg",
  },
  {
    id: 2,
    title: "Warm Memories",
    description: "Cozy layouts with soft gradients and photo frames.",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Modern Minimal",
    description: "Clean lines and generous whitespace for impact.",
    image: "/3.jpg",
  },
  {
    id: 4,
    title: "Joyful Celebration",
    description: "Playful colors with confetti-inspired accents.",
    image: "/4.jpg",
  },
  {
    id: 5,
    title: "Garden Party",
    description: "Fresh florals and soft greens for a breezy, outdoor feel.",
    image: "/1.jpg",
  },
];

// ✅ Set to true to show seasonal theme (e.g. during Christmas, Ramadan, etc.)
const SHOW_SEASONAL_THEME = false;

const seasonalTheme = {
  id: 99,
  title: "Seasonal Special",
  description: "A limited-edition theme celebrating the current season.",
  image: "/seasonal.jpg",
  badge: "🎄 Seasonal", // Change emoji/text based on the occasion
};

export default function TemplatesSection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const localizedTemplates: Template[] =
    language === "de"
      ? [
          {
            id: 1,
            title: "Klassische Eleganz",
            description: "Zeitloses Design mit Serifenschrift und warmen Toenen.",
            image: "/1.jpg",
          },
          {
            id: 2,
            title: "Warme Erinnerungen",
            description: "Gemuetliche Layouts mit weichen Farbverlaeufen und Fotorahmen.",
            image: "/2.jpg",
          },
          {
            id: 3,
            title: "Modern Minimal",
            description: "Klare Linien und grosszuegiger Weissraum fuer mehr Wirkung.",
            image: "/3.jpg",
          },
          {
            id: 4,
            title: "Frohes Fest",
            description: "Verspielte Farben mit von Konfetti inspirierten Akzenten.",
            image: "/4.jpg",
          },
          {
            id: 5,
            title: "Gartenparty",
            description: "Frische Blumen und sanftes Gruen fuer ein luftiges Outdoor-Gefuehl.",
            image: "/1.jpg",
          },
        ]
      : templates;

  const localizedSeasonalTheme: Template =
    language === "de"
      ? {
          id: 99,
          title: "Saisonales Highlight",
          description: "Ein limitiertes Design fuer die aktuelle Jahreszeit.",
          image: "/seasonal.jpg",
          badge: "Saisonal",
        }
      : seasonalTheme;

  const displayedTemplates = SHOW_SEASONAL_THEME
    ? [...localizedTemplates, localizedSeasonalTheme]
    : localizedTemplates;

  const text =
    language === "de"
      ? {
          badge: "Themen und Cover",
          headingBefore: "Wunderschoene Buch",
          headingAccent: "Designs",
          subtitle:
            "Waehle professionell gestaltete Themen und Cover, um dein Erinnerungsbuch besonders zu machen.",
          browse: "Alle Themen und Cover ansehen",
        }
      : {
          badge: "Themes and Covers",
          headingBefore: "Beautiful Book",
          headingAccent: "Designs",
          subtitle:
            "Choose from professionally crafted themes and covers to make your memory book truly special.",
          browse: "Browse all themes and covers",
        };

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
            {text.badge}
          </span>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e]"
          >
            {text.headingBefore}{" "}
            <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
              {text.headingAccent}
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-[#6b7280] text-sm sm:text-base max-w-md"
          >
            {text.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
        >
          {displayedTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="template-card bg-white rounded-lg overflow-hidden cursor-pointer relative"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              
              {tpl.badge && typeof tpl.badge === "string" && (
                <div className="absolute top-2 left-2 z-10 bg-[#7A1E3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tpl.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-44 bg-[#f3f4f6] overflow-hidden">
                <Image
                  src={tpl.image}
                  alt={tpl.title}
                  fill
                  className="card-image object-cover"
                />
              </div>

              {/* Card body — no category tag */}
              <div className="p-4 flex flex-col gap-1.5">
                <h3 className="text-[15px] font-bold text-[#1a1a2e]">{tpl.title}</h3>
                <p className="text-[13px] text-[#9CA3AF] leading-relaxed">{tpl.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Browse Button */}
        <div ref={btnRef} className="flex justify-center">
          <Link
            href="/cover"
            className="flex items-center gap-2 border border-[#7A1E3A] text-[#7A1E3A] hover:bg-[#7A1E3A] hover:text-white text-sm font-semibold px-7 py-3 rounded-full transition-all duration-200"
          >
            {text.browse}
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