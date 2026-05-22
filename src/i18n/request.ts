import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import enMessages from "../messages/en.json";

function lookupKey(obj: unknown, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    getMessageFallback({ namespace, key }) {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const en = lookupKey(enMessages, fullKey);
      return en ?? fullKey;
    },
  };
});
