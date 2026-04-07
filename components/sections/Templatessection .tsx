// // "use client";

// // import Image from "next/image";
// // import { useState } from "react";

// // const categories = ["All", "Birthday", "Anniversary", "Farewell", "Graduation", "Celebration"];

// // const templates = [
// //     {
// //         id: 1,
// //         category: "BIRTHDAY",
// //         title: "Classic Elegance",
// //         description: "Refined design with typography and warm tones. Perfect for milestone birthdays.",
// //         image: "/images/t1.jpg",
// //         popular: true,
// //     },
// //     {
// //         id: 2,
// //         category: "ANNIVERSARY",
// //         title: "Warm Memories",
// //         description: "Romantic themes with gradients and photo frames for celebrating love.",
// //         image: "/images/t2.jpg",
// //         popular: true,
// //     },
// //     {
// //         id: 3,
// //         category: "FAREWELL",
// //         title: "Modern Minimal",
// //         description: "Clean lines and maximum whitespace for a professional farewell book.",
// //         image: "/images/t3.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 4,
// //         category: "GRADUATION",
// //         title: "Joyful Celebration",
// //         description: "Playful colors with confetti-inspired accents for graduations.",
// //         image: "/images/t4.jpg",
// //         popular: true,
// //     },
// //     {
// //         id: 5,
// //         category: "BIRTHDAY",
// //         title: "Garden Party",
// //         description: "Fresh and airy layouts with botanical serenity and earthy tones.",
// //         image: "/images/t5.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 6,
// //         category: "CELEBRATION",
// //         title: "Starlight",
// //         description: "Cosmos themes with deep blues and twinkling star motifs.",
// //         image: "/images/t6.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 7,
// //         category: "ANNIVERSARY",
// //         title: "Sunset Glow",
// //         description: "Warm sunset gradients with romantic photo and classic frames.",
// //         image: "/images/t7.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 8,
// //         category: "FAREWELL",
// //         title: "Fresh Start",
// //         description: "Bright and optimistic design for new beginnings and transitions.",
// //         image: "/images/t8.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 9,
// //         category: "BIRTHDAY",
// //         title: "Vintage Charm",
// //         description: "Retro-inspired layouts with aged textures and classic fonts.",
// //         image: "/images/t9.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 10,
// //         category: "CELEBRATION",
// //         title: "Confetti Pop",
// //         description: "Energetic and colorful design bursting with celebratory vibes.",
// //         image: "/images/t10.jpg",
// //         popular: true,
// //     },
// //     {
// //         id: 11,
// //         category: "GRADUATION",
// //         title: "Serenity",
// //         description: "Calm and composed design with structured layouts for achievements.",
// //         image: "/images/t11.jpg",
// //         popular: false,
// //     },
// //     {
// //         id: 12,
// //         category: "ANNIVERSARY",
// //         title: "Golden Hour",
// //         description: "Luxurious gold-tinted design with elegant photo placements.",
// //         image: "/images/t12.jpg",
// //         popular: false,
// //     },
// // ];

// // function BookIcon() {
// //     return (
// //         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //             <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
// //             <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
// //         </svg>
// //     );
// // }

// // function StarIcon() {
// //     return (
// //         <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
// //             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
// //         </svg>
// //     );
// // }

// // export default function TemplatesNavbar() {
// //     const [activeCategory, setActiveCategory] = useState("All");

// //     const filtered = activeCategory === "All"
// //         ? templates
// //         : templates.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

// //     return (
// //         <section className="bg-[#EEE8EA] py-12 font-medium">
// //             {/* Header */}
// //             <div className="text-center mb-8">
// //                 <div className="flex items-center justify-center gap-1.5 mb-3">
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <circle cx="12" cy="12" r="10" />
// //                         <polyline points="12 6 12 12 16 14" />
// //                     </svg>
// //                     <span className="text-[14px] text-[#7A1E3A] font-medium">Professionally Designed</span>
// //                 </div>
// //                 <h2 className="text-[56px] font-extrabold text-[#1a1a2e] leading-tight">
// //                     Book <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Templates</span>
// //                 </h2>
// //                 <p className="text-[16px] sm:text-[14px] text-[#9CA3AF] mt-2">
// //                     Browse our collection of beautifully crafted templates for every occasion.
// //                 </p>
// //             </div>

