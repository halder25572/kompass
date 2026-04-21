// import Link from "next/link";

// const policySections = [
//   {
//     title: "1. Information We Collect",
//     points: [
//       "Account details such as your name, email address, and login credentials.",
//       "Book project details including messages, photos, and participant inputs you choose to upload.",
//       "Technical information such as browser type, device information, and usage analytics.",
//     ],
//   },
//   {
//     title: "2. How We Use Your Data",
//     points: [
//       "To provide and improve the Memory Book platform and related services.",
//       "To manage your projects, invitations, printing, and delivery operations.",
//       "To send essential service emails, reminders, and account notifications.",
//     ],
//   },
//   {
//     title: "3. Sharing and Processing",
//     points: [
//       "We share data only with trusted service providers required for hosting, payment, printing, and shipping.",
//       "We do not sell your personal data to third parties.",
//       "All processors are required to follow data protection standards and confidentiality obligations.",
//     ],
//   },
//   {
//     title: "4. Data Retention",
//     points: [
//       "We keep your data only as long as necessary to provide services or comply with legal obligations.",
//       "You may request deletion of your account and related data, subject to legal retention rules.",
//     ],
//   },
//   {
//     title: "5. Your Privacy Rights",
//     points: [
//       "You can request access, correction, deletion, or restriction of your personal data.",
//       "You can object to certain processing or request portability where applicable.",
//       "You may contact us at any time for privacy-related requests.",
//     ],
//   },
//   {
//     title: "6. Cookies and Analytics",
//     points: [
//       "We use essential cookies for authentication and platform security.",
//       "Optional analytics tools help us understand site performance and improve user experience.",
//       "You can manage cookie preferences through your browser settings.",
//     ],
//   },
//   {
//     title: "7. Contact",
//     points: [
//       "If you have questions about this Privacy Policy, please contact our support team.",
//       "Email: privacy@meinherzgeschenk.de",
//     ],
//   },
// ];

// export default function PrivacyPolicySection() {
//   return (
//     <section className="min-h-screen bg-[#EEE] px-4 py-10 sm:px-6 sm:py-14">
//       <div className="mx-auto w-full max-w-5xl">
//         <div className="mb-10 text-center sm:mb-14">
//           <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#1A1A2E] sm:text-6xl">
//             Privacy <span className="text-[#7A1E3A]">Policy</span>
//           </h1>

//           <p className="mt-5 text-base text-[#94A3B8] sm:text-[18px] sm:leading-normal">
//             Clear information on how we protect and use your data.
//           </p>

//           <div className="mt-6 flex items-start justify-center gap-2 sm:mt-8">
          
//             <div className="text-left">
//               <p className="text-3xl font-bold text-[#111827] sm:text-[44px] sm:leading-tight">Your data, <span className="text-[#7A1E3A]">safely protected</span></p>
//               <p className="text-xl font-semibold text-[#94A3B8] sm:text-[18px] text-center">Used only to deliver your best experience.</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
//           <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#7A1E3A]">
//             Legal
//           </p>
//           <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-[#111827]">
//             Privacy Policy
//           </h1>
//           <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4B5563]">
//             Your privacy matters to us. This page explains how we collect, use, and protect your personal data when you use
//             Mein HerzGeschenk.
//           </p>
//           <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">Last updated: April 21, 2026</p>

