/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { JSX } from "react/jsx-runtime";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useOccasionsQuery } from "@/features/occasions/hooks/services";
import { useBookPageStylesQuery } from "@/features/book-page-styles/hooks/services";
import { useCoverPageStylesQuery } from "@/features/cover-page/hooks/services";
import { useCreateBookMutation } from "@/features/books/hooks/services";
import { useRegisterMutation } from "@/features/auth/components/hooks/services";
import { inviteByEmail } from "@/services/api";
import { getCleanInviteLink } from "@/lib/utils";
// DnD removed from Invite Friends step; ordering handled in Participants panel

function renderOccasionIcon(name: string) {
    switch (name) {
        case "Birthday":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    <path d="M12 3v4" /><path d="M9 6l3-3 3 3" />
                </svg>
            );
        case "School":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            );
        case "Work":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                </svg>
            );
        case "Love":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            );
        case "Family":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );
        case "Seasonal":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            );
        default:
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                </svg>
            );
    }
}

const placeholdersByOccasion: Record<string, { title: string; subtitle: string; recipient: string }> = {
    Birthday: { title: "e.g., Mom's 60th Birthday Book", subtitle: "e.g., 60 years of love and memories", recipient: "e.g., Sarah Johnson" },
    School: { title: "e.g., Class of 2025 Memory Book", subtitle: "e.g., A year full of growth and friendship", recipient: "e.g., Maria" },
    Work: { title: "e.g., Farewell to an Amazing Colleague", subtitle: "e.g., Thank you for everything", recipient: "e.g., Thomas" },
    Love: { title: "e.g., Our Wedding Memory Book", subtitle: "e.g., A love story worth remembering", recipient: "e.g., Anna & Michael" },
    Family: { title: "e.g., Our Family Through the Years", subtitle: "e.g., Stories and memories we treasure", recipient: "e.g., The Johnson Family" },
    Seasonal: { title: "e.g., Christmas Memories 2024", subtitle: "e.g., A festive season to remember", recipient: "e.g., Our Family" },
};

const defaultPlaceholders = {
    title: "e.g., My Memory Book",
    subtitle: "e.g., A collection of beautiful memories",
    recipient: "e.g., Your Name",
};

type StyleCard = {
    id: number;
    name: string;
    description: string;
    image: string;
    occasionName: string;
    subOccasionName: string;
};

function decodeHtmlEntities(value: string) {
    if (typeof window === "undefined") return value;
    const parser = new DOMParser();
    const decoded = parser.parseFromString(`<!doctype html><body>${value}`, "text/html");
    return decoded.body.textContent ?? value;
}

function mapStyleCard(style: {
    id: number;
    name: string;
    description: string;
    image: string[];
    occasion_name: string;
    sub_occasion_name: string;
}): StyleCard {
    const label = style.name.trim() || style.sub_occasion_name.trim() || style.occasion_name.trim() || "Untitled Style";
    return {
        id: style.id,
        name: label,
        description: decodeHtmlEntities(style.description),
        image: style.image[0] || "/icon/1.jpg",
        occasionName: style.occasion_name,
        subOccasionName: style.sub_occasion_name,
    };
}

const fallbackOccasions = [
    {
        id: 1, name: "Birthday", image: "", status: 1,
        sub_occasions: [
            { id: 101, occasion_id: 1, name: "Birthday", image: "", status: 1 },
            { id: 102, occasion_id: 1, name: "Anniversary", image: "", status: 1 },
        ],
    },
    {
        id: 2, name: "School", image: "", status: 1,
        sub_occasions: [
            { id: 205, occasion_id: 2, name: "School Yearbook", image: "", status: 1 },
            { id: 203, occasion_id: 2, name: "Farewell Teacher", image: "", status: 1 },
            { id: 206, occasion_id: 2, name: "Graduation Yearbook", image: "", status: 1 },
        ],
    },
    {
        id: 3, name: "Work", image: "", status: 1,
        sub_occasions: [
            { id: 303, occasion_id: 3, name: "Farewell Colleague", image: "", status: 1 },
            { id: 301, occasion_id: 3, name: "Retirement", image: "", status: 1 },
            { id: 302, occasion_id: 3, name: "Team Memory Book", image: "", status: 1 },
        ],
    },
    {
        id: 4, name: "Love", image: "", status: 1,
        sub_occasions: [
            { id: 401, occasion_id: 4, name: "Wedding", image: "", status: 1 },
            { id: 402, occasion_id: 4, name: "Bachelorette Party (JGA)", image: "", status: 1 },
        ],
    },
    {
        id: 5, name: "Family", image: "", status: 1,
        sub_occasions: [
            { id: 501, occasion_id: 5, name: "Family Book", image: "", status: 1 },
            { id: 505, occasion_id: 5, name: "For Grandma / Grandpa", image: "", status: 1 },
            { id: 504, occasion_id: 5, name: "Baby Book / Welcome Baby", image: "", status: 1 },
        ],
    },
    {
        id: 6, name: "Seasonal", image: "", status: 0,
        sub_occasions: [
            { id: 601, occasion_id: 6, name: "Christmas", image: "", status: 1 },
            { id: 605, occasion_id: 6, name: "Mother's Day", image: "", status: 1 },
            { id: 606, occasion_id: 6, name: "Father's Day", image: "", status: 1 },
            { id: 607, occasion_id: 6, name: "Ramadan", image: "", status: 1 },
        ],
    },
];

const questionnairesBySubOccasion: Record<
    string,
    { id: number; question: string; placeholder: string; checked?: boolean }[]
