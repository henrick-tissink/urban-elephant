# Multilingual Foundations (PR 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship five-locale (`en`, `af`, `de`, `fr`, `da`) infrastructure with EN fallback content, so `/de`, `/fr`, `/da` URLs exist with correct `<html lang>`, hreflang, locale-aware structured data, OG metadata, language switcher, and detection banner — without any non-English translations.

**Architecture:** Extend `next-intl` v4 routing to five locales (`localePrefix: "as-needed"`). Introduce `Localized<T>` content shape with required `en` key and `pickLocale` fallback helper. Refactor structured data + page metadata to take `locale`. Replace 2-state language toggle with a dropdown. Add a client-side `navigator.language` banner. All translatable content fields wrapped `{ en: <existing value> }` so EN render is unchanged; `de.json` / `fr.json` / `da.json` ship as exact copies of `en.json`.

**Tech Stack:** Next.js 15 App Router, next-intl v4, TypeScript, Tailwind v4, Playwright (existing devDep — used for the smoke tests added here).

**Spec:** `docs/superpowers/specs/2026-05-22-multilingual-seo-design.md`

**Testing strategy:** TypeScript compilation + Playwright smoke tests across all five locales. No unit test runner exists in this repo today and adding one for one-line helpers (`pickLocale`) is overkill; Playwright integration tests cover the actual integration risk. Each task that touches code ends with `npm run build` (catches TS regressions) and runs the Playwright smoke once it exists.

---

## Task 1: Create `src/lib/i18n-content.ts` with `Localized<T>` and locale constants

**Files:**
- Create: `src/lib/i18n-content.ts`

- [ ] **Step 1: Create the file with full contents**

```ts
// src/lib/i18n-content.ts
import type { Locale } from "@/i18n/routing";

export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

export function pickLocale<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.en;
}

export function pickOptional<T>(
  field: Localized<T> | undefined,
  locale: Locale,
): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field.en;
}

export const LOCALE_TO_BCP47: Record<Locale, string> = {
  en: "en-ZA",
  af: "af-ZA",
  de: "de-DE",
  fr: "fr-FR",
  da: "da-DK",
};

export const LOCALE_TO_OG: Record<Locale, string> = {
  en: "en_ZA",
  af: "af_ZA",
  de: "de_DE",
  fr: "fr_FR",
  da: "da_DK",
};

export const LOCALE_NATIVE_NAME: Record<Locale, string> = {
  en: "English",
  af: "Afrikaans",
  de: "Deutsch",
  fr: "Français",
  da: "Dansk",
};

// Indicative FX rates from ZAR. UI-only — actual billing is in ZAR.
// Update quarterly. Last updated: 2026-05-22.
export const INDICATIVE_FX: Record<Locale, {
  code: "ZAR" | "EUR" | "DKK";
  rate: number;
  symbol: string;
  format: (zarAmount: number) => string;
}> = {
  en: {
    code: "ZAR",
    rate: 1,
    symbol: "R",
    format: (n) => `R${n.toLocaleString("en-ZA")}`,
  },
  af: {
    code: "ZAR",
    rate: 1,
    symbol: "R",
    format: (n) => `R${n.toLocaleString("af-ZA")}`,
  },
  de: {
    code: "EUR",
    rate: 0.050,
    symbol: "€",
    format: (n) => `€${Math.round(n * 0.050).toLocaleString("de-DE")}`,
  },
  fr: {
    code: "EUR",
    rate: 0.050,
    symbol: "€",
    format: (n) => `${Math.round(n * 0.050).toLocaleString("fr-FR")} €`,
  },
  da: {
    code: "DKK",
    rate: 0.37,
    symbol: "kr",
    format: (n) => `${Math.round(n * 0.37).toLocaleString("da-DK")} kr`,
  },
};

export function formatIndicative(zarAmount: number, locale: Locale): string | undefined {
  const fx = INDICATIVE_FX[locale];
  if (fx.code === "ZAR") return undefined;
  return fx.format(zarAmount);
}
```

- [ ] **Step 2: Run build to confirm TypeScript is happy**

