/**
 * Upload Images to Sanity and Update Documents
 *
 * This script:
 * 1. Uploads all images from scraped-media to Sanity
 * 2. Creates asset references for each upload
 * 3. Updates property and tour documents with image references
 *
 * Prerequisites:
 * - Sanity project must be initialized
 * - .env.local must have SANITY_API_TOKEN with write access
 * - Run after importing sanity-import.ndjson
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@sanity/client";

// Load environment variables from .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing environment variables:");
  console.error("   NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
  console.error("   SANITY_API_TOKEN:", token ? "✓" : "✗");
  console.error("\nPlease set these in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const MEDIA_DIR = path.join(__dirname, "../scraped-media");
const MAPPING_FILE = path.join(__dirname, "../sanity-import/image-mapping.json");

interface ImageMapping {
  properties: {
    [slug: string]: {
      heroImage: string;
      gallery: string[];
    };
  };
  tours: {
    [slug: string]: string;
  };
  site: {
    logo: string;
    elephantIcon: string;
    heroVideo: string;
  };
  mediaDir: string;
}

interface UploadedAsset {
  _id: string;
  _type: "sanity.imageAsset" | "sanity.fileAsset";
  url: string;
  originalFilename: string;
}

const uploadedAssets: Map<string, UploadedAsset> = new Map();

async function uploadAsset(filename: string): Promise<UploadedAsset | null> {
  // Check if already uploaded
  if (uploadedAssets.has(filename)) {
    return uploadedAssets.get(filename)!;
  }

  const filePath = path.join(MEDIA_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`   ⚠️ File not found: ${filename}`);
    return null;
  }

  const ext = path.extname(filename).toLowerCase();
  const isVideo = [".mp4", ".webm", ".mov"].includes(ext);
  const isSvg = ext === ".svg";

  try {
    const fileBuffer = fs.readFileSync(filePath);

    let asset: any;
    if (isVideo || isSvg) {
      // Upload as file asset
      asset = await client.assets.upload("file", fileBuffer, {
        filename,
      });
    } else {
      // Upload as image asset
      asset = await client.assets.upload("image", fileBuffer, {
        filename,
      });
    }

    const uploadedAsset: UploadedAsset = {
      _id: asset._id,
      _type: isVideo || isSvg ? "sanity.fileAsset" : "sanity.imageAsset",
      url: asset.url,
      originalFilename: filename,
    };

    uploadedAssets.set(filename, uploadedAsset);
    console.log(`   ✓ Uploaded: ${filename}`);
    return uploadedAsset;
  } catch (error) {
    console.error(`   ✗ Failed to upload ${filename}:`, error);
    return null;
  }
}

function createImageRef(asset: UploadedAsset) {
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

function createFileRef(asset: UploadedAsset) {
  return {
    _type: "file",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function updateProperty(slug: string, heroImage: string, gallery: string[]) {
  const documentId = `property-${slug}`;

  console.log(`\n📸 Updating property: ${slug}`);

  // Upload hero image
  const heroAsset = await uploadAsset(heroImage);
  if (!heroAsset) {
    console.error(`   ✗ Could not upload hero image for ${slug}`);
    return;
  }

  // Upload gallery images
  const galleryAssets: UploadedAsset[] = [];
  for (const img of gallery) {
    const asset = await uploadAsset(img);
    if (asset) {
      galleryAssets.push(asset);
    }
  }

  // Update the document
  try {
    await client
      .patch(documentId)
      .set({
        heroImage: createImageRef(heroAsset),
        gallery: galleryAssets.map((asset, index) => ({
          _key: `gallery-${index}`,
          ...createImageRef(asset),
        })),
      })
      .commit();

    console.log(`   ✓ Updated ${slug} with ${1 + galleryAssets.length} images`);
  } catch (error) {
    console.error(`   ✗ Failed to update ${slug}:`, error);
  }
}

async function updateTour(slug: string, image: string) {
  const documentId = `tour-${slug}`;

  console.log(`\n📸 Updating tour: ${slug}`);

  const asset = await uploadAsset(image);
  if (!asset) {
    console.error(`   ✗ Could not upload image for ${slug}`);
    return;
  }

  try {
    await client
      .patch(documentId)
      .set({
        image: createImageRef(asset),
      })
      .commit();

    console.log(`   ✓ Updated ${slug} with image`);
  } catch (error) {
    console.error(`   ✗ Failed to update ${slug}:`, error);
  }
}

async function updateSiteSettings(site: ImageMapping["site"]) {
  console.log("\n📸 Updating site settings");

  // Upload logo
  const logoAsset = await uploadAsset(site.logo);
  // Upload elephant icon
  const iconAsset = await uploadAsset(site.elephantIcon);
  // Upload hero video
  const videoAsset = await uploadAsset(site.heroVideo);

  const updates: Record<string, any> = {};

  if (logoAsset) {
    updates.logo = createFileRef(logoAsset);
  }
  if (iconAsset) {
    updates.elephantIcon = createFileRef(iconAsset);
  }
  if (videoAsset) {
    updates.heroVideo = createFileRef(videoAsset);
  }

  if (Object.keys(updates).length > 0) {
    try {
      await client.patch("siteSettings").set(updates).commit();
      console.log(`   ✓ Updated site settings with ${Object.keys(updates).length} assets`);
    } catch (error) {
      console.error("   ✗ Failed to update site settings:", error);
    }
  }
}

async function main() {
  console.log("🚀 Uploading images to Sanity...\n");
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Media directory: ${MEDIA_DIR}\n`);

  // Check if media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`❌ Media directory not found: ${MEDIA_DIR}`);
    process.exit(1);
  }

  // Load image mapping
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error(`❌ Image mapping file not found: ${MAPPING_FILE}`);
    process.exit(1);
  }

  const mapping: ImageMapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf-8"));

  // Update properties
  for (const [slug, images] of Object.entries(mapping.properties)) {
    await updateProperty(slug, images.heroImage, images.gallery);
  }

  // Update tours
  for (const [slug, image] of Object.entries(mapping.tours)) {
    await updateTour(slug, image);
  }

  // Update site settings
  await updateSiteSettings(mapping.site);

  console.log("\n✅ Image upload complete!");
  console.log(`   Total assets uploaded: ${uploadedAssets.size}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
