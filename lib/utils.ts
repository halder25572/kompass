import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getAppOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://memory-book-nine.vercel.app";
}

export function extractInviteCode(rawLink: string) {
  const trimmed = rawLink.trim();
  try {
    const parsed = new URL(trimmed);
    const codeParam = parsed.searchParams.get("code");
    if (codeParam) return codeParam;
  } catch {
    // not a full URL, fall through
  }
  const inviteIndex = trimmed.indexOf("/invite/");

  if (inviteIndex !== -1) {
    return trimmed
      .substring(inviteIndex + "/invite/".length)
      .split("?")[0]
      .split("#")[0]
      .replace(/^\/+|\/+$/g, "");
  }

  try {
    const parsed = new URL(trimmed);
    const invitePathIndex = parsed.pathname.indexOf("/invite/");

    if (invitePathIndex !== -1) {
      return parsed.pathname
        .substring(invitePathIndex + "/invite/".length)
        .replace(/^\/+|\/+$/g, "");
    }
  } catch {
    // Not a full URL — fall through to path parsing below.
  }

  const withoutQuery = trimmed.split("?")[0].split("#")[0];
  if (withoutQuery.includes("/")) {
    return withoutQuery.replace(/^\/+|\/+$/g, "");
  }

  const segments = withoutQuery.split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
}

export function toInviteApiPath(code: string) {
  return code
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function getCleanInviteLink(rawLink: string | null | undefined): string {
  if (!rawLink) return "";

  try {
    const code = extractInviteCode(rawLink);
    if (!code) return "";

    return `${getAppOrigin()}/birthday-question?code=${encodeURIComponent(code)}`;
  } catch {
    return rawLink || "";
  }
}
