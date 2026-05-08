# WhatsApp message to Niles — pending items (updated)

Resolved since the last message:
- 317 / 13th-floor → Bapata confirmed it's a Nightsbridge issue, off our list
- Reviews → no external review-site links on the site (verified — only source labels next to each pulled-in quote, exactly as Niles asked)
- Photos batch from the OneDrive share → 22 photos imported across the four properties (Bree +8, Rose +3, Docklands +4, Flamingo +7)
- Founder photo → on the About page

Copy-paste the block below into WhatsApp.

---

Hi Niles 🙏 quick batch — all non-blocking, reply when you have a moment.

*1. The Herd page is live* (in scaffold form)
Live at /the-herd. Layout is built — hero, "Why The Herd" using Bapata's brand reasoning, four member-benefit cards, and a join form (name + email). I've left two things bracketed so they're easy to spot:

• The hero subtitle is marked _[NILES TO REWRITE]_ — needs your customer-facing pitch in brand voice. The current placeholder reads: "The Herd is Urban Elephant's loyalty program — for guests who choose to stay with us again, and again. Members are recognised, remembered, and rewarded with exclusive direct rates and priority booking across every Urban Elephant property."

• Each of the four benefit cards has a _[NILES TO CONFIRM]_ tag. Current placeholder benefits are:
- Member-only direct rates (auto-applied at booking)
- Priority booking (early access)
- Welcome amenities (a small thank-you in the apartment)
- Exclusive offers (members-first promotions)
Confirm or replace each.

*2. Form / database — for Marshall*
The join form on /the-herd is wired structurally but currently logs to console and shows a "Welcome to the Herd" success state. Marshall needs to:
• Pick a backend (Mailchimp / Klaviyo / a simple DB / etc.)
• Wire the form POST to it
• Generate and email the member discount code
Where do you want signups to land in the meantime — should I make the form email a notification to karin@urbanelephant.co.za so you don't miss anyone before Marshall ships?

*3. Loyalty discount on bookings*
For "applies their loyalty discount at booking" — that one's bigger. It needs a discount code that Nightsbridge or RoomRaccoon honours. Do those platforms support member-rate codes that we can hand out per signup? If yes, just tell me the code(s) and I'll pre-fill them in the booking links for logged-in members. If no, that becomes a Marshall job.

*4. Still waiting on:*
• Your Docklands rewrite (the only property without your brand-voice pass — current copy still has "elevated haven", "perfection", "invigorating vacation")
• Bapata's per-property photos (he mentioned more were coming)

Happy to ship piece by piece as you reply 🐘

---

## Notes for Henry (not for WhatsApp)

- Page sections to inspect: open `/the-herd` and `/af/the-herd` in the browser. Afrikaans translation calls it "Die Trop" — confirm with Niles if that's acceptable for the AF locale.
- The form submit handler is at `src/components/the-herd/the-herd-page-content.tsx` line ~24 (`handleSubmit`). Marshall replaces the `console.info` call with a real API call.
- If Niles wants the form to email Karin in the meantime, I can wire that quickly via a Next.js API route + Resend / Postmark — about 30 minutes of work.