> = {

    // ── 1. BIRTHDAY ──────────────────────────────────────────
    Birthday: [
        { id: 1, question: "My favorite memory with you:", placeholder: "Share one moment that always makes you smile." },
        { id: 2, question: "A moment when we laughed (or cried) the hardest together:", placeholder: "What made it unforgettable?" },
        { id: 3, question: "Something I truly admire about you:", placeholder: "A quality or habit that inspires me." },
        { id: 4, question: "Something you taught me without realizing it:", placeholder: "A lesson I'm grateful for." },
        { id: 5, question: "Three words that describe you perfectly:", placeholder: "Choose the words that capture your essence." },
        { id: 6, question: "A challenge you handled in a way I found impressive:", placeholder: "Why it inspired me." },
        { id: 7, question: "Something I hope you continue doing, because it suits you:", placeholder: "What makes you uniquely you." },
        { id: 8, question: "If we could explore any city together with no time limits, I would pick… because…", placeholder: "Your dream travel moment." },
        { id: 9, question: "A moment I would love to relive with you:", placeholder: "And why I would choose it again." },
        { id: 10, question: "The best invention ever — and why:", placeholder: "A fun and creative question." },
        { id: 11, question: "If I had to choose a theme song for you, it would be… because…", placeholder: "What song matches your personality?" },
        { id: 12, question: "If we could spend one day together in any moment in history, I would choose… because…", placeholder: "A time travel memory." },
        { id: 13, question: "If you were a season of the year, I would say you are… because…", placeholder: "Your energy and vibe." },
        { id: 14, question: "Something I would love to do with you in the next years:", placeholder: "A wish for the future." },
        { id: 15, question: "If we had dinner together, this is what I would choose for you:", placeholder: "Your ideal meal, drink, or setting." },
        { id: 16, question: "My personal birthday message to you:", placeholder: "A heartfelt closing wish.", checked: true },
    ],

    // ── 2. SCHOOL ────────────────────────────────────────────

    // School Yearbook  (was "Class Book" — kept both keys below)
    "School Yearbook": [
        { id: 1, question: "My favorite memory from this school year:", placeholder: "A moment that always brings a smile when I think back." },
        { id: 2, question: "A moment in class I will never forget:", placeholder: "Something funny, unexpected, or meaningful that stayed with me." },
        { id: 3, question: "Something that made our class unique this year:", placeholder: "A habit, a vibe, or a shared moment that stood out." },
        { id: 4, question: "A teacher who made a positive impact on me:", placeholder: "And what they did that made a difference." },
        { id: 5, question: "Something I learned this year that surprised me:", placeholder: "Either in school or about myself." },
        { id: 6, question: "A challenge I overcame or something I improved at:", placeholder: "A moment of growth I'm proud of." },
        { id: 7, question: "A moment I felt proud of myself this year:", placeholder: "Big or small — anything that mattered to you." },
        { id: 8, question: "A project or activity I really enjoyed:", placeholder: "And why it stood out from the rest." },
        { id: 9, question: "A funny moment we experienced as a class:", placeholder: "Something that still makes me laugh." },
        { id: 10, question: "A moment that showed how well our class worked together:", placeholder: "A time when teamwork really mattered." },
        { id: 11, question: "A friendship that became important to me this year:", placeholder: "And what it meant to me." },
        { id: 12, question: "Three words that describe this school year for me:", placeholder: "Choose the ones that fit best." },
        { id: 13, question: "Something I hope for next school year:", placeholder: "A wish, a goal, or a dream." },
        { id: 14, question: "A message to my future self (or next year's class):", placeholder: "Something I want to remember when I look back." },
        { id: 15, question: "The best invention ever — and why:", placeholder: "A fun one to end with." },
    ],

    // Keep old key "Class Book" pointing to the same questions
    "Class Book": [
        { id: 1, question: "My favorite memory from this school year:", placeholder: "A moment that always brings a smile when I think back." },
        { id: 2, question: "A moment in class I will never forget:", placeholder: "Something funny, unexpected, or meaningful that stayed with me." },
        { id: 3, question: "Something that made our class unique this year:", placeholder: "A habit, a vibe, or a shared moment that stood out." },
        { id: 4, question: "A teacher who made a positive impact on me:", placeholder: "And what they did that made a difference." },
        { id: 5, question: "Something I learned this year that surprised me:", placeholder: "Either in school or about myself." },
        { id: 6, question: "A challenge I overcame or something I improved at:", placeholder: "A moment of growth I'm proud of." },
        { id: 7, question: "A moment I felt proud of myself this year:", placeholder: "Big or small — anything that mattered to you." },
        { id: 8, question: "A project or activity I really enjoyed:", placeholder: "And why it stood out from the rest." },
        { id: 9, question: "A funny moment we experienced as a class:", placeholder: "Something that still makes me laugh." },
        { id: 10, question: "A moment that showed how well our class worked together:", placeholder: "A time when teamwork really mattered." },
        { id: 11, question: "A friendship that became important to me this year:", placeholder: "And what it meant to me." },
        { id: 12, question: "Three words that describe this school year for me:", placeholder: "Choose the ones that fit best." },
        { id: 13, question: "Something I hope for next school year:", placeholder: "A wish, a goal, or a dream." },
        { id: 14, question: "A message to my future self (or next year's class):", placeholder: "Something I want to remember when I look back." },
        { id: 15, question: "The best invention ever — and why:", placeholder: "A fun one to end with." },
    ],

    // Farewell Teacher
    "Farewell Teacher": [
        { id: 1, question: "My favorite memory from your lessons:", placeholder: "A moment that made class feel special." },
        { id: 2, question: "Something you explained in a way I will always remember:", placeholder: "A lesson that truly stayed with me." },
        { id: 3, question: "A moment when learning became enjoyable because of you:", placeholder: "What made it inspiring or fun." },
        { id: 4, question: "Something you helped me improve this year:", placeholder: "A change you encouraged without even noticing." },
        { id: 5, question: "A lesson from you that I will carry into the future:", placeholder: "Something meaningful you taught me." },
        { id: 6, question: "A moment that showed your patience or kindness:", placeholder: "A small but important gesture." },
        { id: 7, question: "A time when our whole class smiled because of you:", placeholder: "A moment worth remembering." },
        { id: 8, question: "Something about your teaching style I appreciate:", placeholder: "A quality that made you a great teacher." },
        { id: 9, question: "A moment when I felt seen or supported by you:", placeholder: "Something that made a difference to me." },
        { id: 10, question: "What I think our class will always remember about you:", placeholder: "A signature trait or memory." },
        { id: 11, question: "Three words that describe you as a teacher:", placeholder: "Your essence in three words." },
        { id: 12, question: "What I wish for you in your next chapter:", placeholder: "A hope for your future." },
        { id: 13, question: "Something I want to thank you for:", placeholder: "From the heart." },
        { id: 14, question: "My personal farewell message to you:", placeholder: "A message for your next adventure.", checked: true },
    ],

    // Graduation Yearbook  (NEW)
    "Graduation Yearbook": [
        { id: 1, question: "My favorite memory from this graduation year:", placeholder: "Something unforgettable." },
        { id: 2, question: "A moment that made this year truly special:", placeholder: "Why it mattered to you." },
        { id: 3, question: "Something I achieved that makes me proud:", placeholder: "A personal victory." },
        { id: 4, question: "A teacher or classmate who inspired me:", placeholder: "And why." },
        { id: 5, question: "A challenge I overcame this year:", placeholder: "A moment of growth." },
        { id: 6, question: "Something important I learned about myself:", placeholder: "A discovery that changed me." },
        { id: 7, question: "A moment of teamwork that stood out:", placeholder: "When we worked as one." },
        { id: 8, question: "A funny or unexpected moment from this year:", placeholder: "Something we'll always laugh about." },
        { id: 9, question: "Three words that describe this final year:", placeholder: "Choose the best match." },
        { id: 10, question: "Something I will always remember about our class:", placeholder: "What made us unique." },
        { id: 11, question: "A moment when I felt excited about the future:", placeholder: "A spark of motivation." },
        { id: 12, question: "What I hope to achieve in my next chapter:", placeholder: "Dreams for the path ahead." },
        { id: 13, question: "A message I want to leave for my classmates:", placeholder: "A wish or a piece of advice." },
        { id: 14, question: "A message to my future self:", placeholder: "For when I look back someday.", checked: true },
    ],



    // ── 3. WORK ──────────────────────────────────────────────

    // Farewell Colleague  (NEW)
    "Farewell Colleague": [
        { id: 1, question: "My favorite memory of working with you:", placeholder: "A moment that stands out." },
        { id: 2, question: "A time when you supported or encouraged me:", placeholder: "Something meaningful." },
        { id: 3, question: "Something you taught me that I still use today:", placeholder: "A lasting lesson." },
        { id: 4, question: "A project where you truly made a difference:", placeholder: "Your impact." },
        { id: 5, question: "A work moment that still makes me smile:", placeholder: "Something fun or unexpected." },
        { id: 6, question: "Something I admire about your way of working:", placeholder: "A professional quality." },
        { id: 7, question: "Three words that describe you as a colleague:", placeholder: "Your workplace essence." },
        { id: 8, question: "A challenge we handled together:", placeholder: "A memory of teamwork." },
        { id: 9, question: "A moment I realized how much I appreciate you:", placeholder: "Personal insight." },
        { id: 10, question: "What I will miss most about you at work:", placeholder: "Your presence." },
        { id: 11, question: "Something you always did that made our team better:", placeholder: "A unique contribution." },
        { id: 12, question: "What I wish for you in your next chapter:", placeholder: "A hopeful message." },
        { id: 13, question: "Something I hope you take with you from this team:", placeholder: "A reminder from us." },
        { id: 14, question: "My personal farewell message to you:", placeholder: "From the heart.", checked: true },
    ],

    // Retirement
    Retirement: [
        { id: 1, question: "Something from your career that inspires me:", placeholder: "A moment of excellence." },
        { id: 2, question: "A time when your experience truly helped me:", placeholder: "Wisdom in action." },
        { id: 3, question: "Something you taught me that I'll always remember:", placeholder: "A meaningful lesson." },
        { id: 4, question: "A story or memory that shows your dedication:", placeholder: "What defines you." },
        { id: 5, question: "Something I appreciate about how you treated others:", placeholder: "A human quality." },
        { id: 6, question: "A moment that made the whole team smile:", placeholder: "A joyful memory." },
        { id: 7, question: "Three words that describe you:", placeholder: "Your essence." },
        { id: 8, question: "Something you can be proud of:", placeholder: "A lasting contribution." },
        { id: 9, question: "A moment when your wisdom made a big difference:", placeholder: "A turning point." },
        { id: 10, question: "What I hope you enjoy most in retirement:", placeholder: "Your reward." },
        { id: 11, question: "Something you truly deserve after your hard work:", placeholder: "A wish for your rest." },
        { id: 12, question: "What I will remember most about you:", placeholder: "Your legacy." },
        { id: 13, question: "A wish for your next chapter in life:", placeholder: "For your future." },
        { id: 14, question: "My personal message to you as you retire:", placeholder: "Warm and heartfelt.", checked: true },
    ],

    // Team Memory Book
    "Team Memory Book": [
        { id: 1, question: "My favorite team moment from this year:", placeholder: "A shared success." },
        { id: 2, question: "A project where our teamwork stood out:", placeholder: "True collaboration." },
        { id: 3, question: "Something our team is particularly good at:", placeholder: "A shared strength." },
        { id: 4, question: "A moment when someone in the team inspired me:", placeholder: "Recognition." },
        { id: 5, question: "Something we achieved together that makes me proud:", placeholder: "A highlight." },
        { id: 6, question: "A challenge we overcame as a group:", placeholder: "A team victory." },
        { id: 7, question: "Three words that describe our team spirit:", placeholder: "Our vibe." },
        { id: 8, question: "A funny or unexpected moment from our time together:", placeholder: "A moment of joy." },
        { id: 9, question: "Something I learned from working with this team:", placeholder: "A lesson." },
        { id: 10, question: "A moment when we celebrated each other:", placeholder: "Team appreciation." },
        { id: 11, question: "Something I will always remember about this team:", placeholder: "Our identity." },
        { id: 12, question: "A moment that showed our strength as a team:", placeholder: "Unity." },
        { id: 13, question: "What I hope for the team in the future:", placeholder: "A vision." },
        { id: 14, question: "My message to the team:", placeholder: "A closing note.", checked: true },
    ],

    // ── 4. LOVE ──────────────────────────────────────────────

    // Wedding
    Wedding: [
        { id: 1, question: "My favorite memory with you as a couple:", placeholder: "A moment that shows who you are." },
        { id: 2, question: "A moment that perfectly reflects your love:", placeholder: "Why it touched me." },
        { id: 3, question: "Something I admire about your relationship:", placeholder: "A strength you share." },
        { id: 4, question: "When I first realized you belong together:", placeholder: "How I knew." },
        { id: 5, question: "A funny or sweet moment we shared:", placeholder: "Something special." },
        { id: 6, question: "Three words that describe you as a couple:", placeholder: "Your essence together." },
        { id: 7, question: "My wish for your future:", placeholder: "For the years ahead." },
        { id: 8, question: "A lesson about love I see in you:", placeholder: "What your relationship teaches others." },
        { id: 9, question: "A moment I look forward to sharing with you:", placeholder: "Something in the future." },
        { id: 10, question: "Something I think will make your marriage strong:", placeholder: "A foundation." },
        { id: 11, question: "A moment you should never forget:", placeholder: "A memory to hold onto." },
        { id: 12, question: "A hope I have for your married life:", placeholder: "A blessing." },
        { id: 13, question: "My personal wedding message to you:", placeholder: "From the heart.", checked: true },
    ],

    // Bachelorette Party (JGA)
    "Bachelorette Party (JGA)": [
        { id: 1, question: "How I first met the bride-to-be:", placeholder: "A memory that started it all." },
        { id: 2, question: "My favorite memory with you:", placeholder: "A special moment." },
        { id: 3, question: "Something that always makes you laugh:", placeholder: "Your spark." },
        { id: 4, question: "A quality I love about you:", placeholder: "A trait that defines you." },
        { id: 5, question: "Three words that describe you:", placeholder: "Your essence." },
        { id: 6, question: "A funny or unexpected moment we shared:", placeholder: "A joyful memory." },
        { id: 7, question: "Something I admire about your personality:", placeholder: "Your strength or softness." },
        { id: 8, question: "What I hope you remember from today:", placeholder: "A moment to treasure." },
        { id: 9, question: "A wish I have for your marriage:", placeholder: "For your love story." },
        { id: 10, question: "A moment from our friendship that means a lot to me:", placeholder: "Why it matters." },
        { id: 11, question: "Something you absolutely deserve in life:", placeholder: "A blessing." },
        { id: 12, question: "A moment I'm excited to experience with you in the future:", placeholder: "Looking forward." },
        { id: 13, question: "A wish for your next chapter:", placeholder: "Hope." },
        { id: 14, question: "My personal message to you:", placeholder: "From the heart.", checked: true },
    ],



    // ── 5. FAMILY ────────────────────────────────────────────

    // Family Book
    "Family Book": [
        { id: 1, question: "A favorite family memory that always stays with me:", placeholder: "A moment I treasure." },
        { id: 2, question: "Something our family is especially good at:", placeholder: "What defines us." },
        { id: 3, question: "A moment that made me feel connected to our family:", placeholder: "A memory of closeness." },
        { id: 4, question: "A tradition or habit I cherish:", placeholder: "What I hope we keep." },
        { id: 5, question: "A challenge we overcame together:", placeholder: "Our strength." },
        { id: 6, question: "Something I appreciate about our family dynamic:", placeholder: "What makes us unique." },
        { id: 7, question: "A funny moment we experienced together:", placeholder: "A joyful memory." },
        { id: 8, question: "Three words that describe our family:", placeholder: "Our essence." },
        { id: 9, question: "Something I learned from being part of this family:", placeholder: "A life lesson." },
        { id: 10, question: "A moment that showed our strength:", placeholder: "Unity." },
        { id: 11, question: "A place that feels like 'home' to me:", placeholder: "Real or symbolic." },
        { id: 12, question: "A wish I have for our future:", placeholder: "For the years ahead." },
        { id: 13, question: "Something I look forward to doing together:", placeholder: "A future memory." },
        { id: 14, question: "My message to our family:", placeholder: "From the heart.", checked: true },
    ],

    // For Grandma / Grandpa
    "For Grandma / Grandpa": [
        { id: 1, question: "My favorite memory with you:", placeholder: "A moment I cherish." },
        { id: 2, question: "Something you taught me that I'll always treasure:", placeholder: "A lesson of a lifetime." },
        { id: 3, question: "A story or moment I will never forget:", placeholder: "Your wisdom." },
        { id: 4, question: "Something I admire deeply about you:", placeholder: "A special quality." },
        { id: 5, question: "A moment that showed your kindness or wisdom:", placeholder: "A gentle memory." },
        { id: 6, question: "Three words that describe you:", placeholder: "Your essence." },
        { id: 7, question: "Something you always say that stays with me:", placeholder: "Your signature phrase." },
        { id: 8, question: "A moment when you made me feel supported:", placeholder: "A warm memory." },
        { id: 9, question: "What I appreciate most about you:", placeholder: "What you bring to my life." },
        { id: 10, question: "Something I look forward to doing with you again:", placeholder: "A future moment." },
        { id: 11, question: "A wish I have for you:", placeholder: "With love." },
        { id: 12, question: "My personal message to you:", placeholder: "From the heart.", checked: true },
    ],

    // Baby Book / Welcome Baby
    "Baby Book": [
        { id: 1, question: "The first thing I thought when you were born:", placeholder: "A moment of pure emotion." },
        { id: 2, question: "A hope I have for your future:", placeholder: "A dream for your life." },
        { id: 3, question: "Something I look forward to experiencing with you:", placeholder: "A moment I can't wait for." },
        { id: 4, question: "A wish for the person you will grow up to be:", placeholder: "A loving hope." },
        { id: 5, question: "Three words I hope will describe you someday:", placeholder: "A gentle blessing." },
        { id: 6, question: "A moment from the day you arrived:", placeholder: "A detail I'll never forget." },
        { id: 7, question: "Something special about the family you were born into:", placeholder: "Your roots." },
        { id: 8, question: "Something I hope you will always know:", placeholder: "A truth of love." },
        { id: 9, question: "A little piece of advice for your future:", placeholder: "Guidance for life." },
        { id: 10, question: "A dream I have for you:", placeholder: "A wish for your journey." },
        { id: 11, question: "Something I hope you discover in life:", placeholder: "A meaningful experience." },
        { id: 12, question: "A moment I can't wait to share with you:", placeholder: "For the years ahead." },
        { id: 13, question: "Something wonderful I already see in you:", placeholder: "Your beginning." },
        { id: 14, question: "My message to you when you're older:", placeholder: "From the heart.", checked: true },
    ],

    // Welcome Baby (alias)
    "Baby Book / Welcome Baby": [
        { id: 1, question: "The first thing I thought when you were born:", placeholder: "A moment of pure emotion." },
        { id: 2, question: "A hope I have for your future:", placeholder: "A dream for your life." },
        { id: 3, question: "Something I look forward to experiencing with you:", placeholder: "A moment I can't wait for." },
        { id: 4, question: "A wish for the person you will grow up to be:", placeholder: "A loving hope." },
        { id: 5, question: "Three words I hope will describe you someday:", placeholder: "A gentle blessing." },
        { id: 6, question: "A moment from the day you arrived:", placeholder: "A detail I'll never forget." },
        { id: 7, question: "Something special about the family you were born into:", placeholder: "Your roots." },
        { id: 8, question: "Something I hope you will always know:", placeholder: "A truth of love." },
        { id: 9, question: "A little piece of advice for your future:", placeholder: "Guidance for life." },
        { id: 10, question: "A dream I have for you:", placeholder: "A wish for your journey." },
        { id: 11, question: "Something I hope you discover in life:", placeholder: "A meaningful experience." },
        { id: 12, question: "A moment I can't wait to share with you:", placeholder: "For the years ahead." },
        { id: 13, question: "Something wonderful I already see in you:", placeholder: "Your beginning." },
        { id: 14, question: "My message to you when you're older:", placeholder: "From the heart.", checked: true },
    ],

    // For Mom  (Mother's Day questions)
    "For Mom": [
        { id: 1, question: "My favorite memory with you:", placeholder: "A moment that always warms my heart." },
        { id: 2, question: "Something you taught me that shaped who I am:", placeholder: "A lesson I carry with me every day." },
        { id: 3, question: "A moment that showed your strength or kindness:", placeholder: "A memory I will never forget." },
        { id: 4, question: "Something I truly admire about you as a mother:", placeholder: "A quality that inspires me." },
        { id: 5, question: "Three words that describe you:", placeholder: "Your essence in three words." },
        { id: 6, question: "A moment from this past year that meant a lot to me:", placeholder: "Something special we shared." },
        { id: 7, question: "Something I want to thank you for:", placeholder: "From the heart." },
        { id: 8, question: "Something I hope you always remember:", placeholder: "A loving truth about you." },
        { id: 9, question: "A wish I have for you today:", placeholder: "What I want for you on Mother's Day." },
        { id: 10, question: "Something I look forward to doing together:", placeholder: "A moment I can't wait to share." },
        { id: 11, question: "A memory of you that always makes me smile:", placeholder: "Your magic." },
        { id: 12, question: "My personal Mother's Day message to you:", placeholder: "With love.", checked: true },
    ],

    // For Dad  (Father's Day questions)
    "For Dad": [
        { id: 1, question: "My favorite memory with you:", placeholder: "A moment that stays with me forever." },
        { id: 2, question: "Something you taught me that truly stayed with me:", placeholder: "A lesson that shaped my life." },
        { id: 3, question: "A moment that showed your character:", placeholder: "Strength, humor or kindness — your choice." },
        { id: 4, question: "Something I admire about you:", placeholder: "A quality I will never forget." },
        { id: 5, question: "Three words that describe you:", placeholder: "Your essence in three words." },
        { id: 6, question: "A moment from this past year that meant a lot to me:", placeholder: "Something special you may not know." },
        { id: 7, question: "Something I want to thank you for:", placeholder: "From the heart." },
        { id: 8, question: "A memory of you that always makes me proud:", placeholder: "A proud moment." },
        { id: 9, question: "Something I hope for you in the coming years:", placeholder: "A wish for your future." },
        { id: 10, question: "Something I hope we experience together:", placeholder: "A moment I am looking forward to." },
        { id: 11, question: "A small thing you do that I appreciate more than you think:", placeholder: "A detail that matters." },
        { id: 12, question: "My personal Father's Day message to you:", placeholder: "Warm and heartfelt.", checked: true },
    ],

    // ── 6. SEASONAL ──────────────────────────────────────────

    // Christmas
    Christmas: [
        { id: 1, question: "My favorite Christmas memory with our family:", placeholder: "A moment that always brings warmth when I think of it." },
        { id: 2, question: "A Christmas moment that still makes me laugh:", placeholder: "Something funny or unexpected that happened." },
        { id: 3, question: "A holiday tradition in our family that I truly cherish:", placeholder: "Something that makes Christmas feel like home." },
        { id: 4, question: "A tradition I would love for us to start:", placeholder: "A new family idea for future Christmases." },
        { id: 5, question: "The funniest or most chaotic Christmas moment we ever had:", placeholder: "A story that perfectly captures our family energy." },
        { id: 6, question: "Something from this past year that I feel grateful for:", placeholder: "A moment of appreciation." },
        { id: 7, question: "A dish, smell or song that instantly reminds me of our family holidays:", placeholder: "A sensory Christmas memory." },
        { id: 8, question: "Someone in the family who always brings the Christmas spirit — and why:", placeholder: "Every family has that one person…" },
        { id: 9, question: "The family member who gives the funniest Christmas gifts:", placeholder: "Pure comedy." },
        { id: 10, question: "The family member who gives the most thoughtful gifts:", placeholder: "Warm and sweet." },
        { id: 11, question: "Something I appreciate about our family — especially during Christmas:", placeholder: "A quality or habit that means a lot." },
        { id: 12, question: "A moment from this year that brought us closer:", placeholder: "A recent family memory of connection." },
        { id: 13, question: "My wish for our family in the coming year:", placeholder: "Hope for the future." },
        { id: 14, question: "Something I hope we always remember when Christmas comes again:", placeholder: "A heartfelt reminder." },
        { id: 15, question: "If our family had a Christmas movie title, it would be… because…", placeholder: "A playful and creative question." },
        { id: 16, question: "My Christmas message for our family this year:", placeholder: "Warm, loving and personal.", checked: true },
    ],

    // Ramadan  (NEW)
    Ramadan: [
        { id: 1, question: "A favorite Ramadan memory from our family life:", placeholder: "A moment that always makes you smile." },
        { id: 2, question: "A tradition in our family during Ramadan that you truly cherish:", placeholder: "Something that makes this month feel special." },
        { id: 3, question: "A moment from a past Ramadan that brought our family closer:", placeholder: "A shared experience of connection." },
        { id: 4, question: "Three words that describe our family during Ramadan:", placeholder: "Our month-long spirit in three words." },
        { id: 5, question: "Your most meaningful prayer or verse this Ramadan — and why:", placeholder: "A spiritual moment or reflection." },
        { id: 6, question: "The hardest moment of fasting for you — and how you handled it:", placeholder: "A moment of strength and patience." },
        { id: 7, question: "Something you missed the most while fasting — or what you craved the most:", placeholder: "A light, honest and relatable question." },
        { id: 8, question: "A moment during Ramadan when you felt grateful:", placeholder: "A small or big moment of peace." },
        { id: 9, question: "Something Ramadan taught you about yourself or our family this year:", placeholder: "A lesson or realization." },
        { id: 10, question: "A special moment during iftar or suhoor with our family:", placeholder: "A warm or joyful memory." },
        { id: 11, question: "Something you appreciate about how our family spends Ramadan together:", placeholder: "A habit or atmosphere that means a lot to you." },
        { id: 12, question: "A Ramadan tradition you hope our family keeps forever:", placeholder: "Something timeless." },
        { id: 13, question: "A hope or prayer you have for our family for next year:", placeholder: "A wish for the future." },
        { id: 14, question: "Something you look forward to next Ramadan:", placeholder: "A future moment you already feel excited about." },
        { id: 15, question: "Your personal Ramadan message to our family:", placeholder: "A warm and heartfelt closing note.", checked: true },
    ],

    // Mother's Day  (alias key — same as "For Mom")
    "Mother's Day": [
        { id: 1, question: "My favorite memory with you:", placeholder: "A moment that always warms my heart." },
        { id: 2, question: "Something you taught me that shaped who I am:", placeholder: "A lesson I carry with me every day." },
        { id: 3, question: "A moment that showed your strength or kindness:", placeholder: "A memory I will never forget." },
        { id: 4, question: "Something I truly admire about you as a mother:", placeholder: "A quality that inspires me." },
        { id: 5, question: "Three words that describe you:", placeholder: "Your essence in three words." },
        { id: 6, question: "A moment from this past year that meant a lot to me:", placeholder: "Something special we shared." },
        { id: 7, question: "Something I want to thank you for:", placeholder: "From the heart." },
        { id: 8, question: "Something I hope you always remember:", placeholder: "A loving truth about you." },
        { id: 9, question: "A wish I have for you today:", placeholder: "What I want for you on Mother's Day." },
        { id: 10, question: "Something I look forward to doing together:", placeholder: "A moment I can't wait to share." },
        { id: 11, question: "A memory of you that always makes me smile:", placeholder: "Your magic." },
        { id: 12, question: "My personal Mother's Day message to you:", placeholder: "With love.", checked: true },
    ],

    // Father's Day  (alias key — same as "For Dad")
    "Father's Day": [
        { id: 1, question: "My favorite memory with you:", placeholder: "A moment that stays with me forever." },
        { id: 2, question: "Something you taught me that truly stayed with me:", placeholder: "A lesson that shaped my life." },
        { id: 3, question: "A moment that showed your character:", placeholder: "Strength, humor or kindness — your choice." },
        { id: 4, question: "Something I admire about you:", placeholder: "A quality I will never forget." },
        { id: 5, question: "Three words that describe you:", placeholder: "Your essence in three words." },
        { id: 6, question: "A moment from this past year that meant a lot to me:", placeholder: "Something special you may not know." },
        { id: 7, question: "Something I want to thank you for:", placeholder: "From the heart." },
        { id: 8, question: "A memory of you that always makes me proud:", placeholder: "A proud moment." },
        { id: 9, question: "Something I hope for you in the coming years:", placeholder: "A wish for your future." },
        { id: 10, question: "Something I hope we experience together:", placeholder: "A moment I am looking forward to." },
        { id: 11, question: "A small thing you do that I appreciate more than you think:", placeholder: "A detail that matters." },
        { id: 12, question: "My personal Father's Day message to you:", placeholder: "Warm and heartfelt.", checked: true },
    ],


};

