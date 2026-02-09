import { groq } from "next-sanity";

// ============================================
// Site Settings
// ============================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    logoFull,
    elephantIcon,
    contact,
    address,
    socialLinks,
    mainNavigation,
    footerNavigation,
    bookNowUrl,
    defaultSeo
  }
`;

// ============================================
// Properties
// ============================================

export const propertiesQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id,
    name,
    slug,
    tagline,
    location,
    heroImage,
    starRating,
    featured,
    order
  }
`;

export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    tagline,
    location,
    heroImage,
    starRating,
    highlights[0..2]
  }
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    tagline,
    description,
    location,
    address,
    coordinates,
    heroImage,
    gallery,
    video,
    amenities,
    highlights,
    nearbyAttractions[]-> {
      _id,
      name,
      description,
      image,
      category,
      distance
    },
    nightsBridgeUrl,
    starRating,
    seo
  }
`;

export const propertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)][].slug.current
`;

// ============================================
// Tours
// ============================================

export const toursQuery = groq`
  *[_type == "tour"] | order(order asc) {
    _id,
    name,
    slug,
    category,
    shortDescription,
    image,
    duration,
    price,
    priceNote,
    featured
  }
`;

export const toursByCategoryQuery = groq`
  *[_type == "tour" && category == $category] | order(order asc) {
    _id,
    name,
    slug,
    shortDescription,
    image,
    duration,
    price,
    priceNote
  }
`;

export const featuredToursQuery = groq`
  *[_type == "tour" && featured == true] | order(order asc)[0..5] {
    _id,
    name,
    slug,
    category,
    shortDescription,
    image,
    duration,
    price
  }
`;

export const tourBySlugQuery = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    description,
    shortDescription,
    image,
    gallery,
    duration,
    price,
    priceNote,
    highlights,
    includes,
    excludes,
    meetingPoint,
    groupSize,
    seo
  }
`;

export const tourSlugsQuery = groq`
  *[_type == "tour" && defined(slug.current)][].slug.current
`;

// ============================================
// Reviews
// ============================================

export const featuredReviewsQuery = groq`
  *[_type == "review" && featured == true] | order(order asc) {
    _id,
    author,
    content,
    rating,
    source,
    date,
    property-> {
      name,
      slug
    }
  }
`;

export const reviewsByPropertyQuery = groq`
  *[_type == "review" && property._ref == $propertyId] | order(date desc) {
    _id,
    author,
    content,
    rating,
    source,
    date
  }
`;

// ============================================
// Car Hire
// ============================================

export const carHireQuery = groq`
  *[_type == "carHireVehicle" && available == true] | order(order asc) {
    _id,
    name,
    slug,
    category,
    image,
    pricePerDay,
    features,
    specs,
    featured
  }
`;

export const carHireByCategoryQuery = groq`
  *[_type == "carHireVehicle" && category == $category && available == true] | order(order asc) {
    _id,
    name,
    slug,
    image,
    pricePerDay,
    features,
    specs
  }
`;

// ============================================
// Attractions
// ============================================

export const attractionsQuery = groq`
  *[_type == "attraction"] | order(name asc) {
    _id,
    name,
    description,
    image,
    category,
    distance
  }
`;

// ============================================
// Popups
// ============================================

export const activePopupQuery = groq`
  *[_type == "popup" && isActive == true &&
    (startDate == null || dateTime(startDate) <= dateTime(now())) &&
    (endDate == null || dateTime(endDate) >= dateTime(now()))
  ][0] {
    _id,
    heading,
    message,
    buttonText,
    buttonLink,
    image,
    dismissable,
    delay,
    showOnPages
  }
`;

// ============================================
// Pages
// ============================================

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    pageBuilder,
    seo
  }
`;

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`;
