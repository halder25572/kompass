// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import gsap from "gsap";

// /* ═══════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════ */
// const occasions = [
//   {
//     id: "Birthday",
//     label: "Birthday",
//     emoji: "🎂",
//     color: "#BF003A",
//     bg: "#FFF0F3",
//     subs: ["Birthday", "Anniversary"],
//   },
//   {
//     id: "School",
//     label: "School",
//     emoji: "🎓",
//     color: "#2563EB",
//     bg: "#EFF6FF",
//     subs: ["Yearbook", "Graduation", "Teacher Farewell", "Kindergarten", "End-of-Year Book"],
//   },
//   {
//     id: "Work",
//     label: "Work",
//     emoji: "💼",
//     color: "#7C3AED",
//     bg: "#F5F3FF",
//     subs: ["Retirement", "Team Book", "Farewell Colleague"],
//   },
//   {
//     id: "Love",
//     label: "Love",
//     emoji: "💍",
//     color: "#DB2777",
//     bg: "#FDF2F8",
//     subs: ["Wedding", "Bachelorette (JGA)", "Anniversary"],
//   },
//   {
//     id: "Family",
//     label: "Family",
//     emoji: "👨‍👩‍👧",
//     color: "#059669",
//     bg: "#ECFDF5",
//     subs: ["Baby Book", "For Mom", "For Dad", "For Grandma / Grandpa", "Family Book"],
//   },
//   {
//     id: "Seasonal",
//     label: "Seasonal",
//     emoji: "🎄",
//     color: "#D97706",
//     bg: "#FFFBEB",
//     subs: ["Christmas", "New Year", "Ramadan / Eid", "Easter", "Halloween"],
//   },
// ];

