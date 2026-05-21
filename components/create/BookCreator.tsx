/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
import { updateBookUser } from "@/services/api";
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
        case "Farewell":
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
    Farewell: { title: "e.g., Farewell to an Amazing Colleague", subtitle: "e.g., Thank you for everything", recipient: "e.g., Thomas" },
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
            { id: 201, occasion_id: 2, name: "Class Book", image: "", status: 1 },
            { id: 202, occasion_id: 2, name: "Kindergarten", image: "", status: 1 },
            { id: 203, occasion_id: 2, name: "Farewell Teacher", image: "", status: 1 },
            { id: 204, occasion_id: 2, name: "End-of-Year Book", image: "", status: 1 },
        ],
    },
    {
        id: 3, name: "Farewell", image: "", status: 1,
        sub_occasions: [
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
            { id: 502, occasion_id: 5, name: "For Mom", image: "", status: 1 },
            { id: 503, occasion_id: 5, name: "For Dad", image: "", status: 1 },
            { id: 504, occasion_id: 5, name: "Baby Book", image: "", status: 1 },
            { id: 505, occasion_id: 5, name: "For Grandma / Grandpa", image: "", status: 1 },
        ],
    },
    {
        id: 6, name: "Seasonal", image: "", status: 1,
        sub_occasions: [
            { id: 601, occasion_id: 6, name: "Christmas", image: "", status: 1 },
            { id: 602, occasion_id: 6, name: "New Year", image: "", status: 1 },
            { id: 603, occasion_id: 6, name: "Easter", image: "", status: 1 },
            { id: 604, occasion_id: 6, name: "Halloween", image: "", status: 1 },
        ],
    },
];

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
        <div className="sticky bottom-0 backdrop-blur-sm border-t border-[#f0edf1] px-4 sm:px-6 py-4">
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
    occasion: string;
    subTab: string;
    occasionId: number | null;
    subOccasionId: number | null;
};

