"use client";

import { Plus, ChevronRight, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSendBookInviteMutation } from "@/features/books/hooks/services";
import { toast } from "sonner";


const participants = [
  { id: "sarah-m", name: "Sarah M.", initials: "SM", status: "Submitted" },
  { id: "james-k", name: "James K.", initials: "JK", status: "Submitted" },
  { id: "emily-r", name: "Emily R.", initials: "ER", status: "Pending" },
  { id: "michael-b", name: "Michael B.", initials: "MB", status: "Pending" },
  { id: "lisa-t", name: "Lisa T.", initials: "LT", status: "Invited" },
  { id: "david-w", name: "David W.", initials: "DW", status: "Invited" },
];

const statusStyle = {
  Submitted: "bg-green-500 text-white",
  Pending: "bg-purple-500 text-white",
  Invited: "bg-gray-200 text-gray-600",
};

const previewPages = [
  {
    title: "Cover",
    text: "A warm, premium cover that sets the tone for the whole book.",
    bg: "bg-[#f7f1ee]",
  },
  {
    title: "Messages",
    text: "Collected notes from contributors laid out in a clean, readable spread.",
    bg: "bg-[#faf7f8]",
  },
  {
    title: "Photos",
    text: "Large imagery and generous spacing keep the pages feeling luxurious.",
    bg: "bg-[#f6f4f0]",
  },
];

