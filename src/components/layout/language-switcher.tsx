"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@radix-ui/react-dropdown-menu";
import { Globe, Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_NATIVE_NAME } from "@/lib/i18n-content";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("locale.switcher");
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (target: Locale) => {
    router.replace(pathname, { locale: target });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 text-sm font-medium transition-colors outline-none"
        aria-label={t("label")}
      >
        <Globe className="size-4" />
        <span>{LOCALE_NATIVE_NAME[locale]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="z-50 min-w-[12rem] rounded-md border border-stone-200 bg-white p-1 shadow-lg"
        >
          {routing.locales.map((l) => (
            <DropdownMenuItem
              key={l}
              onSelect={() => switchTo(l)}
              className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-stone-100 focus:bg-stone-100"
            >
              <span>{LOCALE_NATIVE_NAME[l]}</span>
              {l === locale ? <Check className="size-3.5 text-stone-500" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
