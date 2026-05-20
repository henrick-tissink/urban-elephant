import { siteSettings } from "@/data/content";
import type { Property, Tour } from "@/types";
import { SITE_URL, localizedUrl } from "@/lib/seo";

const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;

function asAbsolute(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteSettings.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      "Family-owned, officially TGCSA-graded luxury apartment hotels in Cape Town. Hotel comfort, design-led spaces, and the consistency of professional management.",
    email: siteSettings.contact.email,
    telephone: siteSettings.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteSettings.address.city,
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    sameAs: [siteSettings.social.instagram, siteSettings.social.facebook].filter(
      Boolean,
    ),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteSettings.siteName,
    inLanguage: ["en-ZA", "af-ZA"],
    publisher: { "@id": ORG_ID },
  };
}

function streetFromAddress(address?: string): string | undefined {
  if (!address) return undefined;
  const first = address.split(",")[0]?.trim();
  return first && /\d/.test(first) ? first : undefined;
}

export function hotelSchema(property: Property) {
  const url = localizedUrl("en", `/properties/${property.slug}`);
  const street = streetFromAddress(property.address);
  const galleryAbs = (property.gallery ?? [])
    .slice(0, 8)
    .map((g) => asAbsolute(g))
    .filter((u): u is string => Boolean(u));

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": url,
    name: `Urban Elephant at ${property.name}`,
    description: property.tagline ?? property.description?.[0],
    url,
    image: galleryAbs.length ? galleryAbs : asAbsolute(property.heroImage),
    ...(property.starRating && {
      starRating: {
        "@type": "Rating",
        ratingValue: property.starRating,
        bestRating: 5,
      },
    }),
    address: {
      "@type": "PostalAddress",
      ...(street && { streetAddress: street }),
      addressLocality: "Cape Town",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    ...(property.amenities?.length && {
      amenityFeature: property.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.name,
        value: true,
      })),
    }),
    telephone: siteSettings.contact.phone,
    email: siteSettings.contact.email,
    brand: { "@type": "Brand", name: siteSettings.siteName },
    parentOrganization: { "@id": ORG_ID },
    isAcceptingReservations: true,
    ...(property.bookingUrl && {
      potentialAction: {
        "@type": "ReserveAction",
        target: property.bookingUrl,
      },
    }),
  };
}

export function touristTripSchema(tour: Tour) {
  const url = localizedUrl("en", `/tours/${tour.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": url,
    name: tour.name,
    description: tour.shortDescription ?? tour.description?.[0],
    url,
    image: asAbsolute(tour.image),
    provider: { "@id": ORG_ID },
    ...(tour.price && {
      offers: {
        "@type": "Offer",
        price: tour.price,
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
        url,
      },
    }),
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: localizedUrl("en", c.path),
    })),
  };
}

type ListItem = { name: string; path: string };

export function itemListSchema(items: ListItem[], name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name && { name }),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localizedUrl("en", item.path),
      name: item.name,
    })),
  };
}
