/**
 * Complete Sanity Content Setup
 * Creates import files with image references for each property and tour
 */

import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(__dirname, "../sanity-import");
const MEDIA_DIR = path.join(__dirname, "../scraped-media");

// Read the existing manifest to get image mappings
const manifestPath = path.join(MEDIA_DIR, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

// Map images to properties based on filename patterns
const imageMapping: Record<string, { heroImage: string; gallery: string[] }> = {
  "the-rose": {
    heroImage: "img_large_The_Rose_Table_Mountain_View_header_3d9d860d38.jpg",
    gallery: [
      "img_large_The_Rose_Rooftop_slide_image_2_bb8cd84166.jpg",
      "img_large_The_Rose_Rooftop_Pool_slide_4_06dafc4537.jpg",
      "img_large_The_Rose_slide_3_672cd608b5.jpg",
      "img_large_The_Rose_Building_place_image_a1a5e741d7.jpg",
    ],
  },
  "16-on-bree": {
    heroImage: "img_large_1_header_upgrade_9cd5834783.jpeg",
    gallery: [
      "img_large_UE_14_85f2fd561a.jpeg",
      "img_large_UE_38_f33d4be4cc.jpeg",
      "img_large_UE_40_f65491f255.jpeg",
      "img_large_UE_42_001be185e9.jpeg",
      "img_large_UE_45_fefcd55e0b.jpeg",
      "img_large_UE_52_fefec70e43.jpeg",
      "img_large_3_16onbree_0f8bc499d1.jpg",
    ],
  },
  "the-docklands": {
    heroImage: "img_large_docklands_header_bd45ce5211.jpeg",
    gallery: [
      "img_large_UE_65_637ec09a6b.jpeg",
      "img_large_UE_66_eaafcb4ac1.jpeg",
      "img_large_UE_67_9191b5c12e.jpeg",
      "img_large_UE_69_fe8fc54c82.jpeg",
      "img_large_UE_71_9de58fa86f.jpeg",
      "img_large_UE_72_95f4eafcdd.jpeg",
    ],
  },
  "the-flamingo": {
    heroImage: "img_large_Whats_App_Image_2025_05_15_at_10_22_18_aed73151bf.jpeg",
    gallery: [
      "img_large_Whats_App_Image_2025_05_15_at_10_22_16_1_f45c5b5a90.jpeg",
      "img_large_Whats_App_Image_2025_05_15_at_10_22_18_1_08a75bbd38.jpeg",
      "img_large_Whats_App_Image_2025_05_15_at_10_22_21_5ab745d7c5.jpeg",
      "img_large_Whats_App_Image_2025_05_15_at_10_22_20_87cdfdf3a5.jpeg",
      "img_large_Whats_App_Image_2025_05_15_at_10_22_20_1_28667891b4.jpeg",
    ],
  },
};

// Map images to tours
const tourImageMapping: Record<string, string> = {
  "aquila-safari": "img_large_Aquila_7ae5dadd9a.jpg",
  "cape-point-penguins": "img_large_Cape_of_Good_Hope_a86613cce3.jpg",
  "winelands-tour": "img_large_Winelands_Tour_3135c8ec7b.jpg",
  "shark-cage-diving": "img_large_CROPPED_Shark_Cage_Diving_6ee9d1b42c.JPG",
  "boat-cruises": "img_large_CROPPED_Boat_Cruises_b0364cf95b.JPG",
  "surf-lessons": "img_large_Surf_Lessions_38695cff23.JPEG",
  "kirstenbosch-gardens": "img_large_Kirstenbosch_c1d9239b04.jpg",
  "kayaking-adventures": "img_large_kayaking_dbbe334ef4.png",
  "harley-davidson-tours": "img_large_Harley_Davidson_1867a1784d.jpeg",
  "full-day-chauffeur-service": "img_large_Full_Day_Chauffeur_Service_2b06e499a0.png",
  "cooking-experience": "img_large_cooking_experience_2ca53d8f11.jpg",
  "bo-kaap-walking-tour": "img_large_bokaap_5debd990cd.jpg",
  "table-mountain-hike": "img_large_tablemountain_86cfecd042.jpg",
};

// Site images
const siteImages = {
  logo: "img_full_logo_ae69785bc0.svg",
  elephantIcon: "img_elephant_icon_1_8f1cc50866.svg",
  heroVideo: "home_video_1_b763e0e2e8.mp4",
};

interface SanityDocument {
  _id: string;
  _type: string;
  [key: string]: any;
}

function generateSanityId(type: string, slug: string): string {
  return `${type}-${slug}`.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
}

async function main() {
  console.log("🚀 Setting up complete Sanity content with images...\n");

  const sanityDocuments: SanityDocument[] = [];

  // 1. Site Settings
  sanityDocuments.push({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Urban Elephant",
    contact: {
      email: "karin@urbanelephant.co.za",
      phone: "+27 21 300 1044",
      whatsapp: "+27 72 618 8140",
      operationsHours: "Mon-Fri 9am-5pm",
      afterHoursPhone: "+27 72 618 8140",
    },
    social: {
      instagram: "https://www.instagram.com/urbanelephantsa/",
      facebook: "https://www.facebook.com/urbanelephantsa/",
    },
    address: {
      street: "117 Strand Street",
      city: "Cape Town",
      country: "South Africa",
    },
    bookNowUrl: "https://book.nightsbridge.com/30034",
  });

  // 2. Properties
  const properties = [
    {
      slug: "the-rose",
      name: "The Rose",
      tagline: "Boutique flair meets rooftop views",
      description: "Stylish, design-led apartments at 117 Strand Street, Cape Town. The Rose offers boutique flair, rooftop views, and hotel-level comfort in the city's heart.",
      starRating: 5,
      amenities: [
        { name: "Rooftop Pool", category: "building" },
        { name: "Table Mountain Views", category: "room" },
        { name: "Fully Equipped Kitchen", category: "kitchen" },
        { name: "High-Speed WiFi", category: "general" },
        { name: "Air Conditioning", category: "room" },
        { name: "Smart TV", category: "entertainment" },
        { name: "Secure Parking", category: "building" },
        { name: "24/7 Security", category: "building" },
      ],
      highlights: [
        { title: "Rooftop Pool", description: "Stunning infinity pool with panoramic city views" },
        { title: "Central Location", description: "Walking distance to V&A Waterfront and CBD" },
        { title: "Design-Led Interiors", description: "Contemporary African aesthetic throughout" },
      ],
    },
    {
      slug: "16-on-bree",
      name: "16 On Bree",
      tagline: "Luxury living in the heart of Cape Town",
      description: "Experience luxury at 16 on Bree with Urban Elephant. Discover this exclusive Cape Town property, offering elegance and comfort in the heart of the city.",
      starRating: 5,
      amenities: [
        { name: "Gym Access", category: "building" },
        { name: "Rooftop Terrace", category: "building" },
        { name: "Fully Equipped Kitchen", category: "kitchen" },
        { name: "High-Speed WiFi", category: "general" },
        { name: "Air Conditioning", category: "room" },
        { name: "Smart TV", category: "entertainment" },
        { name: "Secure Parking", category: "building" },
        { name: "Concierge Service", category: "general" },
      ],
      highlights: [
        { title: "Prime Location", description: "In the heart of Cape Town's vibrant Bree Street" },
        { title: "Modern Luxury", description: "Sleek, contemporary design with premium finishes" },
        { title: "City Living", description: "Walk to top restaurants, bars, and attractions" },
      ],
    },
    {
      slug: "the-docklands",
      name: "The Docklands",
      tagline: "Premium waterfront living",
      description: "Stay at The Docklands, an Urban Elephant property in Cape Town. Enjoy waterfront luxury, modern amenities, and easy access to the city's best attractions.",
      starRating: 5,
      amenities: [
        { name: "Waterfront Views", category: "room" },
        { name: "Swimming Pool", category: "building" },
        { name: "Fully Equipped Kitchen", category: "kitchen" },
        { name: "High-Speed WiFi", category: "general" },
        { name: "Air Conditioning", category: "room" },
        { name: "Smart TV", category: "entertainment" },
        { name: "Secure Parking", category: "building" },
        { name: "Gym Access", category: "building" },
      ],
      highlights: [
        { title: "Waterfront Location", description: "Steps from the V&A Waterfront" },
        { title: "Harbor Views", description: "Watch the boats from your private balcony" },
        { title: "Premium Amenities", description: "Pool, gym, and concierge services" },
      ],
    },
    {
      slug: "the-flamingo",
      name: "The Flamingo",
      tagline: "Coastal cool meets city chic",
      description: "Stylish studio apartments in Sea Point. Urban Elephant's Flamingo blends beachside elegance with city buzz - your Atlantic-side sanctuary awaits.",
      starRating: 4,
      amenities: [
        { name: "Ocean Views", category: "room" },
        { name: "Rooftop Deck", category: "building" },
        { name: "Kitchenette", category: "kitchen" },
        { name: "High-Speed WiFi", category: "general" },
        { name: "Air Conditioning", category: "room" },
        { name: "Smart TV", category: "entertainment" },
        { name: "Secure Parking", category: "building" },
        { name: "Beach Access", category: "general" },
      ],
      highlights: [
        { title: "Sea Point Promenade", description: "Direct access to Cape Town's famous beachfront" },
        { title: "Sunset Views", description: "Watch the Atlantic sun set from your room" },
        { title: "Vibrant Neighborhood", description: "Cafes, restaurants, and beaches at your doorstep" },
      ],
    },
  ];

  for (const prop of properties) {
    const images = imageMapping[prop.slug];

    sanityDocuments.push({
      _id: generateSanityId("property", prop.slug),
      _type: "property",
      name: prop.name,
      slug: { _type: "slug", current: prop.slug },
      tagline: prop.tagline,
      location: "Cape Town, South Africa",
      featured: true,
      starRating: prop.starRating,
      nightsBridgeUrl: "https://book.nightsbridge.com/30034",
      amenities: prop.amenities.map((a, i) => ({
        _key: `amenity-${i}`,
        name: a.name,
        category: a.category,
      })),
      highlights: prop.highlights.map((h, i) => ({
        _key: `highlight-${i}`,
        title: h.title,
        description: h.description,
      })),
      seo: {
        title: `${prop.name} | Urban Elephant`,
        description: prop.description,
      },
      // Image references (to be linked after upload)
      _heroImageFile: images?.heroImage,
      _galleryFiles: images?.gallery,
    });
  }

  // 3. Tours
  const tours = [
    { slug: "aquila-safari", name: "Aquila Safari", category: "wildlife", price: 2500, duration: "Full Day", description: "Experience the Big 5 at Aquila Private Game Reserve, just 2 hours from Cape Town." },
    { slug: "cape-point-penguins", name: "Cape Point & Penguins", category: "sightseeing", price: 1200, duration: "Full Day", description: "Visit the Cape of Good Hope and meet the famous Boulders Beach penguins." },
    { slug: "winelands-tour", name: "Winelands Tour", category: "wine-food", price: 1500, duration: "Full Day", description: "Explore Stellenbosch, Franschhoek, and Paarl wine regions with tastings at premium estates." },
    { slug: "table-mountain-hike", name: "Table Mountain Hike", category: "adventure", price: 800, duration: "Half Day", description: "Guided hike up one of the New7Wonders of Nature with breathtaking views." },
    { slug: "shark-cage-diving", name: "Shark Cage Diving", category: "adventure", price: 2200, duration: "Full Day", description: "Get up close with great white sharks in Gansbaai, the shark capital of the world." },
    { slug: "boat-cruises", name: "Boat Cruises", category: "sightseeing", price: 600, duration: "2-3 Hours", description: "Sunset cruises and harbor tours departing from the V&A Waterfront." },
    { slug: "surf-lessons", name: "Surf Lessons", category: "water-sports", price: 500, duration: "2 Hours", description: "Learn to surf with experienced instructors at Muizenberg Beach." },
    { slug: "kirstenbosch-gardens", name: "Kirstenbosch Gardens", category: "sightseeing", price: 400, duration: "Half Day", description: "Explore one of the world's great botanical gardens on the slopes of Table Mountain." },
    { slug: "bo-kaap-walking-tour", name: "Bo-Kaap Walking Tour", category: "cultural", price: 350, duration: "2 Hours", description: "Discover the colorful history and culture of Cape Town's iconic Bo-Kaap neighborhood." },
    { slug: "kayaking-adventures", name: "Kayaking Adventures", category: "water-sports", price: 700, duration: "3 Hours", description: "Paddle through kelp forests and spot seals and penguins from the water." },
    { slug: "harley-davidson-tours", name: "Harley Davidson Tours", category: "adventure", price: 3000, duration: "Full Day", description: "Ride along the stunning Cape Peninsula on a classic Harley Davidson." },
    { slug: "full-day-chauffeur-service", name: "Full Day Chauffeur Service", category: "sightseeing", price: 4500, duration: "Full Day", description: "Private chauffeur service to customize your perfect Cape Town day." },
    { slug: "cooking-experience", name: "Cooking Experience", category: "cultural", price: 1200, duration: "4 Hours", description: "Learn to cook traditional Cape Malay cuisine with local chefs." },
  ];

  for (const tour of tours) {
    const imageFile = tourImageMapping[tour.slug];

    sanityDocuments.push({
      _id: generateSanityId("tour", tour.slug),
      _type: "tour",
      name: tour.name,
      slug: { _type: "slug", current: tour.slug },
      category: tour.category,
      price: tour.price,
      duration: tour.duration,
      shortDescription: tour.description,
      featured: true,
      _imageFile: imageFile,
    });
  }

  // 4. Reviews
  const reviews = [
    { author: "Sarah M.", content: "Absolutely stunning property with breathtaking views of Table Mountain. The staff went above and beyond to make our stay special. The rooftop pool is a highlight!", rating: 5, source: "google", property: "the-rose" },
    { author: "James K.", content: "Perfect location in the heart of Cape Town. The apartment was immaculate and had everything we needed. Will definitely be coming back!", rating: 5, source: "booking", property: "16-on-bree" },
    { author: "Emma L.", content: "The rooftop pool is amazing! We loved watching the sunset over the city. The team arranged incredible tours for us too.", rating: 5, source: "airbnb", property: "the-rose" },
    { author: "Michael R.", content: "Best accommodation we've stayed at in Cape Town. The waterfront views from The Docklands are spectacular.", rating: 5, source: "tripadvisor", property: "the-docklands" },
    { author: "Lisa T.", content: "The Flamingo exceeded our expectations. Loved being so close to the beach and the Sea Point promenade.", rating: 5, source: "google", property: "the-flamingo" },
  ];

  for (const review of reviews) {
    sanityDocuments.push({
      _id: generateSanityId("review", review.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
      _type: "review",
      author: review.author,
      content: review.content,
      rating: review.rating,
      source: review.source,
      featured: true,
      property: review.property ? { _type: "reference", _ref: generateSanityId("property", review.property) } : undefined,
    });
  }

  // Generate NDJSON (without internal _file fields)
  const cleanedDocuments = sanityDocuments.map(doc => {
    const cleaned = { ...doc };
    delete cleaned._heroImageFile;
    delete cleaned._galleryFiles;
    delete cleaned._imageFile;
    return cleaned;
  });

  const ndjson = cleanedDocuments.map((doc) => JSON.stringify(doc)).join("\n");

  // Save files
  const ndjsonPath = path.join(OUTPUT_DIR, "sanity-import.ndjson");
  fs.writeFileSync(ndjsonPath, ndjson);
  console.log(`💾 Sanity import file saved to: ${ndjsonPath}`);

  // Save image mapping for reference
  const imageMappingPath = path.join(OUTPUT_DIR, "image-mapping.json");
  fs.writeFileSync(imageMappingPath, JSON.stringify({
    properties: imageMapping,
    tours: tourImageMapping,
    site: siteImages,
    mediaDir: MEDIA_DIR,
  }, null, 2));
  console.log(`💾 Image mapping saved to: ${imageMappingPath}`);

  // Summary
  console.log("\n📊 Content Summary:");
  console.log(`   Site Settings: 1`);
  console.log(`   Properties: ${properties.length}`);
  console.log(`   Tours: ${tours.length}`);
  console.log(`   Reviews: ${reviews.length}`);
  console.log(`   Total Documents: ${cleanedDocuments.length}`);

  console.log("\n📸 Images ready for upload:");
  console.log(`   Property images: ${Object.values(imageMapping).reduce((acc, p) => acc + 1 + p.gallery.length, 0)}`);
  console.log(`   Tour images: ${Object.keys(tourImageMapping).length}`);

  console.log("\n✅ Content ready for Sanity import!");
  console.log("\nNext steps:");
  console.log("1. Create a Sanity project: npx sanity init");
  console.log("2. Import content: npx sanity dataset import sanity-import/sanity-import.ndjson production");
  console.log("3. Upload images via Sanity Studio or CLI");
}

main().catch(console.error);