// const questionsBySubOccasion: Record<string, { q: string; placeholder: string }[]> = {
//   Birthday: [
//     { q: "My life motto:", placeholder: "Words you live by..." },
//     { q: "What I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
//     { q: "My fondest childhood memory:", placeholder: "Share a cherished memory..." },
//     { q: "My ultimate dream:", placeholder: "Your biggest dream..." },
//   ],
//   Anniversary: [
//     { q: "My favourite memory of us:", placeholder: "A special moment together..." },
//     { q: "What I love most about you:", placeholder: "Your smile, your laugh..." },
//     { q: "My wish for our future:", placeholder: "Dreams for us..." },
//   ],
//   Yearbook: [
//     { q: "My favourite subject:", placeholder: "Math, Art, PE..." },
//     { q: "Best school memory:", placeholder: "A moment you'll never forget..." },
//     { q: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
//   ],
//   Graduation: [
//     { q: "My highlight of school:", placeholder: "A trip, a project, a friendship..." },
//     { q: "What I learned:", placeholder: "Skills or life lessons..." },
//     { q: "My plans after graduation:", placeholder: "University, travel, work..." },
//   ],
//   "Teacher Farewell": [
//     { q: "What I admired most about this teacher:", placeholder: "Their patience, creativity..." },
//     { q: "A lesson I'll never forget:", placeholder: "Something they taught me..." },
//     { q: "Thank you for:", placeholder: "Words of gratitude..." },
//   ],
//   Kindergarten: [
//     { q: "My favourite game:", placeholder: "Hide and seek, painting..." },
//     { q: "My best friend:", placeholder: "Who do you love playing with?" },
//     { q: "What I want to be when I grow up:", placeholder: "A superhero? A chef?" },
//   ],
//   "End-of-Year Book": [
//     { q: "My highlight of this year:", placeholder: "A trip, a project..." },
//     { q: "What I learned:", placeholder: "Skills or lessons..." },
//     { q: "My goals for next year:", placeholder: "What I want to achieve..." },
//   ],
//   Retirement: [
//     { q: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
//     { q: "My biggest achievement:", placeholder: "Something you're proud of..." },
//     { q: "Advice for those staying:", placeholder: "Words of wisdom..." },
//   ],
//   "Team Book": [
//     { q: "Best team moment:", placeholder: "A win, a laugh, a milestone..." },
//     { q: "What made our team special:", placeholder: "The culture, the people..." },
//     { q: "What I'll miss most:", placeholder: "The daily standups, lunch trips..." },
//   ],
//   "Farewell Colleague": [
//     { q: "My favourite memory with this colleague:", placeholder: "A funny moment, a project..." },
//     { q: "What made them special:", placeholder: "Their energy, their expertise..." },
//     { q: "My wish for their next chapter:", placeholder: "Success, joy, adventure..." },
//   ],
//   Wedding: [
//     { q: "My wish for the couple:", placeholder: "Love, laughter, adventure..." },
//     { q: "A favourite memory with them:", placeholder: "A special moment together..." },
//     { q: "Advice for a happy marriage:", placeholder: "Your best tip..." },
//   ],
//   "Bachelorette (JGA)": [
//     { q: "My funniest memory with the bride:", placeholder: "A hilarious moment..." },
//     { q: "What I love about her:", placeholder: "Her laugh, her kindness..." },
//     { q: "My wish for her future:", placeholder: "Everything she deserves..." },
//   ],
//   "Baby Book": [
//     { q: "My wish for this little one:", placeholder: "Health, joy, adventure..." },
//     { q: "Advice for new parents:", placeholder: "Your best tip..." },
//     { q: "Something I hope they grow up to love:", placeholder: "Music, books, travel..." },
//   ],
//   "For Mom": [
//     { q: "My favourite thing Mom always says:", placeholder: "Her classic phrase..." },
//     { q: "A lesson Mom taught me:", placeholder: "Something she showed me..." },
//     { q: "My fondest memory with Mom:", placeholder: "A special moment..." },
//   ],
//   "For Dad": [
//     { q: "My favourite thing Dad always does:", placeholder: "His habits, his humour..." },
//     { q: "Something Dad taught me:", placeholder: "A skill, a value..." },
//     { q: "My fondest memory with Dad:", placeholder: "A special moment..." },
//   ],
//   "For Grandma / Grandpa": [
//     { q: "My favourite memory with Grandma/Grandpa:", placeholder: "A special moment..." },
//     { q: "The best thing they taught me:", placeholder: "A lesson or skill..." },
//     { q: "What I love most about them:", placeholder: "Their warmth, their stories..." },
//   ],
//   "Family Book": [
//     { q: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
//     { q: "What family means to me:", placeholder: "In your own words..." },
//     { q: "My favourite family memory:", placeholder: "A moment we all remember..." },
//   ],
//   Christmas: [
//     { q: "My favourite Christmas tradition:", placeholder: "Decorating the tree, carol singing..." },
//     { q: "Best Christmas memory:", placeholder: "A magical moment..." },
//     { q: "My Christmas wish this year:", placeholder: "What I wish for..." },
//   ],
//   "New Year": [
//     { q: "My highlight of this year:", placeholder: "A milestone or memory..." },
//     { q: "My resolution for next year:", placeholder: "What I want to change..." },
//     { q: "My wish for everyone:", placeholder: "Health, joy, success..." },
//   ],
//   "Ramadan / Eid": [
//     { q: "My favourite Ramadan memory:", placeholder: "Iftar together, late nights..." },
//     { q: "What this month means to me:", placeholder: "In your own words..." },
//     { q: "My Eid wish:", placeholder: "For family, for community..." },
//   ],
//   Easter: [
//     { q: "My favourite Easter tradition:", placeholder: "Egg hunts, family meals..." },
//     { q: "Best Easter memory:", placeholder: "A special moment..." },
//     { q: "What Easter means to me:", placeholder: "In your own words..." },
//   ],
//   Halloween: [
//     { q: "Best costume I ever wore:", placeholder: "Describe it..." },
//     { q: "Scariest Halloween memory:", placeholder: "A spooky moment..." },
//     { q: "My favourite Halloween treat:", placeholder: "Candy corn? Chocolate?" },
//   ],
// };

