"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTermsConditionsQuery } from "@/features/terms/hooks/services";
import { useLanguage } from "@/hooks/useLanguage";

type LocalTermsSection = {
  id: string;
  index: string;
  title: string;
  icon: ReactNode;
  points: string[];
};

const defaultIcons: (() => ReactNode)[] = [
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
];

function splitDescription(description: string) {
  const raw = description.trim();

  if (!raw) {
    return [];
  }

  if (raw.includes("\n")) {
    return raw.split("\n").map((item) => item.trim()).filter(Boolean);
  }

  return raw
    .replace(/\.(?=[A-ZÄÖÜ])/g, ".\n")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function SectionCard({ section, active, ui }: { section: LocalTermsSection; active: boolean; ui: { email: string } }) {
  return (
    <article
      id={section.id}
      className={`group scroll-mt-28 rounded-2xl border transition-all duration-300 ${active
          ? "border-[#BF003A]/20 bg-white shadow-[0_8px_32px_rgba(191,0,58,0.08)]"
          : "border-[#E8E2DC] bg-white/60 hover:bg-white hover:border-[#D5CBC4] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        }`}
    >
      <div className="flex items-start gap-5 p-6 sm:p-8">
        <span className={`shrink-0 font-mono text-[11px] font-bold tracking-widest mt-1 transition-colors duration-200 ${active ? "text-[#BF003A]" : "text-[#C4B5AC] group-hover:text-[#A89590]"
          }`}>
          {section.index}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`transition-colors duration-200 ${active ? "text-[#BF003A]" : "text-[#9CA3AF] group-hover:text-[#BF003A]"}`}>
              {section.icon}
            </span>
            <h2 className="text-[17px] sm:text-[19px] font-bold text-[#1A1A2E] leading-snug">
              {section.title}
            </h2>
          </div>

          <ul className="space-y-3">
            {section.points.map((point, i) => {
              const emailMatch = point.match(/(?:E-?Mail|Email)\s*:\s*(.+)$/i);
              const email = emailMatch?.[1]?.replace(/&nbsp;|\u00A0/g, "").trim();

              return (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-200 ${active ? "bg-[#BF003A]" : "bg-[#D1C7C0] group-hover:bg-[#BF003A]/50"
                    }`} />
                  <span className="text-[13.5px] sm:text-[14.5px] text-[#4B5563] leading-[1.75]">
                    {email ? (
                      <>
                        <span className="font-semibold text-[#374151]">{ui.email}</span>{" "}
                        <a
                          href={`mailto:${email}`}
                          className="text-[#BF003A] underline underline-offset-2 hover:opacity-75 transition-opacity"
                        >
                          {email}
                        </a>
                      </>
                    ) : (
                      point
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function TermsConditionsSection() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { data, isLoading, error } = useTermsConditionsQuery();

  const ui = language === "de"
    ? {
      email: "E-Mail:",
      pill: "AGB",
      titlePrefix: "Faire Bedingungen,",
      titleAccent: "transparenter",
      titleSuffix: "Service.",
      subtitle: "Klare Regeln fuer die Nutzung unserer Plattform, Bestellungen und den Schutz aller Beteiligten.",
      lastUpdated: "Zuletzt aktualisiert: 21. April 2026",
      sections: "Abschnitte",
      protected: "Verbraucherschutz",
      contents: "Inhalte",
      loading: "AGB werden geladen...",
      legalDetails: "Mehr rechtliche Details?",
      legalHint: "Besuche unser Impressum fuer den vollstaendigen rechtlichen Hinweis.",
      imprint: "Impressum (Rechtlicher Hinweis)",
    }
    : {
      email: "Email:",
      pill: "Terms & Conditions",
      titlePrefix: "Fair terms,",
      titleAccent: "transparent",
      titleSuffix: "service.",
      subtitle: "Clear rules for using our platform, placing orders, and protecting everyone involved.",
      lastUpdated: "Last updated: April 21, 2026",
      sections: "Sections",
      protected: "Consumer Protected",
      contents: "Contents",
      loading: "Loading terms and conditions...",
      legalDetails: "Need more legal details?",
      legalHint: "Visit our Imprint page for full legal notice.",
      imprint: "Imprint (Legal Notice)",
    };

  const sections = useMemo<LocalTermsSection[]>(() => {
    if (!data?.data) {
      return [];
    }

    return data.data
      .filter((item) => item.status === 1)
      .map((item, idx) => ({
        id: String(item.id),
        index: String(idx + 1).padStart(2, "0"),
        title: item.title,
        icon: defaultIcons[idx % defaultIcons.length](),
        points: splitDescription(item.description),
      }));
  }, [data]);

  useEffect(() => {
    if (sections.length > 0 && !activeId) {
      requestAnimationFrame(() => setActiveId(sections[0].id));
    }
  }, [sections, activeId]);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="min-h-screen bg-[#F5F0EC] px-4 py-12 sm:px-6 sm:py-16 font-sans">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E0D8] rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
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

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {ui.lastUpdated}
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              {sections.length || 9} {ui.sections}
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {ui.protected}
            </span>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-52 shrink-0 sticky top-8">
            <div className="bg-white rounded-2xl border border-[#E8E2DC] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-[10px] font-bold tracking-widest text-[#BF003A] uppercase px-2 mb-3">{ui.contents}</p>
              <nav className="space-y-0.5">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-all duration-200 text-[12.5px] font-medium cursor-pointer border-none ${activeId === section.id
                        ? "bg-[#BF003A]/8 text-[#BF003A]"
                        : "text-[#78716C] hover:text-[#1A1A2E] hover:bg-[#F5F0EC] bg-transparent"
                      }`}
                  >
                    <span className={`font-mono text-[10px] font-bold shrink-0 ${activeId === section.id ? "text-[#BF003A]" : "text-[#C4B5AC]"}`}>
                      {section.index}
                    </span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-4">
            {isLoading ? (
              <div className="rounded-2xl border border-[#E8E2DC] bg-white p-6 sm:p-8 text-[#78716C] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {ui.loading}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-[#E8E2DC] bg-white p-6 sm:p-8 text-[#B91C1C] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {error.message}
              </div>
            ) : (
              sections.map((section) => (
                // <SectionCard key={section.id} section={section} active={activeId === section.id} />
                <SectionCard
                  key={section.id}
                  section={section}
                  active={activeId === section.id}
                  ui={{ email: "your@email.com" }}  // pass the required ui prop
                />
              ))
            )}

            {!isLoading && !error && (
              <div className="rounded-2xl border border-[#E8E2DC] bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div>
                  <p className="text-[14px] font-semibold text-[#1A1A2E] mb-0.5">{ui.legalDetails}</p>
                  <p className="text-[13px] text-[#78716C]">{ui.legalHint}</p>
                </div>
                <Link
                  href="/Imprint"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#BF003A] to-[#59001C] px-6 py-2.5 text-[13px] font-bold text-white hover:opacity-90 transition-opacity no-underline"
                >
                  {ui.imprint}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}