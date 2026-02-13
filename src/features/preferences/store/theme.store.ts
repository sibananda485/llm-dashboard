import { create } from "zustand";

export const THEMES = ["light", "dark", "system", "ocean"] as const;
export type ThemeMode = (typeof THEMES)[number];

interface ThemeStoreState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
