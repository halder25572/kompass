"use client";

import { Copy, Plus, Trash2, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const participants = [
  { id: "sarah-m",   name: "Sarah M.",   initials: "SM", status: "Submitted" },
  { id: "james-k",   name: "James K.",   initials: "JK", status: "Submitted" },
  { id: "emily-r",   name: "Emily R.",   initials: "ER", status: "Pending"   },
  { id: "michael-b", name: "Michael B.", initials: "MB", status: "Pending"   },
  { id: "lisa-t",    name: "Lisa T.",    initials: "LT", status: "Invited"   },
  { id: "david-w",   name: "David W.",   initials: "DW", status: "Invited"   },
];

const statusStyle = {
  Submitted: "bg-green-500 text-white",
  Pending:   "bg-purple-500 text-white",
  Invited:   "bg-gray-200 text-gray-600",
};

export default function ProgressBar({ bookId }: { bookId: string }) {
  /* ── Refs ── */
  const headerRef      = useRef<HTMLDivElement>(null);
  const progressRef    = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const participantRef = useRef<HTMLDivElement>(null);
  const settingsRef    = useRef<HTMLDivElement>(null);
  const inviteRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    /* initial states */
    gsap.set(headerRef.current?.children ?? [],      { opacity: 0, y: 18 });
    gsap.set(progressRef.current,                    { opacity: 0, y: 24 });
    gsap.set(participantRef.current,                 { opacity: 0, y: 24 });
    gsap.set(settingsRef.current,                    { opacity: 0, x: 20 });
    gsap.set(inviteRef.current,                      { opacity: 0, x: 20 });
    gsap.set(progressBarRef.current,                 { scaleX: 0, transformOrigin: "left center" });
    gsap.set(statsRef.current?.children ?? [],       { opacity: 0, y: 12 });

    /* entrance timeline */
    tl.to(headerRef.current?.children ?? [],   { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 })
      .to(progressRef.current,                 { opacity: 1, y: 0, duration: 0.5 },            "-=0.2")
      .to(progressBarRef.current,              { scaleX: 1,  duration: 0.9, ease: "power2.out" }, "-=0.1")
      .to(statsRef.current?.children ?? [],    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.4")
      .to(participantRef.current,              { opacity: 1, y: 0, duration: 0.5 },            "-=0.2")
      .to(settingsRef.current,                 { opacity: 1, x: 0, duration: 0.5 },            "-=0.45")
      .to(inviteRef.current,                   { opacity: 1, x: 0, duration: 0.5 },            "-=0.3");

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
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>
        </Link>

        <div className="flex gap-3">
          <button
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
              <Stat number="2" label="Pending"   />
              <Stat number="1" label="Invited"   />
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
                href="/dashboard/editor-book"
                onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                className="text-[14px] cursor-pointer px-3 py-1 rounded-md bg-linear-to-r from-[#BF003A] to-[#59001C] text-white"
              >
                Edit
              </Link>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Recipient Name" value="Jack"         />
              <Row label="Occasion"       value="Birthday"     />
              <Row label="Deadline"       value="Mar 20, 2026" />
              <Row label="Contributors"   value="15"           />
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

            {/* EMAIL INPUTS */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <input className="flex-1 p-2 text-xs outline-none" placeholder="email@example.com" />
                <button
                  onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                  className="p-2 text-white bg-linear-to-r from-[#BF003A] to-[#59001C]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <input className="flex-1 p-2 text-xs outline-none" placeholder="email@example.com" />
                <button
                  onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                  className="p-2 text-white bg-linear-to-r from-[#BF003A] to-[#59001C]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <button
              onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
              className="w-full cursor-pointer bg-linear-to-r from-[#BF003A] to-[#59001C] text-white py-2 rounded-lg text-sm"
            >
              Send Invites
            </button>
          </div>

        </div>
      </div>
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