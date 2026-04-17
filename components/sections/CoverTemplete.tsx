// // "use client";

// // import Image from "next/image";
// // import { useState, useEffect, useRef } from "react";
// // import gsap from "gsap";

// // const categories = ["All", "Birthday", "Anniversary", "Farewell", "Graduation", "Celebration"];

// // const templates = [
// //     { id: 1, category: "BIRTHDAY", title: "Golden Elegance", description: "Luxurious gold frame design with ornate details and warm tones. Perfect for milestone birthdays.", image: "/images/c1.jpg", popular: false },
// //     { id: 2, category: "FAREWELL", title: "Bold Minimal", description: "Striking black and white geometric design with maximum visual impact.", image: "/images/c2.jpg", popular: true },
// //     { id: 3, category: "ANNIVERSARY", title: "Floral Bloom", description: "Soft floral wreath with delicate pink blossoms. Perfect for anniversaries and celebrations.", image: "/images/c3.jpg", popular: true },
// //     { id: 4, category: "ANNIVERSARY", title: "Rustic Charm", description: "Warm craft paper texture with antique compass and earthy tones.", image: "/images/c4.jpg", popular: false },
// //     { id: 5, category: "BIRTHDAY", title: "Party Pop", description: "Bright and energetic design with colorful balloons and confetti for lively celebrations.", image: "/images/c5.jpg", popular: true },
// //     { id: 6, category: "CELEBRATION", title: "Celestial Night", description: "Deep galaxy themes with golden stars and a glowing full moon aesthetic.", image: "/images/c6.jpg", popular: false },
// //     { id: 7, category: "CELEBRATION", title: "Sunset Glow", description: "Warm sunset gradients with romantic photo and classic golden hour frames.", image: "/images/c7.jpg", popular: false },
// //     { id: 8, category: "CELEBRATION", title: "Tropical Paradise", description: "Lush tropical leaves and bold greens for a fresh vibrant look.", image: "/images/c8.jpg", popular: false },
// //     { id: 9, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/c9.jpg", popular: true },
// //     { id: 10, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
// //     { id: 11, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
// //     { id: 12, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
// // ];

// // function CategoryIcon({ category }: { category: string }) {
// //     if (category === "ANNIVERSARY") return (
// //         <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
// //             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
// //         </svg>
// //     );
// //     if (category === "GRADUATION") return (
// //         <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
// //             <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
// //             <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
// //         </svg>
// //     );
// //     if (category === "BIRTHDAY") return (
// //         <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
// //             <path d="M12 2a2 2 0 0 1 2 2v1H10V4a2 2 0 0 1 2-2z"/>
// //             <path d="M3 9h18v2H3zM3 13h18v8H3z"/>
// //             <rect x="11" y="9" width="2" height="12"/>
// //         </svg>
// //     );
// //     if (category === "CELEBRATION") return (
// //         <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
// //             <path d="M3.5 21L2 22l1-5 4.5 4.5L3.5 21zM12 2l-1.5 3L9 3l1.5 2.5L8 7l3-.5L12 9l1-2.5L16 7l-2.5-1.5L15 3l-1.5 2L12 2z"/>
// //             <path d="M5 14l-3 7 7-3-4-4zM19 5l-8 8 3 3 8-8-3-3z"/>
// //         </svg>
// //     );
// //     return <svg width="8" height="8" viewBox="0 0 24 24" fill="#B91C1C" stroke="none"><circle cx="12" cy="12" r="8"/></svg>;
// // }

// // function StarIcon() {
// //     return (
// //         <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
// //             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
// //         </svg>
// //     );
// // }

// // export default function CoverTemplate() {
// //     const [activeCategory, setActiveCategory] = useState("All");
// //     const [activePage, setActivePage] = useState(1);

// //     const sectionRef = useRef<HTMLElement>(null);
// //     const headerRef = useRef<HTMLDivElement>(null);
// //     const filtersRef = useRef<HTMLDivElement>(null);
// //     const gridRef = useRef<HTMLDivElement>(null);
// //     const paginationRef = useRef<HTMLDivElement>(null);

// //     const filtered = activeCategory === "All"
// //         ? templates.slice(0, 9)
// //         : templates.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