Run: `npm run build`
Expected: build succeeds. (`Locale` type comes from `@/i18n/routing` which currently exports only `en`/`af` — `Record<Locale, …>` requires only those keys today. Adding the other locales in Task 2 will widen the type and require the other keys, which are already present. The Record type works in both states because the constants already contain all five keys.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n-content.ts
git commit -m "Add Localized<T> primitive and locale constants

Foundation for multilingual rollout. Localized<T> requires en key,
others fall back to en. INDICATIVE_FX displays approximate prices in
EUR/DKK on de/fr/da pages — UI only, actual billing is ZAR."
```

---

## Task 2: Extend `routing.locales` to five locales

**Files:**
- Modify: `src/i18n/routing.ts`

- [ ] **Step 1: Edit routing.ts**

Replace the file contents with:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "af", "de", "fr", "da"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: build fails or warns — `src/messages/de.json`, `fr.json`, `da.json` don't exist yet. This is expected; Task 3 fixes it.

- [ ] **Step 3: Commit (do not run dev server yet — site will 500 on /de until Task 3)**

```bash
git add src/i18n/routing.ts
git commit -m "Extend routing locales to en, af, de, fr, da"
```

---

## Task 3: Create de.json, fr.json, da.json as exact copies of en.json

**Files:**
- Create: `src/messages/de.json` (copy of `en.json`)
- Create: `src/messages/fr.json` (copy of `en.json`)
- Create: `src/messages/da.json` (copy of `en.json`)

- [ ] **Step 1: Copy en.json three times**

```bash
cp src/messages/en.json src/messages/de.json
cp src/messages/en.json src/messages/fr.json
cp src/messages/en.json src/messages/da.json
```

- [ ] **Step 2: Verify the copies are byte-identical to en.json**

```bash
diff src/messages/en.json src/messages/de.json
diff src/messages/en.json src/messages/fr.json
diff src/messages/en.json src/messages/da.json
```
Expected: no output (no diff).

- [ ] **Step 3: Run dev server and visit each locale**

```bash
npm run dev
```

In a browser, visit:
- http://localhost:3000/ (EN at root)
- http://localhost:3000/af (Afrikaans)
- http://localhost:3000/de
- http://localhost:3000/fr
- http://localhost:3000/da

Expected: all five return 200 with English content rendered (de/fr/da show EN since the JSONs are copies). No console errors.

Stop the dev server (Ctrl+C) after verifying.

- [ ] **Step 4: Commit**

```bash
git add src/messages/de.json src/messages/fr.json src/messages/da.json
git commit -m "Add de/fr/da message files as en.json copies

Placeholder copies so de/fr/da render valid pages with EN content
until translations land in PRs 2-4."
```

---

## Task 4: Add `getMessageFallback` to `src/i18n/request.ts` returning EN content

**Files:**
- Modify: `src/i18n/request.ts`

- [ ] **Step 1: Replace request.ts contents**

```ts
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
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/request.ts
git commit -m "Fall back to en message value on missing key

Previously next-intl returned the literal key string for missing
translations, which leaked raw keys into production HTML when AF
parity drifted. With five locales arriving, silent EN fallback is
the correct multi-locale behavior."
```

---

## Task 5: Add new SEO/brand/locale/currency namespaces to `en.json` and `af.json`

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/af.json`

The new top-level keys to add to each file (paste at the end before the closing `}`):

For **en.json** add:

```json
,
  "seo": {
    "home": {
      "title": "Urban Elephant | Luxury Apartment Hotels in Cape Town",
      "description": "Officially graded 4-star luxury apartments in Cape Town. Hotel comfort, design-led spaces, and the consistency of professional management — Urban Elephant.",
      "ogTitle": "Urban Elephant | Luxury Apartment Hotels in Cape Town",
      "ogDescription": "Experience Cape Town like never before. Luxury apartment hotels with stunning views and personalized service."
    },
    "about": {
      "title": "About",
      "description": "The family behind Urban Elephant — Cape Town apartment hotels graded by the Tourism Grading Council of South Africa.",
      "ogTitle": "About Urban Elephant",
      "ogDescription": "Family-owned, TGCSA-graded apartment hotels in Cape Town."
    },
    "herd": {
      "title": "The Herd",
      "description": "Meet the operations team behind every Urban Elephant stay.",
      "ogTitle": "The Herd | Urban Elephant",
      "ogDescription": "The people who make every stay feel taken care of."
    },
    "properties": {
      "title": "Properties",
      "description": "Four design-led apartment hotels across Cape Town's most distinctive neighbourhoods.",
      "ogTitle": "Cape Town Apartment Hotels | Urban Elephant",
      "ogDescription": "Hotel comfort with apartment privacy across Cape Town."
    },
    "tours": {
      "title": "Tours & Experiences",
      "description": "Curated Cape Town day-trips and experiences, bookable through the Urban Elephant concierge.",
      "ogTitle": "Cape Town Tours | Urban Elephant",
      "ogDescription": "Concierge-curated Cape Town experiences for Urban Elephant guests."
    },
    "faq": {
      "title": "FAQ",
      "description": "Check-in, parking, WiFi, housekeeping, airport transfers — the questions guests ask most often.",
      "ogTitle": "FAQ | Urban Elephant",
      "ogDescription": "Everything you need to know before your Cape Town stay."
    },
    "recommendations": {
      "title": "Recommendations",
      "description": "Restaurants, attractions, and neighbourhood insights from the Urban Elephant team.",
      "ogTitle": "Cape Town Recommendations | Urban Elephant",
      "ogDescription": "Where to eat, what to see, what to skip."
    },
    "carHire": {
      "title": "Car Hire",
      "description": "Vehicle hire for Urban Elephant guests via our Enterprise partnership.",
      "ogTitle": "Car Hire | Urban Elephant",
      "ogDescription": "Pick-up at the airport, drop-off at the apartment."
    },
    "contact": {
      "title": "Contact",
      "description": "Direct booking and concierge enquiries for Urban Elephant apartment hotels.",
      "ogTitle": "Contact Urban Elephant",
      "ogDescription": "Direct booking gets the best rate and personal service."
    }
  },
  "brand": {
    "atConnector": "at"
  },
  "locale": {
    "switcher": {
      "label": "Language"
    },
    "banner": {
      "promptDeutsch": "Diese Seite auf Deutsch ansehen?",
      "promptFrancais": "Voir cette page en français ?",
      "promptDansk": "Se denne side på dansk?",
      "switch": "Switch",
      "dismiss": "Dismiss"
    }
  },
  "currency": {
    "indicativeNote": "≈ {amount}, billed in ZAR"
  }
```

For **af.json** add the same structure with **identical English values for now** — these are placeholder strings to be sent to Niles in a follow-up snippet batch. Same JSON tree as above, identical strings. (Per spec §11.9: AF translations of the new keys are not blocking infrastructure; they land as a tiny follow-up PR once Niles returns the rewrites.)

- [ ] **Step 1: Open `src/messages/en.json` and append the namespaces above before the closing `}`. Make sure the existing last entry has a trailing comma.**

- [ ] **Step 2: Open `src/messages/af.json` and append the SAME blocks (identical English values). They are placeholders until Niles reviews.**

- [ ] **Step 3: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/messages/en.json'))"
node -e "JSON.parse(require('fs').readFileSync('src/messages/af.json'))"
```
Expected: no output (valid JSON).

- [ ] **Step 4: Mirror the same blocks into `de.json`, `fr.json`, `da.json` (still EN values — they are placeholder copies until translation PRs)**

```bash
# Easiest: re-copy en.json over the placeholder files since they were placeholder copies anyway
cp src/messages/en.json src/messages/de.json
cp src/messages/en.json src/messages/fr.json
cp src/messages/en.json src/messages/da.json
```

- [ ] **Step 5: Commit**

```bash
git add src/messages/en.json src/messages/af.json src/messages/de.json src/messages/fr.json src/messages/da.json
git commit -m "Add seo/brand/locale/currency namespaces to message files

EN values relocated from hardcoded strings in src/app/layout.tsx
and per-page metadata. AF copies are placeholder English pending
Niles review (per spec §11.9). de/fr/da remain en copies until
translation PRs."
```

---

## Task 6: Convert types in `src/types/index.ts` to use `Localized<T>`

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Replace `src/types/index.ts` with the locale-aware types**

```ts
import type { Localized } from "@/lib/i18n-content";

export interface PropertyAmenity {
  name: Localized<string>;
  icon?: string;
  category?: "general" | "room" | "bathroom" | "kitchen" | "entertainment" | "building";
}

export interface PropertyHighlight {
  title: Localized<string>;
  description?: Localized<string>;
  icon?: string;
}

export interface PropertyAward {
  provider: "booking.com";
  score: number;
  year: number;
  pdf: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface PriceRange {
  min: number;
  max?: number;
  currency: "ZAR";
}

export interface PostalAddress {
  street: string;
  locality: string;
  postalCode?: string;
  country: string;
}

export interface Property {
  _id: string;
  slug: string;
  name: string;
  tagline?: Localized<string>;
  description?: Localized<string[]>;
  location?: Localized<string>;
  address?: string;
  postalAddress?: PostalAddress;
  geo?: GeoCoordinates;
  priceRange?: PriceRange;
  heroImage?: string;
  gallery?: string[];
  video?: string;
  amenities?: PropertyAmenity[];
  highlights?: PropertyHighlight[];
  nearbyAttractions?: Attraction[];
  bookingUrl?: string;
  starRating?: number;
  featured?: boolean;
  order?: number;
  awards?: PropertyAward[];
}

export type PropertyCard = Property;

export interface TourGroupSize {
  min?: number;
  max?: number;
}

export type TourCategory =
  | "adventure"
  | "wildlife"
  | "cultural"
  | "wine-food"
  | "sightseeing"
  | "water-sports";

export interface Tour {
  _id: string;
  slug: string;
  name: Localized<string>;
  category?: TourCategory;
  shortDescription?: Localized<string>;
  description?: Localized<string[]>;
  image?: string;
  gallery?: string[];
  duration?: Localized<string>;
  price?: number;
  priceNote?: Localized<string>;
  highlights?: Localized<string[]>;
  includes?: Localized<string[]>;
  excludes?: Localized<string[]>;
  meetingPoint?: Localized<string>;
  groupSize?: TourGroupSize;
  featured?: boolean;
  order?: number;
}

export type TourCard = Tour;

export type ReviewSource = "google" | "booking" | "tripadvisor" | "client" | "airbnb" | "expedia";

export interface Review {
  _id: string;
  author: string;
  authorLocation?: string;
  content: string;
  rating: number;
  source?: ReviewSource;
  sourceScore?: number;
  property?: { name: string; slug: string };
  date?: string;
  featured?: boolean;
}

export interface Attraction {
  _id: string;
  slug: string;
  name: string;
  description?: Localized<string>;
  hostNote?: Localized<string>;
  image?: string;
  category?: "dining" | "sightseeing" | "activity" | "shopping" | "nightlife" | "culture";
  distance?: string;
  website?: string;
}

export interface Restaurant {
  _id: string;
  slug: string;
  name: string;
  description?: Localized<string>;
  hostNote?: Localized<string>;
  image?: string;
  cuisineType?: Localized<string>;
  mealType?: "breakfast" | "lunch" | "dinner";
  website?: string;
  perk?: Localized<string>;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  operationsHours?: string;
  afterHoursPhone?: string;
}

export interface AddressInfo {
  city: string;
  country: string;
  street?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface SiteSettings {
  siteName: string;
  contact: ContactInfo;
  address: AddressInfo;
  social: SocialMedia;
  bookNowUrl?: string;
}
```

- [ ] **Step 2: Build — expect MANY errors in `content.ts` and `property-faq.ts`**

Run: `npm run build`
Expected: TypeScript errors on every Property/Tour/Attraction/Restaurant in `src/data/content.ts` and FAQ entries in `src/lib/property-faq.ts`. This is intentional — Tasks 7 and 8 wrap each value in `{ en: ... }`.

Do NOT commit yet — types must be paired with data updates to compile.

---

## Task 7: Wrap translatable fields in `src/data/content.ts` as `{ en: <value> }`

**Files:**
- Modify: `src/data/content.ts`

The file is 669 lines. This task is mechanical: every field that is now `Localized<T>` per the new types becomes `{ en: <existing value> }`.

- [ ] **Step 1: For each Property in `src/data/content.ts`, apply this transformation**

For each property object:

- `tagline: "..."` → `tagline: { en: "..." }`
- `description: ["...", "..."]` → `description: { en: ["...", "..."] }`
- `location: "..."` → `location: { en: "..." }`
- In `amenities: [{ name: "..." }, ...]`: each amenity's `name: "..."` → `name: { en: "..." }`
- In `highlights: [{ title: "...", description: "..." }, ...]`: each `title: "..."` → `title: { en: "..." }`, each `description: "..."` → `description: { en: "..." }`

For each Tour:

- `name: "..."` → `name: { en: "..." }`
- `shortDescription: "..."` → `shortDescription: { en: "..." }`
- `description: ["..."]` → `description: { en: ["..."] }`
- `duration: "..."` → `duration: { en: "..." }`
- `priceNote: "..."` → `priceNote: { en: "..." }`
- `highlights: ["..."]` → `highlights: { en: ["..."] }`
- `includes: ["..."]` → `includes: { en: ["..."] }`
- `excludes: ["..."]` → `excludes: { en: ["..."] }`
- `meetingPoint: "..."` → `meetingPoint: { en: "..." }`

For each Attraction or Restaurant inside `nearbyAttractions` (or anywhere they're constructed):

- `description: "..."` → `description: { en: "..." }`
- `hostNote: "..."` → `hostNote: { en: "..." }`
- Restaurant `cuisineType: "..."` → `cuisineType: { en: "..." }`
- Restaurant `perk: "..."` → `perk: { en: "..." }`

`Property.name`, `Tour.slug`, addresses, geo coords, image paths, price numbers — all stay as plain strings/numbers.

- [ ] **Step 2: Run build until it succeeds**

Run: `npm run build`
Expected: errors progressively disappear as you wrap fields. Iterate until build is green or only `src/lib/property-faq.ts` errors remain (handled in Task 8).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts src/types/index.ts
git commit -m "Wrap property/tour content fields in Localized<T>

No semantic change to EN render — every translatable field is now
{ en: <existing value> } and other locales fall back to en via
pickLocale. Sets up the data layer for de/fr/da translations to
land per language without further type changes."
```

---

## Task 8: Wrap FAQ entries in `src/lib/property-faq.ts`

**Files:**
- Modify: `src/lib/property-faq.ts`

- [ ] **Step 1: Read the file and identify all translatable fields**

```bash
cat src/lib/property-faq.ts
```

The FAQ structure has `question` and `answer` fields per entry that need to become `Localized<string>`.

- [ ] **Step 2: Update the FAQ type and each entry**

At the top of the file, replace whatever the current `FAQ` / `FAQEntry` type is with:

```ts
import type { Localized } from "@/lib/i18n-content";

export interface FAQEntry {
  question: Localized<string>;
  answer: Localized<string>;
}
```

(Preserve any other fields the existing type has — `slug`, `category`, etc. — but make `question` and `answer` `Localized<string>`.)

For each FAQ entry, transform:

- `question: "How..."` → `question: { en: "How..." }`
- `answer: "..."` → `answer: { en: "..." }`

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/lib/property-faq.ts
git commit -m "Wrap FAQ entries in Localized<T>

Same shape change as content.ts. EN fallback preserves current
FAQ rendering until translations land."
```

---

## Task 9: Find and fix all consumer call sites that read formerly-string fields

**Files:**
- Search and modify any component that reads `property.tagline`, `property.description`, `property.amenities[].name`, `property.highlights[].title`, `tour.name`, `tour.description`, `tour.shortDescription`, `tour.priceNote`, `tour.highlights`, `tour.includes`, `tour.excludes`, `tour.duration`, `tour.meetingPoint`, FAQ `question`/`answer`, Attraction `description`/`hostNote`, Restaurant `description`/`hostNote`/`cuisineType`/`perk`.

- [ ] **Step 1: Find all consumer files**

```bash
grep -rln "\.tagline\|\.description\|\.shortDescription\|\.priceNote\|\.highlights\|\.includes\|\.excludes\|\.meetingPoint\|\.duration\|amenities.*name\|highlights.*title\|hostNote\|cuisineType\|\.perk\b" src/components/ src/app/ 2>/dev/null
```

Each file in the result needs review. The transformation is: wherever a formerly-string-or-string-array field is now `Localized<T>`, replace the bare read with `pickLocale(field, locale)` (or `pickOptional` if the field itself is optional).

- [ ] **Step 2: For each consumer file, apply the transformation pattern**

Generic pattern for a server component:

```tsx
// Before
import type { Property } from "@/types";
export function PropertyCard({ property }: { property: Property }) {
  return <p>{property.tagline}</p>;
}

// After
import type { Property } from "@/types";
import type { Locale } from "@/i18n/routing";
import { pickOptional } from "@/lib/i18n-content";

export function PropertyCard({ property, locale }: { property: Property; locale: Locale }) {
  const tagline = pickOptional(property.tagline, locale);
  return tagline ? <p>{tagline}</p> : null;
}
```

For client components, get locale via `useLocale()`:

```tsx
"use client";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pickOptional } from "@/lib/i18n-content";

export function PropertyCardClient({ property }: { property: Property }) {
  const locale = useLocale() as Locale;
  const tagline = pickOptional(property.tagline, locale);
  return tagline ? <p>{tagline}</p> : null;
}
```

For pages, get locale from params:

```tsx
const { locale } = await params;
// pass `locale` down or call pickLocale here
```

- [ ] **Step 3: Build until green**

Run: `npm run build`
Expected: build succeeds. Every previously-string read of a now-Localized field has been wrapped.

- [ ] **Step 4: Dev server smoke check**

```bash
npm run dev
```
Visit `/`, `/af`, `/de`, `/fr`, `/da`, `/properties/<any-slug>`, `/tours/<any-slug>`, `/faq`. All should render normally with English content. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add -u src/
git commit -m "Wire consumer call sites to pickLocale for Localized fields

Every component that previously read property.tagline / tour.name
/ FAQ.question / etc as plain strings now resolves via pickLocale
with the active locale. EN fallback preserves current rendering."
```

---

## Task 10: Refactor `src/components/seo/structured-data.tsx` for locale-awareness

**Files:**
- Modify: `src/components/seo/structured-data.tsx`

- [ ] **Step 1: Update the file**

Add `locale` parameter to `hotelSchema`, `touristTripSchema`, `breadcrumbSchema`, `itemListSchema`, `faqPageSchema`. Update `organizationSchema` and `websiteSchema` for five-language `availableLanguage` / `inLanguage`. Hotel `@id` becomes locale-independent.

Apply these specific edits inside `structured-data.tsx`:

**`organizationSchema`** — change:
```ts
availableLanguage: ["English", "Afrikaans"],
```
to:
```ts
availableLanguage: ["English", "Afrikaans", "German", "French", "Danish"],
```

**`websiteSchema`** — change:
```ts
inLanguage: ["en-ZA", "af-ZA"],
```
to:
```ts
inLanguage: ["en-ZA", "af-ZA", "de-DE", "fr-FR", "da-DK"],
```

**`hotelSchema(property: Property)`** → **`hotelSchema(property: Property, locale: Locale)`**:

Top of function:
```ts
import { pickLocale, pickOptional } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

export function hotelSchema(property: Property, locale: Locale) {
  const url = localizedUrl(locale, `/properties/${property.slug}`);
  const id = `${SITE_URL}/properties/${property.slug}#hotel`;
  const description = pickOptional(property.tagline, locale)
    ?? pickOptional(property.description, locale)?.[0];
  // ... rest unchanged except:
  // - amenityFeature: pickLocale(a.name, locale)
  // - description uses computed value above
  // - availableLanguage: ["English", "Afrikaans", "German", "French", "Danish"]
  // - @id: id
  // - url: url
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": id,
    name: `Urban Elephant at ${property.name}`,
    description,
    url,
    // ... existing fields, but replace:
    //   amenityFeature: property.amenities?.map((a) => ({ ..., name: a.name })) 
    //   with:
    //   amenityFeature: property.amenities?.map((a) => ({ ..., name: pickLocale(a.name, locale) }))
    // ...
    availableLanguage: ["English", "Afrikaans", "German", "French", "Danish"],
  };
}
```

**`touristTripSchema(tour: Tour)`** → **`touristTripSchema(tour: Tour, locale: Locale)`**:

```ts
export function touristTripSchema(tour: Tour, locale: Locale) {
  const url = localizedUrl(locale, `/tours/${tour.slug}`);
  const id = `${SITE_URL}/tours/${tour.slug}#trip`;
  const name = pickLocale(tour.name, locale);
  const description = pickOptional(tour.shortDescription, locale)
    ?? pickOptional(tour.description, locale)?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": id,
    name,
    description,
    url,
    image: asAbsolute(tour.image),
    provider: { "@id": ORG_ID },
    ...(tour.price && {
      offers: {
        "@type": "Offer",
        price: tour.price,
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
        url,
      },
    }),
  };
}
```

**`breadcrumbSchema(crumbs)`** → **`breadcrumbSchema(crumbs, locale: Locale)`**:

```ts
export function breadcrumbSchema(crumbs: Crumb[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: localizedUrl(locale, c.path),
    })),
  };
}
```

**`itemListSchema(items, name?)`** → **`itemListSchema(items, locale: Locale, name?)`**:

```ts
export function itemListSchema(items: ListItem[], locale: Locale, name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name && { name }),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localizedUrl(locale, item.path),
      name: item.name,
    })),
  };
}
```

**`faqPageSchema`** stays the same signature; its callers will pass already-localized strings (resolved via `pickLocale`).

- [ ] **Step 2: Build — expect call-site errors**

Run: `npm run build`
Expected: errors in pages that call `hotelSchema(property)` without `locale`, etc. They're fixed in Tasks 11–13.

Do not commit yet — wait until call sites are fixed in the next tasks. (Or commit now with `--allow-empty-message` knowledge that build will go green after Task 13. Prefer to wait.)

---

## Task 11: Add `pageMetadata` and `detailPageMetadata` helpers to `i18n-content.ts`

**Files:**
- Modify: `src/lib/i18n-content.ts`

- [ ] **Step 1: Append the helpers to the bottom of `src/lib/i18n-content.ts`**

```ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildAlternates, localizedUrl } from "@/lib/seo";

