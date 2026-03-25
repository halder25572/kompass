// "use client";

// import { useState } from "react";

// interface Testimonial {
//   id: number;
//   quote: string;
//   name: string;
//   role: string;
//   initials: string;
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     quote:
//       "We made a book for my mom's 60th birthday with 30 contributors. She cried happy tears!",
//     name: "Emily Chen",
//     role: "Birthday Organizer",
//     initials: "EC",
//   },
//   {
//     id: 2,
//     quote:
//       "Perfect farewell gift for our colleague. The book turned out stunning and everyone loved contributing.",
//     name: "Marcus Johnson",
//     role: "Team Lead",
//     initials: "MJ",
//   },
// ];

// function StarRating({ active }: { active: boolean }) {
//   return (
//     <div className="flex gap-1 mb-4">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <svg
//           key={star}
//           className={`w-4 h-4 transition-colors duration-300 ${
//             active ? "text-[#8B1A2E]" : "text-gray-300"
//           }`}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={1.5}
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//           />
//         </svg>
//       ))}
//     </div>
//   );
// }

// function TestimonialCard({
//   testimonial,
//   active,
//   onMouseEnter,
//   onMouseLeave,
// }: {
//   testimonial: Testimonial;
//   active: boolean;
//   onMouseEnter?: () => void;
//   onMouseLeave?: () => void;
// }) {
//   return (
//     <div
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       className={`rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-default ${
//         active
//           ? "bg-white shadow-xl shadow-gray-200/60 opacity-100"
//           : "bg-white/40 opacity-50"
//       }`}
//     >
//       <StarRating active={active} />
//       <p
//         className={`text-sm md:text-base leading-relaxed mb-6 italic font-serif transition-colors duration-300 ${
//           active ? "text-gray-700" : "text-gray-400"
//         }`}
//       >
//         &ldquo;{testimonial.quote}&rdquo;
//       </p>
//       <div className="flex items-center gap-3">
//         <div
//           className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors duration-300 ${
//             active ? "bg-[#8B1A2E] text-white" : "bg-gray-200 text-gray-400"
//           }`}
//         >
//           {testimonial.initials}
//         </div>
//         <div>
//           <p
//             className={`font-semibold text-sm transition-colors duration-300 ${
//               active ? "text-gray-900" : "text-gray-400"
//             }`}
//           >
//             {testimonial.name}
//           </p>
//           <p
//             className={`text-xs mt-0.5 transition-colors duration-300 ${
//               active ? "text-gray-500" : "text-gray-300"
//             }`}
//           >
//             {testimonial.role}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function TestimonialsSection() {
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   const isActive = (id: number) => {
//     if (hoveredId !== null) return hoveredId === id;
//     return id === 1; // default: first card active
//   };

//   return (
//     <section className="bg-[#EFEFEF] flex items-center justify-center px-4 py-16 md:py-24">
//       <div className="w-full max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12 md:mb-16">
//           <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B1A2E] mb-3">
//             Testimonials
//           </p>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//             Loved by <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">Thousands</span>
//           </h2>
//         </div>

//         {/* 2 Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
//           {testimonials.map((t) => (
//             <TestimonialCard
//               key={t.id}
//               testimonial={t}
//               active={isActive(t.id)}
//               onMouseEnter={() => setHoveredId(t.id)}
//               onMouseLeave={() => setHoveredId(null)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "We made a book for my mom's 60th birthday with 30 contributors. She cried happy tears!",
        name: "Emily Chen",
        role: "Birthday Organizer",
        initials: "EC",
    },
    {
        id: 2,
        quote: "Perfect farewell gift for our colleague. The book turned out stunning and everyone loved contributing.",
        name: "Marcus Johnson",
        role: "Team Lead",
        initials: "MJ",
    },
];

