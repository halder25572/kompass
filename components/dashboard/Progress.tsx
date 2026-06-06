/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Plus, ChevronRight, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBookContributionsQuery, useBookDetailsQuery, useSendBookInviteMutation, useUpdateBookMutation } from "@/features/books/hooks/services";
import { toast } from "sonner";
import { getCleanInviteLink } from "@/lib/utils";
import type { Contribution } from "@/types/api";
import { getContributionDisplayName, getContributionIdentityName, getContributorRouteKeyFromName, getContributorRouteKey } from "@/lib/contributor";

type ParticipantView = {
  id: string;
  routeKey: string;
  name: string;
  initials: string;
  status: string;
  avatar?: string | null;
};

const statusStyle = {
  Submitted: "bg-green-500 text-white",
  Pending: "bg-purple-500 text-white",
  Invited: "bg-gray-200 text-gray-600",
};

function normalizeStatus(status?: string) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "?";
}

function getContributionName(contribution: Contribution) {
  const rawContribution = contribution as Contribution & {
    participant_name?: string;
    contributor_name?: string;
    full_name?: string;
    display_name?: string;
    participant_status?: string;
    user?: { name?: string; full_name?: string; display_name?: string; email?: string };
    invitee?: { name?: string; full_name?: string; display_name?: string; email?: string };
    participant?: { name?: string; full_name?: string; display_name?: string; email?: string };
    contributor?: { name?: string; full_name?: string; display_name?: string; email?: string };
  };

  const candidates = [
    rawContribution.name,
    rawContribution.participant_name,
    rawContribution.contributor_name,
    rawContribution.full_name,
    rawContribution.display_name,
    rawContribution.user?.name,
    rawContribution.user?.full_name,
    rawContribution.user?.display_name,
    rawContribution.invitee?.name,
    rawContribution.invitee?.full_name,
    rawContribution.invitee?.display_name,
    rawContribution.participant?.name,
    rawContribution.participant?.full_name,
    rawContribution.participant?.display_name,
    rawContribution.contributor?.name,
    rawContribution.contributor?.full_name,
    rawContribution.contributor?.display_name,
    rawContribution.email,
  ];

  const normalized = candidates.find((value) => typeof value === "string" && value.trim().length > 0)?.trim() ?? "";
  const placeholderValues = new Set(["unknown", "n/a", "na", "null", "undefined", "-"]);

  if (normalized.length > 0 && !placeholderValues.has(normalized.toLowerCase())) {
    return normalized;
  }

  return "";
}

function getContributionStatus(contribution: Contribution) {
  const rawContribution = contribution as Contribution & {
    participant_status?: string;
    status?: string;
    participant?: { status?: string; participant_status?: string };
    user?: { status?: string; participant_status?: string };
    invitee?: { status?: string; participant_status?: string };
    contributor?: { status?: string; participant_status?: string };
  };

  const statusCandidates = [
    rawContribution.participant_status,
    rawContribution.status,
    rawContribution.participant?.participant_status,
    rawContribution.participant?.status,
    rawContribution.user?.participant_status,
    rawContribution.user?.status,
    rawContribution.invitee?.participant_status,
    rawContribution.invitee?.status,
    rawContribution.contributor?.participant_status,
    rawContribution.contributor?.status,
  ];

  const normalized = statusCandidates.find((value) => typeof value === "string" && value.trim().length > 0)?.trim().toLowerCase();

  if (normalized === "invited") return "Invited";
  if (normalized === "pending") return "Pending";
  if (normalized === "submitted") return "Submitted";

  return "Pending";
}

function mapContributionToParticipant(contribution: Contribution): ParticipantView {
  // Log the raw contribution object so we can see the backend shape in the console.
  try {
    console.log("Raw contribution object:", contribution);
  } catch {}

  const resolvedName = getContributionDisplayName(contribution);
  const identityName = resolvedName && resolvedName !== "Unknown"
    ? resolvedName
    : contribution.email || "Unknown";
  // Use composite name+email route key so two contributors sharing the same
  // email (e.g. grandparent assisted by their child) get distinct dashboard pages.
  const compositeRouteKey = getContributorRouteKey(contribution);
  const routeKeyFromName = getContributorRouteKeyFromName(getContributionIdentityName(contribution));
  const status = getContributionStatus(contribution);

  return {
    id: String(contribution.id),
    routeKey: compositeRouteKey || routeKeyFromName || String(contribution.id),
    name: identityName,
    initials: getInitials(identityName || contribution.email || "Unknown"),
    status,
    avatar: (contribution as Contribution & { avatar?: string | null }).avatar ?? null,
  };
}