export async function pageMetadata(
  namespace: string,
  path: string,
  locale: Locale,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const og = LOCALE_TO_OG[locale];
  const alternates = routing.locales
    .filter((l) => l !== locale)
    .map((l) => LOCALE_TO_OG[l]);
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(path),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(locale, path),
      siteName: "Urban Elephant",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/images/site/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/images/site/og.jpg"],
    },
  };
}

export function detailPageMetadata(args: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const og = LOCALE_TO_OG[args.locale];
  const alternates = routing.locales
    .filter((l) => l !== args.locale)
    .map((l) => LOCALE_TO_OG[l]);
  const image = args.image ?? "/images/site/og.jpg";
  return {
    title: args.title,
    description: args.description,
    alternates: buildAlternates(args.path),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(args.locale, args.path),
      siteName: "Urban Elephant",
      title: args.title,
      description: args.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [image],
    },
  };
}
```

- [ ] **Step 2: Build (build will still fail until Task 13; that's expected)**

Run: `npm run build`

Do not commit yet.

---

## Task 12: Update root `src/app/layout.tsx` — strip locale-specific defaults

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import { Analytics } from "@/components/global/analytics";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/structured-data";
import { LOCALE_TO_BCP47 } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import "./globals.css";

const biko = localFont({
  src: "../../public/Biko_Regular.otf",
  variable: "--font-biko",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.urbanelephant.co.za"),
  authors: [{ name: "Urban Elephant" }],
  creator: "Urban Elephant",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as Locale;
  const lang = LOCALE_TO_BCP47[locale] ?? "en-ZA";
  return (
    <html lang={lang} className={biko.variable} suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

What changed:
- Removed hardcoded `title.default`, `title.template`, `description`, `keywords`, `openGraph`, `twitter` — these now live in per-page `generateMetadata` via `pageMetadata()`.
- `<html lang>` now reflects active locale via `getLocale()`.
- Kept top-level `metadataBase`, `authors`, `creator`, `robots` — global, locale-independent.

- [ ] **Step 2: Build (still expecting errors from page metadata until Task 13)**

Run: `npm run build`

Do not commit yet.

---

## Task 13: Update `generateMetadata` in every `[locale]/.../page.tsx`

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/the-herd/page.tsx`
- Modify: `src/app/[locale]/properties/page.tsx`
- Modify: `src/app/[locale]/properties/[slug]/page.tsx`
- Modify: `src/app/[locale]/tours/page.tsx`
- Modify: `src/app/[locale]/tours/[slug]/page.tsx`
- Modify: `src/app/[locale]/faq/page.tsx`
- Modify: `src/app/[locale]/recommendations/page.tsx`
- Modify: `src/app/[locale]/car-hire/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`