// //             {/* Category Filter */}
// //             <div className="flex flex-wrap justify-center gap-2 mb-8">
// //                 {categories.map((cat) => (
// //                     <button
// //                         key={cat}
// //                         onClick={() => setActiveCategory(cat)}
// //                         className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
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
// //             <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
// //                 {filtered.map((template) => (
// //                     <div
// //                         key={template.id}
// //                         className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
// //                     >
// //                         {/* Image */}
// //                         <div className="relative overflow-hidden">
// //                             <div className="w-full h-44 sm:h-48 bg-[#d1cfc8] flex items-center justify-center">
// //                                 <Image
// //                                     src={template.image}
// //                                     alt={template.title}
// //                                     width={200}
// //                                     height={200}
// //                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                                     onError={(e) => {
// //                                         (e.target as HTMLImageElement).style.display = "none";
// //                                     }}
// //                                 />
// //                                 {/* <span className="absolute inset-0 flex items-center justify-center text-[#9ca3af] text-[12px]">
// //                                     {template.title}
// //                                 </span> */}
// //                             </div>
// //                             {template.popular && (
// //                                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-[10px] font-semibold text-white px-2 py-0.5 rounded-full shadow-sm">
// //                                     <StarIcon />
// //                                     Popular
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* Content */}
// //                         <div className="p-4">
// //                             <div className="flex items-center gap-1.5 mb-1">
// //                                 <span className="text-[#B91C1C]"><BookIcon /></span>
// //                                 <span className="text-[10px] font-bold text-[#B91C1C] tracking-wider uppercase">
// //                                     {template.category}
// //                                 </span>
// //                             </div>
// //                             <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1 leading-tight">
// //                                 {template.title}
// //                             </h3>
// //                             <p className="text-[11px] text-[#6b7280] leading-relaxed mb-3 line-clamp-2">
// //                                 {template.description}
// //                             </p>
// //                             <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg transition-colors cursor-pointer">
// //                                 Use This Cover
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-center gap-2 mt-10">
// //                 <button className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer">
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
// //                 </button>
// //                 {[1, 2, 3].map((page) => (
// //                     <button
// //                         key={page}
// //                         className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
// //                             page === 2
// //                                 ? "bg-[#B91C1C] text-white"
// //                                 : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C]"
// //                         }`}
// //                     >
// //                         {page}
// //                     </button>
// //                 ))}
// //                 <button className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer">
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
// //                 </button>
// //             </div>
// //         </section>
// //     );
// // }


// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import gsap from "gsap";

// const categories = ["All", "Birthday", "Anniversary", "Farewell", "Graduation", "Celebration"];

// const templates = [
//     { id: 1, category: "BIRTHDAY", title: "Classic Elegance", description: "Refined design with typography and warm tones. Perfect for milestone birthdays.", image: "/images/t1.jpg", popular: true },
//     { id: 2, category: "ANNIVERSARY", title: "Warm Memories", description: "Romantic themes with gradients and photo frames for celebrating love.", image: "/images/t2.jpg", popular: true },
//     { id: 3, category: "FAREWELL", title: "Modern Minimal", description: "Clean lines and maximum whitespace for a professional farewell book.", image: "/images/t3.jpg", popular: false },
//     { id: 4, category: "GRADUATION", title: "Joyful Celebration", description: "Playful colors with confetti-inspired accents for graduations.", image: "/images/t4.jpg", popular: true },
//     { id: 5, category: "BIRTHDAY", title: "Garden Party", description: "Fresh and airy layouts with botanical serenity and earthy tones.", image: "/images/t5.jpg", popular: false },
//     { id: 6, category: "CELEBRATION", title: "Starlight", description: "Cosmos themes with deep blues and twinkling star motifs.", image: "/images/t6.jpg", popular: false },
//     { id: 7, category: "ANNIVERSARY", title: "Sunset Glow", description: "Warm sunset gradients with romantic photo and classic frames.", image: "/images/t7.jpg", popular: false },
//     { id: 8, category: "FAREWELL", title: "Fresh Start", description: "Bright and optimistic design for new beginnings and transitions.", image: "/images/t8.jpg", popular: false },
//     { id: 9, category: "BIRTHDAY", title: "Vintage Charm", description: "Retro-inspired layouts with aged textures and classic fonts.", image: "/images/t9.jpg", popular: false },
//     { id: 10, category: "CELEBRATION", title: "Confetti Pop", description: "Energetic and colorful design bursting with celebratory vibes.", image: "/images/t10.jpg", popular: true },
//     { id: 11, category: "GRADUATION", title: "Serenity", description: "Calm and composed design with structured layouts for achievements.", image: "/images/t11.jpg", popular: false },
//     { id: 12, category: "ANNIVERSARY", title: "Golden Hour", description: "Luxurious gold-tinted design with elegant photo placements.", image: "/images/t12.jpg", popular: false },
// ];

// function BookIcon() {
//     return (
//         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//             <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//         </svg>
//     );
// }

// function StarIcon() {
//     return (
//         <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
//             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//         </svg>
//     );
// }

// export default function TemplatesNavbar() {
//     const [activeCategory, setActiveCategory] = useState("All");

//     const headerRef = useRef<HTMLDivElement>(null);
//     const filtersRef = useRef<HTMLDivElement>(null);
//     const gridRef = useRef<HTMLDivElement>(null);
//     const paginationRef = useRef<HTMLDivElement>(null);

