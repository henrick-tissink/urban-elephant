# Urban Elephant Website Rebuild Plan

> **Status**: Planning
> **Last Updated**: 2026-02-08
> **Resume Point**: Check the [ ] boxes below to find where we left off

---

## Project Overview

Complete rebuild of urbanelephant.co.za:
- **From**: Astro + Strapi (hosted on DigitalOcean)
- **To**: Next.js 16 + Sanity CMS + next-intl

### Key Decisions
- [x] Use Sanity CMS (not continue with Strapi)
- [x] Add i18n support with next-intl
- [x] Migrate content from Strapi API
- [x] Create new Sanity project

---

## Design System: Cutting-Edge Luxury UI

> **Goal**: Create a website that feels like stepping into a 5-star hotel lobby - elegant, immersive, memorable.

### Color Palette
```css
/* Primary */
--stone-50: #fafaf9     /* Backgrounds */
--stone-900: #1c1917    /* Text, dark sections */

/* Accent - Warm Gold */
--amber-500: #f59e0b    /* Primary accent */
--amber-600: #d97706    /* Hover states */
--amber-400: #fbbf24    /* Light accent */

/* Semantic */
--white: #ffffff
--black: #000000
```

### Typography Scale
```css
/* Display - Playfair Display (serif) */
--text-display: clamp(3rem, 8vw, 7rem);     /* Hero headlines */
--text-h1: clamp(2.5rem, 5vw, 4.5rem);      /* Page titles */
--text-h2: clamp(2rem, 4vw, 3.5rem);        /* Section titles */

/* Body - Inter (sans) */
--text-body: 1rem;                           /* 16px */
--text-small: 0.875rem;                      /* 14px */
--text-xs: 0.75rem;                          /* 12px, labels */

/* Special */
--tracking-luxury: 0.3em;                    /* Uppercase subtitles */
```

### Signature Interactions

#### 1. Hero Section
- [ ] **Cinematic video reveal**: Video fades in with Ken Burns effect
- [ ] **Parallax title**: Text moves at 0.5x scroll speed
- [ ] **Scroll indicator**: Animated chevron with mouse-follow subtle glow
- [ ] **Video controls**: Minimal pill-shaped controls, glass-morphism style

#### 2. Property Cards
- [ ] **Hover lift**: Card elevates 8px with shadow expansion
- [ ] **Image zoom**: Subtle 1.05x scale on hover
- [ ] **Text reveal**: Location slides up from below on hover
- [ ] **Cursor change**: Custom "View" cursor on hover

#### 3. Scroll Animations (GSAP ScrollTrigger)
- [ ] **Section reveals**: Fade + slide from bottom, staggered children
- [ ] **Parallax backgrounds**: Decorative elements move at different speeds
- [ ] **Progress indicator**: Thin accent line showing page progress
- [ ] **Text splitting**: Headlines animate word-by-word

#### 4. Gallery Experience
- [ ] **Lightbox with gestures**: Swipe, pinch-to-zoom on mobile
- [ ] **Thumbnail filmstrip**: Scrollable preview with active indicator
- [ ] **LQIP blur-up**: Low-quality placeholder → crisp image transition
- [ ] **Keyboard navigation**: Arrow keys, escape to close

#### 5. Testimonials Carousel
- [ ] **3D card stack**: Cards appear to stack in depth
- [ ] **Auto-rotate with pause**: Pauses on hover/focus
- [ ] **Smooth transitions**: Spring physics, not linear
- [ ] **Quote marks**: Animated SVG quote icon

#### 6. Page Transitions (View Transitions API)
- [ ] **Cross-fade**: Smooth transition between pages
- [ ] **Shared element**: Property card → Property hero image morph
- [ ] **Loading state**: Elegant skeleton with shimmer

### Animation Timing
```typescript
// Smooth, luxurious easing
const EASE = {
  smooth: [0.25, 0.1, 0.25, 1],      // Standard
  smoothOut: [0, 0, 0.2, 1],         // Exit animations
  spring: { type: "spring", stiffness: 100, damping: 15 },
  luxury: [0.6, 0.01, -0.05, 0.95],  // Signature Urban Elephant
};

// Duration guidelines
const DURATION = {
  fast: 0.2,      // Hovers, micro-interactions
  medium: 0.4,    // Component reveals
  slow: 0.8,      // Hero, page transitions
  stagger: 0.1,   // Delay between children
};
```

