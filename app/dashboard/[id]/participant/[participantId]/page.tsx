"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useBookContributionsQuery, useContributionQuery } from "@/features/books/hooks/services";
import type { Contribution, ContributionDetailResponse } from "@/types/api";
import { DEFAULT_CONTRIBUTOR_PHOTOS, getContributionIdentityKey, getContributorRouteKeyFromName, getContributorRouteKey, isNumericContributorParam } from "@/lib/contributor";

const fallbackQuestions = [
  "My life motto:",
  "This is what I wanted to be when I was a child:",
  "I get grumpy about:",
  "The best invention ever:",
  "My ultimate dream:",
  "My fondest childhood memory:",
];

function prettyLabel(label: string) {
  return label.endsWith(":") ? label : `${label}:`;
}

function imagePreviewUrl(image: string) {
  return image;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => asString(typeof item === "string" ? item : (item as Record<string, unknown>).answer ?? (item as Record<string, unknown>).value ?? (item as Record<string, unknown>).text ?? ""))
      .filter(Boolean);
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => asString(item))
      .filter(Boolean);
  }

  return [];
}

function pickContributionData(
  detail: ContributionDetailResponse["data"] | null | undefined,
  fallback: Contribution | null | undefined
) {
  const source = detail ?? fallback ?? null;

  if (!source) {
    return null;
  }

  const rawSource = source as Record<string, unknown>;

  const answers =
    Array.isArray(rawSource.answers) && rawSource.answers.length > 0
      ? rawSource.answers.map((item) => asString(typeof item === "string" ? item : (item as Record<string, unknown>).answer ?? (item as Record<string, unknown>).value ?? (item as Record<string, unknown>).text ?? ""))
      : asStringArray(rawSource.answers);

  const images = asStringArray(rawSource.images);

  return {
    name: asString(rawSource.name) || asString(rawSource.participant_name) || asString(rawSource.contributor_name) || asString(rawSource.full_name) || asString(rawSource.display_name) || asString(rawSource.email) || "Participant",
    email: asString(rawSource.email),
    status: asString(rawSource.status),
    submittedAt: asString(rawSource.submitted_at),
    answers,
    images,
  };
}

function findContributionByRouteKey(contributions: Contribution[] | undefined, participantId: string) {
  if (!contributions || contributions.length === 0) {
    return null;
  }

  const normalizedParticipantId = decodeURIComponent(participantId).trim();

  return contributions.find((contribution) => {
    // 1. Match by numeric DB id (fallback for old links)
    const identityKey = getContributionIdentityKey(contribution);
    if (identityKey === `id:${normalizedParticipantId}`) {
      return true;
    }

    // 2. Match by composite name+email route key (primary, new format)
    const compositeKey = getContributorRouteKey(contribution);
    if (compositeKey && compositeKey === normalizedParticipantId) {
      return true;
    }

    // 3. Fallback: match by name-only slug (legacy links)
    const routeKey = getContributorRouteKeyFromName(contribution.name);
    return routeKey.length > 0 && routeKey === normalizedParticipantId;
  }) ?? null;
}

