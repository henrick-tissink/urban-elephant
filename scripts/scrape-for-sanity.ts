import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import { createClient } from "@sanity/client";

const OUTPUT_DIR = path.join(__dirname, "../sanity-import");
const MEDIA_DIR = path.join(__dirname, "../scraped-media");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface ScrapedProperty {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  location?: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  bookingUrl?: string;
}

interface ScrapedTour {
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  price?: string;
  image?: string;
  category?: string;
}

interface ScrapedReview {
  author: string;
  content: string;
  rating: number;
  source?: string;
  property?: string;
}

interface ScrapedContent {
  properties: ScrapedProperty[];
  tours: ScrapedTour[];
  reviews: ScrapedReview[];
  siteSettings: {
    siteName: string;
    contact: {
      email?: string;
      phone?: string;
      whatsapp?: string;
    };
    social: {
      facebook?: string;
      instagram?: string;
    };
  };
}

async function scrapeUrbanElephant(): Promise<ScrapedContent> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const content: ScrapedContent = {
    properties: [],
    tours: [],
    reviews: [],
    siteSettings: {
      siteName: "Urban Elephant",
      contact: {},
      social: {},
    },
  };

  console.log("🔍 Scraping Urban Elephant website...\n");

  try {
    // Scrape homepage for general info and reviews
    console.log("📄 Scraping homepage...");
    await page.goto("https://www.urbanelephant.co.za", { waitUntil: "networkidle" });

    // Get contact info from footer
    const footerEmail = await page.$eval('a[href^="mailto:"]', (el) => el.textContent?.trim()).catch(() => null);
    const footerPhone = await page.$eval('a[href^="tel:"]', (el) => el.textContent?.trim()).catch(() => null);

    if (footerEmail) content.siteSettings.contact.email = footerEmail;
    if (footerPhone) content.siteSettings.contact.phone = footerPhone;

    // Get social links
    const instagramLink = await page.$eval('a[href*="instagram"]', (el) => el.getAttribute("href")).catch(() => null);
    const facebookLink = await page.$eval('a[href*="facebook"]', (el) => el.getAttribute("href")).catch(() => null);

    if (instagramLink) content.siteSettings.social.instagram = instagramLink;
    if (facebookLink) content.siteSettings.social.facebook = facebookLink;

    // Scrape property pages
    const propertyLinks = [
      { slug: "the-rose", name: "The Rose" },
      { slug: "16-on-bree", name: "16 On Bree" },
      { slug: "the-docklands", name: "The Docklands" },
      { slug: "the-flamingo", name: "The Flamingo" },
    ];

    for (const prop of propertyLinks) {
      console.log(`🏠 Scraping property: ${prop.name}...`);
      try {
        await page.goto(`https://www.urbanelephant.co.za/${prop.slug}`, { waitUntil: "networkidle", timeout: 30000 });

        const property: ScrapedProperty = {
          name: prop.name,
          slug: prop.slug,
          images: [],
          amenities: [],
          highlights: [],
        };

        // Get tagline/description
        const heroText = await page.$eval("h1, .hero h2, [class*='hero'] p", (el) => el.textContent?.trim()).catch(() => null);
        if (heroText && heroText !== prop.name) {
          property.tagline = heroText;
        }

        // Get description paragraphs
        const descriptions = await page.$$eval("p", (els) =>
          els.map((el) => el.textContent?.trim()).filter((t) => t && t.length > 50).slice(0, 3)
        ).catch(() => []);
        if (descriptions.length > 0) {
          property.description = descriptions.join("\n\n");
        }

        // Get images
        const images = await page.$$eval("img[src*='uploads']", (els) =>
          els.map((el) => el.getAttribute("src")).filter(Boolean)
        ).catch(() => []);
        property.images = images as string[];

        // Get amenities
        const amenityTexts = await page.$$eval("[class*='amenity'], [class*='feature'] li, ul li", (els) =>
          els.map((el) => el.textContent?.trim()).filter((t) => t && t.length < 50)
        ).catch(() => []);
        property.amenities = [...new Set(amenityTexts)].slice(0, 15);

        // Get booking URL
        const bookingUrl = await page.$eval('a[href*="nightsbridge"], a[href*="book"]', (el) => el.getAttribute("href")).catch(() => null);
        if (bookingUrl) property.bookingUrl = bookingUrl;

        content.properties.push(property);
      } catch (e) {
        console.log(`  ⚠️ Could not scrape ${prop.name}: ${e}`);
      }
    }

    // Scrape tours/experiences page
    console.log("🎯 Scraping tours...");
    try {
      await page.goto("https://www.urbanelephant.co.za/experiences", { waitUntil: "networkidle", timeout: 30000 });

      // Get all tour cards
      const tourElements = await page.$$("[class*='tour'], [class*='experience'], [class*='card']");

      for (const tourEl of tourElements.slice(0, 20)) {
        try {
          const name = await tourEl.$eval("h2, h3, [class*='title']", (el) => el.textContent?.trim()).catch(() => null);
          const description = await tourEl.$eval("p", (el) => el.textContent?.trim()).catch(() => null);
          const image = await tourEl.$eval("img", (el) => el.getAttribute("src")).catch(() => null);
          const price = await tourEl.$eval("[class*='price']", (el) => el.textContent?.trim()).catch(() => null);

          if (name) {
            content.tours.push({
              name,
              slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""),
              description: description || undefined,
              image: image || undefined,
              price: price || undefined,
            });
          }
        } catch (e) {
          // Skip this tour card
        }
      }
    } catch (e) {
      console.log(`  ⚠️ Could not scrape tours: ${e}`);
    }

    // Scrape reviews from homepage
    console.log("⭐ Scraping reviews...");
    try {
      await page.goto("https://www.urbanelephant.co.za", { waitUntil: "networkidle" });

      const reviewElements = await page.$$("[class*='review'], [class*='testimonial']");

      for (const reviewEl of reviewElements.slice(0, 10)) {
        try {
          const content_text = await reviewEl.$eval("p, [class*='text'], [class*='content']", (el) => el.textContent?.trim()).catch(() => null);
          const author = await reviewEl.$eval("[class*='author'], [class*='name']", (el) => el.textContent?.trim()).catch(() => null);

          if (content_text && author) {
            content.reviews.push({
              author,
              content: content_text,
              rating: 5,
              source: "website",
            });
          }
        } catch (e) {
          // Skip this review
        }
      }
    } catch (e) {
      console.log(`  ⚠️ Could not scrape reviews: ${e}`);
    }

  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }

  return content;
}

