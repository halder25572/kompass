// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import gsap from "gsap";
// import { JSX } from "react/jsx-runtime";

// // ── Data ─────────────────────────────────────────────────
// const templates = [
//     { id: 1, name: "Classic", image: "/images/st1.jpg" },
//     { id: 2, name: "Modern", image: "/images/st2.jpg" },
//     { id: 3, name: "Warm & Cozy", image: "/images/st3.jpg" },
//     { id: 4, name: "Vintage", image: "/images/st4.jpg" },
//     { id: 5, name: "Garden", image: "/images/st5.jpg" },
//     { id: 6, name: "Sunset", image: "/images/st6.jpg" },
//     { id: 7, name: "Fresh", image: "/images/st7.jpg" },
//     { id: 8, name: "Confetti", image: "/images/st8.jpg" },
//     { id: 9, name: "Golden", image: "/images/st9.jpg" },
// ];

// const covers = [
//     { id: 1, name: "Classic", image: "/images/ste1.jpg" },
//     { id: 2, name: "Modern", image: "/images/ste2.jpg" },
//     { id: 3, name: "Warm & Cozy", image: "/images/ste3.jpg" },
//     { id: 4, name: "Classic", image: "/images/ste1.jpg" },
//     { id: 5, name: "Modern", image: "/images/ste2.jpg" },
//     { id: 6, name: "Warm & Cozy", image: "/images/ste3.jpg" },
// ];

// const occasions = [
//     {
//         id: "Birthday", label: "Birthday", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
//                 <path d="M12 3v4" /><path d="M9 6l3-3 3 3" />
//             </svg>
//         )
//     },
//     {
//         id: "School", label: "School", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
//             </svg>
//         )
//     },
//     {
//         id: "Farewell", label: "Farewell", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
//             </svg>
//         )
//     },
//     {
//         id: "Love", label: "Love", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//         )
//     },
//     {
//         id: "Family", label: "Family", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
//             </svg>
//         )
//     },
//     {
//         id: "Seasonal", label: "Seasonal", icon: (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
//             </svg>
//         )
//     },
// ];

// const subOccasionsByOccasion: Record<string, string[]> = {
//     Birthday: ["Birthday", "Anniversary"],
//     School: ["Class Book", "Kindergarten", "Farewell Teacher", "End-of-Year Book"],
//     Farewell: ["Retirement", "Team Memory Book"],
//     Love: ["Wedding", "Bachelorette Party (JGA)"],
//     Family: ["Family Book", "For Mom", "For Dad", "Baby Book", "For Grandma / Grandpa"],
//     Seasonal: ["Christmas", "New Year", "Easter", "Halloween"],
// };

// const questionnairesBySubOccasion: Record<
//     string,
//     { id: number; question: string; placeholder: string; checked?: boolean }[]
// > = {
//     Birthday: [
//         { id: 1, question: "My life motto:", placeholder: "Words you live by..." },
//         { id: 2, question: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
//         { id: 3, question: "I get grumpy about:", placeholder: "What grinds your gears?" },
//         { id: 4, question: "The best invention ever:", placeholder: "Coffee? The internet?" },
//         { id: 5, question: "My ultimate dream:", placeholder: "Your biggest dream..." },
//         { id: 6, question: "My fondest childhood memory:", placeholder: "Share a cherished memory...", checked: true },
//     ],
//     Anniversary: [
//         { id: 1, question: "My favourite memory of us:", placeholder: "A special moment together..." },
//         { id: 2, question: "What I love most about you:", placeholder: "Your smile, your laugh..." },
//         { id: 3, question: "My wish for our future:", placeholder: "Dreams for us..." },
//     ],
//     "Class Book": [
//         { id: 1, question: "My favourite subject:", placeholder: "Math, Art, PE..." },
//         { id: 2, question: "Best school memory:", placeholder: "A moment you'll never forget..." },
//         { id: 3, question: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
//     ],
//     Kindergarten: [
//         { id: 1, question: "My favourite game:", placeholder: "Hide and seek, painting..." },
//         { id: 2, question: "My best friend:", placeholder: "Who do you love playing with?" },
//         { id: 3, question: "What I want to be when I grow up:", placeholder: "A superhero? A chef?" },
//     ],
//     "Farewell Teacher": [
//         { id: 1, question: "What I admired most about this teacher:", placeholder: "Their patience, creativity..." },
//         { id: 2, question: "A lesson I'll never forget:", placeholder: "Something they taught me..." },
//         { id: 3, question: "Thank you for:", placeholder: "Words of gratitude..." },
//     ],
//     "End-of-Year Book": [
//         { id: 1, question: "My highlight of this school year:", placeholder: "A trip, a project..." },
//         { id: 2, question: "What I learned:", placeholder: "Skills or lessons..." },
//         { id: 3, question: "My goals for next year:", placeholder: "What I want to achieve..." },
//     ],
//     Retirement: [
//         { id: 1, question: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
//         { id: 2, question: "My biggest achievement:", placeholder: "Something you're proud of..." },
//         { id: 3, question: "Advice for those staying:", placeholder: "Words of wisdom..." },
//     ],
//     "Team Memory Book": [
//         { id: 1, question: "Best team moment:", placeholder: "A win, a laugh, a milestone..." },
//         { id: 2, question: "What made our team special:", placeholder: "The culture, the people..." },
//         { id: 3, question: "What I'll miss most:", placeholder: "The daily standups, lunch trips..." },
//     ],
//     Wedding: [
//         { id: 1, question: "My wish for the couple:", placeholder: "Love, laughter, adventure..." },
//         { id: 2, question: "A favourite memory with the couple:", placeholder: "A special moment together..." },
//         { id: 3, question: "Advice for a happy marriage:", placeholder: "Your best tip..." },
//     ],
//     "Bachelorette Party (JGA)": [
//         { id: 1, question: "My funniest memory with the bride:", placeholder: "A hilarious moment..." },
//         { id: 2, question: "What I love about her:", placeholder: "Her laugh, her kindness..." },
//         { id: 3, question: "My wish for her future:", placeholder: "Everything she deserves..." },
//     ],
//     "Family Book": [
//         { id: 1, question: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
//         { id: 2, question: "What family means to me:", placeholder: "In your own words..." },
//         { id: 3, question: "My favourite family memory:", placeholder: "A moment we all remember..." },
//     ],
//     "For Mom": [
//         { id: 1, question: "My favourite thing Mom always says:", placeholder: "Her classic phrase..." },
//         { id: 2, question: "A lesson Mom taught me:", placeholder: "Something she showed me..." },
//         { id: 3, question: "My fondest memory with Mom:", placeholder: "A special moment..." },
//     ],
//     "For Dad": [
//         { id: 1, question: "My favourite thing Dad always does:", placeholder: "His habits, his humour..." },
//         { id: 2, question: "Something Dad taught me:", placeholder: "A skill, a value..." },
//         { id: 3, question: "My fondest memory with Dad:", placeholder: "A special moment..." },
//     ],
//     "Baby Book": [
//         { id: 1, question: "My wish for this little one:", placeholder: "Health, joy, adventure..." },
//         { id: 2, question: "What I love about babies:", placeholder: "Their laughter, their wonder..." },
//         { id: 3, question: "Advice for new parents:", placeholder: "Your best tip..." },
//     ],
//     "For Grandma / Grandpa": [
//         { id: 1, question: "My favourite memory with Grandma/Grandpa:", placeholder: "A special moment..." },
//         { id: 2, question: "The best thing they taught me:", placeholder: "A lesson or skill..." },
//         { id: 3, question: "What I love most about them:", placeholder: "Their warmth, their stories..." },
//     ],
//     Christmas: [
//         { id: 1, question: "My favourite Christmas tradition:", placeholder: "Decorating the tree, carol singing..." },
//         { id: 2, question: "Best Christmas memory:", placeholder: "A magical moment..." },
//         { id: 3, question: "My Christmas wish:", placeholder: "What I wish for this year..." },
//     ],
//     "New Year": [
//         { id: 1, question: "My highlight of this year:", placeholder: "A milestone or memory..." },
//         { id: 2, question: "My resolution for next year:", placeholder: "What I want to change..." },
//         { id: 3, question: "My wish for everyone:", placeholder: "Health, joy, success..." },
//     ],
//     Easter: [
//         { id: 1, question: "My favourite Easter tradition:", placeholder: "Egg hunts, family meals..." },
//         { id: 2, question: "Best Easter memory:", placeholder: "A special moment..." },
//         { id: 3, question: "What Easter means to me:", placeholder: "In your own words..." },
//     ],
//     Halloween: [
//         { id: 1, question: "Best costume I ever wore:", placeholder: "Describe it..." },
//         { id: 2, question: "Scariest Halloween memory:", placeholder: "A spooky moment..." },
//         { id: 3, question: "My favourite Halloween treat:", placeholder: "Candy corn? Chocolate?" },
//     ],
// };

