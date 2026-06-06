// import { create } from "zustand";

// export type ToolType =
//   | "select"
//   | "pen"
//   | "eraser"
//   | "rect"
//   | "circle"
//   | "line";

// export interface BookElement {
//   id: string;
//   type: "image" | "text" | "line" | "shape";
//   x: number;
//   y: number;
//   width?: number;
//   height?: number;
//   rotation?: number;
//   opacity?: number;
//   zIndex: number;
//   // image
//   src?: string;
//   // text
//   text?: string;
//   fontSize?: number;
//   fontFamily?: string;
//   fontStyle?: string;
//   textDecoration?: string;
//   textAlign?: string;
//   fill?: string;
//   lineHeight?: number;
//   letterSpacing?: number;
//   listType?: string;
//   textTransform?: string;
//   // text shadow
//   shadowColor?: string;
//   shadowOffsetX?: number;
//   shadowOffsetY?: number;
//   shadowBlur?: number;
//   // line / draw
//   points?: number[];
//   stroke?: string;
//   strokeWidth?: number;
//   // shape
//   shapeType?: "rect" | "circle" | "line";
//   radius?: number;
//   // shape fill
//   shapeFill?: string;
// }

// export interface BookPage {
//   id: number;
//   elements: BookElement[];
//   background: string; // color OR gradient string
// }

// // Backwards-compatible aliases for older code that used `Page`/`PageElement`
// export type PageElement = BookElement;
// export type Page = BookPage;

// interface HistoryEntry {
//   pages: BookPage[];
// }

// interface BookStore {
//   pages: BookPage[];
//   currentPage: number;
//   zoom: number;
//   activeTool: ToolType;
//   strokeColor: string;
//   strokeWidth: number;
//   selectedElementId: string | null;

//   // history
//   past: HistoryEntry[];
//   future: HistoryEntry[];

//   // actions
//   setZoom: (z: number) => void;
//   setCurrentPage: (p: number) => void;
//   setActiveTool: (t: ToolType) => void;
//   setStrokeColor: (c: string) => void;
//   setStrokeWidth: (w: number) => void;
//   setSelectedElement: (id: string | null) => void;

//   addPage: () => void;
//   addElement: (pageId: number, el: BookElement) => void;
//   updateElement: (pageId: number, id: string, updates: Partial<BookElement>) => void;
//   deleteElement: (pageId: number, id: string) => void;
//   duplicateElement: (pageId: number, id: string) => void;
//   bringForward: (pageId: number, id: string) => void;
//   sendBackward: (pageId: number, id: string) => void;
//   setPageBackground: (pageId: number, color: string) => void;

//   undo: () => void;
//   redo: () => void;
// }

// const initialPage: BookPage = {
//   id: 1,
//   elements: [],
//   background: "#ffffff",
// };

// function clonePages(pages: BookPage[]): BookPage[] {
//   return JSON.parse(JSON.stringify(pages));
// }

// export const useBookStore = create<BookStore>((set, get) => ({
//   pages: [initialPage],
//   currentPage: 1,
//   zoom: 75,
//   activeTool: "select",
//   strokeColor: "#000000",
//   strokeWidth: 3,
//   selectedElementId: null,
//   past: [],
//   future: [],

//   setZoom: (z) => set({ zoom: z }),
//   setCurrentPage: (p) => set({ currentPage: p }),
//   setActiveTool: (t) => set({ activeTool: t }),
//   setStrokeColor: (c) => set({ strokeColor: c }),
//   setStrokeWidth: (w) => set({ strokeWidth: w }),
//   setSelectedElement: (id) => set({ selectedElementId: id }),

//   addPage: () => {
//     const { pages, past } = get();
//     const newId = pages.length > 0 ? Math.max(...pages.map((p) => p.id)) + 1 : 1;
//     const newPages = [...pages, { id: newId, elements: [], background: "" }];
//     set({
//       pages: newPages,
//       currentPage: newId,
//       past: [...past, { pages: clonePages(pages) }],
//       future: [],
//     });
//   },

//   addElement: (pageId, el) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) =>
//       p.id === pageId ? { ...p, elements: [...p.elements, el] } : p
//     );
//     set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
//   },

//   updateElement: (pageId, id, updates) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) =>
//       p.id === pageId
//         ? {
//             ...p,
//             elements: p.elements.map((el) =>
//               el.id === id ? { ...el, ...updates } : el
//             ),
//           }
//         : p
//     );
//     set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
//   },

