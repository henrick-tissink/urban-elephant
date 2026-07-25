"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { track } from "@/lib/analytics";

// Reservations hotline (Niles): office line + a WhatsApp line for bookings,
// tours and upsell, on every page. Numbers are in international format for
// tel:/wa.me. Hours 08:30–20:00 SAST (UTC+2, no DST).
const PHONE_NUMBER = "+27213001044"; // 021 300 1044
const WHATSAPP_NUMBER = "27791380907"; // 079 138 0907
const WA_TEXT = encodeURIComponent(
  "Hi Urban Elephant — I'd like to book a stay or ask about your tours.",
);

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ReservationHotline() {
  // null until mounted (avoids hydration mismatch on the time-based state)
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      try {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Johannesburg",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).formatToParts(new Date());
        const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
        const m = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
        const mins = h * 60 + m;
        setOpenNow(mins >= 510 && mins < 1200); // 08:30 → 20:00
      } catch {
        setOpenNow(null);
      }
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="reservation-hotline fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 print:hidden">
      {/* Status / hours pill */}
      {openNow !== null && (
        <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 shadow-lg ring-1 ring-black/5 text-[11px] font-semibold text-[#24272a]">
          <span
            className={`relative flex h-2 w-2 ${openNow ? "" : ""}`}
            aria-hidden
          >
            {openNow && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                openNow ? "bg-green-500" : "bg-stone-400"
              }`}
            />
          </span>
          {openNow ? "Reservations open now" : "Reservations · 8:30am–8pm"}
        </div>
      )}

      {/* WhatsApp — bookings, tours & questions */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "hotline" })}
        aria-label="Book or ask about tours on WhatsApp"
        className="group flex items-center gap-3"
      >
        <span className="pointer-events-none hidden translate-x-2 rounded-full bg-[#24272a] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Book on WhatsApp
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </a>

      {/* Call — reservations line */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        onClick={() => track("call_click", { source: "hotline" })}
        aria-label="Call reservations"
        className="group flex items-center gap-3"
      >
        <span className="pointer-events-none hidden translate-x-2 rounded-full bg-[#24272a] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Call reservations
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-anchor)] text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95">
          <Phone className="h-6 w-6" />
        </span>
      </a>
    </div>
  );
}
