import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import { Analytics } from "@/components/global/analytics";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/structured-data";
import { LOCALE_TO_BCP47 } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import "./globals.css";

const biko = localFont({
  src: "../../public/Biko_Regular.otf",
  variable: "--font-biko",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.urbanelephant.co.za"),
  authors: [{ name: "Urban Elephant" }],
  creator: "Urban Elephant",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as Locale;
  const lang = LOCALE_TO_BCP47[locale] ?? "en-ZA";
  return (
    <html lang={lang} className={biko.variable} suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