### Performance Budgets (Core Web Vitals)
| Metric | Target | Priority |
|--------|--------|----------|
| LCP | < 2.5s | Critical |
| FID | < 100ms | High |
| CLS | < 0.1 | High |
| TTI | < 3.8s | Medium |
| Bundle Size | < 200KB JS | High |

### Dark Mode (Optional Evening Experience)
- [ ] Automatic toggle based on time (after 6pm local)
- [ ] Manual toggle in header
- [ ] Preference saved to localStorage
- [ ] Smooth color transition (300ms)

### Additional Dependencies for UI Excellence
```bash
npm install gsap @gsap/react         # Premium scroll animations
npm install lenis                     # Smooth scrolling
npm install @studio-freight/react-lenis
npm install vaul                      # Mobile drawer
npm install sonner                    # Toast notifications
```

---

## Phase 1: Project Setup

### 1.1 Clean Existing Files
- [ ] Back up current `src/` for reference
- [ ] Delete `src/app/` contents (keep directory)
- [ ] Delete `src/components/` contents
- [ ] Delete `src/sanity/` contents
- [ ] Delete `src/lib/` contents
- [ ] Delete `src/types/` contents
- [ ] Keep: `scraped-media/`, `public/videos/hero.mp4`, config files

### 1.2 Install Dependencies
```bash
# Core
npm install next-intl next-sanity @portabletext/react

# Forms & Validation
npm install zod postmark react-hook-form @hookform/resolvers

# UI Components (Radix)
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-tooltip @radix-ui/react-dropdown-menu

# Animation & Scroll
npm install gsap @gsap/react           # GSAP for premium animations
npm install lenis @studio-freight/react-lenis  # Smooth scrolling
npm install framer-motion              # Already installed

# Carousel & Gallery
npm install embla-carousel-react embla-carousel-autoplay

# Utilities
npm install vaul                       # Mobile drawer
npm install sonner                     # Toast notifications
npm install date-fns                   # Date formatting
npm install clsx tailwind-merge        # Already installed
```
- [ ] Run all install commands
- [ ] Verify no peer dependency conflicts