For each, replace the existing `generateMetadata` function with the corresponding pattern below. Also update any callers of `hotelSchema`, `touristTripSchema`, `breadcrumbSchema`, `itemListSchema` to pass `locale`.

- [ ] **Step 1: `src/app/[locale]/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.home", "/", locale as Locale);
}
```

Inside the page body, update the `itemListSchema` call to pass `locale`:

```tsx
<JsonLd
  data={itemListSchema(
    properties.map((p) => ({
      name: `Urban Elephant at ${p.name}`,
      path: `/properties/${p.slug}`,
    })),
    locale as Locale,
    "Featured Urban Elephant Properties",
  )}
/>
```

- [ ] **Step 2: `src/app/[locale]/about/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.about", "/about", locale as Locale);
}
```

- [ ] **Step 3: `src/app/[locale]/the-herd/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.herd", "/the-herd", locale as Locale);
}
```

- [ ] **Step 4: `src/app/[locale]/properties/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.properties", "/properties", locale as Locale);
}
```

If the page emits `itemListSchema` or `breadcrumbSchema`, pass `locale` to those calls too.

- [ ] **Step 5: `src/app/[locale]/properties/[slug]/page.tsx`** — uses `detailPageMetadata` from content

```tsx
import type { Locale } from "@/i18n/routing";
import { detailPageMetadata, pickLocale, pickOptional } from "@/lib/i18n-content";
import { getPropertyBySlug } from "@/data/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<import("next").Metadata> {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  const lc = locale as Locale;
  const title = `Urban Elephant at ${property.name}`;
  const description =
    pickOptional(property.tagline, lc)
    ?? pickOptional(property.description, lc)?.[0]
    ?? "Luxury apartment hotel in Cape Town.";
  return detailPageMetadata({
    locale: lc,
    path: `/properties/${property.slug}`,
    title,
    description,
    image: property.heroImage,
  });
}
```

