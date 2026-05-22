# Multilingual Expansion + SEO — Design

**Date:** 2026-05-22
**Status:** Approved (decisions delegated)
**Scope:** Add Danish, German, French to a site currently shipping English (default) and Afrikaans, in a way that materially affects organic search and AI-assistant surfaces.

---

## 1. Goal

Make `urbanelephant.co.za` a five-locale site (`en`, `af`, `de`, `fr`, `da`) such that each locale ranks independently in its target market and surfaces correctly in AI-assistant referrals. The plumbing should ship before any non-English translation lands, so the SEO scaffolding is live from day one and translation work can land per language without further engineering risk.

## 2. Non-goals

- No live foreign-exchange API. Prices are billed in ZAR; locale pages display a quarterly-updated indicative conversion.
- No CMS migration. Content stays in TypeScript files.
- No regional hreflang variants (`de-DE`, `fr-FR`, `da-DK`) in the first pass. Language-only hreflang serves the global tourism audience. We can layer regional variants later without URL changes.
- No translation of guest reviews. Reviews are guest voice, locale-bound, and rendered with `lang` attribute reflecting the original language.
- No per-locale Open Graph imagery. One OG image, EN, for the first pass.

## 3. Architecture

### 3.1 Locale registry

```ts
// src/i18n/routing.ts
locales: ["en", "af", "de", "fr", "da"]
defaultLocale: "en"
localePrefix: "as-needed"   // EN at /, others at /{locale}
```

`as-needed` is non-negotiable: it preserves existing ranking equity on the EN root URLs. Migrating EN to `/en` would trigger a sitewide 301 storm.

### 3.2 BCP-47 mapping

```ts
// src/lib/i18n-content.ts
export const LOCALE_TO_BCP47: Record<Locale, string> = {
  en: "en-ZA",   // English as written in South Africa
  af: "af-ZA",
  de: "de-DE",   // primary German market
  fr: "fr-FR",   // primary French market
  da: "da-DK",
};

export const LOCALE_TO_OG: Record<Locale, string> = {
  en: "en_ZA", af: "af_ZA", de: "de_DE", fr: "fr_FR", da: "da_DK",
};

export const LOCALE_NATIVE_NAME: Record<Locale, string> = {
  en: "English", af: "Afrikaans", de: "Deutsch", fr: "Français", da: "Dansk",
};
```

Note: hreflang in `<link rel="alternate">` uses language-only codes (`hreflang="de"`), but `<html lang>` and OpenGraph use full BCP-47. This is correct per Google's docs.

### 3.3 URL shape

| Locale | URL form |
|---|---|
| en | `https://www.urbanelephant.co.za/properties/the-rose` |
| af | `https://www.urbanelephant.co.za/af/properties/the-rose` |
| de | `https://www.urbanelephant.co.za/de/properties/the-rose` |
| fr | `https://www.urbanelephant.co.za/fr/properties/the-rose` |
| da | `https://www.urbanelephant.co.za/da/properties/the-rose` |

Slugs do NOT translate. Translating slugs (`/de/eigenschaften/die-rose`) is a SEO purist's argument but creates a permanent maintenance burden, breaks all internal `<Link>`s, and complicates analytics. We accept English slugs and let translated `<title>`, `<h1>`, and body copy carry the keyword weight.

## 4. Content data layer

