// import Link from "next/link";

// const supportSections = [
//   {
//     title: "1. How We Can Help",
//     points: [
//       "Account assistance for login, password reset, and profile access.",
//       "Guidance for creating books, inviting participants, and managing pages.",
//       "Support for checkout, printing options, and delivery tracking.",
//     ],
//   },
//   {
//     title: "2. Contact Channels",
//     points: [
//       "Email support: support@meinherzgeschenk.de",
//       "Response time: usually within 24-48 hours on business days.",
//       "Please include your project name or order number for faster help.",
//     ],
//   },
//   {
//     title: "3. Common Issues",
//     points: [
//       "Invitation link not working or not received by participants.",
//       "Image upload errors or formatting/layout questions.",
//       "Payment, order confirmation, or shipping update concerns.",
//     ],
//   },
//   {
//     title: "4. Order and Delivery Support",
//     points: [
//       "We can help with print quality questions and delivery timelines.",
//       "If your order arrives damaged or incorrect, contact us with photos.",
//       "Our team will guide you through replacement or resolution steps.",
//     ],
//   },
//   {
//     title: "5. Account and Data Requests",
//     points: [
//       "Request updates to your account details when needed.",
//       "Ask for help regarding privacy-related support requests.",
//       "We handle all requests in line with applicable data protection rules.",
//     ],
//   },
//   {
//     title: "6. Tips Before Contacting Us",
//     points: [
//       "Share clear screenshots and a short description of the issue.",
//       "Mention device, browser, and steps already tried.",
//       "Include order ID or project link to speed up troubleshooting.",
//     ],
//   },
// ];

// export default function SupportSection() {
//   return (
//     <section className="min-h-screen bg-[#EEE] px-4 py-10 sm:px-6 sm:py-14">
//       <div className="mx-auto w-full max-w-5xl">
//         <div className="mb-10 text-center sm:mb-14">
//           <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#1A1A2E] sm:text-6xl">
//             Customer <span className="text-[#7A1E3A]">Support</span>
//           </h1>

//           <p className="mt-5 text-base text-[#94A3B8] sm:text-[18px] sm:leading-normal">
//             We are here to help you create, order, and deliver your memory book without stress.
//           </p>

//           <div className="mt-6 flex items-start justify-center gap-2 sm:mt-8">
//             <div className="text-left">
//               <p className="text-3xl font-bold text-[#111827] sm:text-[44px] sm:leading-tight">
//                 Fast help, <span className="text-[#7A1E3A]">human support</span>
//               </p>
//               <p className="text-xl font-semibold text-[#94A3B8] sm:text-[18px] text-center">
//                 Every step backed by our team.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
//           <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#7A1E3A]">Help Center</p>
//           <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-[#111827]">Support</h2>
//           <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4B5563]">
//             Find answers, contact options, and practical guidance for your projects and orders.
//           </p>
//           <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">Last updated: April 21, 2026</p>

//           <div className="mt-8 space-y-5 sm:space-y-6">
//             {supportSections.map((section) => (
//               <article key={section.title} className="rounded-2xl border border-[#F1F5F9] bg-[#FCFCFD] p-4 sm:p-6">
//                 <h3 className="text-lg sm:text-xl font-bold text-[#111827]">{section.title}</h3>
//                 <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed text-[#374151]">
//                   {section.points.map((point) => (
//                     <li key={point}>{point}</li>
//                   ))}
//                 </ul>
//               </article>
//             ))}
//           </div>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
//             <p className="text-sm sm:text-base text-[#374151]">Need legal details as well? Visit our imprint page.</p>
//             <Link
//               href="/Imprint"
//               className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
//             >
//               Imprint (Legal Notice)
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: 1,
    question: "How long does it take to receive my photo book?",
    answer: "Standard delivery takes 5–7 business days after your order is confirmed. Express shipping (2–3 business days) is available at checkout. International orders may take 10–14 business days.",
  },
  {
    id: 2,
    question: "Can I edit my book after placing the order?",
    answer: "You can make changes within 1 hour of placing your order. After that, production begins and edits are no longer possible. Please review your book carefully before confirming.",
  },
  {
    id: 3,
    question: "What photo formats are supported?",
    answer: "We support JPG, PNG, and HEIC formats. For best print quality, we recommend images with a resolution of at least 300 DPI. Low-resolution photos will be flagged during the upload process.",
  },
  {
    id: 4,
    question: "Do you offer refunds or reprints?",
    answer: "If your book arrives damaged or with a print defect, we'll reprint it at no cost. Simply contact our support team within 7 days of receiving your order with photos of the issue.",
  },
  {
    id: 5,
    question: "How do I apply a promo code?",
    answer: "Promo codes can be entered at the checkout screen in the 'Discount Code' field. Only one promo code can be applied per order. Codes are case-insensitive.",
  },
  {
    id: 6,
    question: "Is my payment information secure?",
    answer: "Yes. All payments are processed through Stripe, a PCI-DSS Level 1 certified provider. We never store your card details on our servers.",
  },
];

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
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

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
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
            {faqs.map((faq, i) => <FaqItem key={faq.id} faq={faq} index={i} />)}
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
                  <p className="text-[13px] text-[#78716C] max-w-xs leading-[1.7]">
                    Thanks for reaching out. We&apos;ll get back to you within 2 business hours.
                  </p>
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