// /* ═══════════════════════════════════════════════════
//    MAIN PAGE
// ═══════════════════════════════════════════════════ */
// export default function SampleBooksPage() {
//   const [activeOccasion, setActiveOccasion] = useState(occasions[0]);
//   const [activeSub, setActiveSub]           = useState(occasions[0].subs[0]);

//   const headerRef   = useRef<HTMLDivElement>(null);
//   const gridRef     = useRef<HTMLDivElement>(null);
//   const detailRef   = useRef<HTMLDivElement>(null);
//   const questRef    = useRef<HTMLDivElement>(null);

//   /* header entrance */
//   useEffect(() => {
//     const els = Array.from(headerRef.current?.children ?? []);
//     gsap.set(els, { opacity: 0, y: 28 });
//     gsap.to(els, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 0.1 });
//   }, []);

//   /* occasion grid entrance */
//   useEffect(() => {
//     const cards = gridRef.current?.querySelectorAll<HTMLElement>(".occ-card");
//     if (!cards) return;
//     gsap.fromTo(cards,
//       { opacity: 0, scale: 0.93, y: 20 },
//       { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "back.out(1.3)", delay: 0.3 }
//     );
//   }, []);

//   /* detail panel re-animate on occasion change */
//   useEffect(() => {
//     if (!detailRef.current) return;
//     gsap.fromTo(detailRef.current,
//       { opacity: 0, x: 16 },
//       { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
//     );
//   }, [activeOccasion]);

//   /* questions re-animate on sub change */
//   useEffect(() => {
//     const rows = questRef.current?.querySelectorAll<HTMLElement>(".q-row");
//     if (!rows) return;
//     gsap.fromTo(rows,
//       { opacity: 0, x: -12 },
//       { opacity: 1, x: 0, duration: 0.32, stagger: 0.06, ease: "power2.out" }
//     );
//   }, [activeSub]);

//   const handleOccasion = (occ: typeof occasions[0]) => {
//     setActiveOccasion(occ);
//     setActiveSub(occ.subs[0]);
//   };

//   const questions = questionsBySubOccasion[activeSub] ?? [];

//   return (
//     <main
//       className="min-h-screen font-sans"
//       style={{
//             backgroundImage: "url('/images/bg1.png')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//         }}
//     >
//       <div className="max-w-250 mx-auto px-5 py-14">

//         {/* ── Header ── */}
//         <div ref={headerRef} className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
//             </svg>
//             <span className="text-[12px] font-semibold text-[#7A1E3A]">Sample Books</span>
//           </div>

//           <h1 className="text-[clamp(28px,5vw,48px)] font-extrabold text-[#1A1A2E] leading-tight mb-4 tracking-tight">
//             Browse by{" "}
//             <span style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               Occasion
//             </span>
//           </h1>
//           <p className="text-[15px] text-gray-500 max-w-110 mx-auto leading-relaxed">
//             Select an occasion to explore its sub-types and the exact questions contributors will answer.
//           </p>
//         </div>

//         {/* ── Two-col layout ── */}
//         <div className="flex flex-col lg:flex-row gap-6">

//           {/* LEFT — occasion grid */}
//           <div className="lg:w-70 shrink-0">
//             <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-1 gap-3">
//               {occasions.map(occ => {
//                 const isActive = occ.id === activeOccasion.id;
//                 return (
//                   <button
//                     key={occ.id}
//                     onClick={() => handleOccasion(occ)}
//                     className={`occ-card flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
//                       isActive
//                         ? "border-[#BF003A] shadow-[0_0_0_2px_rgba(191,0,58,0.15)]"
//                         : "border-transparent hover:border-gray-200"
//                     }`}
//                     style={{ background: isActive ? occ.bg : "#fff" }}
//                   >
//                     <span className="text-2xl">{occ.emoji}</span>
//                     <div>
//                       <p className="text-[14px] font-bold text-[#1A1A2E] m-0">{occ.label}</p>
//                       <p className="text-[11px] text-gray-400 m-0">{occ.subs.length} types</p>
//                     </div>
//                     {isActive && (
//                       <div className="ml-auto w-2 h-2 rounded-full" style={{ background: occ.color }} />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT — detail panel */}
//           <div ref={detailRef} className="flex-1 min-w-0">
//             <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">

