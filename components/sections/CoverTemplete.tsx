/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/hooks/useLanguage";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const themes = [
  { id: 1, title: "Warm & Nostalgic",   tag: "Golden Tones",    detail: "Amber hues, soft grain textures and vintage-inspired layouts that feel like flipping through an old photo album.", image: "/icon/1.jpg", badge: "" },
  { id: 2, title: "Modern Minimal",     tag: "Clean Lines",     detail: "Crisp white space, strong typography and restrained accents. Lets your memories speak without distraction.", image: "/icon/2.jpg", badge: "" },
  { id: 3, title: "Floral Romance",     tag: "Soft Botanicals", detail: "Delicate flower motifs and blush palettes woven around every page for a tender, garden-party feel.", image: "/icon/3.jpg", badge: "" },
  { id: 4, title: "Celestial Dream",    tag: "Stars & Sky",     detail: "Midnight gradients, golden constellations and a sense of wonder — perfect for milestone moments.", image: "/icon/4.jpg", badge: "" },
  { id: 5, title: "Tropical Escape",    tag: "Bold & Bright",   detail: "Lush leaves, vivid colors and an energy that captures sun-soaked celebrations and adventures.", image: "/icon/5.jpg", badge: "" },
  { id: 6, title: "Elegant Marble",     tag: "Luxury Feel",     detail: "Sophisticated white marble veining paired with gold accents for a timeless, high-end aesthetic.", image: "/icon/6.jpg", badge: "" },
];

const covers = [
  { id: 1, title: "Solid Color",        tag: "Minimal",         detail: "A bold, single-color cover that puts your title front and center. Timeless and refined.", image: "/icon/11.jpg", badge: "" },
  { id: 2, title: "Soft Pattern",       tag: "Subtle Texture",  detail: "Delicate repeating patterns add warmth and personality without overwhelming your photos.", image: "/icon/12.jpg", badge: "" },
  { id: 3, title: "Full Photo",         tag: "Most Personal",   detail: "Let a single stunning photograph fill the entire cover — the most personal statement.", image: "/icon/15.jpg", badge: "" },
  { id: 4, title: "Split / Duo-Tone",   tag: "Editorial",       detail: "Two contrasting tones divided across the cover for a striking, editorial look.", image: "/icon/14.jpg", badge: "" },
  { id: 5, title: "Framed Photo",       tag: "Classic Border",  detail: "Your photo set inside an elegant frame — classic, polished, and always beautiful.", image: "/icon/15.jpg", badge: "" },
];

type Item = typeof themes[0];

type PreviewPage = {
  label: string;
  question: string;
  answer: string;
};