type ProgressStep = { label: string; icon: JSX.Element };

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
        label: "Design Questionnaire",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#9CA3AF" />
            </svg>
        ),
    },
    {
        label: "Review Setup",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M1.33398 14.876C1.33393 13.7854 1.63007 12.7179 2.18688 11.8017C2.74369 10.8855 3.5375 10.1595 4.47305 9.71081C5.4086 9.26211 6.44614 9.10978 7.46116 9.27211C8.47617 9.43444 9.42554 9.90453 10.1953 10.626" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66732 9.20833C8.50827 9.20833 10.0007 7.62267 10.0007 5.66667C10.0007 3.71066 8.50827 2.125 6.66732 2.125C4.82637 2.125 3.33398 3.71066 3.33398 5.66667C3.33398 7.62267 4.82637 9.20833 6.66732 9.20833Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.666 11.334V15.584" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.666 13.459H10.666" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Create Account",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        label: "Invite Friends",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

function TopBar({ step }: { step: number }) {
    const TOTAL = stepConfig.length;
    return (
        <div className="border-b border-[#f0edf1]">
            <div className="px-6 pt-4 pb-3 max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
                        <Image src="/images/logo.jpg" width={28} height={28} alt="Logo" />
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
                                    <span className={`text-[11px] whitespace-nowrap mb-2 leading-none ${isActive ? "font-bold text-[#1a1a2e]" : "font-medium text-[#9CA3AF]"}`}>
                                        {s.label}
                                    </span>
                                    <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white shadow-md" : isCompleted ? "w-9 h-9 bg-[linear-gradient(135deg,#BF003A_0%,#59001C_100%)] text-white" : "w-8 h-8 bg-[#eef0f3] text-[#9CA3AF]"}`}>
                                        {isCompleted ? (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : s.icon}
                                    </div>
                                </div>
                                {!isLast && (
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="h-10 w-full shrink-0 flex items-center">
                                            <div className={`h-0.5 mt-7 w-full translate-y-1.5 transition-all duration-300 ${isCompleted ? "bg-[#B91C1C]" : "bg-[#d1d5db]"}`} />
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

function BottomNav({
    onBack, onNext, nextLabel = "Continue", showBack = true, nextDisabled = false,
}: {
    onBack?: () => void; onNext?: () => void; nextLabel?: string; showBack?: boolean; nextDisabled?: boolean;
}) {
    const backRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const onBackEnter = () => gsap.to(backRef.current, { scale: 1.04, duration: 0.18, ease: "power2.out" });
    const onBackLeave = () => gsap.to(backRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });
    const onNextEnter = () => gsap.to(nextRef.current, { scale: 1.03, duration: 0.18, ease: "power2.out" });
    const onNextLeave = () => gsap.to(nextRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });

    return (
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-[#f0edf1] px-4 sm:px-6 py-4 z-20">
            <div className="max-w-4xl mx-auto flex gap-3">
                {showBack && onBack && (
                    <button ref={backRef} onClick={onBack} onMouseEnter={onBackEnter} onMouseLeave={onBackLeave}
                        className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[14px] py-3 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-27.5">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                    </button>
                )}
                {onNext && (
                    <button ref={nextRef} onClick={nextDisabled ? undefined : onNext} onMouseEnter={onNextEnter} onMouseLeave={onNextLeave}
                        disabled={nextDisabled}
                        className="flex-1 flex items-center font-bold justify-center gap-3 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-base py-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg shadow-[#BF003A]/50 hover:shadow-2xl hover:shadow-[#BF003A]/70 hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">
                        {nextLabel}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Step 1: Book Details ──────────────────────────────────
type BookDraft = {
    bookTitle: string;
    bookSubtitle: string;
    recipientName: string;
    deadline: string;
    occasion: string;
    subTab: string;
    occasionId: number | null;
    subOccasionId: number | null;
};

type BookDetailsForm = {
    bookTitle: string;
    bookSubtitle: string;
    recipientName: string;
    deadline: string;
    selectedOccasion: string | null;
    selectedOccasionId: number | null;
    selectedSubTab: string;
    selectedSubOccasionId: number | null;
};

type QuestionnaireMap = typeof questionnairesBySubOccasion;

type AccountDraft = {
    name: string;
    email: string;
    password: string;
    error: string;
};

type InviteDraft = {
    emailSubject: string;
    emailBody: string;
    friends: Friend[];
    showHelpText: boolean;
};

function Step1({
    form,
    selectedOccasion,
    onChange,
    onNext,
}: {
    form: BookDetailsForm;
    selectedOccasion: string | null;
    onChange: (updates: Partial<BookDetailsForm>) => void;
    onNext: (data: BookDraft) => void;
}) {
    const [attemptedContinue, setAttemptedContinue] = useState(false);
    const [isOccasionModalOpen, setIsOccasionModalOpen] = useState(false);

    const headingRef = useRef<HTMLDivElement>(null);
    const fieldsRef = useRef<HTMLDivElement>(null);
    const occasionsRef = useRef<HTMLDivElement>(null);
    const modalOverlayRef = useRef<HTMLDivElement>(null);
    const modalCardRef = useRef<HTMLDivElement>(null);
    const { data: occasionsResponse } = useOccasionsQuery();
    const occasions = occasionsResponse?.data?.length ? occasionsResponse.data : fallbackOccasions;
    const ph = selectedOccasion ? (placeholdersByOccasion[selectedOccasion] ?? defaultPlaceholders) : defaultPlaceholders;

    // ── POINT 13: occasions animate first, then fields ──
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        gsap.set([headingRef.current, occasionsRef.current, fieldsRef.current], { opacity: 0, y: 24 });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
            .to(occasionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
            .to(fieldsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, []);

    useEffect(() => {
        const btns = occasionsRef.current?.querySelectorAll<HTMLElement>(".occasion-btn");
        if (btns) {
            gsap.fromTo(btns, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(1.4)" });
        }
    }, [selectedOccasion]);

    useEffect(() => {
        if (isOccasionModalOpen) {
            gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
            gsap.fromTo(modalCardRef.current, { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });
        }
    }, [isOccasionModalOpen]);

    const selectedOccasionRecord = occasions.find((occ) => occ.name === form.selectedOccasion) ?? null;
    const selectedOccasionLabel = selectedOccasionRecord?.name ?? "";
    const selectedItems = selectedOccasionRecord?.sub_occasions ?? [];

    const todayMin = useMemo(() => new Date().toISOString().slice(0, 10), []);

    const hasBookTitleError = attemptedContinue && !form.bookTitle.trim();
    const hasRecipientError = attemptedContinue && !form.recipientName.trim();
    const hasDeadlineError = attemptedContinue && !form.deadline.trim();
    const hasOccasionError = attemptedContinue && !form.selectedOccasion;
    const hasSubTabError = attemptedContinue && !form.selectedSubTab;

    const handleOccasionChange = (occasionId: string) => {
        const selectedOcc = occasions.find((o) => o.name === occasionId) ?? null;
        onChange({
            selectedOccasion: occasionId,
            selectedOccasionId: selectedOcc?.id ?? null,
            selectedSubTab: "",
            selectedSubOccasionId: null,
        });
        setIsOccasionModalOpen(true);
    };

    const handleSubTabSelect = (subTab: string) => {
        const selectedSub = selectedItems.find((s) => s.name === subTab) ?? null;
        onChange({
            selectedSubTab: subTab,
            selectedSubOccasionId: selectedSub?.id ?? null,
        });
        setIsOccasionModalOpen(false);
    };

    const handleContinue = () => {
        setAttemptedContinue(true);

        if (!form.bookTitle.trim() || !form.recipientName.trim() || !form.deadline.trim() || !form.selectedOccasion || !form.selectedSubTab) {
            return;
        }

        onNext({
            bookTitle: form.bookTitle,
            bookSubtitle: form.bookSubtitle,
            recipientName: form.recipientName,
            deadline: form.deadline,
            occasion: form.selectedOccasion,
            subTab: form.selectedSubTab,
            occasionId: form.selectedOccasionId,
            subOccasionId: form.selectedSubOccasionId,
        });
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
                    <p className="text-[14px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
                </div>

                {/* ── POINT 13: Occasion first ── */}
                <div ref={occasionsRef} className="mb-6">
                    <label className="text-[14px] font-semibold text-[#374151] block mb-2">Pick Your Occasion</label>
                    <div className="grid grid-cols-3 gap-2">
                        {occasions.map((occ) => (
                            <button key={occ.id} onClick={() => handleOccasionChange(occ.name)}
                                className={`occasion-btn flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border text-[14px] font-medium transition-all cursor-pointer
                                    ${form.selectedOccasion === occ.name ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
                                <span className={form.selectedOccasion === occ.name ? "text-[#B91C1C]" : "text-[#9CA3AF]"}>{renderOccasionIcon(occ.name)}</span>
                                {occ.name}
                            </button>
                        ))}
                    </div>
                    {hasOccasionError && <p className="mt-2 text-[12px] text-red-500">Please pick an occasion to continue.</p>}
                    {form.selectedSubTab ? (
                        <div className="mt-4 rounded-2xl border border-[#f0edf1] bg-white px-4 py-3 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Selected item</p>
                                    <h3 className="mt-1 text-[15px] font-bold text-[#1a1a2e]">{form.selectedSubTab}</h3>
                                    <p className="text-[12px] text-[#9CA3AF]">{selectedOccasionLabel}</p>
                                </div>
                                <button type="button" onClick={() => setIsOccasionModalOpen(true)}
                                    className="shrink-0 rounded-full border cursor-pointer border-[#e5e7eb] px-3 py-1.5 text-[12px] font-semibold text-[#374151] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]">
                                    Change
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3 text-[12px] text-[#9CA3AF]">Pick an occasion, then choose one item from the modal to continue.</p>
                    )}
                    {hasSubTabError && <p className="mt-2 text-[12px] text-red-500">Please select one item for the chosen occasion.</p>}
                </div>

                {/* ── POINT 13: Fields after occasion ── */}
                <div ref={fieldsRef}>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
                        <input value={form.bookTitle} onChange={e => onChange({ bookTitle: e.target.value })} placeholder={ph.title}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                        {hasBookTitleError && <p className="mt-1.5 text-[12px] text-red-500">Book title is required.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Subtitle</label>
                        <input value={form.bookSubtitle} onChange={e => onChange({ bookSubtitle: e.target.value })} placeholder={ph.subtitle}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                    </div>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
                        <input value={form.recipientName} onChange={e => onChange({ recipientName: e.target.value })} placeholder={ph.recipient}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                        {hasRecipientError && <p className="mt-1.5 text-[12px] text-red-500">Recipient name is required.</p>}
                    </div>
                    <div className="mb-5">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Deadline</label>
                        <input
                            type="date"
                            min={todayMin}
                            value={form.deadline}
                            onChange={(e) => onChange({ deadline: e.target.value })}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                        />
                        {hasDeadlineError && <p className="mt-1.5 text-[12px] text-red-500">Please set a deadline.</p>}
                    </div>
                </div>
            </div>

            {isOccasionModalOpen && selectedOccasion && (
                <div ref={modalOverlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
                    <div ref={modalCardRef} className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#f0edf1] bg-white shadow-2xl">
                        <div className="flex items-start justify-between gap-4 border-b border-[#f5f2f3] px-5 py-4 sm:px-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Sub Occasion</p>
                                <h2 className="mt-1 text-[20px] font-bold text-[#1a1a2e]">{selectedOccasionLabel}</h2>
                            </div>
                            <button type="button" onClick={() => setIsOccasionModalOpen(false)}
                                className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-full border border-[#e5e7eb] text-[#9CA3AF] transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {selectedItems.map((tab) => {
                                    const isSelected = form.selectedSubTab === tab.name;
                                    return (
                                        <button key={tab.id} type="button" onClick={() => handleSubTabSelect(tab.name)}
                                            className={`rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${isSelected ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50 hover:bg-[#fffafb]"}`}>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-[14px] font-semibold">{tab.name}</span>
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
                onNext={handleContinue}
                nextDisabled={false}
                nextLabel="Continue"
            />
        </>
    );
}

// ── Step 2: Questionnaire ─────────────────────────────────
function Step2({ onNext, onBack, subTab, questions, onQuestionsChange }: {
    onNext: () => void;
    onBack: () => void;
    subTab: string;
    questions: QuestionnaireMap;
    onQuestionsChange: (next: QuestionnaireMap) => void;
}) {
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current, cardRef.current], { opacity: 0, y: 24 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 }).to(cardRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
        const rows = cardRef.current?.querySelectorAll<HTMLElement>(".q-row");
        if (rows) gsap.fromTo(rows, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.3 });
    }, []);

    const currentQuestions = questions[subTab] ?? [];
    const handleAddQuestion = () => {
        const newQ = { id: Date.now(), question: "", placeholder: "Your answer..." };
        onQuestionsChange({ ...questions, [subTab]: [...(questions[subTab] ?? []), newQ] });
    };
    const handleUpdateQuestion = (id: number, value: string) => {
        onQuestionsChange({ ...questions, [subTab]: (questions[subTab] ?? []).map(q => q.id === id ? { ...q, question: value } : q) });
    };
    const handleDeleteQuestion = (id: number) => {
        onQuestionsChange({ ...questions, [subTab]: (questions[subTab] ?? []).filter(q => q.id !== id) });
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 pb-24 max-w-4xl mx-auto w-full">
                <div ref={headingRef} className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 border-2 border-[#B91C1C] rounded flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-[18px] font-bold text-[#1a1a2e]">Questionnaire <span className="uppercase">{subTab}</span></h1>
                        <p className="mt-1 text-[12px] leading-5 text-[#9CA3AF] max-w-3xl">
                            We have already made some suggestions for the questions. But all questions can easily be edited, removed or rewritten — even in any language you want. You can also add extra questions.
                        </p>
                    </div>
                </div>
                <p className="text-[12px] text-[#9CA3AF] mb-5">Add, edit, or delete questions. No answers are collected in this step.</p>
                <div ref={cardRef} className="bg-white rounded-2xl border border-[#f0edf1] overflow-hidden mb-4">
                    <div className="divide-y divide-[#f9fafb]">
                        {currentQuestions.map((q) => (
                            <div key={q.id} className="q-row px-4 py-3">
                                <div className="flex items-center justify-between gap-3 mb-1.5">
                                    <input value={q.question} onChange={e => handleUpdateQuestion(q.id, e.target.value)}
                                        className="w-full border border-[#e5e7eb] bg-white rounded-lg px-3 py-2 text-[12px] font-medium text-[#374151] outline-none transition-all focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20"
                                        aria-label={`Edit question ${q.id}`} />
                                    <div className="flex items-center gap-2">
                                        {q.checked && (
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                        <button type="button" onClick={() => handleDeleteQuestion(q.id)} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer" aria-label={`Delete question ${q.id}`}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6" /><path d="M14 11v6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[11px] text-[#9CA3AF]">{q.placeholder}</p>
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
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Review Setup" />
        </>
    );
}

// ── Step 3: Choose Theme ──────────────
function Step3({
    onNext,
    onBack,
    selectedThemeId,
    onSelectedThemeIdChange,
}: {
    onNext: (themeId: number) => void;
    onBack: () => void;
    selectedThemeId: number | null;
    onSelectedThemeIdChange: (themeId: number) => void;
}) {
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { data: bookPageStylesResponse, isLoading, error } = useBookPageStylesQuery();
    const templatesFromApi = bookPageStylesResponse?.data?.map(mapStyleCard) ?? [];

    // Fallback static templates when API returns empty (e.g., anonymous users)
    const fallbackTemplates: StyleCard[] = [
        { id: 1001, name: "Warm & Nostalgic", description: "Amber hues, soft grain textures and vintage-inspired layouts.", image: "/icon/1.jpg", occasionName: "General", subOccasionName: "" },

        { id: 1002, name: "Modern Minimal", description: "Crisp white space, strong typography and restrained accents.", image: "/icon/2.jpg", occasionName: "General", subOccasionName: "" },

        { id: 1003, name: "Floral Romance", description: "Delicate flower motifs and blush palettes for tender moments.", image: "/icon/3.jpg", occasionName: "General", subOccasionName: "" },

        { id: 1004, name: "Celestial Dream", description: "Midnight gradients, golden constellations and sense of wonder.", image: "/icon/4.jpg", occasionName: "General", subOccasionName: "" },

        { id: 1005, name: "Tropical Escape", description: "Lush leaves, vivid colors and energy that captures celebrations.", image: "/icon/5.jpg", occasionName: "General", subOccasionName: "" },

        { id: 1006, name: "Elegant Marble", description: "Sophisticated white marble veining paired with gold accents.", image: "/icon/6.jpg", occasionName: "General", subOccasionName: "" },
    ];

    // Use API data if available, fallback only if not loading and no API data
    const templates = templatesFromApi.length > 0 ? templatesFromApi : fallbackTemplates;

    useEffect(() => {
        if (templates.length > 0 && !templates.some((t) => t.id === selectedThemeId)) {
            onSelectedThemeIdChange(templates[0].id);
        }
    }, [onSelectedThemeIdChange, selectedThemeId, templates]);

    useEffect(() => {
        gsap.set([headingRef.current], { opacity: 0, y: 20 });
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tpl-card");
        if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
        if (cards) tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "back.out(1.3)" }, "-=0.25");
    }, []);

    const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => { if (!e.currentTarget.classList.contains("ring-2")) gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" }); };
    const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Theme</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design theme for your book.</p>
                </div>
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {templates.length > 0 ? templates.map((tpl) => (
                        <button key={tpl.id} onClick={() => onSelectedThemeIdChange(tpl.id)} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}
                            className={`tpl-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selectedThemeId === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
                                <Image src={tpl.image} alt={tpl.name} fill className="group-hover:scale-105 transition-transform duration-300" />
                                {selectedThemeId === tpl.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{tpl.name}</span>
                                </div>
                            </div>
                            <div className="px-2 py-2 text-left">
                                <p className="text-[11px] font-semibold text-[#1a1a2e]">{tpl.name}</p>
                                <p className="mt-0.5 text-[10px] leading-4 text-[#6b7280] line-clamp-2">{tpl.description}</p>
                                <p className="mt-1 text-[10px] font-medium text-[#9CA3AF]">{tpl.occasionName} · {tpl.subOccasionName}</p>
                            </div>
                        </button>
                    )) : (
                        <div className="col-span-2 sm:col-span-3 rounded-2xl border border-dashed border-[#e5e7eb] bg-white px-4 py-8 text-center text-[13px] text-[#9CA3AF]">
                            No theme styles available yet.
                        </div>
                    )}
                    {isLoading && <div className="col-span-2 sm:col-span-3 text-center text-[12px] text-[#9CA3AF]">Updating themes...</div>}
                    {error && <div className="col-span-2 sm:col-span-3 text-center text-[12px] text-red-500">Error: {error.message}</div>}
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={() => onNext(selectedThemeId ?? 0)} nextLabel="Choose A Cover" />
        </>
    );
}

// ── Step 4: Choose Cover ──────────────────────────────────
function Step4({
    onNext,
    onBack,
    selectedCoverId,
    onSelectedCoverIdChange,
}: {
    onNext: (coverId: number) => void;
    onBack: () => void;
    selectedCoverId: number;
    onSelectedCoverIdChange: (coverId: number) => void;
}) {
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { data: coverPageStylesResponse, isLoading, error } = useCoverPageStylesQuery();
    const coversFromApi = coverPageStylesResponse?.data?.map(mapStyleCard) ?? [];
    const fallbackCovers: StyleCard[] = [
        { id: 2001, name: "Solid Color", description: "A bold, single-color cover that puts your title front and center.", image: "/icon/11.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2002, name: "Soft Pattern", description: "Delicate repeating patterns add warmth and personality.", image: "/icon/12.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2003, name: "Full Photo", description: "Let a single stunning photograph fill the entire cover.", image: "/icon/15.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2004, name: "Split / Duo-Tone", description: "Two contrasting tones divided across the cover for editorial look.", image: "/icon/14.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2005, name: "Framed Photo", description: "Your photo set inside an elegant frame — classic and polished.", image: "/icon/15.jpg", occasionName: "General", subOccasionName: "" },
    ];

    const covers = coversFromApi.length > 0 ? coversFromApi : fallbackCovers;

    useEffect(() => {
        if (covers.length > 0 && !covers.some((c) => c.id === selectedCoverId)) {
            onSelectedCoverIdChange(covers[0].id);
        }
    }, [covers, onSelectedCoverIdChange, selectedCoverId]);

    useEffect(() => {
        gsap.set(headingRef.current, { opacity: 0, y: 20 });
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".cover-card");
        if (cards) gsap.set(cards, { opacity: 0, scale: 0.93, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
        if (cards) tl.to(cards, { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "back.out(1.3)" }, "-=0.25");
    }, []);

    const onCardEnter = (e: React.MouseEvent<HTMLButtonElement>) => { if (!e.currentTarget.classList.contains("ring-2")) gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" }); };
    const onCardLeave = (e: React.MouseEvent<HTMLButtonElement>) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.inOut" });

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-5">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
                </div>
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {covers.length > 0 ? covers.map((cover) => (
                        <button key={cover.id} onClick={() => onSelectedCoverIdChange(cover.id)} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}
                            className={`cover-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selectedCoverId === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
                                <Image src={cover.image} alt={cover.name} fill className="group-hover:scale-105 transition-transform duration-300" />
                                {selectedCoverId === cover.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{cover.name}</span>
                                </div>
                            </div>
                        </button>
                    )) : (
                        <div className="col-span-2 sm:col-span-3 rounded-2xl border border-dashed border-[#e5e7eb] bg-white px-4 py-8 text-center text-[13px] text-[#9CA3AF]">
                            No cover page styles available yet.
                        </div>
                    )}
                    {isLoading && <div className="col-span-2 sm:col-span-3 text-center text-[12px] text-[#9CA3AF]">Updating covers...</div>}
                    {error && <div className="col-span-2 sm:col-span-3 text-center text-[12px] text-red-500">Error: {error.message}</div>}
                </div>
            </div>
            <BottomNav onBack={onBack} onNext={() => onNext(selectedCoverId)} nextLabel="Design Questionnaire" />
        </>
    );
}

// // ── Step 5: Review Setup ─────────────────────────
function Step5({ onNext, onBack, coverId, bookDraft, isAuthenticated, themeId: _themeId, selectedThemeName }: { onNext: () => void; onBack: () => void; coverId: number; bookDraft: BookDraft | null; isAuthenticated: boolean; themeId: number; selectedThemeName: string; }) {
    const headingRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const { data: coverPageStylesResponse, isLoading } = useCoverPageStylesQuery();
    const coversFromApi = coverPageStylesResponse?.data?.map(mapStyleCard) ?? [];

    const fallbackCovers: StyleCard[] = [
        { id: 2001, name: "Solid Color", description: "A bold, single-color cover that puts your title front and center.", image: "/icon/11.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2002, name: "Soft Pattern", description: "Delicate repeating patterns add warmth and personality.", image: "/icon/12.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2003, name: "Full Photo", description: "Let a single stunning photograph fill the entire cover.", image: "/icon/15.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2004, name: "Split / Duo-Tone", description: "Two contrasting tones divided across the cover for editorial look.", image: "/icon/14.jpg", occasionName: "General", subOccasionName: "" },

        { id: 2005, name: "Framed Photo", description: "Your photo set inside an elegant frame — classic and polished.", image: "/icon/15.jpg", occasionName: "General", subOccasionName: "" },
    ];

    const covers = coversFromApi.length > 0 ? coversFromApi : fallbackCovers;
    const selectedCover = covers.find((c) => c.id === coverId) ?? covers[0];

    useEffect(() => {
        gsap.set([headingRef.current, previewRef.current], { opacity: 0, y: 22 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 }).to(previewRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    }, []);

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[22px] font-bold text-[#1a1a2e]">Review Setup</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Review your selected setup before creating the book.</p>
                </div>
                <div ref={previewRef} className="rounded-2xl border border-[#f0edf1] bg-white p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-5 items-start">
                        <div className="relative w-full max-w-55 mx-auto sm:mx-0 aspect-3/4 rounded-xl overflow-hidden border border-[#e5e7eb] bg-[#f7f7f7]">
                            {selectedCover ? <Image src={selectedCover.image} alt={selectedCover.name} fill className="" /> : <div className="flex h-full w-full items-center justify-center text-[13px] text-[#9CA3AF]">No cover selected</div>}
                        </div>
                        <div>
                            <h2 className="text-[16px] font-semibold text-[#1a1a2e]">Book Preview</h2>
                            <p className="text-[13px] text-[#6b7280] mt-1">This is the current cover and setup that will be used for your new book.</p>
                            <ul className="mt-4 space-y-2 text-[13px] text-[#4b5563]">
                                {selectedThemeName && (
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#B91C1C] shrink-0" />
                                        Theme: {selectedThemeName}
                                    </li>
                                )}
                                {selectedCover && <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#B91C1C] shrink-0" />Cover: {selectedCover.name}</li>}
                                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#B91C1C] shrink-0" />Questionnaire Type: {bookDraft?.subTab ?? "Not selected"}</li>
                                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />Status: Ready to create</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5 rounded-2xl border border-[#f0edf1] bg-[#fafafa] p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#1a1a2e]">Current draft</h3>
                                <p className="text-[12px] text-[#9CA3AF]">This draft will be submitted to POST /user/books.</p>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#BF003A] border border-[#f3d4db]">Ready</span>
                        </div>
                        <div className="mt-3 space-y-2">
                            {bookDraft ? (
                                <div className="rounded-xl border border-[#ece7ea] bg-white px-3 py-2.5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-[13px] font-semibold text-[#1a1a2e]">{bookDraft.bookTitle || "Untitled book"}</p>
                                            <p className="mt-0.5 text-[12px] text-[#6b7280]">{bookDraft.recipientName ? `Recipient: ${bookDraft.recipientName}` : "Recipient not set"}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-[11px] font-semibold text-[#BF003A]">{bookDraft.occasion || "No occasion selected"}</p>
                                            <p className="text-[11px] text-[#9CA3AF]">{bookDraft.bookSubtitle || "No subtitle provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-[#e5e7eb] bg-white px-3 py-5 text-center text-[13px] text-[#9CA3AF]">
                                    No draft found yet. Go back and fill in the book details.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-2">
                <p className="text-[12px] text-[#9CA3AF]">
                    {isAuthenticated
                        ? "You are already signed in. Continue to the invite step."
                        : "Next you&apos;ll create your account before inviting friends."}
                </p>
            </div>
            <BottomNav onBack={onBack} onNext={onNext} nextLabel={isAuthenticated ? "Invite Friends" : "Create Account"} />
        </>
    );
}

// ── Step 6: Create Account Gate ───────────────────────────
function Step6({ onBack, onContinue, loginHref, onLoginNavigate, accountDraft, onAccountDraftChange, isAuthenticated }: {
    onBack: () => void;
    onContinue: () => void;
    loginHref: string;
    onLoginNavigate: () => void;
    accountDraft: AccountDraft;
    onAccountDraftChange: (updates: Partial<AccountDraft>) => void;
    isAuthenticated: boolean;
}) {
    const { login } = useAuth();
    const registerMutation = useRegisterMutation();
    const headingRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const autoAdvancedRef = useRef(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        gsap.set([headingRef.current, formRef.current], { opacity: 0, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.45 }).to(formRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");
    }, []);

    useEffect(() => {
        if (isAuthenticated && !autoAdvancedRef.current) {
            autoAdvancedRef.current = true;
            onContinue();
        }
    }, [isAuthenticated, onContinue]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAccountDraftChange({ error: "" });

        try {
            const response = await registerMutation.mutateAsync({ name: accountDraft.name, email: accountDraft.email, password: accountDraft.password });
            const token = response.data.token;
            const user = response.data.user;

            if (typeof window !== "undefined") {
                window.localStorage.setItem("authToken", token);
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("user", JSON.stringify(user));
                window.dispatchEvent(new Event("auth-token-updated"));
            }

            login({
                id: String(user.id),
                name: user.name,
                email: user.email,
            });

            toast.success(response.message || "Account created successfully");
            onContinue();
        } catch (mutationError) {
            const message = mutationError instanceof Error ? mutationError.message : "Failed to create account";
            toast.error(message);
            onAccountDraftChange({ error: message });
        }
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full overflow-y-auto">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[24px] font-bold text-[#1a1a2e]">Create your account</h1>
                    <p className="text-[14px] text-[#6b7280] mt-0.5 max-w-2xl">
                        To save your creation and complete the process, you need to make an account.
                    </p>
                </div>

                <div ref={formRef} className="rounded-2xl border border-[#f0edf1] bg-white p-5 shadow-sm max-w-2xl">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={accountDraft.name}
                                onChange={(event) => onAccountDraftChange({ name: event.target.value })}
                                placeholder="Jane Doe"
                                className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email</label>
                            <input
                                type="email"
                                value={accountDraft.email}
                                onChange={(event) => onAccountDraftChange({ email: event.target.value })}
                                placeholder="jane@example.com"
                                className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={accountDraft.password}
                                    onChange={(event) => onAccountDraftChange({ password: event.target.value })}
                                    placeholder="••••••••"
                                    className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 pr-10 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#B91C1C] transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {accountDraft.error ? <p className="text-[13px] text-red-600">{accountDraft.error}</p> : null}

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full rounded-xl bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-4 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {registerMutation.isPending ? "Creating account..." : "Create account and continue"}
                        </button>

                        <p className="text-center text-[13px] text-[#6b7280]">
                            Already have an account?{" "}
                            <Link href={loginHref} onClick={onLoginNavigate} className="font-semibold text-[#BF003A] hover:underline">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <BottomNav onBack={onBack} />
        </>
    );
}

// ── Step 7: Invite Friends (Page Order section REMOVED — Point 15) ──
interface Friend { id: string; name: string; email: string; }
const createFriend = (): Friend => ({ id: `friend-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: "", email: "" });

function Step7({
    onBack,
    onDone,
    onLoginRequired,
    isAuthenticated,
    isSubmitting,
    errorMessage,
    inviteLink,
    isGeneratingInviteLink,
    onEnsureInviteLink,
    inviteDraft,
    onInviteDraftChange,
}: {
    onBack: () => void;
    onDone: () => Promise<void> | void;
    onLoginRequired: () => void;
    isAuthenticated: boolean;
    isSubmitting?: boolean;
    errorMessage?: string;
    inviteLink: string;
    isGeneratingInviteLink: boolean;
    onEnsureInviteLink: () => Promise<void>;
    inviteDraft: InviteDraft;
    onInviteDraftChange: (updates: Partial<InviteDraft>) => void;
}) {
    const headingRef = useRef<HTMLDivElement>(null);
    const emailSectionRef = useRef<HTMLDivElement>(null);
    const friendsSectionRef = useRef<HTMLDivElement>(null);
    const hasCalledRef = useRef(false);

    useEffect(() => {
        gsap.set([headingRef.current, emailSectionRef.current, friendsSectionRef.current], { opacity: 0, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.45 })
            .to(emailSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
            .to(friendsSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25");
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        if (inviteLink) return;
        if (hasCalledRef.current) return;
        hasCalledRef.current = true;
        void onEnsureInviteLink();
    }, [isAuthenticated, inviteLink]);

    // Invite step uses a simple list; ordering moved to Participants panel

    const addFriend = () => onInviteDraftChange({ friends: [...inviteDraft.friends, createFriend()] });
    const updateFriend = (id: string, field: "name" | "email", value: string) => {
        onInviteDraftChange({ friends: inviteDraft.friends.map(f => f.id === id ? { ...f, [field]: value } : f) });
    };
    const removeFriend = (id: string) => {
        onInviteDraftChange({ friends: inviteDraft.friends.length <= 1 ? inviteDraft.friends : inviteDraft.friends.filter(f => f.id !== id) });
    };

    // No drag handlers here — plain friend rows

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full overflow-y-auto">
                <div ref={headingRef} className="mb-6">
                    <h1 className="text-[24px] font-bold text-[#1a1a2e]">Invite Friends</h1>
                    <p className="text-[14px] text-[#9CA3AF] mt-0.5">Customize the message, copy the invite link, and add emails only if you want to send them directly.</p>
                </div>

                <div className="mb-5 rounded-2xl border border-[#f0edf1] bg-linear-to-br from-[#fff8f9] to-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BF003A]">Share link</p>
                            <h2 className="mt-2 text-[18px] font-bold text-[#1a1a2e]">Invite friends without email</h2>
                            <p className="mt-1 text-[13px] leading-6 text-[#6b7280]">
                                Copy this link or share it on WhatsApp. Email addresses are optional.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                disabled={!inviteLink || isGeneratingInviteLink}
                                onClick={async () => {
                                    if (!inviteLink || typeof navigator === "undefined") return;
                                    await navigator.clipboard.writeText(inviteLink);
                                    toast.success("Invite link copied");
                                }}
                                className="inline-flex items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Copy link
                            </button>
                            <a
                                href={inviteLink ? `https://wa.me/?text=${encodeURIComponent(`Join my memory book: ${inviteLink}`)}` : "#"}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity ${inviteLink && !isGeneratingInviteLink ? "bg-[#25D366] hover:opacity-90" : "pointer-events-none bg-[#9CA3AF] opacity-60"}`}
                            >
                                Share on WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-dashed border-[#e5e7eb] bg-white p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">Invite link</p>
                        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <input value={inviteLink || (isGeneratingInviteLink ? "Generating invite link..." : "Invite link will appear here")} readOnly className="w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-[13px] text-[#374151] outline-none" />
                            <button
                                type="button"
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        onLoginRequired();
                                        return;
                                    }

                                    onInviteDraftChange({ showHelpText: !inviteDraft.showHelpText });
                                }}
                                className="inline-flex items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
                            >
                                {!isAuthenticated ? "Log in" : "Need help?"}
                            </button>
                        </div>
                        {isAuthenticated && inviteDraft.showHelpText && (
                            <p className="mt-3 rounded-xl border border-[#f3d4db] bg-[#fff8f9] px-4 py-3 text-[12px] leading-5 text-[#6b7280]">
                                Copy the invite link and share it with contributors. Anyone with the link can open the book invitation page.
                            </p>
                        )}
                    </div>
                </div>

                {!isAuthenticated && (
                    <div className="mb-5 rounded-2xl border border-[#f3d4db] bg-[#fff8f9] p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-[14px] font-semibold text-[#1a1a2e]">Log in to send invites</h2>
                                <p className="mt-1 text-[12px] text-[#6b7280]">Your draft stays saved. Sign in whenever you&apos;re ready to send the invitations.</p>
                            </div>
                            <button
                                type="button"
                                onClick={onLoginRequired}
                                className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                            >
                                Log in to send
                            </button>
                        </div>
                    </div>
                )}

                {/* Email Message */}
                <div ref={emailSectionRef} className="bg-white rounded-2xl border border-[#f0edf1] p-5 mb-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#fff5f6] border border-[#fde8ec] flex items-center justify-center shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-[14px] font-bold text-[#1a1a2e]">Email Message</h2>
                            <p className="text-[12px] text-[#9CA3AF]">Optional email copy if you want to send direct invites.</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email Subject (optional)</label>
                        <input value={inviteDraft.emailSubject} onChange={e => onInviteDraftChange({ emailSubject: e.target.value })} placeholder="e.g., You're invited to contribute to a memory book!"
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email Body (optional)</label>
                        <textarea value={inviteDraft.emailBody} onChange={e => onInviteDraftChange({ emailBody: e.target.value })} rows={8} placeholder="Write your invitation message here..."
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-3 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all resize-none leading-relaxed" />
                        <p className="text-[11px] text-[#9CA3AF] mt-1.5">
                            Use <code className="bg-[#f5f5f5] px-1 rounded text-[#374151]">[Name]</code> and <code className="bg-[#f5f5f5] px-1 rounded text-[#374151]">[Invite Link]</code> — they will be replaced automatically for each recipient.
                        </p>
                    </div>
                </div>

                {/* Add Contributors */}
                <div ref={friendsSectionRef} className="bg-white rounded-2xl border border-[#f0edf1] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-[#fff5f6] border border-[#fde8ec] flex items-center justify-center shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-[14px] font-bold text-[#1a1a2e]">Add Contributors</h2>
                            <p className="text-[12px] text-[#9CA3AF]">Add the people you&apos;d like to contribute to this book.</p>
                        </div>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mb-4 mt-1">Add contributors and their email addresses below, or leave them blank and share the link instead.</p>
                    <p className="text-[12px] text-[#6b7280] mb-3 mt-1 flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" />
                            <circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" />
                        </svg>
                        You can easily change the order of participants by dragging them.
                    </p>

                    <div className="flex flex-col gap-1">
                        {inviteDraft.friends.map((friend, idx) => <FriendRow key={friend.id} friend={friend} index={idx} canRemove={inviteDraft.friends.length > 1} onUpdate={updateFriend} onRemove={removeFriend} />)}
                    </div>

                    <button type="button" onClick={addFriend}
                        className="mt-3 w-full flex items-center justify-center gap-2 border border-dashed border-[#e5e7eb] text-[#9CA3AF] hover:border-[#B91C1C] hover:text-[#B91C1C] hover:bg-[#fff8f9] text-[13px] font-medium py-3 rounded-xl cursor-pointer transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Another Friend
                    </button>
                </div>
            </div>

            <BottomNav
                onBack={onBack}
                onNext={isAuthenticated ? () => { void onDone(); } : onLoginRequired}
                nextLabel={isAuthenticated ? "Send Invites" : "Log in to Send Invites"}
                nextDisabled={isSubmitting || isGeneratingInviteLink}
            />
            {errorMessage && (
                <div className="px-4 sm:px-6 pb-6 max-w-4xl mx-auto w-full">
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{errorMessage}</div>
                </div>
            )}
        </>
    );
}

// ── Success Modal ─────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 });
        gsap.fromTo(cardRef.current, { opacity: 0, scale: 0.88, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.6)" });
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
                <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Invites Sent!</h2>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">Your memory book has been created and invitations have been sent to all contributors.</p>
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

// ── Main ──────────────────────────────────────────────────
export default function BookCreator() {
    const CREATE_WIZARD_STORAGE_KEY = "create-book-wizard-state";
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading } = useAuth();
    const { data: bookPageStylesResponse } = useBookPageStylesQuery();
    const { data: coverPageStylesResponse } = useCoverPageStylesQuery();
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [bookDetailsForm, setBookDetailsForm] = useState<BookDetailsForm>({
        bookTitle: "",
        bookSubtitle: "",
        recipientName: "",
        deadline: "",
        selectedOccasion: null,
        selectedOccasionId: null,
        selectedSubTab: "Birthday",
        selectedSubOccasionId: null,
    });
    const [questionsBySubOccasion, setQuestionsBySubOccasion] = useState<QuestionnaireMap>(questionnairesBySubOccasion);
    const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
    const [selectedCoverId, setSelectedCoverId] = useState(1);
    const [accountDraft, setAccountDraft] = useState<AccountDraft>({
        name: "",
        email: "",
        password: "",
        error: "",
    });
    const [inviteDraft, setInviteDraft] = useState<InviteDraft>({
        emailSubject: "You're invited to contribute to a memory book! 📖",
        emailBody: `Hi [Name],\n\nYou've been invited to contribute to a special memory book.\n\nClick the link below to add your message, photos, and memories:\n[Invite Link]\n\nThis won't take long and will mean the world to the recipient.\n\nThank you so much!\n`,
        friends: [createFriend()],
        showHelpText: false,
    });
    const [createdInviteLink, setCreatedInviteLink] = useState("");
    const [isGeneratingInviteLink, setIsGeneratingInviteLink] = useState(false);
    const createBookMutation = useCreateBookMutation();
    const hasInitializedWizardRef = useRef(false);

    const urlCoverId = searchParams ? Number(searchParams.get("cover")) || undefined : undefined;
    const urlStep = searchParams?.get("step")?.toLowerCase() ?? "";
    const inviteStepQuery = (() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", "invite");
        params.set("resume", "1");
        const query = params.toString();
        return query ? `${pathname}?${query}` : pathname;
    })();
    const loginRedirectHref = `/login?redirect=${encodeURIComponent(inviteStepQuery)}`;
    const availableThemeIds = useMemo(() => bookPageStylesResponse?.data?.map((style) => style.id) ?? [], [bookPageStylesResponse]);
    const availableCoverIds = useMemo(() => coverPageStylesResponse?.data?.map((style) => style.id) ?? [], [coverPageStylesResponse]);
    const bookDraft = useMemo<BookDraft>(() => ({
        bookTitle: bookDetailsForm.bookTitle,
        bookSubtitle: bookDetailsForm.bookSubtitle,
        recipientName: bookDetailsForm.recipientName,
        deadline: bookDetailsForm.deadline,
        occasion: bookDetailsForm.selectedOccasion ?? "",
        subTab: bookDetailsForm.selectedSubTab,
        occasionId: bookDetailsForm.selectedOccasionId,
        subOccasionId: bookDetailsForm.selectedSubOccasionId,
    }), [bookDetailsForm]);

    const updateBookDetailsForm = useCallback((updates: Partial<BookDetailsForm>) => {
        setBookDetailsForm((prev) => ({ ...prev, ...updates }));
    }, []);

    const persistWizardState = () => {
        if (typeof window === "undefined") return;
        if (!hasInitializedWizardRef.current) return;
        window.sessionStorage.setItem(
            CREATE_WIZARD_STORAGE_KEY,
            JSON.stringify({
                step,
                selectedThemeId,
                selectedCoverId,
                bookDraft,
                questionsBySubOccasion,
                accountDraft,
                inviteDraft,
            })
        );
    };

    useEffect(() => {
        persistWizardState();
    }, [step, selectedThemeId, selectedCoverId, bookDraft, questionsBySubOccasion, accountDraft, inviteDraft]);

    const ensureInviteLink = useCallback(async () => {
        if (isGeneratingInviteLink) return;
        if (!isAuthenticated) {
            throw new Error("Unauthenticated. Please log in to continue.");
        }
        if (!bookDraft) {
            throw new Error("Book details are missing");
        }
        if (!bookDraft.bookTitle?.trim()) {
            throw new Error("Book title is required.");
        }

        if (createdInviteLink) {
            return { inviteLink: createdInviteLink, bookId: createBookMutation.data?.data?.id };
        }

        setIsGeneratingInviteLink(true);
        try {
            const resolvedThemeId = availableThemeIds.includes(selectedThemeId) ? selectedThemeId : availableThemeIds[0] ?? null;
            const resolvedCoverId = availableCoverIds.includes(selectedCoverId) ? selectedCoverId : availableCoverIds[0] ?? null;
            const selectedQuestions = (questionsBySubOccasion[bookDraft.subTab] ?? [])
                .map((questionItem) => questionItem.question?.trim())
                .filter((question): question is string => Boolean(question));

            if (resolvedThemeId !== selectedThemeId) {
                setSelectedThemeId(resolvedThemeId ?? 1);
            }

            if (resolvedCoverId !== selectedCoverId) {
                setSelectedCoverId(resolvedCoverId ?? 1);
            }

            const result = await createBookMutation.mutateAsync({
                book_title: bookDraft.bookTitle,
                book_subtitle: bookDraft.bookSubtitle,
                recipient_name: bookDraft.recipientName,
                expire_date: bookDraft.deadline,
                occasion_id: bookDraft.occasionId || null,
                sub_occasion_id: bookDraft.subOccasionId || null,
                book_page_style_id: resolvedThemeId,
                cover_page_style_id: resolvedCoverId,
                questions: selectedQuestions,
                pages_per_contributor: 2,
            });
            const rawLink = result.data?.invite_link || (result as { invite_link?: string }).invite_link || "";
            const inviteLink = getCleanInviteLink(rawLink)

            if (!inviteLink) {
                throw new Error("Invite link missing from create book response.");
            }

            setCreatedInviteLink(inviteLink);
            return { inviteLink, bookId: result.data?.id };
        } finally {
            setIsGeneratingInviteLink(false);
        }
    }, [
        availableCoverIds,
        availableThemeIds,
        bookDraft,
        createdInviteLink,
        createBookMutation,
        isAuthenticated,
        isGeneratingInviteLink,
        selectedCoverId,
        selectedThemeId,
    ]);

    const stepFromQuery = (() => {
        switch (urlStep) {
            case "book-details": return 1;
            case "choose-theme": return 2;
            case "choose-cover": return 3;
            case "questionnaire": return 4;
            case "preview": return 5;
            case "account":
            case "register": return 6;
            case "invite":
            case "send-invites": return 7;
            default: return undefined;
        }
    })();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const shouldRestore = searchParams?.get("resume") === "1" || urlStep === "invite" || urlStep === "send-invites";
        if (!shouldRestore) return;
        try {
            const rawState = window.sessionStorage.getItem(CREATE_WIZARD_STORAGE_KEY);
            if (!rawState) return;
            const parsed = JSON.parse(rawState) as {
                step?: number;
                selectedSubTab?: string;
                selectedThemeId?: number;
                selectedCoverId?: number;
                bookDraft?: BookDraft | null;
                accountDraft?: AccountDraft;
                inviteDraft?: InviteDraft;
            };
            if (typeof parsed.selectedThemeId === "number") setSelectedThemeId(parsed.selectedThemeId);
            if (typeof parsed.selectedCoverId === "number") setSelectedCoverId(parsed.selectedCoverId);
            if (parsed.accountDraft) {
                setAccountDraft({
                    name: parsed.accountDraft.name ?? "",
                    email: parsed.accountDraft.email ?? "",
                    password: parsed.accountDraft.password ?? "",
                    error: parsed.accountDraft.error ?? "",
                });
            }
            if (parsed.inviteDraft) {
                setInviteDraft({
                    emailSubject: parsed.inviteDraft.emailSubject ?? "You're invited to contribute to a memory book! 📖",
                    emailBody: parsed.inviteDraft.emailBody ?? `Hi [Name],\n\nYou've been invited to contribute to a special memory book.\n\nClick the link below to add your message, photos, and memories:\n[Invite Link]\n\nThis won't take long and will mean the world to the recipient.\n\nThank you so much!\n`,
                    friends: parsed.inviteDraft.friends?.length ? parsed.inviteDraft.friends : [createFriend()],
                    showHelpText: parsed.inviteDraft.showHelpText ?? false,
                });
            }
            if (parsed.bookDraft) {
                setBookDetailsForm({
                    bookTitle: parsed.bookDraft.bookTitle ?? "",
                    bookSubtitle: parsed.bookDraft.bookSubtitle ?? "",
                    recipientName: parsed.bookDraft.recipientName ?? "",
                    deadline: parsed.bookDraft.deadline ?? "",
                    selectedOccasion: parsed.bookDraft.occasion || null,
                    selectedOccasionId: parsed.bookDraft.occasionId ?? null,
                    selectedSubTab: parsed.bookDraft.subTab ?? "Birthday",
                    selectedSubOccasionId: parsed.bookDraft.subOccasionId ?? null,
                });
            }
            if (typeof parsed.step === "number") setStep(parsed.step === 6 ? 7 : parsed.step);
        } catch {
            window.sessionStorage.removeItem(CREATE_WIZARD_STORAGE_KEY);
        }
    }, [searchParams, urlStep]);

    useEffect(() => {
        hasInitializedWizardRef.current = true;
    }, []);

    useEffect(() => {
        if (stepFromQuery) setStep(stepFromQuery);
        else if (urlCoverId) setStep(3);
        if (urlCoverId) setSelectedCoverId(urlCoverId);
    }, [stepFromQuery, urlCoverId]);

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar step={step} />
            {step === 1 && <Step1 form={bookDetailsForm} selectedOccasion={bookDetailsForm.selectedOccasion} onChange={updateBookDetailsForm} onNext={() => setStep(2)} />}
            {step === 2 && <Step3 onNext={(id) => { setSelectedThemeId(id); setStep(3); }} onBack={() => setStep(1)} selectedThemeId={selectedThemeId} onSelectedThemeIdChange={setSelectedThemeId} />}
            {step === 3 && <Step4 onNext={(coverId) => { setSelectedCoverId(coverId); setStep(4); }} onBack={() => setStep(2)} selectedCoverId={selectedCoverId} onSelectedCoverIdChange={setSelectedCoverId} />}
            {step === 4 && <Step2 onNext={() => setStep(5)} onBack={() => setStep(3)} subTab={bookDetailsForm.selectedSubTab} questions={questionsBySubOccasion} onQuestionsChange={setQuestionsBySubOccasion} />}
            {step === 5 && (() => {
                const themesFromApi = bookPageStylesResponse?.data?.map(mapStyleCard) ?? [];
                const fallbackTemplates: StyleCard[] = [
                    { id: 1001, name: "Warm & Nostalgic", description: "", image: "/icon/1.jpg", occasionName: "General", subOccasionName: "" },
                    { id: 1002, name: "Modern Minimal", description: "", image: "/icon/2.jpg", occasionName: "General", subOccasionName: "" },
                    { id: 1003, name: "Floral Romance", description: "", image: "/icon/3.jpg", occasionName: "General", subOccasionName: "" },
                    { id: 1004, name: "Celestial Dream", description: "", image: "/icon/4.jpg", occasionName: "General", subOccasionName: "" },
                    { id: 1005, name: "Tropical Escape", description: "", image: "/icon/5.jpg", occasionName: "General", subOccasionName: "" },
                    { id: 1006, name: "Elegant Marble", description: "", image: "/icon/6.jpg", occasionName: "General", subOccasionName: "" },
                ];
                const allThemes = themesFromApi.length > 0 ? themesFromApi : fallbackTemplates;
                const resolvedThemeName = allThemes.find(t => t.id === selectedThemeId)?.name ?? "";

                return (
                    <Step5
                        onNext={() => setStep(6)}
                        onBack={() => setStep(4)}
                        coverId={selectedCoverId}
                        bookDraft={bookDraft}
                        isAuthenticated={isAuthenticated}
                        themeId={selectedThemeId}
                        selectedThemeName={resolvedThemeName}
                    />
                );
            })()}
            {step === 6 && (
                <Step6
                    onBack={() => setStep(5)}
                    onContinue={() => setStep(7)}
                    loginHref={loginRedirectHref}
                    onLoginNavigate={persistWizardState}
                    accountDraft={accountDraft}
                    onAccountDraftChange={(updates) => setAccountDraft((prev) => ({ ...prev, ...updates }))}
                    isAuthenticated={isAuthenticated}
                />
            )}
            {step === 7 && (
                <Step7
                    onBack={() => setStep(isAuthenticated ? 5 : 6)}
                    isAuthenticated={isAuthenticated}
                    inviteLink={createdInviteLink}
                    isGeneratingInviteLink={isGeneratingInviteLink}
                    onEnsureInviteLink={async () => { await ensureInviteLink(); }}
                    inviteDraft={inviteDraft}
                    onInviteDraftChange={(updates) => setInviteDraft((prev) => ({ ...prev, ...updates }))}
                    onLoginRequired={() => {
                        persistWizardState();
                        router.push(loginRedirectHref);
                    }}
                    onDone={async () => {
                        if (isLoading) { toast.info("Checking login status..."); return; }
                        if (!isAuthenticated) { return; }
                        try {
                            const result = await ensureInviteLink();
                            const bookId = result?.bookId;

                            if (bookId !== undefined && bookId !== null) {
                                const friendsWithEmail = inviteDraft.friends.filter(f => f.email?.trim());
                                for (const friend of friendsWithEmail) {
                                    try {
                                        await inviteByEmail(bookId, friend.email.trim(), friend.name?.trim());
                                    } catch (e) {
                                        console.error(`Failed to invite ${friend.email}:`, e);
                                    }
                                }
                            }

                            if (typeof window !== "undefined") window.sessionStorage.removeItem(CREATE_WIZARD_STORAGE_KEY);
                            toast.success("Invite link ready");
                            setShowSuccess(true);
                        } catch (error) {
                            toast.error(error instanceof Error ? error.message : "Failed to create book");
                        }
                    }}
                    isSubmitting={isGeneratingInviteLink || createBookMutation.isPending}
                    errorMessage={createBookMutation.error?.message}
                />
            )}
            {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        </div>
    );
}

function FriendRow({ friend, index, canRemove, onUpdate, onRemove }: {
    friend: Friend; index: number; canRemove: boolean;
    onUpdate: (id: string, field: "name" | "email", value: string) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className={`flex flex-col sm:flex-row gap-2 items-end rounded-xl p-2 border border-transparent hover:border-[#f0edf1] hover:bg-[#fafafa]`}>
            <div className="flex-1 w-full">
                {index === 0 && <label className="text-[12px] font-semibold text-[#374151] block mb-1">Full Name <span className="font-normal text-[#9CA3AF]">(optional)</span></label>}
                <input value={friend.name} onChange={e => onUpdate(friend.id, "name", e.target.value)} placeholder="Friend's name (optional)"
                    className="w-full border border-[#e5e7eb] bg-white rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all" />
            </div>
            <div className="flex-1 w-full">
                {index === 0 && <label className="text-[12px] font-semibold text-[#374151] block mb-1">Email (optional)</label>}
                <div className="relative">
                    <input value={friend.email} onChange={e => onUpdate(friend.id, "email", e.target.value)} placeholder="friend@email.com" type="email"
                        className="w-full border border-[#e5e7eb] bg-white rounded-xl pl-4 pr-10 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-[#fff0f3] flex items-center justify-center pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                </div>
            </div>
            {canRemove ? (
                <button type="button" onClick={() => onRemove(friend.id)}
                    className="mb-px flex items-center justify-center w-9 h-10.5 rounded-xl border border-[#e5e7eb] bg-white text-[#c5c8cc] hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    aria-label={`Remove contributor ${index + 1}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            ) : <div className="w-9 shrink-0" />}
        </div>
    );
}