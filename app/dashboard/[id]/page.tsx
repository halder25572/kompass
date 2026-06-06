/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBookDetailsQuery } from "@/features/books/hooks/services";
import { useUpdateBookMutation } from "@/features/books/hooks/services";
import { useSendBookInviteMutation } from "@/features/books/hooks/services";
import { toast } from "sonner";
import { getCleanInviteLink } from "@/lib/utils";
// DnD moved to Participants panel component (Progress.tsx)

// ── Types ─────────────────────────────────────────────────
// Contributor type removed; participant UI lives in components/dashboard/Progress

type Props = {
  params: {
    id: string;
  };
};

// Participant UI and DnD now live in components/dashboard/Progress.tsx

// ── Main Page ─────────────────────────────────────────────
export default function DashboardPage({ params }: Props) {
  const bookId = params.id;
  const { data, isLoading, isError, error } = useBookDetailsQuery(bookId);
  const book = data?.data.book_details;
  const statistics = data?.data.statistics;

  // Participant ordering now handled in the Progress component

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-[#BF003A]">
            <span className="text-lg leading-none">←</span>
            Back to dashboard
          </Link>
          <span className="rounded-full border border-[#f3d4db] bg-white px-3 py-1 text-xs font-semibold text-[#BF003A]">
            Book ID {bookId}
          </span>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-dashed border-[#e5e7eb] bg-white p-10 text-center text-sm text-[#9CA3AF]">
            Loading book details...
          </div>
        )}

        {isError && !isLoading && (
          <div className="rounded-3xl border border-red-200 bg-white p-10 text-center text-sm text-red-600">
            {error?.message || "Failed to load book details."}
          </div>
        )}

        {!isLoading && !isError && book && (
          <>
            <BookEditSection
              key={`${book.id}-${book.book_title}-${book.book_subtitle}-${book.recipient_name}-${book.occasion}-${book.sub_occasion}`}
              bookId={bookId}
              book={book}
            />

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total invited" value={statistics?.total_invited ?? 0} />
              <StatCard label="Submitted" value={statistics?.submitted ?? 0} />
              <StatCard label="Pending" value={statistics?.pending ?? 0} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Questions */}
              <section className="rounded-3xl border border-[#f0edf1] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#1a1a2e]">Questions</h2>
                <p className="mt-1 text-sm text-[#9CA3AF]">
                  The current questionnaire loaded from the GET detail endpoint.
                </p>
                <div className="mt-4 space-y-3">
                  {book.questions.length ? (
                    book.questions.map((question, index) => (
                      <div
                        key={`${question}-${index}`}
                        className="rounded-2xl border border-[#ece7ea] bg-[#fafafa] px-4 py-3 text-sm text-[#374151]"
                      >
                        <span className="mr-2 font-semibold text-[#BF003A]">{index + 1}.</span>
                        {question}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[#e5e7eb] px-4 py-8 text-center text-sm text-[#9CA3AF]">
                      No questions available.
                    </div>
                  )}
                </div>
              </section>

              {/* Actions */}
              <section className="rounded-3xl border border-[#f0edf1] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#1a1a2e]">Actions</h2>
                <p className="mt-1 text-sm text-[#9CA3AF]">
                  Use the loaded book data to continue editing or previewing.
                </p>
                <div className="mt-4 space-y-3">
                  <InviteButton bookId={bookId} />
                  <a
                    href={getCleanInviteLink(book.invite_link)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Open invite link
                  </a>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center rounded-full border border-[#e5e7eb] px-5 py-3 text-sm font-semibold text-[#374151] hover:border-[#BF003A] hover:text-[#BF003A]"
                  >
                    Return to books
                  </Link>
                </div>
              </section>
            </div>

            {/* Contributor page order moved to the Participants panel. */}
          </>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#f0edf1] bg-[#fafafa] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#1a1a2e]">{value}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-[#f0edf1] bg-white p-5 text-center shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</p>
      <p className="mt-2 text-3xl font-bold text-[#1a1a2e]">{value}</p>
    </div>
  );
}

function BookEditSection({
  bookId,
  book,
}: {
  bookId: string;
  book: NonNullable<ReturnType<typeof useBookDetailsQuery>["data"]>["data"]["book_details"];
}) {
  const updateBookMutation = useUpdateBookMutation(bookId);
  const [bookTitle, setBookTitle] = useState(book.book_title ?? "");
  const [bookSubtitle, setBookSubtitle] = useState(book.book_subtitle ?? "");
  const [recipientName, setRecipientName] = useState(book.recipient_name ?? "");
  const [occasion, setOccasion] = useState(book.occasion ?? "");
  const [subOccasion, setSubOccasion] = useState(book.sub_occasion ?? "");

  const handleSave = async () => {
    await updateBookMutation.mutateAsync({
      book_title: bookTitle,
      book_subtitle: bookSubtitle || null,
      recipient_name: recipientName,
      occasion: occasion || null,
      sub_occasion: subOccasion || null,
      questions: book.questions ?? null,
    });
  };

  return (
    <div className="space-y-6 rounded-3xl border border-[#f0edf1] bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7]">
          <Image src="/images/c1.jpg" alt={book.book_title} fill className="object-cover" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BF003A]">Book details</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a2e]">Edit book</h1>
          <p className="mt-2 text-base text-[#6b7280]">Update the book and save with POST /user/books/{bookId}.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Book title" value={bookTitle} onChange={setBookTitle} />
            <Field label="Book subtitle" value={bookSubtitle} onChange={setBookSubtitle} />
            <Field label="Recipient" value={recipientName} onChange={setRecipientName} />
            <Field label="Occasion" value={occasion} onChange={setOccasion} />
            <Field label="Sub occasion" value={subOccasion} onChange={setSubOccasion} />
            <InfoCard
              label="Expiry"
              value={new Date(book.expire_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            />
          </div>
          <div className="mt-5 rounded-2xl border border-[#f0edf1] bg-[#fafafa] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">Invite link</p>
            <p className="mt-2 break-all text-sm text-[#374151]">{getCleanInviteLink(book.invite_link)}</p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={updateBookMutation.isPending}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateBookMutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
          {updateBookMutation.error && (
            <p className="mt-3 text-sm text-red-600">{updateBookMutation.error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="rounded-2xl border border-[#f0edf1] bg-[#fafafa] px-4 py-3">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border-0 bg-transparent p-0 text-sm font-medium text-[#1a1a2e] outline-none focus:ring-0"
      />
    </label>
  );
}

// ── Invite Button with email input and mutation ──
function InviteButton({ bookId }: { bookId: string }) {
  const [email, setEmail] = useState("");
  const inviteMutation = useSendBookInviteMutation(bookId);

  const handleSendInvite = async () => {
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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none focus:border-[#BF003A]"
      />
      <button
        type="button"
        onClick={() => void handleSendInvite()}
        disabled={inviteMutation.isPending || !email.trim()}
        className="flex w-full items-center justify-center rounded-full border border-[#BF003A] px-5 py-3 text-sm font-semibold text-[#BF003A] hover:bg-[#fff5f6] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inviteMutation.isPending ? "Sending invite..." : "Send invitation"}
      </button>
    </div>
  );
}