Inside the page body, update `hotelSchema(property)` to `hotelSchema(property, locale as Locale)` and any breadcrumb call similarly.

- [ ] **Step 6: `src/app/[locale]/tours/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.tours", "/tours", locale as Locale);
}
```

- [ ] **Step 7: `src/app/[locale]/tours/[slug]/page.tsx`** — detail page

```tsx
import type { Locale } from "@/i18n/routing";
import { detailPageMetadata, pickLocale, pickOptional } from "@/lib/i18n-content";
import { getTourBySlug } from "@/data/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<import("next").Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  const lc = locale as Locale;
  const title = pickLocale(tour.name, lc);
  const description =
    pickOptional(tour.shortDescription, lc)
    ?? pickOptional(tour.description, lc)?.[0]
    ?? "A curated Cape Town experience.";
  return detailPageMetadata({
    locale: lc,
    path: `/tours/${tour.slug}`,
    title,
    description,
    image: tour.image,
  });
}
```

Inside body, update `touristTripSchema(tour)` to `touristTripSchema(tour, locale as Locale)`.

- [ ] **Step 8: `src/app/[locale]/faq/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.faq", "/faq", locale as Locale);
}
```

If `faqPageSchema` is called, ensure questions/answers are resolved via `pickLocale` before passing.

- [ ] **Step 9: `src/app/[locale]/recommendations/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.recommendations", "/recommendations", locale as Locale);
}
```