export default function TestimonialsSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    const isActive = (id: number) => hoveredId !== null ? hoveredId === id : id === 1;

    // Scroll reveal
    useEffect(() => {
        const headerChildren = Array.from(headerRef.current?.children ?? []);
        gsap.set(headerChildren, { opacity: 0, y: 40 });
        gsap.set(card1Ref.current, { opacity: 0, x: -60, scale: 0.94 });
        gsap.set(card2Ref.current, { opacity: 0, x: 60, scale: 0.94 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target === headerRef.current) {
                    gsap.to(headerChildren, {
                        opacity: 1, y: 0,
                        duration: 0.7, stagger: 0.15,
                        ease: "power3.out",
                    });
                }

                if (entry.target === cardsRef.current) {
                    // Card 1 slides from left
                    gsap.to(card1Ref.current, {
                        opacity: 1, x: 0, scale: 1,
                        duration: 0.8, delay: 0.1,
                        ease: "power3.out",
                    });
                    // Card 2 slides from right
                    gsap.to(card2Ref.current, {
                        opacity: 1, x: 0, scale: 1,
                        duration: 0.8, delay: 0.25,
                        ease: "power3.out",
                    });
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        if (headerRef.current) observer.observe(headerRef.current);
        if (cardsRef.current) observer.observe(cardsRef.current);

        return () => observer.disconnect();
    }, []);

    // Hover animations
    const handleCardEnter = (ref: React.RefObject<HTMLDivElement | null>, id: number) => {
        setHoveredId(id);
        gsap.to(ref.current, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 48px rgba(139,26,46,0.15)",
            duration: 0.3,
            ease: "power2.out",
        });
        // Fade out other card
        const otherRef = id === 1 ? card2Ref : card1Ref;
        gsap.to(otherRef.current, {
            opacity: 0.45,
            scale: 0.98,
            duration: 0.3,
            ease: "power2.out",
        });
        // Animate stars
        const stars = ref.current?.querySelectorAll(".star-icon");
        if (stars) {
            gsap.fromTo(stars,
                { scale: 0.6, opacity: 0.3 },
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2)" }
            );
        }
        // Animate avatar
        const avatar = ref.current?.querySelector(".avatar");
        if (avatar) {
            gsap.fromTo(avatar,
                { scale: 0.85 },
                { scale: 1, duration: 0.35, ease: "back.out(1.8)" }
            );
        }
    };

    const handleCardLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
        setHoveredId(null);
        gsap.to(ref.current, {
            y: 0, scale: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            duration: 0.3,
            ease: "power2.inOut",
        });
        const otherRef = ref === card1Ref ? card2Ref : card1Ref;
        gsap.to(otherRef.current, {
            opacity: 1, scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    const cardRefs = [card1Ref, card2Ref];

    return (
        <section
            ref={sectionRef}
            className="bg-[#EFEFEF] flex items-center justify-center px-4 py-16 md:py-24"
        >
            <div className="w-full max-w-3xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B1A2E] mb-3">
                        Testimonials
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Loved by{" "}
                        <span className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] bg-clip-text text-transparent">
                            Thousands
                        </span>
                    </h2>
                </div>

                {/* Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {testimonials.map((t, i) => {
                        const ref = cardRefs[i];
                        const active = isActive(t.id);
                        return (
                            <div
                                key={t.id}
                                ref={ref}
                                onMouseEnter={() => handleCardEnter(ref, t.id)}
                                onMouseLeave={() => handleCardLeave(ref)}
                                className="rounded-2xl p-6 md:p-8 cursor-default bg-white"
                                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[1,2,3,4,5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`star-icon w-4 h-4 transition-colors duration-300 ${active ? "text-[#8B1A2E]" : "text-gray-300"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className={`text-sm md:text-base leading-relaxed mb-6 italic font-serif transition-colors duration-300 ${active ? "text-gray-700" : "text-gray-400"}`}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className={`avatar w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors duration-300 ${active ? "bg-[#8B1A2E] text-white" : "bg-gray-200 text-gray-400"}`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm transition-colors duration-300 ${active ? "text-gray-900" : "text-gray-400"}`}>
                                            {t.name}
                                        </p>
                                        <p className={`text-xs mt-0.5 transition-colors duration-300 ${active ? "text-gray-500" : "text-gray-300"}`}>
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}