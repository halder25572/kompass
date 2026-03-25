// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const categories = ["All", "Birthday", "Anniversary", "Farewell", "Graduation", "Celebration"];

// const templates = [
//     {
//         id: 1,
//         category: "BIRTHDAY",
//         title: "Golden Elegance",
//         description: "Luxurious gold frame design with ornate details and warm tones. Perfect for milestone birthdays.",
//         image: "/images/c1.jpg",
//         popular: false,
//     },
//     {
//         id: 2,
//         category: "FAREWELL",
//         title: "Bold Minimal",
//         description: "Striking black and white geometric design with maximum visual impact.",
//         image: "/images/c2.jpg",
//         popular: true,
//     },
//     {
//         id: 3,
//         category: "ANNIVERSARY",
//         title: "Floral Bloom",
//         description: "Soft floral wreath with delicate pink blossoms. Perfect for anniversaries and celebrations.",
//         image: "/images/c3.jpg",
//         popular: true,
//     },
//     {
//         id: 4,
//         category: "ANNIVERSARY",
//         title: "Rustic Charm",
//         description: "Warm craft paper texture with antique compass and earthy tones.",
//         image: "/images/c4.jpg",
//         popular: false,
//     },
//     {
//         id: 5,
//         category: "BIRTHDAY",
//         title: "Party Pop",
//         description: "Bright and energetic design with colorful balloons and confetti for lively celebrations.",
//         image: "/images/c5.jpg",
//         popular: true,
//     },
//     {
//         id: 6,
//         category: "CELEBRATION",
//         title: "Celestial Night",
//         description: "Deep galaxy themes with golden stars and a glowing full moon aesthetic.",
//         image: "/images/c6.jpg",
//         popular: false,
//     },
//     {
//         id: 7,
//         category: "CELEBRATION",
//         title: "Sunset Glow",
//         description: "Warm sunset gradients with romantic photo and classic golden hour frames.",
//         image: "/images/c7.jpg",
//         popular: false,
//     },
//     {
//         id: 8,
//         category: "CELEBRATION",
//         title: "Tropical Paradise",
//         description: "Lush tropical leaves and bold greens for a fresh vibrant look.",
//         image: "/images/c8.jpg",
//         popular: false,
//     },
//     {
//         id: 9,
//         category: "ANNIVERSARY",
//         title: "Marble & Gold",
//         description: "Sophisticated white marble with gold netting and elegant photo placements.",
//         image: "/images/c9.jpg",
//         popular: true,
//     },
//     {
//         id: 10,
//         category: "ANNIVERSARY",
//         title: "Marble & Gold",
//         description: "Sophisticated white marble with gold netting and elegant photo placements.",
//         image: "/images/template-9.jpg",
//         popular: true,
//     },
//     {
//         id: 11,
//         category: "ANNIVERSARY",
//         title: "Marble & Gold",
//         description: "Sophisticated white marble with gold netting and elegant photo placements.",
//         image: "/images/template-9.jpg",
//         popular: true,
//     },
//     {
//         id: 12,
//         category: "ANNIVERSARY",
//         title: "Marble & Gold",
//         description: "Sophisticated white marble with gold netting and elegant photo placements.",
//         image: "/images/template-9.jpg",
//         popular: true,
//     },
// ];

// function CategoryIcon({ category }: { category: string }) {
//     if (category === "ANNIVERSARY") {
//         // Heart / Love
//         return (
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
//                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//             </svg>
//         );
//     }
//     if (category === "GRADUATION") {
//         // Graduation cap
//         return (
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
//                 <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
//                 <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
//             </svg>
//         );
//     }
//     if (category === "BIRTHDAY") {
//         // Cake / gift
//         return (
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
//                 <path d="M12 2a2 2 0 0 1 2 2v1H10V4a2 2 0 0 1 2-2z"/>
//                 <path d="M3 9h18v2H3zM3 13h18v8H3z"/>
//                 <rect x="11" y="9" width="2" height="12"/>
//             </svg>
//         );
//     }
//     if (category === "CELEBRATION") {
//         // Party popper
//         return (
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
//                 <path d="M3.5 21L2 22l1-5 4.5 4.5L3.5 21zM12 2l-1.5 3L9 3l1.5 2.5L8 7l3-.5L12 9l1-2.5L16 7l-2.5-1.5L15 3l-1.5 2L12 2z"/>
//                 <path d="M5 14l-3 7 7-3-4-4zM19 5l-8 8 3 3 8-8-3-3z"/>
//             </svg>
//         );
//     }
//     // Default dot for others (Farewell etc.)
//     return (
//         <svg width="8" height="8" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
//             <circle cx="12" cy="12" r="8"/>
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