//               {/* Panel header */}
//               <div className="px-6 py-5 border-b border-gray-100" style={{ background: activeOccasion.bg }}>
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl">{activeOccasion.emoji}</span>
//                   <div>
//                     <h2 className="text-[20px] font-extrabold text-[#1A1A2E] m-0">{activeOccasion.label}</h2>
//                     <p className="text-[13px] text-gray-500 m-0">{activeOccasion.subs.length} sub-occasions</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Sub-occasion tabs */}
//               <div className="px-6 pt-5 pb-3">
//                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Sub-occasions</p>
//                 <div className="flex flex-wrap gap-2">
//                   {activeOccasion.subs.map(sub => (
//                     <button
//                       key={sub}
//                       onClick={() => setActiveSub(sub)}
//                       className="px-4 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all duration-200"
//                       style={{
//                         background: activeSub === sub ? activeOccasion.color : "#F9FAFB",
//                         color: activeSub === sub ? "#fff" : "#6B7280",
//                         borderColor: activeSub === sub ? activeOccasion.color : "#E5E7EB",
//                       }}
//                     >
//                       {sub}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Questions preview */}
//               <div className="px-6 pb-6 pt-2">
//                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
//                   Questions for &ldquo;{activeSub}&rdquo;
//                 </p>
//                 <div ref={questRef} className="space-y-3">
//                   {questions.map((item, i) => (
//                     <div key={i} className="q-row bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
//                       <p className="text-[13px] font-semibold text-[#1A1A2E] mb-1.5">{item.q}</p>
//                       <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2">
//                         <p className="text-[12px] text-gray-300 m-0 italic">{item.placeholder}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="px-6 pb-6">
//                 <Link
//                   href="/create"
//                   className="flex items-center justify-center gap-2 text-white text-[14px] font-bold py-3.5 rounded-xl no-underline transition-opacity duration-150 hover:opacity-90"
//                   style={{ background: `linear-gradient(102deg, ${activeOccasion.color} 0%, #59001C 100%)` }}
//                 >
//                   Start a &ldquo;{activeSub}&rdquo; Book
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom CTA ── */}
//         <div className="text-center mt-14">
//           <p className="text-[14px] text-gray-500 mb-4">Not sure which to pick? Just start — you can change it later.</p>
//           <Link
//             href="/create"
//             className="inline-flex items-center gap-2 text-white text-[15px] font-bold px-8 py-4 rounded-full no-underline shadow-[0_4px_20px_rgba(191,0,58,0.28)] transition-opacity hover:opacity-90"
//             style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)" }}
//           >
//             Create Your Book
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useBookStore } from "@/store/useBookStore";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const occasions = [
  {
    id: "Birthday",
    label: "Birthday",
    emoji: "🎂",
    color: "#BF003A",
    bg: "#FFF0F3",
    subs: ["Birthday", "Anniversary"],
  },
  {
    id: "School",
    label: "School",
    emoji: "🎓",
    color: "#2563EB",
    bg: "#EFF6FF",
    subs: ["Yearbook", "Graduation", "Teacher Farewell", "Kindergarten", "End-of-Year Book"],
  },
  {
    id: "Work",
    label: "Work",
    emoji: "💼",
    color: "#7C3AED",
    bg: "#F5F3FF",
    subs: ["Retirement", "Team Book", "Farewell Colleague"],
  },
  {
    id: "Love",
    label: "Love",
    emoji: "💍",
    color: "#DB2777",
    bg: "#FDF2F8",
    subs: ["Wedding", "Bachelorette (JGA)", "Anniversary"],
  },
  {
    id: "Family",
    label: "Family",
    emoji: "👨‍👩‍👧",
    color: "#059669",
    bg: "#ECFDF5",
    subs: ["Baby Book", "For Mom", "For Dad", "For Grandma / Grandpa", "Family Book"],
  },
  {
    id: "Seasonal",
    label: "Seasonal",
    emoji: "🎄",
    color: "#D97706",
    bg: "#FFFBEB",
    subs: ["Christmas", "New Year", "Ramadan / Eid", "Easter", "Halloween"],
  },
];

