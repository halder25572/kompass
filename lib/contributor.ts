import type { Contribution } from "@/types/api";

type ContributionLike = Partial<Contribution> & {
  participant_name?: string;
  contributor_name?: string;
  full_name?: string;
  display_name?: string;
  participant?: { name?: string; full_name?: string; display_name?: string };
  contributor?: { name?: string; full_name?: string; display_name?: string };
  invitee?: { name?: string; full_name?: string; display_name?: string };
  user?: { name?: string; full_name?: string; display_name?: string };
  email?: string;
};

export function normalizeContributorName(value?: string | null) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

export function getContributorRouteKeyFromName(name?: string | null) {
  const normalized = normalizeContributorName(name).toLowerCase();

  if (!normalized) {
    return "";
  }

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export function getContributionDisplayName(contribution: ContributionLike) {
  const candidates = [
    contribution.name,
    contribution.participant_name,
    contribution.contributor_name,
    contribution.full_name,
    contribution.display_name,
    contribution.user?.name,
    contribution.user?.full_name,
    contribution.user?.display_name,
    contribution.invitee?.name,
    contribution.invitee?.full_name,
    contribution.invitee?.display_name,
    contribution.participant?.name,
    contribution.participant?.full_name,
    contribution.participant?.display_name,
    contribution.contributor?.name,
    contribution.contributor?.full_name,
    contribution.contributor?.display_name,
  ];

  const resolved = candidates.find((value) => typeof value === "string" && value.trim().length > 0)?.trim() ?? "";
  const placeholderValues = new Set(["unknown", "n/a", "na", "null", "undefined", "-"]);

  if (resolved.length > 0 && !placeholderValues.has(resolved.toLowerCase())) {
    return resolved;
  }

  return "";
}

export function getContributionIdentityName(contribution: ContributionLike) {
  const candidates = [
    contribution.name,
    contribution.participant_name,
    contribution.contributor_name,
    contribution.full_name,
    contribution.display_name,
    contribution.user?.name,
    contribution.user?.full_name,
    contribution.user?.display_name,
    contribution.invitee?.name,
    contribution.invitee?.full_name,
    contribution.invitee?.display_name,
    contribution.participant?.name,
    contribution.participant?.full_name,
    contribution.participant?.display_name,
    contribution.contributor?.name,
    contribution.contributor?.full_name,
    contribution.contributor?.display_name,
  ];

  return candidates.find((value) => typeof value === "string" && value.trim().length > 0)?.trim() ?? "";
}

export function getContributionIdentityKey(contribution: ContributionLike) {
  const name = getContributionIdentityName(contribution);
  const routeKey = getContributorRouteKeyFromName(name);

  if (routeKey) {
    return `name:${routeKey}`;
  }

  return `id:${String(contribution.id ?? "")}`;
}

export function isNumericContributorParam(value: string | undefined | null) {
  return typeof value === "string" && /^\d+$/.test(value.trim());
}

export const DEFAULT_CONTRIBUTOR_PHOTOS = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc9?auto=format&fit=crop&w=1200&q=80",
];

export function getDefaultContributorPhotos(count = 2) {
  if (count <= 0) {
    return [];
  }

  const photos: string[] = [];

  for (let index = 0; index < count; index += 1) {
    photos.push(DEFAULT_CONTRIBUTOR_PHOTOS[index % DEFAULT_CONTRIBUTOR_PHOTOS.length]);
  }

  return photos;
}
