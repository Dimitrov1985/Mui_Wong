import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { site as siteEn } from "../content/site";
import { site as siteTh } from "../content/site.th";

export type Lang = "en" | "th";

const SITE_BY_LANG = { en: siteEn, th: siteTh } as const;

const STORAGE_KEY = "mw-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The whole content object in the current language — same shape either way. */
  site: typeof siteEn;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "th" ? "th" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, site: SITE_BY_LANG[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LanguageProvider>");
  }
  return ctx;
}
