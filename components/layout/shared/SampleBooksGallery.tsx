"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/hooks/useLanguage";

type SampleBook = {
  id: number;
  title: string;
  pages: number;
  contributors: number;
  image: string;
  tag: string;
  description: string;
};

const sampleBooks: SampleBook[] = [
  {
    id: 1,
    title: "Emma's 30th Birthday",
    pages: 48,
    contributors: 18,
    image: "/images/c1.jpg",
    tag: "Birthday",
    description: "A warm birthday collection filled with memories, wishes, and celebration moments.",
  },
  {
    id: 2,
    title: "Class of 2026",
    pages: 40,
    contributors: 30,
    image: "/images/c2.jpg",
    tag: "School",
    description: "A bright yearbook-style book with stories, notes, and class memories.",
  },
  {
    id: 3,
    title: "Team Farewell – Tom",
    pages: 32,
    contributors: 12,
    image: "/images/c3.jpg",
    tag: "Work",
    description: "A thoughtful farewell book for a colleague, with team messages and shared moments.",
  },
  {
    id: 4,
    title: "Wedding of Helga & Dieter",
    pages: 56,
    contributors: 24,
    image: "/images/c4.jpg",
    tag: "Love",
    description: "An elegant wedding book collecting notes, wishes, and photo memories from loved ones.",
  },
  {
    id: 5,
    title: "Keller's Family Book 2026",
    pages: 44,
    contributors: 20,
    image: "/images/c5.jpg",
    tag: "Family",
    description: "A cozy family keepsake with stories from every generation.",
  },
  {
    id: 6,
    title: "Christmas 2025",
    pages: 28,
    contributors: 15,
    image: "/images/c6.jpg",
    tag: "Seasonal",
    description: "A festive memory book with holiday notes, photos, and seasonal wishes.",
  },
  {
    id: 7,
    title: "Mia's Graduation Book",
    pages: 36,
    contributors: 22,
    image: "/images/c2.jpg",
    tag: "School",
    description: "A graduation collection full of encouragement and proud messages.",
  },
  {
    id: 8,
    title: "Winter Family Memories",
    pages: 52,
    contributors: 26,
    image: "/images/c5.jpg",
    tag: "Family",
    description: "A seasonal family edition built around shared traditions and winter moments.",
  },
];

const filterLabels = ["All", ...Array.from(new Set(sampleBooks.map(book => book.tag)))];

const filterMeta = [
  { label: "All", count: sampleBooks.length },
  ...Array.from(new Set(sampleBooks.map(book => book.tag))).map(tag => ({
    label: tag,
    count: sampleBooks.filter(book => book.tag === tag).length,
  })),
];