function Step1({ onNext }: { onNext: (data: BookDraft) => void }) {
    const [bookTitle, setBookTitle] = useState("");
    const [bookSubtitle, setBookSubtitle] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedOccasionId, setSelectedOccasionId] = useState<number | null>(null);
    const [selectedSubTab, setSelectedSubTab] = useState("");
    const [selectedSubOccasionId, setSelectedSubOccasionId] = useState<number | null>(null);
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

    const selectedOccasionRecord = occasions.find((occ) => occ.name === selectedOccasion) ?? null;
    const selectedOccasionLabel = selectedOccasionRecord?.name ?? "";
    const selectedItems = selectedOccasionRecord?.sub_occasions ?? [];

    const handleOccasionChange = (occasionId: string) => {
        const selectedOcc = occasions.find((o) => o.name === occasionId) ?? null;
        setSelectedOccasion(occasionId);
        setSelectedOccasionId(selectedOcc?.id ?? null);
        setSelectedSubTab("");
        setSelectedSubOccasionId(null);
        setIsOccasionModalOpen(true);
    };

    const handleSubTabSelect = (subTab: string, subOccasionId: number) => {
        const selectedSub = selectedItems.find((s) => s.name === subTab) ?? null;
        setSelectedSubTab(subTab);
        setSelectedSubOccasionId(selectedSub?.id ?? subOccasionId);
        setIsOccasionModalOpen(false);
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
                                    ${selectedOccasion === occ.name ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
                                <span className={selectedOccasion === occ.name ? "text-[#B91C1C]" : "text-[#9CA3AF]"}>{renderOccasionIcon(occ.name)}</span>
                                {occ.name}
                            </button>
                        ))}
                    </div>
                    {selectedSubTab ? (
                        <div className="mt-4 rounded-2xl border border-[#f0edf1] bg-white px-4 py-3 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Selected item</p>
                                    <h3 className="mt-1 text-[15px] font-bold text-[#1a1a2e]">{selectedSubTab}</h3>
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
                </div>

                {/* ── POINT 13: Fields after occasion ── */}
                <div ref={fieldsRef}>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
                        <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder={ph.title}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                    </div>
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Book Subtitle</label>
                        <input value={bookSubtitle} onChange={e => setBookSubtitle(e.target.value)} placeholder={ph.subtitle}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                    </div>
                    <div className="mb-5">
                        <label className="text-[14px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
                        <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder={ph.recipient}
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
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
                                    const isSelected = selectedSubTab === tab.name;
                                    return (
                                        <button key={tab.id} type="button" onClick={() => handleSubTabSelect(tab.name, tab.id)}
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
                onNext={() => selectedSubTab && onNext({
                    bookTitle,
                    bookSubtitle,
                    recipientName,
                    occasion: selectedOccasion ?? "",
                    subTab: selectedSubTab,
                    occasionId: selectedOccasionId,
                    subOccasionId: selectedSubOccasionId,
                })}
                nextDisabled={!selectedSubTab}
                nextLabel="Continue"
            />
        </>
    );
}

// ── Step 2: Questionnaire ─────────────────────────────────
function Step2({ onNext, onBack, subTab }: { onNext: () => void; onBack: () => void; subTab: string }) {
    const [questions, setQuestions] = useState(questionnairesBySubOccasion);
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
        const newQ = { id: Date.now(), question: "New question:", placeholder: "Your answer..." };
        setQuestions(prev => ({ ...prev, [subTab]: [...(prev[subTab] ?? []), newQ] }));
    };
    const handleUpdateQuestion = (id: number, value: string) => {
        setQuestions(prev => ({ ...prev, [subTab]: (prev[subTab] ?? []).map(q => q.id === id ? { ...q, question: value } : q) }));
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
                <h3 className="font-semibold mt-2">Create and manage the questions for invited contributors.</h3>
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
                                <p className="text-[11px] text-[#9CA3AF]">Question only. Answers are not enabled in this step.</p>
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

// ── Step 3: Choose Theme ──────────────────────────────────
function Step3({ onNext, onBack }: { onNext: (themeId: number) => void; onBack: () => void }) {
    const [selected, setSelected] = useState<number | null>(null);
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
        if (templates.length > 0 && !templates.some((t) => t.id === selected)) setSelected(templates[0].id);
    }, [selected, templates]);

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
                        <button key={tpl.id} onClick={() => setSelected(tpl.id)} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}
                            className={`tpl-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
                                <Image src={tpl.image} alt={tpl.name} fill className="group-hover:scale-105 transition-transform duration-300" />
                                {selected === tpl.id && <CheckIcon />}
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
            <BottomNav onBack={onBack} onNext={() => onNext(selected ?? 0)} nextLabel="Choose A Cover" />
        </>
    );
}

// ── Step 4: Choose Cover ──────────────────────────────────
function Step4({ onNext, onBack, initialCoverId }: { onNext: (coverId: number) => void; onBack: () => void; initialCoverId?: number }) {
    const [selected, setSelected] = useState(initialCoverId ?? 1);
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
        if (covers.length > 0 && !covers.some((c) => c.id === selected)) setSelected(covers[0].id);
    }, [covers, selected]);

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
                        <button key={cover.id} onClick={() => setSelected(cover.id)} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}
                            className={`cover-card relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
                                <Image src={cover.image} alt={cover.name} fill className="group-hover:scale-105 transition-transform duration-300" />
                                {selected === cover.id && <CheckIcon />}
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
            <BottomNav onBack={onBack} onNext={() => onNext(selected)} nextLabel="Design Questionnaire" />
        </>
    );
}

// ── Step 5: Review Setup ─────────────────────────
function Step5({ onNext, onBack, coverId, bookDraft }: { onNext: () => void; onBack: () => void; coverId: number; bookDraft: BookDraft | null }) {
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
            <BottomNav onBack={onBack} onNext={onNext} nextLabel="Invite Friends" />
        </>
    );
}

