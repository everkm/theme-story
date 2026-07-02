import { en, type UIStrings } from "./lang/en";
import { zh } from "./lang/zh";

const catalogs: Record<string, UIStrings> = { en, zh };

export function useTranslations(lang?: string): UIStrings {
  return catalogs[lang || "en"] ?? en;
}
