import type { PortableTextBlock } from "@portabletext/types";

// ============================================
// Base Types
// ============================================

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityGeopoint {
  _type: "geopoint";
  lat: number;
  lng: number;
  alt?: number;
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  openInNewTab?: boolean;
}

// ============================================
// Property Types
// ============================================

export interface PropertyAmenity {
  name: string;
  icon?: string;
  category?: "general" | "room" | "bathroom" | "kitchen" | "entertainment" | "building";
}

export interface PropertyHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface Property {
  _id: string;
  name: string;
  slug: SanitySlug;
  tagline?: string;
  description?: PortableTextBlock[];
  location?: string;
  address?: string;
  coordinates?: SanityGeopoint;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  video?: SanityFile;
  amenities?: PropertyAmenity[];
  highlights?: PropertyHighlight[];
  nearbyAttractions?: Attraction[];
  nightsBridgeUrl?: string;
  starRating?: number;
  featured?: boolean;
  order?: number;
  seo?: SEO;
}

export interface PropertyCard {
  _id: string;
  name: string;
  slug: SanitySlug;
  tagline?: string;
  location?: string;
  heroImage?: SanityImage;
  starRating?: number;
  featured?: boolean;
  highlights?: PropertyHighlight[];
}

// ============================================
// Tour Types
// ============================================

export interface TourGroupSize {
  min?: number;
  max?: number;
}

export interface Tour {
  _id: string;
  name: string;
  slug: SanitySlug;
  category?: "adventure" | "wildlife" | "cultural" | "wine-food" | "sightseeing" | "water-sports";
  description?: PortableTextBlock[];
  shortDescription?: string;
  image?: SanityImage;
  gallery?: SanityImage[];
  duration?: string;
  price?: number;
  priceNote?: string;
  highlights?: string[];
  includes?: string[];
  excludes?: string[];
  meetingPoint?: string;
  groupSize?: TourGroupSize;
  featured?: boolean;
  order?: number;
  seo?: SEO;
}

export interface TourCard {
  _id: string;
  name: string;
  slug: SanitySlug;
  category?: string;
  shortDescription?: string;
  image?: SanityImage;
  duration?: string;
  price?: number;
  priceNote?: string;
  featured?: boolean;
}

// ============================================
// Review Types
// ============================================

export type ReviewSource = "google" | "booking" | "tripadvisor" | "client" | "airbnb";

export interface Review {
  _id: string;
  author: string;
  content: string;
  rating: number;
  source?: ReviewSource;
  property?: {
    name: string;
    slug: SanitySlug;
  };
  date?: string;
  featured?: boolean;
}

// ============================================
// Car Hire Types
// ============================================

export interface VehicleSpecs {
  transmission?: string;
  passengers?: number;
  luggage?: number;
  doors?: number;
  fuelType?: string;
  airConditioning?: boolean;
}

export interface CarHireVehicle {
  _id: string;
  name: string;
  slug?: SanitySlug;
  category?: "compact" | "sedan" | "suv" | "luxury" | "van" | "convertible";
  image?: SanityImage;
  gallery?: SanityImage[];
  pricePerDay?: number;
  features?: string[];
  specs?: VehicleSpecs;
  available?: boolean;
  featured?: boolean;
}

// ============================================
// Attraction Types
// ============================================

export interface Attraction {
  _id: string;
  name: string;
  description?: string;
  image?: SanityImage;
  category?: "dining" | "sightseeing" | "activity" | "shopping" | "nightlife" | "culture";
  distance?: string;
  website?: string;
  googleMapsUrl?: string;
}

// ============================================
// Popup Types
// ============================================

export interface Popup {
  _id: string;
  heading: string;
  message?: PortableTextBlock[];
  buttonText?: string;
  buttonLink?: string;
  image?: SanityImage;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  showOnPages?: string[];
  dismissable?: boolean;
  delay?: number;
}

// ============================================
// Site Settings Types
// ============================================

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube" | "tripadvisor";
  url: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  operationsHours?: string;
  afterHoursPhone?: string;
}

export interface AddressInfo {
  street?: string;
  city?: string;
  country?: string;
}

export interface SiteSettings {
  siteName?: string;
  logo?: SanityImage;
  logoFull?: SanityImage;
  elephantIcon?: SanityImage;
  contact?: ContactInfo;
  address?: AddressInfo;
  social?: SocialMedia;
  socialLinks?: SocialLink[];
  mainNavigation?: NavItem[];
  footerNavigation?: FooterColumn[];
  bookNowUrl?: string;
  defaultSeo?: SEO;
}

// ============================================
// Page Types
// ============================================

export interface HeroSection {
  _type: "heroSection";
  heading?: string;
  subheading?: string;
  backgroundImage?: SanityImage;
  cta?: CTA;
}

export interface TextSection {
  _type: "textSection";
  heading?: string;
  content?: PortableTextBlock[];
}

export interface ImageGallerySection {
  _type: "imageGallery";
  heading?: string;
  images?: SanityImage[];
  layout?: "grid" | "masonry" | "carousel";
}

export interface CTASection {
  _type: "ctaSection";
  heading?: string;
  description?: string;
  cta?: CTA;
  backgroundImage?: SanityImage;
}

export type PageBlock = HeroSection | TextSection | ImageGallerySection | CTASection;

export interface Page {
  _id: string;
  title: string;
  slug: SanitySlug;
  content?: PortableTextBlock[];
  pageBuilder?: PageBlock[];
  seo?: SEO;
}
