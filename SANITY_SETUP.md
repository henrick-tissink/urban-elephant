# Sanity CMS Setup Guide

This guide walks you through setting up Sanity CMS for the Urban Elephant website.

## Prerequisites

- Node.js 18+
- Sanity account (create at https://www.sanity.io)

## Step 1: Create a Sanity Project

```bash
# Login to Sanity (if not already logged in)
npx sanity login

# Create a new Sanity project
npx sanity init --project-id <YOUR_PROJECT_ID> --dataset production
```

Or create one at https://www.sanity.io/manage and note the Project ID.

## Step 2: Configure Environment Variables

Create `.env.local` in the project root:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.urbanelephant.co.za
```

**To get the API Token:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create a new token with **Editor** permissions

## Step 3: Import Content

```bash
# Import all documents (properties, tours, reviews, site settings)
npm run sanity:import
```

This imports from `sanity-import/sanity-import.ndjson`.

## Step 4: Upload Images

```bash
# Upload images from scraped-media and link to documents
npm run sanity:upload-images
```

This script:
- Uploads all property and tour images to Sanity
- Updates documents with image references
- Uploads site assets (logo, icons, video)

**Or run both steps together:**

```bash
npm run sanity:setup
```

## Step 5: Verify in Sanity Studio

Start the Sanity Studio:

```bash
npm run sanity:dev
```

Open http://localhost:3333 to see your content.

## Step 6: Start the Website

```bash
npm run dev
```

Open http://localhost:3000 to see the site with real content.

## Content Overview

The import includes:

| Type | Count | Notes |
|------|-------|-------|
| Site Settings | 1 | Contact, social, address |
| Properties | 4 | The Rose, 16 on Bree, Docklands, Flamingo |
| Tours | 13 | Safari, wine, adventure, cultural |
| Reviews | 5 | Featured guest reviews |

## Image Assets

Images are organized in `scraped-media/`:

- **Property images**: Hero images + gallery (26 total)
- **Tour images**: Featured image per tour (13 total)
- **Site assets**: Logo, icons, video (3 files)

## Troubleshooting

### "Project not found" error
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Ensure you're logged in: `npx sanity login`

### Images not uploading
- Verify `SANITY_API_TOKEN` has write permissions
- Check that `scraped-media/` directory exists

### Content not appearing on site
- Run `npm run build` to regenerate static pages
- Check Sanity Studio to verify data was imported

## Webhook Setup (Optional)

For automatic revalidation when content changes:

1. In Sanity: Settings → API → Webhooks
2. Create webhook with URL: `https://your-domain.com/api/revalidate`
3. Select document types to watch

## Deployment

The site uses ISR (Incremental Static Regeneration):

- Pages revalidate every 60 seconds
- Webhook can trigger immediate revalidation
- No environment variables needed on Vercel beyond Sanity credentials
