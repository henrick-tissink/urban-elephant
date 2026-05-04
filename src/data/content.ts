import type {
  Property,
  Tour,
  Review,
  Attraction,
  Restaurant,
  CarHireVehicle,
  SiteSettings,
} from "@/types";

const propertyGallery = (slug: string, count: number, lastIsWebp = false): string[] =>
  Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const ext = lastIsWebp && i === count - 1 ? "webp" : "jpg";
    return `/images/properties/${slug}/${num}.${ext}`;
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
      "Designed with an eye for modern elegance, the building radiates contemporary charm. Every detail within each apartment has been meticulously considered to ensure they are both state-of-the-art and inviting. For an elevated relaxation experience, the pool deck on the 27th floor is a standout feature, offering unobstructed 360-degree views of the city. It's no wonder that it's a favourite chill spot for guests.",
      "We always aim to provide a stunning view, though we cannot guarantee it for every apartment. Most of our apartments offer breathtakingly panoramic views due to our impressive 36-floor height. Depending on your apartment's location within the building, you can marvel at inspiring vistas, including the iconic Table Mountain and the vibrant cityscape.",
      "On the opposite side, you can relish views of Signal Hill, complete with its midday firing canon, the renowned V&A Waterfront, and the expansive ocean stretching into the distance, creating a captivating sight. 16 on Bree possesses that undeniable \"Wow\" factor that leaves a lasting impression on your stay. Experiencing a sunrise or sunset from the 27th floor is an unparalleled delight.",
      "Its central location in a safe Cape Town neighbourhood further enhances its allure. To compliment the experience, free and secure parking is provided to all guests. There's truly no other establishment in central Cape Town that offers such a comprehensive experience as 16 On Bree.",
    ],
    location: "Cape Town CBD, South Africa",
    heroImage: "/images/properties/16-on-bree/hero.jpg",
    gallery: propertyGallery("16-on-bree", 27, true),
    video: "/videos/properties/16-on-bree.mp4",
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Washing Machine",
      "Rooftop Bar",
      "Free Secure Parking",
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
      "Stylish, bold, and effortlessly cool 4 Star Graded, The Rose blends modern design with that signature Urban Elephant flair. With 10 beautifully designed, fully furnished studio apartments, it's where elegance meets laid-back luxury. Every unit is kitted out for comfort, style, and convenience — whether you're here for business, leisure, or just a much-needed city break.",
      "The real head-turner? Our rooftop pool deck. It's the ultimate chill zone with panoramic views that'll have you reaching for your phone. From Table Mountain to Lion's Head, the colourful Bo-Kaap to the endless Atlantic, the 360 degree scenery is seriously next level. Sunrise coffee or sunset views? Yes, please.",
      "Thanks to the building's corner location, most apartments deliver iconic Cape Town views. Whether you're watching the midday cannon fire from Signal Hill, soaking in the harbour buzz of the V&A Waterfront, or just letting the city's energy wash over you, it's all at your doorstep.",
      "The Rose sits in one of the city's most vibrant pockets — where Bo-Kaap's history meets De Waterkant's flair. Bree Street's restaurants, cafes and nightlife are a few steps away, and the Waterfront is just down the road. You couldn't be better placed to experience Cape Town like a local (but better).",
      "We've also taken care of the details: smart tech, stylish touches, and all the little luxuries that make a stay feel like home — only better. This isn't just another apartment. It's a destination. It's your city pad with hotel perks.",
    ],
    location: "117 Strand Street, Cape Town",
    address: "117 Strand Street, Cape Town, South Africa",
    heroImage: "/images/properties/the-rose/hero.jpg",
    gallery: propertyGallery("the-rose", 5),
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
      "Boasting architectural brilliance, this building merges sophistication with a touch of contemporary elegance, providing an unmatched ambience for both leisure and business travellers.",
      "One of the crowning jewels of The Docklands experience is our rooftop pool, which serves as a mesmerising vantage point for the city's panoramas. From here, guests can bask in breathtaking views stretching from the iconic Table Mountain to the renowned V&A Waterfront. It's not just a pool — it's an elevated haven where the city's horizon mingles with the sky, offering an awe-inspiring backdrop that continually captivates our guests.",
      "Inside, each apartment epitomises modernity, crafted with thoughtful design elements and tailored to offer the utmost in comfort. Whether you're seeking an invigorating vacation or a serene business trip, The Docklands promises an experience that resonates with luxury and convenience.",
      "Venturing out? The city's vast network of transport options ensures seamless exploration of Cape Town's treasures. Yet, after a day of adventures or meetings, many find solace atop our rooftop. Here, built-in Gas Braais await, offering a unique culinary experience. Imagine grilling to perfection as the sun sets, casting a golden hue over Table Mountain — it's the kind of memory-making The Docklands is renowned for.",
    ],
    location: "De Waterkant, Cape Town",
    heroImage: "/images/properties/the-docklands/hero.jpg",
    gallery: propertyGallery("the-docklands", 8),
    video: "/videos/properties/the-docklands.mp4",
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Washing Machine",
      "Free Secure Parking",
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
      "Bold, breezy, and perfectly positioned on Sea Point's buzzing Regent Road, The Flamingo is where Urban Elephant brings its signature flair to the Atlantic Seaboard.",
      "With 10 4 Star chic studio & one bed apartments, this coastal retreat blends a prime location with refined comfort. Each unit features simple, elegant design with luxury touches — ideal for working professionals, leisure travelers, or anyone seeking a stylish base near the sea.",
      "Wake up to fresh ocean air, explore the neighborhood's vibrant offerings, and return to a space that feels like home — only better. Thanks to its corner location, most apartments offer sweeping views — from Signal Hill and the Sea Point Promenade to the Atlantic horizon.",
      "Step out and you're in the heart of one of Cape Town's most dynamic neighborhoods. From artisanal bakeries and juice bars to boutique shopping and oceanfront cafes, you're moments from it all. The Promenade is just steps away for your morning jog or sunset walk, Clifton and Camps Bay beaches are nearby, and Regent Road's nightlife brings everything from craft cocktails to live music and late-night bites.",
      "No fuss, no noise — just elevated living in a prime coastal setting. At The Flamingo, you'll enjoy the independence of an apartment with the thoughtful service Urban Elephant is known for. This isn't just a stay — it's a lifestyle.",
    ],
    location: "Regent Road, Sea Point, Cape Town",
    heroImage: "/images/properties/the-flamingo/hero.jpg",
    gallery: propertyGallery("the-flamingo", 8),
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
      "Cape Town's iconic working harbour and the most-visited destination in South Africa, with shops, restaurants and entertainment along the water.",
  },
  {
    _id: "attraction-table-mountain",
    slug: "table-mountain",
    name: "Table Mountain",
    category: "sightseeing",
    image: "/images/attractions/table-mountain.jpg",
    description:
      "A New 7 Wonder of Nature and the city's defining landmark — take the cableway up or hike one of the trails for unbeatable views.",
  },
  {
    _id: "attraction-bo-kaap",
    slug: "bo-kaap",
    name: "Bo-Kaap",
    category: "culture",
    image: "/images/attractions/bo-kaap.jpg",
    description:
      "The colourful, cobble-stoned heart of Cape Malay culture — vibrant houses, warm hospitality and centuries of history a short walk from the CBD.",
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
  },
  {
    _id: "restaurant-belthazar",
    slug: "belthazar",
    name: "Belthazar",
    mealType: "lunch",
    image: "/images/restaurants/belthazar.jpg",
    description:
      "Award-winning V&A Waterfront steakhouse and wine bar, with a 600-strong wine list and harbour views.",
  },
  {
    _id: "restaurant-vixi-social-house",
    slug: "vixi-social-house",
    name: "Vixi Social House",
    mealType: "dinner",
    image: "/images/restaurants/vixi-social-house.jpg",
    description:
      "A modern social-dining concept in De Waterkant — creative small plates, craft cocktails, and a buzzing atmosphere.",
  },
];

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