//   deleteElement: (pageId, id) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) =>
//       p.id === pageId
//         ? { ...p, elements: p.elements.filter((el) => el.id !== id) }
//         : p
//     );
//     set({
//       pages: newPages,
//       selectedElementId: null,
//       past: [...past, { pages: snapshot }],
//       future: [],
//     });
//   },

//   duplicateElement: (pageId, id) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const page = pages.find((p) => p.id === pageId);
//     const el = page?.elements.find((e) => e.id === id);
//     if (!el) return;
//     const clone: BookElement = {
//       ...JSON.parse(JSON.stringify(el)),
//       id: `${el.type}-${Date.now()}`,
//       x: el.x + 20,
//       y: el.y + 20,
//       zIndex: (page?.elements.length || 0) + 1,
//     };
//     const newPages = pages.map((p) =>
//       p.id === pageId ? { ...p, elements: [...p.elements, clone] } : p
//     );
//     set({
//       pages: newPages,
//       selectedElementId: clone.id,
//       past: [...past, { pages: snapshot }],
//       future: [],
//     });
//   },

//   bringForward: (pageId, id) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) => {
//       if (p.id !== pageId) return p;
//       const els = [...p.elements].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = els.findIndex((e) => e.id === id);
//       if (idx < els.length - 1) {
//         const tmp = els[idx].zIndex;
//         els[idx] = { ...els[idx], zIndex: els[idx + 1].zIndex };
//         els[idx + 1] = { ...els[idx + 1], zIndex: tmp };
//       }
//       return { ...p, elements: els };
//     });
//     set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
//   },

//   sendBackward: (pageId, id) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) => {
//       if (p.id !== pageId) return p;
//       const els = [...p.elements].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = els.findIndex((e) => e.id === id);
//       if (idx > 0) {
//         const tmp = els[idx].zIndex;
//         els[idx] = { ...els[idx], zIndex: els[idx - 1].zIndex };
//         els[idx - 1] = { ...els[idx - 1], zIndex: tmp };
//       }
//       return { ...p, elements: els };
//     });
//     set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
//   },

//   setPageBackground: (pageId, color) => {
//     const { pages, past } = get();
//     const snapshot = clonePages(pages);
//     const newPages = pages.map((p) =>
//       p.id === pageId ? { ...p, background: color } : p
//     );
//     set({ pages: newPages, past: [...past, { pages: snapshot }], future: [] });
//   },

//   undo: () => {
//     const { past, pages, future } = get();
//     if (past.length === 0) return;
//     const previous = past[past.length - 1];
//     set({
//       pages: previous.pages,
//       past: past.slice(0, -1),
//       future: [{ pages: clonePages(pages) }, ...future],
//       selectedElementId: null,
//     });
//   },

//   redo: () => {
//     const { past, pages, future } = get();
//     if (future.length === 0) return;
//     const next = future[0];
//     set({
//       pages: next.pages,
//       past: [...past, { pages: clonePages(pages) }],
//       future: future.slice(1),
//       selectedElementId: null,
//     });
//   },
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
  isCover?: boolean;  // page 1 = cover
  contributorId?: string | number;
  contributorName?: string;
}

// Backwards-compatible aliases
export type PageElement = BookElement;
export type Page = BookPage;

// ── Occasion theme definitions ────────────────────────────────────────────
export interface OccasionTheme {
  gradient: string;
  accentColor: string;
  emoji: string;
  label: string;
}