function generateSanityId(type: string, slug: string): string {
  return `${type}-${slug}`.replace(/[^a-zA-Z0-9-]/g, "-");
}

function createSanityNDJSON(content: ScrapedContent): string {
  const documents: any[] = [];

  // Create property documents
  for (const prop of content.properties) {
    documents.push({
      _id: generateSanityId("property", prop.slug),
      _type: "property",
      name: prop.name,
      slug: { _type: "slug", current: prop.slug },
      tagline: prop.tagline,
      location: "Cape Town",
      featured: true,
      starRating: 5,
      amenities: prop.amenities.map((name, i) => ({
        _key: `amenity-${i}`,
        name,
        category: "general",
      })),
      highlights: prop.highlights.map((title, i) => ({
        _key: `highlight-${i}`,
        title,
        description: "",
      })),
      nightsBridgeUrl: prop.bookingUrl,
    });
  }

  // Create tour documents
  for (const tour of content.tours) {
    documents.push({
      _id: generateSanityId("tour", tour.slug),
      _type: "tour",
      name: tour.name,
      slug: { _type: "slug", current: tour.slug },
      shortDescription: tour.description,
      price: tour.price ? parseInt(tour.price.replace(/[^0-9]/g, "")) || undefined : undefined,
      featured: true,
    });
  }

  // Create review documents
  for (const review of content.reviews) {
    const slug = review.author.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    documents.push({
      _id: generateSanityId("review", slug + "-" + Date.now()),
      _type: "review",
      author: review.author,
      content: review.content,
      rating: review.rating,
      source: review.source,
      featured: true,
    });
  }

  // Create site settings document
  documents.push({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: content.siteSettings.siteName,
    contact: {
      email: content.siteSettings.contact.email || "reservations@urbanelephant.co.za",
      phone: content.siteSettings.contact.phone,
      whatsapp: content.siteSettings.contact.phone,
    },
    social: {
      instagram: content.siteSettings.social.instagram,
      facebook: content.siteSettings.social.facebook,
    },
    address: {
      city: "Cape Town",
      country: "South Africa",
    },
  });

  // Convert to NDJSON format
  return documents.map((doc) => JSON.stringify(doc)).join("\n");
}

async function main() {
  console.log("🚀 Starting Urban Elephant content scraper for Sanity import\n");

  const content = await scrapeUrbanElephant();

  console.log("\n📊 Scraping complete:");
  console.log(`   Properties: ${content.properties.length}`);
  console.log(`   Tours: ${content.tours.length}`);
  console.log(`   Reviews: ${content.reviews.length}`);

  // Save raw scraped content
  const rawOutputPath = path.join(OUTPUT_DIR, "scraped-content.json");
  fs.writeFileSync(rawOutputPath, JSON.stringify(content, null, 2));
  console.log(`\n💾 Raw content saved to: ${rawOutputPath}`);

  // Generate Sanity NDJSON import file
  const ndjson = createSanityNDJSON(content);
  const ndjsonPath = path.join(OUTPUT_DIR, "sanity-import.ndjson");
  fs.writeFileSync(ndjsonPath, ndjson);
  console.log(`💾 Sanity import file saved to: ${ndjsonPath}`);

  console.log("\n✅ Done! To import into Sanity, run:");
  console.log(`   sanity dataset import ${ndjsonPath} production`);
}

main().catch(console.error);
