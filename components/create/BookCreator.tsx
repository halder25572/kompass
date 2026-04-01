"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
const stepConfig = [
    {
        label: "Book Details",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        label: "Questionnaire",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        label: "Style",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
        ),
    },
    {
        label: "Choose Style",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
        ),
    },
    {
        label: "Choose Cover",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        label: "Invite",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];

// ── Top Bar ───────────────────────────────────────────────
function TopBar({ step }: { step: number }) {
    const TOTAL = stepConfig.length;

    // circle size: active/completed = 36px (h-9), inactive = 32px (h-8)
    // label height ≈ 16px, gap = 8px (mb-2)
    // line should sit at: labelHeight + gap + circleHeight/2 = 16 + 8 + 18 = 42px from top
    // spacer = labelHeight + gap = 24px

    return (
        <div className="border-b border-[#f0edf1]">
            {/* Logo */}
            <div className="px-6 pt-4 pb-3 max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
                        <Image src="/images/logo.png" width={28} height={28} alt="Logo" className="object-cover" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1a1a2e]">Mein HerzGeschenk</span>
                </Link>
            </div>

            {/* Progress bar */}
            <div className="max-w-4xl mx-auto px-6 pb-5">
                <div className="flex items-start">
                    {stepConfig.map((s, i) => {
                        const isCompleted = i + 1 < step;
                        const isActive = i + 1 === step;
                        const isLast = i === TOTAL - 1;

                        return (
                            <div key={i} className="flex items-start flex-1 last:flex-none">
                                {/* Step node: label top, circle bottom */}
                                <div className="flex flex-col items-center shrink-0">
                                    <span className={`text-[12px] whitespace-nowrap mb-2 leading-none
                                        ${isActive ? "font-bold text-[#1a1a2e]" : "font-medium text-[#9CA3AF]"}`}>
                                        {s.label}
                                    </span>
                                    <div className={`rounded-full flex items-center justify-center transition-all duration-300
                                        ${isActive
                                            ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white shadow-md"
                                            : isCompleted
                                                ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white"
                                                : "w-8 h-8 bg-[#eef0f3] text-[#9CA3AF]"}`}>
                                        {isCompleted ? (
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : s.icon}
                                    </div>
                                </div>

                                {/* Line — vertically centered to circle */}
                                {!isLast && (
                                    <div className="flex-1 flex flex-col min-w-0 px-1">
                                        {/* label height (10px font ~16px rendered) + mb-2 (8px) + half of circle (18px) = ~26px */}
                                        <div className="h-6.5 shrink-0" />
                                        <div className={`h-px w-full rounded-full transition-all duration-300
                                            ${isCompleted ? "bg-[#B91C1C]" : "bg-[#d1d5db]"}`} />
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
}: {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    showBack?: boolean;
}) {
    return (
        <div className="sticky bottom-0 backdrop-blur-sm border-t border-[#f0edf1] px-4 sm:px-6 py-4">
            <div className="max-w-4xl mx-auto flex gap-3">
                {showBack && onBack && (
                    <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[14px] py-3 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-27.5">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back
                    </button>
                )}
                {onNext && (
                    <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                        {nextLabel}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Step 1: Book Details ──────────────────────────────────
function Step1({ onNext }: { onNext: (data: { subTab: string }) => void }) {
    const [bookTitle, setBookTitle] = useState("");
    const [bookSubtitle, setBookSubtitle] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState("Birthday");
    const [activeSubTab, setActiveSubTab] = useState("Birthday");

    const subTabs = subOccasionsByOccasion[selectedOccasion] ?? [];

    const handleOccasionChange = (occasionId: string) => {
        setSelectedOccasion(occasionId);
        const firstSub = subOccasionsByOccasion[occasionId]?.[0] ?? "";
        setActiveSubTab(firstSub);
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
                    <p className="text-[14px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
                </div>

                <div className="mb-4">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
                    <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
                        className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                </div>

                <div className="mb-4">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Subtitle</label>
                    <input value={bookSubtitle} onChange={e => setBookSubtitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
                        className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                </div>

                <div className="mb-5">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
                    <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g., Sarah Johnson"
                        className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                </div>

                <div className="mb-4">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-2">Pick Your Occasion</label>
                    <div className="grid grid-cols-3 gap-2">
                        {occasions.map((occ) => (
                            <button key={occ.id} onClick={() => handleOccasionChange(occ.id)}
                                className={`flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border text-[14px] font-medium transition-all cursor-pointer
                                    ${selectedOccasion === occ.id ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
                                <span className={selectedOccasion === occ.id ? "text-[#B91C1C]" : "text-[#9CA3AF]"}>{occ.icon}</span>
                                {occ.label}
                            </button>
                        ))}
                    </div>
                </div>

                {subTabs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {subTabs.map((tab) => (
                            <button key={tab} onClick={() => setActiveSubTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all cursor-pointer whitespace-nowrap
                                    ${activeSubTab === tab ? "bg-white border-[#1a1a2e] text-[#1a1a2e] font-semibold" : "border-[#e5e7eb] text-[#9CA3AF] hover:text-[#374151] bg-white"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <BottomNav
                showBack={true}
                onBack={undefined}
                onNext={() => onNext({ subTab: activeSubTab })}
                nextLabel="Continue"
            />
        </>
    );
}

// ── Step 2: Questionnaire ─────────────────────────────────
function Step2({ onNext, onBack, subTab }: { onNext: () => void; onBack: () => void; subTab: string }) {
    const [questions, setQuestions] = useState(questionnairesBySubOccasion);
    const [answers, setAnswers] = useState<Record<string, string>>({});
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
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 border-2 border-[#B91C1C] rounded flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-[18px] font-bold text-[#1a1a2e]">Questionnaire {subTab.toUpperCase()}</h1>
                </div>
                <p className="text-[12px] text-[#9CA3AF] mb-5">Fill in the same questionnaire that invited contributors see.</p>

                <div className="bg-white rounded-2xl border border-[#f0edf1] overflow-hidden mb-4">
                    <div className="divide-y divide-[#f9fafb]">
                        {currentQuestions.map((q) => (
                            <div key={q.id} className="px-4 py-3">
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

            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Choose A Book Style" />
        </>
    );
}

// ── Step 3: Choose a Book Style ───────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);
    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Book Style</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design template for your book.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {templates.map((tpl) => (
                        <button key={tpl.id} onClick={() => setSelected(tpl.id)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
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
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);
    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {covers.map((cover) => (
                        <button key={cover.id} onClick={() => setSelected(cover.id)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200
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
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Invite Friends" />
        </>
    );
}

// ── Step 5: Invite Friends ────────────────────────────────
function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [email, setEmail] = useState("");
    const [copied, setCopied] = useState(false);
    const previewLink = "https://preview--keepsake-craft-h...";

    const handleCopy = () => {
        navigator.clipboard.writeText(previewLink).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Invite Friends</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Invite your friends via link.</p>
                </div>

                <div className="mb-1.5">
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

                <div className="mt-5">
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

            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Done" />
        </>
    );
}

// ── Success Modal ─────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Project Created !</h2>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                    Your memory book project has been created.
                </p>
                <button onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                    Go To The Project
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
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
                <Step1 onNext={({ subTab }) => { setSelectedSubTab(subTab); setStep(2); }} />
            )}
            {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} subTab={selectedSubTab} />}
            {step === 3 && <Step3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <Step4 onNext={() => setStep(5)} onBack={() => setStep(3)} />}
            {step === 5 && <Step5 onNext={() => setShowSuccess(true)} onBack={() => setStep(4)} />}
            {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        </div>
    );
}