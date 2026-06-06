import type { BookPage } from "@/store/useBookStore";

const STORAGE_PREFIX = "book-editor-state:";

function isDataUrl(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("data:");
}

function stripInlineAssets(pages: BookPage[]): BookPage[] {
  return pages.map((page) => ({
    ...page,
    background: isDataUrl(page.background) ? "" : page.background,
    elements: page.elements.map((el) => {
      if (isDataUrl(el.src)) {
        return { ...el, src: undefined };
      }
      return el;
    }),
  }));
}

function stripImages(pages: BookPage[]): BookPage[] {
  return pages.map((page) => ({
    ...page,
    background: isDataUrl(page.background) ? "" : page.background,
    elements: page.elements.filter((el) => el.type !== "image"),
  }));
}

function stripToPageShells(pages: BookPage[]): BookPage[] {
  return pages.map((page) => ({
    id: page.id,
    elements: [],
    background: isDataUrl(page.background) ? "" : page.background,
    isCover: page.isCover,
    contributorId: page.contributorId,
    contributorName: page.contributorName,
  }));
}

export function loadBookEditorState(bookId: string): { pages: BookPage[]; currentPage: number } | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(`${STORAGE_PREFIX}${bookId}`);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { pages?: BookPage[]; currentPage?: number };
    if (!Array.isArray(parsed.pages) || parsed.pages.length === 0) return null;
    return {
      pages: parsed.pages,
      currentPage: parsed.currentPage ?? 1,
    };
  } catch {
    return null;
  }
}

export function persistBookEditorState(bookId: string, pages: BookPage[], currentPage: number): void {
  if (typeof window === "undefined") return;

  const key = `${STORAGE_PREFIX}${bookId}`;
  const payloads = [
    stripInlineAssets(pages),
    stripImages(pages),
    stripToPageShells(pages),
  ];

  for (const nextPages of payloads) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          pages: nextPages,
          currentPage,
        })
      );
      return;
    } catch (error) {
      const isQuotaError =
        error instanceof DOMException &&
        (error.name === "QuotaExceededError" || error.code === 22);

      if (!isQuotaError) {
        console.warn("Failed to persist book editor state", error);
        return;
      }
    }
  }

  console.warn("Book editor state exceeds localStorage quota; persistence skipped.");
}
