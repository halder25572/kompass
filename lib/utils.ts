import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCleanInviteLink(rawLink: string | null | undefined): string {
  if (!rawLink) return "";
  try {
    let code = "";
    const inviteIndex = rawLink.indexOf("/invite/");
    if (inviteIndex !== -1) {
      code = rawLink.substring(inviteIndex + "/invite/".length);
    } else {
      const segments = rawLink.split("/").filter(Boolean);
      code = segments[segments.length - 1] || "";
    }
    
    const origin = "https://memory-book-nine.vercel.app";
      
    return `${origin}/birthday-question?code=${code}`;
  } catch {
    return rawLink || "";
  }
}


