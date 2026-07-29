import { create } from "zustand";

export type ThemeMode = "light" | "dark";

function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface UiState {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  themeMode: getInitialThemeMode(),
  toggleThemeMode: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
  isMobileNavOpen: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () =>
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
}));
