"use client";

import { useBookStore } from '@/store/useBookStore';

export default function Toolbar() {
  const { activeTool, setActiveTool, strokeColor, setStrokeColor, strokeWidth, setStrokeWidth, deleteSelectedElement } = useBookStore();

  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md border border-black/5">
      <ToolButton
        active={activeTool === 'select'}
        onClick={() => setActiveTool('select')}
        title="Select"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      </ToolButton>

      <ToolButton
        active={activeTool === 'pen'}
        onClick={() => setActiveTool('pen')}
        title="Pen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        </svg>
      </ToolButton>

      <ToolButton
        active={activeTool === 'eraser'}
        onClick={() => setActiveTool('eraser')}
        title="Eraser"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 20H7L3 16l10-10 8 8-1 6z" />
        </svg>
      </ToolButton>

      <div className="w-px h-6 bg-black/10" />

      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-600">Color:</label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-black/10"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-600">Width:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-20"
        />
        <span className="text-xs text-gray-600 w-6">{strokeWidth}</span>
      </div>

      <div className="w-px h-6 bg-black/10" />

      <button
        onClick={deleteSelectedElement}
        className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Delete Selected (Del)"
      >
        Delete
      </button>
    </div>
  );
}

function ToolButton({ active, onClick, title, children }: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors ${
        active
          ? 'bg-[#b5192c] text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}
