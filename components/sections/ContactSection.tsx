"use client";

import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:your@email.com?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section className="w-full py-16 px-4 bg-white" id="contact">
            <div className="max-w-xl mx-auto">

                <div className="mb-8 text-center">
                    <h2 className="text-[28px] font-bold text-[#1a1a2e]">Contact Us</h2>
                    <p className="text-[14px] text-[#9CA3AF] mt-1">Send us a message and we&apos;ll get back to you.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Name</label>
                        <input
                            name="name" value={form.name} onChange={handleChange} required
                            placeholder="Your name"
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Email</label>
                        <input
                            name="email" type="email" value={form.email} onChange={handleChange} required
                            placeholder="your@email.com"
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Message</label>
                        <textarea
                            name="message" value={form.message} onChange={handleChange} required
                            rows={5} placeholder="Write your message..."
                            className="w-full border border-[#e5e7eb] bg-[#fafafa] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        Send Message
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    );
}