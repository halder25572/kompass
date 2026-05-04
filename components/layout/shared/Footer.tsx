"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
                        A thoughtful place to preserve memories, create beautiful books, and share the moments that matter most.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-end gap-4 w-full md:w-auto">

                    {/* Top Links */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-gray-800">Privacy Policy</Link>
                        <Link href="/terms-conditions" className="hover:text-gray-800">Terms & Conditions</Link>
                        <Link href="/support" className="hover:text-gray-800">Support</Link>
                    </div>
                    {/* Button */}
                    <Link href="/Imprint" className="w-full md:w-auto">
                        <button className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] cursor-pointer text-white text-sm px-5 py-2 rounded-full shadow-sm hover:opacity-90">
                            Imprint (Legal Notice)
                        </button>
                    </Link>
                </div>
            </div>
        </footer>
    );
}