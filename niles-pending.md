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

## Notes for Henry (not for WhatsApp)

- Docklands description draft uses the Bree pattern verbatim — set scene, 5-star apartments + rooftop pool, walkability + brand close, practical note. The pool/views are mentioned because they're the building's real differentiator (5-star vs The Rose's 4-star also in De Waterkant). If Niles wants more or less emphasis on the pool, easy to tweak.
- Promo popup design choices: 1.5s delay before showing, centred modal with backdrop blur, dismissal stored in localStorage keyed by `version`. Bumping `promoConfig.version` re-engages dismissed users for the next promo — makes campaign management trivial.
- CMS plan locked in as: ship remaining polish → bolt Contentful at the end. When we're ready, I'd want a 30-min look at the existing `urban-elephant-cms/` Sanity schemas first to see if any modelling is salvageable (probably not for Contentful directly, but the content shape is informative).
- AF translation for "The Herd" still says "Die Trop" — Niles hasn't pushed back, leaving it.
