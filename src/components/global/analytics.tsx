"use client";

import Script from "next/script";

const GOOGLE_ADS_ID = "AW-17472147984";
const GOOGLE_ADS_PAGE_VIEW_CONVERSION = "AW-17472147984/lQXaCISv1IobEJCkr4tB";
// GA4 measurement id (G-XXXXXXX). A Measurement ID is public (it ships in the
// page), so we default to the live property — analytics + the conversion events
// in lib/analytics work on deploy with no env config. Override per-environment
// (e.g. a staging property) with NEXT_PUBLIC_GA4_ID.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-WLL4YVE0CY";

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
          ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
          gtag('event', 'conversion', {
            'send_to': '${GOOGLE_ADS_PAGE_VIEW_CONVERSION}',
            'value': 1.0,
            'currency': 'ZAR'
          });
        `}
      </Script>
    </>
  );
}
