# WhatsApp message to Niles — pending items (updated)

Resolved since the last message:

- 317 / 13th-floor → Bapata confirmed it's a Nightsbridge issue, off our list
- Reviews → no external review-site links on the site; only source labels next to each pulled-in quote, exactly as Niles asked
- Photos batch from the OneDrive share → 22 photos imported across the four properties (Bree +8, Rose +3, Docklands +4, Flamingo +7)
- Founder photo → on the About page
- The Herd page → live at /the-herd, joins now go to Karin's inbox via mailto until Marshall wires the database

Just shipped (commit `aa973ea`):

- All pink Lucide stars on property cards/heros replaced with the official TGCSA SA-flag stars — "awarded by TGCSA" now, not "added by us"
- Footer & About credential blocks now show four TGCSA stars instead of one
- All buttons rounded (no more square WordPress vibes)
- Hero now reads "Urban Elephant Hotels · Officially Graded · Cape Town" + h1 "Luxury 4-Star Apartment Hotels in Cape Town" + the slip-line "The brand that loves you back." below the CTAs
- The Herd: first benefit is now "10% off the lowest rate"; eligibility note ("must have stayed at least once") added under the join form description

Copy-paste the block below into WhatsApp.

---

Hi Niles 🙏 batch shipped — all your latest notes are live. Have a look on the lappy when you can.

*Done in this round:*
• Pink stars are gone — replaced with the actual TGCSA insignia (the SA-flag star). Property cards now show 4 or 5 of the real stars depending on grading.
• Footer credential block: four TGCSA stars next to "Officially graded by the Tourism Grading Council of South Africa" — same on the About page.
• Rounded all buttons. No more WordPress squares 👌
• Hero: "Urban Elephant Hotels · Officially Graded · Cape Town" + h1 reads "Luxury 4-Star Apartment Hotels in Cape Town" + your slip-line "The brand that loves you back." sits below the buttons in pink uppercase.
• The Herd: first benefit is now "10% off the lowest rate" with a description that says it's applied with your member code. Eligibility note added: "The Herd is for guests who've stayed with us at least once. We verify your stay before activating membership."

*Still need from you:*
• *Promo popup* — coming next. I see the old `popup.png` artwork in the project. To wire it I need: (a) the headline/body copy you want it to launch with, (b) the call-to-action text + where the button should go (a property page? a booking link?), and (c) confirmation you want it on every page or just the home page.
• *Docklands rewrite* — the only property still in old voice. Current paragraphs still have "elevated haven", "perfection", "invigorating vacation". Send me the brand-voice version when you have a moment.

*Big-picture question for Henry & you:*
• You asked: _"This is the same platform as before Henry? I can make image and text corrections anytime currently will it be the same?"_ Honest answer: no, this is a brand-new Next.js site, content lives in code, so corrections currently mean we (Henry/me) edit and push. The old site had Sanity Studio where you could log in and edit. Three options going forward — (1) keep the current flow, send me notes on WhatsApp and I do the edits (fastest for the kind of polish we're doing now), (2) bolt Sanity onto this new site so you regain self-service editing for copy + images (a few hours of work, then permanent), or (3) something lighter like a simple admin dashboard for promo content only. Henry will have an opinion — let's pick a path together.

Happy to ship piece by piece as you reply 🐘

---

## Notes for Henry (not for WhatsApp)

- The platform question is a real fork in the road. If Niles routinely changes promos and property text (sounds like he does), keeping him out of the codebase will slow you both down. My recommendation: bolt **Sanity** onto this Next.js site for the content collections that change most (properties array, promo popup, Herd benefits, hero copy), keep design/structure in code. The `urban-elephant-cms/` directory in the parent repo suggests Sanity was already set up for the old site — schemas might be reusable.
- Promo popup design questions to lock down before I build: trigger (first visit only / every visit / based on date range?), placement (centred modal / bottom corner / banner?), dismissal behaviour (X button / ESC / outside click), localStorage key for "don't show again".
- AF locale still calls The Herd "Die Trop" — Niles hasn't said one way or the other; safe to leave until he flags.
