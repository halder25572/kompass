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

/**
 * Builds a URL-safe route key that encodes BOTH name and email.
 * Format: "<name-slug>--<email-slug>" when both are present,
 * falling back to just the name slug or just the email slug.
 * This ensures two contributors sharing an email (e.g. a grandparent
 * helped by their child) are always routed to separate pages.
 */
export function getContributorRouteKey(contribution: ContributionLike): string {
  const name = getContributionIdentityName(contribution);
  const nameSlug = getContributorRouteKeyFromName(name);
  const email = contribution.email?.trim().toLowerCase() ?? "";
  const emailSlug = email.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const isPlaceholderName = !nameSlug || nameSlug === "unknown";

  if (!isPlaceholderName && emailSlug) {
    return `${nameSlug}--${emailSlug}`;
  }

  if (!isPlaceholderName) {
    return nameSlug;
  }

  if (emailSlug) {
    return emailSlug;
  }

  return "";
}

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
  const email = contribution.email?.trim().toLowerCase() ?? "";

  // Use the composite name+email key so contributors sharing an email
  // but with different names are always kept as separate entries.
  if (routeKey && routeKey !== "unknown" && email) {
    return `name-email:${routeKey}:${email}`;
  }

  if (routeKey && routeKey !== "unknown") {
    return `name:${routeKey}`;
  }

  if (email) {
    return `email:${email}`;
  }

  return `id:${String(contribution.id ?? "")}`;
}

export function isNumericContributorParam(value: string | undefined | null) {
  return typeof value === "string" && /^\d+$/.test(value.trim());
}

export const DEFAULT_CONTRIBUTOR_PHOTOS = [
  // Misty mountain forest
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  // Serene lake with reflections
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc9?auto=format&fit=crop&w=1200&q=80",
  // Sunlit wildflower meadow
  "https://images.unsplash.com/photo-1490750967868-88df5691cc1a?auto=format&fit=crop&w=1200&q=80",
  // Coastal cliff at golden hour
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  // Autumn forest path
  "https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?auto=format&fit=crop&w=1200&q=80",
  // Snowy pine forest
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=1200&q=80",
  // Lavender field at sunset
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80",
  // Rolling green hills
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
];

/**
 * Returns `count` randomly selected placeholder photos from the pool.
 * Each call may return a different selection, giving contributors varied placeholders.
 */
export function getDefaultContributorPhotos(count = 2): string[] {
  if (count <= 0) {
    return [];
  }

  const pool = [...DEFAULT_CONTRIBUTOR_PHOTOS];
  const selected: string[] = [];

  for (let i = 0; i < count; i += 1) {
    if (pool.length === 0) {
      // Pool exhausted — restart from the full list
      pool.push(...DEFAULT_CONTRIBUTOR_PHOTOS);
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    selected.push(pool[randomIndex]);
    pool.splice(randomIndex, 1);
  }

  return selected;
}
