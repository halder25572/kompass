"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const themes = [
  { id: 1, title: "Warm & Nostalgic",   tag: "Golden Tones",    detail: "Amber hues, soft grain textures and vintage-inspired layouts that feel like flipping through an old photo album.", image: "/icon/1.jpg", badge: "Most Loved" },
  { id: 2, title: "Modern Minimal",     tag: "Clean Lines",     detail: "Crisp white space, strong typography and restrained accents. Lets your memories speak without distraction.", image: "/icon/2.jpg", badge: "Trending" },
  { id: 3, title: "Floral Romance",     tag: "Soft Botanicals", detail: "Delicate flower motifs and blush palettes woven around every page for a tender, garden-party feel.", image: "/icon/3.jpg", badge: "Popular" },
  { id: 4, title: "Celestial Dream",    tag: "Stars & Sky",     detail: "Midnight gradients, golden constellations and a sense of wonder — perfect for milestone moments.", image: "/icon/4.jpg", badge: "New" },
  { id: 5, title: "Tropical Escape",    tag: "Bold & Bright",   detail: "Lush leaves, vivid colors and an energy that captures sun-soaked celebrations and adventures.", image: "/icon/5.jpg", badge: "Vibrant" },
  { id: 6, title: "Elegant Marble",     tag: "Luxury Feel",     detail: "Sophisticated white marble veining paired with gold accents for a timeless, high-end aesthetic.", image: "/icon/6.jpg", badge: "Premium" },
];

const covers = [
  { id: 1, title: "Solid Color",        tag: "Minimal",         detail: "A bold, single-color cover that puts your title front and center. Timeless and refined.", image: "/icon/11.jpg", badge: "Minimal" },
  { id: 2, title: "Soft Pattern",       tag: "Subtle Texture",  detail: "Delicate repeating patterns add warmth and personality without overwhelming your photos.", image: "/icon/12.jpg", badge: "Popular" },
  { id: 3, title: "Full Photo",         tag: "Most Personal",   detail: "Let a single stunning photograph fill the entire cover — the most personal statement.", image: "/icon/15.jpg", badge: "Most Loved" },
  { id: 4, title: "Split / Duo-Tone",   tag: "Editorial",       detail: "Two contrasting tones divided across the cover for a striking, editorial look.", image: "/icon/14.jpg", badge: "Trending" },
  { id: 5, title: "Framed Photo",       tag: "Classic Border",  detail: "Your photo set inside an elegant frame — classic, polished, and always beautiful.", image: "/icon/15.jpg", badge: "Classic" },
];

type Item = typeof themes[0];

// ─── CARD ──────────────────────────────────────────────────────────────────────
function Card({ item, btnLabel }: { item: Item; btnLabel: string }) {
  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -5, duration: 0.22, ease: "power2.out" });
    const img = e.currentTarget.querySelector(".tc-img");
    if (img) gsap.to(img, { scale: 1.06, duration: 0.35, ease: "power2.out" });
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.22, ease: "power2.inOut" });
    const img = e.currentTarget.querySelector(".tc-img");
    if (img) gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.inOut" });
  };

  return (
    <div
      className="tc-card bg-white rounded-[18px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image container — fixed height with relative positioning for Next.js fill */}
      <div className="relative h-50 overflow-hidden bg-[#ddd8d3] shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 33vw"
          className="tc-img"
        />
        <span className="absolute top-2.5 right-2.5 bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[10px] font-bold px-2.25 py-0.75 rounded-full z-2">
          {item.badge}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 px-4.5 pt-4 pb-5">
        <p className="text-[11px] font-bold text-[#BF003A] uppercase tracking-[0.6px] mb-1">
          {item.tag}
        </p>
        <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed flex-1">
          {item.detail}
        </p>
        <button
          className="mt-3.5 w-full bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[12px] font-bold py-2.25 rounded-[10px] border-none cursor-pointer transition-opacity duration-150 hover:opacity-85"
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function ThemesAndCoversPage() {
  const [activeTab, setActiveTab] = useState<"themes" | "covers">("themes");
  const gridRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const items    = activeTab === "themes" ? themes : covers;
  const btnLabel = activeTab === "themes" ? "Use This Theme" : "Use This Cover";

  // header entrance animation
  useEffect(() => {
    const els = Array.from(headerRef.current?.children ?? []);
    gsap.set(els, { opacity: 0, y: 24 });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        gsap.to(els, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" });
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    if (headerRef.current) io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  // cards entrance on tab switch
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tc-card") ?? [];
    gsap.fromTo(cards,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: "power3.out" }
    );
  }, [activeTab]);

  return (
    <main className="bg-[#EEE8EA] min-h-screen font-sans">
      <div className="max-w-270 mx-auto px-6 pt-15 pb-20">

        {/* ── Page Header ── */}
        <div ref={headerRef} className="text-center mb-11">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#F3C5CE] rounded-full px-3.5 py-1.25 mb-4.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-[12px] font-semibold text-[#7A1E3A]">Customize Your Book</span>
          </div>

          <h1 className="text-[clamp(32px,5vw,54px)] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-3.5">
            Themes &{" "}
            <span className="bg-linear-to-r from-[#BF003A] to-[#59001C] bg-clip-text text-transparent">
              Covers
            </span>
          </h1>

          <p className="text-[14px] text-gray-400 max-w-110 mx-auto leading-[1.65]">
            Pick an interior theme to set the mood, then choose a cover style to make it yours.
          </p>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div className="flex justify-center mb-3">
          <div className="relative inline-flex bg-white rounded-full p-1.25 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            {/* sliding pill */}
            <div
              className={`absolute top-1.25 bottom-1.25 w-[calc(50%-7px)] bg-linear-to-r from-[#BF003A] to-[#59001C] rounded-full transition-[left] duration-300 ease-in-out z-0 ${
                activeTab === "themes" ? "left-1.25" : "left-[calc(50%+2px)]"
              }`}
            />

            {(["themes", "covers"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-9 py-2.5 rounded-full border-none bg-transparent text-[14px] font-bold cursor-pointer transition-colors duration-200 min-w-35 tracking-[0.1px] ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                {tab === "themes" ? "Themes" : "Covers"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab subtitle ── */}
        <p className="text-center text-[13px] text-gray-400 mb-9 leading-[1.6]">
          {activeTab === "themes"
            ? "Choose a theme that flows through every page — layouts, color palette, and decorative details."
            : "Browse five distinct cover styles — each a different way to make your memory book feel uniquely yours."}
        </p>

        {/* ── Cards Grid ── */}
        <div
          ref={gridRef}
          className="grid gap-4.5 mb-15"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}
        >
          {items.map(item => <Card key={item.id} item={item} btnLabel={btnLabel} />)}
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <p className="text-[14px] text-gray-500 mb-4">
            Ready to create your book? Choose your style inside.
          </p>
          <Link
            href="/create"
            className="inline-block bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[15px] font-bold px-11 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(191,0,58,0.25)] transition-[opacity,transform] duration-150 hover:opacity-90 hover:-translate-y-0.5"
          >
            Start Your Book
          </Link>
        </div>

      </div>
    </main>
  );
}