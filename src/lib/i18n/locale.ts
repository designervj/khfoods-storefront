import { LocalizedString } from "@/redux/slices/blueprint/blueprintType";

export type Locale = "en" | string;
export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: string[] = ["en", "hi"];

export function getLocalizedString(text: LocalizedString | string | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!text) return "";
  if (typeof text === "string") return text;
  return text[locale] || text.en || "";
}