const themePreviewPages: Record<number, PreviewPage[]> = {
  1: [
    { label: "Memory Prompt", question: "What moment should open this theme?", answer: "A warm, handwritten note about the first memory that comes to mind." },
    { label: "Typography Check", question: "How should the heading feel?", answer: "Soft, classic, and a little nostalgic with generous spacing." },
    { label: "Color Check", question: "Which palette fits best?", answer: "Amber, cream, muted rose, and a deeper brown accent for contrast." },
    { label: "Layout Check", question: "What should the page rhythm feel like?", answer: "Balanced text blocks, wide margins, and a calm editorial flow." },
  ],
  2: [
    { label: "Memory Prompt", question: "What detail should lead the page?", answer: "A short note that keeps the focus on clean structure and clarity." },
    { label: "Typography Check", question: "What type style should we test?", answer: "Strong headings, simple body copy, and clear hierarchy throughout." },
    { label: "Color Check", question: "Which palette keeps it minimal?", answer: "White space, charcoal text, and one restrained accent color." },
    { label: "Layout Check", question: "How should this interior breathe?", answer: "A single-column page with lots of breathing room and neat alignment." },
  ],
  3: [
    { label: "Memory Prompt", question: "Which memory feels most tender?", answer: "A gentle question about shared moments, messages, and little surprises." },
    { label: "Typography Check", question: "What makes it feel romantic?", answer: "A softer display font pairing with elegant body text and light spacing." },
    { label: "Color Check", question: "Which palette fits the mood?", answer: "Blush pink, ivory, and a floral accent that stays delicate." },
    { label: "Layout Check", question: "What layout suits this theme?", answer: "An airy two-block composition with space for notes and photos." },
  ],
  4: [
    { label: "Memory Prompt", question: "What question should feel a little magical?", answer: "A prompt about dreams, milestones, and the stories behind them." },
    { label: "Typography Check", question: "How bold should the title be?", answer: "High contrast headings with a polished, slightly dramatic rhythm." },
    { label: "Color Check", question: "Which palette adds depth?", answer: "Midnight blue, gold, and soft glow accents for a night-sky feel." },
    { label: "Layout Check", question: "How should the pages flip?", answer: "A dramatic, centered sheet with one focus area and one note area." },
  ],
  5: [
    { label: "Memory Prompt", question: "What should feel joyful here?", answer: "A lively question that keeps the page bright, playful, and energetic." },
    { label: "Typography Check", question: "What makes the tone feel upbeat?", answer: "Bold headers, friendly body copy, and a little extra line height." },
    { label: "Color Check", question: "Which palette is most vivid?", answer: "Leaf green, coral, sunshine yellow, and a saturated highlight tone." },
    { label: "Layout Check", question: "What keeps the page dynamic?", answer: "Stacked sections with rounded cards, badges, and visual rhythm." },
  ],
  6: [
    { label: "Memory Prompt", question: "Which memory should feel premium?", answer: "A refined prompt that keeps the presentation polished and timeless." },
    { label: "Typography Check", question: "What kind of type treatment fits?", answer: "Elegant, high-contrast headings with clean supporting text." },
    { label: "Color Check", question: "Which palette feels luxurious?", answer: "Marble white, warm gray, and a gold accent for a premium finish." },
    { label: "Layout Check", question: "How should the spread behave?", answer: "A structured page with measured spacing and a gallery-like cadence." },
  ],
};

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function ThemePreviewModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Resolve pages for the current theme, falling back to an empty array
  const pages = themePreviewPages[item.id] ?? [];

  const [pageIndex, setPageIndex] = useState(0);

  // Reset page index whenever the previewed item changes
  useEffect(() => {
    setPageIndex(0);
  }, [item.id]);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.18 });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power3.out" }
    );
  }, []);

  const currentPage = pages[pageIndex] ?? pages[0];

  const goPrev = () =>
    setPageIndex((current) => (current === 0 ? pages.length - 1 : current - 1));
  const goNext = () =>
    setPageIndex((current) => (current + 1) % pages.length);

  // Scroll the snap container to a specific page index
  const scrollToPage = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.children.item(index) as HTMLElement | null;
    if (target) {
      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
    setPageIndex(index);
  };

  // Keep pageIndex in sync while the user scrolls manually
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    let bestIndex    = 0;
    let bestDistance = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const distance = Math.abs((child as HTMLElement).offsetTop - container.scrollTop);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex    = i;
      }
    });
    setPageIndex(bestIndex);
  };

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.14 });
    gsap.to(cardRef.current, { opacity: 0, y: 12, scale: 0.98, duration: 0.14, onComplete: onClose });
  };

  if (!currentPage) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div ref={cardRef} className="w-full max-w-2xl">
        <div className="flex flex-col gap-3">

          {/* Header bar */}
          <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-white/10 px-4 py-3">
            <div>
              <p className="text-[13px] font-bold text-white">{item.title}</p>
              <p className="text-[11px] text-white/60">{item.tag}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/85">
                {pageIndex + 1} / {pages.length}
              </div>
              <button
                onClick={handleClose}
                className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable page preview */}
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF9FB_100%)] p-4 sm:p-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-[#F3E7EC] bg-white">

              {/* Tab bar */}
              <div className="flex items-center justify-between border-b border-[#F3E7EC] px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#BF003A]">{currentPage.label}</p>
                  <p className="mt-1 text-[12px] text-[#9CA3AF]">Preview a single sample page to inspect spacing and rhythm</p>
                </div>
                <div className="rounded-full bg-[#FFF0F3] px-3 py-1 text-[11px] font-bold text-[#BF003A]">Theme-only preview</div>
              </div>

              {/* Snap-scroll container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-[58vh] overflow-y-auto rounded-[22px] border border-[#F0E6EA] bg-[linear-gradient(180deg,#FFF9FB_0%,#FFFFFF_100%)] scroll-smooth snap-y snap-mandatory"
              >
                {pages.map((page, index) => (
                  <section
                    key={page.label}
                    className="min-h-[58vh] snap-start border-b border-[#F6EDF1] p-5 sm:p-6 last:border-b-0 text-[#1A1A2E]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full bg-[#F7F2F4] px-3 py-1 text-[11px] font-semibold text-[#7A1E3A]">
                        {page.label}
                      </div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">Theme {item.id}</div>
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                      <div className="rounded-[20px] bg-[#FFF7F9] p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BF003A]">{page.label}</p>
                        <h4 className="mt-3 text-[24px] font-black leading-tight text-[#1A1A2E]">
                          {page.question}
                        </h4>
                        <p className="mt-4 text-[14px] leading-7 text-[#6B7280]">
                          {page.answer}
                        </p>
                      </div>

                      <div className="rounded-[20px] border border-[#F0E6EA] bg-white p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">Preview notes</p>
                        <ul className="mt-4 space-y-3 text-[13px] leading-6 text-[#4B5563]">
                          <li>• Shows how the theme handles a question-and-answer page.</li>
                          <li>• Useful for checking heading weight, spacing, and color balance.</li>
                          <li>• No real book content is used here.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-[#FAF7F8] p-3.5">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">Layout</p>
                        <p className="mt-1 text-[12px] font-semibold text-[#1A1A2E]">Clean, centered, page-first</p>
                      </div>
                      <div className="rounded-2xl bg-[#FAF7F8] p-3.5">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">Typography</p>
                        <p className="mt-1 text-[12px] font-semibold text-[#1A1A2E]">Bold headings, readable body</p>
                      </div>
                      <div className="rounded-2xl bg-[#FAF7F8] p-3.5">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">Colors</p>
                        <p className="mt-1 text-[12px] font-semibold text-[#1A1A2E]">Tinted by the selected theme</p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-[18px] border border-dashed border-[#F0E6EA] bg-white px-4 py-3 text-[12px] text-[#6B7280]">
                      <span>{index + 1} of {pages.length}</span>
                      <button
                        type="button"
                        onClick={() => scrollToPage((index + 1) % pages.length)}
                        className="font-semibold text-[#BF003A] hover:opacity-80 cursor-pointer"
                      >
                        Jump to next page
                      </button>
                    </div>
                  </section>
                ))}
              </div>

              {/* Footer controls */}
              <div className="flex flex-col gap-3 border-t border-[#F3E7EC] bg-[#FFFDFD] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[12px] text-[#6B7280]">
                  Scroll the preview to move through the dummy interior pages.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-4 py-2 text-[13px] font-bold text-white shadow-[0_10px_18px_rgba(191,0,58,0.2)] transition-opacity hover:opacity-90"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-[13px] text-white/75">
            <span>Theme preview is separate from Sample Books.</span>
            <button onClick={handleClose} className="font-semibold text-white hover:text-white/90">
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── CARD ──────────────────────────────────────────────────────────────────────
function Card({ item, btnLabel, onAction }: { item: Item; btnLabel: string; onAction?: () => void }) {
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
      {/* Image container */}
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
          type="button"
          onClick={onAction}
          disabled={!onAction}
          className="mt-3.5 w-full bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[12px] font-bold py-2.25 rounded-[10px] border-none cursor-pointer transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function ThemesAndCoversPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab]       = useState<"themes" | "covers">("themes");
  const [activePreview, setActivePreview] = useState<Item | null>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const localizedThemes = language === "de"
    ? [
      { id: 1, title: "Warm & nostalgisch", tag: "Goldene Toene",   detail: "Bernsteinfarben, sanfte Texturen und Vintage-Layouts wie ein altes Fotoalbum.", image: "/icon/1.jpg", badge: "Beliebt" },
      { id: 2, title: "Modern minimal",     tag: "Klare Linien",    detail: "Viel Weissraum, starke Typografie und dezente Akzente fuer maximalen Fokus.", image: "/icon/2.jpg", badge: "Trend" },
      { id: 3, title: "Blumenromantik",     tag: "Sanfte Botanik",  detail: "Zarte Blumenmotive und warme Farben fuer eine liebevolle Stimmung.", image: "/icon/3.jpg", badge: "Beliebt" },
      { id: 4, title: "Himmelstraum",       tag: "Sterne & Himmel", detail: "Nachtblaue Farbverlaeufe und Sterne fuer besondere Meilensteine.", image: "/icon/4.jpg", badge: "Neu" },
      { id: 5, title: "Tropischer Moment",  tag: "Kräftig & bunt",  detail: "Lebendige Farben und Blaetter fuer sonnige Feiern und Abenteuer.", image: "/icon/5.jpg", badge: "Lebendig" },
      { id: 6, title: "Eleganter Marmor",   tag: "Luxurioes",       detail: "Marmorstruktur mit Goldakzenten fuer einen zeitlosen Premium-Look.", image: "/icon/6.jpg", badge: "Premium" },
    ]
    : themes;

  const localizedCovers = language === "de"
    ? [
      { id: 1, title: "Einfarbig",        tag: "Minimal",           detail: "Ein klares Cover in einer Farbe, das deinen Titel in den Fokus stellt.", image: "/icon/11.jpg", badge: "Minimal" },
      { id: 2, title: "Sanftes Muster",   tag: "Subtile Struktur",  detail: "Dezente Muster bringen Waerme, ohne Fotos zu ueberladen.", image: "/icon/12.jpg", badge: "Beliebt" },
      { id: 3, title: "Vollfoto",         tag: "Persoenlich",       detail: "Ein starkes Foto auf dem ganzen Cover fuer maximale Persoenlichkeit.", image: "/icon/15.jpg", badge: "Beliebt" },
      { id: 4, title: "Split / Duo-Tone", tag: "Editorial",         detail: "Zwei Kontrastfarben fuer einen modernen, editoriellen Look.", image: "/icon/14.jpg", badge: "Trend" },
      { id: 5, title: "Foto mit Rahmen",  tag: "Klassischer Rahmen",detail: "Dein Foto in einem eleganten Rahmen - klassisch und stilvoll.", image: "/icon/15.jpg", badge: "Klassisch" },
    ]
    : covers;

  const text = language === "de"
    ? {
      btnTheme: "Dieses Thema nutzen",
      btnCover: "Dieses Cover nutzen",
      customize: "Buch personalisieren",
      titleBefore: "Themen &",
      titleAccent: "Cover",
      subtitle: "Waehle ein Innenthema fuer die Stimmung und dann ein Cover, das zu dir passt.",
      tabThemes: "Themen",
      tabCovers: "Cover",
      themesHint: "Waehle ein Thema fuer Seitenlayout, Farben und dekorative Details.",
      coversHint: "Entdecke fuenf Coverstile fuer dein ganz persoenliches Erinnerungsbuch.",
      ready: "Bereit fuer dein Buch?",
      start: "Buch starten",
    }
    : {
      btnTheme: "View Theme",
      btnCover: "View Cover",
      customize: "Customize Your Book",
      titleBefore: "Themes &",
      titleAccent: "Covers",
      subtitle: "Pick an interior theme to set the mood, then choose a cover style to make it yours.",
      tabThemes: "Themes",
      tabCovers: "Covers",
      themesHint: "Open a theme preview to test layout, typography, and color with dummy interior pages. This is not a finished sample book.",
      coversHint: "Browse five distinct cover styles — each a different way to make your memory book feel uniquely yours.",
      ready: "Ready to create your book? Choose your style inside.",
      start: "Start Your Book",
    };

  const items    = activeTab === "themes" ? localizedThemes : localizedCovers;
  const btnLabel = activeTab === "themes" ? text.btnTheme : text.btnCover;

  // Header entrance animation
  useEffect(() => {
    const els = Array.from(headerRef.current?.children ?? []);
    gsap.set(els, { opacity: 0, y: 24 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          gsap.to(els, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  // Cards entrance on tab switch
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tc-card") ?? [];
    gsap.fromTo(
      cards,
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
            <span className="text-[12px] font-semibold text-[#7A1E3A]">{text.customize}</span>
          </div>

          <h1 className="text-[clamp(32px,5vw,54px)] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-3.5">
            {text.titleBefore}{" "}
            <span className="bg-linear-to-r from-[#BF003A] to-[#59001C] bg-clip-text text-transparent">
              {text.titleAccent}
            </span>
          </h1>

          <p className="text-[14px] text-gray-400 max-w-110 mx-auto leading-[1.65]">
            {text.subtitle}
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
            {(["themes", "covers"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-9 py-2.5 rounded-full border-none bg-transparent text-[14px] font-bold cursor-pointer transition-colors duration-200 min-w-35 tracking-[0.1px] ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                {tab === "themes" ? text.tabThemes : text.tabCovers}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab subtitle ── */}
        <p className="text-center text-[13px] text-gray-400 mb-9 leading-[1.6]">
          {activeTab === "themes" ? text.themesHint : text.coversHint}
        </p>

        {/* ── Cards Grid ── */}
        <div
          ref={gridRef}
          className="grid gap-4.5 mb-15"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              item={item}
              btnLabel={btnLabel}
              onAction={() => setActivePreview(item)}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <p className="text-[14px] text-gray-500 mb-4">{text.ready}</p>
          <Link
            href="/create"
            className="inline-block bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[15px] font-bold px-11 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(191,0,58,0.25)] transition-[opacity,transform] duration-150 hover:opacity-90 hover:-translate-y-0.5"
          >
            {text.start}
          </Link>
        </div>

      </div>

      {activePreview && (
        <ThemePreviewModal item={activePreview} onClose={() => setActivePreview(null)} />
      )}
    </main>
  );
}