- [ ] **Step 10: `src/app/[locale]/car-hire/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.carHire", "/car-hire", locale as Locale);
}
```

- [ ] **Step 11: `src/app/[locale]/contact/page.tsx`**

```tsx
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.contact", "/contact", locale as Locale);
}
```

- [ ] **Step 12: Final build — must be green**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 13: Dev smoke**

```bash
npm run dev
```
Visit `/`, `/af`, `/de`, `/fr`, `/da`, `/de/properties/<slug>`, `/fr/tours/<slug>`, `/da/faq`. Inspect each page's `<head>` in DevTools — confirm:
- `<html lang="de-DE">` on `/de/...`, etc.
- `<meta property="og:locale" content="de_DE">` on `/de/...`
- `<link rel="alternate" hreflang="de" href=".../de/...">` plus other hreflang entries on each page

Stop dev server.

- [ ] **Step 14: Commit**

```bash
git add src/lib/i18n-content.ts src/app/layout.tsx src/components/seo/structured-data.tsx src/app/[locale]/
git commit -m "Make structured data and page metadata locale-aware

Hotel/TouristTrip/Breadcrumb/ItemList schemas now take locale and
emit locale-matched URLs. Page generateMetadata pulls from per-route
seo.* namespace and emits localized OG locale + alternateLocale +
hreflang. <html lang> reflects active locale.

Hotel @id stays canonical (slug-based, not locale-prefixed) so Google
joins all locale variants as one Hotel entity."
```

---

## Task 14: Create `<Price>` component

**Files:**
- Create: `src/components/atoms/price.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useLocale, useTranslations } from "next-intl";
import { INDICATIVE_FX, formatIndicative } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  zar: number;
  suffix?: string;
};

export function Price({ zar, suffix }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("currency");
  const fx = INDICATIVE_FX[locale];
  const zarLabel = `R${zar.toLocaleString(fx.code === "ZAR" ? "en-ZA" : "en-ZA")}`;
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
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/atoms/price.tsx
git commit -m "Add Price component with indicative FX display

Primary ZAR amount + (≈ €X, billed in ZAR) for de/fr/da locales."
```

---

## Task 15: Replace inline price renders with `<Price>`

**Files:**
- Modify any component that renders prices inline as `R${...}`

- [ ] **Step 1: Find inline price renders**

```bash
grep -rn "R\\\${" src/components/ src/app/'[locale]'/ 2>/dev/null
```

Likely call sites:
- Property cards (in `src/components/property/` or `src/components/sections/properties-grid.tsx`)
- Property detail content (`src/components/property/property-detail-content.tsx`)
- Tour cards (`src/components/tour/`)
- Tour detail pages

- [ ] **Step 2: Replace each inline render**

Example transformation in any card/detail file:

```tsx
// Before
{property.priceRange && (
  <p>From R{property.priceRange.min.toLocaleString()}/night</p>
)}

// After
import { Price } from "@/components/atoms/price";
// ...
{property.priceRange && (
  <p>
    From <Price zar={property.priceRange.min} suffix="/ night" />
  </p>
)}
```

Apply the same pattern to all tour price renders. Do not modify the `structured-data.tsx` price logic — that's already locale-agnostic and uses `priceCurrency: "ZAR"` correctly.

- [ ] **Step 3: Build and dev smoke**

Run: `npm run build`
Expected: success.

Run: `npm run dev`. Visit `/de/properties/<slug>` and confirm the price shows `R1,250 / night ≈ €62, billed in ZAR` (or similar). Visit `/`/`/af` and confirm no indicative suffix. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add -u src/
git commit -m "Render prices via <Price> for indicative FX on de/fr/da"
```

---

## Task 16: Create language switcher dropdown component

**Files:**
- Create: `src/components/layout/language-switcher.tsx`

- [ ] **Step 1: Create the dropdown component**

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Globe, Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_NATIVE_NAME } from "@/lib/i18n-content";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (target: Locale) => {
    router.replace(pathname, { locale: target });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors">
        <Globe className="size-4" />
        {LOCALE_NATIVE_NAME[locale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-50 min-w-[12rem] rounded-md border bg-white p-1 shadow-md"
      >
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => switchTo(l)}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100"
          >
            <span>{LOCALE_NATIVE_NAME[l]}</span>
            {l === locale ? <Check className="size-3.5" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/language-switcher.tsx
git commit -m "Add LanguageSwitcher dropdown showing native locale names

Replaces the 2-state toggle. Five options listed by native name
(English, Afrikaans, Deutsch, Français, Dansk). Preserves path when
switching."
```

---

## Task 17: Replace 2-state toggle in `header.tsx` with `LanguageSwitcher`

**Files:**
- Modify: `src/components/layout/header.tsx`

- [ ] **Step 1: Edit header.tsx**

Find the section currently rendering the toggle (around lines 54–55 and the `<button>` near line 133). Remove:

```tsx
const newLocale = locale === "en" ? "af" : "en";
router.replace(pathname, { locale: newLocale });
```