// ── Step 6: Create Account Gate ───────────────────────────
function Step6({ onBack, onContinue, loginHref, onLoginNavigate }: {
    onBack: () => void;
    onContinue: () => void;
    loginHref: string;
    onLoginNavigate: () => void;
}) {
    const { login } = useAuth();
    const registerMutation = useRegisterMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const headingRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current, formRef.current], { opacity: 0, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.45 }).to(formRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            const response = await registerMutation.mutateAsync({ name, email, password });
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
            setError(message);
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
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Jane Doe"
                                className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="jane@example.com"
                                className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="••••••••"
                                className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {error ? <p className="text-[13px] text-red-600">{error}</p> : null}

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
}) {
    const [emailSubject, setEmailSubject] = useState("You're invited to contribute to a memory book! 📖");
    const [emailBody, setEmailBody] = useState(`Hi [Name],\n\nYou've been invited to contribute to a special memory book.\n\nClick the link below to add your message, photos, and memories:\n[Invite Link]\n\nThis won't take long and will mean the world to the recipient.\n\nThank you so much!\n`);
    const [friends, setFriends] = useState<Friend[]>([createFriend()]);
    const [showHelpText, setShowHelpText] = useState(false);

    const headingRef = useRef<HTMLDivElement>(null);
    const emailSectionRef = useRef<HTMLDivElement>(null);
    const friendsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set([headingRef.current, emailSectionRef.current, friendsSectionRef.current], { opacity: 0, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.45 })
            .to(emailSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
            .to(friendsSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25");
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        if (!inviteLink && !isGeneratingInviteLink) {
            void onEnsureInviteLink();
        }
    }, [isAuthenticated, inviteLink, isGeneratingInviteLink, onEnsureInviteLink]);

    // Invite step uses a simple list; ordering moved to Participants panel

    const addFriend = () => setFriends(prev => [...prev, createFriend()]);
    const updateFriend = (id: string, field: "name" | "email", value: string) => setFriends(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
    const removeFriend = (id: string) => setFriends(prev => prev.length <= 1 ? prev : prev.filter(f => f.id !== id));

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
                            <input
                                value={inviteLink || (isGeneratingInviteLink ? "Generating invite link..." : "Invite link will appear here")}
                                readOnly
                                className="w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-[13px] text-[#374151] outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        onLoginRequired();
                                        return;
                                    }

                                    setShowHelpText((current) => !current);
                                }}
                                className="inline-flex items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
                            >
                                {!isAuthenticated ? "Log in" : "Need help?"}
                            </button>
                        </div>
                        {isAuthenticated && showHelpText && (
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
                        <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="e.g., You're invited to contribute to a memory book!"
                            className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email Body (optional)</label>
                        <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} rows={8} placeholder="Write your invitation message here..."
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

                    <div className="flex flex-col gap-1">
                        {friends.map((friend, idx) => (
                            <FriendRow key={friend.id} friend={friend} index={idx} canRemove={friends.length > 1} onUpdate={updateFriend} onRemove={removeFriend} />
                        ))}
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
    const [selectedSubTab, setSelectedSubTab] = useState("Birthday");
    const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
    const [selectedCoverId, setSelectedCoverId] = useState(1);
    const [bookDraft, setBookDraft] = useState<BookDraft | null>(null);
    const [createdInviteLink, setCreatedInviteLink] = useState("");
    const [isGeneratingInviteLink, setIsGeneratingInviteLink] = useState(false);
    const createBookMutation = useCreateBookMutation();

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

    const persistWizardState = () => {
        if (typeof window === "undefined") return;
        window.sessionStorage.setItem(
            CREATE_WIZARD_STORAGE_KEY,
            JSON.stringify({ step, selectedSubTab, selectedCoverId, bookDraft })
        );
    };

    const ensureInviteLink = useCallback(async () => {
        if (isGeneratingInviteLink) return;
        if (!bookDraft) {
            throw new Error("Book details are missing");
        }
        if (!bookDraft.bookTitle?.trim()) {
            throw new Error("Book title is required.");
        }

        if (createdInviteLink) return;

        setIsGeneratingInviteLink(true);
        try {
            const resolvedThemeId = availableThemeIds.includes(selectedThemeId) ? selectedThemeId : availableThemeIds[0] ?? null;
            const resolvedCoverId = availableCoverIds.includes(selectedCoverId) ? selectedCoverId : availableCoverIds[0] ?? null;

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
                occasion_id: bookDraft.occasionId || null,
                sub_occasion_id: bookDraft.subOccasionId || null,
                book_page_style_id: resolvedThemeId,
                cover_page_style_id: resolvedCoverId,
            });

            const inviteLink = result.data?.invite_link || (result as { invite_link?: string }).invite_link || "";

            if (!inviteLink) {
                throw new Error("Invite link missing from create book response.");
            }

            if (result.data?.id !== undefined && result.data?.id !== null) {
                await updateBookUser(result.data.id, {
                    book_title: bookDraft.bookTitle,
                    book_subtitle: bookDraft.bookSubtitle || null,
                    recipient_name: bookDraft.recipientName,
                    occasion_id: bookDraft.occasionId || null,
                    sub_occasion_id: bookDraft.subOccasionId || null,
                    cover_page_style_id: resolvedCoverId,
                    book_page_style_id: resolvedThemeId,
                });
            }

            setCreatedInviteLink(inviteLink);
            return inviteLink;
        } finally {
            setIsGeneratingInviteLink(false);
        }
    }, [
        availableCoverIds,
        availableThemeIds,
        bookDraft,
        createdInviteLink,
        createBookMutation,
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
            const parsed = JSON.parse(rawState) as { step?: number; selectedSubTab?: string; selectedCoverId?: number; bookDraft?: BookDraft | null };
            if (parsed.selectedSubTab) setSelectedSubTab(parsed.selectedSubTab);
            if (typeof parsed.selectedCoverId === "number") setSelectedCoverId(parsed.selectedCoverId);
            if (parsed.bookDraft) setBookDraft(parsed.bookDraft);
            if (typeof parsed.step === "number") setStep(parsed.step === 6 ? 7 : parsed.step);
        } catch {
            window.sessionStorage.removeItem(CREATE_WIZARD_STORAGE_KEY);
        }
    }, [searchParams, urlStep]);

    useEffect(() => {
        if (stepFromQuery) setStep(stepFromQuery);
        else if (urlCoverId) setStep(3);
        if (urlCoverId) setSelectedCoverId(urlCoverId);
    }, [stepFromQuery, urlCoverId]);

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar step={step} />
            {step === 1 && <Step1 onNext={({ subTab, ...draft }) => { setSelectedSubTab(subTab); setBookDraft({ subTab, ...draft }); setStep(2); }} />}
            {step === 2 && <Step3 onNext={(id) => { setSelectedThemeId(id); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <Step4 onNext={(coverId) => { setSelectedCoverId(coverId); setStep(4); }} onBack={() => setStep(2)} initialCoverId={urlCoverId} />}
            {step === 4 && <Step2 onNext={() => setStep(5)} onBack={() => setStep(3)} subTab={selectedSubTab} />}
            {step === 5 && <Step5 onNext={() => setStep(isAuthenticated ? 7 : 6)} onBack={() => setStep(4)} coverId={selectedCoverId} bookDraft={bookDraft} />}
            {step === 6 && (
                <Step6
                    onBack={() => setStep(5)}
                    onContinue={() => setStep(7)}
                    loginHref={loginRedirectHref}
                    onLoginNavigate={persistWizardState}
                />
            )}
            {step === 7 && (
                <Step7
                    onBack={() => setStep(6)}
                    isAuthenticated={isAuthenticated}
                    inviteLink={createdInviteLink}
                    isGeneratingInviteLink={isGeneratingInviteLink}
                    onEnsureInviteLink={async () => { await ensureInviteLink(); }}
                    onLoginRequired={() => {
                        persistWizardState();
                        router.push(loginRedirectHref);
                    }}
                    onDone={async () => {
                        if (isLoading) { toast.info("Checking login status..."); return; }
                        if (!isAuthenticated) { return; }
                        try {
                            await ensureInviteLink();
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
                {index === 0 && <label className="text-[12px] font-semibold text-[#374151] block mb-1">Name</label>}
                <input value={friend.name} onChange={e => onUpdate(friend.id, "name", e.target.value)} placeholder="Friend's name"
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