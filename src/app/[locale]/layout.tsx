import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/global/smooth-scroll";
import { ScrollProgress } from "@/components/global/scroll-progress";
import { Toaster } from "sonner";
import { properties, siteSettings } from "@/data/content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main" className="skip-link">Skip to content</a>
      <SmoothScroll>
        <ScrollProgress />
        <Header />
        <main id="main" className="min-h-screen">{children}</main>
        <Footer settings={siteSettings} properties={properties} />
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