const questionsBySubOccasion: Record<string, { q: string; placeholder: string }[]> = {
  Birthday: [
    { q: "My life motto:", placeholder: "Words you live by..." },
    { q: "What I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
    { q: "My fondest childhood memory:", placeholder: "Share a cherished memory..." },
    { q: "My ultimate dream:", placeholder: "Your biggest dream..." },
  ],
  Anniversary: [
    { q: "My favourite memory of us:", placeholder: "A special moment together..." },
    { q: "What I love most about you:", placeholder: "Your smile, your laugh..." },
    { q: "My wish for our future:", placeholder: "Dreams for us..." },
  ],
  Yearbook: [
    { q: "My favourite subject:", placeholder: "Math, Art, PE..." },
    { q: "Best school memory:", placeholder: "A moment you'll never forget..." },
    { q: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
  ],
  Graduation: [
    { q: "My highlight of school:", placeholder: "A trip, a project, a friendship..." },
    { q: "What I learned:", placeholder: "Skills or life lessons..." },
    { q: "My plans after graduation:", placeholder: "University, travel, work..." },
  ],
  "Teacher Farewell": [
    { q: "What I admired most about this teacher:", placeholder: "Their patience, creativity..." },
    { q: "A lesson I'll never forget:", placeholder: "Something they taught me..." },
    { q: "Thank you for:", placeholder: "Words of gratitude..." },
  ],
  Kindergarten: [
    { q: "My favourite game:", placeholder: "Hide and seek, painting..." },
    { q: "My best friend:", placeholder: "Who do you love playing with?" },
    { q: "What I want to be when I grow up:", placeholder: "A superhero? A chef?" },
  ],
  "End-of-Year Book": [
    { q: "My highlight of this year:", placeholder: "A trip, a project..." },
    { q: "What I learned:", placeholder: "Skills or lessons..." },
    { q: "My goals for next year:", placeholder: "What I want to achieve..." },
  ],
  Retirement: [
    { q: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
    { q: "My biggest achievement:", placeholder: "Something you're proud of..." },
    { q: "Advice for those staying:", placeholder: "Words of wisdom..." },
  ],
  "Team Book": [
    { q: "Best team moment:", placeholder: "A win, a laugh, a milestone..." },
    { q: "What made our team special:", placeholder: "The culture, the people..." },
    { q: "What I'll miss most:", placeholder: "The daily standups, lunch trips..." },
  ],
  "Farewell Colleague": [
    { q: "My favourite memory with this colleague:", placeholder: "A funny moment, a project..." },
    { q: "What made them special:", placeholder: "Their energy, their expertise..." },
    { q: "My wish for their next chapter:", placeholder: "Success, joy, adventure..." },
  ],
  Wedding: [
    { q: "My wish for the couple:", placeholder: "Love, laughter, adventure..." },
    { q: "A favourite memory with them:", placeholder: "A special moment together..." },
    { q: "Advice for a happy marriage:", placeholder: "Your best tip..." },
  ],
  "Bachelorette (JGA)": [
    { q: "My funniest memory with the bride:", placeholder: "A hilarious moment..." },
    { q: "What I love about her:", placeholder: "Her laugh, her kindness..." },
    { q: "My wish for her future:", placeholder: "Everything she deserves..." },
  ],
  "Baby Book": [
    { q: "My wish for this little one:", placeholder: "Health, joy, adventure..." },
    { q: "Advice for new parents:", placeholder: "Your best tip..." },
    { q: "Something I hope they grow up to love:", placeholder: "Music, books, travel..." },
  ],
  "For Mom": [
    { q: "My favourite thing Mom always says:", placeholder: "Her classic phrase..." },
    { q: "A lesson Mom taught me:", placeholder: "Something she showed me..." },
    { q: "My fondest memory with Mom:", placeholder: "A special moment..." },
  ],
  "For Dad": [
    { q: "My favourite thing Dad always does:", placeholder: "His habits, his humour..." },
    { q: "Something Dad taught me:", placeholder: "A skill, a value..." },
    { q: "My fondest memory with Dad:", placeholder: "A special moment..." },
  ],
  "For Grandma / Grandpa": [
    { q: "My favourite memory with Grandma/Grandpa:", placeholder: "A special moment..." },
    { q: "The best thing they taught me:", placeholder: "A lesson or skill..." },
    { q: "What I love most about them:", placeholder: "Their warmth, their stories..." },
  ],
  "Family Book": [
    { q: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
    { q: "What family means to me:", placeholder: "In your own words..." },
    { q: "My favourite family memory:", placeholder: "A moment we all remember..." },
  ],
  Christmas: [
    { q: "My favourite Christmas tradition:", placeholder: "Decorating the tree, carol singing..." },
    { q: "Best Christmas memory:", placeholder: "A magical moment..." },
    { q: "My Christmas wish this year:", placeholder: "What I wish for..." },
  ],
  "New Year": [
    { q: "My highlight of this year:", placeholder: "A milestone or memory..." },
    { q: "My resolution for next year:", placeholder: "What I want to change..." },
    { q: "My wish for everyone:", placeholder: "Health, joy, success..." },
  ],
  "Ramadan / Eid": [
    { q: "My favourite Ramadan memory:", placeholder: "Iftar together, late nights..." },
    { q: "What this month means to me:", placeholder: "In your own words..." },
    { q: "My Eid wish:", placeholder: "For family, for community..." },
  ],
  Easter: [
    { q: "My favourite Easter tradition:", placeholder: "Egg hunts, family meals..." },
    { q: "Best Easter memory:", placeholder: "A special moment..." },
    { q: "What Easter means to me:", placeholder: "In your own words..." },
  ],
  Halloween: [
    { q: "Best costume I ever wore:", placeholder: "Describe it..." },
    { q: "Scariest Halloween memory:", placeholder: "A spooky moment..." },
    { q: "My favourite Halloween treat:", placeholder: "Candy corn? Chocolate?" },
  ],
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function SampleBooksPage() {
  const router = useRouter();
  const setOccasion = useBookStore((s) => s.setOccasion);

  const [activeOccasion, setActiveOccasion] = useState(occasions[0]);
  const [activeSub, setActiveSub]           = useState(occasions[0].subs[0]);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const questRef  = useRef<HTMLDivElement>(null);

  /* header entrance */
  useEffect(() => {
    const els = Array.from(headerRef.current?.children ?? []);
    gsap.set(els, { opacity: 0, y: 28 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 0.1 });
  }, []);

  /* occasion grid entrance */
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".occ-card");
    if (!cards) return;
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.93, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "back.out(1.3)", delay: 0.3 }
    );
  }, []);

  /* detail panel re-animate on occasion change */
  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(detailRef.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [activeOccasion]);

  /* questions re-animate on sub change */
  useEffect(() => {
    const rows = questRef.current?.querySelectorAll<HTMLElement>(".q-row");
    if (!rows) return;
    gsap.fromTo(rows,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.32, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeSub]);

  const handleOccasion = (occ: typeof occasions[0]) => {
    setActiveOccasion(occ);
    setActiveSub(occ.subs[0]);
  };

  // ── START BOOK: save to store then navigate to editor ──
  const handleStart = () => {
    setOccasion(activeOccasion.id, activeSub);
    router.push("/create");
  };

  const questions = questionsBySubOccasion[activeSub] ?? [];

  return (
    <main
      className="min-h-screen font-sans"
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-250 mx-auto px-5 py-14">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#F3C5CE] rounded-full px-4 py-1.5 mb-5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
            <span className="text-[12px] font-semibold text-[#7A1E3A]">Sample Books</span>
          </div>

          <h1 className="text-[clamp(28px,5vw,48px)] font-extrabold text-[#1A1A2E] leading-tight mb-4 tracking-tight">
            Browse by{" "}
            <span style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Occasion
            </span>
          </h1>
          <p className="text-[15px] text-gray-500 max-w-110 mx-auto leading-relaxed">
            Select an occasion to explore its sub-types and the exact questions contributors will answer.
          </p>
        </div>

        {/* ── Two-col layout ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT — occasion grid */}
          <div className="lg:w-70 shrink-0">
            <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {occasions.map(occ => {
                const isActive = occ.id === activeOccasion.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => handleOccasion(occ)}
                    className={`occ-card flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "border-[#BF003A] shadow-[0_0_0_2px_rgba(191,0,58,0.15)]"
                        : "border-transparent hover:border-gray-200"
                    }`}
                    style={{ background: isActive ? occ.bg : "#fff" }}
                  >
                    <span className="text-2xl">{occ.emoji}</span>
                    <div>
                      <p className="text-[14px] font-bold text-[#1A1A2E] m-0">{occ.label}</p>
                      <p className="text-[11px] text-gray-400 m-0">{occ.subs.length} types</p>
                    </div>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full" style={{ background: occ.color }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — detail panel */}
          <div ref={detailRef} className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">

              {/* Panel header */}
              <div className="px-6 py-5 border-b border-gray-100" style={{ background: activeOccasion.bg }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeOccasion.emoji}</span>
                  <div>
                    <h2 className="text-[20px] font-extrabold text-[#1A1A2E] m-0">{activeOccasion.label}</h2>
                    <p className="text-[13px] text-gray-500 m-0">{activeOccasion.subs.length} sub-occasions</p>
                  </div>
                </div>
              </div>

              {/* Sub-occasion tabs */}
              <div className="px-6 pt-5 pb-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Sub-occasions</p>
                <div className="flex flex-wrap gap-2">
                  {activeOccasion.subs.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setActiveSub(sub)}
                      className="px-4 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all duration-200"
                      style={{
                        background: activeSub === sub ? activeOccasion.color : "#F9FAFB",
                        color: activeSub === sub ? "#fff" : "#6B7280",
                        borderColor: activeSub === sub ? activeOccasion.color : "#E5E7EB",
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions preview */}
              <div className="px-6 pb-6 pt-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Questions for &ldquo;{activeSub}&rdquo;
                </p>
                <div ref={questRef} className="space-y-3">
                  {questions.map((item, i) => (
                    <div key={i} className="q-row bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[13px] font-semibold text-[#1A1A2E] mb-1.5">{item.q}</p>
                      <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2">
                        <p className="text-[12px] text-gray-300 m-0 italic">{item.placeholder}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA — use a button instead of a Link so it can save to the store */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleStart}
                  className="w-full flex items-center justify-center gap-2 text-white text-[14px] font-bold py-3.5 rounded-xl transition-opacity duration-150 hover:opacity-90 cursor-pointer border-0"
                  style={{ background: `linear-gradient(102deg, ${activeOccasion.color} 0%, #59001C 100%)` }}
                >
                  Start a &ldquo;{activeSub}&rdquo; Book
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-14">
          <p className="text-[14px] text-gray-500 mb-4">Not sure which to pick? Just start — you can change it later.</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 text-white text-[15px] font-bold px-8 py-4 rounded-full no-underline shadow-[0_4px_20px_rgba(191,0,58,0.28)] transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)" }}
          >
            Create Your Book
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

      </div>
    </main>
  );
}