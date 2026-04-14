// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";

// const templates = [
//     { id: 1, title: "Classic Elegance", description: "Refined design with typography and warm tones.", image: "/images/t1.jpg", popular: true },
//     { id: 2, title: "Warm Memories", description: "Soft gradients and photo-friendly layout.", image: "/images/t2.jpg", popular: true },
//     { id: 3, title: "Modern Minimal", description: "Clean and simple design for any occasion.", image: "/images/t3.jpg", popular: false },
//     { id: 4, title: "Joyful Celebration", description: "Colorful and vibrant layout for all uses.", image: "/images/t4.jpg", popular: true },
//     { id: 5, title: "Garden Party", description: "Fresh and aesthetic layout with natural tones.", image: "/images/t5.jpg", popular: false },
// ];

// // Seasonal templates — toggle on when Christmas / Ramadan / etc. is active
// const seasonalTemplates: { id: number; title: string; description: string; image: string }[] = [
//     // { id: 101, title: "Christmas Joy", description: "Festive red and green design for the holiday season.", image: "/images/seasonal-christmas.jpg" },
//     // { id: 102, title: "Ramadan Kareem", description: "Elegant crescent and lantern motifs for Ramadan.", image: "/images/seasonal-ramadan.jpg" },
// ];
// const showSeasonalSection = seasonalTemplates.length > 0;

// function StarIcon() {
//     return (
//         <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
//             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//         </svg>
//     );
// }

// export default function TemplatesNavbar() {
//     const router = useRouter();
//     const headerRef = useRef<HTMLDivElement>(null);
//     const gridRef = useRef<HTMLDivElement>(null);
//     const paginationRef = useRef<HTMLDivElement>(null);

//     // Header animation
//     useEffect(() => {
//         const headerChildren = Array.from(headerRef.current?.children ?? []);
//         gsap.set(headerChildren, { opacity: 0, y: 35 });

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (!entry.isIntersecting) return;
//                 gsap.to(headerChildren, {
//                     opacity: 1,
//                     y: 0,
//                     duration: 0.7,
//                     stagger: 0.12,
//                     ease: "power3.out",
//                 });
//             });
//         }, { threshold: 0.2 });

//         if (headerRef.current) observer.observe(headerRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // Cards animation
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
//                 });

//                 observer.unobserve(card);
//             });
//         }, { threshold: 0.12 });

//         cards.forEach(card => observer.observe(card));
//         return () => observer.disconnect();
//     }, []);

//     // Pagination animation
//     useEffect(() => {
//         gsap.set(paginationRef.current, { opacity: 0, y: 20 });

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (!entry.isIntersecting) return;
//                 gsap.to(paginationRef.current, {
//                     opacity: 1,
//                     y: 0,
//                     duration: 0.5,
//                     ease: "power2.out",
//                 });
//             });
//         }, { threshold: 0.2 });

//         if (paginationRef.current) observer.observe(paginationRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // Hover animation
//     const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
//         gsap.to(e.currentTarget, {
//             y: -6,
//             scale: 1.02,
//             boxShadow: "0 14px 32px rgba(122,30,58,0.14)",
//             duration: 0.3,
//         });
//         const img = e.currentTarget.querySelector(".tmpl-img");
//         if (img) gsap.to(img, { scale: 1.07, duration: 0.4 });
//     };

//     const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
//         gsap.to(e.currentTarget, {
//             y: 0,
//             scale: 1,
//             boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//             duration: 0.3,
//         });
//         const img = e.currentTarget.querySelector(".tmpl-img");
//         if (img) gsap.to(img, { scale: 1, duration: 0.35 });
//     };

//     return (
//         <section className="bg-[#EEE8EA] py-12 font-medium">

//             {/* Header */}
//             <div ref={headerRef} className="text-center mb-8 px-4">
//                 <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold text-[#1a1a2e]">
//                     Sample{" "}
//                     <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
//                         Covers
//                     </span>
//                 </h2>
//                 <p className="text-[14px] sm:text-[16px] text-[#9CA3AF] mt-2">
//                     Browse our example cover styles — suitable for any occasion.
//                 </p>
//             </div>

//             {/* Main Grid */}
//             <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
//                 {templates.map((template) => (
//                     <div
//                         key={template.id}
//                         className="tmpl-card bg-white rounded-2xl overflow-hidden cursor-pointer"
//                         style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
//                         onMouseEnter={handleCardEnter}
//                         onMouseLeave={handleCardLeave}
//                     >
//                         <div className="relative w-full h-44 bg-[#d1cfc8] overflow-hidden">
//                             <Image
//                                 src={template.image}
//                                 alt={template.title}
//                                 fill
//                                 className="tmpl-img object-cover"
//                             />
//                             {template.popular && (
//                                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
//                                     <StarIcon /> Popular
//                                 </div>
//                             )}
//                         </div>

