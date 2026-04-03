// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef } from "react";

// const SPREAD_LABELS = [
//     { label: "Cover", page: 1 },
//     { label: "2–3", page: 2 },
//     { label: "4–5", page: 4 },
//     { label: "6–7", page: 6 },
//     { label: "8–9", page: 8 },
//     { label: "10–11", page: 10 },
//     { label: "12–13", page: 12 },
//     { label: "14–15", page: 14 },
//     { label: "16", page: 16 },
// ];

// const TOTAL_PAGES = 40;
// const CARD_BASE_H = 360;

// export default function PageEditor() {
//     const [zoom, setZoom] = useState(75);
//     const [currentPage, setCurrentPage] = useState(6);
//     const [imgSrc, setImgSrc] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const scale = zoom / 100;
//     const scaledH = Math.max(80, CARD_BASE_H * scale);
//     const spreadLabel = currentPage === 1
//         ? `Cover of ${TOTAL_PAGES}`
//         : `Page ${currentPage}–${currentPage + 1} of ${TOTAL_PAGES}`;

//     const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
//         const reader = new FileReader();
//         reader.onload = (ev) => setImgSrc(ev.target?.result as string);
//         reader.readAsDataURL(file);
//     };

//     return (
//         /*
//          * ROOT — full viewport, warm gray background (#edecea matches screenshot)
//          * flex-col: header on top, body fills rest
//          */
//         <section className="" style={{
//             backgroundImage: "url('/images/bg1.png')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//         }}>
//             <div className="max-w-4xl mx-auto flex flex-col h-dvh overflow-hidden">

//                 {/* ══════════════════════════════════
//           TOP BAR
//       ══════════════════════════════════ */}
//                 <header className="shrink-0 h-13 flex items-center gap-2 px-5 bg-transparent">
//                     {/* Heart icon in a soft pink tile */}
//                     <Link href="/">
//                         <div className="flex items-center gap-2">
//                             <Image src="/images/logo.png" width={28} height={28} alt="logo" />
//                             <span className="font-semibold text-lg">Mein HerzGeschenk</span>
//                         </div>
//                     </Link>
//                 </header>

//                 {/* ══════════════════════════════════
//           BODY ROW — canvas left, sidebar right
//       ══════════════════════════════════ */}
//                 <div className="flex min-h-0 overflow-hidden">

//                     {/* ── CANVAS COLUMN ── */}
//                     <div className="flex-1 flex flex-col min-w-0 min-h-0">

//                         {/* Scrollable canvas zone */}
//                         <div className="flex-1 overflow-auto min-h-0">
//                             <div className="min-h-full flex items-center justify-center px-4 py-5">

//                                 {/* Height-reserving wrapper (prevents layout jump on zoom) */}
//                                 <div
//                                     className="w-full max-w-155 relative shrink-0  transition-[height] duration-200"
//                                     style={{ height: scaledH }}
//                                 >
//                                     {/* Scaled card — positioned absolute so it scales from top-center */}
//                                     <div
//                                         className="absolute top-0 left-1/2 w-full max-w-155 transition-transform duration-200"
//                                         style={{
//                                             transform: `translateX(-50%) scale(${scale})`,
//                                             transformOrigin: "top center",
//                                         }}
//                                     >
                
//                                         <div
//                                             className="flex bg-white p-12.5 rounded-2xl overflow-hidden
//                                 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)]"
//                                             style={{ height: CARD_BASE_H }}
//                                         >

//                                             {/* LEFT — image flush, no border-radius on left edges */}
//                                             <div className="w-[44%] shrink-0 relative bg-[#d9d4cf]">
//                                                 {imgSrc ? (
//                                                     <Image
//                                                         src={imgSrc}
//                                                         alt="Uploaded page image"
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 ) : (
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => fileInputRef.current?.click()}
//                                                         className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2
//                                      bg-linear-to-br from-[#e6e1dc] to-[#d4cec9] cursor-pointer border-0"
//                                                     >
//                                                         <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.4" strokeLinecap="round">
//                                                             <rect x="3" y="3" width="18" height="18" rx="2" />
//                                                             <circle cx="8.5" cy="8.5" r="1.5" />
//                                                             <path d="M21 15l-5-5L5 21" />
//                                                         </svg>
//                                                         <span className="text-[11px] text-[#bbb] font-normal">Upload image</span>
//                                                     </button>
//                                                 )}
//                                                 <input
//                                                     ref={fileInputRef}
//                                                     type="file"
//                                                     accept="image/*"
//                                                     className="hidden"
//                                                     onChange={handleUpload}
//                                                 />
//                                             </div>