// export default function CoverTemplate() {
//     const [activeCategory, setActiveCategory] = useState("All");
//     const [activePage, setActivePage] = useState(1);

//     const filtered = activeCategory === "All"
//         ? templates.slice(0, 9)
//         : templates.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

//     return (
//         <section className="bg-[#EEE8EA] py-12 px-4 sm:px-6 lg:px-8 font-medium">

//             {/* Header */}
//             <div className="text-center mb-8">
//                 <div className="flex items-center justify-center gap-1.5 mb-3">
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="10" />
//                         <polyline points="12 6 12 12 16 14" />
//                     </svg>
//                     <span className="text-[13px] text-[#7A1E3A] font-medium">Beautiful Cover Designs</span>
//                 </div>
//                 <h2 className="text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-[#1a1a2e] leading-tight">
//                     Cover{" "}
//                     <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
//                         Templates
//                     </span>
//                 </h2>
//                 <p className="text-[13px] sm:text-[15px] text-[#9CA3AF] mt-2">
//                     Choose a stunning cover to make your memory book truly stand out.
//                 </p>
//             </div>

//             {/* Category Filter */}
//             <div className="flex flex-wrap justify-center gap-2 mb-8">
//                 {categories.map((cat) => (
//                     <button
//                         key={cat}
//                         onClick={() => { setActiveCategory(cat); setActivePage(1); }}
//                         className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
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
//             <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {filtered.map((template) => (
//                     <div
//                         key={template.id}
//                         className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
//                     >
//                         {/* Image */}
//                         <div className="relative w-full h-60 bg-[#d1cfc8] overflow-hidden">
//                             <Image
//                                 src={template.image}
//                                 alt={template.title}
//                                 fill
//                                 className="group-hover:scale-105 transition-transform duration-300"
//                             />
//                             {template.popular && (
//                                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm z-10">
//                                     <StarIcon />
//                                     Popular
//                                 </div>
//                             )}
//                         </div>

//                         {/* Content */}
//                         <div className="p-4">
//                             <div className="flex items-center gap-1.5 mb-1">
//                                 <span className="text-[#B91C1C]"><CategoryIcon category={template.category} /></span>
//                                 <span className="text-[10px] font-bold text-[#B91C1C] tracking-wider uppercase">
//                                     {template.category}
//                                 </span>
//                             </div>
//                             <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1 leading-tight">
//                                 {template.title}
//                             </h3>
//                             <p className="text-[11px] text-[#6b7280] leading-relaxed mb-3 line-clamp-2">
//                                 {template.description}
//                             </p>
//                             <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] hover:opacity-90 text-white text-[12px] font-semibold py-2 rounded-lg transition-opacity cursor-pointer">
//                                 Use This Cover
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-center gap-2 mt-10">
//                 <button
//                     onClick={() => setActivePage(p => Math.max(1, p - 1))}
//                     className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
//                 >
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
//                 </button>
//                 {[1, 2, 3].map((page) => (
//                     <button
//                         key={page}
//                         onClick={() => setActivePage(page)}
//                         className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
//                             activePage === page
//                                 ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white"
//                                 : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C]"
//                         }`}
//                     >
//                         {page}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => setActivePage(p => Math.min(3, p + 1))}
//                     className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
//                 >
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
//                 </button>
//             </div>

//         </section>
//     );
// }

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const categories = ["All", "Birthday", "Anniversary", "Farewell", "Graduation", "Celebration"];

