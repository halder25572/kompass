"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Konva from "konva";
import { useBookStore } from "@/store/useBookStore";
import { exportBookToPDF } from "./utils/exportPdf";
import CanvasPage from "./CanvasPage";
import Toolbar from "./Toolbar";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function BookEditor() {
  const { zoom, setZoom, currentPage, setCurrentPage, pages, addElement, addPage } = useBookStore();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const panelFileRef = useRef<HTMLInputElement>(null);
  const stageRefs = useRef<(Konva.Stage | null)[]>([]);

  const scale = zoom / 100;
  const totalPages = pages.length;
  const spreadLabel = `Page ${currentPage} of ${totalPages}`;

  const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setUploadedImages((prev) => [src, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleImageClick = (src: string) => {
    addElement(currentPage, {
      id: `img-${Date.now()}`,
      type: "image",
      src,
      x: A4_WIDTH / 2 - 100,
      y: A4_HEIGHT / 2 - 100,
      width: 200,
      height: 200,
      zIndex: pages.find((p) => p.id === currentPage)?.elements.length || 0,
    });
  };

  const handleAddText = () => {
    addElement(currentPage, {
      id: `text-${Date.now()}`,
      type: "text",
      text: "Click to edit text",
      x: A4_WIDTH / 2 - 100,
      y: A4_HEIGHT / 2 - 20,
      fontSize: 32,
      fontFamily: "Arial",
      fill: "#000000",
      width: 200,
      textAlign: "center",
      zIndex: pages.find((p) => p.id === currentPage)?.elements.length || 0,
    });
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportBookToPDF(pages, A4_WIDTH, A4_HEIGHT);
    } catch (error) {
      console.error("Failed to export PDF", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col h-dvh overflow-hidden">
        <header className="shrink-0 h-13 flex items-center justify-between gap-2 px-5 bg-transparent mb-10 mt-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" width={28} height={28} alt="logo" />
              <span className="font-semibold text-lg text-white">Mein HerzGeschenk</span>
            </div>
          </Link>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[#b5192c] hover:bg-[#9e1626] text-white font-semibold text-sm rounded-xl py-2 px-4 transition-all disabled:opacity-50"
          >
            {isExporting ? "Generating HD PDF..." : "Export to PDF"}
          </button>
        </header>

        <div className="flex min-h-0 overflow-hidden">
          <div
            className={
              "shrink-0 flex flex-col bg-white overflow-hidden transition-[width] duration-300 ease-in-out rounded-2xl mr-2 " +
              (uploadPanelOpen ? "w-52 border border-black/10" : "w-0 border-0")
            }
          >
            <div className="w-52 flex flex-col h-full">
              <div className="p-3 pt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => panelFileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-[#b5192c] hover:bg-[#9e1626] text-white font-semibold text-[13px] rounded-xl py-2.5 px-4 transition-all"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  Upload Photo
                </button>
                <input
                  ref={panelFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePanelUpload}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-3">
                {uploadedImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-[12px] text-[#c0bbb7] text-center gap-2">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d0cbc7"
                      strokeWidth="1.4"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    No photos yet
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5">
                    {uploadedImages.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleImageClick(src)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-0 p-0 bg-[#eeeceb] hover:opacity-90"
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
            <div className="flex justify-center mb-4">
              <Toolbar />
            </div>

            <div className="flex-1 overflow-auto bg-gray-100/50 rounded-2xl border border-black/10">
              <div 
                className="flex items-center justify-center p-8 min-h-full"
                style={{ 
                  minWidth: `${A4_WIDTH * scale}px`, 
                  minHeight: `${A4_HEIGHT * scale}px` 
                }}
              >
                <div
                  className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-transform duration-200 origin-center"
                  style={{
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
                    transform: `scale(${scale})`,
                  }}
                >
                  <CanvasPage
                    pageId={currentPage}
                    width={A4_WIDTH}
                    height={A4_HEIGHT}
                    stageRef={(node) => {
                      if (stageRefs.current) {
                        stageRefs.current[currentPage] = node;
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 shrink-0 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-lg border border-black/10">
                <PillBtn onClick={() => setZoom(Math.max(25, zoom - 10))} title="Zoom out">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                </PillBtn>

                <span className="text-[13px] font-medium text-[#1a1a1a] min-w-9 text-center tabular-nums">
                  {zoom}%
                </span>

                <PillBtn onClick={() => setZoom(Math.min(200, zoom + 10))} title="Zoom in">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </PillBtn>

                <span className="w-px h-4 bg-black/20 mx-2" />

                <PillBtn onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} title="Previous page">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </PillBtn>

                <span className="text-[13px] font-medium text-[#1a1a1a] whitespace-nowrap px-2">
                  {spreadLabel}
                </span>

                <PillBtn onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} title="Next page">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </PillBtn>

                <span className="w-px h-4 bg-black/20 mx-2" />
                
                <button 
                  onClick={() => addPage()}
                  className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-800 transition-colors"
                >
                  + Add Page
                </button>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-22 flex flex-col gap-4 py-3 px-2 bg-white rounded-2xl border border-black/6 ml-2">
            <SidebarBtn
              icon={<UploadSvg />}
              label="Uploads"
              onClick={() => setUploadPanelOpen((v) => !v)}
              active={uploadPanelOpen}
            />
            <SidebarBtn icon={<TextSvg />} label="Add Text" onClick={handleAddText} />
            <SidebarBtn icon={<EmojiSvg />} label="Emoji" onClick={() => {}} />
            <SidebarBtn icon={<StickerSvg />} label="Stickers" onClick={() => {}} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PillBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex items-center justify-center p-1 rounded text-[#a09c98] hover:text-[#1a1a1a] transition-colors cursor-pointer border-0 bg-transparent"
    >
      {children}
    </button>
  );
}

function SidebarBtn({
  icon,
  label,
  onClick,
  danger = false,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.25 w-full rounded-xl py-2.5 px-1 border text-[10px] font-medium cursor-pointer transition-all active:scale-95 ${
        active
          ? "bg-[#fff0f0] border-[#f5c0c0] text-[#c0392b]"
          : danger
            ? "bg-white border-black/6 text-[#c0392b] hover:bg-[#fff3f2]"
            : "bg-white border-black/6 text-[#888] hover:bg-[#f5f4f2]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

const IC = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.65,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const UploadSvg = () => (
  <svg {...IC}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const TextSvg = () => (
  <svg {...IC}>
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
);
const EmojiSvg = () => (
  <svg {...IC}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 13s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
const StickerSvg = () => (
  <svg {...IC}>
    <path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10A10 10 0 012 12c0-2.76 1.12-5.26 2.93-7.07" />
    <path d="M12 2v10l7.07 7.07" />
  </svg>
);