// //     // Header + filters animate on scroll via IntersectionObserver
// //     useEffect(() => {
// //         const headerChildren = Array.from(headerRef.current?.children ?? []);
// //         const filterChildren = Array.from(filtersRef.current?.children ?? []);

// //         // Set initial hidden state
// //         gsap.set(headerChildren, { opacity: 0, y: 35 });
// //         gsap.set(filterChildren, { opacity: 0, y: 20, scale: 0.9 });
// //         gsap.set(paginationRef.current, { opacity: 0, y: 20 });

// //         const observer = new IntersectionObserver((entries) => {
// //             entries.forEach(entry => {
// //                 if (!entry.isIntersecting) return;
// //                 const el = entry.target;

// //                 if (el === headerRef.current) {
// //                     gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
// //                 }
// //                 if (el === filtersRef.current) {
// //                     gsap.to(filterChildren, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "back.out(1.4)" });
// //                 }
// //                 if (el === paginationRef.current) {
// //                     gsap.to(paginationRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
// //                 }
// //                 observer.unobserve(el);
// //             });
// //         }, { threshold: 0.2 });

// //         if (headerRef.current) observer.observe(headerRef.current);
// //         if (filtersRef.current) observer.observe(filtersRef.current);
// //         if (paginationRef.current) observer.observe(paginationRef.current);

// //         return () => observer.disconnect();
// //     }, []);

// //     // Cards reveal one by one on scroll
// //     useEffect(() => {
// //         if (!gridRef.current) return;
// //         const cards = gridRef.current.querySelectorAll<HTMLElement>(".cover-card");

// //         // Reset all cards to hidden
// //         gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

// //         const observer = new IntersectionObserver((entries) => {
// //             entries.forEach(entry => {
// //                 if (!entry.isIntersecting) return;
// //                 const card = entry.target as HTMLElement;
// //                 const idx = Array.from(cards).indexOf(card);
// //                 gsap.to(card, {
// //                     opacity: 1,
// //                     y: 0,
// //                     scale: 1,
// //                     duration: 0.6,
// //                     delay: idx * 0.08,
// //                     ease: "power3.out",
// //                     clearProps: "transform",
// //                 });
// //                 observer.unobserve(card);
// //             });
// //         }, { threshold: 0.15 });

// //         cards.forEach(card => observer.observe(card));
// //         return () => observer.disconnect();
// //     }, [activeCategory, activePage]);

// //     // Card hover
// //     const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
// //         gsap.to(e.currentTarget, { y: -7, scale: 1.02, boxShadow: "0 16px 36px rgba(122,30,58,0.14)", duration: 0.28, ease: "power2.out" });
// //         const img = e.currentTarget.querySelector(".cover-img");
// //         if (img) gsap.to(img, { scale: 1.08, duration: 0.4, ease: "power2.out" });
// //     };

// //     const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
// //         gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.28, ease: "power2.inOut" });
// //         const img = e.currentTarget.querySelector(".cover-img");
// //         if (img) gsap.to(img, { scale: 1, duration: 0.35, ease: "power2.inOut" });
// //     };

// //     // Button hover
// //     const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
// //         gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out" });
// //     };
// //     const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
// //         gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
// //     };

// //     return (
// //         <section ref={sectionRef} className="bg-[#EEE8EA] py-12 px-4 sm:px-6 lg:px-8 font-medium">

// //             {/* Header */}
// //             <div ref={headerRef} className="text-center mb-8">
// //                 <div className="flex items-center justify-center gap-1.5 mb-3">
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
// //                     </svg>
// //                     <span className="text-[13px] text-[#7A1E3A] font-medium">Beautiful Cover Designs</span>
// //                 </div>
// //                 <h2 className="text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-[#1a1a2e] leading-tight">
// //                     Cover{" "}
// //                     <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Templates</span>
// //                 </h2>
// //                 <p className="text-[13px] sm:text-[15px] text-[#9CA3AF] mt-2">
// //                     Choose a stunning cover to make your memory book truly stand out.
// //                 </p>
// //             </div>

