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
import { useBookStore } from "@/store/useBookStore";
import { fetchBookDetails, fetchBookPageStyles, fetchCoverPageStyles } from "@/services/api";
import { exportBookToPDF } from "./utils/exportPdf";
import CanvasPage from "./CanvasPage";
import Toolbar from "./Toolbar";

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

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<"upload"|"emoji"|"sticker"|"bg"|"layers"|null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [coverStylesList, setCoverStylesList] = useState<any[]>([]);
  const [bookStylesList, setBookStylesList] = useState<any[]>([]);

  // ── Format state (per-book, user picks once) ──────────────────────────
  const [bookFormat, setBookFormat] = useState<BookFormat>("a4-landscape");
  const fmt = FORMATS[bookFormat];
  const A4_WIDTH  = fmt.width;
  const A4_HEIGHT = fmt.height;

  const panelFileRef = useRef<HTMLInputElement>(null);
  const stageRefs   = useRef<(Konva.Stage | null)[]>([]);
  const hasHydratedPagesRef = useRef(false);

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
    console.log("BookEditor bookId:", bookId);
    if (!bookId) return;

    if (!hasHydratedPagesRef.current) {
      const savedBookStateRaw = localStorage.getItem(`book-editor-state:${bookId}`);
      if (savedBookStateRaw) {
        try {
          const savedBookState = JSON.parse(savedBookStateRaw) as {
            pages?: typeof pages;
            currentPage?: number;
          };

          if (Array.isArray(savedBookState.pages) && savedBookState.pages.length > 0) {
            useBookStore.setState({
              pages: savedBookState.pages,
              currentPage: savedBookState.currentPage ?? 1,
            });
          }
        } catch (error) {
          console.warn("Failed to restore saved book state", error);
        }
      }

      hasHydratedPagesRef.current = true;
    }

    let isActive = true;

    const loadBookStyles = async () => {
      try {
        console.log("Starting loadBookStyles for bookId:", bookId);

        const [bookDetailsResponse, bookStylesResponse, coverStylesResponse] = await Promise.all([
          fetchBookDetails(bookId),
          fetchBookPageStyles().catch((error) => {
            console.warn("Failed to load book page styles", error);
            return null;
          }),
          fetchCoverPageStyles().catch((error) => {
            console.warn("Failed to load cover page styles", error);
            return null;
          }),
        ]);

        const book = bookDetailsResponse.data.book_details as {
          cover_style?: { id?: number | null; name?: string; image?: string[] } | null;
          page_style?: { id?: number | null; name?: string; image?: string[] } | null;
          book_title?: string;
          book_subtitle?: string;
          recipient_name?: string;
        };
        const coverImageUrl = book.cover_style?.image?.[0] ?? null;
        const pageImageUrl = book.page_style?.image?.[0] ?? null;

        console.log("bookDetails:", book);
        console.log("cover_style:", book.cover_style);
        console.log("page_style:", book.page_style);
        console.log("Applying cover image:", coverImageUrl);
        console.log("Applying page image:", pageImageUrl);

        // store available style lists for UI
        setCoverStylesList(coverStylesResponse?.data ?? []);
        setBookStylesList(bookStylesResponse?.data ?? []);

        if (!isActive) return;

        console.log("coverImageUrl before setPageBackground:", coverImageUrl);
        console.log("pageImageUrl before setPageBackground:", pageImageUrl);

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

    localStorage.setItem(
      `book-editor-state:${bookId}`,
      JSON.stringify({
        pages,
        currentPage,
      })
    );
  }, [bookId, pages, currentPage]);

  const scale       = zoom / 100;
  const totalPages  = pages.length;
  const spreadLabel = `Page ${currentPage} of ${totalPages}`;
  const page        = pages.find((p) => p.id === currentPage);

  function togglePanel(name: typeof activePanel) {
    setActivePanel(prev => prev === name ? null : name);
  }

  const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setUploadedImages(prev => [src, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleImageClick = (src: string) => {
    addElement(currentPage, {
      id: `img-${Date.now()}`, type: "image", src,
      x: A4_WIDTH / 2 - 100, y: A4_HEIGHT / 2 - 100,
      width: 200, height: 200,
      zIndex: page?.elements.length || 0,
    });
  };

  const handleAddText = () => {
    addElement(currentPage, {
      id: `text-${Date.now()}`, type: "text",
      text: "Click to edit text",
      x: A4_WIDTH / 2 - 100, y: A4_HEIGHT / 2 - 20,
      fontSize: 32, fontFamily: "Arial", fill: "#000000",
      width: 200, textAlign: "center",
      zIndex: page?.elements.length || 0,
    });
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    addElement(currentPage, {
      id: `text-${Date.now()}`, type: "text",
      text: emojiData.emoji,
      x: A4_WIDTH / 2 - 40 + (Math.random() * 80 - 40),
      y: A4_HEIGHT / 2 - 40 + (Math.random() * 80 - 40),
      fontSize: 72, fontFamily: "Arial", fill: "#000000",
      width: 100, textAlign: "center",
      zIndex: page?.elements.length || 0,
    });
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportBookToPDF(pages, A4_WIDTH, A4_HEIGHT);
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setIsExporting(false);
    }
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
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
              <span className="font-semibold text-lg text-white">Mein HerzGeschenk</span>
            </div>
          </Link>

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
            <span className="w-px h-5 bg-white/30 mx-1" />
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 bg-[#b5192c] hover:bg-[#9e1626] text-white font-semibold text-sm rounded-xl py-2 px-4 transition-all disabled:opacity-50"
            >
              {isExporting ? "Generating HD PDF…" : "Export to PDF"}
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
                  {uploadedImages.length === 0
                    ? <EmptyPhotos />
                    : <div className="grid grid-cols-2 gap-1.5">
                        {uploadedImages.map((src, i) => (
                          <button key={i} type="button" onClick={() => handleImageClick(src)}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-0 p-0 bg-[#eeeceb] hover:opacity-90 hover:ring-2 hover:ring-[#b5192c]">
                            <Image src={src} alt="" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                  }
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
                        <button key={i} type="button" onClick={() => { console.log("setPageBackground called from: Background Solid (left panel)", { page: currentPage, value: color }); setPageBackground(currentPage, color); }}
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
                            onClick={() => { console.log("setPageBackground called from: Theme Preset", { page: currentPage, styleId: s.id }); setPageBackground(currentPage, bg, s.id); }}
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
                        <button key={i} type="button" onClick={() => { console.log("setPageBackground called from: Background Gradient (left panel)", { page: currentPage, value: g.value }); setPageBackground(currentPage, g.value); }}
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
                        onChange={e => { console.log("setPageBackground called from: Background Custom Color (left panel)", { page: currentPage, value: e.target.value }); setPageBackground(currentPage, e.target.value); }}
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
                    className="shadow-[0_2px_20px_rgba(0,0,0,0.15)] transition-transform duration-200 origin-center w-full h-full"
                    style={{ background: page?.background ?? "#ffffff" }}
                  >
                    <CanvasPage
                      pageId={currentPage}
                      width={A4_WIDTH}
                      height={A4_HEIGHT}
                      stageRef={(node) => { if (stageRefs.current) stageRefs.current[currentPage] = node; }}
                    />
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