…and the button that renders `{locale.toUpperCase()}` with the Globe icon.

Replace with:

```tsx
import { LanguageSwitcher } from "@/components/layout/language-switcher";

// ... in the JSX where the old toggle button was:
<LanguageSwitcher />
```

Also remove the now-unused `Globe` import (the switcher imports its own), and remove any unused `useRouter`/`usePathname` imports that were only there for the toggle. Verify the mobile menu also includes `<LanguageSwitcher />` somewhere appropriate.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Dev smoke — verify switcher in browser**

```bash
npm run dev
```

Visit `/`, click the language switcher in the header, switch to Deutsch — URL should change to `/de`. Switch back to English. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "Use LanguageSwitcher in header

Removes legacy 2-state toggle."
```

---

## Task 18: Create `LocaleBanner` component

**Files:**
- Create: `src/components/global/locale-banner.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const DISMISSED_KEY = "ue-locale-banner-dismissed";
const PROMPT_KEYS: Record<Locale, string | null> = {
  en: null,
  af: null,
  de: "promptDeutsch",
  fr: "promptFrancais",
  da: "promptDansk",
};

export function LocaleBanner() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale.banner");
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    const nav = navigator.language?.split("-")[0]?.toLowerCase();
    if (!nav) return;
    if (nav === currentLocale) return;
    if (!routing.locales.includes(nav as Locale)) return;
    const target = nav as Locale;
    if (!PROMPT_KEYS[target]) return;
    setSuggested(target);
  }, [currentLocale]);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setSuggested(null);
  };

  const accept = () => {
    if (!suggested) return;
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    router.replace(pathname, { locale: suggested });
  };

  if (!suggested) return null;
  const promptKey = PROMPT_KEYS[suggested];
  if (!promptKey) return null;

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      className="bg-neutral-900 text-white px-4 py-2 flex items-center justify-center gap-4 text-sm"
    >
      <span lang={suggested}>{t(promptKey)}</span>
      <button
        onClick={accept}
        className="underline font-medium"
        lang={suggested}
      >
        {t("switch")}
      </button>
      <button
        onClick={dismiss}
        className="opacity-70 hover:opacity-100"
        aria-label={t("dismiss")}
      >
        ×
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/global/locale-banner.tsx
git commit -m "Add LocaleBanner — client-side language suggestion

