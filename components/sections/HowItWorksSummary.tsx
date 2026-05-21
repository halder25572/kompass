"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function HowItWorksSummary() {
  const { language } = useLanguage();

  const text =
    language === "de"
      ? {
          title: "So funktioniert es",
          subtitle: "Schneller Ueberblick in 3 einfachen Schritten.",
          cta: "Vollstaendige Anleitung ansehen",
          steps: [
            {
              title: "Projekt erstellen",
              description: "Anlass waehlen, Empfaengerdaten einfuegen und Thema sowie Cover auswaehlen.",
            },
            {
              title: "Beitraege einladen",
              description: "Einladungslink teilen, damit Freunde und Familie Nachrichten und Fotos hinzufuegen.",
            },
            {
              title: "Pruefen und bestellen",
              description: "Alles als Vorschau pruefen, Design bestaetigen und Druck bestellen.",
            },
          ],
        }
      : {
          title: "How It Works",
          subtitle: "Quick overview in 3 simple steps.",
          cta: "View Full How It Works",
          steps: [
            {
              title: "Create Your Book",
              description: "Choose occasion, add recipient details, and pick your theme and cover.",
            },
            {
              title: "Invite Contributors",
              description: "Share the invite link so friends and family can add messages and photos.",
            },
            {
              title: "Preview and Order",
              description: "Preview everything, approve the design, and place your print order.",
            },
          ],
        };

  return (
    <section className="bg-[#EEE] py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1A1A2E]">{text.title}</h2>
          <p className="mt-2 text-[14px] text-[#9CA3AF]">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {text.steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="w-8 h-8 rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-bold flex items-center justify-center mb-3">
                {index + 1}
              </div>
              <h3 className="text-[16px] font-bold text-[#1A1A2E]">{step.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#6B7280] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold text-white no-underline"
            style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)" }}
          >
            {text.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