//     const filtered = activeCategory === "All"
//         ? templates
//         : templates.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

//     // Header + filters + pagination — IntersectionObserver
//     useEffect(() => {
//         const headerChildren = Array.from(headerRef.current?.children ?? []);
//         const filterChildren = Array.from(filtersRef.current?.children ?? []);

//         gsap.set(headerChildren, { opacity: 0, y: 35 });
//         gsap.set(filterChildren, { opacity: 0, y: 20, scale: 0.9 });
//         gsap.set(paginationRef.current, { opacity: 0, y: 20 });

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (!entry.isIntersecting) return;
//                 if (entry.target === headerRef.current) {
//                     gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
//                 }
//                 if (entry.target === filtersRef.current) {
//                     gsap.to(filterChildren, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "back.out(1.4)" });
//                 }
//                 if (entry.target === paginationRef.current) {
//                     gsap.to(paginationRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
//                 }
//                 observer.unobserve(entry.target);
//             });
//         }, { threshold: 0.2 });

//         if (headerRef.current) observer.observe(headerRef.current);
//         if (filtersRef.current) observer.observe(filtersRef.current);
//         if (paginationRef.current) observer.observe(paginationRef.current);

//         return () => observer.disconnect();
//     }, []);

//     // Cards — each card reveals individually on scroll
//     useEffect(() => {
//         if (!gridRef.current) return;
//         const cards = gridRef.current.querySelectorAll<HTMLElement>(".tmpl-card");

//         gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (!entry.isIntersecting) return;
//                 const card = entry.target as HTMLElement;
//                 const idx = Array.from(cards).indexOf(card);
//                 gsap.to(card, {
//                     opacity: 1,
//                     y: 0,
//                     scale: 1,
//                     duration: 0.6,
//                     delay: idx * 0.07,
//                     ease: "power3.out",
//                     clearProps: "transform",
//                 });
//                 observer.unobserve(card);
//             });
//         }, { threshold: 0.12 });

//         cards.forEach(card => observer.observe(card));
//         return () => observer.disconnect();
//     }, [activeCategory]);

//     // Card hover
//     const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
//         gsap.to(e.currentTarget, { y: -6, scale: 1.02, boxShadow: "0 14px 32px rgba(122,30,58,0.14)", duration: 0.28, ease: "power2.out" });
//         const img = e.currentTarget.querySelector(".tmpl-img");
//         if (img) gsap.to(img, { scale: 1.07, duration: 0.4, ease: "power2.out" });
//     };
//     const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
//         gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.28, ease: "power2.inOut" });
//         const img = e.currentTarget.querySelector(".tmpl-img");
//         if (img) gsap.to(img, { scale: 1, duration: 0.35, ease: "power2.inOut" });
//     };

//     return (
//         <section className="bg-[#EEE8EA] py-12 font-medium">

//             {/* Header */}
//             <div ref={headerRef} className="text-center mb-8 px-4">
//                 <div className="flex items-center justify-center gap-1.5 mb-3">
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
//                     </svg>
//                     <span className="text-[14px] text-[#7A1E3A] font-medium">Professionally Designed</span>
//                 </div>
//                 <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold text-[#1a1a2e] leading-tight">
//                     Book{" "}
//                     <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
//                         Templates
//                     </span>
//                 </h2>
//                 <p className="text-[14px] sm:text-[16px] text-[#9CA3AF] mt-2">
//                     Browse our collection of beautifully crafted templates for every occasion.
//                 </p>
//             </div>

//             {/* Category Filter */}
//             <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-8 px-4">
//                 {categories.map((cat) => (
//                     <button
//                         key={cat}
//                         onClick={() => setActiveCategory(cat)}
//                         className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
//                             activeCategory === cat
//                                 ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white shadow-sm"
//                                 : "bg-white text-[#6b7280] hover:text-[#1a1a2e] border border-[#e5e7eb]"
//                         }`}
//                     >
//                         {cat}
//                     </button>
//                 ))}
//             </div>