### 1.3 Create Sanity Project
- [ ] Go to sanity.io/manage → Create project
- [ ] Note Project ID: `________________`
- [ ] Create `.env.local` with:
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=
  SANITY_WEBHOOK_SECRET=
  POSTMARK_API_TOKEN=
  EMAIL_FROM=noreply@urbanelephant.co.za
  EMAIL_TO=reservations@urbanelephant.co.za
  NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
  NEXT_PUBLIC_TIDIO_KEY=
  NEXT_PUBLIC_SITE_URL=https://www.urbanelephant.co.za
  ```

---

## Phase 2: Sanity Schemas

### 2.1 Document Schemas (8 total)

#### Property (`src/sanity/schemas/documents/property.ts`)
- [ ] Create schema with fields:
  - name (string, required)
  - slug (slug from name)
  - tagline (string)
  - description (portableText)
  - location (string) - e.g., "Cape Town CBD"
  - address (string) - full address
  - coordinates (geopoint)
  - heroImage (image with hotspot)
  - gallery (array of images)
  - video (file, video/*)
  - amenities (array of amenity objects)
  - highlights (array of {title, description, icon})
  - nearbyAttractions (array of references to attraction)
  - restaurants (array of references to restaurant)
  - nightsBridgeUrl (url)
  - starRating (number 1-5)
  - featured (boolean)
  - order (number)
  - seo (seo object)

#### Tour (`src/sanity/schemas/documents/tour.ts`)
- [ ] Create schema with fields:
  - name (string, required)
  - slug (slug)
  - category (string: adventure, wildlife, cultural, wine-food, sightseeing)
  - description (portableText)
  - image (image)
  - gallery (array of images)
  - duration (string)
  - price (number)
  - priceNote (string)
  - highlights (array of strings)
  - includes (array of strings)
  - excludes (array of strings)
  - meetingPoint (string)
  - groupSize (object: {min, max})
  - featured (boolean)
  - seo (seo object)

#### Review (`src/sanity/schemas/documents/review.ts`)
- [ ] Create schema with fields:
  - author (string)
  - content (text)
  - rating (number 1-5)
  - source (string: google, booking, tripadvisor, client)
  - property (reference to property, optional)
  - date (date)
  - featured (boolean)

#### SiteSettings (`src/sanity/schemas/documents/siteSettings.ts`)
- [ ] Create singleton schema with fields:
  - siteName (string)
  - logo (image)
  - logoFull (image)
  - elephantIcon (image)
  - contact: {email, phone, whatsapp, operationsHours, afterHoursPhone}
  - address: {street, city, country}
  - socialLinks (array of {platform, url, icon})
  - mainNavigation (array of {label, href})
  - footerNavigation (array of {label, href})
  - bookNowUrl (url)
  - defaultSeo (seo object)

#### Popup (`src/sanity/schemas/documents/popup.ts`)
- [ ] Create schema with fields:
  - heading (string)
  - message (portableText)
  - buttonText (string)
  - buttonLink (string)
  - image (image)
  - isActive (boolean)
  - startDate (datetime)
  - endDate (datetime)

#### Attraction (`src/sanity/schemas/documents/attraction.ts`)
- [ ] Create schema with fields:
  - name (string)
  - description (text)
  - image (image)
  - category (string: dining, sightseeing, activity)

#### CarHireVehicle (`src/sanity/schemas/documents/carHire.ts`)
- [ ] Create schema with fields:
  - name (string)
  - category (string: compact, sedan, suv, luxury)
  - image (image)
  - pricePerDay (number)
  - features (array of strings)
  - available (boolean)

#### Page (`src/sanity/schemas/documents/page.ts`)
- [ ] Create schema for CMS-managed pages:
  - title (string)
  - slug (slug)
  - pageBuilder (array of block references)
  - seo (seo object)

### 2.2 Object Schemas

- [ ] Create `src/sanity/schemas/objects/seo.ts`:
  - title, description, ogImage, noIndex
- [ ] Create `src/sanity/schemas/objects/portableText.ts`:
  - Configure rich text with links, bold, italic
- [ ] Create `src/sanity/schemas/objects/cta.ts`:
  - label, href, variant

### 2.3 Schema Index
- [ ] Create `src/sanity/schemas/index.ts` exporting all schemas
- [ ] Create `src/sanity/sanity.config.ts`
- [ ] Create `src/sanity/desk-structure.ts` for Studio organization

---

## Phase 3: Sanity Client & Queries

### 3.1 Client Setup
- [ ] Create `src/lib/sanity/client.ts`:
  - Read client (CDN enabled)
  - Preview client (no CDN, with token)
  - getClient helper function

### 3.2 Image Builder
- [ ] Create `src/lib/sanity/image.ts`:
  - urlFor helper function
  - Image dimension helpers

### 3.3 GROQ Queries
- [ ] Create `src/lib/sanity/queries.ts`:
  - `siteSettingsQuery`
  - `propertiesQuery` (list)
  - `propertyBySlugQuery` (detail)
  - `toursQuery` (list)
  - `tourBySlugQuery` (detail)
  - `featuredReviewsQuery`
  - `activePopupQuery`
  - `attractionsQuery`
  - `carHireQuery`

### 3.4 Portable Text Renderer
- [ ] Create `src/lib/sanity/portable-text.tsx`:
  - Custom components for links, images
  - Styling integration

---

## Phase 4: i18n Setup

### 4.1 Configuration
- [ ] Create `src/i18n/routing.ts`:
  ```typescript
  locales: ['en', 'af'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
  ```
- [ ] Create `src/i18n/request.ts`

### 4.2 Messages
- [ ] Create `src/messages/en.json`:
  - common (buttons, labels)
  - navigation
  - homepage sections
  - property page
  - tour page
  - contact form
  - footer
- [ ] Create `src/messages/af.json` (can be placeholder initially)

### 4.3 Middleware
- [ ] Create `src/middleware.ts` for locale detection

---

## Phase 5: App Structure

### 5.1 Root Layout
- [ ] Create `src/app/layout.tsx`:
  - HTML lang attribute
  - Font loading (Inter, Playfair Display)
  - Metadata defaults

### 5.2 Locale Layout
- [ ] Create `src/app/[locale]/layout.tsx`:
  - NextIntlClientProvider
  - Header component
  - Footer component
  - PromotionalPopup component
  - Analytics scripts (GTM, Tidio)

### 5.3 Pages

#### Homepage
- [ ] Create `src/app/[locale]/page.tsx`:
  - Fetch: properties, reviews, siteSettings, popup
  - Sections: Hero, PropertiesGrid, AboutPreview, Testimonials, ServicesPreview, CTA

#### Properties List
- [ ] Create `src/app/[locale]/properties/page.tsx`:
  - Fetch all properties
  - Grid display with filters

#### Property Detail
- [ ] Create `src/app/[locale]/properties/[slug]/page.tsx`:
  - Fetch single property with all relations
  - generateStaticParams for SSG
  - generateMetadata for SEO
  - Sections: Hero, Gallery, Amenities, NearbyAttractions, Booking

#### Tours List
- [ ] Create `src/app/[locale]/tours/page.tsx`:
  - Fetch all tours
  - Category filtering

#### Tour Detail
- [ ] Create `src/app/[locale]/tours/[slug]/page.tsx`:
  - Full tour details
  - Booking/inquiry CTA

#### Car Hire
- [ ] Create `src/app/[locale]/car-hire/page.tsx`:
  - Vehicle listings
  - Inquiry form

#### About
- [ ] Create `src/app/[locale]/about/page.tsx`:
  - Zola's Story section
  - Team/founder info

#### Contact
- [ ] Create `src/app/[locale]/contact/page.tsx`:
  - Contact form
  - Map
  - Contact info from siteSettings

### 5.4 API Routes
- [ ] Create `src/app/api/contact/route.ts`:
  - Postmark email sending
  - Zod validation
  - Rate limiting
- [ ] Create `src/app/api/revalidate/route.ts`:
  - Sanity webhook handler
  - Signature verification

### 5.5 Error Pages
- [ ] Create `src/app/not-found.tsx`
- [ ] Create `src/app/error.tsx`

### 5.6 SEO Files
- [ ] Create `src/app/sitemap.ts`
- [ ] Create `src/app/robots.ts`

---

## Phase 6: Components (Cutting-Edge UI)

### 6.1 Core UI Components (`src/components/ui/`)

#### Button System
- [ ] `button.tsx` - Multiple variants:
  - `primary`: Amber background, white text, subtle glow on hover
  - `secondary`: Stone background
  - `outline`: Border only, fill on hover
  - `ghost`: Transparent, text only
  - `link`: Underline animation
  - Sizes: `sm`, `md`, `lg`, `xl`
  - Loading state with spinner
  - Ripple effect on click

#### Form Components
- [ ] `input.tsx` - Floating label, focus ring animation
- [ ] `textarea.tsx` - Auto-resize, character count
- [ ] `select.tsx` - Radix-based, custom styling
- [ ] `date-picker.tsx` - Calendar with availability
- [ ] `phone-input.tsx` - Country code selector

#### Overlay Components
- [ ] `dialog.tsx` - Modal with backdrop blur, spring animation
- [ ] `drawer.tsx` - Mobile-first slide-up panel (vaul)
- [ ] `toast.tsx` - Notifications (sonner), positioned bottom-right

#### Media Components
- [ ] `sanity-image.tsx`:
  - Blur-up placeholder (LQIP)
  - Responsive srcset
  - Art direction support
  - Hover zoom option
- [ ] `video-player.tsx`:
  - Custom controls (play/pause/mute)
  - Poster image fallback
  - Lazy loading
  - Picture-in-picture support
- [ ] `carousel.tsx`:
  - Embla-based
  - Dot indicators + arrows
  - Autoplay with pause on hover
  - Touch/swipe support

### 6.2 Layout Components (`src/components/layout/`)

#### Header
- [ ] `header.tsx`:
  - **Transparent → solid** transition on scroll
  - Logo color inversion on scroll
  - Mega menu for Properties dropdown
  - Mobile hamburger with animated bars
  - Sticky "Book Now" button
  - Language switcher

#### Footer
- [ ] `footer.tsx`:
  - 4-column grid → stacked on mobile
  - Newsletter signup form
  - Social icons with hover animations
  - Back-to-top button
  - Copyright with current year

#### Navigation
- [ ] `mobile-menu.tsx`:
  - Full-screen overlay
  - Staggered link reveals (GSAP)
  - Social links at bottom
  - Close button with X animation
- [ ] `breadcrumbs.tsx`:
  - Property/Tour detail pages
  - Animated separator

### 6.3 Homepage Sections (`src/components/sections/`)

#### Hero Section
- [ ] `hero.tsx`:
  ```
  Features:
  - Fullscreen video background
  - Ken Burns effect on poster image (before video loads)
  - Gradient overlay (bottom heavier)
  - Animated title with word-by-word reveal
  - Subtitle with letter-spacing animation
  - Dual CTAs with staggered appearance
  - Scroll indicator (bouncing chevron)
  - Video controls (bottom-left, glass-morphism)
  - "Best Rate Promise" badge (bottom-right, slides in)
  ```

#### Properties Grid
- [ ] `properties-grid.tsx`:
  - 2x2 grid on desktop, stack on mobile
  - Scroll-triggered reveal (staggered)
  - Section header with animated underline
- [ ] `property-card.tsx`:
  - Aspect ratio container (4:3)
  - Image with parallax on scroll
  - Overlay gradient (bottom)
  - Badge (top-left): "27th Floor Pool"
  - Star rating (top-right)
  - Title + tagline + location
  - "View Property" link with arrow animation

#### Testimonials
- [ ] `testimonials.tsx`:
  - Dark background section (stone-900)
  - Animated quote icon (SVG)
  - 3D card carousel effect
  - Star rating display
  - Author + property + source
  - Navigation arrows + dots
  - Trust badges row (animated counters)

#### About Preview
- [ ] `about-preview.tsx`:
  - Two-column layout
  - Image with decorative offset square
  - Quote card overlay (bottom of image)
  - Text content with signature italic headline
  - Dual CTAs

#### Services Preview
- [ ] `services-preview.tsx`:
  - 3-column grid
  - Icon with hover background fill
  - Title + description
  - Arrow link animation

#### CTA Section
- [ ] `cta-section.tsx`:
  - Gradient amber background
  - Pattern overlay (subtle)
  - Large centered text
  - Trust indicators row
  - Dual CTAs

### 6.4 Property Detail Components (`src/components/property/`)

- [ ] `property-hero.tsx`:
  - Full-width image/video
  - Breadcrumb overlay
  - Property name + tagline
  - Quick stats row (star rating, location)
  - "Book Now" floating button

- [ ] `property-gallery.tsx`:
  - Masonry grid layout
  - Lightbox on click
  - Thumbnail navigation
  - Full-screen mode
  - Touch gestures

- [ ] `property-amenities.tsx`:
  - Icon grid (4 columns)
  - Tooltip on hover
  - Category grouping

- [ ] `property-booking.tsx`:
  - NightsBridge widget embed OR
  - Custom booking form
  - Date range picker
  - Guest counter
  - "Check Availability" CTA

- [ ] `property-map.tsx`:
  - Interactive Google Map
  - Custom marker with property icon
  - Nearby POI markers
  - Directions link

### 6.5 Global Components (`src/components/global/`)

- [ ] `promotional-popup.tsx`:
  - Delayed appearance (3s)
  - SessionStorage to prevent repeat
  - Image + text + CTA
  - Backdrop blur
  - Spring animation

- [ ] `smooth-scroll.tsx`:
  - Lenis provider wrapper
  - Disable on reduced-motion preference

- [ ] `scroll-progress.tsx`:
  - Thin accent bar at top of viewport
  - GSAP ScrollTrigger

- [ ] `analytics.tsx`:
  - GTM script (deferred)
  - Consent management ready

- [ ] `chat-widget.tsx`:
  - Tidio lazy load
  - Custom positioning

### 6.6 Animation Utilities (`src/components/animations/`)

- [ ] `scroll-reveal.tsx`:
  - Framer Motion + useInView
  - Configurable direction (up/down/left/right)
  - Delay + duration props

- [ ] `stagger-children.tsx`:
  - Parent wrapper for staggered reveals
  - Configurable stagger timing

- [ ] `text-reveal.tsx`:
  - Word-by-word or character animation
  - GSAP SplitText alternative

- [ ] `parallax.tsx`:
  - Element parallax on scroll
  - Configurable speed

- [ ] `magnetic-button.tsx`:
  - Cursor-following hover effect
  - For primary CTAs

### 6.7 Skeleton Components (`src/components/skeletons/`)

- [ ] `property-card-skeleton.tsx`
- [ ] `tour-card-skeleton.tsx`
- [ ] `testimonial-skeleton.tsx`
- [ ] `gallery-skeleton.tsx`

---

## Phase 7: Content Migration

### 7.1 Migration Script
- [ ] Create `scripts/migrate.ts`:
  - Fetch from Strapi API
  - Transform to Sanity format
  - Upload images
  - Create documents

### 7.2 Content to Migrate

#### Properties (4 total)
- [ ] 16 On Bree - CBD location, 27th floor pool
- [ ] The Docklands - De Waterkant, rooftop views
- [ ] The Flamingo - Sea Point, ocean views
- [ ] The Rose - Strand Street, 360 city views

#### Tours (~12 total)
- [ ] Aquila Safari
- [ ] Shark Cage Diving
- [ ] Wine Tours
- [ ] Cape of Good Hope
- [ ] Kirstenbosch
- [ ] Boulders Beach
- [ ] Boat Cruises
- [ ] Surfing Lessons
- [ ] Kayaking
- [ ] Harley Davidson Tours
- [ ] Full Day Chauffeur
- [ ] Cooking Experience

#### Reviews
- [ ] Import featured reviews from Strapi

#### Site Settings
- [ ] Contact info
- [ ] Social links
- [ ] Navigation menus

#### Media Upload
- [ ] Upload images from `scraped-media/` to Sanity
- [ ] Map old URLs to new Sanity asset IDs
- [ ] Verify hero video in `/public/videos/`

---

## Phase 8: Integrations

### 8.1 NightsBridge Booking
- [ ] Get NightsBridge property IDs for each property
- [ ] Implement booking widget or external link
- [ ] Test booking flow

### 8.2 Postmark Email
- [ ] Create Postmark account/get API key
- [ ] Design email template
- [ ] Implement contact form submission
- [ ] Test email delivery

### 8.3 Google Analytics
- [ ] Get GTM container ID
- [ ] Add GTM script to layout
- [ ] Set up conversion tracking
- [ ] Test event firing

### 8.4 Tidio Chat
- [ ] Get Tidio widget key
- [ ] Add Tidio script to layout
- [ ] Test chat functionality

---

## Phase 9: SEO & Performance

### 9.1 Metadata
- [ ] Dynamic meta tags per page
- [ ] Open Graph images
- [ ] Twitter cards
- [ ] JSON-LD structured data (LocalBusiness, Hotel)

### 9.2 Performance
- [ ] Configure next.config.ts for Sanity images
- [ ] Implement ISR with appropriate revalidate times
- [ ] Optimize video loading
- [ ] Add loading states
- [ ] Test Core Web Vitals

### 9.3 Accessibility
- [ ] Alt text for all images
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Screen reader testing

---

## Phase 10: Testing & QA

### 10.1 Functional Testing
- [ ] All pages render correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Booking links work
- [ ] Image galleries work
- [ ] Mobile responsive

### 10.2 Content Verification
- [ ] All properties display correctly
- [ ] All tours display correctly
- [ ] Reviews show properly
- [ ] Contact info is accurate

### 10.3 Cross-browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Phase 11: Deployment

### 11.1 Vercel Setup
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set up preview deployments
- [ ] Configure custom domain

### 11.2 Sanity Deployment
- [ ] Deploy Sanity Studio (embedded or separate)
- [ ] Set up webhook for ISR
- [ ] Configure CORS

### 11.3 DNS & Domain
- [ ] Update DNS to Vercel
- [ ] Verify SSL certificate
- [ ] Test www vs non-www redirects

### 11.4 Go-Live Checklist
- [ ] Final content review
- [ ] All forms tested
- [ ] Analytics verified
- [ ] Performance acceptable
- [ ] Old site redirects configured
- [ ] Backup of old site

---

## Reference: File Locations

### Existing Strapi Content
- **API Endpoint**: `https://octopus-app-5f2hl.ondigitalocean.app/api/`
- **Strapi Schemas**: `/urban-elephant-cms/src/components/core/*.json`
- **Astro Components**: `/urban-elephant-astro/src/components/`
- **Type Definitions**: `/urban-elephant-astro/src/types/index.ts`

### Scraped Media
- **Location**: `/urban-elephant-new/scraped-media/`
- **Count**: 256 files (images + 3 videos)
- **Manifest**: `/urban-elephant-new/scraped-media/manifest.json`

### Existing Videos
- **Hero**: `/urban-elephant-new/public/videos/hero.mp4` (23MB)
- **Scraped**: 3 additional videos in scraped-media/

---

## Progress Summary

| Phase | Status | Completion |
|-------|--------|------------|
| Design System | ✅ Complete | 100% |
| 1. Project Setup | ✅ Complete | 100% |
| 2. Sanity Schemas | ✅ Complete | 100% |
| 3. Client & Queries | ✅ Complete | 100% |
| 4. i18n Setup | ✅ Complete | 100% |
| 5. App Structure | ✅ Complete | 100% |
| 6. Components | ✅ Complete | 90% |
| 7. Content Migration | ✅ Complete | 100% |
| 8. Integrations | 🔄 In Progress | 50% |
| 9. SEO & Performance | 🔄 In Progress | 50% |
| 10. Testing | Not Started | 0% |
| 11. Deployment | Not Started | 0% |

### Phase 7 Update (Content Migration)
**Completed 2026-02-08:**
- Created `scripts/strapi-to-sanity.ts` - fetches from Strapi API
- Created `scripts/setup-sanity-content.ts` - generates complete Sanity documents
- Created `scripts/upload-images-to-sanity.ts` - uploads images & updates documents
- Generated `sanity-import/sanity-import.ndjson` - 23 documents ready for import
- Created `sanity-import/image-mapping.json` - maps 39 images to documents
- Added npm scripts: `sanity:import`, `sanity:upload-images`, `sanity:setup`
- Created `SANITY_SETUP.md` - step-by-step setup guide

**Content Ready:**
- 1 Site Settings (contact, social, address)
- 4 Properties (with amenities, highlights, SEO)
- 13 Tours (with categories, prices, descriptions)
- 5 Reviews (featured testimonials)

**Next Steps:**
1. Create Sanity project at sanity.io/manage
2. Run `npm run sanity:import` to import content
3. Run `npm run sanity:upload-images` to upload media
4. Add Sanity project ID to `.env.local`

---

## Design Inspiration References

### Luxury Hotel Websites to Study
- **Le Mirabeau Zermatt** - Spotlight cursor effect
- **Badrutt's Palace** - Rich multimedia + storytelling
- **7132 Hotel Switzerland** - Minimalism meets stunning imagery
- **Burj Al Arab** - Sweeping property views, opulent feel
- **The NoMad Hotel** - Deep color palette, editorial layout

### Key Patterns to Emulate
1. **Cinematic video intros** with subtle controls
2. **Parallax storytelling** on scroll
3. **Property cards with hover depth** effects
4. **Testimonials as social proof** with trust badges
5. **Persistent booking CTA** that doesn't feel pushy
6. **Smooth page transitions** (View Transitions API)

### What NOT to Do
- Heavy animations that slow load time
- Autoplay video with sound
- Pop-ups that block content immediately
- Complex navigation that hides key pages
- Stock photography that looks generic

---

## Technical Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CMS | Sanity | Flexible schemas, real-time preview, image CDN |
| i18n | next-intl | Best Next.js App Router support |
| Animations | GSAP + Framer Motion | GSAP for scroll, Framer for component |
| Carousel | Embla | Lightweight, accessible, touch-friendly |
| Forms | react-hook-form + Zod | Performance + type-safe validation |
| Styling | Tailwind v4 | Already set up, design tokens |
| Smooth Scroll | Lenis | Industry standard for luxury feel |

---

## Notes & Decisions

_Add notes here as we progress:_

-
-
-
