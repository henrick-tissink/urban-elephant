import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Urban Elephant | Luxury Apartment Hotels in Cape Town",
    template: "%s | Urban Elephant",
  },
  description:
    "Experience Cape Town like never before. Urban Elephant offers luxury apartment hotels with stunning views, personalized service, and unforgettable experiences in the Mother City.",
  keywords: [
    "Cape Town hotels",
    "luxury apartments",
    "apartment hotel",
    "Cape Town accommodation",
    "Table Mountain views",
    "South Africa travel",
    "boutique hotel",
    "Urban Elephant",
  ],
  authors: [{ name: "Urban Elephant" }],
  creator: "Urban Elephant",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.urbanelephant.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.urbanelephant.co.za",
    siteName: "Urban Elephant",
    title: "Urban Elephant | Luxury Apartment Hotels in Cape Town",
    description:
      "Experience Cape Town like never before. Luxury apartment hotels with stunning views and personalized service.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Urban Elephant - Luxury Apartment Hotels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Elephant | Luxury Apartment Hotels in Cape Town",
    description:
      "Experience Cape Town like never before. Luxury apartment hotels with stunning views and personalized service.",
    images: ["/og-image.jpg"],
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={lato.variable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