// // ── Step config ───────────────────────────────────────────
// type ProgressStep = {
//     label: string;
//     icon: JSX.Element;
//     type?: "icon" | "dot";
// };

// const stepConfig: ProgressStep[] = [
//     {
//         label: "Book Details",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
//                 <path d="M1.5 12C1.30109 12 1.11032 11.921 0.96967 11.7803C0.829018 11.6397 0.75 11.4489 0.75 11.25V1.5C0.75 1.30109 0.829018 1.11032 0.96967 0.96967C1.11032 0.829018 1.30109 0.75 1.5 0.75H5.25C6.04565 0.75 6.80871 1.06607 7.37132 1.62868C7.93393 2.19129 8.25 2.95435 8.25 3.75C8.25 2.95435 8.56607 2.19129 9.12868 1.62868C9.69129 1.06607 10.4544 0.75 11.25 0.75H15C15.1989 0.75 15.3897 0.829018 15.5303 0.96967C15.671 1.11032 15.75 1.30109 15.75 1.5V11.25C15.75 11.4489 15.671 11.6397 15.5303 11.7803C15.3897 11.921 15.1989 12 15 12H10.5C9.90326 12 9.33097 12.2371 8.90901 12.659C8.48705 13.081 8.25 13.6533 8.25 14.25C8.25 13.6533 8.01295 13.081 7.59099 12.659C7.16903 12.2371 6.59674 12 6 12H1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//             </svg>
//         ),
//     },
//     {
//         label: "Choose Theme",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                 <path d="M1.99511 10.8951C2.09314 11.1424 2.11496 11.4133 2.05778 11.6731L1.34778 13.8664C1.3249 13.9777 1.33082 14.0929 1.36496 14.2012C1.39911 14.3095 1.46035 14.4073 1.54289 14.4853C1.62543 14.5633 1.72652 14.6189 1.83658 14.6469C1.94664 14.6749 2.06202 14.6742 2.17178 14.6451L4.44711 13.9798C4.69226 13.9312 4.94613 13.9524 5.17978 14.0411C6.60337 14.7059 8.21602 14.8466 9.73321 14.4383C11.2504 14.0299 12.5746 13.0989 13.4722 11.8094C14.3699 10.5198 14.7832 8.95472 14.6393 7.39015C14.4954 5.82557 13.8036 4.36209 12.6858 3.25791C11.5681 2.15373 10.0962 1.47981 8.53003 1.35504C6.96382 1.23028 5.40387 1.6627 4.12541 2.57601C2.84694 3.48931 1.93213 4.82481 1.54237 6.34687C1.15262 7.86894 1.31296 9.47975 1.99511 10.8951Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M6.06055 6.00038C6.21728 5.55482 6.52665 5.17912 6.93385 4.9398C7.34105 4.70049 7.81981 4.61301 8.28533 4.69285C8.75085 4.7727 9.17309 5.01473 9.47727 5.37606C9.78144 5.7374 9.94792 6.19473 9.94721 6.66705C9.94721 8.00038 7.94721 8.66705 7.94721 8.66705" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M8 11.334H8.00667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//             </svg>
//         ),
//     },
//     {
//         label: "Choose Cover",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                 <path d="M9.33398 14H10.0007" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M14 9.33398V10.0007" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M13.9993 12.666C13.9993 13.0196 13.8589 13.3588 13.6088 13.6088C13.3588 13.8589 13.0196 13.9993 12.666 13.9993" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M14 6V6.66667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M2 9.33398V10.0007" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M2 3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M2 6V6.66667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M3.33333 13.9993C2.97971 13.9993 2.64057 13.8589 2.39052 13.6088C2.14048 13.3588 2 13.0196 2 12.666" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M6 14H6.66667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//             </svg>
//         ),
//     },
//     {
//         label: "Questionnaire",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
//                 <circle cx="7" cy="7" r="7" fill="#9CA3AF" />
//             </svg>
//         ),
//     },
//     {
//         label: "Invite",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
//                 <circle cx="7" cy="7" r="7" fill="#9CA3AF" />
//             </svg>
//         ),
//     },
//     {
//         label: "Preview & Order",
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
//                 <path d="M1.33398 14.876C1.33393 13.7854 1.63007 12.7179 2.18688 11.8017C2.74369 10.8855 3.5375 10.1595 4.47305 9.71081C5.4086 9.26211 6.44614 9.10978 7.46116 9.27211C8.47617 9.43444 9.42554 9.90453 10.1953 10.626" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M6.66732 9.20833C8.50827 9.20833 10.0007 7.62267 10.0007 5.66667C10.0007 3.71066 8.50827 2.125 6.66732 2.125C4.82637 2.125 3.33398 3.71066 3.33398 5.66667C3.33398 7.62267 4.82637 9.20833 6.66732 9.20833Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M12.666 11.334V15.584" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 <path d="M14.666 13.459H10.666" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//             </svg>
//         ),
//     },
// ];

// // ── Top Bar ───────────────────────────────────────────────
// function TopBar({ step }: { step: number }) {
//     const TOTAL = stepConfig.length;
//     return (
//         <div className="border-b border-[#f0edf1]">
//             <div className="px-6 pt-4 pb-3 max-w-6xl mx-auto">
//                 <Link href="/" className="inline-flex items-center gap-2">
//                     <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
//                         <Image src="/images/logo.png" width={28} height={28} alt="Logo" className="object-cover" />
//                     </div>
//                     <span className="text-[14px] font-bold text-[#1a1a2e]">Mein HerzGeschenk</span>
//                 </Link>
//             </div>
//             <div className="max-w-4xl mx-auto px-6 pb-5">
//                 <div className="flex items-start">
//                     {stepConfig.map((s, i) => {
//                         const isCompleted = i + 1 < step;
//                         const isActive = i + 1 === step;
//                         const isLast = i === TOTAL - 1;
//                         return (
//                             <div key={i} className="flex items-start flex-1 last:flex-none">
//                                 <div className="flex flex-col items-center shrink-0">
//                                     {/* <span className={`text-[12px] whitespace-nowrap mb-2 leading-none
//                                         ${isActive ? "font-bold text-[#1a1a2e]" : "font-medium text-[#9CA3AF]"}`}>
//                                         {s.label}
//                                     </span>
//                                     <div className={`rounded-full flex items-center justify-center transition-all duration-300
//                                         ${isActive
//                                             ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white shadow-md"
//                                             : isCompleted
//                                                 ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white"
//                                                 : "w-9 h-9 bg-[#eef0f3] text-[#9CA3AF]"}`}>
//                                         {s.icon}
//                                     </div> */}
//                                     <span className={`text-[12px] whitespace-nowrap mb-2 leading-none
//     ${isActive ? "font-bold text-[#1a1a2e]" : "font-medium text-[#9CA3AF]"}`}>
//                                         {s.label}
//                                     </span>

//                                     {s.type === "dot" && !isActive && !isCompleted ? (
//                                         <div className="w-8 h-8 flex items-center justify-center">
//                                             <div className="w-3 h-3 rounded-full bg-[#d1d5db]" />
//                                         </div>
//                                     ) : (
//                                         <div className={`rounded-full flex items-center justify-center transition-all duration-300
//                                         ${isActive
//                                                 ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white shadow-md"
//                                                 : isCompleted
//                                                     ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white"
//                                                     : "w-8 h-8 bg-[#eef0f3] text-[#9CA3AF]"}`}>
//                                             {s.icon}
//                                         </div>
//                                     )}
//                                 </div>
//                                 {!isLast && (
//                                     <div className="flex-1 flex flex-col min-w-0">
//                                         <div className="h-10 w-full shrink-0 flex items-center">
//                                             <div className={`h-1.25 mt-7 w-full translate-y-1.5 transition-all duration-300
//                                                 ${isCompleted ? "bg-[#B91C1C]" : "bg-[#d1d5db]"}`} />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// function CheckIcon() {
//     return (
//         <div className="absolute top-2 right-2 w-5 h-5 bg-[#B91C1C] rounded-full flex items-center justify-center z-10">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="20 6 9 17 4 12" />
//             </svg>
//         </div>
//     );
// }

