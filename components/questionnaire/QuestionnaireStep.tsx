/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBookDetailsQuery } from "@/features/books/hooks/services";

/* ── Questions config ── */
const QUESTIONS = [
    { id: "motto", label: "My life motto:", placeholder: "Words you live by...", textarea: false },
    { id: "childhood", label: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor...", textarea: false },
    { id: "grumpy", label: "I get grumpy about:", placeholder: "What grinds your gears?", textarea: false },
    { id: "invention", label: "The best invention ever:", placeholder: "Coffee? The internet?", textarea: false },
    { id: "dream", label: "My ultimate dream:", placeholder: "Your biggest dream...", textarea: false },
    { id: "memory", label: "My fondest childhood memory:", placeholder: "Share a cherished memory...", textarea: true },
];

interface Props {
    name: string;
    bookId?: string;
    bookTitle?: string;
    occasion?: string;
}

export default function QuestionnaireStep({ name, bookId, bookTitle, occasion }: Props) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [photos, setPhotos] = useState<string[]>([]);
    const [showDone, setShowDone] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // If parent didn't provide bookTitle/occasion, fetch book details using bookId
    const { data: bookDetails } = useBookDetailsQuery(bookId);

    const recipientName = bookDetails?.data?.book_details?.recipient_name ?? undefined;
    const fetchedOccasion = bookDetails?.data?.book_details?.occasion ?? undefined;

    const displaySubtitle = (() => {
        // If `name` prop is provided, prefer it for the subtitle (as requested).
        if (name && name.trim()) {
            if (occasion) return `${name}'s ${occasion}`;
            if (fetchedOccasion) return `${name}'s ${fetchedOccasion}`;
            return `${name}'s Book`;
        }

        // Priority: explicit bookTitle -> recipient + occasion -> recipient -> occasion -> fallback
        if (bookTitle && bookTitle.trim()) return bookTitle;
        if (recipientName && fetchedOccasion) return `${recipientName}'s ${fetchedOccasion}`;
        if (recipientName) return `${recipientName}'s Book`;
        if (occasion) return occasion;
        if (fetchedOccasion) return fetchedOccasion;
        return "the book";
    })();

    const setAnswer = (id: string, val: string) =>
        setAnswers(prev => ({ ...prev, [id]: val }));

    const handleAddPhotos = (files: FileList) => {
        const remaining = 2 - photos.length;
        Array.from(files).slice(0, remaining).forEach(file => {
            setPhotos(prev => [...prev, URL.createObjectURL(file)]);
        });
    };

    const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/10 transition-all placeholder-gray-300 bg-white";

    return (
        <div className="min-h-screen"
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <main className="max-w-215 mx-auto px-4 sm:px-6 py-7 sm:py-9">
                <header className="py-3.5">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                </header>

                {/* Title */}
                <div className="flex items-center gap-2.5 mb-1 mt-6.25">
                    <div className="w-5 h-5 rounded bg-[#FFF0F3] border border-[#BF003A]/30 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                    </div>
                    <h1 className="text-[20px] sm:text-[22px] font-extrabold text-[#1A1A2E] tracking-tight">
                        Questionnaire <span className="uppercase">Birthday</span>
                    </h1>
                </div>
                <p className="text-[13px] text-gray-400 mb-6 ml-7.25">
                    Your contribution for{" "}
                    <span className="text-[#BF003A] font-semibold">Mom&apos;s 60th Birthday</span>
                </p>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* Questions card */}
                    <div className="flex-1 w-full bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-hidden">
                        {QUESTIONS.map((q, i) => {
                            const value = answers[q.id] ?? "";
                            const filled = value.trim().length > 0;
                            return (
                                <div key={q.id} className={`px-5 py-4 ${i < QUESTIONS.length - 1 ? "border-b border-gray-100" : ""}`}>
                                    {/* Label row */}
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[13px] font-semibold text-[#1A1A2E]">{q.label}</label>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                            {filled ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            )}
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Input */}
                                    {q.textarea ? (
                                        <textarea rows={3} value={value} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} className={`${inputClass} resize-none`} />
                                    ) : (
                                        <input value={value} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} className={inputClass} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Photo upload card */}
                    <div className="w-full lg:w-70 xl:w-75 shrink-0 bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-5">
                        <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-1">Add photos</h2>
                        <p className="text-[12px] text-gray-400 mb-4">Upload your favorite photos, then review and submit.</p>

                        <div
                            onClick={() => photos.length < 2 && fileRef.current?.click()}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => { e.preventDefault(); handleAddPhotos(e.dataTransfer.files); }}
                            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 px-4 mb-3 transition-all ${photos.length < 2 ? "border-gray-200 hover:border-[#BF003A]/40 cursor-pointer hover:bg-[#FFF8F9]" : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#F0EDFF] flex items-center justify-center mb-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                                </svg>
                            </div>
                            <p className="text-[12px] font-medium text-gray-600 text-center">Drop photos here or click to browse</p>
                            <p className="text-[11px] text-gray-400 mt-0.5 text-center">PNG, JPG up to 10MB each · Max 2 photos</p>
                        </div>

                        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleAddPhotos(e.target.files)} />

                        <div className="grid grid-cols-2 gap-2">
                            {[0, 1].map(i => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                                    {photos[i] ? (
                                        <>
                                            <Image src={photos[i]} alt={`Photo ${i + 1}`} fill style={{ objectFit: "cover" }} />
                                            <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Submit */}
                <div className="mt-5">
                    <button
                        onClick={() => setShowDone(true)}
                        className="w-full py-4 rounded-xl text-white text-[14px] font-bold cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
                        style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                    >
                        Submit My Contribution
                    </button>
                </div>

            </main>

            {/* Thank You Modal */}
            {showDone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <div className="bg-white rounded-2xl w-full max-w-85 px-8 py-8 flex flex-col items-center text-center shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
                        <div className="w-12 h-12 rounded-full border-2 border-[#BF003A] flex items-center justify-center mb-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 className="text-[18px] font-extrabold text-[#1A1A2E] mb-1.5">Thank You !</h3>
                        <p className="text-[13px] text-gray-400 mb-6">Your contribution has been sent.</p>
                        <Link href="/" className="w-full">
                            <button
                                onClick={() => setShowDone(false)}
                                className="w-full py-3.5 rounded-xl text-white cursor-pointer text-[14px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                                style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                            >
                                Done
                            </button>
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}