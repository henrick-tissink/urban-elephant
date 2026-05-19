# WhatsApp message to Niles — pending items

**Open asks back to Niles / Karin (added 19 May from latest WhatsApp batch):**

- **Enterprise car hire — verify the booking handshake.** Adam Masterson (Adam.Masterson@em.com, cc Matt.Hill@em.com) asked us to make a test reservation through the widget and forward the confirmation number so he can confirm Urban Elephant's IATA + commission account is firing correctly. Live now at `/car-hire` — go through a booking end-to-end and email Adam the res #.
- **Enterprise widget styling.** The widget's button colour and fonts are configured by Enterprise's admin, not on our side. If you want the widget's primary button switched from Enterprise green to our pink (or different language defaults), email Adam to request the change against bundle code `6d2fe543148cd`.
- **Car-hire headline copy.** The intro headline + body on `/car-hire` is functional copy I wrote ("Hire a car for your Cape Town adventure." / "Browse Enterprise's full South African fleet…"). Please rewrite in your voice when you have a moment — lives in `carHire.enterprise.{kicker,title,body,footnote}` in en.json + af.json.
- **The Rose / Nightsbridge B&W** — confirmed code-side: all four properties hit Nightsbridge via the same URL pattern `https://book.nightsbridge.com/{id}?nbid=1040` with no theming params on our end. Bree (30034), Rose (39237), Docklands (30034), Flamingo Express (39239). The colour-vs-B&W rendering for The Rose is a Nightsbridge-side property setting on ID 39237 — Karin needs to flip it in the NB admin panel (or raise a ticket with NB support). Off our list, same pattern as the earlier 317 / 13th-floor issue.

Resolved over the past sessions:

- **Niles + Bapata batch (14 May)** applied:
  - **"The Flamingo" → "Flamingo Express"** site-wide (display name only; URL slug `the-flamingo` preserved to keep existing links + bookings). The Booking.com 2026 award PDF was already issued to "Urban Elephant Express, The Flamingo" so the rename is consistent with their record.
  - **AI artist-impression images removed** — Flamingo `01.jpg` (blue room w/ porthole + elephant painting) and `09.jpg` (blue pencil-sketch kitchen), and Rose `04.jpg` (blue bedroom w/ elephant plush). Remaining gallery files renumbered sequentially (Flamingo 15 → 13, Rose 8 → 7); `propertyGallery()` counts in `content.ts` updated.
  - **Recommendations: Vixi first** — Niles asked for top spot ("we have a great deal with them"). Restaurants array reordered so Vixi is index 0; Villa 47 and Belthazar follow. Added a subtle pink "A gift from us" callout on the Vixi card surfacing the free welcome-drink-with-any-meal perk.
  - **Booking.com 2026 awards live** — per-property Traveller Review Awards now show as a small badge on each property card (homepage editorial spreads, All Properties listing, Book Direct picker) and as a dedicated "Recognised by guests" block on each property detail page with a "View award certificate" PDF link. Scores: Bree 9.0, Rose 9.0, Flamingo Express 8.4, Docklands 8.4. PDFs at `public/awards/*.pdf`.
  - **Pink threading** ("too white" — Niles + Bapata) — subtle wash tint (`bg-brand-wash/40`) added to WelcomeSection and AboutPreview; ServicesPreview cards get a soft pink left border; CTA section gradient wash opacity bumped 25% → 40%; footer social-icon backgrounds switched to brand-wash/10 with pink hover. Tokens unchanged.
  - **Car Hire — Enterprise widget embedded** — Adam Masterson's Partner Booking Kit (PBK) widget is now live on `/car-hire`, replacing the placeholder block. Booking flow runs inline; IATA + commission account are baked into bundle `6d2fe543148cd` so any reservation auto-pays Urban Elephant 10% monthly. Empty vehicle grid / category filters / "No vehicles found" state removed. Strict-mode-safe React mount: sets `window.pbk` before injecting the bundle, calls `pbk.destroy()` + removes the `<link>`/`<script>` tags on unmount. Language defaults to `en_GB` (PBK doesn't support Afrikaans; the surrounding chrome stays AF on the /af locale).
