/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBookDetailsQuery } from "@/features/books/hooks/services";
import { useUpdateBookMutation } from "@/features/books/hooks/services";
import { useSendBookInviteMutation } from "@/features/books/hooks/services";
import { toast } from "sonner";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Types ─────────────────────────────────────────────────
type Contributor = {
  id: string;
  name: string;
  email: string;
  status?: string;
};

type Props = {
  params: {
    id: string;
  };
};

// ── Avatar helpers ────────────────────────────────────────
const avatarColors = [
  { bg: "#EEF2FF", text: "#3730A3" },
  { bg: "#FFF5F6", text: "#BF003A" },
  { bg: "#F0FDF4", text: "#15803D" },
  { bg: "#FFF7ED", text: "#C2410C" },
  { bg: "#F0F9FF", text: "#0369A1" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Drag Handle Icon ──────────────────────────────────────
function DragHandleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5.5" cy="3.5" r="1.5" fill="currentColor" />
      <circle cx="10.5" cy="3.5" r="1.5" fill="currentColor" />
      <circle cx="5.5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="10.5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="5.5" cy="12.5" r="1.5" fill="currentColor" />
      <circle cx="10.5" cy="12.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ── Sortable Page Order Row ───────────────────────────────
function SortablePageRow({ contributor, index }: { contributor: Contributor; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: `page-${contributor.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  const color = avatarColors[index % avatarColors.length];
  const initials = contributor.name ? getInitials(contributor.name) : "?";

  const statusColor =
    contributor.status === "submitted"
      ? { bg: "#F0FDF4", text: "#15803D", label: "Submitted" }
      : contributor.status === "pending"
      ? { bg: "#FFF7ED", text: "#C2410C", label: "Pending" }
      : { bg: "#EEF2FF", text: "#3730A3", label: "Invited" };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all ${
        isDragging
          ? "bg-[#fff5f6] border-[#fcd5de] shadow-lg opacity-80"
          : "bg-white border-[#e5e7eb] hover:border-[#B91C1C]/30 hover:bg-[#fffafb]"
      }`}
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-[#c5c8cc] hover:text-[#6b7280] transition-colors touch-none flex items-center justify-center w-7 h-7 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] shrink-0"
        aria-label={`Drag to reorder page ${index + 1}`}
      >
        <DragHandleIcon />
      </button>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
        style={{ background: color.bg, color: color.text }}
      >
        {initials}
      </div>

      {/* Name + email */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1a1a2e] truncate">
          {contributor.name || "Unnamed contributor"}
        </p>
        <p className="text-[11px] text-[#9CA3AF] truncate">
          {contributor.email || "No email"}
        </p>
      </div>

      {/* Status badge */}
      {contributor.status && (
        <span
          className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
          style={{ background: statusColor.bg, color: statusColor.text, borderColor: statusColor.bg }}
        >
          {statusColor.label}
        </span>
      )}

      {/* Page number */}
      <span className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#fff5f6] text-[#BF003A] border border-[#fcd5de]">
        Page {index + 1}
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function DashboardPage({ params }: Props) {
  const bookId = params.id;
  const { data, isLoading, isError, error } = useBookDetailsQuery(bookId);
  const book = data?.data.book_details;
  const statistics = data?.data.statistics;

  // ── Point 15: Page order state ──
  const rawContributors: Contributor[] = (((data?.data?.book_details) as any)?.contributors ?? []) as Contributor[];
  const [pageOrder, setPageOrder] = useState<Contributor[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  useEffect(() => {
    if (rawContributors.length) setPageOrder(rawContributors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handlePageDragStart = (event: DragStartEvent) =>
    setActivePageId(event.active.id as string);

  const handlePageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePageId(null);
    if (!over || active.id === over.id) return;
    setPageOrder((prev) => {
      const oldIndex = prev.findIndex((c) => `page-${c.id}` === active.id);
      const newIndex = prev.findIndex((c) => `page-${c.id}` === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const activePageContributor = activePageId
    ? pageOrder.find((c) => `page-${c.id}` === activePageId)
    : null;

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
                    href={book.invite_link}
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

            {/* ── Point 15: Contributor Page Order ── */}
            <section className="rounded-3xl border border-[#f0edf1] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-[#fff5f6] border border-[#fde8ec] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#1a1a2e]">Contributor Page Order</h2>
                  <p className="text-sm text-[#9CA3AF]">
                    Drag to reorder how contributor pages appear in the final book.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-[#9CA3AF] mb-4 mt-2">
                Use the ⠿ handle to drag contributors up or down.
              </p>

              {pageOrder.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e5e7eb] px-4 py-8 text-center text-sm text-[#9CA3AF]">
                  No contributors yet. Send invites to see page order here.
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handlePageDragStart}
                  onDragEnd={handlePageDragEnd}
                  onDragCancel={() => setActivePageId(null)}
                >
                  <SortableContext
                    items={pageOrder.map((c) => `page-${c.id}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-2">
                      {pageOrder.map((contributor, idx) => (
                        <SortablePageRow
                          key={`page-${contributor.id}`}
                          contributor={contributor}
                          index={idx}
                        />
                      ))}
                    </div>
                  </SortableContext>

                  <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
                    {activePageContributor ? (
                      <div className="flex items-center gap-3 rounded-xl border border-[#fcd5de] bg-white shadow-xl px-3 py-2.5 opacity-95">
                        <div className="w-7 h-7 rounded-lg border border-[#e5e7eb] bg-[#fafafa] flex items-center justify-center text-[#B91C1C]">
                          <DragHandleIcon />
                        </div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                          style={{
                            background: avatarColors[pageOrder.findIndex((c) => c.id === activePageContributor.id) % avatarColors.length].bg,
                            color: avatarColors[pageOrder.findIndex((c) => c.id === activePageContributor.id) % avatarColors.length].text,
                          }}
                        >
                          {getInitials(activePageContributor.name)}
                        </div>
                        <div className="flex-1 text-[13px] font-semibold text-[#1a1a2e] truncate">
                          {activePageContributor.name}
                        </div>
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              )}
            </section>
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
            <p className="mt-2 break-all text-sm text-[#374151]">{book.invite_link}</p>
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