//                                             {/* RIGHT — text panel */}
//                                             <div className="flex-1 flex flex-col justify-center px-7 py-7">
//                                                 {/* Title */}
//                                                 <h2
//                                                     contentEditable
//                                                     suppressContentEditableWarning
//                                                     className="font-serif text-[22px] font-bold text-[#1a1a1a] leading-snug mb-3 outline-none focus:outline-none"
//                                                 >
//                                                     A Beautiful Journey
//                                                 </h2>

//                                                 {/* Body */}
//                                                 <p
//                                                     contentEditable
//                                                     suppressContentEditableWarning
//                                                     className="text-[13px] text-[#b0aba7] leading-[1.75] mb-5 outline-none focus:outline-none"
//                                                 >
//                                                     Thank you for always being there through the highs and the lows. You
//                                                     have brought so much light into my life, and I cannot imagine
//                                                     celebrating this milestone without you. Here&apos;s to all the memories
//                                                     we&apos;ve made and the countless more to come.
//                                                 </p>

//                                                 {/* Author — right aligned, italic */}
//                                                 <p
//                                                     contentEditable
//                                                     suppressContentEditableWarning
//                                                     className="text-[14px] text-[#9a9690] italic text-right pr-1 outline-none
//                                    focus:outline-none"
//                                                 >
//                                                     - Jessica M.
//                                                 </p>
//                                             </div>

//                                         </div>{/* end card */}
//                                     </div>{/* end scale wrapper */}
//                                 </div>{/* end height-reserve */}
//                             </div>
//                         </div>{/* end scrollable zone */}

//                         {/* ── BOTTOM CONTROLS (always pinned) ── */}
//                         <div className="shrink-0 flex flex-col items-center gap-2 px-4 pt-2 pb-4">

//                             {/* Zoom + page nav — pill */}
//                             <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-1.75
//                             shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/4">

//                                 <PillBtn onClick={() => setZoom(z => Math.max(25, z - 10))} title="Zoom out">
//                                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                         <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6" />
//                                     </svg>
//                                 </PillBtn>

//                                 <span className="text-[13px] font-medium text-[#1a1a1a] min-w-9 text-center tabular-nums">
//                                     {zoom}%
//                                 </span>

//                                 <PillBtn onClick={() => setZoom(z => Math.min(150, z + 10))} title="Zoom in">
//                                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                         <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
//                                     </svg>
//                                 </PillBtn>

//                                 {/* Divider */}
//                                 <span className="w-px h-3.5 bg-black/10 mx-1" />

//                                 <PillBtn onClick={() => setCurrentPage(p => Math.max(1, p - 2))} title="Previous spread">
//                                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                         <path d="M15 18l-6-6 6-6" />
//                                     </svg>
//                                 </PillBtn>

//                                 <span className="text-[13px] font-medium text-[#1a1a1a] whitespace-nowrap px-0.5">
//                                     {spreadLabel}
//                                 </span>

//                                 <PillBtn onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES - 1, p + 2))} title="Next spread">
//                                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                         <path d="M9 18l6-6-6-6" />
//                                     </svg>
//                                 </PillBtn>
//                             </div>

//                             {/* ── THUMBNAIL STRIP — no scroll, all fit ── */}
//                             <div className="w-full max-w-155 bg-white rounded-2xl px-3 py-3
//                             border border-black/4 shadow-[0_1px_4px_rgba(0,0,0,0.05)] mt-7.5">
//                                 <div className="flex items-end justify-between w-full gap-1">
//                                     {SPREAD_LABELS.map(({ label, page }) => {
//                                         const active = currentPage === page;
//                                         const isSingle = label === "Cover" || label === "16";