- 317 / 13th-floor → Bapata confirmed it's a Nightsbridge issue, off our list
- Reviews → no external review-site links on the site (only source labels next to each pulled-in quote)
- Photos batch from OneDrive → 22 photos imported across the four properties
- Founder photo → live on the About page
- The Herd page → /the-herd, with brand reasoning, 4 benefits (incl. "10% off the lowest rate"), eligibility note ("must have stayed at least once"), join form via mailto until backend ships, "Members Book Direct" CTA at the bottom
- TGCSA stars: pink lucide stars replaced with the official SA-flag insignia everywhere; footer/about credential blocks now show four stars
- Hero: "Urban Elephant Hotels · Officially Graded · Cape Town" + h1 "Luxury 4-Star Apartment Hotels in Cape Town" + slip-line "The brand that loves you back."
- All buttons rounded
- **Promo popup** built — homepage modal, version-keyed dismissal, on-brand placeholder copy until Niles posts a specific promo
- **Docklands description** rewritten in best-effort brand voice (same Bree-pattern Niles approved verbatim)
- **Hero simplified** — dropped the subtitle paragraph and the secondary "Explore Apartments" CTA; the hero is now Eyebrow + H1 + single Book Direct CTA + slip line (closer to the old urbanelephant.co.za hero feel)
- **Book Direct picker** — clicking Book Direct on the homepage hero now opens a branded modal listing all four properties (image, name, location, TGCSA stars). Each card opens the property's `bookingUrl` in a new tab. No more landing on Bree by default.
- **/properties hero copy** — removed the stray "Boom — book now." / "Boem — bespreek nou." that crept in; the description now ends at "Select your Hotel from the list below."
- **Star ratings corrected** — 16 On Bree and The Docklands had `starRating: 5` in data, which contradicted the "Luxury 4-Star" brand positioning and rendered "5 Star Apartment Hotel" on detail pages. Both now set to 4 across data + the Docklands description prose ("5-star apartment-hotel living" → "4-star…").
- **Tours pulled across from old site** — every tour detail page used to render an empty middle (no description, just the price box). Twelve tours now have the proper marketing copy lifted from `urbanelephant.co.za/tours` (Aquila, Cape of Good Hope & Penguins, Boulders Beach, Wine Flies, Shark Cage Diving, Boat Cruises at the V&A, Surf Lessons Muizenberg, Kirstenbosch & Constantia, Kayaking, Harley & Cadillac, Full-Day Chauffeur, Faeeza's Bo-Kaap Cooking). Prices match the old site, with `priceNote` ("per person", "from", etc.) so the detail pages and cards read accurately. The two stub entries with no real content on the old site (`bo-kaap-walking-tour`, `table-mountain-hike`) were removed rather than left as ghosts.
- **Per-property Nightsbridge URLs** — Rose now opens its own NB page (39237), Flamingo opens its own (39239), instead of every Book Direct landing on the shared Bree account.
- **Client assets from OneDrive (13 May)** integrated across the site:
  - `/documents/tgcsa-certificate.pdf` and `/documents/ctt-membership-certificate.pdf` saved as public downloads
  - TrustStrip's TGCSA item now links to the official certificate PDF (small "View certificate →" affordance below the credential line)
  - About page: new **Officially Graded** credentials section between Founder Story and Zola's Story — physical TGCSA "Apartment Hotel" plaque photo on the right, two downloadable certificate cards (TGCSA + CTT) on the left
  - /the-herd: Bapata's welcome letter prose surfaced verbatim as a new **Welcome to The Herd** section between hero and "Why The Herd". Form success message tweaked to reference the welcome letter ("the same warm welcome the Herd has been writing for years")
  - Homepage: new **WhyBookDirect** section (Why Book Direct, 4 client-approved benefits: Best Rates Guaranteed / Exclusive Offers / Flexible Cancellation / Personal Concierge Service) — inserted between WhyBook and AboutPreview
  - About page credentials section also surfaces the pink **Urban Elephant master lockup** as a small "Official master mark" card beneath the plaque
  - `/badges/tgcsa-4-stars.png` (official horizontal 4-star row) saved for future use but not yet rendered; site logo stays as the existing wordmark per Henry's call
- **Stats fixed in homepage Testimonials block** per Bapata + UE Hotels 13 May:
  - `9.4 → 9.3` Booking.com (3,000+ guest reviews per Bapata)
  - `500+ → 45,000+` Happy Guests (across 4 buildings per UE Hotels)
- **Bapata reply 13 May 14:56–15:00** applied:
  - Personal Concierge Service body copy replaced with Bapata's exact wording ("Experience the convenience of a true one-stop shop…")
  - PPRA Registered added as a third credential card on the About page beside TGCSA and CTT (No. 1695928, no PDF — static text card with charcoal "PPRA" mark)
  - TGCSA plaque photo replaced with the clean straight-on shot Bapata sent (`/images/about/tgcsa-plaque.png`, 1600×1200, 4:3) — old skew photo removed
  - Google 4.9 confirmed accurate — staying on the homepage testimonials block

Copy-paste the block below into WhatsApp.

---

Hi Niles 🙏 short batch — most of last round's notes are live, plus a couple of new asks.

*Live on the site now:*
• Promo popup is up — using your old `popup.png` artwork, "Welcome to Cape Town" headline + your slip-line + a pink rounded "Book Direct" button. Closes with X / ESC / outside-click. Once dismissed, it stays gone for that visitor until you launch a new promo (we bump a version flag and everyone sees the new one). To run a real promo, send the headline + body + CTA + the new image and I drop it in. Takes minutes.
• I've drafted a Docklands description in the same voice as your Bree paragraphs (you approved those almost verbatim, so I'm using that calibration). Have a look at /properties/the-docklands — if anything reads off, send the rewrite and I'll swap it in.

