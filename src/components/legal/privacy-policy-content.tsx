import { BrandDivider } from "@/components/global/brand-divider";
import { PRIVACY_POLICY } from "@/data/privacy-policy";

export function PrivacyPolicyContent({ title }: { title: string }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.05]">
              {title}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Last updated {PRIVACY_POLICY.updated}
            </p>
          </div>
        </div>
      </section>

      <BrandDivider />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <article className="max-w-3xl mx-auto space-y-12 text-stone-700 text-base md:text-lg leading-relaxed">
            {PRIVACY_POLICY.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {PRIVACY_POLICY.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl md:text-3xl text-[#24272a] font-light">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.items && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
