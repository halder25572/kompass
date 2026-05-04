/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { submitContactMessage } from "@/services/api";
import { toast } from "sonner";

export default function ContactSection() {
    const { language } = useLanguage();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isHydrated, setIsHydrated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await submitContactMessage({
                name: form.name,
                email: form.email,
                message: form.message,
            });

            toast.success(response.message);
            setForm({ name: "", email: "", message: "" });
        } catch {
            // Silent fail - just stop loading
        } finally {
            setIsLoading(false);
        }
    };

    const text = language === "de"
        ? {
            title: "Wir helfen dir gerne",
            subtitle1: "Bei allen Fragen sende uns bitte eine Nachricht und wir melden uns bei dir",
            subtitle2: "Wir antworten in der Regel innerhalb von 24 Stunden",
            name: "Name",
            namePlaceholder: "Dein Name",
            email: "E-Mail",
            emailPlaceholder: "deine@email.de",
            message: "Nachricht",
            messagePlaceholder: "Schreibe deine Nachricht...",
            submit: "Nachricht senden",
        }
        : {
            title: "We're here to help",
            subtitle1: "for all questions, please send us a message and we'll get back to you",
            subtitle2: "We usually respond within 24 hours",
            name: "Name",
            namePlaceholder: "Your name",
            email: "Email",
            emailPlaceholder: "your@email.com",
            message: "Message",
            messagePlaceholder: "Write your message...",
            submit: "Send Message",
        };

    return (
        <section className="w-full py-16 px-4 bg-white" id="contact">
            <div className="max-w-xl mx-auto">

                <div className="mb-8 text-center">
                    {/* <h2 className="text-[28px] font-bold text-[#1a1a2e]">We usually respond within 24 hours.</h2> */}
                    <h2 className="text-[28px] font-bold text-[#1a1a2e]">{text.title}</h2>
                    <p className="text-[14px] text-[#9CA3AF] mt-1">{text.subtitle1}</p>
                    <p className="text-[14px] text-[#9CA3AF] mt-1">{text.subtitle2}</p>
                </div>

                {isHydrated && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">{text.name}</label>
                        <input
                            name="name" value={form.name} onChange={handleChange} required
                            placeholder={text.namePlaceholder}
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">{text.email}</label>
                        <input
                            name="email" type="email" value={form.email} onChange={handleChange} required
                            placeholder={text.emailPlaceholder}
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">{text.message}</label>
                        <textarea
                            name="message" value={form.message} onChange={handleChange} required
                            rows={5} placeholder={text.messagePlaceholder}
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : text.submit}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>
                )}
            </div>
        </section>
    );
}