/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/hooks/useLanguage";

/* ═══════════════════════════════════════════════════
   SAMPLE BOOKS DATA — updated names & tags
═══════════════════════════════════════════════════ */
const sampleBooks = [
  { id: 1, title: "Emma's 30th Birthday", pages: 48, contributors: 18, image: "/images/c1.jpg", tag: "Birthday" },
  { id: 2, title: "Class of 2026", pages: 40, contributors: 30, image: "/images/c2.jpg", tag: "School" },
  { id: 3, title: "Team Farewell – Tom", pages: 32, contributors: 12, image: "/images/c3.jpg", tag: "Work" },
  { id: 4, title: "Wedding of Helga & Dieter", pages: 56, contributors: 24, image: "/images/c4.jpg", tag: "Love" },
  { id: 5, title: "Keller's Family Book 2026", pages: 44, contributors: 20, image: "/images/c5.jpg", tag: "Family" },
  { id: 6, title: "Christmas 2025", pages: 28, contributors: 15, image: "/images/c6.jpg", tag: "Seasonal" },
];

const whyPoints = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Made by Many",
    desc: "Friends, colleagues and family each contribute their own page — making every book a true group gift.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Deep Emotional Value",
    desc: "A handcrafted book of real memories and heartfelt words — a gift people keep for life.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Memory-Based Design",
    desc: "Every page is unique. Combining photos, stories and shared memories into something truly irreplaceable.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Ready in Days",
    desc: "We handle everything from printing to delivery, so you can focus on collecting the memories that matter.",
  },
];

