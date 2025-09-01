import type { Layout } from "react-grid-layout";
import { create } from "zustand";

interface GridState {
  layout: Layout[];
  setLayout: (layout: Layout[]) => void;
  deleteGrid: (i: string) => void;
  addGrid: (i: string) => void;
}

export const useStore = create<GridState>((set) => ({
  layout: [{ i: "token-usage", x: 0, y: 0, w: 1, h: 4 }],
  setLayout: (layout: Layout[]) => set(() => ({ layout: layout })),
  hasGrid: (layout: Layout[]) => set(() => ({ layout: layout })),
  deleteGrid: (i: string) =>
    set(({ layout }) => ({ layout: layout.filter((item) => item.i != i) })),
  addGrid: (i: string) =>
    set(({ layout }) => ({
      layout: [
        ...layout,
        {
          i,
          x: layout.length % 3,
          y: Math.floor(layout.length / 3),
          w: 1,
          h: 4,
        },
      ],
    })),
}));
