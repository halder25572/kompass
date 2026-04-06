"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    onContinue: (name: string, email: string) => void;
}

export default function IntroStep({ onContinue }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const valid = name.trim().length > 0 && email.includes("@");

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: "radial-gradient(ellipse 90% 80% at 50% 30%, #f5eef0 0%, #ede8ea 45%, #e3dde0 100%)",
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}

        >
            <div className="flex-1 flex items-center justify-center px-5 py-10">
                <div className="w-full max-w-105 flex flex-col items-center gap-6">

                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>

                    {/* Headline */}
                    <div className="text-center">
                        <p className="text-[15px] sm:text-[16px] font-bold text-[#1A1A2E] leading-snug">
                            Enter your name and email to start<br />
                            your contribution for{" "}
                            <span className="uppercase">RECIPIENT NAME.</span>
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full flex flex-col gap-4">
                        <div>
                            <label className="block text-[13px] font-medium text-[#1A1A2E] mb-1.5">Full Name</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 outline-none bg-white placeholder-gray-300 focus:border-[#BF003A] focus:ring-2 focus:ring-[#BF003A]/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-[#1A1A2E] mb-1.5">Email</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="friend@email.com"
                                type="email"
                                autoComplete="email"
                                autoCapitalize="none"
                                spellCheck={false}
                                suppressHydrationWarning
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 outline-none bg-white placeholder-gray-300 focus:border-[#BF003A] focus:ring-2 focus:ring-[#BF003A]/10 transition-all"
                            />
                        </div>

                        <p className="text-[12px] text-gray-400 -mt-1">
                            Enter your name and email to start your page.
                        </p>

                        <button
                            onClick={() => valid && onContinue(name, email)}
                            disabled={!valid}
                            className={`w-full py-3.5 rounded-xl bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[14px] font-bold transition-all ${valid ? "opacity-100 hover:opacity-90 active:scale-[0.98] cursor-pointer" : "opacity-60 cursor-not-allowed"
                                }`}
                            style={{ background: "linear-gradient(102deg,#BF003A_0%,#59001C_100%)" }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}