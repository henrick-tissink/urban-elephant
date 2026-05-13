# WhatsApp message to Niles — pending items

Resolved over the past sessions:

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
  - New badge assets saved for future use: `/badges/tgcsa-4-stars.png` (official horizontal 4-star row) and `/badges/urban-elephant-master-lockup.jpg` (pink lockup) — neither is rendered yet; site logo stays as the existing wordmark per Henry's call

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
- **Pink master lockup** — saved to `/badges/urban-elephant-master-lockup.jpg` but NOT swapped in as the site logo (Canva raster + non-Biko type doesn't fit the typographic system). About page surfaces the TGCSA plaque photo instead. If you want the pink lockup featured on About too (alongside the plaque), say the word.

## Notes for Henry (not for WhatsApp)

- Docklands description draft uses the Bree pattern verbatim — set scene, 5-star apartments + rooftop pool, walkability + brand close, practical note. The pool/views are mentioned because they're the building's real differentiator (5-star vs The Rose's 4-star also in De Waterkant). If Niles wants more or less emphasis on the pool, easy to tweak.
- Promo popup design choices: 1.5s delay before showing, centred modal with backdrop blur, dismissal stored in localStorage keyed by `version`. Bumping `promoConfig.version` re-engages dismissed users for the next promo — makes campaign management trivial.
- CMS plan locked in as: ship remaining polish → bolt Contentful at the end. When we're ready, I'd want a 30-min look at the existing `urban-elephant-cms/` Sanity schemas first to see if any modelling is salvageable (probably not for Contentful directly, but the content shape is informative).
- AF translation for "The Herd" still says "Die Trop" — Niles hasn't pushed back, leaving it.
- Per-property Nightsbridge IDs discovered by scraping the old site + visiting each NB page: Bree=30034, Rose=39237, Flamingo=39239. Docklands has no dedicated NB ID — old site only ever linked Docklands to 30034 (the Bree account, whose "About us" copy mentions both buildings as part of the same group). Picker now routes Rose and Flamingo correctly; Docklands continues to share Bree's NB page. Worth asking Karin whether Docklands actually has its own Nightsbridge listing.
- Picker copy I wrote myself (functional UI, not marketing prose): eyebrow "BOOK DIRECT", title "Pick your apartment hotel.", subtitle "Four officially graded apartment hotels in Cape Town. Choose where you'd like to stay and we'll take you straight to its booking page.", card CTA "Book this one". Easy to swap if Niles wants different phrasing.
- **AF tour body copy is currently English** — the chrome (nav, buttons, labels) translates to Afrikaans, but the actual tour descriptions and `priceNote` text ("per person, full package", "from", etc.) are stored as data and only exist in English. Translating them is brand-voice work and Niles speaks English-first, so leaving as-is until he asks. To localise later we'd lift `description` / `priceNote` into the messages files keyed by tour slug.
