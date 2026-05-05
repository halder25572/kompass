"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
    const { language } = useLanguage();
    const text = language === "de"
        ? {
            description: "Ein besonderer Ort, um Erinnerungen zu bewahren, wunderschoene Buecher zu gestalten und die wichtigsten Momente zu teilen.",
            privacy: "Datenschutz",
            terms: "AGB",
            support: "Support",
            imprint: "Impressum (Rechtlicher Hinweis)",
        }
        : {
            description: "A thoughtful place to preserve memories, create beautiful books, and share the moments that matter most.",
            privacy: "Privacy Policy",
            terms: "Terms & Conditions",
            support: "Support",
            imprint: "Imprint (Legal Notice)",
        };

    return (
        <footer className="bg-[#EEE]">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start gap-6">

                {/* Left Section */}
                <div className="max-w-sm">
                    <Link href="/">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                            <span className="text-sm font-semibold text-[#1A1A2E]">
                                Mein HerzGeschenk
                            </span>
                        </div>
                    </Link>

                    <p className="text-xs text-gray-500 leading-relaxed">
                        {text.description}
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-end gap-4 w-full md:w-auto">

                    {/* Top Links */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-gray-800">{text.privacy}</Link>
                        <Link href="/terms-conditions" className="hover:text-gray-800">{text.terms}</Link>
                        <Link href="/support" className="hover:text-gray-800">{text.support}</Link>
                    </div>
                    {/* Button */}
                    <Link href="/Imprint" className="w-full md:w-auto">
                        <button className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] cursor-pointer text-white text-sm px-5 py-2 rounded-full shadow-sm hover:opacity-90">
                            {text.imprint}
                        </button>
                    </Link>
                </div>
            </div>
        </footer>
    );
}