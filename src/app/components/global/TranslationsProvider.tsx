"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type SupportedLocales = "en" | "de";

interface TranslationContextType {
  locale: SupportedLocales;
  setLocale: (locale: SupportedLocales) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function TranslationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<SupportedLocales>("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && (storedLocale === "en" || storedLocale === "de")) {
      setLocale(storedLocale as SupportedLocales);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    fetch(`/locales/${locale}/common.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch translations for locale: ${locale}`);
        }
        return res.json();
      })
      .then((data) => setTranslations(data))
      .catch((err) => {
        console.error("Error loading translations:", err);
        setTranslations({});
      });
  }, [locale]);

  const t = (key: string): string => translations[key] || key;

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