export default function ParticipantPage() {
  const params = useParams<{ id: string; participantId: string }>();
  const bookId = params?.id;
  const participantId = params?.participantId;
  const contributorsListHref = bookId ? `/dashboard/progress?bookId=${encodeURIComponent(bookId)}` : "/dashboard";
  const { contributions: bookContributions } = useBookContributionsQuery(bookId);
  const listContribution = useMemo(
    () => findContributionByRouteKey(bookContributions, participantId),
    [bookContributions, participantId]
  );
  const shouldFetchDetail = !listContribution && isNumericContributorParam(participantId);
  const { data: detailData, isLoading: isDetailLoading, isError: isDetailError, error: detailError, refetch } = useContributionQuery(shouldFetchDetail ? participantId : undefined);

  const contribution = useMemo(
    () => pickContributionData(detailData?.data ?? null, listContribution),
    [detailData?.data, listContribution]
  );

  const isLoading = isDetailLoading && !contribution;
  const showError = isDetailError && !contribution;
  const participantName = contribution?.name ?? "Participant";
  const answers = contribution?.answers ?? [];
  const images = contribution?.images?.length ? contribution.images : DEFAULT_CONTRIBUTOR_PHOTOS.slice(0, 2);
  const hasDetails = Boolean(contribution && (contribution.name || contribution.email || contribution.answers.length > 0 || contribution.images.length > 0));
  const answerRowCount = Math.max(fallbackQuestions.length, answers.length);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAllPhotos = async () => {
    if (images.length === 0) {
      toast.error("No photos to download");
      return;
    }

    setIsDownloading(true);
    try {
      for (let i = 0; i < images.length; i++) {
        const proxyUrl = `/api/download-image?url=${encodeURIComponent(images[i])}`;
        const response = await fetch(proxyUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = `${participantName}-photo-${i + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
        await new Promise((r) => setTimeout(r, 400));
      }
      toast.success("Photos downloaded successfully");
    } catch {
      toast.error("Failed to download photos");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7fb] px-4 py-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
              <span className="font-semibold text-lg">Mein HerzGeschenk</span>
            </div>
          </Link>

          <Link
            href={contributorsListHref}
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2 text-xs font-semibold text-[#374151] shadow-sm transition-colors hover:border-[#BF003A] hover:text-[#BF003A]"
          >
            <span aria-hidden="true">←</span>
            Back to contributors
          </Link>
        </div>

        <div className="mb-4 mt-15">
          <div className="flex items-center gap-2 text-[#b91c1c] mb-1">
            <span className="text-sm">▭</span>
            <h1 className="text-lg font-semibold text-[#111827]">
              {isLoading ? "Loading contribution..." : `Contributed by ${participantName}`}
            </h1>
          </div>
          <p className="text-xs text-[#a1a1b2]">
            {isLoading
              ? "Fetching submitted name, answers and pictures..."
              : contribution?.email
                ? `contribution for ${contribution.email}`
                : "Showing the available participant details."}
          </p>
        </div>

        {showError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 space-y-3">
            <p>{detailError instanceof Error ? detailError.message : "Failed to load contribution details."}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-md bg-[#BF003A] px-3 py-2 text-white"
            >
              Try again
            </button>
          </div>
        ) : null}

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#eceaf0]">
            <div className="mb-4 grid gap-2 rounded-xl bg-[#faf7f8] p-3 text-sm text-[#4b5563]">
              <div className="flex justify-between gap-3">
                <span className="text-[#9aa0b4]">Name</span>
                <span className="font-medium text-[#111827]">{isLoading ? "Loading..." : participantName}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#9aa0b4]">Email</span>
                <span className="font-medium text-[#111827]">{isLoading ? "Loading..." : contribution?.email || "—"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#9aa0b4]">Status</span>
                <span className="font-medium text-[#111827]">{isLoading ? "Loading..." : contribution?.status || "Pending"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#9aa0b4]">Submitted</span>
                <span className="font-medium text-[#111827]">{isLoading ? "Loading..." : contribution?.submittedAt || "—"}</span>
              </div>
            </div>

            <div className="space-y-3">
              {Array.from({ length: answerRowCount }, (_, index) => {
                const label = fallbackQuestions[index] ?? `Answer ${index + 1}`;
                const answer = answers[index] ?? "";

                return (
                <div key={`${label}-${index}`} className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] font-semibold text-[#111827]">
                      {prettyLabel(label)}
                    </label>
                    <div className="flex items-center gap-2 text-[#b8b8c4]">
                      {answer ? (
                        <span className="text-[11px] text-green-600">✓</span>
                      ) : (
                        <span className="text-[11px]">✎</span>
                      )}
                      <span className="text-[11px]">▢</span>
                    </div>
                  </div>
                  <input
                    readOnly
                    value={answer || (isLoading ? "Loading answer..." : "No answer provided")}
                    className="w-full rounded-lg border border-[#e8e8ef] bg-white px-3 py-2 text-xs text-[#b3b3c0] outline-none"
                  />
                </div>
                );
              })}
              {!hasDetails && !isLoading ? (
                <div className="rounded-lg border border-dashed border-[#e8e8ef] bg-[#fafafb] p-4 text-sm text-[#9aa0b4]">
                  No contribution details were returned for this participant.
                </div>
              ) : null}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#eceaf0]">
            <h2 className="text-sm font-semibold text-[#111827] mb-3">Added photos</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {isLoading ? (
                <>
                  <div className="h-28 rounded-xl bg-[#f0f1f8] animate-pulse" />
                  <div className="h-28 rounded-xl bg-[#f0f1f8] animate-pulse" />
                </>
              ) : images.length > 0 ? (
                images.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative h-28 overflow-hidden rounded-xl bg-[#f0f1f8]">
                    <Image src={imagePreviewUrl(image)} alt={`${participantName} photo ${index + 1}`} fill className="object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-2 h-28 rounded-xl border border-dashed border-[#e8e8ef] flex items-center justify-center text-[#9aa0b4] text-sm">
                  No pictures uploaded
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => void handleDownloadAllPhotos()}
              disabled={isDownloading}
              className="w-full cursor-pointer rounded-lg bg-linear-to-r from-[#BF003A] to-[#59001C] py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? "Downloading..." : "Download All Photos"}
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
