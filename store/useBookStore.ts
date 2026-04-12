import { create } from 'zustand';

export interface PageElement {
  id: string;
  type: 'image' | 'text' | 'shape' | 'line';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  src?: string;
  text?: string;
  points?: number[];
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  shapeType?: 'rect' | 'circle';
  radius?: number;
  zIndex: number;
}

export interface Page {
  id: number;
  elements: PageElement[];
}

interface BookStore {
  pages: Page[];
  activeTool: 'select' | 'pen' | 'text' | 'image' | 'shape' | 'eraser';
  activeSubTool: string;
  zoom: number;
  strokeColor: string;
  strokeWidth: number;
  currentPage: number;
  selectedElementId: string | null;
  isReadOnly: boolean;
  
  setPages: (pages: Page[]) => void;
  setActiveTool: (tool: 'select' | 'pen' | 'text' | 'image' | 'shape' | 'eraser', subTool?: string) => void;
  setZoom: (zoom: number) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setCurrentPage: (page: number) => void;
  setSelectedElement: (id: string | null) => void;
  addElement: (pageId: number, element: PageElement) => void;
  updateElement: (pageId: number, elementId: string, updates: Partial<PageElement>) => void;
  deleteElement: (pageId: number, elementId: string) => void;
  deleteSelectedElement: () => void;
  addPage: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  pages: [{ id: 1, elements: [] }],
  activeTool: 'select',
  activeSubTool: 'select',
  zoom: 75,
  strokeColor: '#000000',
  strokeWidth: 2,
  currentPage: 1,
  selectedElementId: null,
  isReadOnly: false,

  setPages: (pages) => set({ pages }),
  setActiveTool: (tool, subTool = 'select') => set({ activeTool: tool, activeSubTool: subTool }),
  setZoom: (zoom) => set({ zoom }),
  setStrokeColor: (color) => set({ strokeColor: color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedElement: (id) => set({ selectedElementId: id }),

  addElement: (pageId, element) => set((state) => ({
    pages: state.pages.map(p =>
      p.id === pageId ? { ...p, elements: [...p.elements, element] } : p
    )
  })),

  updateElement: (pageId, elementId, updates) => set((state) => ({
    pages: state.pages.map(p =>
      p.id === pageId
        ? {
            ...p,
            elements: p.elements.map(el =>
              el.id === elementId ? { ...el, ...updates } : el
            )
          }
        : p
    )
  })),

  deleteElement: (pageId, elementId) => set((state) => ({
    pages: state.pages.map(p =>
      p.id === pageId
        ? { ...p, elements: p.elements.filter(el => el.id !== elementId) }
        : p
    )
  })),

  deleteSelectedElement: () => {
    const { selectedElementId, currentPage, pages } = get();
    if (selectedElementId) {
      set({
        pages: pages.map(p =>
          p.id === currentPage
            ? { ...p, elements: p.elements.filter(el => el.id !== selectedElementId) }
            : p
        ),
        selectedElementId: null
      });
    }
  },

  addPage: () => set((state) => ({
    pages: [...state.pages, { id: state.pages.length + 1, elements: [] }],
    currentPage: state.pages.length + 1,
  })),
}));
