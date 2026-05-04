"use client";

import { useCallback, useEffect, useState } from "react";

export type AppLanguage = "en" | "de";

const LANGUAGE_KEY = "language";
const LANGUAGE_EVENT = "app-language-change";

function normalizeLanguage(value: string | null): AppLanguage {
  return value === "de" ? "de" : "en";
}

export function useLanguage() {
  const [language, setLanguageState] = useState<AppLanguage>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = normalizeLanguage(window.localStorage.getItem(LANGUAGE_KEY));
    setLanguageState(stored);
    document.documentElement.lang = stored;

    const handleLanguageChange = () => {
      const next = normalizeLanguage(window.localStorage.getItem(LANGUAGE_KEY));
      setLanguageState(next);
      document.documentElement.lang = next;
    };

    window.addEventListener("storage", handleLanguageChange);
    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleLanguageChange);
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
    };
  }, []);

  const setLanguage = useCallback((next: AppLanguage) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(LANGUAGE_KEY, next);
    document.documentElement.lang = next;
    setLanguageState(next);
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  }, []);

  return { language, setLanguage };
}
