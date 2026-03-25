"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#EEE] border-t border-[#e0e0e0]">
            <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 bg-[#B91C1C] rounded-md flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                        </div>
                        <span className="text-[13px] font-semibold text-[#1a1a2e]">MemoryBook</span>
                    </div>
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-5">
                    {["Privacy", "Terms", "Support"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-[12px] text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Made with love */}
                <p className="text-[12px] text-[#6b7280] shrink-0">
                    Made with{" "}
                    <span className="text-[#B91C1C]">♥</span>
                    {" "}by MemoryBook
                </p>

            </div>
        </footer>
    );
}