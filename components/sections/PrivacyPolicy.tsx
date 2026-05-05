/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo, type ReactNode } from "react";
import { usePrivacyPoliciesQuery } from "@/features/privacy/hooks/services";
import { useLanguage } from "@/hooks/useLanguage";

// Local section type (built from API)
type LocalPolicySection = {
  id: string;
  index: string;
  title: string;
  icon: ReactNode;
  points: string[];
};

const defaultIcons: (() => ReactNode)[] = [
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
];

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ section, active }: { section: LocalPolicySection; active: boolean }) {
  return (
    <article
      id={section.id}
      className={`group scroll-mt-28 rounded-2xl border transition-all duration-300 ${
        active
          ? "border-[#BF003A]/20 bg-white shadow-[0_8px_32px_rgba(191,0,58,0.08)]"
          : "border-[#E8E2DC] bg-white/60 hover:bg-white hover:border-[#D5CBC4] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="flex items-start gap-5 p-6 sm:p-8">
        {/* number */}
        <span className={`shrink-0 font-mono text-[11px] font-bold tracking-widest mt-1 transition-colors duration-200 ${
          active ? "text-[#BF003A]" : "text-[#C4B5AC] group-hover:text-[#A89590]"
        }`}>
          {section.index}
        </span>

        <div className="flex-1 min-w-0">
          {/* title row */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`transition-colors duration-200 ${active ? "text-[#BF003A]" : "text-[#9CA3AF] group-hover:text-[#BF003A]"}`}>
              {section.icon}
            </span>
            <h2 className="text-[17px] sm:text-[19px] font-bold text-[#1A1A2E] leading-snug">
              {section.title}
            </h2>
          </div>

          {/* points */}
          <ul className="space-y-3">
            {section.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  active ? "bg-[#BF003A]" : "bg-[#D1C7C0] group-hover:bg-[#BF003A]/50"
                }`} />
                <span className="text-[13.5px] sm:text-[14.5px] text-[#4B5563] leading-[1.75]">
                  {(() => {
                    const m = point.match(/(?:E-?Mail|Email)\s*:\s*(\S+)/i);
                    if (m) {
                      let email = m[1].trim();
                      // remove HTML entity &nbsp; and non-breaking space chars
                      email = email.replace(/&nbsp;|\u00A0/g, "").trim();
                      return (
                        <>
                          <span className="font-semibold text-[#374151]">Email:</span>{" "}
                          <a href={`mailto:${email}`} className="text-[#BF003A] underline underline-offset-2 hover:opacity-75 transition-opacity">
                            {email}
                          </a>
                        </>
                      );
                    }
                    return point;
                  })()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PrivacyPolicySection() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, error } = usePrivacyPoliciesQuery();

  const ui = language === "de"
    ? {
      email: "E-Mail:",
      pill: "Datenschutz",
      titlePrefix: "Deine Daten,",
      titleAccent: "sicher",
      titleSuffix: "geschuetzt.",
      subtitle: "Klare Informationen, wie wir deine personenbezogenen Daten erheben, nutzen und schuetzen.",
      lastUpdated: "Zuletzt aktualisiert: 21. April 2026",
      sections: "Abschnitte",
      compliant: "DSGVO-konform",
      contents: "Inhalte",
    }
    : {
      email: "Email:",
      pill: "Privacy Policy",
      titlePrefix: "Your data,",
      titleAccent: "safely",
      titleSuffix: "protected.",
      subtitle: "Clear information on how we collect, use, and protect your personal data.",
      lastUpdated: "Last updated: April 21, 2026",
      sections: "Sections",
      compliant: "GDPR Compliant",
      contents: "Contents",
    };

  const sections = useMemo<LocalPolicySection[]>(() => {
    if (!data?.data) return [];

    return data.data.map((item: any, idx: number) => {
      const idxNum = idx + 1;
      const index = idxNum < 10 ? `0${idxNum}` : `${idxNum}`;
      const raw = (item.description || "").trim();
      let points: string[] = [];
      if (raw.includes("\n")) points = raw.split("\n").map((s: string) => s.trim()).filter(Boolean);
      else if (raw.includes(". ")) points = raw.split(/\.\s+/).map((s: string) => s.trim()).filter(Boolean);
      else if (raw) points = [raw];

      return {
        id: String(item.id),
        index,
        title: item.title,
        icon: defaultIcons[idx % defaultIcons.length](),
        points,
      } as LocalPolicySection;
    });
  }, [data]);
  

  useEffect(() => {
    if (sections.length > 0 && !activeId) {
      requestAnimationFrame(() => setActiveId(sections[0].id));
    }
  }, [sections, activeId]);

  // scroll spy
  useEffect(() => {
    if (!sections || sections.length === 0) return;
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s: LocalPolicySection) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="min-h-screen bg-[#F5F0EC] px-4 py-12 sm:px-6 sm:py-16 font-sans">
      <div className="mx-auto w-full max-w-5xl">

        {/* ── HERO ── */}
        <div className="mb-14 text-center">
          {/* pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E0D8] rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-[11px] font-bold tracking-widest text-[#7A1E3A] uppercase">{ui.pill}</span>
          </div>

          <h1 className="text-[clamp(38px,6vw,66px)] font-extrabold text-[#1A1A2E] leading-[1.06] tracking-[-1.5px] mb-5">
            {ui.titlePrefix}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#BF003A]">{ui.titleAccent}</span>
              <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#BF003A]/12 rounded-full" />
            </span>
            {" "}{ui.titleSuffix}
          </h1>

          <p className="text-[15px] text-[#8B8480] max-w-md mx-auto leading-[1.7]">
            {ui.subtitle}
          </p>

          {/* meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {ui.lastUpdated}
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              {sections.length || 7} {ui.sections}
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <path d="M1 6s1-1 4-1 5 2 8 2 4-1 4-1V22s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="1" y1="1" x2="1" y2="6"/>
              </svg>
              {ui.compliant}
            </span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex gap-8 items-start">

          {/* sticky sidebar nav — hidden on mobile */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-8">
            <div className="bg-white rounded-2xl border border-[#E8E2DC] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-[10px] font-bold tracking-widest text-[#BF003A] uppercase px-2 mb-3">{ui.contents}</p>
              <nav className="space-y-0.5">
                {sections.map((s: LocalPolicySection) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-all duration-200 text-[12.5px] font-medium cursor-pointer border-none ${
                      activeId === s.id
                        ? "bg-[#BF003A]/8 text-[#BF003A]"
                        : "text-[#78716C] hover:text-[#1A1A2E] hover:bg-[#F5F0EC] bg-transparent"
                    }`}
                  >
                    <span className={`font-mono text-[10px] font-bold shrink-0 ${activeId === s.id ? "text-[#BF003A]" : "text-[#C4B5AC]"}`}>
                      {s.index}
                    </span>
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* sections */}
          <div className="flex-1 min-w-0 space-y-4">
            {sections.map((s: LocalPolicySection) => (
              <SectionCard key={s.id} section={s} active={activeId === s.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}