// // ── Shared BottomNav ──────────────────────────────────────
// function BottomNav({
//     onBack,
//     onNext,
//     nextLabel = "Continue",
//     showBack = true,
//     nextDisabled = false,
// }: {
//     onBack?: () => void;
//     onNext?: () => void;
//     nextLabel?: string;
//     showBack?: boolean;
//     nextDisabled?: boolean;
// }) {
//     const navRef = useRef<HTMLDivElement>(null);
//     const backRef = useRef<HTMLButtonElement>(null);
//     const nextRef = useRef<HTMLButtonElement>(null);

//     const onBackEnter = () => gsap.to(backRef.current, { scale: 1.04, duration: 0.18, ease: "power2.out" });
//     const onBackLeave = () => gsap.to(backRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });
//     const onNextEnter = () => gsap.to(nextRef.current, { scale: 1.03, duration: 0.18, ease: "power2.out" });
//     const onNextLeave = () => gsap.to(nextRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });

//     return (
//         <div ref={navRef} className="sticky bottom-0 backdrop-blur-sm border-t border-[#f0edf1] px-4 sm:px-6 py-4">
//             <div className="max-w-4xl mx-auto flex gap-3">
//                 {showBack && onBack && (
//                     <button
//                         ref={backRef}
//                         onClick={onBack}
//                         onMouseEnter={onBackEnter}
//                         onMouseLeave={onBackLeave}
//                         className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[14px] py-3 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-27.5"
//                     >
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//                         Back
//                     </button>
//                 )}
//                 {onNext && (
//                     <button
//                         ref={nextRef}
//                         onClick={nextDisabled ? undefined : onNext}
//                         onMouseEnter={onNextEnter}
//                         onMouseLeave={onNextLeave}
//                         className="flex-1 flex items-center font-bold justify-center gap-3 
//                         bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] 
//                         hover:bg-[linear-gradient(102deg,#D90042_0%,#7A0026_100%)]
//                         text-white text-base py-4 rounded-2xl cursor-pointer 
//                         transition-all duration-300 
//                         shadow-lg shadow-[#BF003A]/50 
//                         hover:shadow-2xl hover:shadow-[#BF003A]/70 
//                         hover:scale-[1.03] active:scale-[0.98]
//                         focus:outline-none focus:ring-4 focus:ring-[#BF003A]/30
//                         disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
//                         disabled={nextDisabled}
//                     >
//                         {nextLabel}
//                         <svg
//                             width="18"
//                             height="18"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="transition-transform group-hover:translate-x-1"
//                         >
//                             <line x1="5" y1="12" x2="19" y2="12" />
//                             <polyline points="12 5 19 12 12 19" />
//                         </svg>
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }

// // ── Step 1: Book Details ──────────────────────────────────
// function Step1({ onNext }: { onNext: (data: { subTab: string }) => void }) {
//     const [bookTitle, setBookTitle] = useState("");
//     const [bookSubtitle, setBookSubtitle] = useState("");
//     const [recipientName, setRecipientName] = useState("");
//     const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
//     const [selectedSubTab, setSelectedSubTab] = useState("");
//     const [isOccasionModalOpen, setIsOccasionModalOpen] = useState(false);

//     const containerRef = useRef<HTMLDivElement>(null);
//     const headingRef = useRef<HTMLDivElement>(null);
//     const fieldsRef = useRef<HTMLDivElement>(null);
//     const occasionsRef = useRef<HTMLDivElement>(null);
//     const modalOverlayRef = useRef<HTMLDivElement>(null);
//     const modalCardRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//         gsap.set([headingRef.current, fieldsRef.current, occasionsRef.current], { opacity: 0, y: 24 });
//         tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
//             .to(fieldsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
//             .to(occasionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
//     }, []);

//     /* occasion grid re-animate on change */
//     useEffect(() => {
//         const btns = occasionsRef.current?.querySelectorAll<HTMLElement>(".occasion-btn");
//         if (btns) {
//             gsap.fromTo(btns,
//                 { opacity: 0, scale: 0.92 },
//                 { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(1.4)" }
//             );
//         }
//     }, [selectedOccasion]);

//     useEffect(() => {
//         if (isOccasionModalOpen) {
//             gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
//             gsap.fromTo(modalCardRef.current,
//                 { opacity: 0, y: 18, scale: 0.96 },
//                 { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
//             );
//         }
//     }, [isOccasionModalOpen]);

//     const selectedOccasionLabel = occasions.find(occ => occ.id === selectedOccasion)?.label ?? "";
//     const selectedItems = selectedOccasion ? (subOccasionsByOccasion[selectedOccasion] ?? []) : [];

//     const handleOccasionChange = (occasionId: string) => {
//         setSelectedOccasion(occasionId);
//         setSelectedSubTab("");
//         setIsOccasionModalOpen(true);
//     };

//     const handleSubTabSelect = (subTab: string) => {
//         setSelectedSubTab(subTab);
//         setIsOccasionModalOpen(false);
//     };

//     return (
//         <>
//             <div ref={containerRef} className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
//                 <div ref={headingRef} className="mb-6">
//                     <h1 className="text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
//                     <p className="text-[14px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
//                 </div>

//                 <div ref={fieldsRef}>
//                     <div className="mb-4">
//                         <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
//                         <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
//                             className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
//                     </div>
//                     <div className="mb-4">
//                         <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Subtitle</label>
//                         <input value={bookSubtitle} onChange={e => setBookSubtitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
//                             className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
//                     </div>
//                     <div className="mb-5">
//                         <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
//                         <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g., Sarah Johnson"
//                             className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
//                     </div>
//                 </div>

//                 <div ref={occasionsRef} className="mb-4">
//                     <label className="text-[14px] font-semibold text-[#374151] block mb-2">Pick Your Occasion</label>
//                     <div className="grid grid-cols-3 gap-2">
//                         {occasions.map((occ) => (
//                             <button key={occ.id} onClick={() => handleOccasionChange(occ.id)}
//                                 className={`occasion-btn flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border text-[14px] font-medium transition-all cursor-pointer
//                                     ${selectedOccasion === occ.id ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
//                                 <span className={selectedOccasion === occ.id ? "text-[#B91C1C]" : "text-[#9CA3AF]"}>{occ.icon}</span>
//                                 {occ.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {selectedSubTab ? (
//                     <div className="mt-4 rounded-2xl border border-[#f0edf1] bg-white px-4 py-3 shadow-sm">
//                         <div className="flex items-start justify-between gap-3">
//                             <div>
//                                 <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Selected item</p>
//                                 <h3 className="mt-1 text-[15px] font-bold text-[#1a1a2e]">{selectedSubTab}</h3>
//                                 <p className="text-[12px] text-[#9CA3AF]">{selectedOccasionLabel}</p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => setIsOccasionModalOpen(true)}
//                                 className="shrink-0 rounded-full border cursor-pointer border-[#e5e7eb] px-3 py-1.5 text-[12px] font-semibold text-[#374151] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
//                             >
//                                 Change
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <p className="mt-4 text-[12px] text-[#9CA3AF]">Pick an occasion, then choose one item from the modal to continue.</p>
//                 )}
//             </div>

//             {isOccasionModalOpen && selectedOccasion && (
//                 <div ref={modalOverlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
//                     <div ref={modalCardRef} className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#f0edf1] bg-white shadow-2xl">
//                         <div className="flex items-start justify-between gap-4 border-b border-[#f5f2f3] px-5 py-4 sm:px-6">
//                             <div>
//                                 <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Sub Occasion</p>
//                                 <h2 className="mt-1 text-[20px] font-bold text-[#1a1a2e]">{selectedOccasionLabel}</h2>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => setIsOccasionModalOpen(false)}
//                                 className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-full border border-[#e5e7eb] text-[#9CA3AF] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
//                                 aria-label="Close occasion picker"
//                             >
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <line x1="18" y1="6" x2="6" y2="18" />
//                                     <line x1="6" y1="6" x2="18" y2="18" />
//                                 </svg>
//                             </button>
//                         </div>
//                         <div className="p-5 sm:p-6">
//                             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                                 {selectedItems.map((tab) => {
//                                     const isSelected = selectedSubTab === tab;
//                                     return (
//                                         <button
//                                             key={tab}
//                                             type="button"
//                                             onClick={() => handleSubTabSelect(tab)}
//                                             className={`rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${isSelected
//                                                 ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]"
//                                                 : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50 hover:bg-[#fffafb]"
//                                                 }`}
//                                         >
//                                             <div className="flex items-center justify-between gap-3">
//                                                 <span className="text-[14px] font-semibold">{tab}</span>
//                                                 {isSelected && (
//                                                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                                         <polyline points="20 6 9 17 4 12" />
//                                                     </svg>
//                                                 )}
//                                             </div>
//                                             <p className={`mt-1 text-[12px] ${isSelected ? "text-[#B91C1C]/80" : "text-[#9CA3AF]"}`}>
//                                                 Select this item to continue.
//                                             </p>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <BottomNav
//                 showBack={true}
//                 onBack={undefined}
//                 onNext={() => selectedSubTab && onNext({ subTab: selectedSubTab })}
//                 nextDisabled={!selectedSubTab}
//                 nextLabel="Continue"
//             />
//         </>
//     );
// }