### 4.1 The Localized<T> primitive

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
```

The `en` key is required at the type level. Other locales fall back to EN. This means a property with only English copy renders cleanly under `/de`, `/fr`, `/da` — critical for the foundations-first rollout.

### 4.2 Type changes (`src/types/index.ts`)

Fields that become `Localized<T>`:

**`Property`:**
- `tagline?: Localized<string>`
- `description?: Localized<string[]>`
- `location?: Localized<string>` (the marketing location label, e.g. "De Waterkant — moments from the V&A Waterfront")

**`PropertyAmenity`:**
- `name: Localized<string>`

**`PropertyHighlight`:**
- `title: Localized<string>`
- `description?: Localized<string>`

**`Tour`:**
- `name: Localized<string>` — yes, including the name. German speakers search "Tagestour Kapstadt", not "Cape Town Day Tour". The name field carries primary keyword weight.
- `shortDescription?: Localized<string>`
- `description?: Localized<string[]>`
- `priceNote?: Localized<string>`
- `highlights?: Localized<string[]>`
- `includes?: Localized<string[]>`
- `excludes?: Localized<string[]>`
- `meetingPoint?: Localized<string>`

**`Attraction` / `Restaurant`:**
- `description?: Localized<string>`
- `hostNote?: Localized<string>`
- `cuisineType?: Localized<string>` (Restaurant only)
- `perk?: Localized<string>` (Restaurant only)
- `name` stays — these are proper nouns (restaurant names, attractions).

**`Review`:** untouched. Reviews keep `content: string` in original language. The component rendering reviews emits `<blockquote lang="...">` matching the review's actual language.

### 4.3 Brand-identity policy (encoded in code conventions)

| Element | Translated? | Notes |
|---|---|---|
| "Urban Elephant" wordmark | Never | Brand asset |
| Property short name (The Rose, 16 On Bree, Flamingo Express, Glasshouse) | Never | Brand-grade proper nouns |
| `Property.name` field | Never | Stays plain `string`, not `Localized<string>` |
| Connector "at" (as in "Urban Elephant at The Rose") | Translates | i18n key `brand.atConnector` — `at` / `by` (af) / `bei` (de) / `chez` (fr) / `hos` (da) |
| Tour name | Translates | `Tour.name` is `Localized<string>` |
| Geographic names in prose | Translates per native form | "Cape Town" → "Kapstadt" / "Le Cap" / "Kaapstad" / "Cape Town" (Danish uses the English form) — handled inside the translated `description` strings |

### 4.4 Migration shape

`src/data/content.ts` (669 lines) becomes ~5× larger as `description` arrays grow per-locale variants. We accept this. The file stays a single source of truth per the existing architecture. If it becomes unwieldy after translations land we can decompose later (per-property files), but that's a follow-up, not part of this work.

PR 1 leaves every content object with `{ en: <existing string> }` shape — no semantic change to current EN render. PRs 2–4 add the `de` / `fr` / `da` keys.

## 5. UI messages

### 5.1 Five mirrored files

`src/messages/{en,af,de,fr,da}.json`, all the same shape. New top-level namespaces added:

- `brand.atConnector` — see §4.3
- `seo.{home,about,herd,properties,property,tours,tour,faq,recommendations,carHire,contact}` with `title`, `description`, `ogTitle`, `ogDescription`, optional `keywords` per route
- `locale.banner` — `{ promptDeutsch, promptFrancais, promptDansk, switch, dismiss }`
- `locale.switcher` — `{ label }`
- `currency.indicativeNote` — "approx {amount}, billed in ZAR"

### 5.2 Fallback behavior — deliberate breaking change

`src/i18n/request.ts` is upgraded with `getMessageFallback` to return the **English value** when a key is missing in the active locale, instead of next-intl's default literal-key string.

```ts
return getRequestConfig({
  // ...
  getMessageFallback: ({ namespace, key }) => {
    // walk into en.json at namespace.key, return the EN string
  },
});
```

**This changes existing behavior:** before, a missing AF key rendered the literal key (per memory note about `bilingual_copy.md`). After, missing AF (or any) key renders EN. This is a deliberate improvement — silent EN fallback is the correct behavior for a multi-locale site and removes the "literal key in production" footgun. The existing AF parity remains a contract; this change just changes what happens when the contract is violated.

The `bilingual_copy` memory needs updating after this lands — the failure mode is different now.

### 5.3 Placeholder files for de / fr / da

PR 1 ships `de.json`, `fr.json`, `da.json` as **exact copies of `en.json`**. Not empty files. This guarantees:

- No fallback path is exercised in production until translations replace EN content key by key.
- TypeScript / next-intl typing remains consistent.
- Translators can diff against `en.json` to see what's translated vs. pending.

## 6. SEO surfaces

### 6.1 What we get for free

These files iterate `routing.locales` and require no code changes:

- `src/app/sitemap.ts` — generates `<url><xhtml:link rel="alternate" hreflang="...">` per locale + `x-default` (already does for `en`/`af`)
- `src/lib/seo.ts` `localizedUrl()` and `buildAlternates()`
- Per-page `generateMetadata().alternates`

### 6.2 Structured data — `src/components/seo/structured-data.tsx`

This is the biggest SEO refactor. Current code hardcodes `localizedUrl("en", …)` and `availableLanguage: ["English", "Afrikaans"]`. Changes:

**LodgingBusiness (organization) schema** — emitted once in the root layout, identical across all locales:
- `@id` stays `${SITE_URL}#organization` — Google joins entities by `@id`, this must be locale-independent.
- `url` stays canonical EN root.
- `availableLanguage` → `["English", "Afrikaans", "German", "French", "Danish"]`.
- All other fields unchanged.