// //             {/* Category Filter */}
// //             <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-8">
// //                 {categories.map((cat) => (
// //                     <button
// //                         key={cat}
// //                         onClick={() => { setActiveCategory(cat); setActivePage(1); }}
// //                         onMouseEnter={handleBtnEnter}
// //                         onMouseLeave={handleBtnLeave}
// //                         className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
// //                             activeCategory === cat
// //                                 ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white shadow-sm"
// //                                 : "bg-white text-[#6b7280] hover:text-[#1a1a2e] border border-[#e5e7eb]"
// //                         }`}
// //                     >
// //                         {cat}
// //                     </button>
// //                 ))}
// //             </div>

// //             {/* Grid */}
// //             <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
// //                 {filtered.map((template) => (
// //                     <div
// //                         key={template.id}
// //                         className="cover-card bg-white rounded-2xl overflow-hidden cursor-pointer"
// //                         style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
// //                         onMouseEnter={handleCardEnter}
// //                         onMouseLeave={handleCardLeave}
// //                     >
// //                         <div className="relative w-full h-60 bg-[#d1cfc8] overflow-hidden">
// //                             <Image
// //                                 src={template.image}
// //                                 alt={template.title}
// //                                 fill
// //                                 className="cover-img object-cover"
// //                             />
// //                             {template.popular && (
// //                                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm z-10">
// //                                     <StarIcon /> Popular
// //                                 </div>
// //                             )}
// //                         </div>
// //                         <div className="p-4">
// //                             <div className="flex items-center gap-1.5 mb-1">
// //                                 <span className="text-[#B91C1C]"><CategoryIcon category={template.category} /></span>
// //                                 <span className="text-[10px] font-bold text-[#B91C1C] tracking-wider uppercase">{template.category}</span>
// //                             </div>
// //                             <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1 leading-tight">{template.title}</h3>
// //                             <p className="text-[11px] text-[#6b7280] leading-relaxed mb-3 line-clamp-2">{template.description}</p>
// //                             <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] hover:opacity-90 text-white text-[12px] font-semibold py-2 rounded-lg transition-opacity cursor-pointer">
// //                                 Use This Cover
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Pagination */}
// //             <div ref={paginationRef} className="flex items-center justify-center gap-2 mt-10">
// //                 <button
// //                     onClick={() => setActivePage(p => Math.max(1, p - 1))}
// //                     onMouseEnter={handleBtnEnter}
// //                     onMouseLeave={handleBtnLeave}
// //                     className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
// //                 >
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
// //                 </button>
// //                 {[1, 2, 3].map((page) => (
// //                     <button
// //                         key={page}
// //                         onClick={() => setActivePage(page)}
// //                         onMouseEnter={handleBtnEnter}
// //                         onMouseLeave={handleBtnLeave}
// //                         className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
// //                             activePage === page
// //                                 ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white"
// //                                 : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C]"
// //                         }`}
// //                     >
// //                         {page}
// //                     </button>
// //                 ))}
// //                 <button
// //                     onClick={() => setActivePage(p => Math.min(3, p + 1))}
// //                     onMouseEnter={handleBtnEnter}
// //                     onMouseLeave={handleBtnLeave}
// //                     className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
// //                 >
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
// //                 </button>
// //             </div>

// //         </section>
// //     );
// // }


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// const coverStyles = [
//   {
//     id: 1,
//     title: "Solid Color",
//     description: "Clean and elegant",
//     detail: "A bold, single-color cover that puts your title front and center. Timeless and refined.",
//     image: "/images/c1.jpg",
//     accent: "#7A1E3A",
//     badge: "Minimal",
//   },
//   {
//     id: 2,
//     title: "Soft Pattern",
//     description: "Subtle texture, big charm",
//     detail: "Delicate repeating patterns add warmth and personality without overwhelming your photos.",
//     image: "/images/c3.jpg",
//     accent: "#7A1E3A",
//     badge: "Popular",
//   },
//   {
//     id: 3,
//     title: "Full Photo",
//     description: "Use your own photo",
//     detail: "Let a single stunning photograph fill the entire cover — the most personal statement.",
//     image: "/images/c2.jpg",
//     accent: "#7A1E3A",
//     badge: "Most Loved",
//   },
//   {
//     id: 4,
//     title: "Split / Duo-Tone",
//     description: "Bold and modern",
//     detail: "Two contrasting tones divided across the cover for a striking, editorial look.",
//     image: "/images/c5.jpg",
//     accent: "#7A1E3A",
//     badge: "Trending",
//   },
//   {
//     id: 5,
//     title: "Framed Photo",
//     description: "Classic with a border",
//     detail: "Your photo set inside an elegant frame — classic, polished, and always beautiful.",
//     image: "/images/c4.jpg",
//     accent: "#7A1E3A",
//     badge: "Classic",
//   },
// ];