// // ── Step 2: Questionnaire ─────────────────────────────────
// function Step2({ onNext, onBack, subTab }: { onNext: () => void; onBack: () => void; subTab: string }) {
//     const [questions, setQuestions] = useState(questionnairesBySubOccasion);
//     const [answers, setAnswers] = useState<Record<string, string>>({});

//     const headingRef = useRef<HTMLDivElement>(null);
//     const cardRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         gsap.set([headingRef.current, cardRef.current], { opacity: 0, y: 24 });
//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//         tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
//             .to(cardRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");

//         const rows = cardRef.current?.querySelectorAll<HTMLElement>(".q-row");
//         if (rows) {
//             gsap.fromTo(rows,
//                 { opacity: 0, x: -14 },
//                 { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.3 }
//             );
//         }
//     }, []);

//     const currentQuestions = questions[subTab] ?? [];

//     const handleAddQuestion = () => {
//         const newQ = { id: Date.now(), question: "New question:", placeholder: "Your answer..." };
//         setQuestions(prev => ({ ...prev, [subTab]: [...(prev[subTab] ?? []), newQ] }));
//     };
//     const handleDeleteQuestion = (id: number) => {
//         setQuestions(prev => ({ ...prev, [subTab]: (prev[subTab] ?? []).filter(q => q.id !== id) }));
//     };

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
//                 <div ref={headingRef} className="flex items-center gap-2 mb-1">
//                     <div className="w-5 h-5 border-2 border-[#B91C1C] rounded flex items-center justify-center shrink-0">
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                         </svg>
//                     </div>
//                     <h1 className="text-[18px] font-bold text-[#1a1a2e]">Questionnaire <span className="uppercase">Birthday</span></h1>
//                 </div>
//                 <h3 className="font-semibold mt-2">Fill in the same questionnaire that invited contributors see.</h3>
//                 <p className="text-[12px] text-[#9CA3AF] mb-5">Feel free to add, remove or rewrite any question — in any language you want.</p>

//                 <div ref={cardRef} className="bg-white rounded-2xl border border-[#f0edf1] overflow-hidden mb-4">
//                     <div className="divide-y divide-[#f9fafb]">
//                         {currentQuestions.map((q) => (
//                             <div key={q.id} className="q-row px-4 py-3">
//                                 <div className="flex items-center justify-between mb-1.5">
//                                     <span className="text-[12px] font-medium text-[#374151]">{q.question}</span>
//                                     <div className="flex items-center gap-2">
//                                         {q.checked && (
//                                             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                                 <polyline points="20 6 9 17 4 12" />
//                                             </svg>
//                                         )}
//                                         <button className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer">
//                                             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                                                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                                             </svg>
//                                         </button>
//                                         <button onClick={() => handleDeleteQuestion(q.id)} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer">
//                                             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <polyline points="3 6 5 6 21 6" />
//                                                 <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                                                 <path d="M10 11v6" /><path d="M14 11v6" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <input
//                                     value={answers[`${subTab}-${q.id}`] ?? ""}
//                                     onChange={e => setAnswers(prev => ({ ...prev, [`${subTab}-${q.id}`]: e.target.value }))}
//                                     placeholder={q.placeholder}
//                                     className="w-full border border-[#f0edf1] rounded-lg px-3 bg-[#fafafa] py-2 text-[12px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-1 focus:ring-[#B91C1C]/30"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="px-4 py-3 border-t border-[#f9fafb]">
//                         <button onClick={handleAddQuestion}
//                             className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-semibold py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//                             </svg>
//                             Add Question
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <BottomNav onBack={onBack} onNext={onNext} nextLabel="Invite Friends" />
//         </>
//     );
// }

// // ── Step 3: Choose a Book Style ───────────────────────────
// function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     const [selected, setSelected] = useState(1);

//     const headingRef = useRef<HTMLDivElement>(null);
//     const gridRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         gsap.set([headingRef.current], { opacity: 0, y: 20 });
//         const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tpl-card");
//         if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });

//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//         tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
//         if (cards) {
//             tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "back.out(1.3)" }, "-=0.25");
//         }
//     }, []);

//     const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
//         if (!e.currentTarget.classList.contains("ring-2")) {
//             gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
//         }
//     };
//     const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
//         gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
//     };

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
//                 <div ref={headingRef} className="mb-5">
//                     <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Book Style</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design template for your book.</p>
//                 </div>
//                 <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {templates.map((tpl) => (
//                         <button key={tpl.id} onClick={() => setSelected(tpl.id)}
//                             onMouseEnter={onCardEnter}
//                             onMouseLeave={onCardLeave}
//                             className={`tpl-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
//                                 ${selected === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
//                             <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
//                                 <Image src={tpl.image} alt={tpl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
//                                 {selected === tpl.id && <CheckIcon />}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
//                                     <span className="text-white text-[11px] sm:text-[12px] font-medium">{tpl.name}</span>
//                                 </div>
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <BottomNav onBack={onBack} onNext={onNext} nextLabel="Choose A Cover" />
//         </>
//     );
// }

// // ── Step 4: Choose a Cover ────────────────────────────────
// function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     const [selected, setSelected] = useState(1);

//     const headingRef = useRef<HTMLDivElement>(null);
//     const gridRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         gsap.set(headingRef.current, { opacity: 0, y: 20 });
//         const cards = gridRef.current?.querySelectorAll<HTMLElement>(".cover-card");
//         if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });

//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//         tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
//         if (cards) {
//             tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "back.out(1.3)" }, "-=0.25");
//         }
//     }, []);

//     const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
//         if (!e.currentTarget.classList.contains("ring-2")) {
//             gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
//         }
//     };
//     const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
//         gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
//     };

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
//                 <div ref={headingRef} className="mb-5">
//                     <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
//                 </div>
//                 <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {covers.map((cover) => (
//                         <button key={cover.id} onClick={() => setSelected(cover.id)}
//                             onMouseEnter={onCardEnter}
//                             onMouseLeave={onCardLeave}
//                             className={`cover-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
//                                 ${selected === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
//                             <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
//                                 <Image src={cover.image} alt={cover.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
//                                 {selected === cover.id && <CheckIcon />}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
//                                     <span className="text-white text-[11px] sm:text-[12px] font-medium">{cover.name}</span>
//                                 </div>
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <BottomNav onBack={onBack} onNext={onNext} nextLabel="Design Questionnaire" />
//         </>
//     );
// }

// // ── Step 5: Invite Friends ────────────────────────────────
// function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     const [email, setEmail] = useState("");
//     const [copied, setCopied] = useState(false);
//     const previewLink = "https://preview--keepsake-craft-h...";

//     const headingRef = useRef<HTMLDivElement>(null);
//     const linkCardRef = useRef<HTMLDivElement>(null);
//     const emailRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         gsap.set([headingRef.current, linkCardRef.current, emailRef.current], { opacity: 0, y: 22 });
//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//         tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
//             .to(linkCardRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
//             .to(emailRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
//     }, []);

//     const handleCopy = () => {
//         navigator.clipboard.writeText(previewLink).catch(() => { });
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
//                 <div ref={headingRef} className="mb-6">
//                     <h1 className="text-[22px] font-bold text-[#1a1a2e]">Invite Friends</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Invite your friends via link.</p>
//                 </div>

//                 <div ref={linkCardRef} className="mb-1.5">
//                     <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-xl px-4 py-2.5">
//                         <span className="flex-1 text-[13px] text-[#374151] truncate">{previewLink}</span>
//                         <button onClick={handleCopy}
//                             className="shrink-0 w-8 h-8 rounded-lg bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] flex items-center justify-center hover:opacity-90 transition-opacity">
//                             {copied ? (
//                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <polyline points="20 6 9 17 4 12" />
//                                 </svg>
//                             ) : (
//                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                     <p className="text-[11px] text-[#9CA3AF] mt-1.5 px-1">Use this link to invite your friends, by copying it and sending it in WhatsApp</p>
//                 </div>

