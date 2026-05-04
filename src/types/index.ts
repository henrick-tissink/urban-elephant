export interface PropertyAmenity {
  name: string;
  icon?: string;
  category?: "general" | "room" | "bathroom" | "kitchen" | "entertainment" | "building";
}

export interface PropertyHighlight {
  title: string;
  description?: string;
  icon?: string;
}

export interface Property {
  _id: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string[];
  location?: string;
  address?: string;
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
  name: string;
  category?: TourCategory;
  shortDescription?: string;
  description?: string[];
  image?: string;
  gallery?: string[];
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
}

export type TourCard = Tour;

export type ReviewSource = "google" | "booking" | "tripadvisor" | "client" | "airbnb";

export interface Review {
  _id: string;
  author: string;
  content: string;
  rating: number;
  source?: ReviewSource;
  property?: { name: string; slug: string };
  date?: string;
  featured?: boolean;
}

export interface Attraction {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  category?: "dining" | "sightseeing" | "activity" | "shopping" | "nightlife" | "culture";
  distance?: string;
  website?: string;
}

export interface Restaurant {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  cuisineType?: string;
  mealType?: "breakfast" | "lunch" | "dinner";
  website?: string;
}

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
  slug?: string;
  name: string;
  category?: "compact" | "sedan" | "suv" | "luxury" | "van" | "convertible";
  image?: string;
  gallery?: string[];
  pricePerDay?: number;
  features?: string[];
  specs?: VehicleSpecs;
  available?: boolean;
  featured?: boolean;
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