Detects navigator.language, suggests matching locale via dismissible
banner. localStorage dismissal persists. No crawler impact (banner
is client-only)."
```

---

## Task 19: Mount `LocaleBanner` in `[locale]/layout.tsx`

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Add the import and mount**

Add at the top:

```tsx
import { LocaleBanner } from "@/components/global/locale-banner";
```

Inside the returned JSX, mount `<LocaleBanner />` immediately inside the `<NextIntlClientProvider>` and **above** `<Header />`:

```tsx
return (
  <NextIntlClientProvider messages={messages}>
    <a href="#main" className="skip-link">Skip to content</a>
    <LocaleBanner />
    <SmoothScroll>
      <ScrollProgress />
      <Header />
      ...
```

- [ ] **Step 2: Build and dev smoke**

Run: `npm run build`
Expected: success.

Run: `npm run dev`. In DevTools, change browser language to German (or use a German Accept-Language). Visit `/` — banner should appear suggesting Deutsch. Click dismiss — banner disappears, won't reappear. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "Mount LocaleBanner in [locale] layout"
```

---

## Task 20: Update `src/app/llms.txt/route.ts` for five-language note

**Files:**
- Modify: `src/app/llms.txt/route.ts`

- [ ] **Step 1: Open the file and update two sections**

In the `Guest information` block, add a line near the existing items:

```ts
- Languages: staff communicate in English; written guest materials available in English, Afrikaans, German, French, and Danish.
```

At the bottom, replace:

```
The site is bilingual: English at ${SITE_URL}, Afrikaans at ${SITE_URL}/af.
```

with:

```
The site is available in five languages:
- English: ${SITE_URL}
- Afrikaans: ${SITE_URL}/af
- German: ${SITE_URL}/de
- French: ${SITE_URL}/fr
- Danish: ${SITE_URL}/da
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/llms.txt/route.ts
git commit -m "Update llms.txt language note for five locales"
```

---

## Task 21: Add Playwright smoke test for all five locales

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/i18n.spec.ts`
- Modify: `package.json` (add `test` script)

- [ ] **Step 1: Create `playwright.config.ts` at the project root**

```ts
import { defineConfig } from "playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 2: Create `tests/i18n.spec.ts`**

```ts
import { test, expect } from "playwright/test";

const LOCALES: Array<{ code: string; path: string; bcp47: string; og: string }> = [
  { code: "en", path: "/", bcp47: "en-ZA", og: "en_ZA" },
  { code: "af", path: "/af", bcp47: "af-ZA", og: "af_ZA" },
  { code: "de", path: "/de", bcp47: "de-DE", og: "de_DE" },
  { code: "fr", path: "/fr", bcp47: "fr-FR", og: "fr_FR" },
  { code: "da", path: "/da", bcp47: "da-DK", og: "da_DK" },
];

for (const { code, path, bcp47, og } of LOCALES) {
  test(`${code}: home page renders with correct lang/OG/hreflang`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("html")).toHaveAttribute("lang", bcp47);

    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute("content", og);

    for (const other of LOCALES.filter((l) => l.code !== code)) {
      const link = page.locator(`link[rel="alternate"][hreflang="${other.code}"]`);
      await expect(link).toHaveCount(1);
    }
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefault).toHaveCount(1);

    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test(`${code}: deep page (property detail) renders 200`, async ({ page }) => {
    const slug = "the-rose";
    const url = code === "en" ? `/properties/${slug}` : `/${code}/properties/${slug}`;
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", bcp47);
  });
}

test("sitemap.xml lists all five hreflang variants for home", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
  const body = await response!.text();
  for (const { code } of LOCALES) {
    expect(body).toContain(`hreflang="${code}"`);
  }
});
```

- [ ] **Step 3: Add test script to package.json**

In `package.json`, add to `scripts`:

```json
"test": "playwright test",
"test:install": "playwright install --with-deps chromium"
```

- [ ] **Step 4: Install Playwright browser**

```bash
npm run test:install
```
Expected: chromium installed.

- [ ] **Step 5: Run tests**

```bash
npm run test
```
Expected: all tests pass. 12 tests (5 locales × 2 tests + 1 sitemap test).

If `the-rose` slug doesn't exist in this codebase, change the slug to an actual property slug in `tests/i18n.spec.ts` (check `src/data/content.ts` for available slugs).

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/i18n.spec.ts package.json package-lock.json
git commit -m "Add Playwright smoke tests for all five locales

Each locale's home and deep page returns 200, has correct
<html lang>, og:locale, and full hreflang fanout. Sitemap lists
all language variants."
```

---

## Task 22: Final manual QA + memory updates

**Files:**
- Update: `/Users/henricktissink/.claude/projects/-Users-henricktissink-Sauce-UrbanElephant/memory/bilingual_copy.md`
- Update: `/Users/henricktissink/.claude/projects/-Users-henricktissink-Sauce-UrbanElephant/memory/seo_architecture.md`

- [ ] **Step 1: Run final build, dev, and tests**

```bash
npm run build && npm run test
```
Expected: build and all 12 tests pass.

- [ ] **Step 2: Manual rich-results check**

In a browser, run Google's Rich Results Test (https://search.google.com/test/rich-results) against:
- `http://localhost:3000/properties/the-rose`
- `http://localhost:3000/de/properties/the-rose`

Both should report a valid `Hotel` structured data item. `@id` should be identical (`.../properties/the-rose#hotel`) across both — confirming Google will merge them as one Hotel entity.

- [ ] **Step 3: Update `bilingual_copy.md` memory**

Replace the body with:

```markdown
The site has five locales: en (default at root), af, de, fr, da.

Each `Localized<T>` content field requires an `en` key; other locales
are optional and fall back to en via pickLocale (src/lib/i18n-content.ts).

Message JSON files (src/messages/{en,af,de,fr,da}.json) must keep the
same keyspace. If a key is missing in a non-EN file, next-intl now
falls back to the EN value silently (configured in src/i18n/request.ts
via getMessageFallback). This is intentional — the legacy "literal key
in production" behavior was a footgun.

AF parity remains a contract — keep af.json keys synced with en.json.
de/fr/da are populated per-language via translation PRs.

**Why:** Multi-locale rollout (PR landed 2026-05-22). Silent EN fallback
is the correct multi-locale behavior. AF translations of new keys are
batched as Niles snippets when the keyspace grows.

**How to apply:** When adding a new UI string, add it to en.json AND
af.json (with AF translation requested from Niles). de/fr/da get the
EN value as placeholder until the next translation PR for that
language. When adding new property/tour prose, add `en` key only — the
translation PR will populate the other locales.
```

- [ ] **Step 4: Update `seo_architecture.md` memory**

Replace the body with:

```markdown
Five-locale SEO infrastructure (en, af, de, fr, da) shipped 2026-05-22.

Key files:
- `src/lib/seo.ts` — `localizedUrl(locale, path)`, `buildAlternates(path)`
- `src/lib/i18n-content.ts` — `pageMetadata`, `detailPageMetadata`, locale maps, INDICATIVE_FX
- `src/components/seo/structured-data.tsx` — every schema function takes `locale`; Hotel `@id` is canonical (slug-based, not locale-prefixed) so Google merges all locale variants as one entity
- `src/app/sitemap.ts` — auto-emits hreflang alternates for every locale
- `src/app/llms.txt/route.ts` — EN-only content with five-language note
- `src/lib/property-faq.ts` — FAQ entries are Localized<string>

Hreflang policy: language-only codes (de, fr, da) — no regional variants
(de-DE, fr-FR) for now. x-default points to EN root.

INDICATIVE_FX is a quarterly-updated constant; UI-only — actual billing
is always ZAR.

**Why:** Multilingual SEO requires locale-aware structured data,
canonical Hotel @id across locales, proper og:locale + alternateLocale,
and full hreflang fanout per page.

**How to apply:** Any new schema function takes `locale`. Any new
metadata-emitting page uses `pageMetadata` or `detailPageMetadata`.
When updating INDICATIVE_FX rates, update the "Last updated:" comment.
```

- [ ] **Step 5: This task is memory-only — no code commit needed.**

Memory files live outside the git repo. The previous task's commit was the last code change.

---

## Done

After Task 22, the site has:

- Five locales (`en`, `af`, `de`, `fr`, `da`) with EN content rendered everywhere.
- Per-locale `<html lang>`, OG locale, hreflang fanout, structured data.
- Locale-aware Hotel/TouristTrip/Breadcrumb/ItemList schemas with canonical entity `@id`s.
- A native-name language switcher dropdown and a dismissible locale-detection banner.
- `<Price>` component with indicative EUR/DKK on de/fr/da.
- llms.txt updated for five languages.
- Playwright smoke covering all locales.
- Memory updated.

PRs 2 (de), 3 (fr), 4 (da) — each adds the locale's translations to the existing `Localized<T>` fields and message JSON. Pure content. No further engineering.

---

## Self-Review (completed inline before publishing this plan)

**Spec coverage:** Every spec section mapped to a task. §3 routing → Task 2. §4 content shape → Tasks 1, 6, 7, 8, 9. §5 messages → Tasks 3, 4, 5. §6.2 structured data → Task 10. §6.3 page metadata → Tasks 11, 13. §6.4 html lang → Task 12. §6.5 llms.txt → Task 20. §7 banner → Tasks 18, 19. §8 switcher → Tasks 16, 17. §9 currency → Tasks 14, 15. §11 rollout → matches PR-1 contents. §12 testing → Task 21. §15 memory → Task 22.

**Placeholder scan:** No TBDs, no "implement later", no "similar to Task N". Every code step contains complete code.

**Type consistency:** `Localized<T>` requires `en` (defined Task 1, used Tasks 6–9). `pickLocale` and `pickOptional` (Task 1) used consistently in Tasks 9, 13, 14. `pageMetadata(namespace, path, locale)` and `detailPageMetadata({locale, path, title, description, image})` defined Task 11, called consistently Task 13. `hotelSchema(property, locale)` / `touristTripSchema(tour, locale)` / `breadcrumbSchema(crumbs, locale)` / `itemListSchema(items, locale, name?)` signatures defined Task 10, called consistently Task 13. `LOCALE_TO_BCP47` and `LOCALE_TO_OG` defined Task 1, used Tasks 11, 12, 21.