//                 <div ref={emailRef} className="mt-5">
//                     <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email Invite</label>
//                     <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-xl px-4 py-2.5">
//                         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
//                             className="flex-1 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none bg-transparent" />
//                         <button className="shrink-0 w-8 h-8 rounded-lg bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] flex items-center justify-center hover:opacity-90 transition-opacity">
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
//                             </svg>
//                         </button>
//                     </div>
//                     <p className="text-[11px] text-[#9CA3AF] mt-1.5 px-1">Invite your friends by email.</p>
//                 </div>
//             </div>
//             <BottomNav onBack={onBack} onNext={onNext} nextLabel="Preview & Order" />
//         </>
//     );
// }

// // ── Step 6: Preview & Order ──────────────────────────────
// function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
//                 <div className="mb-6">
//                     <h1 className="text-[22px] font-bold text-[#1a1a2e]">Preview & Order</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Review your book setup and place the order.</p>
//                 </div>

//                 <div className="rounded-2xl border border-[#f0edf1] bg-white p-5">
//                     <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-3">Ready to finalize</h2>
//                     <ul className="space-y-2 text-[13px] text-[#4b5563]">
//                         <li>Your book details are completed.</li>
//                         <li>Theme and cover are selected.</li>
//                         <li>Questionnaire and invite steps are finished.</li>
//                     </ul>
//                 </div>
//             </div>

//             <BottomNav onBack={onBack} onNext={onNext} nextLabel="Create Project" />
//         </>
//     );
// }

// // ── Success Modal ─────────────────────────────────────────
// function SuccessModal({ onClose }: { onClose: () => void }) {
//     const overlayRef = useRef<HTMLDivElement>(null);
//     const cardRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 });
//         gsap.fromTo(cardRef.current,
//             { opacity: 0, scale: 0.88, y: 24 },
//             { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.6)" }
//         );
//     }, []);

//     const handleClose = () => {
//         gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
//         gsap.to(cardRef.current, { opacity: 0, scale: 0.9, y: 16, duration: 0.18, onComplete: onClose });
//     };

//     return (
//         <div ref={overlayRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//             <div ref={cardRef} className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
//                 <div className="flex justify-center mb-4">
//                     <div className="w-12 h-12 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                             <polyline points="20 6 9 17 4 12" />
//                         </svg>
//                     </div>
//                 </div>
//                 <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Project Created!</h2>
//                 <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
//                     Your memory book project has been created.
//                 </p>
//                 <Link href="/dashboard">
//                     <button onClick={handleClose}
//                         className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                         Go To The Project
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                             <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//                         </svg>
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }

// // ── Main ─────────────────────────────────────────────────
// export default function BookCreator() {
//     const [step, setStep] = useState(1);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [selectedSubTab, setSelectedSubTab] = useState("Birthday");

//     return (
//         <div className="flex flex-col min-h-screen">
//             <TopBar step={step} />
//             {step === 1 && (
//                 <Step1 onNext={({ subTab }) => { setSelectedSubTab(subTab); setStep(2); }} />
//             )}
//             {step === 2 && <Step3 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
//             {step === 3 && <Step4 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
//             {step === 4 && <Step2 onNext={() => setStep(5)} onBack={() => setStep(3)} subTab={selectedSubTab} />}
//             {step === 5 && <Step5 onNext={() => setStep(6)} onBack={() => setStep(4)} />}
//             {step === 6 && <Step6 onNext={() => setShowSuccess(true)} onBack={() => setStep(5)} />}
//             {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
//         </div>
//     );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { JSX } from "react/jsx-runtime";

// ── Data ─────────────────────────────────────────────────
const templates = [
    { id: 1, name: "Classic", image: "/images/st1.jpg" },
    { id: 2, name: "Modern", image: "/images/st2.jpg" },
    { id: 3, name: "Warm & Cozy", image: "/images/st3.jpg" },
    { id: 4, name: "Vintage", image: "/images/st4.jpg" },
    { id: 5, name: "Garden", image: "/images/st5.jpg" },
    { id: 6, name: "Sunset", image: "/images/st6.jpg" },
    { id: 7, name: "Fresh", image: "/images/st7.jpg" },
    { id: 8, name: "Confetti", image: "/images/st8.jpg" },
    { id: 9, name: "Golden", image: "/images/st9.jpg" },
];

const covers = [
    { id: 1, name: "Classic", image: "/images/ste1.jpg" },
    { id: 2, name: "Modern", image: "/images/ste2.jpg" },
    { id: 3, name: "Warm & Cozy", image: "/images/ste3.jpg" },
    { id: 4, name: "Classic", image: "/images/ste1.jpg" },
    { id: 5, name: "Modern", image: "/images/ste2.jpg" },
    { id: 6, name: "Warm & Cozy", image: "/images/ste3.jpg" },
];

const occasions = [
    {
        id: "Birthday", label: "Birthday", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                <path d="M12 3v4" /><path d="M9 6l3-3 3 3" />
            </svg>
        )
    },
    {
        id: "School", label: "School", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        )
    },
    {
        id: "Farewell", label: "Farewell", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        )
    },
    {
        id: "Love", label: "Love", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        )
    },
    {
        id: "Family", label: "Family", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        id: "Seasonal", label: "Seasonal", icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        )
    },
];

// ── Dynamic placeholders per occasion ────────────────────
const placeholdersByOccasion: Record<string, { title: string; subtitle: string; recipient: string }> = {
    Birthday: {
        title: "e.g., Mom's 60th Birthday Book",
        subtitle: "e.g., 60 years of love and memories",
        recipient: "e.g., Sarah Johnson",
    },
    School: {
        title: "e.g., Class of 2025 Memory Book",
        subtitle: "e.g., A year full of growth and friendship",
        recipient: "e.g., Maria",
    },
    Farewell: {
        title: "e.g., Farewell to an Amazing Colleague",
        subtitle: "e.g., Thank you for everything",
        recipient: "e.g., Thomas",
    },
    Love: {
        title: "e.g., Our Wedding Memory Book",
        subtitle: "e.g., A love story worth remembering",
        recipient: "e.g., Anna & Michael",
    },
    Family: {
        title: "e.g., Our Family Through the Years",
        subtitle: "e.g., Stories and memories we treasure",
        recipient: "e.g., The Johnson Family",
    },
    Seasonal: {
        title: "e.g., Christmas Memories 2024",
        subtitle: "e.g., A festive season to remember",
        recipient: "e.g., Our Family",
    },
};

const defaultPlaceholders = {
    title: "e.g., My Memory Book",
    subtitle: "e.g., A collection of beautiful memories",
    recipient: "e.g., Your Name",
};

const subOccasionsByOccasion: Record<string, string[]> = {
    Birthday: ["Birthday", "Anniversary"],
    School: ["Class Book", "Kindergarten", "Farewell Teacher", "End-of-Year Book"],
    Farewell: ["Retirement", "Team Memory Book"],
    Love: ["Wedding", "Bachelorette Party (JGA)"],
    Family: ["Family Book", "For Mom", "For Dad", "Baby Book", "For Grandma / Grandpa"],
    Seasonal: ["Christmas", "New Year", "Easter", "Halloween"],
};

const questionnairesBySubOccasion: Record<
    string,
    { id: number; question: string; placeholder: string; checked?: boolean }[]
