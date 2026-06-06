/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Konva from "konva";
import { Theme, Categories } from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { useBookStore, type BookPage } from "@/store/useBookStore";
import { fetchBookDetails, fetchBookPageStyles, fetchCoverPageStyles } from "@/services/api";
import { useBookContributionsQuery } from "@/features/books/hooks/services";
import { getContributionDisplayName } from "@/lib/contributor";
import type { Contribution } from "@/types/api";
import CanvasPage from "./CanvasPage";
import Toolbar from "./Toolbar";
import { loadBookEditorState, persistBookEditorState } from "./utils/persistEditorState";

// ── Next.js SSR-safe dynamic import (picker uses window) ─────────────────
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

// ── Format definitions (printsmarter.de specs) ───────────────────────────
// All values in pixels @ 96dpi; print sizes in mm noted as comments

export type BookFormat = "a4-landscape" | "square";

interface FormatConfig {
  label: string;
  sublabel: string;     // print size info
  width: number;        // canvas px
  height: number;       // canvas px
  printWidth: number;   // mm
  printHeight: number;  // mm
  safeInset: number;    // px — safe area inset from each edge
}

export const FORMATS: Record<BookFormat, FormatConfig> = {
  "a4-landscape": {
    label: "A4 Querformat",
    sublabel: "297 × 210 mm",
    width: 1123,          // 297mm @ 96dpi
    height: 794,          // 210mm @ 96dpi
    printWidth: 297,
    printHeight: 210,
    safeInset: 38,        // ~10mm safe margin
  },
  "square": {
    label: "Quadrat",
    sublabel: "210 × 210 mm",
    width: 794,           // 210mm @ 96dpi
    height: 794,          // 210mm @ 96dpi
    printWidth: 210,
    printHeight: 210,
    safeInset: 38,
  },
};

// ── Background presets ────────────────────────────────────────────────────
const BG_SOLID = [
  "#ffffff","#FAF6F0","#FFF5F7","#F0F5FF","#F5FFF0","#FFFDF0",
  "#F5F0FF","#FFF0F0","#F0FFFF","#F5F5F5","#1a1a1a","#2d1b33",
  "#0f172a","#1e293b","#fdf4ff","#fff1f2","#f0fdf4","#eff6ff",
];

const BG_GRADIENTS = [
  { label: "Sunset",   value: "linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)" },
  { label: "Ocean",    value: "linear-gradient(135deg, #667eea, #764ba2)" },
  { label: "Peach",    value: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
  { label: "Mint",     value: "linear-gradient(135deg, #a8edea, #fed6e3)" },
  { label: "Rose",     value: "linear-gradient(135deg, #fccb90, #d57eeb)" },
  { label: "Sky",      value: "linear-gradient(135deg, #a1c4fd, #c2e9fb)" },
  { label: "Lavender", value: "linear-gradient(135deg, #e0c3fc, #8ec5fc)" },
  { label: "Gold",     value: "linear-gradient(135deg, #f6d365, #fda085)" },
  { label: "Forest",   value: "linear-gradient(135deg, #134e5e, #71b280)" },
  { label: "Night",    value: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" },
  { label: "Cherry",   value: "linear-gradient(135deg, #eb3349, #f45c43)" },
  { label: "Spring",   value: "linear-gradient(135deg, #f9d29d, #ffd3a5)" },
];

const STICKER_CATS = [
  Categories.SMILEYS_PEOPLE,
  Categories.ANIMALS_NATURE,
  Categories.FOOD_DRINK,
  Categories.TRAVEL_PLACES,
  Categories.ACTIVITIES,
  Categories.OBJECTS,
  Categories.SYMBOLS,
  Categories.FLAGS,
];

const PICKER_CSS = `
  .EmojiPickerReact {
    --epr-bg-color: #ffffff !important;
    --epr-category-label-bg-color: #f9f9f9 !important;
    --epr-search-border-color: #e5e5e5 !important;
    --epr-hover-bg-color: #fff0f0 !important;
    --epr-focus-bg-color: #fff0f0 !important;
    --epr-highlight-color: #b5192c !important;
    --epr-search-input-bg-color: #f5f5f5 !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  .EmojiPickerReact .epr-search-container input {
    border-radius: 10px !important;
    font-size: 12px !important;
  }
  .EmojiPickerReact li.epr-emoji-category > .epr-emoji-category-label {
    font-size: 10px !important;
    font-weight: 600 !important;
    color: #999 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }
`;

type BookEditorProps = {
  bookId?: string;
};

type ActiveContributor = {
  id: string;
  name: string;
};

type EditorPhoto = {
  id: string;
  src: string;
};

function createEditorPhoto(src: string): EditorPhoto {
  return {
    id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    src,
  };
}

function readImageFiles(files: FileList | File[], onLoad: (src: string, index: number) => void) {
  Array.from(files)
    .filter((file) => file.type.startsWith("image/"))
    .forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result;
        if (typeof src === "string") onLoad(src, index);
      };
      reader.readAsDataURL(file);
    });
}