const templates = [
    { id: 1, category: "BIRTHDAY", title: "Golden Elegance", description: "Luxurious gold frame design with ornate details and warm tones. Perfect for milestone birthdays.", image: "/images/c1.jpg", popular: false },
    { id: 2, category: "FAREWELL", title: "Bold Minimal", description: "Striking black and white geometric design with maximum visual impact.", image: "/images/c2.jpg", popular: true },
    { id: 3, category: "ANNIVERSARY", title: "Floral Bloom", description: "Soft floral wreath with delicate pink blossoms. Perfect for anniversaries and celebrations.", image: "/images/c3.jpg", popular: true },
    { id: 4, category: "ANNIVERSARY", title: "Rustic Charm", description: "Warm craft paper texture with antique compass and earthy tones.", image: "/images/c4.jpg", popular: false },
    { id: 5, category: "BIRTHDAY", title: "Party Pop", description: "Bright and energetic design with colorful balloons and confetti for lively celebrations.", image: "/images/c5.jpg", popular: true },
    { id: 6, category: "CELEBRATION", title: "Celestial Night", description: "Deep galaxy themes with golden stars and a glowing full moon aesthetic.", image: "/images/c6.jpg", popular: false },
    { id: 7, category: "CELEBRATION", title: "Sunset Glow", description: "Warm sunset gradients with romantic photo and classic golden hour frames.", image: "/images/c7.jpg", popular: false },
    { id: 8, category: "CELEBRATION", title: "Tropical Paradise", description: "Lush tropical leaves and bold greens for a fresh vibrant look.", image: "/images/c8.jpg", popular: false },
    { id: 9, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/c9.jpg", popular: true },
    { id: 10, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
    { id: 11, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
    { id: 12, category: "ANNIVERSARY", title: "Marble & Gold", description: "Sophisticated white marble with gold netting and elegant photo placements.", image: "/images/template-9.jpg", popular: true },
];

function CategoryIcon({ category }: { category: string }) {
    if (category === "ANNIVERSARY") return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    );
    if (category === "GRADUATION") return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
    );
    if (category === "BIRTHDAY") return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
            <path d="M12 2a2 2 0 0 1 2 2v1H10V4a2 2 0 0 1 2-2z"/>
            <path d="M3 9h18v2H3zM3 13h18v8H3z"/>
            <rect x="11" y="9" width="2" height="12"/>
        </svg>
    );
    if (category === "CELEBRATION") return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B91C1C" stroke="none">
            <path d="M3.5 21L2 22l1-5 4.5 4.5L3.5 21zM12 2l-1.5 3L9 3l1.5 2.5L8 7l3-.5L12 9l1-2.5L16 7l-2.5-1.5L15 3l-1.5 2L12 2z"/>
            <path d="M5 14l-3 7 7-3-4-4zM19 5l-8 8 3 3 8-8-3-3z"/>
        </svg>
    );
    return <svg width="8" height="8" viewBox="0 0 24 24" fill="#B91C1C" stroke="none"><circle cx="12" cy="12" r="8"/></svg>;
}

function StarIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default function CoverTemplate() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activePage, setActivePage] = useState(1);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);

    const filtered = activeCategory === "All"
        ? templates.slice(0, 9)
        : templates.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

    // Header + filters animate on scroll via IntersectionObserver
    useEffect(() => {
        const headerChildren = Array.from(headerRef.current?.children ?? []);
        const filterChildren = Array.from(filtersRef.current?.children ?? []);

        // Set initial hidden state
        gsap.set(headerChildren, { opacity: 0, y: 35 });
        gsap.set(filterChildren, { opacity: 0, y: 20, scale: 0.9 });
        gsap.set(paginationRef.current, { opacity: 0, y: 20 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                if (el === headerRef.current) {
                    gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
                }
                if (el === filtersRef.current) {
                    gsap.to(filterChildren, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "back.out(1.4)" });
                }
                if (el === paginationRef.current) {
                    gsap.to(paginationRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
                }
                observer.unobserve(el);
            });
        }, { threshold: 0.2 });

        if (headerRef.current) observer.observe(headerRef.current);
        if (filtersRef.current) observer.observe(filtersRef.current);
        if (paginationRef.current) observer.observe(paginationRef.current);

        return () => observer.disconnect();
    }, []);

    // Cards reveal one by one on scroll
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll<HTMLElement>(".cover-card");

        // Reset all cards to hidden
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
                    delay: idx * 0.08,
                    ease: "power3.out",
                    clearProps: "transform",
                });
                observer.unobserve(card);
            });
        }, { threshold: 0.15 });

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, [activeCategory, activePage]);

    // Card hover
    const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { y: -7, scale: 1.02, boxShadow: "0 16px 36px rgba(122,30,58,0.14)", duration: 0.28, ease: "power2.out" });
        const img = e.currentTarget.querySelector(".cover-img");
        if (img) gsap.to(img, { scale: 1.08, duration: 0.4, ease: "power2.out" });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.28, ease: "power2.inOut" });
        const img = e.currentTarget.querySelector(".cover-img");
        if (img) gsap.to(img, { scale: 1, duration: 0.35, ease: "power2.inOut" });
    };

    // Button hover
    const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out" });
    };
    const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });
    };

    return (
        <section ref={sectionRef} className="bg-[#EEE8EA] py-12 px-4 sm:px-6 lg:px-8 font-medium">

            {/* Header */}
            <div ref={headerRef} className="text-center mb-8">
                <div className="flex items-center justify-center gap-1.5 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A1E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[13px] text-[#7A1E3A] font-medium">Beautiful Cover Designs</span>
                </div>
                <h2 className="text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-[#1a1a2e] leading-tight">
                    Cover{" "}
                    <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Templates</span>
                </h2>
                <p className="text-[13px] sm:text-[15px] text-[#9CA3AF] mt-2">
                    Choose a stunning cover to make your memory book truly stand out.
                </p>
            </div>

            {/* Category Filter */}
            <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setActivePage(1); }}
                        onMouseEnter={handleBtnEnter}
                        onMouseLeave={handleBtnLeave}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                            activeCategory === cat
                                ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white shadow-sm"
                                : "bg-white text-[#6b7280] hover:text-[#1a1a2e] border border-[#e5e7eb]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((template) => (
                    <div
                        key={template.id}
                        className="cover-card bg-white rounded-2xl overflow-hidden cursor-pointer"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                    >
                        <div className="relative w-full h-60 bg-[#d1cfc8] overflow-hidden">
                            <Image
                                src={template.image}
                                alt={template.title}
                                fill
                                className="cover-img object-cover"
                            />
                            {template.popular && (
                                <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm z-10">
                                    <StarIcon /> Popular
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[#B91C1C]"><CategoryIcon category={template.category} /></span>
                                <span className="text-[10px] font-bold text-[#B91C1C] tracking-wider uppercase">{template.category}</span>
                            </div>
                            <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1 leading-tight">{template.title}</h3>
                            <p className="text-[11px] text-[#6b7280] leading-relaxed mb-3 line-clamp-2">{template.description}</p>
                            <button className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] hover:opacity-90 text-white text-[12px] font-semibold py-2 rounded-lg transition-opacity cursor-pointer">
                                Use This Cover
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div ref={paginationRef} className="flex items-center justify-center gap-2 mt-10">
                <button
                    onClick={() => setActivePage(p => Math.max(1, p - 1))}
                    onMouseEnter={handleBtnEnter}
                    onMouseLeave={handleBtnLeave}
                    className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                {[1, 2, 3].map((page) => (
                    <button
                        key={page}
                        onClick={() => setActivePage(page)}
                        onMouseEnter={handleBtnEnter}
                        onMouseLeave={handleBtnLeave}
                        className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                            activePage === page
                                ? "bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white"
                                : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C]"
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => setActivePage(p => Math.min(3, p + 1))}
                    onMouseEnter={handleBtnEnter}
                    onMouseLeave={handleBtnLeave}
                    className="w-8 h-8 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>

        </section>
    );
}