> = {
    Birthday: [
        { id: 1, question: "My life motto:", placeholder: "Words you live by..." },
        { id: 2, question: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
        { id: 3, question: "I get grumpy about:", placeholder: "What grinds your gears?" },
        { id: 4, question: "The best invention ever:", placeholder: "Coffee? The internet?" },
        { id: 5, question: "My ultimate dream:", placeholder: "Your biggest dream..." },
        { id: 6, question: "My fondest childhood memory:", placeholder: "Share a cherished memory...", checked: true },
    ],
    Anniversary: [
        { id: 1, question: "My favourite memory of us:", placeholder: "A special moment together..." },
        { id: 2, question: "What I love most about you:", placeholder: "Your smile, your laugh..." },
        { id: 3, question: "My wish for our future:", placeholder: "Dreams for us..." },
    ],
    "Class Book": [
        { id: 1, question: "My favourite subject:", placeholder: "Math, Art, PE..." },
        { id: 2, question: "Best school memory:", placeholder: "A moment you'll never forget..." },
        { id: 3, question: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
    ],
    Kindergarten: [
        { id: 1, question: "My favourite game:", placeholder: "Hide and seek, painting..." },
        { id: 2, question: "My best friend:", placeholder: "Who do you love playing with?" },
        { id: 3, question: "What I want to be when I grow up:", placeholder: "A superhero? A chef?" },
    ],
    "Farewell Teacher": [
        { id: 1, question: "What I admired most about this teacher:", placeholder: "Their patience, creativity..." },
        { id: 2, question: "A lesson I'll never forget:", placeholder: "Something they taught me..." },
        { id: 3, question: "Thank you for:", placeholder: "Words of gratitude..." },
    ],
    "End-of-Year Book": [
        { id: 1, question: "My highlight of this school year:", placeholder: "A trip, a project..." },
        { id: 2, question: "What I learned:", placeholder: "Skills or lessons..." },
        { id: 3, question: "My goals for next year:", placeholder: "What I want to achieve..." },
    ],
    Retirement: [
        { id: 1, question: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
        { id: 2, question: "My biggest achievement:", placeholder: "Something you're proud of..." },
        { id: 3, question: "Advice for those staying:", placeholder: "Words of wisdom..." },
    ],
    "Team Memory Book": [
        { id: 1, question: "Best team moment:", placeholder: "A win, a laugh, a milestone..." },
        { id: 2, question: "What made our team special:", placeholder: "The culture, the people..." },
        { id: 3, question: "What I'll miss most:", placeholder: "The daily standups, lunch trips..." },
    ],
    Wedding: [
        { id: 1, question: "My wish for the couple:", placeholder: "Love, laughter, adventure..." },
        { id: 2, question: "A favourite memory with the couple:", placeholder: "A special moment together..." },
        { id: 3, question: "Advice for a happy marriage:", placeholder: "Your best tip..." },
    ],
    "Bachelorette Party (JGA)": [
        { id: 1, question: "My funniest memory with the bride:", placeholder: "A hilarious moment..." },
        { id: 2, question: "What I love about her:", placeholder: "Her laugh, her kindness..." },
        { id: 3, question: "My wish for her future:", placeholder: "Everything she deserves..." },
    ],
    "Family Book": [
        { id: 1, question: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
        { id: 2, question: "What family means to me:", placeholder: "In your own words..." },
        { id: 3, question: "My favourite family memory:", placeholder: "A moment we all remember..." },
    ],
    "For Mom": [
        { id: 1, question: "My favourite thing Mom always says:", placeholder: "Her classic phrase..." },
        { id: 2, question: "A lesson Mom taught me:", placeholder: "Something she showed me..." },
        { id: 3, question: "My fondest memory with Mom:", placeholder: "A special moment..." },
    ],
    "For Dad": [
        { id: 1, question: "My favourite thing Dad always does:", placeholder: "His habits, his humour..." },
        { id: 2, question: "Something Dad taught me:", placeholder: "A skill, a value..." },
        { id: 3, question: "My fondest memory with Dad:", placeholder: "A special moment..." },
    ],
    "Baby Book": [
        { id: 1, question: "My wish for this little one:", placeholder: "Health, joy, adventure..." },
        { id: 2, question: "What I love about babies:", placeholder: "Their laughter, their wonder..." },
        { id: 3, question: "Advice for new parents:", placeholder: "Your best tip..." },
    ],
    "For Grandma / Grandpa": [
        { id: 1, question: "My favourite memory with Grandma/Grandpa:", placeholder: "A special moment..." },
        { id: 2, question: "The best thing they taught me:", placeholder: "A lesson or skill..." },
        { id: 3, question: "What I love most about them:", placeholder: "Their warmth, their stories..." },
    ],
    Christmas: [
        { id: 1, question: "My favourite Christmas tradition:", placeholder: "Decorating the tree, carol singing..." },
        { id: 2, question: "Best Christmas memory:", placeholder: "A magical moment..." },
        { id: 3, question: "My Christmas wish:", placeholder: "What I wish for this year..." },
    ],
    "New Year": [
        { id: 1, question: "My highlight of this year:", placeholder: "A milestone or memory..." },
        { id: 2, question: "My resolution for next year:", placeholder: "What I want to change..." },
        { id: 3, question: "My wish for everyone:", placeholder: "Health, joy, success..." },
    ],
    Easter: [
        { id: 1, question: "My favourite Easter tradition:", placeholder: "Egg hunts, family meals..." },
        { id: 2, question: "Best Easter memory:", placeholder: "A special moment..." },
        { id: 3, question: "What Easter means to me:", placeholder: "In your own words..." },
    ],
    Halloween: [
        { id: 1, question: "Best costume I ever wore:", placeholder: "Describe it..." },
        { id: 2, question: "Scariest Halloween memory:", placeholder: "A spooky moment..." },
        { id: 3, question: "My favourite Halloween treat:", placeholder: "Candy corn? Chocolate?" },
    ],
};

// ── Step config ───────────────────────────────────────────
type ProgressStep = {
    label: string;
    icon: JSX.Element;
    type?: "icon" | "dot";
};

const stepConfig: ProgressStep[] = [
    {
        label: "Book Details",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                <path d="M1.5 12C1.30109 12 1.11032 11.921 0.96967 11.7803C0.829018 11.6397 0.75 11.4489 0.75 11.25V1.5C0.75 1.30109 0.829018 1.11032 0.96967 0.96967C1.11032 0.829018 1.30109 0.75 1.5 0.75H5.25C6.04565 0.75 6.80871 1.06607 7.37132 1.62868C7.93393 2.19129 8.25 2.95435 8.25 3.75C8.25 2.95435 8.56607 2.19129 9.12868 1.62868C9.69129 1.06607 10.4544 0.75 11.25 0.75H15C15.1989 0.75 15.3897 0.829018 15.5303 0.96967C15.671 1.11032 15.75 1.30109 15.75 1.5V11.25C15.75 11.4489 15.671 11.6397 15.5303 11.7803C15.3897 11.921 15.1989 12 15 12H10.5C9.90326 12 9.33097 12.2371 8.90901 12.659C8.48705 13.081 8.25 13.6533 8.25 14.25C8.25 13.6533 8.01295 13.081 7.59099 12.659C7.16903 12.2371 6.59674 12 6 12H1.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Choose Theme",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.99511 10.8951C2.09314 11.1424 2.11496 11.4133 2.05778 11.6731L1.34778 13.8664C1.3249 13.9777 1.33082 14.0929 1.36496 14.2012C1.39911 14.3095 1.46035 14.4073 1.54289 14.4853C1.62543 14.5633 1.72652 14.6189 1.83658 14.6469C1.94664 14.6749 2.06202 14.6742 2.17178 14.6451L4.44711 13.9798C4.69226 13.9312 4.94613 13.9524 5.17978 14.0411C6.60337 14.7059 8.21602 14.8466 9.73321 14.4383C11.2504 14.0299 12.5746 13.0989 13.4722 11.8094C14.3699 10.5198 14.7832 8.95472 14.6393 7.39015C14.4954 5.82557 13.8036 4.36209 12.6858 3.25791C11.5681 2.15373 10.0962 1.47981 8.53003 1.35504C6.96382 1.23028 5.40387 1.6627 4.12541 2.57601C2.84694 3.48931 1.93213 4.82481 1.54237 6.34687C1.15262 7.86894 1.31296 9.47975 1.99511 10.8951Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.06055 6.00038C6.21728 5.55482 6.52665 5.17912 6.93385 4.9398C7.34105 4.70049 7.81981 4.61301 8.28533 4.69285C8.75085 4.7727 9.17309 5.01473 9.47727 5.37606C9.78144 5.7374 9.94792 6.19473 9.94721 6.66705C9.94721 8.00038 7.94721 8.66705 7.94721 8.66705" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11.334H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Choose Cover",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M9.33398 14H10.0007" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 9.33398V10.0007" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.9993 12.666C13.9993 13.0196 13.8589 13.3588 13.6088 13.6088C13.3588 13.8589 13.0196 13.9993 12.666 13.9993" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 6V6.66667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 9.33398V10.0007" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 6V6.66667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.33333 13.9993C2.97971 13.9993 2.64057 13.8589 2.39052 13.6088C2.14048 13.3588 2 13.0196 2 12.666" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 14H6.66667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Questionnaire",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#9CA3AF" />
            </svg>
        ),
    },
    {
        label: "Invite",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#9CA3AF" />
            </svg>
        ),
    },
    {
        label: "Preview & Order",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M1.33398 14.876C1.33393 13.7854 1.63007 12.7179 2.18688 11.8017C2.74369 10.8855 3.5375 10.1595 4.47305 9.71081C5.4086 9.26211 6.44614 9.10978 7.46116 9.27211C8.47617 9.43444 9.42554 9.90453 10.1953 10.626" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66732 9.20833C8.50827 9.20833 10.0007 7.62267 10.0007 5.66667C10.0007 3.71066 8.50827 2.125 6.66732 2.125C4.82637 2.125 3.33398 3.71066 3.33398 5.66667C3.33398 7.62267 4.82637 9.20833 6.66732 9.20833Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.666 11.334V15.584" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.666 13.459H10.666" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

// ── Top Bar ───────────────────────────────────────────────
function TopBar({ step }: { step: number }) {
    const TOTAL = stepConfig.length;
    return (
        <div className="border-b border-[#f0edf1]">
            <div className="px-6 pt-4 pb-3 max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
                        <Image src="/images/logo.png" width={28} height={28} alt="Logo" className="object-cover" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1a1a2e]">Mein HerzGeschenk</span>
                </Link>
            </div>
            <div className="max-w-4xl mx-auto px-6 pb-5">
                <div className="flex items-start">
                    {stepConfig.map((s, i) => {
                        const isCompleted = i + 1 < step;
                        const isActive = i + 1 === step;
                        const isLast = i === TOTAL - 1;
                        return (
                            <div key={i} className="flex items-start flex-1 last:flex-none">
                                <div className="flex flex-col items-center shrink-0">
                                    <span className={`text-[12px] whitespace-nowrap mb-2 leading-none
                                        ${isActive ? "font-bold text-[#1a1a2e]" : "font-medium text-[#9CA3AF]"}`}>
                                        {s.label}
                                    </span>
                                    {s.type === "dot" && !isActive && !isCompleted ? (
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-[#d1d5db]" />
                                        </div>
                                    ) : (
                                        <div className={`rounded-full flex items-center justify-center transition-all duration-300
                                            ${isActive
                                                ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white shadow-md"
                                                : isCompleted
                                                    ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white"
                                                    : "w-8 h-8 bg-[#eef0f3] text-[#9CA3AF]"}`}>
                                            {s.icon}
                                        </div>
                                    )}
                                </div>
                                {!isLast && (
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="h-10 w-full shrink-0 flex items-center">
                                            <div className={`h-1.25 mt-7 w-full translate-y-1.5 transition-all duration-300
                                                ${isCompleted ? "bg-[#B91C1C]" : "bg-[#d1d5db]"}`} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <div className="absolute top-2 right-2 w-5 h-5 bg-[#B91C1C] rounded-full flex items-center justify-center z-10">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
    );
}

// ── Shared BottomNav ──────────────────────────────────────
function BottomNav({
    onBack,
    onNext,
    nextLabel = "Continue",
    showBack = true,
    nextDisabled = false,
}: {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    showBack?: boolean;
    nextDisabled?: boolean;
}) {
    const backRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const onBackEnter = () => gsap.to(backRef.current, { scale: 1.04, duration: 0.18, ease: "power2.out" });
    const onBackLeave = () => gsap.to(backRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });
    const onNextEnter = () => gsap.to(nextRef.current, { scale: 1.03, duration: 0.18, ease: "power2.out" });
    const onNextLeave = () => gsap.to(nextRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });

    return (
        <div className="sticky bottom-0 backdrop-blur-sm border-t border-[#f0edf1] px-4 sm:px-6 py-4">
            <div className="max-w-4xl mx-auto flex gap-3">
                {showBack && onBack && (
                    <button
                        ref={backRef}
                        onClick={onBack}
                        onMouseEnter={onBackEnter}
                        onMouseLeave={onBackLeave}
                        className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[14px] py-3 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-27.5"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                    </button>
                )}
                {onNext && (
                    <button
                        ref={nextRef}
                        onClick={nextDisabled ? undefined : onNext}
                        onMouseEnter={onNextEnter}
                        onMouseLeave={onNextLeave}
                        className="flex-1 flex items-center font-bold justify-center gap-3 
                        bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] 
                        text-white text-base py-4 rounded-2xl cursor-pointer 
                        transition-all duration-300 
                        shadow-lg shadow-[#BF003A]/50 
                        hover:shadow-2xl hover:shadow-[#BF003A]/70 
                        hover:scale-[1.03] active:scale-[0.98]
                        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                        disabled={nextDisabled}
                    >
                        {nextLabel}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Step 1: Book Details ──────────────────────────────────
function Step1({ onNext }: { onNext: (data: { subTab: string; occasion: string }) => void }) {
    const [bookTitle, setBookTitle] = useState("");
    const [bookSubtitle, setBookSubtitle] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedSubTab, setSelectedSubTab] = useState("");
    const [isOccasionModalOpen, setIsOccasionModalOpen] = useState(false);

    const headingRef = useRef<HTMLDivElement>(null);
    const fieldsRef = useRef<HTMLDivElement>(null);
    const occasionsRef = useRef<HTMLDivElement>(null);
    const modalOverlayRef = useRef<HTMLDivElement>(null);
    const modalCardRef = useRef<HTMLDivElement>(null);

    // ── Dynamic placeholders based on selected occasion ──
    const ph = selectedOccasion
        ? (placeholdersByOccasion[selectedOccasion] ?? defaultPlaceholders)
        : defaultPlaceholders;

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        gsap.set([headingRef.current, fieldsRef.current, occasionsRef.current], { opacity: 0, y: 24 });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
            .to(fieldsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
            .to(occasionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, []);

    useEffect(() => {
        const btns = occasionsRef.current?.querySelectorAll<HTMLElement>(".occasion-btn");
        if (btns) {
            gsap.fromTo(btns,
                { opacity: 0, scale: 0.92 },
                { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(1.4)" }
            );
        }
    }, [selectedOccasion]);

    useEffect(() => {
        if (isOccasionModalOpen) {
            gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
            gsap.fromTo(modalCardRef.current,
                { opacity: 0, y: 18, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
            );
        }
    }, [isOccasionModalOpen]);

    const selectedOccasionLabel = occasions.find(occ => occ.id === selectedOccasion)?.label ?? "";
    const selectedItems = selectedOccasion ? (subOccasionsByOccasion[selectedOccasion] ?? []) : [];

    const handleOccasionChange = (occasionId: string) => {
        setSelectedOccasion(occasionId);
        setSelectedSubTab("");
        setIsOccasionModalOpen(true);
    };

    const handleSubTabSelect = (subTab: string) => {
        setSelectedSubTab(subTab);
        setIsOccasionModalOpen(false);
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
                    <p className="text-[14px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
                </div>

                <div ref={fieldsRef}>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
                        <input
                            value={bookTitle}
                            onChange={e => setBookTitle(e.target.value)}
                            placeholder={ph.title}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Subtitle</label>
                        <input
                            value={bookSubtitle}
                            onChange={e => setBookSubtitle(e.target.value)}
                            placeholder={ph.subtitle}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
                        <input
                            value={recipientName}
                            onChange={e => setRecipientName(e.target.value)}
                            placeholder={ph.recipient}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                        />
                    </div>
                </div>

                <div ref={occasionsRef} className="mb-4">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-2">Pick Your Occasion</label>
                    <div className="grid grid-cols-3 gap-2">
                        {occasions.map((occ) => (
                            <button key={occ.id} onClick={() => handleOccasionChange(occ.id)}
                                className={`occasion-btn flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border text-[14px] font-medium transition-all cursor-pointer
                                    ${selectedOccasion === occ.id ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
                                <span className={selectedOccasion === occ.id ? "text-[#B91C1C]" : "text-[#9CA3AF]"}>{occ.icon}</span>
                                {occ.label}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedSubTab ? (
                    <div className="mt-4 rounded-2xl border border-[#f0edf1] bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Selected item</p>
                                <h3 className="mt-1 text-[15px] font-bold text-[#1a1a2e]">{selectedSubTab}</h3>
                                <p className="text-[12px] text-[#9CA3AF]">{selectedOccasionLabel}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOccasionModalOpen(true)}
                                className="shrink-0 rounded-full border cursor-pointer border-[#e5e7eb] px-3 py-1.5 text-[12px] font-semibold text-[#374151] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-[12px] text-[#9CA3AF]">Pick an occasion, then choose one item from the modal to continue.</p>
                )}
            </div>

            {isOccasionModalOpen && selectedOccasion && (
                <div ref={modalOverlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
                    <div ref={modalCardRef} className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#f0edf1] bg-white shadow-2xl">
                        <div className="flex items-start justify-between gap-4 border-b border-[#f5f2f3] px-5 py-4 sm:px-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Sub Occasion</p>
                                <h2 className="mt-1 text-[20px] font-bold text-[#1a1a2e]">{selectedOccasionLabel}</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOccasionModalOpen(false)}
                                className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-full border border-[#e5e7eb] text-[#9CA3AF] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {selectedItems.map((tab) => {
                                    const isSelected = selectedSubTab === tab;
                                    return (
                                        <button key={tab} type="button" onClick={() => handleSubTabSelect(tab)}
                                            className={`rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${isSelected
                                                ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]"
                                                : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50 hover:bg-[#fffafb]"}`}>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-[14px] font-semibold">{tab}</span>
                                                {isSelected && (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className={`mt-1 text-[12px] ${isSelected ? "text-[#B91C1C]/80" : "text-[#9CA3AF]"}`}>
                                                Select this item to continue.
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav
                showBack={true}
                onBack={undefined}
                onNext={() => selectedSubTab && onNext({ subTab: selectedSubTab, occasion: selectedOccasion ?? "" })}
                nextDisabled={!selectedSubTab}
                nextLabel="Continue"
            />
        </>
    );
}

// ── Step 2: Questionnaire ─────────────────────────────────
// FIX: nextLabel changed from "Choose A Book Style" → "Invite Friends"
function Step2({ onNext, onBack, subTab }: { onNext: () => void; onBack: () => void; subTab: string }) {
    const [questions, setQuestions] = useState(questionnairesBySubOccasion);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const headingRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current, cardRef.current], { opacity: 0, y: 24 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
            .to(cardRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");

        const rows = cardRef.current?.querySelectorAll<HTMLElement>(".q-row");
        if (rows) {
            gsap.fromTo(rows,
                { opacity: 0, x: -14 },
                { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.3 }
            );
        }
    }, []);

    const currentQuestions = questions[subTab] ?? [];

    const handleAddQuestion = () => {
        const newQ = { id: Date.now(), question: "New question:", placeholder: "Your answer..." };
        setQuestions(prev => ({ ...prev, [subTab]: [...(prev[subTab] ?? []), newQ] }));
    };
    const handleDeleteQuestion = (id: number) => {
        setQuestions(prev => ({ ...prev, [subTab]: (prev[subTab] ?? []).filter(q => q.id !== id) }));
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
                <div ref={headingRef} className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 border-2 border-[#B91C1C] rounded flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-[18px] font-bold text-[#1a1a2e]">Questionnaire <span className="uppercase">{subTab}</span></h1>
                </div>
                <h3 className="font-semibold mt-2">Fill in the same questionnaire that invited contributors see.</h3>
                <p className="text-[12px] text-[#9CA3AF] mb-5">Feel free to add, remove or rewrite any question — in any language you want.</p>

                <div ref={cardRef} className="bg-white rounded-2xl border border-[#f0edf1] overflow-hidden mb-4">
                    <div className="divide-y divide-[#f9fafb]">
                        {currentQuestions.map((q) => (
                            <div key={q.id} className="q-row px-4 py-3">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[12px] font-medium text-[#374151]">{q.question}</span>
                                    <div className="flex items-center gap-2">
                                        {q.checked && (
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                        <button className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDeleteQuestion(q.id)} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6" /><path d="M14 11v6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <input
                                    value={answers[`${subTab}-${q.id}`] ?? ""}
                                    onChange={e => setAnswers(prev => ({ ...prev, [`${subTab}-${q.id}`]: e.target.value }))}
                                    placeholder={q.placeholder}
                                    className="w-full border border-[#f0edf1] rounded-lg px-3 bg-[#fafafa] py-2 text-[12px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-1 focus:ring-[#B91C1C]/30"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-3 border-t border-[#f9fafb]">
                        <button onClick={handleAddQuestion}
                            className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-semibold py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add Question
                        </button>
                    </div>
                </div>
            </div>

            {/* FIX: "Choose A Book Style" → "Invite Friends" */}
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Invite Friends" />
        </>
    );
}

// ── Step 3: Choose a Book Style ───────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);

    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current], { opacity: 0, y: 20 });
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tpl-card");
        if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
        if (cards) {
            tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "back.out(1.3)" }, "-=0.25");
        }
    }, []);

    const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.classList.contains("ring-2")) {
            gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
        }
    };
    const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Book Style</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design template for your book.</p>
                </div>
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {templates.map((tpl) => (
                        <button key={tpl.id} onClick={() => setSelected(tpl.id)}
                            onMouseEnter={onCardEnter}
                            onMouseLeave={onCardLeave}
                            className={`tpl-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
                                ${selected === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
                                <Image src={tpl.image} alt={tpl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                {selected === tpl.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{tpl.name}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Choose A Cover" />
        </>
    );
}

// ── Step 4: Choose a Cover ────────────────────────────────
// FIX: nextLabel is "Design Questionnaire" (already correct per PDF)
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);

    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set(headingRef.current, { opacity: 0, y: 20 });
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".cover-card");
        if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
        if (cards) {
            tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "back.out(1.3)" }, "-=0.25");
        }
    }, []);

    const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.classList.contains("ring-2")) {
            gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
        }
    };
    const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
                </div>
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {covers.map((cover) => (
                        <button key={cover.id} onClick={() => setSelected(cover.id)}
                            onMouseEnter={onCardEnter}
                            onMouseLeave={onCardLeave}
                            className={`cover-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
                                ${selected === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
                                <Image src={cover.image} alt={cover.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                {selected === cover.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{cover.name}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Design Questionnaire" />
        </>
    );
}

// ── Step 5: Invite Friends ────────────────────────────────
function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [email, setEmail] = useState("");
    const [copied, setCopied] = useState(false);
    const previewLink = "https://preview--keepsake-craft-h...";

    const headingRef = useRef<HTMLDivElement>(null);
    const linkCardRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current, linkCardRef.current, emailRef.current], { opacity: 0, y: 22 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
            .to(linkCardRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
            .to(emailRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(previewLink).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Invite Friends</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Invite your friends via link.</p>
                </div>

                <div ref={linkCardRef} className="mb-1.5">
                    <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-xl px-4 py-2.5">
                        <span className="flex-1 text-[13px] text-[#374151] truncate">{previewLink}</span>
                        <button onClick={handleCopy}
                            className="shrink-0 w-8 h-8 rounded-lg bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] flex items-center justify-center hover:opacity-90 transition-opacity">
                            {copied ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-1.5 px-1">Use this link to invite your friends, by copying it and sending it in WhatsApp</p>
                </div>

                <div ref={emailRef} className="mt-5">
                    <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email Invite</label>
                    <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-xl px-4 py-2.5">
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                            className="flex-1 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none bg-transparent" />
                        <button className="shrink-0 w-8 h-8 rounded-lg bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] flex items-center justify-center hover:opacity-90 transition-opacity">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-1.5 px-1">Invite your friends by email.</p>
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Preview & Order" />
        </>
    );
}

// ── Step 6: Preview & Order ──────────────────────────────
function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Preview & Order</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Review your book setup and place the order.</p>
                </div>
                <div className="rounded-2xl border border-[#f0edf1] bg-white p-5">
                    <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-3">Ready to finalize</h2>
                    <ul className="space-y-2 text-[13px] text-[#4b5563]">
                        <li>Your book details are completed.</li>
                        <li>Theme and cover are selected.</li>
                        <li>Questionnaire and invite steps are finished.</li>
                    </ul>
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Create Project" />
        </>
    );
}

// ── Success Modal ─────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 });
        gsap.fromTo(cardRef.current,
            { opacity: 0, scale: 0.88, y: 24 },
            { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.6)" }
        );
    }, []);

    const handleClose = () => {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
        gsap.to(cardRef.current, { opacity: 0, scale: 0.9, y: 16, duration: 0.18, onComplete: onClose });
    };

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div ref={cardRef} className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Project Created!</h2>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                    Your memory book project has been created.
                </p>
                <Link href="/dashboard">
                    <button onClick={handleClose}
                        className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                        Go To The Project
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
}

// ── Main ─────────────────────────────────────────────────
export default function BookCreator() {
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedSubTab, setSelectedSubTab] = useState("Birthday");

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar step={step} />
            {step === 1 && (
                <Step1 onNext={({ subTab, occasion }) => {
                    setSelectedSubTab(subTab);
                    setStep(2);
                    void occasion;
                }} />
            )}
            {step === 2 && <Step3 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step4 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <Step2 onNext={() => setStep(5)} onBack={() => setStep(3)} subTab={selectedSubTab} />}
            {step === 5 && <Step5 onNext={() => setStep(6)} onBack={() => setStep(4)} />}
            {step === 6 && <Step6 onNext={() => setShowSuccess(true)} onBack={() => setStep(5)} />}
            {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        </div>
    );
}