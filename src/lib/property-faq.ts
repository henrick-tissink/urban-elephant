import type { Localized } from "@/lib/i18n-content";
import type { Property } from "@/types";

export interface FaqEntry {
  q: Localized<string>;
  a: Localized<string>;
}

const POOL_PROPERTIES = new Set([
  "16-on-bree",
  "the-rose",
  "the-docklands",
]);

const GYM_PROPERTIES = new Set(["16-on-bree", "the-rose"]);

function formatPrice(min: number, max?: number): string {
  const fmtMin = min.toLocaleString("en-ZA");
  if (max) return `R${fmtMin} – R${max.toLocaleString("en-ZA")}`;
  return `R${fmtMin}`;
}

/**
 * Property-specific FAQs generated from each property's data — used for
 * FAQPage JSON-LD and the "Common questions" section on the property page.
 *
 * These are intentionally factual (address, rate, pool/gym presence,
 * parking) so each property page emits unique schema rather than duplicating
 * the master /faq page.
 */
export function propertyFaqs(property: Property): FaqEntry[] {
  const entries: FaqEntry[] = [];
  const propName = `Urban Elephant at ${property.name}`;

  if (property.address) {
    entries.push({
      q: { en: `Where is ${propName} located?` },
      a: { en: `${propName} is at ${property.address}. It's officially TGCSA-graded as a 4-star apartment hotel.` },
    });
  }

  if (property.priceRange) {
    const range = formatPrice(property.priceRange.min, property.priceRange.max);
    const suffix = property.priceRange.max ? "" : " per night";
    entries.push({
      q: { en: `How much does it cost to stay at ${property.name}?` },
      a: {
        en: property.priceRange.max
          ? `Rates at ${propName} range from ${range} per night, depending on the apartment and dates. Book direct for the best available rate — we beat any cheaper rate found online by 10%.`
          : `Rates at ${propName} start from ${range}${suffix}. Book direct for the best available rate — we beat any cheaper rate found online by 10%.`,
      },
    });
  }

  const hasPool = POOL_PROPERTIES.has(property.slug);
  const hasGym = GYM_PROPERTIES.has(property.slug);
  if (hasPool || hasGym) {
    entries.push({
      q: { en: `Does ${property.name} have a swimming pool and gym?` },
      a: {
        en:
          hasPool && hasGym
            ? `Yes — ${propName} has both a swimming pool and an on-site gym, alongside the full hotel-grade amenity set.`
            : hasPool
              ? `${propName} has a swimming pool. The on-site gym is available at our 16 On Bree and The Rose properties.`
              : `${propName} has an on-site gym. Swimming pools are available at our 16 On Bree, The Rose and The Docklands properties.`,
      },
    });
  } else {
    entries.push({
      q: { en: `Does ${property.name} have a swimming pool or gym?` },
      a: { en: `${propName} doesn't have an on-site pool or gym, but you're a short walk from Sea Point Promenade, with public pools and gyms nearby. Pools are available at our 16 On Bree, The Rose and The Docklands properties.` },
    });
  }

  entries.push({
    q: { en: `Is parking available at ${property.name}?` },
    a: { en: `Yes — secure parking is available at ${propName} for an additional R75 per night. Reserve your space when you book direct.` },
  });

  entries.push({
    q: { en: `What time is check-in and check-out at ${property.name}?` },
    a: { en: `Check-in is from 15h00 and check-out is at 10h30. Early check-in and late check-out can usually be arranged subject to availability — message Karin on WhatsApp once your booking is confirmed.` },
  });

  return entries;
}