// export default function CoversPage() {
//   const headerRef     = useRef<HTMLDivElement>(null);
//   const gridRef       = useRef<HTMLDivElement>(null);
//   const ctaRef        = useRef<HTMLDivElement>(null);

//   /* ── Scroll-triggered animations ── */
//   useEffect(() => {
//     const headerEls = Array.from(headerRef.current?.children ?? []);
//     const cards     = gridRef.current?.querySelectorAll<HTMLElement>(".cover-card") ?? [];

//     gsap.set(headerEls, { opacity: 0, y: 30 });
//     gsap.set(cards,     { opacity: 0, y: 50, scale: 0.96 });
//     gsap.set(ctaRef.current, { opacity: 0, y: 24 });

//     const io = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (!entry.isIntersecting) return;
//         const el = entry.target;

//         if (el === headerRef.current) {
//           gsap.to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" });
//         }
//         if (el === gridRef.current) {
//           gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
//         }
//         if (el === ctaRef.current) {
//           gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
//         }
//         io.unobserve(el);
//       });
//     }, { threshold: 0.15 });

//     if (headerRef.current) io.observe(headerRef.current);
//     if (gridRef.current)   io.observe(gridRef.current);
//     if (ctaRef.current)    io.observe(ctaRef.current);

//     return () => io.disconnect();
//   }, []);

//   /* ── Card hover ── */
//   const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
//     gsap.to(e.currentTarget, { y: -6, boxShadow: "0 20px 40px rgba(122,30,58,0.13)", duration: 0.25, ease: "power2.out" });
//     const img = e.currentTarget.querySelector(".cover-img");
//     if (img) gsap.to(img, { scale: 1.07, duration: 0.4, ease: "power2.out" });
//   };
//   const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
//     gsap.to(e.currentTarget, { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", duration: 0.25, ease: "power2.inOut" });
//     const img = e.currentTarget.querySelector(".cover-img");
//     if (img) gsap.to(img, { scale: 1, duration: 0.35, ease: "power2.inOut" });
//   };

//   return (
//     <main
//       style={{
//         background: "#EEE8EA",
//         minHeight: "100vh",
//         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       }}
//     >
//       <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>

//         {/* ════════════════════════
//             HEADER
//         ════════════════════════ */}
//         <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56 }}>

//           {/* eyebrow */}
//           <div style={{
//             display: "inline-flex", alignItems: "center", gap: 6,
//             background: "#fff",
//             border: "1px solid #F3C5CE",
//             borderRadius: 999,
//             padding: "5px 14px",
//             marginBottom: 20,
//           }}>
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round">
//               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//             </svg>
//             <span style={{ fontSize: 12, fontWeight: 600, color: "#7A1E3A", letterSpacing: "0.3px" }}>
//               Cover Styles
//             </span>
//           </div>

//           {/* headline */}
//           <h1 style={{
//             fontSize: "clamp(32px, 5vw, 52px)",
//             fontWeight: 800,
//             color: "#1A1A2E",
//             lineHeight: 1.15,
//             marginBottom: 16,
//             letterSpacing: "-0.5px",
//           }}>
//             Find your{" "}
//             <span style={{
//               background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}>
//               perfect cover
//             </span>
//           </h1>

//           {/* sub */}
//           <p style={{
//             fontSize: 15,
//             color: "#9CA3AF",
//             maxWidth: 480,
//             margin: "0 auto",
//             lineHeight: 1.65,
//           }}>
//             Browse five distinct styles — each one a different way to make your memory book feel uniquely yours.
//           </p>
//         </div>

