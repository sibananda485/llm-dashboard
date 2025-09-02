import type { Layout } from "react-grid-layout";
import { create } from "zustand";

interface StoreState {
  layout: Layout[];
  setLayout: (layout: Layout[]) => void;
  deleteWidget: (i: string) => void;
  addWidget: (i: string) => void;
}

const savedLayout = localStorage.getItem("dashboard-layout");
const initialLayout = savedLayout
  ? JSON.parse(savedLayout)
  : [
      { i: "token-usage", x: 0, y: 0, w: 1, h: 4 },
      { i: "latency-distribution", x: 1, y: 0, w: 1, h: 4 },
      { i: "cost-analysis", x: 2, y: 0, w: 1, h: 4 },
    ];

export const useStore = create<StoreState>((set) => ({
  layout: initialLayout,
  setLayout: (layout: Layout[]) => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
    return set(() => ({ layout: layout }));
  },
  deleteWidget: (i: string) =>
    set(({ layout }) => ({ layout: layout.filter((item) => item.i != i) })),
  addWidget: (i: string) =>
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