export const OCCASION_THEMES: Record<string, OccasionTheme> = {
  // Birthday / Anniversary
  Birthday:    { gradient: "linear-gradient(135deg, #FF6B9D, #FF8E53, #FFC75F)", accentColor: "#BF003A", emoji: "🎂", label: "Birthday" },
  Anniversary: { gradient: "linear-gradient(135deg, #f953c6, #b91d73)", accentColor: "#b91d73", emoji: "💑", label: "Anniversary" },
  // School
  Yearbook:         { gradient: "linear-gradient(135deg, #1CB5E0, #000851)", accentColor: "#2563EB", emoji: "🎓", label: "Yearbook" },
  Graduation:       { gradient: "linear-gradient(135deg, #134E5E, #71B280)", accentColor: "#059669", emoji: "🎓", label: "Graduation" },
  "Teacher Farewell":   { gradient: "linear-gradient(135deg, #4776E6, #8E54E9)", accentColor: "#7C3AED", emoji: "👩‍🏫", label: "Teacher Farewell" },
  Kindergarten:     { gradient: "linear-gradient(135deg, #f7971e, #ffd200)", accentColor: "#D97706", emoji: "🧸", label: "Kindergarten" },
  "End-of-Year Book":  { gradient: "linear-gradient(135deg, #00b4db, #0083b0)", accentColor: "#2563EB", emoji: "📚", label: "End-of-Year" },
  // Work
  Retirement:          { gradient: "linear-gradient(135deg, #373B44, #4286f4)", accentColor: "#7C3AED", emoji: "🏆", label: "Retirement" },
  "Team Book":         { gradient: "linear-gradient(135deg, #005C97, #363795)", accentColor: "#2563EB", emoji: "💼", label: "Team Book" },
  "Farewell Colleague":{ gradient: "linear-gradient(135deg, #8E0E00, #1F1C18)", accentColor: "#7C3AED", emoji: "👋", label: "Farewell" },
  // Love
  Wedding:              { gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)", accentColor: "#DB2777", emoji: "💍", label: "Wedding" },
  "Bachelorette (JGA)": { gradient: "linear-gradient(135deg, #FF61D2, #FE9090)", accentColor: "#DB2777", emoji: "👰", label: "Bachelorette" },
  // Family
  "Baby Book":             { gradient: "linear-gradient(135deg, #a8edea, #fed6e3)", accentColor: "#059669", emoji: "🍼", label: "Baby Book" },
  "For Mom":               { gradient: "linear-gradient(135deg, #f6d365, #fda085)", accentColor: "#DB2777", emoji: "💐", label: "For Mom" },
  "For Dad":               { gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)", accentColor: "#2563EB", emoji: "👔", label: "For Dad" },
  "For Grandma / Grandpa": { gradient: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", accentColor: "#7C3AED", emoji: "👴", label: "For Grandparents" },
  "Family Book":           { gradient: "linear-gradient(135deg, #d4fc79, #96e6a1)", accentColor: "#059669", emoji: "👨‍👩‍👧", label: "Family Book" },
  // Seasonal
  Christmas: { gradient: "linear-gradient(135deg, #1a3a1a, #b5192c, #1a3a1a)", accentColor: "#b5192c", emoji: "🎄", label: "Christmas" },
  "New Year":       { gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", accentColor: "#7C3AED", emoji: "🎆", label: "New Year" },
  "Ramadan / Eid":  { gradient: "linear-gradient(135deg, #134e5e, #71b280)", accentColor: "#059669", emoji: "🌙", label: "Ramadan / Eid" },
  Easter:           { gradient: "linear-gradient(135deg, #f9d29d, #a8edea)", accentColor: "#059669", emoji: "🐣", label: "Easter" },
  Halloween:        { gradient: "linear-gradient(135deg, #f7971e, #1a1a1a)", accentColor: "#D97706", emoji: "🎃", label: "Halloween" },
};

// Fallback theme
export const DEFAULT_THEME: OccasionTheme = {
  gradient: "linear-gradient(135deg, #BF003A, #59001C)",
  accentColor: "#BF003A",
  emoji: "📖",
  label: "My Book",
};

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
  coverPageStyleId: number | null;
  bookPageStyleId: number | null;
  coverPageBackground: string;
  bookPageBackground: string;
  bookTitle: string;
  bookSubtitle: string;
  recipientName: string;

  // ── Occasion / theme ──
  occasion: string | null;
  subOccasion: string | null;

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

  // ── Occasion action ──
  setOccasion: (occasion: string, subOccasion: string) => void;

  addPage: () => void;
  addElement: (pageId: number, el: BookElement) => void;
  updateElement: (pageId: number, id: string, updates: Partial<BookElement>) => void;
  deleteElement: (pageId: number, id: string) => void;
  duplicateElement: (pageId: number, id: string) => void;
  bringForward: (pageId: number, id: string) => void;
  sendBackward: (pageId: number, id: string) => void;
  setPageBackground: (pageId: number, background: string, styleId?: number | null) => void;
  applyLoadedPageStyles: (payload: {
    coverPageStyleId: number | null;
    bookPageStyleId: number | null;
    coverPageBackground: string;
    bookPageBackground: string;
    bookTitle: string;
    bookSubtitle: string;
    recipientName: string;
  }) => void;

  undo: () => void;
  redo: () => void;
}

const initialPage: BookPage = {
  id: 1,
  elements: [],
  background: "",
  isCover: true,
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
  coverPageStyleId: null,
  bookPageStyleId: null,
  coverPageBackground: "",
  bookPageBackground: "",
  bookTitle: "",
  bookSubtitle: "",
  recipientName: "",
  occasion: null,
  subOccasion: null,
  past: [],
  future: [],

  setZoom: (z) => set({ zoom: z }),
  setCurrentPage: (p) => set({ currentPage: p }),
  setActiveTool: (t) => set({ activeTool: t }),
  setStrokeColor: (c) => set({ strokeColor: c }),
  setStrokeWidth: (w) => set({ strokeWidth: w }),
  setSelectedElement: (id) => set({ selectedElementId: id }),

  applyLoadedPageStyles: (payload) => {
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    const newPages = pages.map((p) => {
      if (p.id === 1 && payload.coverPageBackground) {
        return { ...p, background: payload.coverPageBackground };
      }
      if (p.id !== 1 && payload.bookPageBackground) {
        return { ...p, background: payload.bookPageBackground };
      }
      return p;
    });

    set({
      pages: newPages,
      past: [...past, { pages: snapshot }],
      future: [],
    });
  },

  // ── When occasion is set, the cover page background will automatically update ──
  setOccasion: (occasion, subOccasion) => {
    const theme = OCCASION_THEMES[subOccasion] ?? OCCASION_THEMES[occasion] ?? DEFAULT_THEME;
    const { pages, past } = get();
    const snapshot = clonePages(pages);
    // If a theme gradient is applied here, note it for traceability (no console output)
    // Set Page 1 (cover) background using the theme gradient
    const newPages = pages.map((p) =>
      p.id === 1 ? { ...p, background: theme.gradient, isCover: true } : p
    );
    set({
      occasion,
      subOccasion,
      pages: newPages,
      past: [...past, { pages: snapshot }],
      future: [],
    });
  },

  addPage: () => {
    const { pages, past, bookPageBackground } = get();
    const newId = pages.length > 0 ? Math.max(...pages.map((p) => p.id)) + 1 : 1;
    const fallbackBookBackground = bookPageBackground || "";
    const newPages = [...pages, { id: newId, elements: [], background: fallbackBookBackground, isCover: false }];
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
        ? { ...p, elements: p.elements.map((el) => el.id === id ? { ...el, ...updates } : el) }
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
    set({ pages: newPages, selectedElementId: null, past: [...past, { pages: snapshot }], future: [] });
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
    set({ pages: newPages, selectedElementId: clone.id, past: [...past, { pages: snapshot }], future: [] });
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

  setPageBackground: (pageId, background, styleId = null) => {
    const { pages, past, coverPageBackground, bookPageBackground, coverPageStyleId, bookPageStyleId } = get();
    const currentPageNumber = pageId;
    const isCoverPage = currentPageNumber === 1;
    const backgroundValue = (background && typeof background === "string" && background.startsWith("http"))
      ? background
      : String(styleId ?? "");
    const snapshot = clonePages(pages);
    const nextPages = pages.map((page, index) =>
      index === pageId - 1
        ? { ...page, background: backgroundValue, isCover: isCoverPage }
        : page
    );
    

    set({
      pages: nextPages,
      coverPageStyleId: isCoverPage ? styleId : coverPageStyleId,
      bookPageStyleId: isCoverPage ? bookPageStyleId : styleId,
      coverPageBackground: isCoverPage ? backgroundValue : coverPageBackground,
      bookPageBackground: isCoverPage ? bookPageBackground : backgroundValue,
      past: [...past, { pages: snapshot }],
      future: [],
    });
  },

  undo: () => {
    const { past, pages, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({ pages: previous.pages, past: past.slice(0, -1), future: [{ pages: clonePages(pages) }, ...future], selectedElementId: null });
  },

  redo: () => {
    const { past, pages, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({ pages: next.pages, past: [...past, { pages: clonePages(pages) }], future: future.slice(1), selectedElementId: null });
  },
}));