//         {/* ════════════════════════
//             COVER STYLE GRID
//         ════════════════════════ */}
//         <div
//           ref={gridRef}
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//             gap: 20,
//             marginBottom: 64,
//           }}
//         >
//           {coverStyles.map((style) => (
//             <div
//               key={style.id}
//               className="cover-card"
//               onMouseEnter={onEnter}
//               onMouseLeave={onLeave}
//               style={{
//                 background: "#fff",
//                 borderRadius: 20,
//                 overflow: "hidden",
//                 cursor: "default",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
//                 transition: "box-shadow 0.25s",
//               }}
//             >
//               {/* Image */}
//               <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#d8d3ce" }}>
//                 <Image
//                   src={style.image}
//                   alt={style.title}
//                   fill
//                   className="cover-img"
//                   style={{ objectFit: "cover" }}
//                 />
//                 {/* badge */}
//                 <div style={{
//                   position: "absolute", top: 12, right: 12,
//                   background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
//                   color: "#fff",
//                   fontSize: 10, fontWeight: 700,
//                   padding: "3px 10px",
//                   borderRadius: 999,
//                   letterSpacing: "0.3px",
//                   zIndex: 2,
//                 }}>
//                   {style.badge}
//                 </div>
//               </div>

//               {/* Text */}
//               <div style={{ padding: "20px 22px 24px" }}>
//                 <h3 style={{
//                   fontSize: 17, fontWeight: 700,
//                   color: "#1A1A2E", marginBottom: 4, lineHeight: 1.2,
//                 }}>
//                   {style.title}
//                 </h3>
//                 <p style={{
//                   fontSize: 12, fontWeight: 600,
//                   color: "#BF003A",
//                   marginBottom: 10,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                 }}>
//                   {style.description}
//                 </p>
//                 <p style={{
//                   fontSize: 13, color: "#6B7280",
//                   lineHeight: 1.65,
//                 }}>
//                   {style.detail}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ════════════════════════
//             SINGLE CTA
//         ════════════════════════ */}
//         <div
//           ref={ctaRef}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 14,
//             textAlign: "center",
//           }}
//         >
//           <p style={{ fontSize: 15, color: "#6B7280" }}>
//             Ready to create your book? Choose your style inside.
//           </p>
//           <Link
//             href="/create"
//             style={{
//               display: "inline-block",
//               background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
//               color: "#fff",
//               fontSize: 15,
//               fontWeight: 700,
//               padding: "14px 40px",
//               borderRadius: 999,
//               textDecoration: "none",
//               boxShadow: "0 4px 20px rgba(191,0,58,0.28)",
//               letterSpacing: "-0.1px",
//               transition: "opacity 0.15s, transform 0.15s",
//             }}
//             onMouseEnter={e => {
//               (e.currentTarget as HTMLElement).style.opacity = "0.92";
//               (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//             }}
//             onMouseLeave={e => {
//               (e.currentTarget as HTMLElement).style.opacity = "1";
//               (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
//             }}
//           >
//             Start Your Book
//           </Link>
//         </div>

//       </div>
//     </main>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const themes = [
  { id: 1, title: "Warm & Nostalgic",   tag: "Golden Tones",    detail: "Amber hues, soft grain textures and vintage-inspired layouts that feel like flipping through an old photo album.", image: "/images/c4.jpg", badge: "Most Loved" },
  { id: 2, title: "Modern Minimal",     tag: "Clean Lines",     detail: "Crisp white space, strong typography and restrained accents. Lets your memories speak without distraction.", image: "/images/c2.jpg", badge: "Trending" },
  { id: 3, title: "Floral Romance",     tag: "Soft Botanicals", detail: "Delicate flower motifs and blush palettes woven around every page for a tender, garden-party feel.", image: "/images/c3.jpg", badge: "Popular" },
  { id: 4, title: "Celestial Dream",    tag: "Stars & Sky",     detail: "Midnight gradients, golden constellations and a sense of wonder — perfect for milestone moments.", image: "/images/c6.jpg", badge: "New" },
  { id: 5, title: "Tropical Escape",    tag: "Bold & Bright",   detail: "Lush leaves, vivid colors and an energy that captures sun-soaked celebrations and adventures.", image: "/images/c8.jpg", badge: "Vibrant" },
  { id: 6, title: "Elegant Marble",     tag: "Luxury Feel",     detail: "Sophisticated white marble veining paired with gold accents for a timeless, high-end aesthetic.", image: "/images/c9.jpg", badge: "Premium" },
];

