# Property Application page — design

**Date:** 2026-05-26
**Status:** Approved (pending spec review)
**Route:** `/property-application` (all five locales)

## Purpose

Rebuild the `/property-application` page that existed on the old (Astro/CMS) Urban
Elephant site and was dropped during the Next.js rebuild. The live URL now 404s,
which is breaking a running Google Ads asset group ("airbnb management cape town,
short term rental"). The page is a **property-owner acquisition / host application**
page: owners of Cape Town apartments apply to have their unit managed and branded by
Urban Elephant ("join the Urban Elephant family").

Source of truth for content: Wayback capture
`https://web.archive.org/web/20260214132937/https://www.urbanelephant.co.za/property-application/`.
The original copy is already in the brand voice, so it is reused/adapted directly
rather than re-drafted.

## Goals

- Restore a working `/property-application` route so the Google Ads landing page
  resolves (no 404) and the asset group becomes eligible again.
- Match the rest of the rebuilt site visually and architecturally — rich and
  beautiful, not a bare form.
- Capture owner enquiries by email, mirroring the existing contact-form pipeline.
- Fully localized across en/af/de/fr/da with no raw message keys rendered.

## Non-goals

- Brochure download (explicitly deferred — no asset yet).
- A CMS-backed/editable version. Content lives in code/messages like the rest of
  the rebuilt site.
- Any change to the existing contact form or its API.

## Architecture

Follows the established `contact` page pattern exactly.

| File | Role |
| --- | --- |
| `src/app/[locale]/property-application/page.tsx` | Server component. `setRequestLocale`, `generateMetadata` via `pageMetadata("seo.propertyApplication", "/property-application", locale)`. Passes `siteSettings` to the content component. |
| `src/components/property-application/property-application-content.tsx` | `"use client"` component. Renders all sections, owns the form (`react-hook-form` + `zod`), success state. |
| `src/app/api/property-application/route.ts` | `POST` endpoint. Clone of `/api/contact/route.ts` with the owner-application schema, a branded HTML+text email, Resend send, tag `property-application`. |

**Email routing:** reuses the existing contact-form env vars — `EMAIL_TO`
(fallback `karin@urbanelephant.co.za`) and `EMAIL_FROM`
(`Urban Elephant <noreply@urbanelephant.co.za>`). `replyTo` = applicant email.

## Page sections

Dark `#24272a` hero → white body. Uses `ScrollReveal`, brand CSS vars
(`--color-brand-mid`, `--color-brand-anchor`, `--color-brand-wash`), and the shared
`Button` / `Input` / `Textarea` UI atoms — identical visual language to Contact.

1. **Hero** — eyebrow "Become a Host", title "Join the Urban Elephant family",
   intro line ("If you are looking to join a thriving and growing hotel brand in Cape
   Town we would be thrilled to hear from you. Our apartments are handpicked, so
   please check the requirements below."), CTA anchor-scrolling to the form.
2. **Criteria** — four icon cards (lucide icons), from the original requirements:
   - *Location* — "Is your apartment in Central Cape Town?"
   - *Amenities* — "Does your building have parking and an outside pool?"
   - *Branding* — "All of our apartments are uniquely branded and 100% managed by us."
   - *Availability* — "Is your apartment available at least 48 weeks of the year?"
3. **What we handle** — short reassurance band (furnishing & setup, maintenance,
   bookings & revenue, branding & guest experience), derived from the owner
   testimonial themes. Adds richness; copy kept to brand voice.
4. **Owner testimonials** — the six real owner reviews carried over from the original
   (Hannes van Aarde; Natasha & Henry; Crystal Wolmarans; Aletta Theron;
   Kira-Clarissa Kaiser; Elizabeth Lange) in a responsive card grid. Stored as a
   constant in the content component (or `src/data`), quotes treated as fixed brand
   assets (not localized — kept in original English like other proper-noun quotes).
5. **Application form** — fields mirror the original:
   - Name (text, required, min 2)
   - Phone (tel, required)
   - Email (email, required, valid)
   - Property Location (text, required)
   - Number of Units (number, required, min 1)
   - Property Description (textarea, required, min 10, `showCount` maxLength 1000)

   On success: replace form with confirmation ("Your application has been sent — we
   will be in touch shortly.") + a WhatsApp-to-Guest-Relations prefill button and a
   "submit another" reset, matching the contact success state.
6. **Contact strip** — Operations & Reservations (+27 21 300 1044), After-Hours Guest
   Relations (+27 72 618 8140), Office Hours (Mon–Fri 9am–5pm). Addressed as "Guest
   Relations", never "Karin", per house rule.

## Data flow

1. Client validates with `zod` (`react-hook-form` + `zodResolver`).
2. `POST /api/property-application` with JSON body.
3. Server re-validates with the same schema shape, sends via Resend, returns
   `{ success: true }` or an error status.
4. Client shows success state or a `sonner` toast on failure.

### Validation schema (client + server)

```
name:                string, min 2
phone:               string, min 6
email:               string, email
propertyLocation:    string, min 2
numberOfUnits:       number (coerced), min 1
propertyDescription: string, min 10, max 1000
```

## Internationalization

- New `propertyApplication` namespace added to all five message files
  (`en/af/de/fr/da`), covering hero, criteria, "what we handle", form labels, success
  state, and contact strip. en/af must mirror; de/fr/da translated to match existing
  localization quality. (Missing keys render the literal key string — so every locale
  gets every key.)
- New `navigation.propertyApplication` (or `join`) key added to all five files;
  link added to `header.tsx` nav array and `footer.tsx`.
- Testimonial quotes and owner names are NOT localized (fixed brand assets).

## SEO

- `seo.propertyApplication` (title + description) added to all five message files;
  wired through `pageMetadata`.
- Add `/property-application` to the sitemap.
- Optional (nice-to-have, low effort): a `WebPage`/`Service` JSON-LD via the existing
  `structured-data.tsx` helpers. Include only if it slots in cleanly.

## Error handling

- Invalid JSON → 400. Schema failure → 400 with flattened errors.
- `RESEND_API_KEY` missing → 500, logged.
- Resend error / unexpected → 500, logged; client shows failure toast and keeps form
  state so the user can retry.

## Testing

- Add the route to the existing Playwright smoke test (loads in all five locales,
  200, hero + form present).
- Manual: submit a valid application in dev (with `RESEND_API_KEY` set) and confirm
  email delivery + success state; submit invalid data and confirm inline errors.

## Open items / follow-ups

- Brochure download deferred until a PDF exists.
- Applications reuse the existing `EMAIL_TO` / `EMAIL_FROM` env vars (no new config).
