"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Locale, translations, TranslationShape } from "./translations";

// ----------------------------------------------------------------------------
// Theme context (light / dark)
// ----------------------------------------------------------------------------
type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "oussama-portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as
      | Theme
      | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// ----------------------------------------------------------------------------
// Language context (en / ar)
// ----------------------------------------------------------------------------
interface LanguageContextValue {
  locale: Locale;
  t: TranslationShape;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const LOCALE_STORAGE_KEY = "oussama-portfolio-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY) as
      | Locale
      | null;
    if (stored === "en" || stored === "ar") {
      setLocale(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, mounted]);

  function toggleLanguage() {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }

  const value: LanguageContextValue = {
    locale,
    t: translations[locale] as TranslationShape,
    dir: locale === "ar" ? "rtl" : "ltr",
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