//                                         return (
//                                             <button
//                                                 key={label}
//                                                 type="button"
//                                                 onClick={() => setCurrentPage(page)}
//                                                 className="flex flex-col items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0 flex-1 min-w-0"
//                                             >
//                                                 {active && !isSingle ? (
//                                                     /* Active spread: two rects inside red border */
//                                                     <div className="flex gap-0.5 border-[1.8px] border-[#c0392b] rounded-[5px] p-0.5 bg-white w-full max-w-13 mx-auto">
//                                                         <div className="flex-1 rounded-xs bg-[#eeeceb]" style={{ height: 44 }} />
//                                                         <div className="flex-1 rounded-xs bg-[#e4e1de]" style={{ height: 44 }} />
//                                                     </div>
//                                                 ) : (
//                                                     /* Inactive or cover/last: single rect */
//                                                     <div
//                                                         className={`w-full max-w-9 mx-auto rounded-[5px] border transition-colors duration-150 ${active
//                                                             ? "bg-white border-[1.8px] border-[#c0392b]"
//                                                             : "bg-[#e4e1de] border-[#d8d5d2]"
//                                                             }`}
//                                                         style={{ height: 44 }}
//                                                     />
//                                                 )}
//                                                 <span className="text-[9px] text-[#b0aca8] leading-none truncate w-full text-center">
//                                                     {label}
//                                                 </span>
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             </div>

//                         </div>{/* end bottom controls */}
//                     </div>{/* end canvas column */}

//                     {/* ══════════════════════════════════
//             RIGHT SIDEBAR
//         ══════════════════════════════════ */}
//                     <div className="shrink-0 w-22 flex flex-col gap-4 py-3 px-2 bg-white rounded-2xl border border-black/6">
//                         <SidebarBtn icon={<UploadSvg />} label="Uploads" onClick={() => fileInputRef.current?.click()} />
//                         <SidebarBtn icon={<TextSvg />} label="Add Text" onClick={() => { }} />
//                         <SidebarBtn icon={<EmojiSvg />} label="Emoji" onClick={() => { }} />
//                         <SidebarBtn icon={<StickerSvg />} label="Stickers" onClick={() => { }} />
//                         <SidebarBtn icon={<AddSvg />} label="Add Page" onClick={() => { }} />
//                         <SidebarBtn icon={<TrashSvg />} label="Delete Page" onClick={() => { }} danger />
//                     </div>

//                 </div>{/* end body row */}
//             </div>
//         </section>
//     );
// }

// /* ════════════════════════════════════════
//    PILL BUTTON (zoom / nav)
// ════════════════════════════════════════ */
// function PillBtn({ onClick, title, children }: {
//     onClick: () => void; title: string; children: React.ReactNode;
// }) {
//     return (
//         <button
//             type="button"
//             onClick={onClick}
//             title={title}
//             className="flex items-center justify-center p-1 rounded text-[#a09c98]
//                  hover:text-[#1a1a1a] transition-colors duration-150 cursor-pointer border-0 bg-transparent"
//         >
//             {children}
//         </button>
//     );
// }

// /* ════════════════════════════════════════
//    SIDEBAR BUTTON
// ════════════════════════════════════════ */
// function SidebarBtn({ icon, label, onClick, danger = false }: {
//     icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean;
// }) {
//     return (
//         <button
//             type="button"
//             onClick={onClick}
//             className={`
//         flex flex-col items-center justify-center gap-1.25
//         w-full bg-white rounded-xl py-2.5 px-1
//         border border-black/6
//         text-[10px] font-medium leading-tight text-center
//         cursor-pointer transition-all duration-150
//         active:scale-95
//         ${danger
//                     ? "text-[#c0392b] hover:bg-[#fff3f2]"
//                     : "text-[#888] hover:bg-[#f5f4f2]"}
//       `}
//         >
//             {icon}
//             {label}
//         </button>
//     );
// }

// /* ════════════════════════════════════════
//    SVG ICONS
// ════════════════════════════════════════ */
// const IC = {
//     width: 20, height: 20, viewBox: "0 0 24 24",
//     fill: "none", stroke: "currentColor",
//     strokeWidth: 1.65,
//     strokeLinecap: "round" as const,
//     strokeLinejoin: "round" as const,
// };

