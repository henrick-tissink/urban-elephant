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
  bookNowUrl: "https://book.nightsbridge.com/30034?nbid=1040",
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
      "Guests enjoy beautifully designed 4-star luxury apartments with stunning views, secure access and hotel comfort throughout their stay.",
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
    bookingUrl: "https://book.nightsbridge.com/30034?nbid=1040",
    starRating: 4,
    featured: true,
    order: 1,
    awards: [
      { provider: "booking.com", score: 9.0, year: 2026, pdf: "/awards/16-on-bree.pdf" },
    ],
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
    gallery: propertyGallery("the-rose", 7),
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
    bookingUrl: "https://book.nightsbridge.com/39237?nbid=1040",
    starRating: 4,
    featured: true,
    order: 2,
    awards: [
      { provider: "booking.com", score: 9.0, year: 2026, pdf: "/awards/the-rose.pdf" },
    ],
  },
  {
    _id: "property-the-docklands",
    slug: "the-docklands",
    name: "The Docklands",
    tagline:
      "The Docklands: Your Urban Oasis. Positioned in the heart of the chic De Waterkant district, The Docklands stands as a beacon of modern luxury.",
    description: [
      "In the heart of De Waterkant — Cape Town's most fashionable village quarter — Urban Elephant at The Docklands offers 4-star apartment-hotel living with rooftop views from Table Mountain to the V&A Waterfront.",
      "Guests enjoy beautifully designed 4-star luxury apartments with secure access and hotel comfort throughout their stay, plus a rooftop pool deck where the city's skyline meets the harbour.",
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
    bookingUrl: "https://book.nightsbridge.com/30034?nbid=1040",
    starRating: 4,
    featured: true,
    order: 3,
    awards: [
      { provider: "booking.com", score: 8.4, year: 2026, pdf: "/awards/the-docklands.pdf" },
    ],
  },
  {
    _id: "property-the-flamingo",
    slug: "the-flamingo",
    name: "Flamingo Express",
    tagline: "Your 4 Star seaside escape with effortless elegance.",
    description: [
      "Urban Elephant at Flamingo Express blends coastal calm with contemporary luxury in the heart of Sea Point.",
      "Designed for travellers who want more than just a place to sleep, these stylish 4-star apartments offer comfort, space and effortless access to Cape Town's famous promenade, cafés and beaches.",
      "Relaxed, secure and professionally managed — this is seaside living, the Urban Elephant way.",
    ],
    location: "Regent Road, Sea Point, Cape Town",
    heroImage: "/images/properties/the-flamingo/hero.jpg",
    gallery: propertyGallery("the-flamingo", 13),
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
    bookingUrl: "https://book.nightsbridge.com/39239?nbid=1040",
    starRating: 4,
    featured: true,
    order: 4,
    awards: [
      { provider: "booking.com", score: 8.4, year: 2026, pdf: "/awards/flamingo-express.pdf" },
    ],
  },
];