/* ═══════════════════════════════════════════════════
   FLIP PREVIEW MODAL
═══════════════════════════════════════════════════ */
function FlipModal({ book, onClose }: { book: typeof sampleBooks[0]; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" });
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
    gsap.to(modalRef.current, { opacity: 0, scale: 0.94, y: 12, duration: 0.18, onComplete: onClose });
  };

  const pages = [
    { label: "Cover", bg: "bg-[#f5f0ee]" },
    { label: "Page 2–3", bg: "bg-[#faf8f6]" },
    { label: "Page 4–5", bg: "bg-[#f8f5f3]" },
  ];

  return (
    <div ref={overlayRef} onClick={close}
      className="fixed inset-0 z-1000 bg-black/55 flex items-center justify-center p-5">
      <div ref={modalRef} onClick={e => e.stopPropagation()}
        className="bg-white rounded-[20px] overflow-hidden w-full max-w-140 shadow-[0_24px_64px_rgba(0,0,0,0.22)]">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[#BF003A] font-bold mb-0.5">{book.tag}</p>
            <h3 className="text-[16px] font-bold text-[#1A1A2E]">{book.title}</h3>
          </div>
          <button onClick={close} className="bg-gray-100 border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Preview */}
        <div className={`h-70 ${pages[page].bg} relative overflow-hidden flex items-center justify-center`}>
          <Image src={book.image} alt={book.title} fill style={{ objectFit: "cover", opacity: page === 0 ? 1 : 0.25 }} />
          {page > 0 && (
            <div className="relative z-10 text-center px-8">
              <p className="text-[13px] text-gray-400 mb-2">{pages[page].label}</p>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                &quot;Thank you for always being there. These memories mean the world to me.&quot;
              </p>
              <p className="text-[12px] text-[#BF003A] mt-3 italic">— Anna, page {page * 2 + 1}</p>
            </div>
          )}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="text-[11px] bg-black/35 text-white px-2.5 py-0.5 rounded-full">{pages[page].label}</span>
          </div>
        </div>

        {/* Nav */}
        <div className="px-5 py-3.5 flex items-center justify-between">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className={`bg-gray-100 border-none rounded-full w-9 h-9 flex items-center justify-center ${page === 0 ? "opacity-40 cursor-default" : "cursor-pointer"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex gap-1.5">
            {pages.map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-200 ${i === page ? "w-5 bg-[#BF003A]" : "w-2 bg-gray-200"}`} />
            ))}
          </div>
          <button onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))} disabled={page === pages.length - 1}
            className={`bg-gray-100 border-none rounded-full w-9 h-9 flex items-center justify-center ${page === pages.length - 1 ? "opacity-40 cursor-default" : "cursor-pointer"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <Link href="/create"
            className="block text-center bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[14px] font-bold py-3 rounded-xl no-underline">
            Create a Book Like This
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function HomePage() {
  const { language } = useLanguage();
  const [activeBook, setActiveBook] = useState<typeof sampleBooks[0] | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  /* hero entrance */
  useEffect(() => {
    const els = Array.from(heroRef.current?.children ?? []);
    gsap.set(els, { opacity: 0, y: 32 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1 });
  }, []);

  /* scroll sections */
  useEffect(() => {
    const sections = [whyRef, booksRef, howRef, supportRef];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const children = Array.from((entry.target as HTMLElement).children);
        gsap.fromTo(children, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    sections.forEach(r => { if (r.current) io.observe(r.current); });
    return () => io.disconnect();
  }, []);

  /* card hover */
  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -6, boxShadow: "0 18px 40px rgba(122,30,58,0.13)", duration: 0.25, ease: "power2.out" });
    const img = e.currentTarget.querySelector(".book-img");
    if (img) gsap.to(img, { scale: 1.06, duration: 0.35, ease: "power2.out" });
  };
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", duration: 0.25, ease: "power2.inOut" });
    const img = e.currentTarget.querySelector(".book-img");
    if (img) gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.inOut" });
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Contact form from ${contactName.trim() || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${contactName.trim() || "Not provided"}`,
        `Email: ${contactEmail.trim() || "Not provided"}`,
        "",
        contactMessage.trim() || "No message provided.",
      ].join("\n")
    );

    window.location.href = `mailto:hello@mein-herzgeschenk.de?subject=${subject}&body=${body}`;
  };

  const heroText =
    language === "de"
      ? {
        pill: "Erinnerungen schaffen, die fuer immer bleiben",
        headingLine1: "Persoenliches Geschenk erstellen",
        headingLine2: "Gemeinsam gemacht",
        description:
          "Lade die wichtigsten Menschen ein, ihre Geschichten, Fotos und herzlichen Worte beizutragen. Wir verwandeln alles in ein hochwertiges, gedrucktes Layflat-Buch.",
        startButton: "Buch starten",
        howButton: "So funktioniert es",
        rating: "4.9/5 von tausenden zufriedenen Erstellern",
        secure: "Sicher und privat",
        printed: "Gedruckt in Deutschland",
        occasion: "Perfekt fuer jeden Anlass",
        freeShipping: "Kostenloser Versand in Deutschland",
        fastDelivery: "Schnelle Lieferung nach Oesterreich und in die Schweiz.",
      }
      : {
        pill: "A gift made together",
        headingLine1: "Create a Personal Gift",
        headingLine2: "Made Together",
        description:
          "Invite the people who matter most to contribute their stories, photos and heartfelt messages. We turn it into a beautifully printed, premium lay-flat memory book.",
        startButton: "Start Your Book",
        howButton: "See How It Works",
        rating: "4.9/5 from thousands of happy creators",
        secure: "Secure & private",
        printed: "Printed in Germany",
        occasion: "Perfect for any occasion",
        freeShipping: "Free shipping in Germany",
        fastDelivery: "Fast delivery to Austria and Switzerland.",
      };

  return (
    <main className="font-sans bg-[#EEE8EA]">

      {/* ══════════════════════════════════
          1. HERO
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center min-h-135 py-16 sm:py-20 px-5 sm:px-8"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 30%, #f5eef0 0%, #ede8ea 45%, #e3dde0 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(191,0,58,0.07) 0%, transparent 65%)" }} />

        <div ref={heroRef} className="relative z-10 w-full max-w-145 mx-auto flex flex-col items-center text-center gap-4 sm:gap-5">

          <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span className="text-[12px] font-semibold text-[#7A1E3A]">{heroText.pill}</span>
          </div>

          <h1 className="text-[clamp(32px,7vw,55px)] font-extrabold leading-[1.08] tracking-[-1.5px] m-0 px-2">
            <span className="text-[#1A1A2E]">{heroText.headingLine1}</span><br />
            <span style={{ background: "linear-gradient(102deg,#BF003A 0%,#7A1020 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {heroText.headingLine2}
            </span>
          </h1>

          <p className="text-[14px] sm:text-[15px] text-gray-400 max-w-115 leading-[1.75] m-0">
            {heroText.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-115 mt-1">
            <Link href="/create"
              className="flex-1 inline-flex items-center justify-center gap-2 text-white text-[14px] font-bold py-3.5 px-5 rounded-[10px] no-underline transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "linear-gradient(102deg,#BF003A 0%,#7A1020 100%)", boxShadow: "0 4px 20px rgba(191,0,58,0.30)" }}>
              {heroText.startButton}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/how-it-works"
              className="flex-1 inline-flex items-center justify-center text-[14px] font-semibold py-3.5 px-5 rounded-[10px] no-underline backdrop-blur-sm transition-all duration-200 active:scale-[0.98] border border-[#BF003A] bg-white text-[#BF003A] hover:bg-linear-to-r hover:from-[#BF003A] hover:to-[#59001C] hover:text-white hover:border-transparent">
              {heroText.howButton}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-1 px-1">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 font-medium">
              <svg width="13" height="13" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />
              </svg>
              {heroText.rating}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 font-medium">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {heroText.secure}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 font-medium">
              <span className="text-[13px]">🇩🇪</span>
              {heroText.printed}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 font-medium">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
              </svg>
              {heroText.occasion}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 mt-2">
            <div className="flex items-center text-center gap-2 flex-wrap justify-center">
              <Image src="/Maskgroup.png" alt="Free shipping" width={46} height={34} />
              <span className="text-[14px] sm:text-[15px] font-bold text-[#1A1A2E]">
                {heroText.freeShipping}
              </span>
            </div>
            <p className="text-[12px] text-gray-400 m-0 text-center">{heroText.fastDelivery}</p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
      3. SAMPLE BOOKS
    ══════════════════════════════════ */}
      <section className="px-6 pb-20 mt-10">
        <div className="max-w-250 mx-auto">
          <div className="text-center mb-11">
            <p className="text-[12px] font-bold text-[#BF003A] tracking-widest uppercase mb-2.5">Real examples</p>
            <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold text-[#1A1A2E] mb-3.5 tracking-tight">Sample Books</h2>
            <p className="text-[14px] text-gray-500 max-w-105 mx-auto">
              These are real, completed memory books created by families, friends and colleagues. Flip through the pages to see how photos, messages and stories come together in a finished book. All examples are shared with permission.
            </p>
          </div>

          <div ref={booksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleBooks.map(book => (
              <div key={book.id}
                onClick={() => setActiveBook(book)}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition-shadow duration-200">
                <div className="relative h-45 overflow-hidden bg-[#d8d3ce]">
                  <Image src={book.image} alt={book.title} fill className="book-img" style={{ objectFit: "cover" }} />
                  <div className="absolute top-2.5 left-2.5 bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {book.tag}
                  </div>
                </div>
                <div className="p-3.5 pb-4">
                  <h3 className="text-[13px] font-bold text-[#1A1A2E] mb-1.5 leading-snug">{book.title}</h3>
                  <p className="text-[11px] text-gray-400 m-0">{book.pages} pages · {book.contributors} contributors</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[#BF003A] text-[12px] font-semibold">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                    Flip preview
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ "View Sample Books" → /sample-books */}
          <div className="text-center mt-9">
            <Link href="/sample-books"
              className="inline-block bg-linear-to-r from-[#BF003A] to-[#59001C] text-white text-[14px] font-bold px-8 py-3.5 rounded-full no-underline shadow-[0_4px_16px_rgba(191,0,58,0.25)] transition-opacity duration-150 hover:opacity-90">
              View Sample Books
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          2. WHY THIS GIFT IS SPECIAL
      ══════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-250 mx-auto">
          <div ref={whyRef} className="text-center mb-13">
            <p className="text-[12px] font-bold text-[#BF003A] tracking-widest uppercase mb-2.5">Why it matters</p>
            <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold text-[#1A1A2E] mb-3.5 tracking-tight">
              Why This Gift Is Special
            </h2>
            <p className="text-[15px] text-gray-500 max-w-120 mx-auto leading-relaxed">
             It&apos;s not just a book. It&apos;s a collection of real moments, created together by the people who matter most.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {whyPoints.map((p, i) => (
              <div key={i} className="bg-white rounded-[18px] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <div className="w-11 h-11 bg-[#FFF0F3] rounded-xl flex items-center justify-center mb-4">{p.icon}</div>
                <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{p.title}</h3>
                <p className="text-[13px] text-gray-500 leading-[1.65] m-0">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {activeBook && <FlipModal book={activeBook} onClose={() => setActiveBook(null)} />}
    </main>
  );
}