# WhatsApp message to Niles — pending items (updated)

Resolved since the last message:
- 317 / 13th-floor → Bapata confirmed it's a Nightsbridge issue, off our list
- Reviews → no external review-site links on the site; only source labels next to each pulled-in quote, exactly as Niles asked
- Photos batch from the OneDrive share → 22 photos imported across the four properties (Bree +8, Rose +3, Docklands +4, Flamingo +7)
- Founder photo → on the About page
- The Herd page → live at /the-herd, joins now go to Karin's inbox via mailto until Marshall wires the database

Copy-paste the block below into WhatsApp.

---

Hi Niles 🙏 quick batch — non-blocking.

*1. The Herd page is live at /the-herd*
Have a look on desktop and mobile. Layout: hero → why-the-herd (using Bapata's brand reasoning verbatim) → four member-benefit cards → join form → "Members Book Direct" CTA wired to Nightsbridge.

*Customer-facing copy that's currently my draft and would benefit from your pass:*
• Hero subtitle (under "The Herd. For guests who keep coming home.") — currently reads: "The Herd is Urban Elephant's loyalty program — for guests who choose to stay with us again, and again. Members are recognised, remembered, and rewarded with exclusive direct rates and priority booking across every Urban Elephant property."
• The four member-benefit cards. Currently: Member-only direct rates / Priority booking / Welcome amenities / Exclusive offers. Confirm or rewrite each title + description.

If any of that already sounds right, just reply "all good" — otherwise drop the rewrites in this thread.

*2. Form / database — for Marshall (interim solution shipped)*
Until Marshall wires the real backend, every Herd signup now opens the user's email client and emails Karin directly (karin@urbanelephant.co.za) with their name + email. So no signups get lost. When Marshall is ready, swap the mailto for a proper API + database — a single function in the page replaces it. Marshall: file is `src/components/the-herd/the-herd-page-content.tsx`, `handleSubmit` is the one to replace.

*3. Loyalty discount on bookings — needs your input*
For "applies their loyalty discount at booking" — does Nightsbridge / RoomRaccoon support member-rate discount codes that we can give out per signup? If yes, send me the code(s) and I'll pre-fill them in the booking links for members. If no, that's a Marshall task once the backend ships.

*4. Still waiting on:*
• Your Docklands rewrite (the only property still in old voice — current copy still has "elevated haven", "perfection", "invigorating vacation")
• Bapata's per-property photos (he mentioned more were coming)

Happy to ship piece by piece as you reply 🐘

---

## Notes for Henry (not for WhatsApp)

- The Herd page audit found and fixed three things that would have embarrassed the brand if left:
  1. `[NILES TO REWRITE]` / `[NILES TO CONFIRM]` markers were rendering on production — all gone now.
  2. The form was silently losing signups — now wired to mailto Karin.
  3. The page had no booking CTA — added "MEMBERS BOOK DIRECT" section.
- Mailto is a stopgap. UX on mobile (opens external mail app) is acceptable for an interim solution while Marshall ships. When Niles confirms a real backend (Mailchimp/Resend/etc), I can swap mailto for a Next.js API route in ~30 min.
- AF locale calls it "Die Trop" — confirm with Niles whether to keep that in Afrikaans or use "The Herd" untranslated.