**WebSite schema** — emitted once in root:
- `@id` stays `${SITE_URL}#website`.
- `inLanguage` → `["en-ZA", "af-ZA", "de-DE", "fr-FR", "da-DK"]`.

**Hotel schema** — emitted per property page, must become locale-aware:
- Add `locale` parameter to `hotelSchema(property, locale)`.
- `@id` becomes locale-independent: `${SITE_URL}/properties/${slug}#hotel` (NOT per-locale URL). All locale pages reference the same Hotel entity so Google merges them.
- `url` stays canonical EN URL (`localizedUrl("en", path)`).
- `description` pulls from `pickLocale(property.tagline ?? property.description?.[0], locale)`.
- `amenityFeature.name` pulls from `pickLocale(a.name, locale)`.
- `availableLanguage` → all five.
- Reviews keep original `content` + `Person.address` — no localization here.

**TouristTrip schema** — same pattern: locale parameter, locale-independent `@id`, canonical EN `url`, localized `name`/`description`/`offers.url`.

**BreadcrumbList / ItemList** — same pattern: take `locale`, emit URLs for that locale via `localizedUrl(locale, path)`, names via `pickLocale`. Breadcrumbs and item lists are tied to the page they live on, so per-locale URLs are correct here.

**FAQ schema** — translate questions/answers via `pickLocale`. Already isolated in `src/lib/property-faq.ts`. Conversion: each FAQ entry's `question` and `answer` become `Localized<string>`.

### 6.3 Page-level `generateMetadata`

