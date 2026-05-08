/**
 * Configuration for the homepage promo popup.
 *
 * To run a new promo:
 *   1. Bump `version` (any string change). This invalidates prior dismissals,
 *      so visitors who already closed the previous promo will see the new one.
 *   2. Drop the new image into public/images/site/ and update `image`.
 *   3. Update the strings in src/messages/en.json + af.json under "promo".
 *
 * To pause the popup, set `enabled: false`.
 *
 * (When the CMS lands, this whole object becomes a CMS document.)
 */
export const promoConfig = {
  enabled: true,
  /** Bump this any time the promo content changes — re-engages dismissed users */
  version: "v1",
  image: "/images/site/popup.png",
  /** ms after page mount before the popup appears */
  delayMs: 1500,
};