const covers = [
  { id: 1, title: "Solid Color",        tag: "Minimal",         detail: "A bold, single-color cover that puts your title front and center. Timeless and refined.", image: "/images/c1.jpg", badge: "Minimal" },
  { id: 2, title: "Soft Pattern",       tag: "Subtle Texture",  detail: "Delicate repeating patterns add warmth and personality without overwhelming your photos.", image: "/images/c3.jpg", badge: "Popular" },
  { id: 3, title: "Full Photo",         tag: "Most Personal",   detail: "Let a single stunning photograph fill the entire cover — the most personal statement.", image: "/images/c2.jpg", badge: "Most Loved" },
  { id: 4, title: "Split / Duo-Tone",   tag: "Editorial",       detail: "Two contrasting tones divided across the cover for a striking, editorial look.", image: "/images/c5.jpg", badge: "Trending" },
  { id: 5, title: "Framed Photo",       tag: "Classic Border",  detail: "Your photo set inside an elegant frame — classic, polished, and always beautiful.", image: "/images/c4.jpg", badge: "Classic" },
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
      className="tc-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#ddd8d3", flexShrink: 0 }}>
        <Image src={item.image} alt={item.title} fill className="tc-img" style={{ objectFit: "cover" }} />
        <span style={{
          position: "absolute", top: 10, right: 10,
          background: "linear-gradient(102deg,#BF003A,#59001C)",
          color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "3px 9px", borderRadius: 999, zIndex: 2,
        }}>
          {item.badge}
        </span>
      </div>

      <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#BF003A", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>
          {item.tag}
        </p>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 8, lineHeight: 1.25 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, flex: 1 }}>
          {item.detail}
        </p>
        <button
          style={{
            marginTop: 14, width: "100%",
            background: "linear-gradient(102deg,#BF003A,#59001C)",
            color: "#fff", fontSize: 12, fontWeight: 700,
            padding: "9px 0", borderRadius: 10, border: "none",
            cursor: "pointer", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
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
    <main style={{
      background: "#EEE8EA",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* ── Page Header ── */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#fff", border: "1px solid #F3C5CE",
            borderRadius: 999, padding: "5px 14px", marginBottom: 18,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#7A1E3A" }}>Customize Your Book</span>
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 5vw, 54px)",
            fontWeight: 800, color: "#1A1A2E",
            lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 14,
          }}>
            Themes &{" "}
            <span style={{
              background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Covers
            </span>
          </h1>

          <p style={{ fontSize: 14, color: "#9CA3AF", maxWidth: 440, margin: "0 auto", lineHeight: 1.65 }}>
            Pick an interior theme to set the mood, then choose a cover style to make it yours.
          </p>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{
            position: "relative",
            display: "inline-flex",
            background: "#fff",
            borderRadius: 999,
            padding: 5,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}>
            {/* sliding pill */}
            <div style={{
              position: "absolute",
              top: 5, bottom: 5,
              left: activeTab === "themes" ? 5 : "calc(50% + 2px)",
              width: "calc(50% - 7px)",
              background: "linear-gradient(102deg,#BF003A,#59001C)",
              borderRadius: 999,
              transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 0,
            }} />

            {(["themes", "covers"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  position: "relative", zIndex: 1,
                  padding: "10px 36px",
                  borderRadius: 999,
                  border: "none",
                  background: "transparent",
                  fontSize: 14, fontWeight: 700,
                  color: activeTab === tab ? "#fff" : "#6B7280",
                  cursor: "pointer",
                  transition: "color 0.25s",
                  minWidth: 140,
                  letterSpacing: "0.1px",
                }}
              >
                {tab === "themes" ? "Themes" : "Covers"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab subtitle ── */}
        <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginBottom: 36, lineHeight: 1.6 }}>
          {activeTab === "themes"
            ? "Choose a theme that flows through every page — layouts, color palette, and decorative details."
            : "Browse five distinct cover styles — each a different way to make your memory book feel uniquely yours."}
        </p>

        {/* ── Cards Grid ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 18,
            marginBottom: 60,
          }}
        >
          {items.map(item => <Card key={item.id} item={item} btnLabel={btnLabel} />)}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>
            Ready to create your book? Choose your style inside.
          </p>
          <Link
            href="/create"
            style={{
              display: "inline-block",
              background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
              color: "#fff", fontSize: 15, fontWeight: 700,
              padding: "14px 44px", borderRadius: 999,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(191,0,58,0.25)",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = "0.9";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Start Your Book
          </Link>
        </div>

      </div>
    </main>
  );
}