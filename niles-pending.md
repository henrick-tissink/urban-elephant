# WhatsApp message to Niles — pending items (updated)

Resolved since the last message:

- 317 / 13th-floor → Bapata confirmed it's a Nightsbridge issue, off our list
- Reviews → no external review-site links on the site; only source labels next to each pulled-in quote, exactly as Niles asked
- Photos batch from the OneDrive share → 22 photos imported across the four properties (Bree +8, Rose +3, Docklands +4, Flamingo +7)
- Founder photo → on the About page
- The Herd page → live at /the-herd, joins now go to Karin's inbox via mailto until Marshall wires the database

Copy-paste the block below into WhatsApp.

---





---

## Notes for Henry (not for WhatsApp)

- The Herd page audit found and fixed three things that would have embarrassed the brand if left:
  1. `[NILES TO REWRITE]` / `[NILES TO CONFIRM]` markers were rendering on production — all gone now.
  2. The form was silently losing signups — now wired to mailto Karin.
  3. The page had no booking CTA — added "MEMBERS BOOK DIRECT" section.
- Mailto is a stopgap. UX on mobile (opens external mail app) is acceptable for an interim solution while Marshall ships. When Niles confirms a real backend (Mailchimp/Resend/etc), I can swap mailto for a Next.js API route in ~30 min.
- AF locale calls it "Die Trop" — confirm with Niles whether to keep that in Afrikaans or use "The Herd" untranslated.