function PreviewModal({ onClose, bookId }: { onClose: () => void; bookId?: string }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 22, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.16 });
    gsap.to(cardRef.current, { opacity: 0, y: 16, scale: 0.98, duration: 0.16, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center px-4 py-6" onClick={handleClose}>
      <div
        ref={cardRef}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_28px_80px_rgba(0,0,0,0.24)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#f1e7ea] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BF003A]">Book Preview</p>
            <h2 className="mt-1 text-[20px] font-extrabold text-[#1a1a2e]">Jack&apos;s Birthday Book</h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
            aria-label="Close preview"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-[#f1e7ea] lg:border-b-0 lg:border-r lg:border-[#f1e7ea] bg-[#fcfaf8] p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-[#eadfd8] aspect-3/4 shadow-sm">
                <Image src="/images/c1.jpg" alt="Book cover preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/28 p-3 text-white backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Front cover</p>
                  <p className="mt-1 text-[15px] font-bold leading-tight">Emma&apos;s 30th Birthday</p>
                </div>
              </div>

              <div className="space-y-4">
                {previewPages.map((page) => (
                  <div key={page.title} className={`rounded-2xl border border-white bg-white p-4 shadow-[0_10px_22px_rgba(26,26,46,0.06)] ${page.bg}`}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#BF003A]">{page.title}</p>
                    <p className="mt-2 text-[13px] leading-6 text-[#6b7280]">{page.text}</p>
                    <div className="mt-3 h-16 rounded-xl border border-dashed border-[#e5e7eb] bg-white/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 lg:p-7">
            <div className="rounded-3xl border border-[#f0edf1] bg-white p-5 shadow-[0_8px_24px_rgba(26,26,46,0.05)]">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">Preview summary</h3>
              <p className="mt-2 text-[13px] leading-7 text-[#6b7280]">
                This preview shows the overall look and feel of the book before you confirm the order.
              </p>

              <div className="mt-5 space-y-3 text-[14px]">
                <Row label="Recipient Name" value="Jack" />
                <Row label="Occasion" value="Birthday" />
                <Row label="Contributors" value="15" />
                <Row label="Progress" value="80% complete" />
              </div>

              <div className="mt-5 rounded-2xl bg-[#faf7f8] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">What you can review here</p>
                <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[#4b5563]">
                  <li>• Cover style and first impression</li>
                  <li>• Page layout and content spacing</li>
                  <li>• Overall book tone before ordering</li>
                </ul>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClose}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[#e5e7eb] px-5 py-3 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
                >
                  Close
                </button>
                <Link
                  href={bookId ? `/dashboard/${bookId}/editor-book` : "/dashboard"}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-5 py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  Review in Editor
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgressBar({ bookId }: { bookId: string }) {
  /* ── Refs ── */
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const participantRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    /* initial states */
    gsap.set(headerRef.current?.children ?? [], { opacity: 0, y: 18 });
    gsap.set(progressRef.current, { opacity: 0, y: 24 });
    gsap.set(participantRef.current, { opacity: 0, y: 24 });
    gsap.set(settingsRef.current, { opacity: 0, x: 20 });
    gsap.set(inviteRef.current, { opacity: 0, x: 20 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(statsRef.current?.children ?? [], { opacity: 0, y: 12 });

    /* entrance timeline */
    tl.to(headerRef.current?.children ?? [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 })
      .to(progressRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(progressBarRef.current, { scaleX: 1, duration: 0.9, ease: "power2.out" }, "-=0.1")
      .to(statsRef.current?.children ?? [], { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.4")
      .to(participantRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(settingsRef.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.45")
      .to(inviteRef.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3");

    /* participant rows stagger */
    const rows = participantRef.current?.querySelectorAll<HTMLElement>(".participant-row");
    if (rows) {
      gsap.set(rows, { opacity: 0, x: -16 });
      tl.to(rows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }, "-=0.35");
    }
  }, []);

  /* ── Hover helpers ── */
  const onParticipantEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 4, duration: 0.2, ease: "power2.out" });
  };
  const onParticipantLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.2, ease: "power2.inOut" });
  };

  const onBtnEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.18, ease: "power2.out" });
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.18, ease: "power2.inOut" });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4 md:p-8">

      {/* HEADER */}
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>
        </Link>

        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
            className="px-4 cursor-pointer py-2 text-sm border rounded-lg bg-white"
          >
            Preview
          </button>
          <button
            onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
            className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-[#8B0A2A] text-white"
          >
            Confirm Order
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PROGRESS CARD */}
          <div ref={progressRef} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Book Progress</span>
              <span className="font-semibold gradient-text">80%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div
                ref={progressBarRef}
                className="w-[80%] h-2 bg-linear-to-r from-[#BF003A] to-[#59001C] rounded-full"
              />
            </div>

            <div ref={statsRef} className="grid grid-cols-3 text-center">
              <Stat number="6" label="Submitted" />
              <Stat number="2" label="Pending" />
              <Stat number="1" label="Invited" />
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div ref={participantRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Participants</h2>

            <div className="space-y-3">
              {participants.map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/${bookId}/participant/${p.id}`}
                  onMouseEnter={onParticipantEnter}
                  onMouseLeave={onParticipantLeave}
                  className="participant-row flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                      {p.initials}
                    </div>
                    <span className="text-sm">{p.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[p.status as keyof typeof statusStyle]}`}>
                      {p.status}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* BOOK SETTINGS */}
          <div ref={settingsRef} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium">Book Settings</h2>
              <Link
                href={bookId ? `/dashboard/${bookId}/editor-book` : "/dashboard"}
                onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                className="text-[14px] cursor-pointer px-3 py-1 rounded-md bg-linear-to-r from-[#BF003A] to-[#59001C] text-white"
              >
                Edit
              </Link>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Recipient Name" value="Jack" />
              <Row label="Occasion" value="Birthday" />
              <Row label="Deadline" value="Mar 20, 2026" />
              <Row label="Contributors" value="15" />
            </div>
          </div>

          {/* INVITE */}
          <div ref={inviteRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Invite Contributors</h2>

            {/* SHARE LINK */}
            <div className="flex items-center border rounded-lg overflow-hidden mb-3">
              <input
                className="flex-1 p-2 text-xs outline-none"
                value="https://preview-keepsake..."
                readOnly
              />
              <button
                onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                className="p-2 bg-linear-to-r from-[#BF003A] to-[#59001C] text-white"
              >
                <Copy size={14} />
              </button>
            </div>

            <InviteContributors bookId={bookId} />
          </div>
        </div>
      </div>

      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} bookId={bookId} />}
    </div>
  );
}

/* ── Small components ── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-semibold">{number}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function InviteContributors({ bookId }: { bookId: string }) {
  const [email, setEmail] = useState("");
  const inviteMutation = useSendBookInviteMutation(bookId);

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    try {
      const response = await inviteMutation.mutateAsync(email);
      toast.success(response.message || "Invitation sent successfully");
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send invitation";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center border rounded-lg overflow-hidden">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-2 text-xs outline-none"
          placeholder="email@example.com"
        />
        <button
          onClick={() => void handleSend()}
          disabled={inviteMutation.isPending}
          className="p-2 text-white bg-linear-to-r from-[#BF003A] to-[#59001C]"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        onClick={() => void handleSend()}
        disabled={inviteMutation.isPending || !email.trim()}
        className="w-full cursor-pointer bg-linear-to-r from-[#BF003A] to-[#59001C] text-white py-2 rounded-lg text-sm disabled:opacity-60"
      >
        {inviteMutation.isPending ? "Sending..." : "Send Invites"}
      </button>
    </div>
  );
}