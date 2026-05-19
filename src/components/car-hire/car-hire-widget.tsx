"use client";

import { useEffect } from "react";

// Urban Elephant's Enterprise Partner Booking Kit bundle. IATA + commission
// account number are baked in by Enterprise — 10% commission auto-pays
// monthly on any reservation booked via this widget. Adam Masterson at
// Enterprise issues the bundle code; ping him if it ever stops resolving.
const PBK_BUNDLE_BASE =
  "https://widget-cdn.partnerbookingkit.com/bundles/6d2fe543148cd/widget.";

const CONTAINER_ID = "pbk-widget";

declare global {
  interface Window {
    pbk?: {
      settings?: Record<string, unknown>;
      prepopulate?: Record<string, unknown>;
      destroy?: () => void;
      listen?: (
        event: string,
        handler: (data: unknown) => void
      ) => { unlisten: () => void };
      notify?: (name: string, data?: unknown) => void;
    };
  }
}

export function CarHireWidget() {
  useEffect(() => {
    // Configure the widget BEFORE the bundle script loads — Enterprise's
    // bundle reads window.pbk on init. Re-setting on each mount means
    // navigating away and back gets a fresh booking flow.
    window.pbk = {
      settings: {
        kicker: `#${CONTAINER_ID}`,
        contentContainer: `#${CONTAINER_ID}`,
      },
      prepopulate: {
        // PBK doesn't support Afrikaans; en_GB is the closest match for ZA
        // guests and stays consistent across the /en + /af locales.
        language: "en_GB",
      },
    };

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${PBK_BUNDLE_BASE}css`;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.async = true;
    script.src = `${PBK_BUNDLE_BASE}js`;
    document.head.appendChild(script);

    return () => {
      // destroy() is added by the bundle after it loads. In React strict-mode
      // dev remounts the cleanup can fire before that — optional-chain handles it.
      window.pbk?.destroy?.();
      link.remove();
      script.remove();
    };
  }, []);

  return (
    <div
      id={CONTAINER_ID}
      aria-label="Enterprise car hire booking"
      className="min-h-[200px]"
    />
  );
}