Pattern applied to every `[locale]/.../page.tsx`:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.home" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),  // optional, comma-separated
    alternates: buildAlternates("/"),
    openGraph: {
      type: "website",
      locale: LOCALE_TO_OG[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => LOCALE_TO_OG[l]),
      url: localizedUrl(locale, "/"),
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
```

Property and tour detail pages pull title/description from the content layer (`pickLocale(property.tagline, locale)`), not from messages JSON — content lives with content.

### 6.4 `<html lang>` attribute

Today `src/app/layout.tsx` has `<html className={biko.variable}>` with no `lang`. Move the `<html>` element out of the root layout into a structure that knows the locale, or set `lang` from a client-equivalent. Cleanest with App Router: keep root layout for top-level providers, set `lang` via `[locale]/layout.tsx` using `LOCALE_TO_BCP47[locale]` on a `<html>` element there — but Next.js only allows one `<html>`. Approach: keep `<html>` in the root layout, but write `lang` server-side using a wrapper that reads the active locale from `next-intl/server`'s `getLocale()`, or pre-render at layout boundary with `setRequestLocale`. Implementation detail belongs to the plan, but the contract is: `<html lang="de-DE">` on `/de/*` pages, etc.

### 6.5 llms.txt

`src/app/llms.txt/route.ts` stays English-only (AI agents handle EN well; per-locale llms.txt is overkill). Update only the closing language note:

> The site is available in English, Afrikaans, German, French, and Danish.
> English at {SITE_URL}, Afrikaans at {SITE_URL}/af, German at {SITE_URL}/de, French at {SITE_URL}/fr, Danish at {SITE_URL}/da.

Also add a Guest-language line in the "Guest information" section:
> - Languages: staff communicate in English; written guest materials available in English, Afrikaans, German, French, and Danish.

## 7. Locale detection + banner

### 7.1 Component

New `src/components/global/locale-banner.tsx` (client). Mounted in `[locale]/layout.tsx` above the `Header`.

Behavior:
1. On mount, read `navigator.language` (e.g., `"de-AT"`).
2. Extract primary subtag (`"de"`).
3. If primary subtag matches a locale we offer AND differs from current locale AND no dismissal cookie present → show banner.
4. Banner shows native-language text (`locale.banner.promptDeutsch` etc.) with a one-click switch.
5. Switch uses next-intl's router to navigate to the equivalent path in the target locale.
6. Dismissal stored in `localStorage` key `ue-locale-banner-dismissed` (value: timestamp). Never re-prompt the same visitor.

Crawlers do not execute `navigator.language` on mount in a way that affects rendered HTML — banner is purely client-side. No SEO impact.

### 7.2 Why not auto-redirect

Decided against. Auto-redirect creates 302 chains, makes hreflang canonicals less reliable, and Googlebot crawls as `en-US` so it would never see non-EN content unless we exempt the bot — a fragile pattern that often breaks. The banner approach gives non-English speakers immediate visibility without compromising the crawl story.

## 8. Language switcher

Replace the current two-state toggle in `src/components/layout/header.tsx`.

UX:
- Header pill / dropdown showing current locale in native form (e.g., "Deutsch ▾").
- Dropdown lists all five locales by native name (`LOCALE_NATIVE_NAME`).
- Active locale styled distinctly.
- Click switches via `useRouter().replace({ pathname: usePathname() }, { locale })` — preserves the equivalent path in the target locale.
- On mobile: full-width dropdown inside the mobile menu.

Implementation note: existing toggle component should be deleted, not extended — five-state dropdown is a different control.

## 9. Currency display

### 9.1 Indicative FX constant

```ts
// src/lib/i18n-content.ts
// Update quarterly. Last updated: 2026-05-22.
export const INDICATIVE_FX: Record<Locale, {
  code: "ZAR" | "EUR" | "DKK";
  rate: number;       // multiplier from ZAR
  symbol: string;
  format: (amount: number) => string;
}> = {
  en: { code: "ZAR", rate: 1, symbol: "R", format: (n) => `R${n.toLocaleString("en-ZA")}` },
  af: { code: "ZAR", rate: 1, symbol: "R", format: (n) => `R${n.toLocaleString("af-ZA")}` },
  de: { code: "EUR", rate: 0.050, symbol: "€", format: (n) => `€${Math.round(n).toLocaleString("de-DE")}` },
  fr: { code: "EUR", rate: 0.050, symbol: "€", format: (n) => `${Math.round(n).toLocaleString("fr-FR")} €` },
  da: { code: "DKK", rate: 0.37, symbol: "kr", format: (n) => `${Math.round(n).toLocaleString("da-DK")} kr` },
};
```

### 9.2 Where it renders

Price displays in:
- Property cards (`from R1,250 / night` → for `/de`, append `(≈ €62)`)
- Property detail pages
- Tour cards (similar)
- Tour detail pages

Implementation: a `<Price amount={zarAmount} locale={locale} />` component that renders `R1,250 / night` for en/af, `R1,250 / night (≈ €62)` for de/fr/da, with the parenthetical pulled from `t("currency.indicativeNote", { amount: formatIndicative(...) })`.

### 9.3 Structured data

`priceCurrency` in JSON-LD stays `"ZAR"` for all locales. That's what guests are actually billed in; rich snippets must match the transaction currency. The indicative conversion is UI-only.

## 10. Search Console & external

Post-launch checklist (out of code scope, in spec for completeness):

- [ ] Confirm sitemap.xml lists all five-locale URL variants
- [ ] In Search Console, leave geo-target unset (we serve global guests, not the German market)
- [ ] Submit sitemap once after PR 1 lands; re-submit after each translation PR
- [ ] Validate hreflang via Search Console "International Targeting" report
- [ ] Manually verify rich result eligibility for one Hotel page per locale using Google Rich Results Test

## 11. Rollout — four PRs

### PR 1 — Foundations (engineering only, no translation)

Branch: `feat/multilingual-foundations`. Ships:

1. `routing.ts`: locales array extended to five.
2. `src/lib/i18n-content.ts`: new file with `Localized<T>`, `pickLocale`, `LOCALE_TO_BCP47`, `LOCALE_TO_OG`, `LOCALE_NATIVE_NAME`, `INDICATIVE_FX`.
3. `src/types/index.ts`: fields converted to `Localized<T>` per §4.2.
4. `src/data/content.ts`: every translatable field wrapped `{ en: <existing value> }`. No semantic change to EN render.
5. `src/lib/property-faq.ts`: same conversion.
6. `src/components/seo/structured-data.tsx`: refactored per §6.2 — `locale` parameter, locale-aware URLs, `pickLocale` for prose.
7. Per-page `generateMetadata` updates per §6.3.
8. `src/i18n/request.ts`: `getMessageFallback` returns EN value.
9. New `seo.*`, `brand.atConnector`, `locale.*`, `currency.*` namespaces added to `en.json` and `af.json`. EN values for `seo.*` are mostly relocated from the current hardcoded strings in `src/app/layout.tsx` and per-page metadata — no new copywriting needed. AF translations of these new keys are a Niles ask, batched as a single short snippet list (per the brand-voice workflow). PR 1 can merge with AF placeholder strings (= EN values) and the AF translations land as a tiny follow-up PR — they are not blocking infrastructure.
10. `de.json`, `fr.json`, `da.json` created as exact copies of `en.json`.
11. `src/components/global/locale-banner.tsx` + mount in `[locale]/layout.tsx`.
12. `src/components/layout/header.tsx`: language switcher dropdown replacing the two-state toggle.
13. `<html lang>` set per locale (§6.4).
14. `<Price>` component + replace inline price renders.
15. `src/app/llms.txt/route.ts`: language-note update (§6.5).
16. Playwright smoke test (§12).

**Visible effect after PR 1:** EN site looks identical. AF site looks identical except switcher is a dropdown and any new `seo.*` keys are rendered from the AF translations added in this PR. `/de`, `/fr`, `/da` URLs exist and serve EN content with correct `<html lang>`, hreflang, OG locale, and structured data. SEO scaffolding is fully live.

### PR 2 — German content

Branch: `feat/multilingual-de`. Content-only PR.

1. `de.json` translations: MT-drafted, then native-speaker reviewed.
2. `de` key populated on every `Localized<T>` field in `content.ts`, `property-faq.ts`, anywhere `Localized<T>` exists in code.
3. No engineering changes (the framework already shipped in PR 1).

### PR 3 — French content

Branch: `feat/multilingual-fr`. Same shape as PR 2 for `fr`.

### PR 4 — Danish content

Branch: `feat/multilingual-da`. Same shape as PR 2 for `da`.

PRs 2–4 are independent and can land in any order or in parallel.

## 12. Testing & QA

### 12.1 Type safety (compile-time)

`Localized<T>` requires `en`. TypeScript catches any content object missing EN. Non-EN keys are intentionally optional — fallback handles them at runtime.

### 12.2 Playwright smoke test

New file `tests/i18n.spec.ts`. For each of `/`, `/af`, `/de`, `/fr`, `/da`:
- Page returns 200.
- `<html lang>` matches expected BCP-47 (`en-ZA`, `af-ZA`, etc.).
- Page contains at least one `<link rel="alternate" hreflang="...">` per other locale, plus `hreflang="x-default"`.
- Page contains `<script type="application/ld+json">` with `inLanguage` matching expected BCP-47 (where applicable).
- No console errors.

For `/de/properties/the-rose` (representative deep page):
- Same checks as above.
- Title element matches the expected localized title from `seo.property` namespace (in PR 1, that's still EN due to placeholder file).

### 12.3 Manual SEO checks (per PR)

- Run Google Rich Results Test on at least one Hotel page per locale.
- Run hreflang Tags Testing Tool (e.g., merkle hreflang checker) on `/` and one deep page.
- Run Lighthouse SEO audit on each locale's home page; score must be ≥ current EN baseline.

### 12.4 Translation review checklist (PRs 2–4)

For each translation PR, the native-speaker reviewer is given:
- The `en.json` source.
- The MT-drafted target `{locale}.json`.
- The set of `Localized<T>` fields in `content.ts` (paragraphs of property/tour copy).
- The brand-identity policy from §4.3 (so they don't translate "Urban Elephant" or property short names).
- A spot-check list of the top 10 search keywords for that market (provided by us; e.g., "Hotel Kapstadt", "Ferienwohnung Kapstadt" for de).

### 12.5 Sanity check before merging PR 1

Manually visit `/de` and confirm: EN content renders, German `<html lang>`, German OG locale, banner appears in a German-language browser. No regressions on `/` or `/af`.

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| MT quality stains brand voice in de/fr/da | Native-speaker review is mandatory before merging each language PR. Brand-identity policy (§4.3) prevents the worst class of errors (translating "Urban Elephant"). |
| Stale FX rates embarrass on de/fr/da pages | `INDICATIVE_FX` constant has a "Last updated:" comment. Quarterly update process: open a one-line PR replacing the three rates with current mid-market values (check xe.com or similar). The "indicative; billed in ZAR" disclaimer protects against guest complaints. If rates drift more than ±10% mid-quarter, update sooner. |
| Bilingual contract (af mirrors en) silently breaks after fallback-to-EN change | Document the change in the memory file (`bilingual_copy.md`). Future contributors won't get a literal-key warning anymore; the silent fallback is intentional. The Playwright smoke test ensures `/af` returns 200 and renders, but won't catch missing AF translations. AF parity remains a code-review responsibility. |
| Adding non-EN content drifts content.ts to unmaintainable size | After translations land, if `content.ts` exceeds ~3000 lines, decompose into per-property files (`content/the-rose.ts`, etc.). Out of scope for PR 1. |
| Reviews rendered in mixed languages confuse Google | Each review's blockquote gets `lang="..."` matching original language. Hotel schema includes reviews in original language — this is correct per schema.org guidance for multilingual sites. |
| Translated tour names break direct-traffic searches ("Urban Elephant Cape Point") | Tour names are localized, but the EN name is preserved in `en` key. Direct searches with the EN brand still hit `/tours/cape-point-day-tour` (slug stays English) and the EN tour name renders for English visitors. No regression for direct traffic. |

## 14. Open questions

None. All decisions delegated and locked.

## 15. Memory updates required after PR 1 lands

- `bilingual_copy.md` — update to reflect: now five languages, fallback is silent EN (not literal-key), each `Localized<T>` field requires `en`.
- `seo_architecture.md` — note that structured data takes `locale` parameter, llms.txt mentions five languages, all `generateMetadata` is locale-aware.
- `project_layout.md` — fix the stale "urban-elephant-new" reference (live dir is `urban-elephant`).
