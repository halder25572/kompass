"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StatusPageMain() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  /* ── Refs ── */
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const headerEls = Array.from(headerRef.current?.children ?? []);
    const statEls = Array.from(statsRef.current?.children ?? []);
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".contributor-row");

    /* initial states */
    gsap.set(headerEls, { opacity: 0, y: 18 });
    gsap.set(progressRef.current, { opacity: 0, y: 24 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(statEls, { opacity: 0, y: 12 });
    gsap.set(listRef.current, { opacity: 0, y: 24 });
    gsap.set(summaryRef.current, { opacity: 0, x: 20 });
    gsap.set(actionRef.current, { opacity: 0, x: 20 });
    if (rows) gsap.set(rows, { opacity: 0, x: -14 });

    /* entrance sequence */
    tl.to(headerEls, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 })
      .to(progressRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(progressBarRef.current, { scaleX: 1, duration: 0.85, ease: "power2.out" }, "-=0.15")
      .to(statEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.4")
      .to(listRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(summaryRef.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
      .to(actionRef.current, { opacity: 1, x: 0, duration: 0.45 }, "-=0.3");

    if (rows) {
      tl.to(rows, { opacity: 1, x: 0, duration: 0.38, stagger: 0.07, ease: "power2.out" }, "-=0.35");
    }
  }, []);

  /* ── Hover ── */
  const onBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.18, ease: "power2.out" });
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.18, ease: "power2.inOut" });
  };

  const onRowEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 4, duration: 0.18, ease: "power2.out" });
  };
  const onRowLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.18, ease: "power2.inOut" });
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-4 md:p-8">

      {/* HEADER */}
      <div ref={headerRef} className="mb-6">
        <h1 className="text-lg font-semibold gradient-text">Book Status</h1>
        <p className="text-xs text-gray-400">
          Tracking contributions for Book ID: {bookId}
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PROGRESS CARD */}
          <div ref={progressRef} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Completion</span>
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

          {/* CONTRIBUTORS LIST */}
          <div ref={listRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Contributors Status</h2>

            <div className="space-y-3">
              {mockUsers.map((user, i) => (
                <div
                  key={i}
                  onMouseEnter={onRowEnter}
                  onMouseLeave={onRowLeave}
                  className="contributor-row flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                      {user.initials}
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[user.status]}`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* SUMMARY */}
          <div ref={summaryRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Summary</h2>
            <div className="space-y-3 text-sm">
              <Row label="Total Contributors" value="15" />
              <Row label="Submitted" value="6" />
              <Row label="Pending" value="2" />
              <Row label="Invited" value="1" />
              <Row label="Deadline" value="Mar 20, 2026" />
            </div>
          </div>

          {/* ACTION */}
          <div ref={actionRef} className="bg-white rounded-xl p-5 shadow-sm">
            <button
              onMouseEnter={onBtnEnter}
              onMouseLeave={onBtnLeave}
              className="w-full bg-linear-to-r from-[#BF003A] to-[#59001C] text-white py-2 rounded-lg text-sm cursor-pointer"
            >
              Send Reminder Emails
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Mock data ── */
const mockUsers = [
  { name: "Sarah M.", initials: "SM", status: "Submitted" },
  { name: "James K.", initials: "JK", status: "Submitted" },
  { name: "Emily R.", initials: "ER", status: "Pending" },
  { name: "Michael B.", initials: "MB", status: "Pending" },
  { name: "Lisa T.", initials: "LT", status: "Invited" },
];

const statusStyle: Record<string, string> = {
  Submitted: "bg-green-500 text-white",
  Pending: "bg-purple-500 text-white",
  Invited: "bg-gray-200 text-gray-600",
};

/* ── Components ── */
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