// import { create } from 'zustand';

// export interface PageElement {
//   id: string;
//   type: 'image' | 'text' | 'shape' | 'line';
//   x: number;
//   y: number;
//   width?: number;
//   height?: number;
//   rotation?: number;
//   src?: string;
//   text?: string;
//   points?: number[];
//   stroke?: string;
//   strokeWidth?: number;
//   fill?: string;
//   fontSize?: number;
//   fontFamily?: string;
//   fontStyle?: string;
//   textDecoration?: string;
//   textAlign?: 'left' | 'center' | 'right';
//   shapeType?: 'rect' | 'circle';
//   radius?: number;
//   zIndex: number;
//   listType?: 'none' | 'bullet' | 'number';
//   textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
//   lineHeight?: number;
//   letterSpacing?: number;
//   opacity?: number;
// }

// export interface Page {
//   id: number;
//   elements: PageElement[];
// }

// interface BookStore {
//   pages: Page[];
//   activeTool: 'select' | 'pen' | 'text' | 'image' | 'shape' | 'eraser';
//   activeSubTool: string;
//   zoom: number;
//   strokeColor: string;
//   strokeWidth: number;
//   currentPage: number;
//   selectedElementId: string | null;
//   isReadOnly: boolean;
  
//   setPages: (pages: Page[]) => void;
//   setActiveTool: (tool: 'select' | 'pen' | 'text' | 'image' | 'shape' | 'eraser', subTool?: string) => void;
//   setZoom: (zoom: number) => void;
//   setStrokeColor: (color: string) => void;
//   setStrokeWidth: (width: number) => void;
//   setCurrentPage: (page: number) => void;
//   setSelectedElement: (id: string | null) => void;
//   addElement: (pageId: number, element: PageElement) => void;
//   updateElement: (pageId: number, elementId: string, updates: Partial<PageElement>) => void;
//   deleteElement: (pageId: number, elementId: string) => void;
//   deleteSelectedElement: () => void;
//   addPage: () => void;
// }

// export const useBookStore = create<BookStore>((set, get) => ({
//   pages: [{ id: 1, elements: [] }],
//   activeTool: 'select',
//   activeSubTool: 'select',
//   zoom: 75,
//   strokeColor: '#000000',
//   strokeWidth: 2,
//   currentPage: 1,
//   selectedElementId: null,
//   isReadOnly: false,

//   setPages: (pages) => set({ pages }),
//   setActiveTool: (tool, subTool = 'select') => set({ activeTool: tool, activeSubTool: subTool }),
//   setZoom: (zoom) => set({ zoom }),
//   setStrokeColor: (color) => set({ strokeColor: color }),
//   setStrokeWidth: (width) => set({ strokeWidth: width }),
//   setCurrentPage: (page) => set({ currentPage: page }),
//   setSelectedElement: (id) => set({ selectedElementId: id }),

//   addElement: (pageId, element) => set((state) => ({
//     pages: state.pages.map(p =>
//       p.id === pageId ? { ...p, elements: [...p.elements, element] } : p
//     )
//   })),

//   updateElement: (pageId, elementId, updates) => set((state) => ({
//     pages: state.pages.map(p =>
//       p.id === pageId
//         ? {
//             ...p,
//             elements: p.elements.map(el =>
//               el.id === elementId ? { ...el, ...updates } : el
//             )
//           }
//         : p
//     )
//   })),

//   deleteElement: (pageId, elementId) => set((state) => ({
//     pages: state.pages.map(p =>
//       p.id === pageId
//         ? { ...p, elements: p.elements.filter(el => el.id !== elementId) }
//         : p
//     )
//   })),

//   deleteSelectedElement: () => {
//     const { selectedElementId, currentPage, pages } = get();
//     if (selectedElementId) {
//       set({
//         pages: pages.map(p =>
//           p.id === currentPage
//             ? { ...p, elements: p.elements.filter(el => el.id !== selectedElementId) }
//             : p
//         ),
//         selectedElementId: null
//       });
//     }
//   },

//   addPage: () => set((state) => ({
//     pages: [...state.pages, { id: state.pages.length + 1, elements: [] }],
//     currentPage: state.pages.length + 1,
//   })),
// }));


import { create } from "zustand";

export type ToolType =
  | "select"
  | "pen"
  | "eraser"
  | "rect"
  | "circle"
  | "line";

export interface BookElement {
  id: string;
  type: "image" | "text" | "line" | "shape";
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  zIndex: number;
  // image
  src?: string;
  // text
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  fill?: string;
  lineHeight?: number;
  letterSpacing?: number;
  listType?: string;
  textTransform?: string;
  // text shadow
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  // line / draw
  points?: number[];
  stroke?: string;
  strokeWidth?: number;
  // shape
  shapeType?: "rect" | "circle" | "line";
  radius?: number;
  // shape fill
  shapeFill?: string;
}

export interface BookPage {
  id: number;
  elements: BookElement[];
  background: string; // color OR gradient string
}

// Backwards-compatible aliases for older code that used `Page`/`PageElement`
export type PageElement = BookElement;
export type Page = BookPage;

interface HistoryEntry {
  pages: BookPage[];
}

