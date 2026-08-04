import type { Localized } from "@/lib/i18n-content";

export interface PropertyAmenity {
  name: Localized<string>;
  icon?: string;
  category?: "general" | "room" | "bathroom" | "kitchen" | "entertainment" | "building";
}

export interface PropertyHighlight {
  title: Localized<string>;
  description?: Localized<string>;
  icon?: string;
}

export interface PropertyAward {
  provider: "booking.com";
  score: number;
  year: number;
  pdf: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface PriceRange {
  min: number;
  max?: number;
  currency: "ZAR";
}

export interface PostalAddress {
  street: string;
  locality: string;
  postalCode?: string;
  country: string;
}

export interface Property {
  _id: string;
  slug: string;
  name: string;
  tagline?: Localized<string>;
  description?: Localized<string[]>;
  location?: Localized<string>;
  /**
   * Suburb only, for the hero property strip. `location` holds a street
   * address for some properties ("117 Strand Street, Cape Town"), which reads
   * wrong in a row of place names — so this is set explicitly rather than
   * parsed out of it.
   */
  shortLocation?: string;
  address?: string;
  postalAddress?: PostalAddress;
  geo?: GeoCoordinates;
  priceRange?: PriceRange;
  heroImage?: string;
  gallery?: string[];
  video?: string;
  amenities?: PropertyAmenity[];
  highlights?: PropertyHighlight[];
  nearbyAttractions?: Attraction[];
  bookingUrl?: string;
  starRating?: number;
  featured?: boolean;
  order?: number;
  awards?: PropertyAward[];
}

export type PropertyCard = Property;

export interface TourGroupSize {
  min?: number;
  max?: number;
}

export type TourCategory =
  | "adventure"
  | "wildlife"
  | "cultural"
  | "wine-food"
  | "sightseeing"
  | "water-sports";

export interface Tour {
  _id: string;
  slug: string;
  name: Localized<string>;
  category?: TourCategory;
  shortDescription?: Localized<string>;
  description?: Localized<string[]>;
  image?: string;
  gallery?: string[];
  duration?: Localized<string>;
  price?: number;
  priceNote?: Localized<string>;
  highlights?: Localized<string[]>;
  includes?: Localized<string[]>;
  excludes?: Localized<string[]>;
  meetingPoint?: Localized<string>;
  groupSize?: TourGroupSize;
  featured?: boolean;
  order?: number;
}

export type TourCard = Tour;

export type ReviewSource = "google" | "booking" | "tripadvisor" | "client" | "airbnb" | "expedia";

export interface Review {
  _id: string;
  author: string;
  authorLocation?: string;
  content: string;
  rating: number;
  source?: ReviewSource;
  sourceScore?: number;
  property?: { name: string; slug: string };
  date?: string;
  featured?: boolean;
}

export interface Attraction {
  _id: string;
  slug: string;
  name: string;
  description?: Localized<string>;
  hostNote?: Localized<string>;
  image?: string;
  category?: "dining" | "sightseeing" | "activity" | "shopping" | "nightlife" | "culture";
  distance?: string;
  website?: string;
}

export interface Restaurant {
  _id: string;
  slug: string;
  name: string;
  description?: Localized<string>;
  hostNote?: Localized<string>;
  image?: string;
  cuisineType?: Localized<string>;
  mealType?: "breakfast" | "lunch" | "dinner";
  website?: string;
  perk?: Localized<string>;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  operationsHours?: string;
  afterHoursPhone?: string;
}

export interface AddressInfo {
  city: string;
  country: string;
  street?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface SiteSettings {
  siteName: string;
  contact: ContactInfo;
  address: AddressInfo;
  social: SocialMedia;
  bookNowUrl?: string;
}
