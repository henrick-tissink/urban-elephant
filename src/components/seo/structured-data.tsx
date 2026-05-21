import { properties, reviews as allReviews, siteSettings, getReviewsForProperty } from "@/data/content";
import type { Property, Review, Tour } from "@/types";
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

function brandAggregateRating() {
  const scored = allReviews.filter((r) => r.sourceScore !== undefined);
  if (!scored.length) return undefined;
  const sum = scored.reduce((acc, r) => acc + (r.sourceScore ?? 0), 0);
  const avg = sum / scored.length;
  return {
    "@type": "AggregateRating",
    ratingValue: Number(avg.toFixed(1)),
    bestRating: 10,
    reviewCount: scored.length,
  };
}

export function organizationSchema() {
  const aggregate = brandAggregateRating();
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": ORG_ID,
    name: siteSettings.siteName,
    alternateName: "Urban Elephant Hotels",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
    },
    image: `${SITE_URL}/images/site/og.jpg`,
    description:
      "Family-owned, officially TGCSA-graded luxury apartment hotels in Cape Town. Hotel comfort, design-led spaces, and the consistency of professional management.",
    email: siteSettings.contact.email,
    telephone: siteSettings.contact.phone,
    priceRange: "R1,250 – R5,500",
    currenciesAccepted: "ZAR",
    paymentAccepted: "Credit Card, EFT",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteSettings.address.city,
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    areaServed: {
      "@type": "City",
      name: "Cape Town",
    },
    knowsAbout: [
      "Apartment hotels in Cape Town",
      "TGCSA grading",
      "Tourism Grading Council of South Africa",
      "V&A Waterfront accommodation",
      "Table Mountain views",
      "De Waterkant",
      "Sea Point",
      "Cape Town CBD",
      "Cape Town airport transfers",
      "Cape Town wine tours",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
        description: "Operations & reservations office hours",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "24-hour concierge and guest relations",
      },
    ],
    availableLanguage: ["English", "Afrikaans"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Urban Elephant Apartment Hotels",
      itemListElement: properties.map((p) => ({
        "@type": "Offer",
        url: localizedUrl("en", `/properties/${p.slug}`),
        itemOffered: {
          "@type": "Hotel",
          name: `Urban Elephant at ${p.name}`,
        },
      })),
    },
    ...(aggregate && { aggregateRating: aggregate }),
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

const SOURCE_PUBLISHER: Record<string, string> = {
  booking: "Booking.com",
  google: "Google",
  tripadvisor: "TripAdvisor",
  airbnb: "Airbnb",
  expedia: "Expedia",
  client: "Direct",
};

function formatPriceRange(property: Property): string | undefined {
  const r = property.priceRange;
  if (!r) return undefined;
  const max = r.max ? `R${r.max}` : undefined;
  return max ? `R${r.min} - ${max}` : `From R${r.min}`;
}

function reviewSchema(review: Review) {
  return {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.sourceScore ?? review.rating,
      bestRating: review.sourceScore ? 10 : 5,
    },
    author: {
      "@type": "Person",
      name: review.author,
      ...(review.authorLocation && { address: review.authorLocation }),
    },
    reviewBody: review.content,
    ...(review.source && {
      publisher: {
        "@type": "Organization",
        name: SOURCE_PUBLISHER[review.source] ?? review.source,
      },
    }),
  };
}

function aggregateRatingFromReviews(reviews: Review[]) {
  if (!reviews.length) return undefined;
  const scored = reviews.filter((r) => r.sourceScore !== undefined);
  if (!scored.length) return undefined;
  const sum = scored.reduce((acc, r) => acc + (r.sourceScore ?? 0), 0);
  const avg = sum / scored.length;
  return {
    "@type": "AggregateRating",
    ratingValue: Number(avg.toFixed(1)),
    bestRating: 10,
    reviewCount: scored.length,
  };
}

export function hotelSchema(property: Property) {
  const url = localizedUrl("en", `/properties/${property.slug}`);
  const street = property.postalAddress?.street ?? streetFromAddress(property.address);
  const galleryAbs = (property.gallery ?? [])
    .slice(0, 8)
    .map((g) => asAbsolute(g))
    .filter((u): u is string => Boolean(u));
  const propertyReviews = getReviewsForProperty(property.slug);
  const aggregate = aggregateRatingFromReviews(propertyReviews);
  const priceRange = formatPriceRange(property);

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
      addressLocality: property.postalAddress?.locality ?? "Cape Town",
      ...(property.postalAddress?.postalCode && {
        postalCode: property.postalAddress.postalCode,
      }),
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    ...(property.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: property.geo.latitude,
        longitude: property.geo.longitude,
      },
    }),
    ...(priceRange && { priceRange }),
    ...(property.priceRange && {
      makesOffer: {
        "@type": "Offer",
        priceCurrency: property.priceRange.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: property.priceRange.min,
          priceCurrency: property.priceRange.currency,
          unitText: "night",
          ...(property.priceRange.max && {
            maxPrice: property.priceRange.max,
            minPrice: property.priceRange.min,
          }),
        },
      },
    }),
    ...(property.amenities?.length && {
      amenityFeature: property.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.name,
        value: true,
      })),
    }),
    ...(aggregate && { aggregateRating: aggregate }),
    ...(propertyReviews.length && {
      review: propertyReviews.map(reviewSchema),
    }),
    telephone: siteSettings.contact.phone,
    email: siteSettings.contact.email,
    brand: { "@type": "Brand", name: siteSettings.siteName },
    parentOrganization: { "@id": ORG_ID },
    isAcceptingReservations: true,
    checkinTime: "15:00",
    checkoutTime: "10:30",
    smokingAllowed: false,
    currenciesAccepted: "ZAR",
    paymentAccepted: "Credit Card, EFT",
    availableLanguage: ["English", "Afrikaans"],
    ...(property.geo && {
      hasMap: `https://www.google.com/maps/search/?api=1&query=${property.geo.latitude},${property.geo.longitude}`,
    }),
    ...(property.bookingUrl && {
      potentialAction: {
        "@type": "ReserveAction",
        target: property.bookingUrl,
      },
    }),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