function getProgressPercent(progress: number | string | null | undefined) {
  if (typeof progress === "number" && Number.isFinite(progress)) {
    return Math.max(0, Math.min(progress, 100));
  }

  if (typeof progress === "string") {
    const parsed = Number.parseFloat(progress.replace("%", ""));
    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.min(parsed, 100));
    }
  }

  return 0;
}

function formatProgress(progress: number | string | null | undefined) {
  if (typeof progress === "number" && Number.isFinite(progress)) {
    return `${progress}%`;
  }

  if (typeof progress === "string" && progress.trim()) {
    return progress;
  }

  return "--";
}

function getWhatsAppShareUrl(inviteLink: string) {
  return `https://wa.me/?text=${encodeURIComponent(`Join my memory book: ${inviteLink}`)}`;
}

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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition-colors hover:border-[#BF003A] hover:text-[#BF003A] cursor-pointer"
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
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[#e5e7eb] px-5 py-3 text-[13px] font-semibold cursor-pointer text-[#374151] transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
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
  const [participants, setParticipants] = useState<ParticipantView[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data: bookDetails } = useBookDetailsQuery(bookId);
  const {
    contributions,
    statistics,
    isLoading: isContributionsLoading,
    isError: isContributionsError,
    error: contributionsError,
    refetch: refetchContributions,
  } = useBookContributionsQuery(bookId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateMutation = useUpdateBookMutation(bookId);
  const inviteLink = getCleanInviteLink(bookDetails?.data.book_details.invite_link ?? "");
  const progressValue = getProgressPercent(statistics?.progress);
  const participantTotal = statistics?.total ?? contributions.length;
  const contributionParticipantKey = contributions
    .map((contribution) => `${contribution.id}:${contribution.name ?? ""}:${contribution.status ?? ""}`)
    .join("|");

  const mappedParticipants = useMemo(() => contributions.map(mapContributionToParticipant), [contributions]);

  useEffect(() => {
    setParticipants(mappedParticipants);
  }, [mappedParticipants]);

  const handleDragStart = ({ active }: any) => setActiveId(active.id as string);
  const handleDragEnd = ({ active, over }: any) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIndex = participants.findIndex((p) => p.id === active.id);
    const newIndex = participants.findIndex((p) => p.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(participants, oldIndex, newIndex);

    // Update local state immediately for optimistic UI
    setParticipants(next);

    // Persist order to server
    try {
      const payload: any = { participant_order: next.map((p, i) => ({ participant_id: p.id, participant_number: i + 1 })) };
      updateMutation.mutateAsync(payload).then(() => {
        toast.success("Participant order saved");
      }).catch((err) => {
        console.error("Failed to persist participant order:", err);
        toast.error(err instanceof Error ? err.message : "Failed to save order");
        // Rollback to query value on error
        setParticipants(mappedParticipants);
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save participant order");
      setParticipants(mappedParticipants);
    }
  };

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!mappedParticipants || mappedParticipants.length === 0) return;
    if (hasAnimated.current) return;
    hasAnimated.current = true;

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
  }, [mappedParticipants]);

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
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
              <span className="font-semibold text-lg">Mein HerzGeschenk</span>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#6b7280] shadow-sm transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
          >
            <span aria-hidden="true">←</span>
            Back to dashboard
          </Link>
        </div>

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
              <span className="font-semibold gradient-text">{isContributionsLoading ? "--" : (statistics?.progress ?? "0%")}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div
                ref={progressBarRef}
                className="h-2 bg-linear-to-r from-[#BF003A] to-[#59001C] rounded-full"
                style={{ width: `${progressValue}%` }}
              />
            </div>

            <div ref={statsRef} className="grid grid-cols-3 text-center">
              <Stat number={isContributionsLoading ? "--" : String(statistics?.submitted ?? 0)} label="Submitted" />
              <Stat number={isContributionsLoading ? "--" : String(statistics?.pending ?? 0)} label="Pending" />
              <Stat number={isContributionsLoading ? "--" : String(statistics?.invited ?? 0)} label="Invited" />
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div ref={participantRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Participants</h2>

            <div className="space-y-3">
              {isContributionsLoading ? (
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
                </div>
              ) : isContributionsError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 space-y-3">
                  <p>{contributionsError instanceof Error ? contributionsError.message : "Failed to load contributions."}</p>
                  <button
                    type="button"
                    onClick={() => void refetchContributions()}
                    className="rounded-md bg-[#BF003A] px-3 py-2 text-white"
                  >
                    Try again
                  </button>
                </div>
              ) : participants.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                  No contributions yet. Invite contributors to get started.
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={(closestCenter as any)} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
                  <SortableContext items={participants.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col gap-1">
                      {participants.map((p) => (
                        <SortableParticipantRow key={p.id} p={p} bookId={bookId} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
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
              <Row label="Contributors" value={String(participantTotal)} />
            </div>
          </div>

          {/* INVITE */}
          <div ref={inviteRef} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Invite Contributors</h2>

            {/* SHARE LINK */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch border rounded-lg overflow-hidden mb-3">
              <input
                className="flex-1 p-2 text-xs outline-none min-w-0"
                  value={inviteLink || "Invite link will appear here"}
                readOnly
              />
              <div className="flex items-stretch gap-2 border-t border-[#f0edf1] bg-white p-2 sm:border-t-0 sm:border-l sm:p-1.5">
                <button
                    type="button"
                    disabled={!inviteLink}
                    onClick={async () => {
                      if (!inviteLink || typeof navigator === "undefined") return;
                      await navigator.clipboard.writeText(inviteLink);
                      toast.success("Invite link copied");
                    }}
                  onMouseEnter={onBtnEnter} onMouseLeave={onBtnLeave}
                    className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#BF003A] to-[#59001C] px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Copy size={14} />
                </button>

                <a
                  href={inviteLink ? getWhatsAppShareUrl(inviteLink) : "#"}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={onBtnEnter as any}
                  onMouseLeave={onBtnLeave as any}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-[13px] font-semibold text-white transition-opacity ${inviteLink ? "bg-[#25D366] hover:opacity-90" : "pointer-events-none bg-[#9CA3AF] opacity-60"}`}
                >
                  Share on WhatsApp
                </a>
              </div>
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
};

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-semibold">{number}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function DragHandleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="3" r="1" fill="currentColor" />
      <circle cx="8" cy="3" r="1" fill="currentColor" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <circle cx="4" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function SortableParticipantRow({ p, bookId }: { p: any; bookId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p.id });
  const style: any = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : undefined, position: isDragging ? ("relative" as const) : undefined };
  const router = useRouter();

  return (
    <div ref={setNodeRef} style={style} className="participant-row flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/${bookId}/participant/${encodeURIComponent(p.routeKey)}`)}>
      <div className="flex items-center gap-3">
        <button type="button" {...attributes} {...listeners} className="mb-px h-9 w-9 shrink-0 rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] flex items-center justify-center">
          <DragHandleIcon />
        </button>
        {p.avatar ? (
          <Image src={p.avatar} alt={p.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">{p.initials}</div>
        )}
        <span className="text-sm font-medium text-gray-900">{p.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[p.status as keyof typeof statusStyle]}`}>{p.status}</span>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
}

function InviteContributors({ bookId }: { bookId: string }) {
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const inviteMutation = useSendBookInviteMutation(bookId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {isMounted ? (
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
      ) : (
        <div className="flex h-9 items-center rounded-lg border border-dashed border-[#e5e7eb] px-3 text-xs text-[#9CA3AF]">
          Loading invite input...
        </div>
      )}

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