// const UploadSvg = () => (
//     <svg {...IC}>
//         <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//         <polyline points="17 8 12 3 7 8" />
//         <line x1="12" y1="3" x2="12" y2="15" />
//     </svg>
// );
// const TextSvg = () => (
//     <svg {...IC}>
//         <path d="M4 7V4h16v3" />
//         <path d="M9 20h6" />
//         <path d="M12 4v16" />
//     </svg>
// );
// const EmojiSvg = () => (
//     <svg {...IC}>
//         <circle cx="12" cy="12" r="10" />
//         <path d="M8 13s1.5 2 4 2 4-2 4-2" />
//         <line x1="9" y1="9" x2="9.01" y2="9" />
//         <line x1="15" y1="9" x2="15.01" y2="9" />
//     </svg>
// );
// const StickerSvg = () => (
//     <svg {...IC}>
//         <path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10A10 10 0 012 12c0-2.76 1.12-5.26 2.93-7.07" />
//         <path d="M12 2v10l7.07 7.07" />
//     </svg>
// );
// const AddSvg = () => (
//     <svg {...IC}>
//         <circle cx="12" cy="12" r="10" />
//         <line x1="12" y1="8" x2="12" y2="16" />
//         <line x1="8" y1="12" x2="16" y2="12" />
//     </svg>
// );
// const TrashSvg = () => (
//     <svg {...IC}>
//         <polyline points="3 6 5 6 21 6" />
//         <path d="M19 6l-1 14H6L5 6" />
//         <path d="M10 11v6M14 11v6" />
//         <path d="M9 6V4h6v2" />
//     </svg>
// );


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

const SPREAD_LABELS = [
    { label: "Cover", page: 1 },
    { label: "2–3", page: 2 },
    { label: "4–5", page: 4 },
    { label: "6–7", page: 6 },
    { label: "8–9", page: 8 },
    { label: "10–11", page: 10 },
    { label: "12–13", page: 12 },
    { label: "14–15", page: 14 },
    { label: "16", page: 16 },
];

const TOTAL_PAGES = 40;
const CARD_BASE_H = 360;

