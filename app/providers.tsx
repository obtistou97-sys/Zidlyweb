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