const CONTRIBUTOR_STATUS_STYLE = {
  Submitted: "bg-green-500 text-white",
  Pending: "bg-purple-500 text-white",
  Invited: "bg-gray-200 text-gray-600",
};

function normalizeContributionStatus(status?: string) {
  if (!status) return "Pending";
  const normalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (normalized === "Invited") return "Invited";
  if (normalized === "Submitted") return "Submitted";
  return "Pending";
}

function getContributorLabel(contribution: Contribution) {
  const name = getContributionDisplayName(contribution);
  if (name && name !== "Unknown") return name;
  return contribution.email || "Unknown";
}

function findContributorPageId(pages: BookPage[], contributor: ActiveContributor) {
  const matched = pages.find((page) => {
    if (page.contributorId != null && String(page.contributorId) === contributor.id) return true;
    if (page.contributorName && page.contributorName === contributor.name) return true;
    return false;
  });
  return matched?.id ?? null;
}

export default function BookEditor({ bookId: propBookId }: BookEditorProps) {
  const params = useParams();
  const routeParamBookId = typeof params?.id === "string"
    ? params.id
    : Array.isArray(params?.id)
      ? params.id[0]
      : undefined;
  const bookId = propBookId ?? routeParamBookId ?? "";

  const {
    zoom, setZoom,
    currentPage, setCurrentPage,
    pages, addElement, addPage,
    setPageBackground,
    strokeColor, setStrokeColor,
    strokeWidth, setStrokeWidth,
    undo, redo,
    selectedElementId,
    deleteElement, duplicateElement,
    bringForward, sendBackward,
  } = useBookStore();

  const [uploadedImages, setUploadedImages] = useState<EditorPhoto[]>([]);
  const [activePanel, setActivePanel] = useState<"upload"|"emoji"|"sticker"|"bg"|"layers"|"contributors"|"content"|null>(null);
  const [contentTab, setContentTab] = useState<"photo"|"text"|"emoji">("photo");
  const [addContentText, setAddContentText] = useState("");
  const [contentPhotos, setContentPhotos] = useState<EditorPhoto[]>([]);
  const [isPhotoDragOver, setIsPhotoDragOver] = useState(false);
  const [activeContributor, setActiveContributor] = useState<ActiveContributor | null>(null);
  const [coverStylesList, setCoverStylesList] = useState<any[]>([]);
  const [bookStylesList, setBookStylesList] = useState<any[]>([]);
  const elementSequence = useRef(0);

  const { contributions, isLoading: isContributionsLoading } = useBookContributionsQuery(bookId || undefined);

  // ── Format state (per-book, user picks once) ──────────────────────────
  const [bookFormat, setBookFormat] = useState<BookFormat>("a4-landscape");
  const fmt = FORMATS[bookFormat];
  const A4_WIDTH  = fmt.width;
  const A4_HEIGHT = fmt.height;

  const panelFileRef = useRef<HTMLInputElement>(null);
  const contentFileRef = useRef<HTMLInputElement>(null);
  const stageRefs   = useRef<(Konva.Stage | null)[]>([]);
  const hasHydratedPagesRef = useRef(false);

  const nextElementId = (prefix: string) => {
    elementSequence.current += 1;
    return `${prefix}-${currentPage}-${elementSequence.current}`;
  };

  const nextPlacementOffset = () => {
    const index = elementSequence.current % 5;
    return (index - 2) * 14;
  };

  // Inject picker CSS once
  useEffect(() => {
    const id = "epr-custom-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = PICKER_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z") { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) { e.preventDefault(); redo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        if (selectedElementId) duplicateElement(currentPage, selectedElementId);
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedElementId) {
        deleteElement(currentPage, selectedElementId);
      }
      if (e.key === "]" && selectedElementId) bringForward(currentPage, selectedElementId);
      if (e.key === "[" && selectedElementId) sendBackward(currentPage, selectedElementId);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedElementId, currentPage, undo, redo, duplicateElement, deleteElement, bringForward, sendBackward]);

  useEffect(() => {
    if (!bookId) return;

    if (!hasHydratedPagesRef.current) {
      const savedBookState = loadBookEditorState(bookId);
      if (savedBookState) {
        useBookStore.setState({
          pages: savedBookState.pages,
          currentPage: savedBookState.currentPage,
        });
      }

      hasHydratedPagesRef.current = true;
    }

    let isActive = true;

    const loadThemeLists = async () => {
      try {
        const [bookStylesResponse, coverStylesResponse] = await Promise.all([
          fetchBookPageStyles().catch((error) => {
            console.warn("Failed to load book page styles", error);
            return null;
          }),
          fetchCoverPageStyles().catch((error) => {
            console.warn("Failed to load cover page styles", error);
            return null;
          }),
        ]);

        if (!isActive) return;

        setCoverStylesList(coverStylesResponse?.data ?? []);
        setBookStylesList(bookStylesResponse?.data ?? []);
      } catch (error) {
        console.error("loadThemeLists error:", error);
      }
    };

    void loadThemeLists();

    const loadBookStyles = async () => {
      try {
      const bookDetailsResponse = await fetchBookDetails(bookId);

        const book = bookDetailsResponse.data.book_details as {
          cover_style?: { id?: number | null; name?: string; image?: string[] } | null;
          page_style?: { id?: number | null; name?: string; image?: string[] } | null;
          book_title?: string;
          book_subtitle?: string;
          recipient_name?: string;
        };
        const coverImageUrl = book.cover_style?.image?.[0] ?? null;
        const pageImageUrl = book.page_style?.image?.[0] ?? null;

        

        if (!isActive) return;

        

        useBookStore.setState({
          bookTitle: book.book_title ?? "",
          bookSubtitle: book.book_subtitle ?? "",
          recipientName: book.recipient_name ?? "",
        });

        if (coverImageUrl) {
          useBookStore.getState().setPageBackground(1, coverImageUrl);
        }

        if (pageImageUrl) {
          const { pages: storePages, setPageBackground: updatePageBackground } = useBookStore.getState();

          storePages.forEach((page) => {
            if (page.id !== 1) {
              updatePageBackground(page.id, pageImageUrl);
            }
          });
        }
      } catch (error) {
        console.error("loadBookStyles error:", error);
      }
    };

    void loadBookStyles();

    return () => {
      isActive = false;
    };
  }, [bookId]);

  useEffect(() => {
    if (!bookId || !hasHydratedPagesRef.current) return;

    const timeoutId = window.setTimeout(() => {
      persistBookEditorState(bookId, pages, currentPage);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [bookId, pages, currentPage]);

  const scale       = zoom / 100;
  const totalPages  = pages.length;
  const spreadLabel = `Page ${currentPage} of ${totalPages}`;
  const page        = pages.find((p) => p.id === currentPage);
  const activeContributorPageId = activeContributor ? findContributorPageId(pages, activeContributor) : null;
  const isContributorPageHighlighted = activeContributorPageId != null && activeContributorPageId === currentPage;

  function togglePanel(name: typeof activePanel) {
    setActivePanel(prev => prev === name ? null : name);
  }

  const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    readImageFiles(e.target.files ?? [], (src) => {
      setUploadedImages((prev) => [createEditorPhoto(src), ...prev]);
    });
    e.target.value = "";
  };

  const addImageToCanvas = (src: string, placementIndex = 0, photoId?: string) => {
    const spread = placementIndex * 28;
    addElement(currentPage, {
      id: photoId ? `img-${photoId}` : nextElementId("img"),
      type: "image",
      src,
      x: A4_WIDTH / 2 - 100 + spread,
      y: A4_HEIGHT / 2 - 100 + spread,
      width: 200,
      height: 200,
      zIndex: (page?.elements.length || 0) + placementIndex,
    });
  };

  const handleImageClick = (src: string) => {
    addImageToCanvas(src);
  };

  const handleContentPhotoFiles = (files: FileList | File[]) => {
    readImageFiles(files, (src, index) => {
      const photo = createEditorPhoto(src);
      setContentPhotos((prev) => [photo, ...prev]);
      addImageToCanvas(src, index, photo.id);
    });
  };

  const removeUploadedPhoto = (photoId: string) => {
    setUploadedImages((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  const removeContentPhoto = (photoId: string) => {
    setContentPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    const elementId = `img-${photoId}`;
    const hasElement = useBookStore.getState().pages
      .find((bookPage) => bookPage.id === currentPage)
      ?.elements.some((element) => element.id === elementId);
    if (hasElement) {
      deleteElement(currentPage, elementId);
    }
  };

  const handleAddText = () => {
    addElement(currentPage, {
      id: nextElementId("text"), type: "text",
      text: "Click to edit text",
      x: A4_WIDTH / 2 - 100, y: A4_HEIGHT / 2 - 20,
      fontSize: 32, fontFamily: "Arial", fill: "#000000",
      width: 200, textAlign: "center",
      zIndex: page?.elements.length || 0,
    });
  };

  const handleAddContentText = () => {
    const textValue = addContentText.trim() || "Click to edit text";
    addElement(currentPage, {
      id: nextElementId("text"), type: "text",
      text: textValue,
      x: A4_WIDTH / 2 - 100, y: A4_HEIGHT / 2 - 20,
      fontSize: 32, fontFamily: "Arial", fill: "#000000",
      width: 200, textAlign: "center",
      zIndex: page?.elements.length || 0,
    });
    setAddContentText("");
  };

  const handleSelectContributor = (contribution: Contribution) => {
    const contributor = {
      id: String(contribution.id),
      name: getContributorLabel(contribution),
    };
    setActiveContributor(contributor);
    const matchedPageId = findContributorPageId(pages, contributor);
    if (matchedPageId != null) {
      setCurrentPage(matchedPageId);
    }
  };

  const emojiToTwemojiUrl = (emoji: string) => {
    const codepoints = Array.from(emoji)
      .map((character) => character.codePointAt(0)?.toString(16))
      .filter((value): value is string => Boolean(value))
      .join("-");

    return `/api/image-proxy?url=${encodeURIComponent(`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`)}`;
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    const emojiSrc = emojiToTwemojiUrl(emojiData.emoji);
    const offset = nextPlacementOffset();

    addElement(currentPage, {
      id: nextElementId("emoji"),
      type: "image",
      src: emojiSrc,
      x: A4_WIDTH / 2 - 48 + offset,
      y: A4_HEIGHT / 2 - 48 + offset,
      width: 96,
      height: 96,
      zIndex: page?.elements.length || 0,
    });
  };

  const pickerProps = {
    onEmojiClick: handleEmojiSelect,
    theme: Theme.LIGHT,
    lazyLoadEmojis: true,
    autoFocusSearch: false,
    searchPlaceholder: "Search…",
    width: "100%",
    height: "100%",
  } as const;

  return (
    <section
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col h-dvh overflow-hidden">

        {/* ── Header ── */}
        <header className="shrink-0 h-13 flex items-center justify-between gap-2 px-5 bg-transparent mb-6 mt-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
                <span className="font-semibold text-lg text-white">Mein HerzGeschenk</span>
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-[#b5192c] bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-[#b5192c] transition-colors hover:bg-white/15"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* ── Format Toggle ── */}
            <div className="flex items-center gap-0.5 bg-white/15 rounded-xl p-0.5 border border-white/20">
              {(Object.entries(FORMATS) as [BookFormat, FormatConfig][]).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBookFormat(key)}
                  title={config.sublabel}
                  className={`flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold transition-all ${
                    bookFormat === key
                      ? "bg-white text-[#b5192c] shadow-sm"
                      : "text-black hover:bg-white/10"
                  }`}
                >
                  {/* Mini aspect-ratio icon */}
                  <FormatIcon format={key} active={bookFormat === key} />
                  <span className="hidden sm:inline">{config.label}</span>
                  <span className="text-[9px] opacity-60 hidden md:inline">({config.sublabel})</span>
                </button>
              ))}
            </div>

            <span className="w-px h-5 bg-white/30 mx-1" />

            <button onClick={undo} title="Undo (Ctrl+Z)"
              className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-black transition-all">
              <UndoSvg />
            </button>
            <button onClick={redo} title="Redo (Ctrl+Y)"
              className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-black transition-all">
              <RedoSvg />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 overflow-hidden gap-2">

          {/* ── Left sliding panel ── */}
          <div className={
            "shrink-0 flex flex-col bg-white overflow-hidden transition-[width] duration-300 ease-in-out rounded-2xl " +
            (activePanel ? "w-72 border border-black/10" : "w-0 border-0")
          }>
            <div className="w-72 flex flex-col h-full">

              {/* Upload */}
              {activePanel === "upload" && <>
                <PanelHeader title="Photos" onClose={() => setActivePanel(null)} />
                <div className="p-3 shrink-0">
                  <button type="button" onClick={() => panelFileRef.current?.click()}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#b5192c] hover:bg-[#9e1626] text-white font-semibold text-[13px] rounded-xl py-2.5 px-4 transition-all">
                    <UploadSvg /> Upload Photo
                  </button>
                  <input ref={panelFileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePanelUpload} />
                </div>
                <div className="flex-1 overflow-y-auto px-3 pb-3">
                  <PhotoThumbnailGrid
                    photos={uploadedImages}
                    onAdd={handleImageClick}
                    onRemove={removeUploadedPhoto}
                  />
                </div>
              </>}

              {/* Emoji */}
              {activePanel === "emoji" && <>
                <PanelHeader title="Emojis" onClose={() => setActivePanel(null)} />
                <p className="text-[10px] text-[#bbb] px-3 py-1.5 shrink-0">
                  1800+ emojis · search · skin tones · recently used
                </p>
                <div className="flex-1 overflow-hidden">
                  <EmojiPicker {...(pickerProps as any)} />
                </div>
              </>}

              {/* Sticker */}
              {activePanel === "sticker" && <>
                <PanelHeader title="Stickers" onClose={() => setActivePanel(null)} />
                <p className="text-[10px] text-[#bbb] px-3 py-1.5 shrink-0">
                  Nature · Food · Activities · Symbols & more
                </p>
                <div className="flex-1 overflow-hidden">
                  <EmojiPicker {...(pickerProps as any)} />
                </div>
              </>}

              {/* Background */}
              {activePanel === "bg" && <>
                <PanelHeader title="Background" onClose={() => setActivePanel(null)} />
                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                  <div>
                    <SectionLabel>Solid Colors</SectionLabel>
                    <div className="grid grid-cols-6 gap-1.5">
                      {BG_SOLID.map((color, i) => (
                        <button key={i} type="button" onClick={() => setPageBackground(currentPage, color)}
                          className="aspect-square rounded-lg border-2 transition-all cursor-pointer hover:scale-110"
                          style={{
                            background: color,
                            borderColor: page?.background === color ? "#b5192c" : "rgba(0,0,0,0.1)",
                            transform: page?.background === color ? "scale(1.1)" : undefined,
                          }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <SectionLabel>Theme Presets</SectionLabel>
                    <div className="grid grid-cols-3 gap-2">
                      {(currentPage === 1 ? coverStylesList : bookStylesList).map((s: any) => {
                        const bg = s?.image?.[0] ?? s?.gradient ?? s?.value ?? "";
                        return (
                          <button key={s.id}
                            type="button"
                            onClick={() => setPageBackground(currentPage, bg, s.id)}
                            className="aspect-square rounded-lg border-2 transition-all cursor-pointer overflow-hidden"
                            style={{ background: bg, borderColor: page?.background === bg ? "#b5192c" : "rgba(0,0,0,0.1)" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <SectionLabel>Gradients</SectionLabel>
                    <div className="grid grid-cols-2 gap-1.5">
                      {BG_GRADIENTS.map((g, i) => (
                        <button key={i} type="button" onClick={() => setPageBackground(currentPage, g.value)}
                          className="h-10 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 flex items-end px-2 pb-1"
                          style={{ background: g.value, borderColor: page?.background === g.value ? "#b5192c" : "transparent" }}>
                          <span className="text-[9px] font-bold text-white drop-shadow">{g.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <SectionLabel>Custom Color</SectionLabel>
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl border border-black/8 hover:bg-[#fafafa]">
                      <span className="w-10 h-10 rounded-lg border border-black/15 shrink-0"
                        style={{ background: page?.background ?? "#ffffff" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-[#333]">Pick custom</p>
                        <p className="text-[10px] text-[#999] truncate">{page?.background?.slice(0, 24)}</p>
                      </div>
                      <input
                        type="color"
                        value={page?.background?.startsWith("#") ? page.background : "#ffffff"}
                        onChange={e => setPageBackground(currentPage, e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                      />
                    </label>
                  </div>
                </div>
              </>}

              {/* Layers */}
              {activePanel === "layers" && <>
                <PanelHeader title="Layers" onClose={() => setActivePanel(null)} />
                <div className="flex-1 overflow-y-auto p-2">
                  {page && [...page.elements].sort((a, b) => b.zIndex - a.zIndex).map(el => (
                    <div key={el.id}
                      onClick={() => useBookStore.getState().setSelectedElement(el.id)}
                      className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-1 cursor-pointer transition-all ${
                        el.id === selectedElementId
                          ? "bg-[#fff0f0] border border-[#f5c0c0]"
                          : "hover:bg-[#f5f4f2] border border-transparent"
                      }`}>
                      <span className="text-base w-5 text-center">
                        {el.type === "image" ? "🖼" : el.type === "text" ? "T" : "◻"}
                      </span>
                      <span className="text-[11px] text-[#333] flex-1 truncate">
                        {el.type === "text" ? (el.text?.slice(0, 22) || "Text") : el.type === "image" ? "Image" : `${el.shapeType || el.type}`}
                      </span>
                      <button type="button"
                        onClick={e => { e.stopPropagation(); deleteElement(currentPage, el.id); }}
                        className="text-[#ccc] hover:text-[#b5192c] text-xs p-0.5 rounded transition-colors">✕</button>
                    </div>
                  ))}
                  {(!page || page.elements.length === 0) && (
                    <p className="text-center text-[12px] text-[#ccc] mt-10">No layers yet</p>
                  )}
                </div>
              </>}

              {/* Contributor Pages */}
              {activePanel === "contributors" && <>
                <PanelHeader title="Contributor Pages" onClose={() => setActivePanel(null)} />
                <div className="flex-1 overflow-y-auto p-2">
                  {isContributionsLoading ? (
                    <p className="text-center text-[12px] text-[#ccc] mt-10">Loading contributors...</p>
                  ) : contributions.length === 0 ? (
                    <p className="text-center text-[12px] text-[#ccc] mt-10">No contributors yet</p>
                  ) : (
                    contributions.map((contribution) => {
                      const label = getContributorLabel(contribution);
                      const status = normalizeContributionStatus(contribution.status);
                      const isActive = activeContributor?.id === String(contribution.id);
                      return (
                        <button
                          key={contribution.id}
                          type="button"
                          onClick={() => handleSelectContributor(contribution)}
                          className={`mb-1 flex w-full items-center justify-between gap-2 rounded-lg border px-2 py-2 text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-[#b5192c] bg-[#fff0f0]"
                              : "border-transparent hover:bg-[#f5f4f2]"
                          }`}
                        >
                          <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#333]">{label}</span>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${CONTRIBUTOR_STATUS_STYLE[status as keyof typeof CONTRIBUTOR_STATUS_STYLE]}`}>
                            {status}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </>}

              {/* Add Content */}
              {activePanel === "content" && <>
                <PanelHeader title="Add Content" onClose={() => setActivePanel(null)} />
                <div className="flex shrink-0 gap-1 border-b border-black/6 px-2 py-2">
                  {(["photo", "text", "emoji"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setContentTab(tab)}
                      className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                        contentTab === tab
                          ? "bg-[#fff0f0] text-[#b5192c]"
                          : "text-[#888] hover:bg-[#f5f4f2]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  {contentTab === "photo" && (
                    <div className="space-y-3">
                      <div
                        onDragOver={(event) => {
                          event.preventDefault();
                          setIsPhotoDragOver(true);
                        }}
                        onDragLeave={() => setIsPhotoDragOver(false)}
                        onDrop={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setIsPhotoDragOver(false);
                          if (event.dataTransfer.files?.length) {
                            handleContentPhotoFiles(event.dataTransfer.files);
                          }
                        }}
                        className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all ${
                          isPhotoDragOver
                            ? "border-[#b5192c] bg-[#fff0f0]"
                            : "border-black/10 bg-[#fafafa] hover:border-[#b5192c]/40"
                        }`}
                        onClick={() => contentFileRef.current?.click()}
                      >
                        <UploadSvg />
                        <p className="mt-2 text-[12px] font-medium text-[#333]">Drop images here</p>
                        <p className="mt-1 text-[10px] text-[#999]">Multiple files supported</p>
                        <input
                          ref={contentFileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(event) => {
                            if (event.target.files?.length) {
                              handleContentPhotoFiles(event.target.files);
                            }
                            event.target.value = "";
                          }}
                        />
                      </div>
                      <PhotoThumbnailGrid
                        photos={contentPhotos}
                        onAdd={handleImageClick}
                        onRemove={removeContentPhoto}
                      />
                    </div>
                  )}

                  {contentTab === "text" && (
                    <div className="space-y-3">
                      <textarea
                        value={addContentText}
                        onChange={(event) => setAddContentText(event.target.value)}
                        placeholder="Enter text to add to the page..."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-black/10 px-3 py-2 text-[13px] text-[#333] outline-none focus:border-[#b5192c]"
                      />
                      <button
                        type="button"
                        onClick={handleAddContentText}
                        className="w-full cursor-pointer rounded-xl bg-[#b5192c] py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#9e1626]"
                      >
                        Add Text
                      </button>
                    </div>
                  )}

                  {contentTab === "emoji" && (
                    <p className="text-center text-[12px] text-[#ccc] mt-10">Emoji content coming soon</p>
                  )}
                </div>
              </>}
            </div>
          </div>

          {/* ── Canvas ── */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
            <div className="flex justify-center mb-3">
              <Toolbar />
            </div>

            <div className="flex-1 overflow-auto bg-gray-100/50 rounded-2xl border border-black/10">
              <div
                className="flex items-center justify-center p-8 min-h-full"
                style={{
                  minWidth:  `${A4_WIDTH  * scale + 64}px`,
                  minHeight: `${A4_HEIGHT * scale + 64}px`,
                }}
              >
                {/* Safe-area overlay (visible guideline, non-blocking) */}
                <div className="relative" style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px`, transform: `scale(${scale})`, transformOrigin: "center" }}>
                  <div
                    className={`shadow-[0_2px_20px_rgba(0,0,0,0.15)] transition-transform duration-200 origin-center w-full h-full ${
                      isContributorPageHighlighted ? "ring-4 ring-[#b5192c]/50" : ""
                    }`}
                    style={{ background: page?.background ?? "#ffffff" }}
                  >
                    <CanvasPage
                      pageId={currentPage}
                      width={A4_WIDTH}
                      height={A4_HEIGHT}
                      stageRef={(node) => { if (stageRefs.current) stageRefs.current[currentPage] = node; }}
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden select-none"
                    style={{ mixBlendMode: "multiply" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="whitespace-nowrap font-black tracking-[0.45em] text-[#7a1e3a] opacity-[0.18] rotate-[-28deg]"
                        style={{ fontSize: Math.max(42, Math.round(Math.min(A4_WIDTH, A4_HEIGHT) * 0.11)) }}
                      >
                        MEIN HERZGESCHENK
                      </div>
                    </div>
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <span className="rotate-[-28deg] whitespace-nowrap text-[18px] font-black tracking-[0.35em] text-[#7a1e3a] opacity-[0.10]">
                            MEIN HERZGESCHENK
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safe-area dashed border overlay */}
                  <div
                    className="pointer-events-none absolute border border-dashed border-[#b5192c]/25 rounded-sm"
                    style={{
                      inset: fmt.safeInset,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Format info badge (bottom-left of canvas) ── */}
            <div className="absolute bottom-16 left-4">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white/80 text-[10px] font-medium rounded-full px-3 py-1">
                <FormatIcon format={bookFormat} active={false} small />
                <span>{fmt.label} · {fmt.sublabel}</span>
              </div>
            </div>

            {/* Zoom / page bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 shrink-0">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-lg border border-black/10">
                <PillBtn onClick={() => setZoom(Math.max(25, zoom - 10))} title="Zoom out">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M8 11h6"/></svg>
                </PillBtn>
                <span className="text-[13px] font-medium text-[#1a1a1a] min-w-9 text-center tabular-nums">{zoom}%</span>
                <PillBtn onClick={() => setZoom(Math.min(200, zoom + 10))} title="Zoom in">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                </PillBtn>
                <span className="w-px h-4 bg-black/20 mx-2" />
                <PillBtn onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} title="Previous page">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </PillBtn>
                <span className="text-[13px] font-medium text-[#1a1a1a] whitespace-nowrap px-2">{spreadLabel}</span>
                <PillBtn onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} title="Next page">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </PillBtn>
                <span className="w-px h-4 bg-black/20 mx-2" />
                <button onClick={addPage}
                  className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-800 transition-colors">
                  + Add Page
                </button>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="shrink-0 w-18 flex flex-col gap-3 py-3 px-2 bg-white rounded-2xl border border-black/6">
            <SidebarBtn icon={<ContributorsSvg />} label="Pages" onClick={() => togglePanel("contributors")} active={activePanel === "contributors"} />
            <SidebarBtn icon={<PlusContentSvg />} label="Content" onClick={() => togglePanel("content")} active={activePanel === "content"} />
            <SidebarBtn icon={<UploadSvg />}  label="Uploads"  onClick={() => togglePanel("upload")}  active={activePanel === "upload"} />
            <SidebarBtn icon={<TextSvg />}    label="Add Text" onClick={handleAddText} />
            <SidebarBtn icon={<EmojiSvg />}   label="Emoji"    onClick={() => togglePanel("emoji")}   active={activePanel === "emoji"} />
            <SidebarBtn icon={<StickerSvg />} label="Stickers" onClick={() => togglePanel("sticker")} active={activePanel === "sticker"} />
            <SidebarBtn icon={<BgSvg />}      label="BG Color" onClick={() => togglePanel("bg")}      active={activePanel === "bg"} />
            <SidebarBtn icon={<LayersSvg />}  label="Layers"   onClick={() => togglePanel("layers")}  active={activePanel === "layers"} />

            <div className="w-full h-px bg-black/6 my-0.5" />

            {/* Pen color */}
            <div className="flex flex-col items-center gap-1">
              <label
                htmlFor="strokeColorPicker"
                className="w-9 h-9 rounded-lg border-2 border-black/15 cursor-pointer hover:border-[#b5192c] transition-all relative overflow-hidden"
                style={{ background: strokeColor }}
                title="Pen / Stroke Color"
              >
                <input
                  id="strokeColorPicker"
                  type="color"
                  value={strokeColor}
                  onChange={e => setStrokeColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </label>
              <span className="text-[9px] text-[#888]">Color</span>
            </div>

            {/* Stroke width */}
            <div className="flex flex-col items-center gap-1">
              <select
                value={strokeWidth}
                onChange={e => setStrokeWidth(Number(e.target.value))}
                className="text-[10px] border border-black/10 rounded-lg px-0.5 py-0.5 w-full text-center bg-white cursor-pointer"
                title="Stroke Width"
              >
                {[1,2,3,4,6,8,12,16,20].map(w => <option key={w} value={w}>{w}px</option>)}
              </select>
              <span className="text-[9px] text-[#888]">Width</span>
            </div>

            {/* Element quick-actions */}
            {selectedElementId && <>
              <div className="w-full h-px bg-black/6 my-0.5" />
              <SidebarBtn icon={<DuplicateSvg />} label="Copy"
                onClick={() => duplicateElement(currentPage, selectedElementId)} />
              <SidebarBtn icon={<ForwardSvg />}   label="Forward"
                onClick={() => bringForward(currentPage, selectedElementId)} />
              <SidebarBtn icon={<BackwardSvg />}  label="Back"
                onClick={() => sendBackward(currentPage, selectedElementId)} />
              <SidebarBtn icon={<DeleteSvg />}    label="Delete" danger
                onClick={() => deleteElement(currentPage, selectedElementId)} />
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Format icon (mini aspect-ratio visual) ────────────────────────────────
function FormatIcon({ format, active, small = false }: { format: BookFormat; active: boolean; small?: boolean }) {
  const size = small ? 10 : 12;
  const isLandscape = format === "a4-landscape";
  const w = isLandscape ? size * 1.41 : size;
  const h = isLandscape ? size : size;
  return (
    <svg
      width={w} height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <rect
        x="0.5" y="0.5"
        width={w - 1} height={h - 1}
        rx="1.5"
        stroke={active ? "#b5192c" : "currentColor"}
        strokeWidth="1.2"
        fill={active ? "#fff0f0" : "none"}
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-3 pt-3 pb-2 shrink-0 border-b border-black/6">
      <p className="text-[13px] font-semibold text-[#1a1a1a]">{title}</p>
      <button type="button" onClick={onClose}
        className="text-[#bbb] hover:text-[#333] text-lg leading-none cursor-pointer border-0 bg-transparent p-0.5 transition-colors">
        ✕
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold text-[#888] mb-2 uppercase tracking-wide">{children}</p>;
}

function EmptyPhotos() {
  return (
    <div className="flex flex-col items-center justify-center h-32 text-[12px] text-[#c0bbb7] text-center gap-2">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d0cbc7" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      No photos yet
    </div>
  );
}

function PhotoThumbnailGrid({
  photos,
  onAdd,
  onRemove,
}: {
  photos: EditorPhoto[];
  onAdd: (src: string) => void;
  onRemove: (photoId: string) => void;
}) {
  if (photos.length === 0) return <EmptyPhotos />;

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg bg-[#eeeceb]">
          <button
            type="button"
            onClick={() => onAdd(photo.src)}
            className="relative h-full w-full cursor-pointer border-0 p-0 hover:opacity-90 hover:ring-2 hover:ring-[#b5192c]"
          >
            <Image src={photo.src} alt="" fill className="object-cover" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(photo.id);
            }}
            className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-[11px] font-bold text-white transition-colors hover:bg-[#b5192c]"
            aria-label="Remove photo"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

function PillBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} title={title}
      className="flex items-center justify-center p-1 rounded text-[#a09c98] hover:text-[#1a1a1a] transition-colors cursor-pointer border-0 bg-transparent">
      {children}
    </button>
  );
}

function SidebarBtn({ icon, label, onClick, danger = false, active = false }: {
  icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean; active?: boolean;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-full rounded-xl py-2 px-1 border text-[9px] font-medium cursor-pointer transition-all active:scale-95 ${
        active
          ? "bg-[#fff0f0] border-[#f5c0c0] text-[#c0392b]"
          : danger
          ? "bg-white border-black/6 text-[#c0392b] hover:bg-[#fff3f2]"
          : "bg-white border-black/6 text-[#888] hover:bg-[#f5f4f2]"
      }`}>
      {icon}<span>{label}</span>
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────
const IC = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.65, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const UploadSvg   = () => <svg {...IC}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const ContributorsSvg = () => <svg {...IC}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const PlusContentSvg = () => <svg {...IC}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>;
const TextSvg     = () => <svg {...IC}><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>;
const EmojiSvg    = () => <svg {...IC}><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const StickerSvg  = () => <svg {...IC}><path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10A10 10 0 012 12c0-2.76 1.12-5.26 2.93-7.07"/><path d="M12 2v10l7.07 7.07"/></svg>;
const BgSvg       = () => <svg {...IC}><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 000 20"/><path d="M2 12h20"/></svg>;
const LayersSvg   = () => <svg {...IC}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const UndoSvg     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7v6h6"/><path d="M3 13C5.5 8 11 6 17 8s8 8 4 13"/></svg>;
const RedoSvg     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 7v6h-6"/><path d="M21 13C18.5 8 13 6 7 8S-1 16 3 21"/></svg>;
const DuplicateSvg= () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const DeleteSvg   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const ForwardSvg  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"><rect x="3" y="8" width="13" height="13" rx="2"/><path d="M8 8V5a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-3"/></svg>;
const BackwardSvg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"><rect x="8" y="3" width="13" height="13" rx="2"/><path d="M16 16v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h3"/></svg>;