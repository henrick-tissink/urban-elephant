"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pickOptional } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import type { Property } from "@/types";

/**
 * The four addresses, along the foot of the hero.
 *
 * Set typographically rather than with bespoke property marks — no logo assets
 * exist for the individual hotels, and improvising four of them would cheapen
 * a 4-star group. Names come from the property data so this can never drift
 * out of step with the rest of the site.
 */
export function PropertyStrip({ properties }: { properties: Property[] }) {
  const locale = useLocale() as Locale;

  // Prefer the explicit suburb. Falls back to the first segment of `location`
  // only if one is missing — the hero is not the place for a street address.
  const shortLocation = (property: Property) => {
    if (property.shortLocation) return property.shortLocation;
    const full = pickOptional(property.location, locale) ?? "";
    return full.split(",")[0]?.trim() ?? "";
  };

  return (
    <ul className="mx-auto flex w-full max-w-4xl flex-wrap items-stretch justify-center gap-y-5">
      {properties.map((property, index) => (
        <li
          key={property._id}
          className={`flex w-1/2 items-center justify-center px-3 sm:w-auto sm:px-7 ${
            index > 0 ? "sm:border-l sm:border-white/15" : ""
          }`}
        >
          <Link
            href={`/properties/${property.slug}`}
            className="group block text-center transition-opacity hover:opacity-100 sm:opacity-80"
          >
            <span className="block text-base leading-tight text-white transition-colors group-hover:text-[var(--color-brand-mid)] sm:text-lg">
              {property.name}
            </span>
            <span className="mt-1 block text-[9px] uppercase leading-tight tracking-[0.22em] text-white/50 sm:text-[10px]">
              {shortLocation(property)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
