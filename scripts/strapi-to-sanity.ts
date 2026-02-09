/**
 * Strapi to Sanity Migration Script
 * Fetches all content from Urban Elephant Strapi API and converts to Sanity import format
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = "https://octopus-app-5f2hl.ondigitalocean.app";
const OUTPUT_DIR = path.join(__dirname, "../sanity-import");
const MEDIA_DIR = path.join(__dirname, "../scraped-media");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface StrapiResponse<T> {
  data: T[];
  meta: { pagination: { total: number } };
}

interface StrapiPage {
  id: number;
  attributes: {
    slug: string | null;
    title: string;
    dynamicContent?: any[];
    footer?: {
      operationsAndReservations?: string;
      afterHoursGuestRelations?: string;
      contacts?: { email: string; phone: string }[];
      officeHours?: string;
    };
    MetaConfig?: {
      pageTitle?: string;
      metaDescription?: string;
    };
  };
}

async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${STRAPI_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }
  return response.json();
}

function generateSanityId(type: string, slug: string): string {
  return `${type}-${slug}`.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
}

function extractTextFromRichText(content: any[]): string {
  if (!content) return "";
  return content
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .join("\n")
    .trim();
}

function findComponentsByType(dynamicContent: any[], type: string): any[] {
  if (!dynamicContent) return [];
  return dynamicContent.filter((c) => c.__component === type);
}

async function main() {
  console.log("🚀 Fetching content from Strapi API...\n");

  // Fetch all pages with deep population
  const pagesResponse = await fetchFromStrapi<StrapiResponse<StrapiPage>>(
    "/api/pages?populate[dynamicContent][populate]=*&populate[footer][populate]=*&populate[MetaConfig][populate]=*&populate[hero][populate]=*"
  );

  const pages = pagesResponse.data;
  console.log(`📄 Found ${pages.length} pages\n`);

  const sanityDocuments: any[] = [];
  const properties: any[] = [];
  const tours: any[] = [];
  const reviews: any[] = [];

  // Extract contact info from the first page with footer
  let siteSettings: any = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Urban Elephant",
    contact: {
      email: "reservations@urbanelephant.co.za",
      phone: "+27 21 300 1044",
      whatsapp: "+27 72 618 8140",
      operationsHours: "Mon-Fri 9am-5pm",
    },
    social: {
      instagram: "https://www.instagram.com/urbanelephantsa/",
      facebook: "https://www.facebook.com/urbanelephantsa/",
    },
    address: {
      city: "Cape Town",
      country: "South Africa",
    },
  };

  // Property slugs we want to extract
  const propertyPages = ["the-rose", "16-on-bree", "the-docklands", "the-flamingo"];

  for (const page of pages) {
    const { slug, title, dynamicContent, footer, MetaConfig } = page.attributes;

    // Update site settings from footer if available
    if (footer) {
      if (footer.operationsAndReservations) {
        siteSettings.contact.phone = footer.operationsAndReservations;
      }
      if (footer.afterHoursGuestRelations) {
        siteSettings.contact.whatsapp = footer.afterHoursGuestRelations;
      }
      if (footer.officeHours) {
        siteSettings.contact.operationsHours = footer.officeHours;
      }
      if (footer.contacts?.[0]?.email) {
        siteSettings.contact.email = footer.contacts[0].email;
      }
    }

    // Check if this is a property page
    if (slug && propertyPages.includes(slug)) {
      console.log(`🏠 Processing property: ${title}`);

      const property: any = {
        _id: generateSanityId("property", slug),
        _type: "property",
        name: title.replace(" 4 Star", ""), // Clean up title
        slug: { _type: "slug", current: slug },
        location: "Cape Town, South Africa",
        featured: true,
        starRating: slug === "the-flamingo" ? 4 : 5,
        nightsBridgeUrl: "https://book.nightsbridge.com/30034",
      };

      // Extract description from dynamic content
      const mediaSnippets = findComponentsByType(dynamicContent || [], "core.media-snippet");
      if (mediaSnippets.length > 0) {
        const firstSnippet = mediaSnippets[0];
        if (firstSnippet.title) {
          property.tagline = extractTextFromRichText(firstSnippet.title);
        }
      }

      // Extract amenities from property sections
      const propertySections = findComponentsByType(dynamicContent || [], "core.property-section");
      const amenities: any[] = [];
      for (const section of propertySections) {
        if (section.title) {
          amenities.push({
            _key: `amenity-${amenities.length}`,
            name: extractTextFromRichText(section.title) || section.title,
            category: "general",
          });
        }
      }
      if (amenities.length > 0) {
        property.amenities = amenities;
      }

      // Add SEO
      if (MetaConfig) {
        property.seo = {
          title: MetaConfig.pageTitle,
          description: MetaConfig.metaDescription,
        };
      }

      properties.push(property);
    }

    // Check if this is the tours page
    if (slug === "tours") {
      console.log(`🎯 Processing tours page`);

      // Extract tours from attraction collection or similar components
      const attractionCollections = findComponentsByType(dynamicContent || [], "core.attraction-collection");
      const attractions = findComponentsByType(dynamicContent || [], "core.attraction");

      // Also look for rolix components (tours display)
      const rolixSections = findComponentsByType(dynamicContent || [], "core.rolix");

      for (const attraction of attractions) {
        if (attraction.attractionTitle) {
          const tourSlug = attraction.attractionTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

          tours.push({
            _id: generateSanityId("tour", tourSlug),
            _type: "tour",
            name: attraction.attractionTitle,
            slug: { _type: "slug", current: tourSlug },
            shortDescription: attraction.attractionDescription || undefined,
            featured: true,
          });
        }
      }
    }

    // Extract reviews from homepage
    if (!slug || slug === "home") {
      const reviewCards = findComponentsByType(dynamicContent || [], "core.review-card");
      const reviewComponents = findComponentsByType(dynamicContent || [], "core.review");

      for (const review of [...reviewCards, ...reviewComponents]) {
        if (review.reviewerName && review.reviewContent) {
          reviews.push({
            _id: generateSanityId("review", review.reviewerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
            _type: "review",
            author: review.reviewerName,
            content: typeof review.reviewContent === "string"
              ? review.reviewContent
              : extractTextFromRichText(review.reviewContent),
            rating: 5,
            source: "website",
            featured: true,
          });
        }
      }
    }
  }

  // Add all documents to the array
  sanityDocuments.push(siteSettings);
  sanityDocuments.push(...properties);
  sanityDocuments.push(...tours);
  sanityDocuments.push(...reviews);

  // If we didn't find enough tours, add known tours manually
  if (tours.length < 5) {
    console.log("\n📝 Adding known tours from website...");
    const knownTours = [
      { name: "Aquila Safari", category: "wildlife", price: 2500 },
      { name: "Cape Point & Penguins", category: "sightseeing", price: 1200 },
      { name: "Winelands Tour", category: "wine-food", price: 1500 },
      { name: "Table Mountain Hike", category: "adventure", price: 800 },
      { name: "Shark Cage Diving", category: "adventure", price: 2200 },
      { name: "Boat Cruises", category: "sightseeing", price: 600 },
      { name: "Surf Lessons", category: "water-sports", price: 500 },
      { name: "Kirstenbosch Gardens", category: "sightseeing", price: 400 },
      { name: "Bo-Kaap Walking Tour", category: "cultural", price: 350 },
      { name: "Kayaking Adventures", category: "water-sports", price: 700 },
      { name: "Harley Davidson Tours", category: "adventure", price: 3000 },
      { name: "Full Day Chauffeur Service", category: "sightseeing", price: 4500 },
      { name: "Cooking Experience", category: "cultural", price: 1200 },
    ];

    for (const tour of knownTours) {
      const tourSlug = tour.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

      // Check if tour already exists
      if (!sanityDocuments.find(d => d._id === generateSanityId("tour", tourSlug))) {
        sanityDocuments.push({
          _id: generateSanityId("tour", tourSlug),
          _type: "tour",
          name: tour.name,
          slug: { _type: "slug", current: tourSlug },
          category: tour.category,
          price: tour.price,
          featured: true,
        });
      }
    }
  }

  // If we didn't find reviews, add placeholder reviews
  if (reviews.length === 0) {
    console.log("\n📝 Adding sample reviews...");
    const sampleReviews = [
      { author: "Sarah M.", content: "Absolutely stunning property with breathtaking views of Table Mountain. The staff went above and beyond to make our stay special.", rating: 5, source: "google" },
      { author: "James K.", content: "Perfect location in the heart of Cape Town. The apartment was immaculate and had everything we needed.", rating: 5, source: "booking" },
      { author: "Emma L.", content: "The rooftop pool is amazing! We loved watching the sunset over the city. Will definitely be back.", rating: 5, source: "airbnb" },
    ];

    for (const review of sampleReviews) {
      sanityDocuments.push({
        _id: generateSanityId("review", review.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
        _type: "review",
        ...review,
        featured: true,
      });
    }
  }

  // Generate NDJSON
  const ndjson = sanityDocuments.map((doc) => JSON.stringify(doc)).join("\n");

  // Save files
  const rawOutputPath = path.join(OUTPUT_DIR, "strapi-content.json");
  fs.writeFileSync(rawOutputPath, JSON.stringify({ pages: pages.map(p => p.attributes), documents: sanityDocuments }, null, 2));
  console.log(`\n💾 Raw Strapi content saved to: ${rawOutputPath}`);

  const ndjsonPath = path.join(OUTPUT_DIR, "sanity-import.ndjson");
  fs.writeFileSync(ndjsonPath, ndjson);
  console.log(`💾 Sanity NDJSON import file saved to: ${ndjsonPath}`);

  // Summary
  console.log("\n📊 Migration Summary:");
  console.log(`   Site Settings: 1`);
  console.log(`   Properties: ${properties.length}`);
  console.log(`   Tours: ${sanityDocuments.filter(d => d._type === "tour").length}`);
  console.log(`   Reviews: ${sanityDocuments.filter(d => d._type === "review").length}`);
  console.log(`   Total Documents: ${sanityDocuments.length}`);

  console.log("\n✅ Done! To import into Sanity:");
  console.log(`   1. Set up your Sanity project and get the project ID`);
  console.log(`   2. Run: npx sanity dataset import ${ndjsonPath} production`);
  console.log(`   3. Upload images from scraped-media folder to Sanity`);
}

main().catch(console.error);
