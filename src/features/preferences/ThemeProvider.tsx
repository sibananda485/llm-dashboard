import { useEffect, type ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useThemeStore } from "@/features/preferences/store/theme.store";

interface DashboardThemeProviderProps {
  children: ReactNode;
}

const OCEAN_THEME_CLASS = "theme-ocean";

export const DashboardThemeProvider = ({ children }: DashboardThemeProviderProps) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === "ocean") {
      rootElement.classList.add(OCEAN_THEME_CLASS);
      return;
    }
    rootElement.classList.remove(OCEAN_THEME_CLASS);
  }, [theme]);

  const resolvedTheme = theme === "ocean" ? "light" : theme;

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="dashboard-theme">
      <ThemeSync theme={resolvedTheme}>{children}</ThemeSync>
    </NextThemeProvider>
  );
};

interface ThemeSyncProps {
  children: ReactNode;
  theme: "light" | "dark" | "system";
}

const ThemeSync = ({ children, theme }: ThemeSyncProps) => {
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === "system") {
      return;
    }
    rootElement.classList.remove("light", "dark");
    rootElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};