// Tour copy lifted from the live urbanelephant.co.za "Tours" page so the new
// site stops rendering empty detail pages. Prices and descriptions are Niles'
// existing words — adjusting them is brand-voice work, not engineering.
export const tours: Tour[] = [
  {
    _id: "tour-aquila-safari",
    slug: "aquila-safari",
    name: "Aquila Big 5 Safari",
    category: "wildlife",
    image: "/images/tours/aquila-safari.jpg",
    price: 2635,
    priceNote: "per person, full package",
    description: [
      "Discover Africa's iconic Big Five — lion, leopard, elephant, rhino, and buffalo — on a guided game drive at Aquila Private Game Reserve.",
      "Urban Elephant makes it easy for you to enjoy this authentic safari experience just a short drive from Cape Town. Transport can be arranged.",
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "tour-cape-point-penguins",
    slug: "cape-point-penguins",
    name: "Cape of Good Hope & Penguins",
    category: "sightseeing",
    image: "/images/tours/cape-point-penguins.jpg",
    price: 4500,
    priceNote: "from",
    description: [
      "Travel to the legendary Cape of Good Hope and explore the dramatic Cape Peninsula. From Chapman's Peak Drive to Cape Point Nature Reserve, Urban Elephant helps you experience one of South Africa's most scenic routes.",
      "The Boulders Beach penguin colony is included in this tour.",
    ],
    featured: true,
    order: 2,
  },
  {
    _id: "tour-boulders-beach",
    slug: "boulders-beach",
    name: "Boulders Beach",
    category: "sightseeing",
    image: "/images/tours/boulders-beach.jpg",
    price: 2500,
    priceNote: "from",
    description: [
      "Visit the world-famous colony of African penguins at Boulders Beach, where you can stroll boardwalks or relax on the sand. Urban Elephant organises this charming tour for families, couples, and nature lovers alike.",
      "Includes a luxury chauffeur-driven vehicle. Note: if you book the Cape of Good Hope tour, Boulders Beach is included in that itinerary.",
    ],
    featured: true,
    order: 3,
  },
  {
    _id: "tour-winelands-tour",
    slug: "winelands-tour",
    name: "Wine Tours with Wine Flies",
    category: "wine-food",
    image: "/images/tours/winelands-tour.jpg",
    price: 2280,
    priceNote: "per person, meal included",
    description: [
      "Urban Elephant has partnered with Wine Flies to offer curated Winelands experiences — from scheduled small-group tours to fully private, gourmet, and family-friendly itineraries.",
      "Each tour blends local expertise with authentic encounters, giving you a beautifully crafted taste of the Cape's most iconic wine regions. Private tours from R4500 for four people.",
    ],
    featured: true,
    order: 4,
  },
  {
    _id: "tour-shark-cage-diving",
    slug: "shark-cage-diving",
    name: "Shark Cage Diving",
    category: "adventure",
    image: "/images/tours/shark-cage-diving.jpg",
    price: 3595,
    priceNote: "per person",
    description: [
      "For the adventurous at heart, nothing compares to coming face-to-face with a great white shark.",
      "Urban Elephant arranges safe and exhilarating shark cage diving trips in Gansbaai, where expert guides guarantee an unforgettable experience.",
    ],
    featured: true,
    order: 5,
  },
  {
    _id: "tour-boat-cruises",
    slug: "boat-cruises",
    name: "Boat Cruises at the V&A Waterfront",
    category: "sightseeing",
    image: "/images/tours/boat-cruises.jpg",
    price: 370,
    priceNote: "per person",
    description: [
      "Urban Elephant is proud to partner with Waterfront Charters to offer a curated collection of ocean experiences.",
      "Choose from scenic coastal cruises, serene Prosecco mornings, iconic sunset champagne sails, or adventurous ocean safaris. Private charters are also available for romantic escapes, milestone celebrations and bespoke events — a truly unforgettable way to experience Cape Town from the water.",
    ],
    featured: true,
    order: 6,
  },
  {
    _id: "tour-surf-lessons",
    slug: "surf-lessons",
    name: "Surf Lessons in Muizenberg",
    category: "water-sports",
    image: "/images/tours/surf-lessons.jpg",
    price: 800,
    priceNote: "per person",
    description: [
      "Learn to surf at Muizenberg Beach, famous for its gentle waves and colourful huts.",
      "With skilled instructors to guide you, Urban Elephant ensures a fun and rewarding introduction to Cape Town's surfing culture.",
    ],
    featured: true,
    order: 7,
  },
  {
    _id: "tour-kirstenbosch-gardens",
    slug: "kirstenbosch-gardens",
    name: "Kirstenbosch Gardens & Constantia",
    category: "sightseeing",
    image: "/images/tours/kirstenbosch-gardens.jpg",
    price: 2500,
    priceNote: "from",
    description: [
      "Combine two highlights in one day by exploring Kirstenbosch Botanical Gardens and the Constantia Wine Valley.",
      "Urban Elephant curates this experience so you can enjoy South Africa's natural beauty and wine heritage together. Includes a luxury chauffeur-driven vehicle.",
    ],
    featured: true,
    order: 8,
  },
  {
    _id: "tour-kayaking-adventures",
    slug: "kayaking-adventures",
    name: "Kayaking with Urban Elephant",
    category: "water-sports",
    image: "/images/tours/kayaking-adventures.png",
    price: 600,
    priceNote: "from",
    description: [
      "Urban Elephant has partnered with some of the best kayak experiences around the peninsula.",
      "Paddle along Cape Town's Atlantic coastline in a small group with an experienced local guide, with the chance to spot dolphins, seals, penguins and other marine life, all while enjoying iconic views of Table Mountain and the bay. All equipment is provided, and the tour is suitable for both beginners and experienced paddlers.",
    ],
    featured: true,
    order: 9,
  },
  {
    _id: "tour-harley-davidson-tours",
    slug: "harley-davidson-tours",
    name: "Harley-Davidson & Cadillac Tour",
    category: "adventure",
    image: "/images/tours/harley-davidson-tours.jpg",
    price: 1400,
    priceNote: "per person",
    description: [
      "Experience Cape Town in true style with our bespoke Harley-Davidson and Cadillac tour.",
      "The journey begins in Camps Bay, cruising along the breathtaking Atlantic coastline towards Chapman's Peak Drive — one of the most scenic coastal roads in the world. Continue down to Hout Bay Beach, where ocean views and mountain backdrops meet in perfect harmony.",
      "Whether you're riding on the back of a Harley or relaxing in a classic Cadillac convertible, Urban Elephant delivers a luxury, tailor-made adventure designed for guests who appreciate elegance, freedom, and unforgettable moments.",
    ],
    featured: true,
    order: 10,
  },
  {
    _id: "tour-full-day-chauffeur-service",
    slug: "full-day-chauffeur-service",
    name: "Full-Day Chauffeur Service",
    category: "sightseeing",
    image: "/images/tours/full-day-chauffeur-service.png",
    price: 4500,
    priceNote: "from",
    description: [
      "Enjoy the freedom to explore Cape Town at your own pace with a private driver.",
      "Urban Elephant provides a full-day chauffeur service tailored to your itinerary, whether it's wine tasting, sightseeing, or hidden gems.",
    ],
    featured: true,
    order: 11,
  },
  {
    _id: "tour-cooking-experience",
    slug: "cooking-experience",
    name: "Faeeza's Bo-Kaap Cooking Experience",
    category: "cultural",
    image: "/images/tours/cooking-experience.jpg",
    price: 900,
    priceNote: "from",
    description: [
      "Step into the colourful heart of Cape Town's Bo-Kaap and discover the magic of home-cooked Cape Malay cuisine with the legendary Faeeza Abrahams.",
      "Born and raised in this historic neighbourhood, Faeeza welcomes guests into her family home for an unforgettable cooking experience filled with warmth, laughter, and mouthwatering aromas.",
      "What began as a simple family dinner turned into one of Cape Town's most sought-after culinary encounters — featured on Netflix and beloved by travellers from around the world.",
    ],
    featured: true,
    order: 12,
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
    _id: "restaurant-vixi-social-house",
    slug: "vixi-social-house",
    name: "Vixi Social House",
    mealType: "dinner",
    image: "/images/restaurants/vixi-social-house.jpg",
    description:
      "A modern social-dining concept in De Waterkant — creative small plates, craft cocktails, and a buzzing atmosphere most nights of the week.",
    hostNote:
      "Go for the small plates. Stay for the music.",
    perk: "Show your room key — free welcome drink with any meal.",
  },
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

export const enterpriseCarHireUrl = "";

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
