"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useFaqsQuery } from "@/features/faq/hooks/services";
import { submitContactMessage } from "@/services/api";
import { toast } from "sonner";

// ─── DATA ──────────────────────────────────────────────────────────────────────
type FaqSectionItem = {
  id: number;
  question: string;
  answer: string;
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq, index }: { faq: FaqSectionItem; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power3.in" });
    }
  }, [open]);

  return (
    <div
      className={`faq-item border-b border-[#E8E0D5] last:border-none transition-colors duration-200 ${open ? "bg-[#FDF8F4]" : "bg-transparent"}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer bg-transparent border-none group"
      >
        <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#C0003C]" : "text-[#1C1917]"}`}>
          {faq.question}
        </span>
        <span
          className={`ml-4 shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-[#C0003C] rotate-45"
              : "bg-[#F0EBE4] group-hover:bg-[#E8D9CF]"
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke={open ? "#fff" : "#78716C"} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="px-6 pb-5 text-[13.5px] text-[#78716C] leading-[1.75]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SupportPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const faqRef     = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useFaqsQuery();

  const faqs = useMemo<FaqSectionItem[]>(() => {
    if (!data?.data) return [];
    return data.data
      .filter((item) => item.status === 1)
      .map((item) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
      }));
  }, [data]);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Thanks for reaching out. We'll get back to you within 2 business hours.");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // hero entrance
  useEffect(() => {
    const els = Array.from(heroRef.current?.children ?? []);
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.1 });
  }, []);

  // scroll-triggered sections
  useEffect(() => {
    const sections = [faqRef.current, formRef.current].filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        gsap.fromTo(e.target, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
        io.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    sections.forEach(s => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setSubmitError("Please fill in name, email, and message.");
      return;
    }

    setSubmitError(null);
    setLoading(true);

    try {
      const result = await submitContactMessage({
        name: form.name,
        email: form.email,
        subject: form.subject || undefined,
        message: form.message,
      });

      setSubmitMessage(result.message || "Thank you! We will get back to you soon.");
      toast.success(result.message || "Thank you! We will get back to you soon.", {
        duration: 5000,
      });
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F4] font-['Georgia',serif]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1C1917] px-6 pt-20 pb-24 text-center">
        {/* decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C0003C]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#C0003C]/8 blur-2xl pointer-events-none" />

        <div ref={heroRef} className="relative max-w-2xl mx-auto">
          {/* pill */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0003C] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-white/60 uppercase">Support Center</span>
          </div>

          <h1 className="text-[clamp(36px,6vw,62px)] font-bold text-white leading-[1.08] tracking-[-1px] mb-5">
            How can we{" "}
            <em className="not-italic text-[#C0003C]">help</em>
            {" "}you?
          </h1>

          <p className="text-[15px] text-white/50 leading-[1.7] max-w-md mx-auto">
            Browse our frequently asked questions or send us a message — we typically respond within a few hours.
          </p>

          {/* quick stat chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[["⚡", "Avg. 2hr reply"], ["📦", "7-day returns"], ["🔒", "Secure payments"]].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-1.5 bg-white/6 border border-white/10 rounded-full px-4 py-2 text-[12px] text-white/55 font-medium">
                <span>{icon}</span>{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-240 mx-auto px-6 py-20 space-y-20">

        {/* ── FAQ ── */}
        <div ref={faqRef} style={{ opacity: 0 }}>
          {/* section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#C0003C] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#C0003C] uppercase">Common Questions</p>
              <h2 className="text-[22px] font-bold text-[#1C1917] leading-tight">Frequently Asked</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#EDE8E2]">
            {isLoading ? (
              <div className="px-6 py-8 text-[14px] text-[#78716C]">Loading FAQs...</div>
            ) : error ? (
              <div className="px-6 py-8 text-[14px] text-[#B91C1C]">{error.message}</div>
            ) : (
              faqs.map((faq, i) => <FaqItem key={faq.id} faq={faq} index={i} />)
            )}
          </div>
        </div>

        {/* ── CONTACT FORM ── */}
        <div ref={formRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#C0003C] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#C0003C] uppercase">Get In Touch</p>
              <h2 className="text-[22px] font-bold text-[#1C1917] leading-tight">Send a Message</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* info sidebar */}
            <div className="md:col-span-2 bg-white rounded-2xl p-7 text-black flex flex-col justify-between">
              <div>
                <h3 className="text-[17px] font-bold mb-2 text-black">We&apos;re here for you</h3>
                <p className="text-[13px] leading-[1.7] mb-8 text-black">
                  Whether it&apos;s a question about your order, a print issue, or anything else — reach out and we&apos;ll sort it out.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: "✉", label: "Email", value: "support@memorybook.com" },
                    { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am–6pm" },
                    { icon: "⏱", label: "Response", value: "Within 2 business hours" },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase">{item.label}</p>
                        <p className="text-[13px] text-black/70 mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[11px] text-black">Average satisfaction rate</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[96%] bg-linear-to-r from-[#C0003C] to-[#FF4D7D] rounded-full" />
                  </div>
                  <span className="text-[13px] font-bold text-black">96%</span>
                </div>
              </div>
            </div>

            {/* form card */}
            <div className="md:col-span-3 bg-white rounded-2xl p-7 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#EDE8E2]">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-[#FFF0F3] flex items-center justify-center mb-4">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C0003C" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1C1917] mb-2">Message Sent!</h3>
                  <p className="text-[13px] text-[#78716C] max-w-xs leading-[1.7]">{submitMessage}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-[12px] font-bold text-[#C0003C] underline underline-offset-2 bg-transparent border-none cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-[#78716C] uppercase mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#FAF7F4] border border-[#E8E0D5] rounded-xl px-4 py-3 text-[13.5px] text-[#1C1917] placeholder-[#C4B9B0] outline-none focus:border-[#C0003C] focus:ring-2 focus:ring-[#C0003C]/10 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-[#78716C] uppercase mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@email.com"
                        className="w-full bg-[#FAF7F4] border border-[#E8E0D5] rounded-xl px-4 py-3 text-[13.5px] text-[#1C1917] placeholder-[#C4B9B0] outline-none focus:border-[#C0003C] focus:ring-2 focus:ring-[#C0003C]/10 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-[#78716C] uppercase mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#FAF7F4] border border-[#E8E0D5] rounded-xl px-4 py-3 text-[13.5px] text-[#1C1917] outline-none focus:border-[#C0003C] focus:ring-2 focus:ring-[#C0003C]/10 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option>Order & Shipping</option>
                      <option>Print Quality Issue</option>
                      <option>Account & Billing</option>
                      <option>Photo Upload Problem</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-[#78716C] uppercase mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full bg-[#FAF7F4] border border-[#E8E0D5] rounded-xl px-4 py-3 text-[13.5px] text-[#1C1917] placeholder-[#C4B9B0] outline-none focus:border-[#C0003C] focus:ring-2 focus:ring-[#C0003C]/10 transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#C0003C] to-[#7A0025] text-white text-[14px] font-bold py-3.5 rounded-xl border-none cursor-pointer transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Sending...
                      </>
                    ) : "Send Message →"}
                  </button>

                  {submitError && (
                    <p className="text-center text-[12px] text-[#B91C1C]">{submitError}</p>
                  )}

                  <p className="text-center text-[11px] text-[#B0A89E]">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-[#C0003C] underline underline-offset-1">Privacy Policy</a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}