//                         <div className="p-4">
//                             <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1">
//                                 {template.title}
//                             </h3>
//                             <p className="text-[11px] text-[#6b7280] mb-3 line-clamp-2">
//                                 {template.description}
//                             </p>
//                             <button
//                                 onClick={() => router.push(`/create?cover=${template.id}`)}
//                                 className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
//                             >
//                                 Use This Cover
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Seasonal Section — automatically shows when seasonalTemplates has items */}
//             {showSeasonalSection && (
//                 <div className="max-w-5xl mx-auto mt-14 px-4">
//                     <div className="text-center mb-6">
//                         <h3 className="text-[22px] font-extrabold text-[#1a1a2e]">
//                             🎄 Seasonal <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Covers</span>
//                         </h3>
//                         <p className="text-[13px] text-[#9CA3AF] mt-1">Special designs for the season.</p>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                         {seasonalTemplates.map((template) => (
//                             <div
//                                 key={template.id}
//                                 className="tmpl-card bg-white rounded-2xl overflow-hidden cursor-pointer"
//                                 style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
//                                 onMouseEnter={handleCardEnter}
//                                 onMouseLeave={handleCardLeave}
//                             >
//                                 <div className="relative w-full h-44 bg-[#d1cfc8] overflow-hidden">
//                                     <Image
//                                         src={template.image}
//                                         alt={template.title}
//                                         fill
//                                         className="tmpl-img object-cover"
//                                     />
//                                 </div>
//                                 <div className="p-4">
//                                     <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1">{template.title}</h3>
//                                     <p className="text-[11px] text-[#6b7280] mb-3 line-clamp-2">{template.description}</p>
//                                     <button
//                                         onClick={() => router.push(`/create?cover=${template.id}`)}
//                                         className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
//                                     >
//                                         Use This Cover
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Browse Button */}
//             <div ref={paginationRef} className="flex justify-center mt-10">
//                 <button
//                     onClick={() => router.push("/sample-covers")}
//                     className="px-6 py-2.5 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] cursor-pointer text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
//                 >
//                     Browse Sample Covers
//                 </button>
//             </div>

//         </section>
//     );
// }


"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const templates = [
    { id: 1, title: "Classic Elegance", description: "Refined design with typography and warm tones.", image: "/images/t1.jpg", popular: true },
    { id: 2, title: "Warm Memories", description: "Soft gradients and photo-friendly layout.", image: "/images/t2.jpg", popular: true },
    { id: 3, title: "Modern Minimal", description: "Clean and simple design for any occasion.", image: "/images/t3.jpg", popular: false },
    { id: 4, title: "Joyful Celebration", description: "Colorful and vibrant layout for all uses.", image: "/images/t4.jpg", popular: true },
    { id: 5, title: "Garden Party", description: "Fresh and aesthetic layout with natural tones.", image: "/images/t5.jpg", popular: false },
];

// ✅ Seasonal templates — uncomment the relevant one when the season is active
const seasonalTemplates: { id: number; title: string; description: string; image: string }[] = [
    // { id: 101, title: "Christmas Joy", description: "Festive red and green design for the holiday season.", image: "/images/seasonal-christmas.jpg" },
    // { id: 102, title: "Ramadan Kareem", description: "Elegant crescent and lantern motifs for Ramadan.", image: "/images/seasonal-ramadan.jpg" },
];
const showSeasonalSection = seasonalTemplates.length > 0;

function StarIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default function SampleThemesAndCovers() {
    const router = useRouter();
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

    // ✅ "Use This Cover" — passes cover ID via URL so /create page can pre-select it
    const handleUseCover = (coverId: number) => {
        router.push(`/create?cover=${coverId}&step=book-details`);
    };

    return (
        <section className="bg-[#EEE8EA] py-12 font-medium">

            {/* Header */}
            <div ref={headerRef} className="text-center mb-8 px-4">
                <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold text-[#1a1a2e]">
                    Sample Themes &{" "}
                    <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                        Covers
                    </span>
                </h2>
                <p className="text-[14px] sm:text-[16px] text-[#9CA3AF] mt-2">
                    Browse our example themes and cover styles — suitable for any occasion.
                </p>
            </div>

            {/* Main Grid */}
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
                            <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1">
                                {template.title}
                            </h3>
                            <p className="text-[11px] text-[#6b7280] mb-3 line-clamp-2">
                                {template.description}
                            </p>
                            {/* ✅ Bug fix: now uses handleUseCover which passes cover ID + step */}
                            <button
                                onClick={() => handleUseCover(template.id)}
                                className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                Use This Cover
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Seasonal Section — automatically shows when seasonalTemplates has items */}
            {showSeasonalSection && (
                <div className="max-w-5xl mx-auto mt-14 px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-[22px] font-extrabold text-[#1a1a2e]">
                            🎄 Seasonal{" "}
                            <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                                Covers
                            </span>
                        </h3>
                        <p className="text-[13px] text-[#9CA3AF] mt-1">Special designs for the season.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {seasonalTemplates.map((template) => (
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
                                </div>
                                <div className="p-4">
                                    <h3 className="text-[14px] font-bold text-[#1a1a2e] mb-1">{template.title}</h3>
                                    <p className="text-[11px] text-[#6b7280] mb-3 line-clamp-2">{template.description}</p>
                                    <button
                                        onClick={() => handleUseCover(template.id)}
                                        className="w-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[12px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                                    >
                                        Use This Cover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Browse Button */}
            <div ref={paginationRef} className="flex justify-center mt-10">
                <button
                    onClick={() => router.push("/sample-themes-and-covers")}
                    className="px-6 py-2.5 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] cursor-pointer text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Browse all themes and covers
                </button>
            </div>

        </section>
    );
}