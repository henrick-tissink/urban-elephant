import type {
  Property,
  Tour,
  Review,
  Attraction,
  Restaurant,
  CarHireVehicle,
  SiteSettings,
} from "@/types";

const propertyGallery = (slug: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/images/properties/${slug}/${num}.jpg`;
  });

const amenities = (names: string[]) => names.map((name) => ({ name }));

export const siteSettings: SiteSettings = {
  siteName: "Urban Elephant",
  contact: {
    email: "karin@urbanelephant.co.za",
    phone: "+27 21 300 1044",
    whatsapp: "+27 72 618 8140",
    operationsHours: "Mon-Fri 9am-5pm",
    afterHoursPhone: "+27 72 618 8140",
  },
  address: {
    city: "Cape Town",
    country: "South Africa",
  },
  social: {
    instagram: "https://www.instagram.com/urbanelephantsa/",
    facebook: "https://www.facebook.com/urbanelephantsa/",
  },
  bookNowUrl: "https://book.nightsbridge.com/30034",
};

export const properties: Property[] = [
  {
    _id: "property-16-on-bree",
    slug: "16-on-bree",
    name: "16 On Bree",
    tagline:
      "16 On Bree stands as the pinnacle of luxury in Cape Town, boasting its title as the city's tallest residential and hotel building.",
    description: [
      "Set within one of Cape Town's most iconic skyscrapers, Urban Elephant at 16 On Bree offers sophisticated city living in the heart of the Mother City.",
      "Guests enjoy beautifully designed 4-star luxury apartments with stunning views, secure access and hotel-style comfort throughout their stay.",
      "Located moments from Cape Town's best restaurants, cafés, nightlife and business districts, 16 On Bree places the city at your doorstep while offering the comfort, privacy and consistency Urban Elephant is known for.",
      "Secure on-site parking available.",
    ],
    location: "Cape Town CBD, South Africa",
    heroImage: "/images/properties/16-on-bree/hero.jpg",
    gallery: propertyGallery("16-on-bree", 35),
    video: "/videos/properties/16-on-bree.mp4",
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Washing Machine",
      "Rooftop Bar",
      "Paid Secure Parking",
      "Free Fast Wifi",
      "Smart TV",
      "Nespresso Machine",
      "Baby Cots, Walkers & Car Seats",
      "Robes & Slippers",
      "Dishwasher",
      "Hairdryer",
      "Swimming Pool",
      "Self Catering Welcome Starter Pack",
    ]),
    bookingUrl: "https://booking.roomraccoon.co.za/urban-elephant-16-on-bree/en/",
    starRating: 5,
    featured: true,
    order: 1,
  },
  {
    _id: "property-the-rose",
    slug: "the-rose",
    name: "The Rose",
    tagline: "Meet The Rose — Urban Elephant's latest showstopper at 117 Strand Street, Cape Town.",
    description: [
      "Located in the charming neighbourhood of De Waterkant, Urban Elephant at The Rose combines modern luxury with one of Cape Town's most vibrant village atmospheres.",
      "Surrounded by cafés, restaurants, nightlife and cobblestone streets, The Rose offers beautifully designed 4-star apartments with the comfort and consistency of a professionally managed hotel stay.",
      "Stylish, central and full of character — a stay designed to feel uniquely Cape Town.",
    ],
    location: "117 Strand Street, Cape Town",
    address: "117 Strand Street, Cape Town, South Africa",
    heroImage: "/images/properties/the-rose/hero.jpg",
    gallery: propertyGallery("the-rose", 8),
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Free Fast Wifi",
      "Smart TV",
      "Nespresso Machine",
      "Baby Cots, Walkers & Car Seats",
      "Robes & Slippers",
      "Hairdryer",
      "Swimming Pool",
      "Self Catering Welcome Starter Pack",
    ]),
    bookingUrl: "https://booking.roomraccoon.co.za/urban-elephant-the-rose-flamingo/en/",
    starRating: 4,
    featured: true,
    order: 2,
  },
  {
    _id: "property-the-docklands",
    slug: "the-docklands",
    name: "The Docklands",
    tagline:
      "The Docklands: Your Urban Oasis. Positioned in the heart of the chic De Waterkant district, The Docklands stands as a beacon of modern luxury.",
    description: [
      "In the heart of De Waterkant — Cape Town's most fashionable village quarter — Urban Elephant at The Docklands offers 5-star apartment-hotel living with rooftop views from Table Mountain to the V&A Waterfront.",
      "Guests enjoy beautifully designed 5-star luxury apartments with secure access and hotel-style comfort throughout their stay, plus a rooftop pool deck where the city's skyline meets the harbour.",
      "Located moments from the V&A Waterfront, Bree Street's restaurants and the heart of Cape Town's business district, The Docklands places the city at your doorstep while offering the comfort, privacy and consistency Urban Elephant is known for.",
      "Secure on-site parking available.",
    ],
    location: "De Waterkant, Cape Town",
    heroImage: "/images/properties/the-docklands/hero.jpg",
    gallery: propertyGallery("the-docklands", 12),
    video: "/videos/properties/the-docklands.mp4",
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Washing Machine",
      "Secure Parking",
      "Free Fast Wifi",
      "Smart TV",
      "Nespresso Machine",
      "Baby Cots, Walkers & Car Seats",
      "Robes & Slippers",
      "Hairdryer",
      "Swimming Pool",
      "Self Catering Welcome Starter Pack",
    ]),
    bookingUrl: "https://book.nightsbridge.com/30034",
    starRating: 5,
    featured: true,
    order: 3,
  },
  {
    _id: "property-the-flamingo",
    slug: "the-flamingo",
    name: "The Flamingo",
    tagline: "Your 4 Star seaside escape with effortless elegance.",
    description: [
      "Urban Elephant at The Flamingo blends coastal calm with contemporary luxury in the heart of Sea Point.",
      "Designed for travellers who want more than just a place to sleep, these stylish 4-star apartments offer comfort, space and effortless access to Cape Town's famous promenade, cafés and beaches.",
      "Relaxed, secure and professionally managed — this is seaside living, the Urban Elephant way.",
    ],
    location: "Regent Road, Sea Point, Cape Town",
    heroImage: "/images/properties/the-flamingo/hero.jpg",
    gallery: propertyGallery("the-flamingo", 15),
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Free Fast Wifi",
      "Smart TV",
      "Nespresso Machine",
      "Baby Cots, Walkers & Car Seats",
      "Robes & Slippers",
      "Hairdryer",
      "Self Catering Welcome Starter Pack",
    ]),
    bookingUrl: "https://booking.roomraccoon.co.za/urban-elephant-the-rose-flamingo/en/",
    starRating: 4,
    featured: true,
    order: 4,
  },
];

export const tours: Tour[] = [
  {
    _id: "tour-aquila-safari",
    slug: "aquila-safari",
    name: "Aquila Big 5 Safari",
    category: "wildlife",
    image: "/images/tours/aquila-safari.jpg",
    price: 2500,
    featured: true,
    order: 1,
  },
  {
    _id: "tour-cape-point-penguins",
    slug: "cape-point-penguins",
    name: "Cape Point & Penguins",
    category: "sightseeing",
    image: "/images/tours/cape-point-penguins.jpg",
    price: 1200,
    featured: true,
    order: 2,
  },
  {
    _id: "tour-boulders-beach",
    slug: "boulders-beach",
    name: "Boulders Beach",
    category: "sightseeing",
    image: "/images/tours/boulders-beach.jpg",
    price: 1100,
    featured: true,
    order: 3,
  },
  {
    _id: "tour-winelands-tour",
    slug: "winelands-tour",
    name: "Winelands Tour",
    category: "wine-food",
    image: "/images/tours/winelands-tour.jpg",
    price: 1500,
    featured: true,
    order: 4,
  },
  {
    _id: "tour-shark-cage-diving",
    slug: "shark-cage-diving",
    name: "Shark Cage Diving",
    category: "adventure",
    image: "/images/tours/shark-cage-diving.jpg",
    price: 2200,
    featured: true,
    order: 5,
  },
  {
    _id: "tour-boat-cruises",
    slug: "boat-cruises",
    name: "Boat Cruises V&A Waterfront",
    category: "sightseeing",
    image: "/images/tours/boat-cruises.jpg",
    price: 600,
    featured: true,
    order: 6,
  },
  {
    _id: "tour-surf-lessons",
    slug: "surf-lessons",
    name: "Surf Lessons",
    category: "water-sports",
    image: "/images/tours/surf-lessons.jpg",
    price: 500,
    featured: true,
    order: 7,
  },
  {
    _id: "tour-kirstenbosch-gardens",
    slug: "kirstenbosch-gardens",
    name: "Kirstenbosch & Constantia Gardens",
    category: "sightseeing",
    image: "/images/tours/kirstenbosch-gardens.jpg",
    price: 400,
    featured: true,
    order: 8,
  },
  {
    _id: "tour-kayaking-adventures",
    slug: "kayaking-adventures",
    name: "Kayaking Adventures",
    category: "water-sports",
    image: "/images/tours/kayaking-adventures.png",
    price: 700,
    featured: true,
    order: 9,
  },
  {
    _id: "tour-harley-davidson-tours",
    slug: "harley-davidson-tours",
    name: "Harley-Davidson & Cadillac Tours",
    category: "adventure",
    image: "/images/tours/harley-davidson-tours.jpg",
    price: 3000,
    featured: true,
    order: 10,
  },
  {
    _id: "tour-full-day-chauffeur-service",
    slug: "full-day-chauffeur-service",
    name: "Full Day Chauffeur Service",
    category: "sightseeing",
    image: "/images/tours/full-day-chauffeur-service.png",
    price: 4500,
    featured: true,
    order: 11,
  },
  {
    _id: "tour-cooking-experience",
    slug: "cooking-experience",
    name: "Bo-Kaap Cooking Experience",
    category: "cultural",
    image: "/images/tours/cooking-experience.jpg",
    price: 1200,
    featured: true,
    order: 12,
  },
  {
    _id: "tour-bo-kaap-walking-tour",
    slug: "bo-kaap-walking-tour",
    name: "Bo-Kaap Walking Tour",
    category: "cultural",
    image: "/images/tours/bo-kaap-walking-tour.jpg",
    price: 350,
    featured: false,
    order: 13,
  },
  {
    _id: "tour-table-mountain-hike",
    slug: "table-mountain-hike",
    name: "Table Mountain Hike",
    category: "adventure",
    image: "/images/tours/table-mountain-hike.jpg",
    price: 800,
    featured: false,
    order: 14,
  },
];

export const reviews: Review[] = [
  {
    _id: "review-sarah-m",
    author: "Sarah M.",
    content:
      "Absolutely stunning property with breathtaking views of Table Mountain. The staff went above and beyond to make our stay special.",
    rating: 5,
    source: "google",
    featured: true,
  },
  {
    _id: "review-james-k",
    author: "James K.",
    content:
      "Perfect location in the heart of Cape Town. The apartment was immaculate and had everything we needed.",
    rating: 5,
    source: "booking",
    featured: true,
  },
  {
    _id: "review-emma-l",
    author: "Emma L.",
    content:
      "The rooftop pool is amazing! We loved watching the sunset over the city. Will definitely be back.",
    rating: 5,
    source: "airbnb",
    featured: true,
  },
];

export const attractions: Attraction[] = [
  {
    _id: "attraction-v-and-a-waterfront",
    slug: "v-and-a-waterfront",
    name: "V&A Waterfront",
    category: "sightseeing",
    image: "/images/attractions/v-and-a-waterfront.png",
    description:
      "Cape Town's working harbour and the most-visited destination in South Africa — shops, restaurants, and the original Robben Island ferry, all along the water.",
    hostNote:
      "Go at golden hour. Stay on the harbour wall for sunset.",
  },
  {
    _id: "attraction-table-mountain",
    slug: "table-mountain",
    name: "Table Mountain",
    category: "sightseeing",
    image: "/images/attractions/table-mountain.jpg",
    description:
      "A New 7 Wonder of Nature and the city's defining landmark — take the cableway up, or hike Platteklip if your knees can take it.",
    hostNote:
      "Catch the first cable car at 8am — beat the wind, beat the queue.",
  },
  {
    _id: "attraction-bo-kaap",
    slug: "bo-kaap",
    name: "Bo-Kaap",
    category: "culture",
    image: "/images/attractions/bo-kaap.jpg",
    description:
      "The colourful, cobble-stoned heart of Cape Malay culture — vibrant houses, warm hospitality and centuries of history a short walk from our CBD properties.",
    hostNote:
      "Sunday morning, after a coffee. Bring a camera; you'll need it.",
  },
];

export const restaurants: Restaurant[] = [
  {
    _id: "restaurant-villa-47",
    slug: "villa-47",
    name: "Villa 47",
    mealType: "breakfast",
    image: "/images/restaurants/villa-47.jpg",
    description:
      "Bree Street brunch institution — light-filled rooms, all-day breakfast, and one of the city's best coffee menus.",
    hostNote:
      "Order the breakfast platter. Sit on the rooftop if there's space.",
  },
  {
    _id: "restaurant-belthazar",
    slug: "belthazar",
    name: "Belthazar",
    mealType: "lunch",
    image: "/images/restaurants/belthazar.jpg",
    description:
      "Award-winning V&A Waterfront steakhouse and wine bar, with a 600-strong wine list and unobstructed harbour views.",
    hostNote:
      "The wine list runs 600 bottles deep — trust the sommelier.",
  },
  {
    _id: "restaurant-vixi-social-house",
    slug: "vixi-social-house",
    name: "Vixi Social House",
    mealType: "dinner",
    image: "/images/restaurants/vixi-social-house.jpg",
    description:
      "A modern social-dining concept in De Waterkant — creative small plates, craft cocktails, and a buzzing atmosphere most nights of the week.",
    hostNote:
      "Go for the small plates. Stay for the music.",
  },
];

/**
 * Founder's letter for the /recommendations page — first-person voice
 * from Niles, used as the editorial intro to the curator's selections.
 */
export const recommendationsLetter = {
  intro: [
    "Cape Town gives you more than somewhere to stay. The mountain, the harbour, the streets that change neighbourhood every two blocks. We've been here long enough to know where to send guests, and what to skip.",
    "This is our short list — three views every guest should see at least once, and three places we'd recommend to a friend for breakfast, lunch, and dinner. None of them pay us to be here.",
  ],
  signature: "— Niles",
  signatureRole: "Founder & Chief Elephant Wrangler",
};

export const carHireVehicles: CarHireVehicle[] = [];

export const investorBrochureUrl = "/documents/investor-brochure.pdf";

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getFeaturedReviews(): Review[] {
  return reviews.filter((r) => r.featured);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((t) => t.featured);
}
