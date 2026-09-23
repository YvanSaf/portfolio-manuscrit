import { fr } from "../content/fr";
import { en } from "../content/en";
import type { SiteContent } from "../content/types";
import { useLanguage } from "./useLanguage";

const contentByLang: Record<"fr" | "en", SiteContent> = { fr, en };

export function useContent(): SiteContent {
  const { lang } = useLanguage();
  return contentByLang[lang];
}