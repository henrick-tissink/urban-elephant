"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatIndicative, formatZar } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  zar: number;
  suffix?: string;
};

export function Price({ zar, suffix }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("currency");
  const zarLabel = formatZar(zar);
  const indicative = formatIndicative(zar, locale);
  return (
    <span className="price">
      {zarLabel}
      {suffix ? ` ${suffix}` : null}
      {indicative ? (
        <span className="price-indicative ml-2 text-sm opacity-70">
          {t("indicativeNote", { amount: indicative })}
        </span>
      ) : null}
    </span>
  );
}
