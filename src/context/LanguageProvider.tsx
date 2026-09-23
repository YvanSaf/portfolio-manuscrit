import { useEffect, useState, type ReactNode } from "react";
import type { Lang } from "../content/eggs";
import { LanguageContext } from "./languageContext";

const STORAGE_KEY = "portfolio-manuscrit:lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "fr";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "fr" || stored === "en") return stored;

  const browserLang = window.navigator.language.toLowerCase();
  return browserLang.startsWith("fr") ? "fr" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}