interface BookStore {
  pages: BookPage[];
  currentPage: number;
  zoom: number;
  activeTool: ToolType;
  strokeColor: string;
  strokeWidth: number;
  selectedElementId: string | null;

  // history
  past: HistoryEntry[];
  future: HistoryEntry[];

  // actions
  setZoom: (z: number) => void;
  setCurrentPage: (p: number) => void;
  setActiveTool: (t: ToolType) => void;
  setStrokeColor: (c: string) => void;
  setStrokeWidth: (w: number) => void;
  setSelectedElement: (id: string | null) => void;

  addPage: () => void;
  addElement: (pageId: number, el: BookElement) => void;
  updateElement: (pageId: number, id: string, updates: Partial<BookElement>) => void;
  deleteElement: (pageId: number, id: string) => void;
  duplicateElement: (pageId: number, id: string) => void;
  bringForward: (pageId: number, id: string) => void;
  sendBackward: (pageId: number, id: string) => void;
  setPageBackground: (pageId: number, color: string) => void;

  undo: () => void;
  redo: () => void;
}

const initialPage: BookPage = {
  id: 1,
  elements: [],
  background: "#ffffff",
};

function clonePages(pages: BookPage[]): BookPage[] {
  return JSON.parse(JSON.stringify(pages));
}

export const useBookStore = create<BookStore>((set, get) => ({
  pages: [initialPage],
  currentPage: 1,
  zoom: 75,
  activeTool: "select",
  strokeColor: "#000000",
  strokeWidth: 3,
  selectedElementId: null,
  past: [],
  future: [],

  setZoom: (z) => set({ zoom: z }),
  setCurrentPage: (p) => set({ currentPage: p }),
  setActiveTool: (t) => set({ activeTool: t }),
  setStrokeColor: (c) => set({ strokeColor: c }),
  setStrokeWidth: (w) => set({ strokeWidth: w }),
  setSelectedElement: (id) => set({ selectedElementId: id }),

  addPage: () => {
    const { pages, past } = get();
    const newId = pages.length > 0 ? Math.max(...pages.map((p) => p.id)) + 1 : 1;
    const newPages = [...pages, { id: newId, elements: [], background: "#ffffff" }];
    set({
      pages: newPages,
      currentPage: newId,
      past: [...past, { pages: clonePages(pages) }],
      future: [],
    });
  },

  addElement: (pageId, el) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) =>
      p.id === pageId ? { ...p, elements: [...p.elements, el] } : p
    );
    set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
  },

  updateElement: (pageId, id, updates) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) =>
      p.id === pageId
        ? {
            ...p,
            elements: p.elements.map((el) =>
              el.id === id ? { ...el, ...updates } : el
            ),
          }
        : p
    );
    set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
  },

  deleteElement: (pageId, id) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) =>
      p.id === pageId
        ? { ...p, elements: p.elements.filter((el) => el.id !== id) }
        : p
    );
    set({
      pages: newPages,
      selectedElementId: null,
      past: [...past, { pages: snapshot }],
      future: [],
    });
  },

  duplicateElement: (pageId, id) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const page = pages.find((p) => p.id === pageId);
    const el = page?.elements.find((e) => e.id === id);
    if (!el) return;
    const clone: BookElement = {
      ...JSON.parse(JSON.stringify(el)),
      id: `${el.type}-${Date.now()}`,
      x: el.x + 20,
      y: el.y + 20,
      zIndex: (page?.elements.length || 0) + 1,
    };
    const newPages = pages.map((p) =>
      p.id === pageId ? { ...p, elements: [...p.elements, clone] } : p
    );
    set({
      pages: newPages,
      selectedElementId: clone.id,
      past: [...past, { pages: snapshot }],
      future: [],
    });
  },

  bringForward: (pageId, id) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) => {
      if (p.id !== pageId) return p;
      const els = [...p.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = els.findIndex((e) => e.id === id);
      if (idx < els.length - 1) {
        const tmp = els[idx].zIndex;
        els[idx] = { ...els[idx], zIndex: els[idx + 1].zIndex };
        els[idx + 1] = { ...els[idx + 1], zIndex: tmp };
      }
      return { ...p, elements: els };
    });
    set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
  },

  sendBackward: (pageId, id) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) => {
      if (p.id !== pageId) return p;
      const els = [...p.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = els.findIndex((e) => e.id === id);
      if (idx > 0) {
        const tmp = els[idx].zIndex;
        els[idx] = { ...els[idx], zIndex: els[idx - 1].zIndex };
        els[idx - 1] = { ...els[idx - 1], zIndex: tmp };
      }
      return { ...p, elements: els };
    });
    set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
  },

  setPageBackground: (pageId, color) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) =>
      p.id === pageId ? { ...p, background: color } : p
    );
    set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
  },

  undo: () => {
    const { past, pages, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      pages: previous.pages,
      past: past.slice(0, -1),
      future: [{ pages: clonePages(pages) }, ...future],
      selectedElementId: null,
    });
  },

  redo: () => {
    const { past, pages, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      pages: next.pages,
      past: [...past, { pages: clonePages(pages) }],
      future: future.slice(1),
      selectedElementId: null,
    });
  },
}));