function SampleBookPreviewModal({ book, onClose }: { book: SampleBook; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 22, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.16 });
    gsap.to(cardRef.current, { opacity: 0, y: 16, scale: 0.97, duration: 0.16, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-100 bg-black/65 backdrop-blur-sm flex items-center justify-center px-4 py-6" onClick={handleClose}>
      <div ref={cardRef} className="w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]" onClick={e => e.stopPropagation()}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-85 lg:min-h-160 bg-[#f6f1ed]">
            <Image src={book.image} alt={book.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="max-w-xl rounded-3xl border border-white/20 bg-black/28 p-4 sm:p-5 text-white backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">Featured preview</p>
                <h3 className="mt-2 text-[26px] sm:text-[34px] font-extrabold leading-tight">{book.title}</h3>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-7 text-white/80">{book.description}</p>
              </div>
            </div>
            <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#7A1E3A] backdrop-blur">
              {book.tag}
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 bg-[linear-gradient(180deg,#fff_0%,#fffafd_100%)]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BF003A]">Sample Book Preview</p>
              <h3 className="mt-3 text-[28px] sm:text-[36px] font-extrabold leading-tight text-[#1A1A2E]">{book.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-[#6B7280]">{book.description}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-3xl bg-[#faf7f8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF]">Pages</p>
                  <p className="mt-2 text-[22px] font-bold text-[#1A1A2E]">{book.pages}</p>
                </div>
                <div className="rounded-3xl bg-[#faf7f8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF]">Contributors</p>
                  <p className="mt-2 text-[22px] font-bold text-[#1A1A2E]">{book.contributors}</p>
                </div>
                <div className="rounded-3xl bg-[#faf7f8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF]">Occasion</p>
                  <p className="mt-2 text-[22px] font-bold text-[#1A1A2E]">{book.tag}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/create?cover=${book.id}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(191,0,58,0.24)] transition-opacity hover:opacity-90"
              >
                Start With This Cover
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <button
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] px-6 py-3.5 text-[14px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SampleBooksGallery() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeBook, setActiveBook] = useState<SampleBook | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredBooks = sampleBooks.slice(0, 3);

  const text = language === "de"
    ? {
      realExamples: "Echte Beispiele aus fertigen Buechern",
      heroTitle: "Beispielbuecher, die sich echt anfuehlen.",
      heroSubtitle: "Groessere Cover-Vorschauen ansehen, nach Anlass filtern und jedes Beispiel oeffnen, bevor du dein eigenes Buch startest.",
      startBook: "Buch starten",
      browseGallery: "Galerie ansehen",
      filterBy: "Nach Anlass filtern",
      findSample: "Passendes Beispiel in Sekunden finden.",
      filterHint: "Jede Karte nutzt eine groessere Darstellung, damit das Cover im Mittelpunkt steht.",
      showing: "Angezeigt",
      sampleBooks: "Beispielbuecher",
      for: "fuer",
      skip: "Direkt zum Buch-Editor",
      openPreview: "Vorschau oeffnen",
      ready: "Bereit zum Erstellen?",
      readySubtitle: "Waehle ein Beispiel-Cover und starte dein eigenes Buch.",
      readyHint: "Du kannst Anlass, Cover und Teilnehmende spaeter jederzeit anpassen.",
      contributors: "Mitwirkende",
    }
    : {
      realExamples: "Real examples from finished books",
      heroTitle: "Sample books that feel like the real thing.",
      heroSubtitle: "Browse large cover previews, filter by occasion, and open each sample to see the interior before you start your own book.",
      startBook: "Start Your Book",
      browseGallery: "Browse the gallery",
      filterBy: "Filter by occasion",
      findSample: "Find the right sample in seconds.",
      filterHint: "Each card uses a larger visual treatment so the book cover feels like the hero of the page, not a thumbnail.",
      showing: "Showing",
      sampleBooks: "sample books",
      for: "for",
      skip: "Skip to book creator",
      openPreview: "Open preview",
      ready: "Ready to create?",
      readySubtitle: "Pick a sample cover and start your own book.",
      readyHint: "You can jump into the book creator from any example and adjust the cover, occasion, and contributors later.",
      contributors: "contributors",
    };

  const filteredBooks = useMemo(() => {
    if (activeFilter === "All") return sampleBooks;
    return sampleBooks.filter(book => book.tag === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const headerChildren = Array.from(headerRef.current?.children ?? []);
    gsap.set(headerChildren, { opacity: 0, y: 24 });
    gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const filters = filterRef.current?.querySelectorAll<HTMLElement>(".filter-chip");
    if (filters?.length) {
      gsap.fromTo(filters, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".book-card");
    if (!cards?.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.05, ease: "power2.out" });
  }, [filteredBooks]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,238,242,0.95),transparent_34%),linear-gradient(180deg,#FFFDFD_0%,#F8F4F1_100%)] text-[#1A1A2E]">
      <section className="relative overflow-hidden border-b border-[#f1e7ea]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(191,0,58,0.08),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(122,30,58,0.06),transparent_25%)]" />
        <div className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div ref={headerRef} className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F4C7D0] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#7A1E3A] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#BF003A]" />
                {text.realExamples}
              </div>
              <h1 className="mt-6 max-w-3xl text-[clamp(38px,6vw,44px)] font-black leading-[0.92] tracking-tight text-[#1A1A2E]">
                {text.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] sm:text-[18px] leading-8 text-[#6B7280]">
                {text.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { value: sampleBooks.length, label: "examples" },
                  { value: filterLabels.length - 1, label: "occasions" },
                  { value: "Premium", label: "look & feel" },
                ].map(item => (
                  <div key={item.label} className="rounded-3xl border border-white bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(26,26,46,0.07)] backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF]">{item.label}</p>
                    <p className="mt-1 text-[22px] font-black text-[#1A1A2E]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(191,0,58,0.24)] transition-opacity hover:opacity-90"
                >
                  {text.startBook}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
                >
                  {text.browseGallery}
                </a>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {featuredBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => setActiveBook(book)}
                  className="group overflow-hidden rounded-3xl border border-white bg-white text-left shadow-[0_14px_30px_rgba(26,26,46,0.08)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-[#E7DFDB]">
                    <Image src={book.image} alt={book.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#7A1E3A] backdrop-blur">
                      {book.tag}
                    </div>
                    <div className="absolute inset-x-3 bottom-3">
                      <div className="rounded-2xl bg-black/28 p-3 text-white backdrop-blur-md">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Featured sample</p>
                        <h3 className="mt-1 text-[14px] sm:text-[16px] font-extrabold leading-tight">{book.title}</h3>
                        <p className="mt-1 text-[11px] text-white/80">{book.pages} pages · {book.contributors} contributors</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 rounded-4xl border border-[#F0E6EA] bg-white/95 p-4 sm:p-5 shadow-[0_14px_36px_rgba(26,26,46,0.06)] backdrop-blur-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BF003A]">{text.filterBy}</p>
                <h2 className="mt-2 text-[22px] sm:text-[26px] font-extrabold text-[#1A1A2E]">{text.findSample}</h2>
              </div>
              <p className="max-w-xl text-[13px] sm:text-[14px] leading-7 text-[#6B7280]">
                {text.filterHint}
              </p>
            </div>

            <div ref={filterRef} className="flex flex-wrap gap-2.5">
            {filterMeta.map(item => {
              const active = activeFilter === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveFilter(item.label)}
                  className={`filter-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${active ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white shadow-[0_10px_20px_rgba(191,0,58,0.2)]" : "bg-[#F7F7F9] text-[#4B5563] hover:bg-[#FFF0F3] hover:text-[#BF003A]"}`}
                >
                  <span>{item.label}</span>
                  {/* <span className={`rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-white/15 text-white" : "bg-white text-[#9CA3AF]"}`}>
                    {item.count}
                  </span> */}
                </button>
              );
            })}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[13px] text-[#6B7280]">
              {text.showing} <span className="font-semibold text-[#1A1A2E]">{filteredBooks.length}</span> {text.sampleBooks}
              {activeFilter !== "All" ? <> {text.for} <span className="font-semibold text-[#1A1A2E]">{activeFilter}</span></> : null}.
            </p>
            <Link href="/create" className="text-[13px] font-semibold text-[#BF003A] hover:opacity-80">
              {text.skip}
            </Link>
          </div>

          <div ref={gridRef} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map(book => (
              <article
                key={book.id}
                className="book-card overflow-hidden rounded-3xl border border-[#F0E6EA] bg-white shadow-[0_14px_30px_rgba(26,26,46,0.07)] transition-transform duration-200 hover:-translate-y-1"
              >
                <button
                  type="button"
                  onClick={() => setActiveBook(book)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-[#E7DFDB]">
                    <Image src={book.image} alt={book.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#7A1E3A] backdrop-blur">
                      {book.tag}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="rounded-2xl bg-black/28 p-3 backdrop-blur-md">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Sample Book</p>
                        <h2 className="mt-1 text-[16px] sm:text-[18px] font-extrabold leading-tight">{book.title}</h2>
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-white/80">
                          <span>{book.pages} pages</span>
                          <span>•</span>
                          <span>{book.contributors} {text.contributors}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <p className="text-[13px] leading-6 text-[#6B7280]">{book.description}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-[#FAF7F8] px-2.5 py-2">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">Pages</p>
                        <p className="mt-1 text-[15px] font-bold text-[#1A1A2E]">{book.pages}</p>
                      </div>
                      <div className="rounded-2xl bg-[#FAF7F8] px-2.5 py-2">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">People</p>
                        <p className="mt-1 text-[15px] font-bold text-[#1A1A2E]">{book.contributors}</p>
                      </div>
                      <div className="rounded-2xl bg-[#FAF7F8] px-2.5 py-2">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">Occasion</p>
                        <p className="mt-1 text-[15px] font-bold text-[#1A1A2E]">{book.tag}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#BF003A]">
                      {text.openPreview}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-420 rounded-4xl border border-[#F0E6EA] bg-[#1A1A2E] px-6 py-8 sm:px-8 sm:py-10 text-white shadow-[0_24px_64px_rgba(26,26,46,0.22)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F6C5CF]">{text.ready}</p>
              <h2 className="mt-2 text-[clamp(24px,4vw,36px)] font-extrabold leading-tight">{text.readySubtitle}</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/75">
                {text.readyHint}
              </p>
            </div>
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-bold text-[#1A1A2E] transition-colors hover:bg-[#FFF0F3]"
            >
              {text.startBook}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {activeBook && <SampleBookPreviewModal book={activeBook} onClose={() => setActiveBook(null)} />}
    </main>
  );
}