//           <div className="mt-8 space-y-5 sm:space-y-6">
//             {policySections.map((section) => (
//               <article
//                 key={section.title}
//                 className="rounded-2xl border border-[#F1F5F9] bg-[#FCFCFD] p-4 sm:p-6"
//               >
//                 <h2 className="text-lg sm:text-xl font-bold text-[#111827]">{section.title}</h2>
//                 <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed text-[#374151]">
//                   {section.points.map((point) => (
//                     <li key={point}>{point}</li>
//                   ))}
//                 </ul>
//               </article>
//             ))}
//           </div>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
//             <p className="text-sm sm:text-base text-[#374151]">
//               For additional legal information, visit our imprint page.
//             </p>
//             <Link
//               href="/Imprint"
//               className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
//             >
//               Imprint (Legal Notice)
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const policySections = [
  {
    id: "info",
    index: "01",
    title: "Information We Collect",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    points: [
      "Account details such as your name, email address, and login credentials.",
      "Book project details including messages, photos, and participant inputs you choose to upload.",
      "Technical information such as browser type, device information, and usage analytics.",
    ],
  },
  {
    id: "usage",
    index: "02",
    title: "How We Use Your Data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    points: [
      "To provide and improve the Memory Book platform and related services.",
      "To manage your projects, invitations, printing, and delivery operations.",
      "To send essential service emails, reminders, and account notifications.",
    ],
  },
  {
    id: "sharing",
    index: "03",
    title: "Sharing and Processing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    points: [
      "We share data only with trusted service providers required for hosting, payment, printing, and shipping.",
      "We do not sell your personal data to third parties.",
      "All processors are required to follow data protection standards and confidentiality obligations.",
    ],
  },
  {
    id: "retention",
    index: "04",
    title: "Data Retention",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    points: [
      "We keep your data only as long as necessary to provide services or comply with legal obligations.",
      "You may request deletion of your account and related data, subject to legal retention rules.",
    ],
  },
  {
    id: "rights",
    index: "05",
    title: "Your Privacy Rights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    points: [
      "You can request access, correction, deletion, or restriction of your personal data.",
      "You can object to certain processing or request portability where applicable.",
      "You may contact us at any time for privacy-related requests.",
    ],
  },
  {
    id: "cookies",
    index: "06",
    title: "Cookies and Analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    points: [
      "We use essential cookies for authentication and platform security.",
      "Optional analytics tools help us understand site performance and improve user experience.",
      "You can manage cookie preferences through your browser settings.",
    ],
  },
  {
    id: "contact",
    index: "07",
    title: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    points: [
      "If you have questions about this Privacy Policy, please contact our support team.",
      "Email: privacy@meinherzgeschenk.de",
    ],
  },
];

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ section, active }: { section: typeof policySections[0]; active: boolean }) {
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
                  {point.startsWith("Email:") ? (
                    <>
                      <span className="font-semibold text-[#374151]">Email: </span>
                      <a href="mailto:privacy@meinherzgeschenk.de" className="text-[#BF003A] underline underline-offset-2 hover:opacity-75 transition-opacity">
                        privacy@meinherzgeschenk.de
                      </a>
                    </>
                  ) : point}
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
  const [activeId, setActiveId] = useState("info");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // scroll spy
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    policySections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

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
            <span className="text-[11px] font-bold tracking-widest text-[#7A1E3A] uppercase">Privacy Policy</span>
          </div>

          <h1 className="text-[clamp(38px,6vw,66px)] font-extrabold text-[#1A1A2E] leading-[1.06] tracking-[-1.5px] mb-5">
            Your data,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#BF003A]">safely</span>
              <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#BF003A]/12 rounded-full" />
            </span>
            {" "}protected.
          </h1>

          <p className="text-[15px] text-[#8B8480] max-w-md mx-auto leading-[1.7]">
            Clear information on how we collect, use, and protect your personal data.
          </p>

          {/* meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Last updated: April 21, 2026
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              7 Sections
            </span>
            <span className="w-px h-3 bg-[#D5CEC9]" />
            <span className="flex items-center gap-1.5 text-[12px] text-[#9B9490] font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round">
                <path d="M1 6s1-1 4-1 5 2 8 2 4-1 4-1V22s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="1" y1="1" x2="1" y2="6"/>
              </svg>
              GDPR Compliant
            </span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex gap-8 items-start">

          {/* sticky sidebar nav — hidden on mobile */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-8">
            <div className="bg-white rounded-2xl border border-[#E8E2DC] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-[10px] font-bold tracking-widest text-[#BF003A] uppercase px-2 mb-3">Contents</p>
              <nav className="space-y-0.5">
                {policySections.map(s => (
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
            {policySections.map(s => (
              <SectionCard key={s.id} section={s} active={activeId === s.id} />
            ))}

            {/* footer card */}
            <div className="rounded-2xl border border-[#E8E2DC] bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div>
                <p className="text-[14px] font-semibold text-[#1A1A2E] mb-0.5">Need more legal details?</p>
                <p className="text-[13px] text-[#78716C]">Visit our Imprint page for full legal notice.</p>
              </div>
              <Link
                href="/Imprint"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#BF003A] to-[#59001C] px-6 py-2.5 text-[13px] font-bold text-white hover:opacity-90 transition-opacity no-underline"
              >
                Imprint (Legal Notice)
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}