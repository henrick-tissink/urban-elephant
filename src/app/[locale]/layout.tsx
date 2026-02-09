import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/global/smooth-scroll";
import { ScrollProgress } from "@/components/global/scroll-progress";
import { Toaster } from "sonner";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery, propertiesQuery } from "@/lib/sanity/queries";
import type { SiteSettings, PropertyCard } from "@/types";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages and data in parallel
  const [messages, settings, properties] = await Promise.all([
    getMessages(),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }),
    sanityFetch<PropertyCard[]>({
      query: propertiesQuery,
      tags: ["property"],
    }),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScroll>
        <ScrollProgress />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} properties={properties} />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#24272a",
              color: "#ffffff",
              border: "1px solid #ff00ff",
            },
          }}
        />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