*Two small things still on Docklands:*
• The Docklands tagline still says _"Your Urban Oasis… beacon of modern luxury"_. I haven't touched it — that's brand-voice copy that's yours to write. Want a punchy one-liner like Bree's?
• Parking at Docklands — currently the amenity says "Secure Parking" (neutralised). If it's actually paid like Bree, say so and I'll change it to "Paid Secure Parking".

*Big-picture question still on the table:*
• You asked about being able to edit content yourself like the old site. Henry's preference is **Contentful** (over Sanity). Plan: ship the rest of the content polish first, then bolt Contentful on at the end so you regain self-service editing for promos, copy, photos, and Herd benefits. We'll lock that in once the content is settled.

Happy to ship piece by piece as you reply 🐘

---

## Open questions for Niles (added 13 May after OneDrive drop)

- **Why Book Direct body copy** — the client docx only provided the 4 benefit headings (Best Rates Guaranteed / Exclusive Offers / Flexible Cancellation / Personal Concierge Service), no supporting prose. I wrote one-line descriptions using existing approved phrases (e.g. the beat-rate-by-10% line from the hero, "member offers, promotions, and curated Cape Town experiences" lifted from your Herd welcome letter). The "Flexible Cancellation" and "Personal Concierge Service" descriptions are functional placeholders I drafted — please rewrite in your voice when you have a moment. Lives in `whyBookDirect.items.{flex,concierge}.description` in en.json/af.json.
- **AF translations on new keys** — chrome and short labels are translated. The Herd welcome letter prose got a literal Afrikaans translation so the AF page doesn't render English mid-paragraph — review/replace if you want it in your own voice (`theHerd.welcomeBody{1..4}` in af.json).
- **Pink master lockup** — saved to `/badges/urban-elephant-master-lockup.jpg` and now rendered as a small "Official master mark" card on the About credentials section beneath the plaque. NOT swapped into header/footer (Canva raster + non-Biko type doesn't fit the typographic system). Say the word if you want it more prominent.
- ~~**Google Rating (4.9)**~~ Bapata 13 May 15:00 — keep as-is.
- ~~**PPRA Number 1695928**~~ Bapata 13 May 15:00 — added as third About credentials card.

## Notes for Henry (not for WhatsApp)

- Docklands description draft uses the Bree pattern verbatim — set scene, 5-star apartments + rooftop pool, walkability + brand close, practical note. The pool/views are mentioned because they're the building's real differentiator (5-star vs The Rose's 4-star also in De Waterkant). If Niles wants more or less emphasis on the pool, easy to tweak.
- Promo popup design choices: 1.5s delay before showing, centred modal with backdrop blur, dismissal stored in localStorage keyed by `version`. Bumping `promoConfig.version` re-engages dismissed users for the next promo — makes campaign management trivial.
- CMS plan locked in as: ship remaining polish → bolt Contentful at the end. When we're ready, I'd want a 30-min look at the existing `urban-elephant-cms/` Sanity schemas first to see if any modelling is salvageable (probably not for Contentful directly, but the content shape is informative).
- AF translation for "The Herd" still says "Die Trop" — Niles hasn't pushed back, leaving it.
- Per-property Nightsbridge IDs discovered by scraping the old site + visiting each NB page: Bree=30034, Rose=39237, Flamingo=39239. Docklands has no dedicated NB ID — old site only ever linked Docklands to 30034 (the Bree account, whose "About us" copy mentions both buildings as part of the same group). Picker now routes Rose and Flamingo correctly; Docklands continues to share Bree's NB page. Worth asking Karin whether Docklands actually has its own Nightsbridge listing.
- Picker copy I wrote myself (functional UI, not marketing prose): eyebrow "BOOK DIRECT", title "Pick your apartment hotel.", subtitle "Four officially graded apartment hotels in Cape Town. Choose where you'd like to stay and we'll take you straight to its booking page.", card CTA "Book this one". Easy to swap if Niles wants different phrasing.
- **AF tour body copy is currently English** — the chrome (nav, buttons, labels) translates to Afrikaans, but the actual tour descriptions and `priceNote` text ("per person, full package", "from", etc.) are stored as data and only exist in English. Translating them is brand-voice work and Niles speaks English-first, so leaving as-is until he asks. To localise later we'd lift `description` / `priceNote` into the messages files keyed by tour slug.
