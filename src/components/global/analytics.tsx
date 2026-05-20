"use client";

import Script from "next/script";

const GOOGLE_ADS_ID = "AW-17472147984";
const GOOGLE_ADS_PAGE_VIEW_CONVERSION = "AW-17472147984/lQXaCISv1IobEJCkr4tB";
const TIDIO_KEY = "t8q76qtkz5dcc75ybjtinozwkohoujbc";

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
          gtag('event', 'conversion', {
            'send_to': '${GOOGLE_ADS_PAGE_VIEW_CONVERSION}',
            'value': 1.0,
            'currency': 'ZAR'
          });
        `}
      </Script>
      <Script
        src={`https://code.tidio.co/${TIDIO_KEY}.js`}
        strategy="afterInteractive"
      />
    </>
  );
}