//             {/* Grid */}
//             <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-6 lg:px-8">
//                 {filtered.map((template) => (
//                     <div
//                         key={template.id}
//                         className="tmpl-card bg-white rounded-2xl overflow-hidden cursor-pointer"
//                         style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
//                         onMouseEnter={handleCardEnter}
//                         onMouseLeave={handleCardLeave}
//                     >
//                         <div className="relative w-full h-44 sm:h-48 bg-[#d1cfc8] overflow-hidden">
//                             <Image
//                                 src={template.image}
//                                 alt={template.title}
//                                 fill
//                                 className="tmpl-img object-cover"
//                                 onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
//                             />
//                             {template.popular && (
//                                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm z-10">
//                                     <StarIcon /> Popular
//                                 </div>
//                             )}
//                         </div>
//                         <div className="p-4">
//                             <div className="flex items-center gap-1.5 mb-1">
//                                 <span className="text-[#B91C1C]"><BookIcon /></span>
//                                 <span className="text-[10px] font-bold text-[#B91C1C] tracking-wider uppercase">{template.category}</span>
//                             </div>
//                             <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1 leading-tight">{template.title}</h3>
//                             <p className="text-[11px] text-[#6b7280] leading-relaxed mb-3 line-clamp-2">{template.description}</p>
//                             <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
//                                 Use This Cover
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div ref={paginationRef} className="flex items-center justify-center gap-2 mt-10">
//                 <button className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer">
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
//                 </button>
//                 {[1, 2, 3].map((page) => (
//                     <button key={page} className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${page === 2 ? "bg-[#B91C1C] text-white" : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C]"}`}>
//                         {page}
//                     </button>
//                 ))}
//                 <button className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer">
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
//                 </button>
//             </div>

//         </section>
//     );
// }


"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const templates = [
    { id: 1, category: "TEMPLATE", title: "Classic Elegance", description: "Refined design with typography and warm tones.", image: "/images/t1.jpg", popular: true },
    { id: 2, category: "TEMPLATE", title: "Warm Memories", description: "Soft gradients and photo-friendly layout.", image: "/images/t2.jpg", popular: true },
    { id: 3, category: "TEMPLATE", title: "Modern Minimal", description: "Clean and simple design for any occasion.", image: "/images/t3.jpg", popular: false },
    { id: 4, category: "TEMPLATE", title: "Joyful Celebration", description: "Colorful and vibrant layout for all uses.", image: "/images/t4.jpg", popular: true },
    { id: 5, category: "TEMPLATE", title: "Garden Party", description: "Fresh and aesthetic layout with natural tones.", image: "/images/t5.jpg", popular: false },
];

function BookIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default function TemplatesNavbar() {
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);

    // Header animation
    useEffect(() => {
        const headerChildren = Array.from(headerRef.current?.children ?? []);
        gsap.set(headerChildren, { opacity: 0, y: 35 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                gsap.to(headerChildren, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power3.out",
                });
            });
        }, { threshold: 0.2 });

        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    // Cards animation
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll<HTMLElement>(".tmpl-card");

        gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const card = entry.target as HTMLElement;
                const idx = Array.from(cards).indexOf(card);

                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: idx * 0.07,
                    ease: "power3.out",
                });

                observer.unobserve(card);
            });
        }, { threshold: 0.12 });

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    // Pagination animation
    useEffect(() => {
        gsap.set(paginationRef.current, { opacity: 0, y: 20 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                gsap.to(paginationRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }, { threshold: 0.2 });

        if (paginationRef.current) observer.observe(paginationRef.current);
        return () => observer.disconnect();
    }, []);

    // Hover animation
    const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            y: -6,
            scale: 1.02,
            boxShadow: "0 14px 32px rgba(122,30,58,0.14)",
            duration: 0.3,
        });
        const img = e.currentTarget.querySelector(".tmpl-img");
        if (img) gsap.to(img, { scale: 1.07, duration: 0.4 });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            y: 0,
            scale: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            duration: 0.3,
        });
        const img = e.currentTarget.querySelector(".tmpl-img");
        if (img) gsap.to(img, { scale: 1, duration: 0.35 });
    };

    return (
        <section className="bg-[#EEE8EA] py-12 font-medium">

            {/* Header */}
            <div ref={headerRef} className="text-center mb-8 px-4">
                <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold text-[#1a1a2e]">
                    Book <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Templates</span>
                </h2>
                <p className="text-[14px] sm:text-[16px] text-[#9CA3AF] mt-2">
                    Browse our collection of beautifully crafted templates.
                </p>
            </div>

            {/* Grid */}
            <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="tmpl-card bg-white rounded-2xl overflow-hidden cursor-pointer"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <div className="relative w-full h-44 bg-[#d1cfc8] overflow-hidden">
                            <Image
                                src={template.image}
                                alt={template.title}
                                fill
                                className="tmpl-img object-cover"
                            />
                            {template.popular && (
                                <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    <StarIcon /> Popular
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[#B91C1C]"><BookIcon /></span>
                                <span className="text-[10px] font-bold text-[#B91C1C] uppercase">
                                    {template.category}
                                </span>
                            </div>

                            <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1">
                                {template.title}
                            </h3>

                            <p className="text-[11px] text-[#6b7280] mb-3 line-clamp-2">
                                {template.description}
                            </p>

                            <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg">
                                Use This Cover
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div ref={paginationRef} className="flex justify-center mt-10">
                <button className="px-4 py-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] cursor-pointer text-white rounded-lg text-sm">
                    View More
                </button>
            </div>

        </section>
    );
}