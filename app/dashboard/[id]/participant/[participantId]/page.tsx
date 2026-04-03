"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const participantDisplayNames: Record<string, string> = {
  "sarah-m": "Sarah M",
  "james-k": "James K",
  "emily-r": "Emily R",
  "michael-b": "Michael B",
  "lisa-t": "Lisa T",
  "david-w": "David W",
};

const questions = [
  { label: "My life motto:", placeholder: "Words you live by...", checked: false },
  { label: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor...", checked: false },
  { label: "I get grumpy about:", placeholder: "What grinds your gears?", checked: false },
  { label: "The best invention ever:", placeholder: "Coffee? The internet?", checked: false },
  { label: "My ultimate dream:", placeholder: "Your biggest dream...", checked: false },
  { label: "My fondest childhood memory:", placeholder: "Share a cherished memory...", checked: true },
];

export default function ParticipantPage() {
  const params = useParams<{ id: string; participantId: string }>();
  const participantId = params?.participantId;
  const participantName = participantDisplayNames[participantId] ?? participantId?.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#f7f7fb] px-4 py-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" width={28} height={28} alt="logo" />
              <span className="font-semibold text-lg">Mein HerzGeschenk</span>
            </div>
          </Link>
        </div>

        <div className="mb-4 mt-15">
          <div className="flex items-center gap-2 text-[#b91c1c] mb-1">
            <span className="text-sm">▭</span>
            <h1 className="text-lg font-semibold text-[#111827]">Contributed by {participantName}</h1>
          </div>
          <p className="text-xs text-[#a1a1b2]">contribution for Mom&apos;s 60th Birthday</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#eceaf0]">
            <div className="space-y-3">
              {questions.map((question) => (
                <div key={question.label} className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] font-semibold text-[#111827]">{question.label}</label>
                    <div className="flex items-center gap-2 text-[#b8b8c4]">
                      {question.checked ? (
                        <span className="text-[11px] text-green-600">✓</span>
                      ) : (
                        <span className="text-[11px]">✎</span>
                      )}
                      <span className="text-[11px]">▢</span>
                    </div>
                  </div>
                  <input
                    readOnly
                    value={question.placeholder}
                    className="w-full rounded-lg border border-[#e8e8ef] bg-white px-3 py-2 text-xs text-[#b3b3c0] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#eceaf0]">
            <h2 className="text-sm font-semibold text-[#111827] mb-3">Added photos</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="h-28 rounded-xl bg-[#f0f1f8] flex items-center justify-center text-[#9aa0b4] text-xl">◻</div>
              <div className="h-28 rounded-xl bg-[#f0f1f8] flex items-center justify-center text-[#9aa0b4] text-xl">◻</div>
            </div>
            <button className="w-full cursor-pointer rounded-lg bg-linear-to-r from-[#BF003A] to-[#59001C] py-2.5 text-sm font-semibold text-white">
              Download All Photos
            </button>
          </div>
        </div>

        {/* <div className="mt-6 text-xs text-[#a1a1b2]">
          Book ID: {bookId} | Participant ID: {participantId}
        </div> */}
      </div>
    </div>
  );
}