export default function PageEditor() {
    const [zoom, setZoom] = useState(75);
    const [currentPage, setCurrentPage] = useState(6);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const panelFileRef = useRef<HTMLInputElement>(null);

    const scale = zoom / 100;
    const scaledH = Math.max(80, CARD_BASE_H * scale);
    const spreadLabel = currentPage === 1
        ? `Cover of ${TOTAL_PAGES}`
        : `Page ${currentPage}–${currentPage + 1} of ${TOTAL_PAGES}`;

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImgSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const src = ev.target?.result as string;
                setUploadedImages(prev => [src, ...prev]);
                setImgSrc(src);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    };

    return (
        /*
         * ROOT — full viewport, warm gray background (#edecea matches screenshot)
         * flex-col: header on top, body fills rest
         */
        <section className="" style={{
            backgroundImage: "url('/images/bg1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="max-w-4xl mx-auto flex flex-col h-dvh overflow-hidden">

                {/* ══════════════════════════════════
          TOP BAR
      ══════════════════════════════════ */}
                <header className="shrink-0 h-13 flex items-center gap-2 px-5 bg-transparent">
                    {/* Heart icon in a soft pink tile */}
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                </header>

                {/* ══════════════════════════════════
          BODY ROW — canvas left, sidebar right
      ══════════════════════════════════ */}
                <div className="flex min-h-0 overflow-hidden">

                    {/* ── UPLOAD PANEL (slides in from left of canvas) ── */}
                    <div className={
                        "shrink-0 flex flex-col bg-white overflow-hidden transition-[width] duration-300 ease-in-out rounded-2xl mr-2 " +
                        (uploadPanelOpen ? "w-[210px] border border-black/6" : "w-0 border-0")
                    }>
                        <div className="w-[210px] flex flex-col h-full">
                            {/* Upload Photo button */}
                            <div className="p-3 pt-4 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => panelFileRef.current?.click()}
                                    className="w-full flex items-center justify-center gap-2 bg-[#b5192c] hover:bg-[#9e1626] active:scale-[0.98] text-white font-semibold text-[13px] rounded-xl py-2.5 px-4 transition-all duration-150 cursor-pointer border-0"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

                            {/* Image grid */}
                            <div className="flex-1 overflow-y-auto px-3 pb-3">
                                {uploadedImages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-32 text-[12px] text-[#c0bbb7] text-center gap-2">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d0cbc7" strokeWidth="1.4" strokeLinecap="round">
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
                                                onClick={() => setImgSrc(src)}
                                                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-0 p-0 bg-[#eeeceb] hover:opacity-90 transition-opacity duration-150"
                                            >
                                                <img src={src} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── CANVAS COLUMN ── */}
                    <div className="flex-1 flex flex-col min-w-0 min-h-0">

                        {/* Scrollable canvas zone */}
                        <div className="flex-1 overflow-auto min-h-0">
                            <div className="min-h-full flex items-center justify-center px-4 py-5">

                                {/* Height-reserving wrapper (prevents layout jump on zoom) */}
                                <div
                                    className="w-full max-w-155 relative shrink-0  transition-[height] duration-200"
                                    style={{ height: scaledH }}
                                >
                                    {/* Scaled card — positioned absolute so it scales from top-center */}
                                    <div
                                        className="absolute top-0 left-1/2 w-full max-w-155 transition-transform duration-200"
                                        style={{
                                            transform: `translateX(-50%) scale(${scale})`,
                                            transformOrigin: "top center",
                                        }}
                                    >
                
                                        <div
                                            className="flex bg-white p-12.5 rounded-2xl overflow-hidden
                                shadow-[0_2px_6px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)]"
                                            style={{ height: CARD_BASE_H }}
                                        >

                                            {/* LEFT — image flush, no border-radius on left edges */}
                                            <div className="w-[44%] shrink-0 relative bg-[#d9d4cf]">
                                                {imgSrc ? (
                                                    <Image
                                                        src={imgSrc}
                                                        alt="Uploaded page image"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2
                                     bg-linear-to-br from-[#e6e1dc] to-[#d4cec9] cursor-pointer border-0"
                                                    >
                                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.4" strokeLinecap="round">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                                            <path d="M21 15l-5-5L5 21" />
                                                        </svg>
                                                        <span className="text-[11px] text-[#bbb] font-normal">Upload image</span>
                                                    </button>
                                                )}
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleUpload}
                                                />
                                            </div>

                                            {/* RIGHT — text panel */}
                                            <div className="flex-1 flex flex-col justify-center px-7 py-7">
                                                {/* Title */}
                                                <h2
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    className="font-serif text-[22px] font-bold text-[#1a1a1a] leading-snug mb-3 outline-none focus:outline-none"
                                                >
                                                    A Beautiful Journey
                                                </h2>

                                                {/* Body */}
                                                <p
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    className="text-[13px] text-[#b0aba7] leading-[1.75] mb-5 outline-none focus:outline-none"
                                                >
                                                    Thank you for always being there through the highs and the lows. You
                                                    have brought so much light into my life, and I cannot imagine
                                                    celebrating this milestone without you. Here&apos;s to all the memories
                                                    we&apos;ve made and the countless more to come.
                                                </p>

                                                {/* Author — right aligned, italic */}
                                                <p
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    className="text-[14px] text-[#9a9690] italic text-right pr-1 outline-none
                                   focus:outline-none"
                                                >
                                                    - Jessica M.
                                                </p>
                                            </div>

                                        </div>{/* end card */}
                                    </div>{/* end scale wrapper */}
                                </div>{/* end height-reserve */}
                            </div>
                        </div>{/* end scrollable zone */}

                        {/* ── BOTTOM CONTROLS (always pinned) ── */}
                        <div className="shrink-0 flex flex-col items-center gap-2 px-4 pt-2 pb-4">

                            {/* Zoom + page nav — pill */}
                            <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-1.75
                            shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/4">

                                <PillBtn onClick={() => setZoom(z => Math.max(25, z - 10))} title="Zoom out">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6" />
                                    </svg>
                                </PillBtn>

                                <span className="text-[13px] font-medium text-[#1a1a1a] min-w-9 text-center tabular-nums">
                                    {zoom}%
                                </span>

                                <PillBtn onClick={() => setZoom(z => Math.min(150, z + 10))} title="Zoom in">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
                                    </svg>
                                </PillBtn>

                                {/* Divider */}
                                <span className="w-px h-3.5 bg-black/10 mx-1" />

                                <PillBtn onClick={() => setCurrentPage(p => Math.max(1, p - 2))} title="Previous spread">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </PillBtn>

                                <span className="text-[13px] font-medium text-[#1a1a1a] whitespace-nowrap px-0.5">
                                    {spreadLabel}
                                </span>

                                <PillBtn onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES - 1, p + 2))} title="Next spread">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </PillBtn>
                            </div>

                            {/* ── THUMBNAIL STRIP — no scroll, all fit ── */}
                            <div className="w-full max-w-155 bg-white rounded-2xl px-3 py-3
                            border border-black/4 shadow-[0_1px_4px_rgba(0,0,0,0.05)] mt-7.5">
                                <div className="flex items-end justify-between w-full gap-1">
                                    {SPREAD_LABELS.map(({ label, page }) => {
                                        const active = currentPage === page;
                                        const isSingle = label === "Cover" || label === "16";

                                        return (
                                            <button
                                                key={label}
                                                type="button"
                                                onClick={() => setCurrentPage(page)}
                                                className="flex flex-col items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0 flex-1 min-w-0"
                                            >
                                                {active && !isSingle ? (
                                                    /* Active spread: two rects inside red border */
                                                    <div className="flex gap-0.5 border-[1.8px] border-[#c0392b] rounded-[5px] p-0.5 bg-white w-full max-w-13 mx-auto">
                                                        <div className="flex-1 rounded-xs bg-[#eeeceb]" style={{ height: 44 }} />
                                                        <div className="flex-1 rounded-xs bg-[#e4e1de]" style={{ height: 44 }} />
                                                    </div>
                                                ) : (
                                                    /* Inactive or cover/last: single rect */
                                                    <div
                                                        className={`w-full max-w-9 mx-auto rounded-[5px] border transition-colors duration-150 ${active
                                                            ? "bg-white border-[1.8px] border-[#c0392b]"
                                                            : "bg-[#e4e1de] border-[#d8d5d2]"
                                                            }`}
                                                        style={{ height: 44 }}
                                                    />
                                                )}
                                                <span className="text-[9px] text-[#b0aca8] leading-none truncate w-full text-center">
                                                    {label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>{/* end bottom controls */}
                    </div>{/* end canvas column */}

                    {/* ══════════════════════════════════
            RIGHT SIDEBAR
        ══════════════════════════════════ */}
                    <div className="shrink-0 w-22 flex flex-col gap-4 py-3 px-2 bg-white rounded-2xl border border-black/6">
                        <SidebarBtn
                            icon={<UploadSvg />}
                            label="Uploads"
                            onClick={() => setUploadPanelOpen(v => !v)}
                            active={uploadPanelOpen}
                        />
                        <SidebarBtn icon={<TextSvg />} label="Add Text" onClick={() => { }} />
                        <SidebarBtn icon={<EmojiSvg />} label="Emoji" onClick={() => { }} />
                        <SidebarBtn icon={<StickerSvg />} label="Stickers" onClick={() => { }} />
                        <SidebarBtn icon={<AddSvg />} label="Add Page" onClick={() => { }} />
                        <SidebarBtn icon={<TrashSvg />} label="Delete Page" onClick={() => { }} danger />
                    </div>

                </div>{/* end body row */}
            </div>
        </section>
    );
}

/* ════════════════════════════════════════
   PILL BUTTON (zoom / nav)
════════════════════════════════════════ */
function PillBtn({ onClick, title, children }: {
    onClick: () => void; title: string; children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className="flex items-center justify-center p-1 rounded text-[#a09c98]
                 hover:text-[#1a1a1a] transition-colors duration-150 cursor-pointer border-0 bg-transparent"
        >
            {children}
        </button>
    );
}

/* ════════════════════════════════════════
   SIDEBAR BUTTON
════════════════════════════════════════ */
function SidebarBtn({ icon, label, onClick, danger = false, active = false }: {
    icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean; active?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center gap-1.25
        w-full rounded-xl py-2.5 px-1
        border text-[10px] font-medium leading-tight text-center
        cursor-pointer transition-all duration-150
        active:scale-95
        ${active
                    ? "bg-[#fff0f0] border-[#f5c0c0] text-[#c0392b]"
                    : danger
                        ? "bg-white border-black/6 text-[#c0392b] hover:bg-[#fff3f2]"
                        : "bg-white border-black/6 text-[#888] hover:bg-[#f5f4f2]"}
      `}
        >
            {icon}
            {label}
        </button>
    );
}

/* ════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════ */
const IC = {
    width: 20, height: 20, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
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
const AddSvg = () => (
    <svg {...IC}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);
const TrashSvg = () => (
    <svg {...IC}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);