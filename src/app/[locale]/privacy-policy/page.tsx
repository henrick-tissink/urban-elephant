import { setRequestLocale, getTranslations } from "next-intl/server";
import { PrivacyPolicyContent } from "@/components/legal/privacy-policy-content";
import { detailPageMetadata } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer.links" });
  return detailPageMetadata({
    locale: locale as Locale,
    path: "/privacy-policy",
    title: t("privacyPolicy"),
    description:
      "How Urban Elephant collects, uses and protects your personal information, and your rights under POPIA.",
  });
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer.links" });

  return <PrivacyPolicyContent title={t("privacyPolicy")} />;
}
