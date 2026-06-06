"use client";

import { useBookStore, ToolType } from "@/store/useBookStore";
import { useEffect, useCallback } from "react";

const FONTS = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Impact",
];

export default function Toolbar() {
  const activeTool = useBookStore((s) => s.activeTool);
  const setActiveTool = useBookStore((s) => s.setActiveTool);
  const strokeColor = useBookStore((s) => s.strokeColor);
  const setStrokeColor = useBookStore((s) => s.setStrokeColor);
  const strokeWidth = useBookStore((s) => s.strokeWidth);
  const setStrokeWidth = useBookStore((s) => s.setStrokeWidth);
  const selectedElementId = useBookStore((s) => s.selectedElementId);
  const currentPage = useBookStore((s) => s.currentPage);
  const pages = useBookStore((s) => s.pages);
  const undo = useBookStore((s) => s.undo);
  const redo = useBookStore((s) => s.redo);
  const past = useBookStore((s) => s.past);
  const future = useBookStore((s) => s.future);
  const deleteElement = useBookStore((s) => s.deleteElement);
  const duplicateElement = useBookStore((s) => s.duplicateElement);
  const bringForward = useBookStore((s) => s.bringForward);
  const sendBackward = useBookStore((s) => s.sendBackward);
  const updateElement = useBookStore((s) => s.updateElement);

  const page = pages.find((p) => p.id === currentPage);
  const selectedEl = page?.elements.find((e) => e.id === selectedElementId);
  const isTextSelected = selectedEl?.type === "text";

  // keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        if (selectedElementId) duplicateElement(currentPage, selectedElementId);
      }
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedElementId
      ) {
        e.preventDefault();
        deleteElement(currentPage, selectedElementId);
      }
    },
    [undo, redo, selectedElementId, currentPage, deleteElement, duplicateElement]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
    {
      id: "select",
      label: "Select",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 3l14 9-7 1-4 7z" />
        </svg>
      ),
    },
    {
      id: "pen",
      label: "Pen",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      id: "eraser",
      label: "Eraser",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 20H7L3 16l10-10 7 7-3.5 3.5" />
          <path d="M6.5 17.5l3-3" />
        </svg>
      ),
    },
    {
      id: "rect",
      label: "Rect",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      ),
    },
    {
      id: "circle",
      label: "Circle",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      id: "line",
      label: "Line",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="19" x2="19" y2="5" />
        </svg>
      ),
    },
  ];

  function updateText(updates: Record<string, unknown>) {
    if (!selectedElementId) return;
    updateElement(currentPage, selectedElementId, updates);
  }

  function toggleFontStyle(style: string) {
    if (!selectedEl) return;
    const current = selectedEl.fontStyle || "";
    const has = current.includes(style);
    const newStyle = has
      ? current.replace(style, "").trim()
      : (current + " " + style).trim();
    updateText({ fontStyle: newStyle });
  }

  function toggleUnderline() {
    if (!selectedEl) return;
    const has = selectedEl.textDecoration === "underline";
    updateText({ textDecoration: has ? "" : "underline" });
  }

  const isBold = selectedEl?.fontStyle?.includes("bold");
  const isItalic = selectedEl?.fontStyle?.includes("italic");
  const isUnderline = selectedEl?.textDecoration === "underline";

  return (
    <div className="flex items-center gap-1 bg-white rounded-2xl border border-black/8 px-3 py-1.5 shadow-sm flex-wrap">

      {/* Undo / Redo */}
      <TBtn
        onClick={undo}
        disabled={past.length === 0}
        title="Undo (Ctrl+Z)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 14L4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 010 11H11" />
        </svg>
      </TBtn>
      <TBtn
        onClick={redo}
        disabled={future.length === 0}
        title="Redo (Ctrl+Y)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 14l5-5-5-5" />
          <path d="M20 9H9.5a5.5 5.5 0 000 11H13" />
        </svg>
      </TBtn>

      <Divider />

      {/* Draw tools */}
      {tools.map((t) => (
        <TBtn
          key={t.id}
          onClick={() => setActiveTool(t.id)}
          active={activeTool === t.id}
          title={t.label}
        >
          {t.icon}
        </TBtn>
      ))}

      <Divider />

      {/* Stroke color */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#999]">Color</span>
        <label className="relative cursor-pointer">
          <span
            className="block w-6 h-6 rounded-md border border-black/15 cursor-pointer"
            style={{ background: strokeColor }}
          />
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>

      {/* Stroke width */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#999]">Width</span>
        <input
          type="range"
          min={1}
          max={40}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-16 accent-[#b5192c]"
        />
        <span className="text-[11px] text-[#555] w-4 tabular-nums">{strokeWidth}</span>
      </div>

      {/* ── Selected element actions ── */}
      {selectedElementId && (
        <>
          <Divider />

          {/* Text formatting — only when text is selected */}
          {isTextSelected && (
            <>
              {/* Font family */}
              <select
                className="text-[11px] border border-black/10 rounded-lg px-1.5 py-1 bg-white text-[#333] cursor-pointer outline-none"
                value={selectedEl?.fontFamily || "Arial"}
                onChange={(e) => updateText({ fontFamily: e.target.value })}
              >
                {FONTS.map((f) => (
                  <option key={f} value={f} style={{ fontFamily: f }}>
                    {f}
                  </option>
                ))}
              </select>

              {/* Font size */}
              <input
                type="number"
                min={8}
                max={200}
                className="text-[11px] border border-black/10 rounded-lg px-1.5 py-1 w-14 bg-white text-[#333] outline-none"
                value={selectedEl?.fontSize || 32}
                onChange={(e) =>
                  updateText({ fontSize: Number(e.target.value) })
                }
              />

              {/* Bold */}
              <TBtn
                onClick={() => toggleFontStyle("bold")}
                active={!!isBold}
                title="Bold"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 4h8a4 4 0 010 8H6z" />
                  <path d="M6 12h9a4 4 0 010 8H6z" />
                </svg>
              </TBtn>

              {/* Italic */}
              <TBtn
                onClick={() => toggleFontStyle("italic")}
                active={!!isItalic}
                title="Italic"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="19" y1="4" x2="10" y2="4" />
                  <line x1="14" y1="20" x2="5" y2="20" />
                  <line x1="15" y1="4" x2="9" y2="20" />
                </svg>
              </TBtn>

              {/* Underline */}
              <TBtn
                onClick={toggleUnderline}
                active={!!isUnderline}
                title="Underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 4v6a6 6 0 0012 0V4" />
                  <line x1="4" y1="20" x2="20" y2="20" />
                </svg>
              </TBtn>

              {/* Text align */}
              <TBtn
                onClick={() => updateText({ textAlign: "left" })}
                active={selectedEl?.textAlign === "left"}
                title="Align left"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </svg>
              </TBtn>
              <TBtn
                onClick={() => updateText({ textAlign: "center" })}
                active={selectedEl?.textAlign === "center"}
                title="Align center"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </TBtn>
              <TBtn
                onClick={() => updateText({ textAlign: "right" })}
                active={selectedEl?.textAlign === "right"}
                title="Align right"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="9" y1="12" x2="21" y2="12" />
                  <line x1="6" y1="18" x2="21" y2="18" />
                </svg>
              </TBtn>

              {/* Text color */}
              <label className="relative cursor-pointer flex items-center gap-1">
                <span className="text-[11px] text-[#999]">Fill</span>
                <span
                  className="block w-6 h-6 rounded-md border border-black/15"
                  style={{ background: selectedEl?.fill || "#000000" }}
                />
                <input
                  type="color"
                  value={selectedEl?.fill || "#000000"}
                  onChange={(e) => updateText({ fill: e.target.value })}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </label>

              {/* Opacity */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#999]">Opacity</span>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={selectedEl?.opacity ?? 1}
                  onChange={(e) => updateText({ opacity: Number(e.target.value) })}
                  className="w-14 accent-[#b5192c]"
                />
              </div>

              <Divider />
            </>
          )}

          {/* Layer order */}
          <TBtn
            onClick={() => bringForward(currentPage, selectedElementId)}
            title="Bring Forward"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              <path d="M12 2l3 3-3 3" />
            </svg>
          </TBtn>
          <TBtn
            onClick={() => sendBackward(currentPage, selectedElementId)}
            title="Send Backward"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              <path d="M12 22l3-3-3-3" />
            </svg>
          </TBtn>

          {/* Duplicate */}
          <TBtn
            onClick={() => duplicateElement(currentPage, selectedElementId)}
            title="Duplicate (Ctrl+D)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="8" y="8" width="13" height="13" rx="2" />
              <path d="M3 16V5a2 2 0 012-2h11" />
            </svg>
          </TBtn>

          {/* Delete */}
          <TBtn
            onClick={() => deleteElement(currentPage, selectedElementId)}
            title="Delete (Del)"
            danger
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </TBtn>
        </>
      )}
    </div>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-black/10 mx-1 shrink-0" />;
}

function TBtn({
  onClick,
  children,
  active,
  disabled,
  title,
  danger,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center justify-center w-7 h-7 rounded-lg border text-[11px] cursor-pointer transition-all
        ${
          active
            ? "bg-[#fff0f0] border-[#f5c0c0] text-[#b5192c]"
            : danger
              ? "bg-white border-transparent text-[#b5192c] hover:bg-[#fff0f0]"
              : "bg-white border-transparent text-[#666] hover:bg-[#f5f4f2] hover:text-[#111]"
        }
        disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}