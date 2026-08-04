import type {
  Property,
  Tour,
  Review,
  Attraction,
  Restaurant,
  SiteSettings,
} from "@/types";

const propertyGallery = (slug: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/images/properties/${slug}/${num}.jpg`;
  });

const AMENITY_I18N: Record<string, { af: string; de: string; fr: string; da: string }> = {
  "Daily Housekeeping": {
    af: "Daaglikse Huishouding",
    de: "Tägliche Reinigung",
    fr: "Ménage quotidien",
    da: "Daglig rengøring",
  },
  Airconditioning: {
    af: "Lugversorging",
    de: "Klimaanlage",
    fr: "Climatisation",
    da: "Aircondition",
  },
  "24 Hour Concierge & Security": {
    af: "24-uur Concierge & Sekuriteit",
    de: "24-Stunden-Concierge & Sicherheit",
    fr: "Conciergerie et sécurité 24h/24",
    da: "Concierge og sikkerhed døgnet rundt",
  },
  "Washing Machine": {
    af: "Wasmasjien",
    de: "Waschmaschine",
    fr: "Machine à laver",
    da: "Vaskemaskine",
  },
  "Rooftop Bar": {
    af: "Dakkroeg",
    de: "Dachterrassen-Bar",
    fr: "Bar sur le toit",
    da: "Tagbar",
  },
  "Paid Secure Parking": {
    af: "Betaalde Veilige Parkering",
    de: "Kostenpflichtiges sicheres Parken",
    fr: "Parking sécurisé payant",
    da: "Betalt sikker parkering",
  },
  "Free Fast Wifi": {
    af: "Gratis Vinnige Wifi",
    de: "Kostenloses schnelles WiFi",
    fr: "WiFi rapide gratuit",
    da: "Gratis hurtig WiFi",
  },
  "Smart TV": {
    af: "Smart TV",
    de: "Smart-TV",
    fr: "Smart TV",
    da: "Smart-TV",
  },
  "Nespresso Machine": {
    af: "Nespresso-masjien",
    de: "Nespresso-Maschine",
    fr: "Machine Nespresso",
    da: "Nespresso-maskine",
  },
  "Baby Cots, Walkers & Car Seats": {
    af: "Babakatels, Stapringe & Motorsitplekke",
    de: "Babybetten, Lauflernhilfen & Autositze",
    fr: "Lits bébé, trotteurs et sièges auto",
    da: "Babysenge, gåstativer og autostole",
  },
  "Robes & Slippers": {
    af: "Kamerjasse & Pantoffels",
    de: "Bademäntel & Hausschuhe",
    fr: "Peignoirs et chaussons",
    da: "Badekåber og hjemmesko",
  },
  Dishwasher: {
    af: "Skottelgoedwasser",
    de: "Geschirrspüler",
    fr: "Lave-vaisselle",
    da: "Opvaskemaskine",
  },
  Hairdryer: {
    af: "Haardroër",
    de: "Haartrockner",
    fr: "Sèche-cheveux",
    da: "Hårtørrer",
  },
  "Swimming Pool": {
    af: "Swembad",
    de: "Swimmingpool",
    fr: "Piscine",
    da: "Swimmingpool",
  },
  "Self Catering Welcome Starter Pack": {
    af: "Self-sorg Verwelkomingsbeginpakkie",
    de: "Selbstversorger-Willkommenspaket",
    fr: "Pack de bienvenue pour séjour en autonomie",
    da: "Velkomstpakke til selvhushold",
  },
  "Secure Parking": {
    af: "Veilige Parkering",
    de: "Sicheres Parken",
    fr: "Parking sécurisé",
    da: "Sikker parkering",
  },
};

const amenities = (names: string[]) =>
  names.map((name) => ({ name: { en: name, ...(AMENITY_I18N[name] ?? {}) } }));

export const siteSettings: SiteSettings = {
  siteName: "Urban Elephant Hotel and Tours",
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
    shortLocation: "Cape Town CBD",
    name: "16 On Bree",
    tagline: {
      en: "16 On Bree stands as the pinnacle of luxury in Cape Town, boasting its title as the city's tallest residential and hotel building.",
      af: "16 On Bree staan as die toppunt van luuksheid in Kaapstad, met die titel as die stad se hoogste woon- en hotelgebou.",
      de: "16 On Bree gilt als der Inbegriff von Luxus in Kapstadt und trägt den Titel des höchsten Wohn- und Hotelgebäudes der Stadt.",
      fr: "16 On Bree incarne le summum du luxe au Cap, fort de son titre de plus haut bâtiment résidentiel et hôtelier de la ville.",
      da: "16 On Bree er indbegrebet af luksus i Cape Town og bærer titlen som byens højeste bolig- og hotelbygning.",
    },
    description: {
      en: [
        "Set within one of Cape Town's most iconic skyscrapers, Urban Elephant at 16 On Bree offers sophisticated city living in the heart of the Mother City.",
        "Guests enjoy beautifully designed 4-star luxury apartments with stunning views, secure access and hotel comfort throughout their stay.",
        "Located moments from Cape Town's best restaurants, cafés, nightlife and business districts, 16 On Bree places the city at your doorstep while offering the comfort, privacy and consistency Urban Elephant is known for.",
        "Secure on-site parking available.",
      ],
      af: [
        "Geleë in een van Kaapstad se mees ikoniese wolkekrabbers, bied Urban Elephant by 16 On Bree gesofistikeerde stadslewe in die hart van die Moederstad.",
        "Gaste geniet pragtig ontwerpte 4-ster luukse woonstelle met asemrowende uitsigte, veilige toegang en hotelgemak dwarsdeur hul verblyf.",
        "Net oomblikke van Kaapstad se beste restaurante, kafees, naglewe en sakebuurte, plaas 16 On Bree die stad op jou voorstoep terwyl dit die gemak, privaatheid en konsekwentheid bied waarvoor Urban Elephant bekend is.",
        "Veilige parkering op die perseel beskikbaar.",
      ],
      de: [
        "In einem der ikonischsten Wolkenkratzer Kapstadts gelegen, bietet Urban Elephant im 16 On Bree anspruchsvolles Stadtleben im Herzen der Mother City.",
        "Gäste genießen wunderschön gestaltete 4-Sterne-Luxusapartments mit atemberaubendem Ausblick, sicherem Zugang und Hotelkomfort während ihres gesamten Aufenthalts.",
        "Nur wenige Augenblicke von Kapstadts besten Restaurants, Cafés, Nachtleben und Geschäftsvierteln entfernt, legt 16 On Bree Ihnen die Stadt zu Füßen und bietet zugleich den Komfort, die Privatsphäre und die Beständigkeit, für die Urban Elephant bekannt ist.",
        "Sicheres Parken vor Ort verfügbar.",
      ],
      fr: [
        "Niché dans l'un des gratte-ciel les plus emblématiques du Cap, Urban Elephant au 16 On Bree offre un art de vivre urbain raffiné au cœur de la Mother City.",
        "Les hôtes profitent d'appartements de luxe 4 étoiles magnifiquement conçus, offrant des vues splendides, un accès sécurisé et le confort d'un hôtel tout au long de leur séjour.",
        "À quelques instants des meilleurs restaurants, cafés, lieux nocturnes et quartiers d'affaires du Cap, 16 On Bree met la ville à votre porte tout en offrant le confort, l'intimité et la constance qui font la réputation d'Urban Elephant.",
        "Parking sécurisé disponible sur place.",
      ],
      da: [
        "Beliggende i en af Cape Towns mest ikoniske skyskrabere tilbyder Urban Elephant på 16 On Bree sofistikeret byliv i hjertet af Mother City.",
        "Gæster nyder smukt indrettede 4-stjernede luksuslejligheder med fantastisk udsigt, sikker adgang og hotelkomfort under hele opholdet.",
        "Beliggende blot få øjeblikke fra Cape Towns bedste restauranter, caféer, natteliv og forretningskvarterer lægger 16 On Bree byen for dine fødder og tilbyder samtidig den komfort, det privatliv og den konsekvens, som Urban Elephant er kendt for.",
        "Sikker parkering på stedet tilgængelig.",
      ],
    },
    location: {
      en: "Cape Town CBD, South Africa",
      af: "Kaapstad SSK, Suid-Afrika",
      de: "Kapstadt CBD, Südafrika",
      fr: "Cap, quartier central des affaires, Afrique du Sud",
      da: "Cape Town CBD, Sydafrika",
    },
    address: "16 Bree Street, Cape Town City Centre, 8000, South Africa",
    postalAddress: {
      street: "16 Bree Street",
      locality: "Cape Town City Centre",
      postalCode: "8000",
      country: "ZA",
    },
    geo: { latitude: -33.91771, longitude: 18.42152 },
    priceRange: { min: 1500, max: 5500, currency: "ZAR" },
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
    shortLocation: "Cape Town CBD",
    name: "The Rose",
    tagline: {
      en: "Meet The Rose — Urban Elephant's latest showstopper at 117 Strand Street, Cape Town.",
      af: "Ontmoet The Rose — Urban Elephant se nuutste blikvanger by 117 Strand Street, Kaapstad.",
      de: "Lernen Sie The Rose kennen — Urban Elephants neuestes Glanzstück in der 117 Strand Street, Kapstadt.",
      fr: "Découvrez The Rose — la dernière merveille d'Urban Elephant au 117 Strand Street, Le Cap.",
      da: "Mød The Rose — Urban Elephants nyeste pragtstykke på 117 Strand Street, Cape Town.",
    },
    description: {
      en: [
        "Located in the charming neighbourhood of De Waterkant, Urban Elephant at The Rose combines modern luxury with one of Cape Town's most vibrant village atmospheres.",
        "Surrounded by cafés, restaurants, nightlife and cobblestone streets, The Rose offers beautifully designed 4-star apartments with the comfort and consistency of a professionally managed hotel stay.",
        "Stylish, central and full of character — a stay designed to feel uniquely Cape Town.",
      ],
      af: [
        "Geleë in die bekoorlike buurt van De Waterkant, kombineer Urban Elephant by The Rose moderne luuksheid met een van Kaapstad se lewendigste dorpsatmosfere.",
        "Omring deur kafees, restaurante, naglewe en kasseisteenstrate, bied The Rose pragtig ontwerpte 4-ster woonstelle met die gemak en konsekwentheid van 'n professioneel bestuurde hotelverblyf.",
        "Stylvol, sentraal en vol karakter — 'n verblyf wat ontwerp is om uniek Kaapstads te voel.",
      ],
      de: [
        "Im charmanten Viertel De Waterkant gelegen, verbindet Urban Elephant im The Rose modernen Luxus mit einer der lebendigsten Dorfatmosphären Kapstadts.",
        "Umgeben von Cafés, Restaurants, Nachtleben und Kopfsteinpflasterstraßen bietet The Rose wunderschön gestaltete 4-Sterne-Apartments mit dem Komfort und der Beständigkeit eines professionell geführten Hotelaufenthalts.",
        "Stilvoll, zentral und voller Charakter — ein Aufenthalt, der sich einzigartig nach Kapstadt anfühlt.",
      ],
      fr: [
        "Situé dans le charmant quartier de De Waterkant, Urban Elephant au The Rose allie luxe moderne et l'une des ambiances de village les plus animées du Cap.",
        "Entouré de cafés, de restaurants, de lieux nocturnes et de rues pavées, The Rose propose des appartements 4 étoiles magnifiquement conçus, avec le confort et la constance d'un séjour hôtelier géré par des professionnels.",
        "Élégant, central et plein de caractère — un séjour conçu pour respirer l'esprit unique du Cap.",
      ],
      da: [
        "Beliggende i det charmerende kvarter De Waterkant kombinerer Urban Elephant på The Rose moderne luksus med en af Cape Towns mest livlige landsbystemninger.",
        "Omgivet af caféer, restauranter, natteliv og brostensbelagte gader tilbyder The Rose smukt indrettede 4-stjernede lejligheder med komforten og konsekvensen ved et professionelt drevet hotelophold.",
        "Stilfuldt, centralt og fuld af karakter — et ophold designet til at føles helt unikt for Cape Town.",
      ],
    },
    location: {
      en: "117 Strand Street, Cape Town",
      af: "117 Strand Street, Kaapstad",
      de: "117 Strand Street, Kapstadt",
      fr: "117 Strand Street, Le Cap",
      da: "117 Strand Street, Cape Town",
    },
    address: "117 Strand Street, De Waterkant, Cape Town, 8000, South Africa",
    postalAddress: {
      street: "117 Strand Street",
      locality: "De Waterkant, Cape Town",
      postalCode: "8000",
      country: "ZA",
    },
    geo: { latitude: -33.9188, longitude: 18.4209 },
    priceRange: { min: 2000, currency: "ZAR" },
    heroImage: "/images/properties/the-rose/hero.jpg",
    gallery: propertyGallery("the-rose", 7),
    amenities: amenities([
      "Daily Housekeeping",
      "Airconditioning",
      "24 Hour Concierge & Security",
      "Paid Secure Parking",
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
    shortLocation: "De Waterkant",
    name: "The Docklands",
    tagline: {
      en: "The Docklands: Your Urban Oasis. Positioned in the heart of the chic De Waterkant district, The Docklands stands as a beacon of modern luxury.",
      af: "The Docklands: Jou stedelike oase. Geleë in die hart van die elegante De Waterkant-distrik, staan The Docklands as 'n baken van moderne luuksheid.",
      de: "The Docklands: Ihre urbane Oase. Im Herzen des schicken Viertels De Waterkant gelegen, ist The Docklands ein Leuchtturm modernen Luxus.",
      fr: "The Docklands : votre oasis urbaine. Situé au cœur du chic quartier de De Waterkant, The Docklands se dresse comme un phare du luxe moderne.",
      da: "The Docklands: Din urbane oase. Placeret i hjertet af det chikke De Waterkant-kvarter står The Docklands som et fyrtårn for moderne luksus.",
    },
    description: {
      en: [
        "In the heart of De Waterkant — Cape Town's most fashionable village quarter — Urban Elephant at The Docklands offers 4-star apartment-hotel living with rooftop views from Table Mountain to the V&A Waterfront.",
        "Guests enjoy beautifully designed 4-star luxury apartments with secure access and hotel comfort throughout their stay, plus a rooftop pool deck where the city's skyline meets the harbour.",
        "Located moments from the V&A Waterfront, Bree Street's restaurants and the heart of Cape Town's business district, The Docklands places the city at your doorstep while offering the comfort, privacy and consistency Urban Elephant is known for.",
        "Secure on-site parking available.",
      ],
      af: [
        "In die hart van De Waterkant — Kaapstad se mees modieuse dorpswyk — bied Urban Elephant by The Docklands 4-ster woonstelhotel-lewe met dakuitsigte van Tafelberg tot by die V&A Waterfront.",
        "Gaste geniet pragtig ontwerpte 4-ster luukse woonstelle met veilige toegang en hotelgemak dwarsdeur hul verblyf, plus 'n dakswembaddek waar die stad se silhoeët die hawe ontmoet.",
        "Net oomblikke van die V&A Waterfront, Bree Street se restaurante en die hart van Kaapstad se sakedistrik, plaas The Docklands die stad op jou voorstoep terwyl dit die gemak, privaatheid en konsekwentheid bied waarvoor Urban Elephant bekend is.",
        "Veilige parkering op die perseel beskikbaar.",
      ],
      de: [
        "Im Herzen von De Waterkant — Kapstadts modischstem Dorfviertel — bietet Urban Elephant im The Docklands 4-Sterne-Apartmenthotel-Wohnen mit Dachterrassenblick vom Tafelberg bis zur V&A Waterfront.",
        "Gäste genießen wunderschön gestaltete 4-Sterne-Luxusapartments mit sicherem Zugang und Hotelkomfort während ihres gesamten Aufenthalts sowie ein Pooldeck auf dem Dach, wo die Skyline der Stadt auf den Hafen trifft.",
        "Nur wenige Augenblicke von der V&A Waterfront, den Restaurants der Bree Street und dem Herzen von Kapstadts Geschäftsviertel entfernt, legt The Docklands Ihnen die Stadt zu Füßen und bietet zugleich den Komfort, die Privatsphäre und die Beständigkeit, für die Urban Elephant bekannt ist.",
        "Sicheres Parken vor Ort verfügbar.",
      ],
      fr: [
        "Au cœur de De Waterkant — le quartier village le plus tendance du Cap — Urban Elephant au The Docklands propose un art de vivre en appart-hôtel 4 étoiles avec des vues depuis le toit, de la Montagne de la Table au V&A Waterfront.",
        "Les hôtes profitent d'appartements de luxe 4 étoiles magnifiquement conçus, avec un accès sécurisé et le confort d'un hôtel tout au long de leur séjour, ainsi qu'une terrasse-piscine sur le toit où la silhouette de la ville rejoint le port.",
        "À quelques instants du V&A Waterfront, des restaurants de Bree Street et du cœur du quartier d'affaires du Cap, The Docklands met la ville à votre porte tout en offrant le confort, l'intimité et la constance qui font la réputation d'Urban Elephant.",
        "Parking sécurisé disponible sur place.",
      ],
      da: [
        "I hjertet af De Waterkant — Cape Towns mest moderne landsbykvarter — tilbyder Urban Elephant på The Docklands 4-stjernet apartment-hotelliv med tagudsigt fra Taffelbjerget til V&A Waterfront.",
        "Gæster nyder smukt indrettede 4-stjernede luksuslejligheder med sikker adgang og hotelkomfort under hele opholdet samt et pooldæk på taget, hvor byens skyline møder havnen.",
        "Beliggende blot få øjeblikke fra V&A Waterfront, Bree Streets restauranter og hjertet af Cape Towns forretningskvarter lægger The Docklands byen for dine fødder og tilbyder samtidig den komfort, det privatliv og den konsekvens, som Urban Elephant er kendt for.",
        "Sikker parkering på stedet tilgængelig.",
      ],
    },
    location: {
      en: "De Waterkant, Cape Town",
      af: "De Waterkant, Kaapstad",
      de: "De Waterkant, Kapstadt",
      fr: "De Waterkant, Le Cap",
      da: "De Waterkant, Cape Town",
    },
    address: "70 Prestwich Street, De Waterkant, Cape Town, 8005, South Africa",
    postalAddress: {
      street: "70 Prestwich Street",
      locality: "De Waterkant, Cape Town",
      postalCode: "8005",
      country: "ZA",
    },
    geo: { latitude: -33.91283, longitude: 18.41836 },
    priceRange: { min: 1750, currency: "ZAR" },
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
    shortLocation: "Sea Point",
    name: "Flamingo Express",
    tagline: {
      en: "Your 4 Star seaside escape with effortless elegance.",
      af: "Jou 4-ster seekant-ontvlugting met moeitelose elegansie.",
      de: "Ihre 4-Sterne-Auszeit am Meer mit müheloser Eleganz.",
      fr: "Votre escapade balnéaire 4 étoiles à l'élégance naturelle.",
      da: "Din 4-stjernede flugt ved havet med ubesværet elegance.",
    },
    description: {
      en: [
        "Urban Elephant at Flamingo Express blends coastal calm with contemporary luxury in the heart of Sea Point.",
        "Designed for travellers who want more than just a place to sleep, these stylish 4-star apartments offer comfort, space and effortless access to Cape Town's famous promenade, cafés and beaches.",
        "Relaxed, secure and professionally managed — this is seaside living, the Urban Elephant way.",
      ],
      af: [
        "Urban Elephant by Flamingo Express vermeng die kalmte van die kus met eietydse luuksheid in die hart van Sea Point.",
        "Ontwerp vir reisigers wat meer as net 'n plek om te slaap wil hê, bied hierdie stylvolle 4-ster woonstelle gemak, ruimte en moeitelose toegang tot Kaapstad se beroemde promenade, kafees en strande.",
        "Ontspanne, veilig en professioneel bestuur — dit is seekant-lewe, op die Urban Elephant manier.",
      ],
      de: [
        "Urban Elephant im Flamingo Express verbindet die Ruhe der Küste mit zeitgemäßem Luxus im Herzen von Sea Point.",
        "Konzipiert für Reisende, die mehr als nur einen Schlafplatz suchen, bieten diese stilvollen 4-Sterne-Apartments Komfort, Raum und mühelosen Zugang zu Kapstadts berühmter Promenade, Cafés und Stränden.",
        "Entspannt, sicher und professionell geführt — das ist Leben am Meer auf die Art von Urban Elephant.",
      ],
      fr: [
        "Urban Elephant au Flamingo Express mêle le calme du littoral au luxe contemporain au cœur de Sea Point.",
        "Conçus pour les voyageurs qui veulent plus qu'un simple endroit où dormir, ces élégants appartements 4 étoiles offrent confort, espace et un accès sans effort à la célèbre promenade, aux cafés et aux plages du Cap.",
        "Détendu, sécurisé et géré par des professionnels — c'est l'art de vivre en bord de mer, à la manière d'Urban Elephant.",
      ],
      da: [
        "Urban Elephant på Flamingo Express forener kystens ro med moderne luksus i hjertet af Sea Point.",
        "Designet til rejsende, der vil have mere end blot et sted at sove, tilbyder disse stilfulde 4-stjernede lejligheder komfort, plads og ubesværet adgang til Cape Towns berømte promenade, caféer og strande.",
        "Afslappet, sikkert og professionelt drevet — dette er kystliv på Urban Elephants måde.",
      ],
    },
    location: {
      en: "Regent Road, Sea Point, Cape Town",
      af: "Regent Road, Sea Point, Kaapstad",
      de: "Regent Road, Sea Point, Kapstadt",
      fr: "Regent Road, Sea Point, Le Cap",
      da: "Regent Road, Sea Point, Cape Town",
    },
    address: "6 Regent Road, Sea Point, Cape Town, 8000, South Africa",
    postalAddress: {
      street: "6 Regent Road",
      locality: "Sea Point, Cape Town",
      postalCode: "8000",
      country: "ZA",
    },
    geo: { latitude: -33.9129, longitude: 18.3854 },
    priceRange: { min: 1250, max: 1500, currency: "ZAR" },
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
    name: {
      en: "Aquila Big 5 Safari",
      af: "Aquila Groot 5 Safari",
      de: "Aquila Big-5-Safari",
      fr: "Safari Big 5 à Aquila",
      da: "Aquila Big 5-safari",
    },
    category: "wildlife",
    image: "/images/tours/aquila-safari.jpg",
    price: 2635,
    priceNote: {
      en: "per person, full package",
      af: "per persoon, volle pakket",
      de: "pro Person, Komplettpaket",
      fr: "par personne, forfait complet",
      da: "pr. person, fuld pakke",
    },
    description: {
      en: [
        "Discover Africa's iconic Big Five — lion, leopard, elephant, rhino, and buffalo — on a guided game drive at Aquila Private Game Reserve.",
        "Urban Elephant makes it easy for you to enjoy this authentic safari experience just a short drive from Cape Town. Transport can be arranged.",
      ],
      af: [
        "Ontdek Afrika se ikoniese Groot Vyf — leeu, luiperd, olifant, renoster en buffel — op 'n geleide wildrit by Aquila Private Game Reserve.",
        "Urban Elephant maak dit maklik vir jou om hierdie egte safari-ervaring net 'n kort rit van Kaapstad af te geniet. Vervoer kan gereël word.",
      ],
      de: [
        "Entdecken Sie Afrikas ikonische Big Five — Löwe, Leopard, Elefant, Nashorn und Büffel — auf einer geführten Pirschfahrt im Aquila Private Game Reserve.",
        "Urban Elephant macht es Ihnen leicht, dieses authentische Safari-Erlebnis nur eine kurze Fahrt von Kapstadt entfernt zu genießen. Transfer kann arrangiert werden.",
      ],
      fr: [
        "Découvrez les emblématiques Big 5 d'Afrique — lion, léopard, éléphant, rhinocéros et buffle — lors d'un safari guidé à la réserve privée d'Aquila.",
        "Urban Elephant vous permet de profiter facilement de cette expérience de safari authentique, à seulement quelques minutes de route du Cap. Le transport peut être organisé.",
      ],
      da: [
        "Oplev Afrikas ikoniske Big Five — løve, leopard, elefant, næsehorn og bøffel — på en guidet safaritur i Aquila Private Game Reserve.",
        "Urban Elephant gør det nemt for dig at nyde denne autentiske safarioplevelse blot en kort køretur fra Cape Town. Transport kan arrangeres.",
      ],
    },
    featured: true,
    order: 1,
  },
  {
    _id: "tour-cape-point-penguins",
    slug: "cape-point-penguins",
    name: {
      en: "Cape of Good Hope & Penguins",
      af: "Kaap die Goeie Hoop & Pikkewyne",
      de: "Kap der Guten Hoffnung & Pinguine",
      fr: "Cap de Bonne-Espérance et pingouins",
      da: "Kap det Gode Håb og pingviner",
    },
    category: "sightseeing",
    image: "/images/tours/cape-point-penguins.jpg",
    price: 4500,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Travel to the legendary Cape of Good Hope and explore the dramatic Cape Peninsula. From Chapman's Peak Drive to Cape Point Nature Reserve, Urban Elephant helps you experience one of South Africa's most scenic routes.",
        "The Boulders Beach penguin colony is included in this tour.",
      ],
      af: [
        "Reis na die legendariese Kaap die Goeie Hoop en verken die dramatiese Kaapse Skiereiland. Van Chapman's Peak Drive tot Cape Point Natuurreservaat help Urban Elephant jou om een van Suid-Afrika se mees skilderagtige roetes te beleef.",
        "Die Boulders Beach pikkewynkolonie is by hierdie toer ingesluit.",
      ],
      de: [
        "Reisen Sie zum legendären Kap der Guten Hoffnung und erkunden Sie die dramatische Kap-Halbinsel. Vom Chapman's Peak Drive bis zum Cape Point Nature Reserve hilft Ihnen Urban Elephant, eine der landschaftlich schönsten Routen Südafrikas zu erleben.",
        "Die Pinguinkolonie am Boulders Beach ist in dieser Tour enthalten.",
      ],
      fr: [
        "Partez vers le légendaire cap de Bonne-Espérance et explorez la spectaculaire péninsule du Cap. De Chapman's Peak Drive à la réserve naturelle de Cape Point, Urban Elephant vous fait découvrir l'une des routes les plus panoramiques d'Afrique du Sud.",
        "La colonie de pingouins de Boulders Beach est incluse dans cette excursion.",
      ],
      da: [
        "Rejs til det legendariske Kap det Gode Håb og udforsk den dramatiske Kap-halvøen. Fra Chapman's Peak Drive til Cape Point Nature Reserve hjælper Urban Elephant dig med at opleve en af Sydafrikas mest naturskønne ruter.",
        "Pingvinkolonien ved Boulders Beach er inkluderet i denne tur.",
      ],
    },
    featured: true,
    order: 2,
  },
  {
    _id: "tour-boulders-beach",
    slug: "boulders-beach",
    name: {
      en: "Boulders Beach",
      af: "Boulders Beach",
      de: "Boulders Beach",
      fr: "Boulders Beach",
      da: "Boulders Beach",
    },
    category: "sightseeing",
    image: "/images/tours/boulders-beach.jpg",
    price: 2500,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Visit the world-famous colony of African penguins at Boulders Beach, where you can stroll boardwalks or relax on the sand. Urban Elephant organises this charming tour for families, couples, and nature lovers alike.",
        "Includes a luxury chauffeur-driven vehicle. Note: if you book the Cape of Good Hope tour, Boulders Beach is included in that itinerary.",
      ],
      af: [
        "Besoek die wêreldbekende kolonie Afrika-pikkewyne by Boulders Beach, waar jy op die houtloopplanke kan stap of op die sand kan ontspan. Urban Elephant reël hierdie bekoorlike toer vir gesinne, paartjies en natuurliefhebbers gelyk.",
        "Sluit 'n luukse voertuig met 'n chauffeur in. Let wel: as jy die Kaap die Goeie Hoop-toer bespreek, is Boulders Beach by daardie reisplan ingesluit.",
      ],
      de: [
        "Besuchen Sie die weltberühmte Kolonie afrikanischer Pinguine am Boulders Beach, wo Sie auf Holzstegen spazieren oder im Sand entspannen können. Urban Elephant organisiert diese charmante Tour für Familien, Paare und Naturliebhaber gleichermaßen.",
        "Inklusive luxuriösem Fahrzeug mit Chauffeur. Hinweis: Wenn Sie die Tour zum Kap der Guten Hoffnung buchen, ist Boulders Beach in dieser Route enthalten.",
      ],
      fr: [
        "Visitez la colonie de pingouins africains mondialement connue de Boulders Beach, où vous pourrez flâner sur les passerelles ou vous détendre sur le sable. Urban Elephant organise cette charmante excursion pour les familles, les couples et les amoureux de la nature.",
        "Comprend un véhicule de luxe avec chauffeur. Remarque : si vous réservez l'excursion au cap de Bonne-Espérance, Boulders Beach est inclus dans cet itinéraire.",
      ],
      da: [
        "Besøg den verdensberømte koloni af afrikanske pingviner ved Boulders Beach, hvor du kan spadsere på træbroerne eller slappe af i sandet. Urban Elephant arrangerer denne charmerende tur for familier, par og naturelskere.",
        "Inkluderer et luksuskøretøj med chauffør. Bemærk: hvis du booker turen til Kap det Gode Håb, er Boulders Beach inkluderet i den rute.",
      ],
    },
    featured: true,
    order: 3,
  },
  {
    _id: "tour-winelands-tour",
    slug: "winelands-tour",
    name: {
      en: "Wine Tours with Wine Flies",
      af: "Wyntoere met Wine Flies",
      de: "Weintouren mit Wine Flies",
      fr: "Circuits œnologiques avec Wine Flies",
      da: "Vinture med Wine Flies",
    },
    category: "wine-food",
    image: "/images/tours/winelands-tour.jpg",
    price: 2280,
    priceNote: {
      en: "per person, meal included",
      af: "per persoon, ete ingesluit",
      de: "pro Person, Mahlzeit inklusive",
      fr: "par personne, repas inclus",
      da: "pr. person, måltid inkluderet",
    },
    description: {
      en: [
        "Urban Elephant has partnered with Wine Flies to offer curated Winelands experiences — from scheduled small-group tours to fully private, gourmet, and family-friendly itineraries.",
        "Each tour blends local expertise with authentic encounters, giving you a beautifully crafted taste of the Cape's most iconic wine regions. Private tours from R4500 for four people.",
      ],
      af: [
        "Urban Elephant het met Wine Flies saamgespan om gekureerde Wynland-ervarings aan te bied — van geskeduleerde kleingroeptoere tot heeltemal privaat, gourmet- en gesinsvriendelike reisplanne.",
        "Elke toer vermeng plaaslike kundigheid met egte ontmoetings en gee jou 'n pragtig saamgestelde smaak van die Kaap se mees ikoniese wynstreke. Privaat toere vanaf R4500 vir vier mense.",
      ],
      de: [
        "Urban Elephant hat sich mit Wine Flies zusammengetan, um kuratierte Winelands-Erlebnisse anzubieten — von geplanten Kleingruppentouren bis hin zu vollständig privaten, gourmetorientierten und familienfreundlichen Reiserouten.",
        "Jede Tour verbindet lokale Expertise mit authentischen Begegnungen und bietet Ihnen einen wunderbar komponierten Vorgeschmack auf die ikonischsten Weinregionen des Kaps. Private Touren ab R4500 für vier Personen.",
      ],
      fr: [
        "Urban Elephant s'est associé à Wine Flies pour proposer des expériences œnologiques sur mesure dans les Winelands — des circuits programmés en petit groupe aux itinéraires entièrement privés, gourmands et adaptés aux familles.",
        "Chaque circuit mêle expertise locale et rencontres authentiques, vous offrant un avant-goût finement composé des régions viticoles les plus emblématiques du Cap. Circuits privés à partir de R4500 pour quatre personnes.",
      ],
      da: [
        "Urban Elephant har indgået et samarbejde med Wine Flies om at tilbyde kuraterede Winelands-oplevelser — fra planlagte ture i små grupper til helt private, gourmet- og familievenlige rejseruter.",
        "Hver tur forener lokal ekspertise med autentiske møder og giver dig en smukt sammensat smagsprøve på Kaplandets mest ikoniske vinregioner. Private ture fra R4500 for fire personer.",
      ],
    },
    featured: true,
    order: 4,
  },
  {
    _id: "tour-shark-cage-diving",
    slug: "shark-cage-diving",
    name: {
      en: "Shark Cage Diving",
      af: "Haaikou-duik",
      de: "Haikäfigtauchen",
      fr: "Plongée en cage avec les requins",
      da: "Hajbursdykning",
    },
    category: "adventure",
    image: "/images/tours/shark-cage-diving.jpg",
    price: 3595,
    priceNote: {
      en: "per person",
      af: "per persoon",
      de: "pro Person",
      fr: "par personne",
      da: "pr. person",
    },
    description: {
      en: [
        "For the adventurous at heart, nothing compares to coming face-to-face with a great white shark.",
        "Urban Elephant arranges safe and exhilarating shark cage diving trips in Gansbaai, where expert guides guarantee an unforgettable experience.",
      ],
      af: [
        "Vir die avontuurlustiges is daar niks wat vergelyk met 'n oog-tot-oog ontmoeting met 'n wit haai nie.",
        "Urban Elephant reël veilige en opwindende haaikou-duiktogte in Gansbaai, waar kundige gidse 'n onvergeetlike ervaring waarborg.",
      ],
      de: [
        "Für Abenteuerlustige gibt es nichts Vergleichbares, als einem Weißen Hai von Angesicht zu Angesicht zu begegnen.",
        "Urban Elephant organisiert sichere und aufregende Haikäfigtauchgänge in Gansbaai, wo erfahrene Guides ein unvergessliches Erlebnis garantieren.",
      ],
      fr: [
        "Pour les âmes aventureuses, rien ne se compare à un face-à-face avec un grand requin blanc.",
        "Urban Elephant organise des sorties de plongée en cage avec les requins, sûres et palpitantes, à Gansbaai, où des guides experts garantissent une expérience inoubliable.",
      ],
      da: [
        "For de eventyrlystne er der intet, der kan måle sig med at komme ansigt til ansigt med en stor hvid haj.",
        "Urban Elephant arrangerer sikre og pirrende hajbursdykningsture i Gansbaai, hvor eksperter som guider garanterer en uforglemmelig oplevelse.",
      ],
    },
    featured: true,
    order: 5,
  },
  {
    _id: "tour-boat-cruises",
    slug: "boat-cruises",
    name: {
      en: "Boat Cruises at the V&A Waterfront",
      af: "Boottogte by die V&A Waterfront",
      de: "Bootsfahrten an der V&A Waterfront",
      fr: "Croisières en bateau au V&A Waterfront",
      da: "Bådture ved V&A Waterfront",
    },
    category: "sightseeing",
    image: "/images/tours/boat-cruises.jpg",
    price: 370,
    priceNote: {
      en: "per person",
      af: "per persoon",
      de: "pro Person",
      fr: "par personne",
      da: "pr. person",
    },
    description: {
      en: [
        "Urban Elephant is proud to partner with Waterfront Charters to offer a curated collection of ocean experiences.",
        "Choose from scenic coastal cruises, serene Prosecco mornings, iconic sunset champagne sails, or adventurous ocean safaris. Private charters are also available for romantic escapes, milestone celebrations and bespoke events — a truly unforgettable way to experience Cape Town from the water.",
      ],
      af: [
        "Urban Elephant is trots om met Waterfront Charters saam te span om 'n gekureerde versameling see-ervarings aan te bied.",
        "Kies uit skilderagtige kustogte, rustige Prosecco-oggende, ikoniese sonsondergang-sjampanjetogte, of avontuurlike seesafari's. Privaat charters is ook beskikbaar vir romantiese ontvlugtings, mylpaalvierings en pasgemaakte geleenthede — 'n werklik onvergeetlike manier om Kaapstad van die water af te beleef.",
      ],
      de: [
        "Urban Elephant ist stolz darauf, mit Waterfront Charters zusammenzuarbeiten, um eine kuratierte Auswahl an Ozeanerlebnissen anzubieten.",
        "Wählen Sie zwischen malerischen Küstenfahrten, ruhigen Prosecco-Vormittagen, ikonischen Champagner-Sonnenuntergangsfahrten oder abenteuerlichen Ozeansafaris. Private Charter sind ebenfalls für romantische Auszeiten, besondere Feiern und maßgeschneiderte Veranstaltungen verfügbar — eine wahrhaft unvergessliche Art, Kapstadt vom Wasser aus zu erleben.",
      ],
      fr: [
        "Urban Elephant est fier de s'associer à Waterfront Charters pour proposer une collection sélectionnée d'expériences en mer.",
        "Choisissez parmi des croisières côtières panoramiques, des matinées sereines au prosecco, d'emblématiques sorties au champagne au coucher du soleil ou d'aventureux safaris océaniques. Des affrètements privés sont également disponibles pour des escapades romantiques, des célébrations marquantes et des événements sur mesure — une façon véritablement inoubliable de découvrir Le Cap depuis l'eau.",
      ],
      da: [
        "Urban Elephant er stolt af at samarbejde med Waterfront Charters om at tilbyde en kurateret samling af oplevelser på havet.",
        "Vælg mellem naturskønne kystture, rolige prosecco-formiddage, ikoniske champagnesejladser ved solnedgang eller eventyrlige havsafarier. Private charterture er også tilgængelige til romantiske udflugter, mærkedage og skræddersyede arrangementer — en virkelig uforglemmelig måde at opleve Cape Town fra vandet.",
      ],
    },
    featured: true,
    order: 6,
  },
  {
    _id: "tour-surf-lessons",
    slug: "surf-lessons",
    name: {
      en: "Surf Lessons in Muizenberg",
      af: "Branderry-lesse in Muizenberg",
      de: "Surfstunden in Muizenberg",
      fr: "Cours de surf à Muizenberg",
      da: "Surfundervisning i Muizenberg",
    },
    category: "water-sports",
    image: "/images/tours/surf-lessons.jpg",
    price: 800,
    priceNote: {
      en: "per person",
      af: "per persoon",
      de: "pro Person",
      fr: "par personne",
      da: "pr. person",
    },
    description: {
      en: [
        "Learn to surf at Muizenberg Beach, famous for its gentle waves and colourful huts.",
        "With skilled instructors to guide you, Urban Elephant ensures a fun and rewarding introduction to Cape Town's surfing culture.",
      ],
      af: [
        "Leer branderry by Muizenberg Beach, bekend vir sy sagte branders en kleurvolle strandhuisies.",
        "Met bekwame instrukteurs aan jou sy verseker Urban Elephant 'n pret en lonende kennismaking met Kaapstad se branderrykultuur.",
      ],
      de: [
        "Lernen Sie das Surfen am Muizenberg Beach, der für seine sanften Wellen und bunten Strandhütten bekannt ist.",
        "Mit erfahrenen Lehrern an Ihrer Seite sorgt Urban Elephant für eine unterhaltsame und lohnende Einführung in die Surfkultur Kapstadts.",
      ],
      fr: [
        "Apprenez à surfer à Muizenberg Beach, réputée pour ses vagues douces et ses cabanes colorées.",
        "Avec des moniteurs qualifiés pour vous guider, Urban Elephant vous garantit une initiation amusante et enrichissante à la culture du surf du Cap.",
      ],
      da: [
        "Lær at surfe på Muizenberg Beach, berømt for sine blide bølger og farverige badehuse.",
        "Med dygtige instruktører som guider sikrer Urban Elephant en sjov og givende introduktion til Cape Towns surfkultur.",
      ],
    },
    featured: true,
    order: 7,
  },
  {
    _id: "tour-kirstenbosch-gardens",
    slug: "kirstenbosch-gardens",
    name: {
      en: "Kirstenbosch Gardens & Constantia",
      af: "Kirstenbosch-tuine & Constantia",
      de: "Kirstenbosch-Gärten & Constantia",
      fr: "Jardins de Kirstenbosch et Constantia",
      da: "Kirstenbosch-haverne og Constantia",
    },
    category: "sightseeing",
    image: "/images/tours/kirstenbosch-gardens.jpg",
    price: 2500,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Combine two highlights in one day by exploring Kirstenbosch Botanical Gardens and the Constantia Wine Valley.",
        "Urban Elephant curates this experience so you can enjoy South Africa's natural beauty and wine heritage together. Includes a luxury chauffeur-driven vehicle.",
      ],
      af: [
        "Kombineer twee hoogtepunte in een dag deur die Kirstenbosch Botaniese Tuine en die Constantia-wynvallei te verken.",
        "Urban Elephant stel hierdie ervaring saam sodat jy Suid-Afrika se natuurskoon en wynerfenis saam kan geniet. Sluit 'n luukse voertuig met 'n chauffeur in.",
      ],
      de: [
        "Verbinden Sie zwei Höhepunkte an einem Tag und erkunden Sie die botanischen Gärten von Kirstenbosch und das Weintal von Constantia.",
        "Urban Elephant stellt dieses Erlebnis zusammen, damit Sie Südafrikas natürliche Schönheit und Weinerbe gemeinsam genießen können. Inklusive luxuriösem Fahrzeug mit Chauffeur.",
      ],
      fr: [
        "Réunissez deux temps forts en une journée en explorant les jardins botaniques de Kirstenbosch et la vallée viticole de Constantia.",
        "Urban Elephant compose cette expérience pour que vous puissiez savourer ensemble la beauté naturelle et l'héritage viticole de l'Afrique du Sud. Comprend un véhicule de luxe avec chauffeur.",
      ],
      da: [
        "Kombinér to højdepunkter på én dag ved at udforske Kirstenbosch Botaniske Have og Constantia-vindalen.",
        "Urban Elephant sammensætter denne oplevelse, så du kan nyde Sydafrikas naturskønhed og vinarv på én gang. Inkluderer et luksuskøretøj med chauffør.",
      ],
    },
    featured: true,
    order: 8,
  },
  {
    _id: "tour-kayaking-adventures",
    slug: "kayaking-adventures",
    name: {
      en: "Kayaking with Urban Elephant",
      af: "Kajakvaart met Urban Elephant",
      de: "Kajakfahren mit Urban Elephant",
      fr: "Kayak avec Urban Elephant",
      da: "Kajak med Urban Elephant",
    },
    category: "water-sports",
    image: "/images/tours/kayaking-adventures.png",
    price: 600,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Urban Elephant has partnered with some of the best kayak experiences around the peninsula.",
        "Paddle along Cape Town's Atlantic coastline in a small group with an experienced local guide, with the chance to spot dolphins, seals, penguins and other marine life, all while enjoying iconic views of Table Mountain and the bay. All equipment is provided, and the tour is suitable for both beginners and experienced paddlers.",
      ],
      af: [
        "Urban Elephant het saamgespan met van die beste kajak-ervarings rondom die skiereiland.",
        "Peddel langs Kaapstad se Atlantiese kuslyn in 'n klein groep saam met 'n ervare plaaslike gids, met die kans om dolfyne, robbe, pikkewyne en ander seelewe te sien, alles terwyl jy ikoniese uitsigte oor Tafelberg en die baai geniet. Alle toerusting word voorsien, en die toer is geskik vir beide beginners en ervare peddelaars.",
      ],
      de: [
        "Urban Elephant hat sich mit einigen der besten Kajakerlebnisse rund um die Halbinsel zusammengetan.",
        "Paddeln Sie in einer kleinen Gruppe mit einem erfahrenen einheimischen Guide entlang der Atlantikküste Kapstadts, mit der Chance, Delfine, Robben, Pinguine und andere Meeresbewohner zu entdecken, während Sie ikonische Ausblicke auf den Tafelberg und die Bucht genießen. Die gesamte Ausrüstung wird gestellt, und die Tour ist sowohl für Anfänger als auch für erfahrene Paddler geeignet.",
      ],
      fr: [
        "Urban Elephant s'est associé à certaines des meilleures expériences de kayak autour de la péninsule.",
        "Pagayez le long du littoral atlantique du Cap en petit groupe avec un guide local expérimenté, avec la possibilité d'apercevoir dauphins, phoques, pingouins et autre faune marine, tout en profitant de vues emblématiques sur la Montagne de la Table et la baie. Tout l'équipement est fourni, et l'excursion convient aussi bien aux débutants qu'aux pagayeurs expérimentés.",
      ],
      da: [
        "Urban Elephant har indgået samarbejde med nogle af de bedste kajakoplevelser rundt om halvøen.",
        "Padl langs Cape Towns Atlanterhavskyst i en lille gruppe med en erfaren lokal guide, med chancen for at se delfiner, sæler, pingviner og andet havliv, alt imens du nyder ikonisk udsigt til Taffelbjerget og bugten. Alt udstyr stilles til rådighed, og turen er egnet til både begyndere og erfarne padlere.",
      ],
    },
    featured: true,
    order: 9,
  },
  {
    _id: "tour-harley-davidson-tours",
    slug: "harley-davidson-tours",
    name: {
      en: "Harley-Davidson & Cadillac Tour",
      af: "Harley-Davidson- & Cadillac-toer",
      de: "Harley-Davidson- & Cadillac-Tour",
      fr: "Circuit Harley-Davidson et Cadillac",
      da: "Harley-Davidson- og Cadillac-tur",
    },
    category: "adventure",
    image: "/images/tours/harley-davidson-tours.jpg",
    price: 1400,
    priceNote: {
      en: "per person",
      af: "per persoon",
      de: "pro Person",
      fr: "par personne",
      da: "pr. person",
    },
    description: {
      en: [
        "Experience Cape Town in true style with our bespoke Harley-Davidson and Cadillac tour.",
        "The journey begins in Camps Bay, cruising along the breathtaking Atlantic coastline towards Chapman's Peak Drive — one of the most scenic coastal roads in the world. Continue down to Hout Bay Beach, where ocean views and mountain backdrops meet in perfect harmony.",
        "Whether you're riding on the back of a Harley or relaxing in a classic Cadillac convertible, Urban Elephant delivers a luxury, tailor-made adventure designed for guests who appreciate elegance, freedom, and unforgettable moments.",
      ],
      af: [
        "Beleef Kaapstad met ware styl op ons pasgemaakte Harley-Davidson- en Cadillac-toer.",
        "Die reis begin in Camps Bay en kuier langs die asemrowende Atlantiese kuslyn na Chapman's Peak Drive — een van die mees skilderagtige kuspaaie ter wêreld. Gaan voort af na Hout Bay Beach, waar see-uitsigte en bergagtergronde in perfekte harmonie ontmoet.",
        "Of jy nou agterop 'n Harley ry of in 'n klassieke Cadillac-kabriolet ontspan, Urban Elephant lewer 'n luukse, pasgemaakte avontuur ontwerp vir gaste wat elegansie, vryheid en onvergeetlike oomblikke waardeer.",
      ],
      de: [
        "Erleben Sie Kapstadt mit wahrem Stil bei unserer maßgeschneiderten Harley-Davidson- und Cadillac-Tour.",
        "Die Reise beginnt in Camps Bay und führt entlang der atemberaubenden Atlantikküste zum Chapman's Peak Drive — einer der landschaftlich reizvollsten Küstenstraßen der Welt. Weiter geht es hinunter zum Hout Bay Beach, wo Meerblick und Bergkulissen in perfekter Harmonie aufeinandertreffen.",
        "Ob Sie auf dem Rücksitz einer Harley fahren oder in einem klassischen Cadillac-Cabrio entspannen — Urban Elephant bietet ein luxuriöses, maßgeschneidertes Abenteuer für Gäste, die Eleganz, Freiheit und unvergessliche Momente schätzen.",
      ],
      fr: [
        "Découvrez Le Cap avec un style inégalé lors de notre circuit sur mesure en Harley-Davidson et Cadillac.",
        "Le voyage débute à Camps Bay, longeant le littoral atlantique à couper le souffle vers Chapman's Peak Drive — l'une des routes côtières les plus panoramiques du monde. Poursuivez jusqu'à Hout Bay Beach, où vues sur l'océan et toiles de fond montagneuses se rejoignent en parfaite harmonie.",
        "Que vous soyez à l'arrière d'une Harley ou détendu dans un cabriolet Cadillac classique, Urban Elephant propose une aventure de luxe sur mesure, conçue pour les hôtes qui apprécient l'élégance, la liberté et les moments inoubliables.",
      ],
      da: [
        "Oplev Cape Town med ægte stil på vores skræddersyede Harley-Davidson- og Cadillac-tur.",
        "Rejsen begynder i Camps Bay og kører langs den betagende Atlanterhavskyst mod Chapman's Peak Drive — en af verdens mest naturskønne kystveje. Fortsæt ned til Hout Bay Beach, hvor havudsigt og bjergkulisser mødes i perfekt harmoni.",
        "Uanset om du sidder bag på en Harley eller slapper af i en klassisk Cadillac-cabriolet, leverer Urban Elephant et luksuriøst, skræddersyet eventyr designet til gæster, der værdsætter elegance, frihed og uforglemmelige øjeblikke.",
      ],
    },
    featured: true,
    order: 10,
  },
  {
    _id: "tour-full-day-chauffeur-service",
    slug: "full-day-chauffeur-service",
    name: {
      en: "Full-Day Chauffeur Service",
      af: "Volledige Dag Chauffeurdiens",
      de: "Ganztägiger Chauffeurservice",
      fr: "Service de chauffeur à la journée",
      da: "Chaufførservice for en hel dag",
    },
    category: "sightseeing",
    image: "/images/tours/full-day-chauffeur-service.png",
    price: 4500,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Enjoy the freedom to explore Cape Town at your own pace with a private driver.",
        "Urban Elephant provides a full-day chauffeur service tailored to your itinerary, whether it's wine tasting, sightseeing, or hidden gems.",
      ],
      af: [
        "Geniet die vryheid om Kaapstad op jou eie tempo te verken met 'n privaat bestuurder.",
        "Urban Elephant bied 'n volledige dag chauffeurdiens wat by jou reisplan aangepas is, of dit nou wynproe, besigtiging of versteekte juwele is.",
      ],
      de: [
        "Genießen Sie die Freiheit, Kapstadt mit einem privaten Fahrer in Ihrem eigenen Tempo zu erkunden.",
        "Urban Elephant bietet einen ganztägigen Chauffeurservice, der auf Ihre Reiseroute zugeschnitten ist — ob Weinprobe, Sightseeing oder versteckte Schätze.",
      ],
      fr: [
        "Profitez de la liberté d'explorer Le Cap à votre rythme avec un chauffeur privé.",
        "Urban Elephant propose un service de chauffeur à la journée adapté à votre itinéraire, qu'il s'agisse de dégustation de vins, de visites touristiques ou de trésors cachés.",
      ],
      da: [
        "Nyd friheden til at udforske Cape Town i dit eget tempo med en privat chauffør.",
        "Urban Elephant tilbyder en chaufførservice for en hel dag, der er skræddersyet til din rejserute, uanset om det er vinsmagning, sightseeing eller skjulte perler.",
      ],
    },
    featured: true,
    order: 11,
  },
  {
    _id: "tour-cooking-experience",
    slug: "cooking-experience",
    name: {
      en: "Faeeza's Bo-Kaap Cooking Experience",
      af: "Faeeza se Bo-Kaap Kookervaring",
      de: "Faeezas Kocherlebnis im Bo-Kaap",
      fr: "L'expérience culinaire de Faeeza à Bo-Kaap",
      da: "Faeezas madlavningsoplevelse i Bo-Kaap",
    },
    category: "cultural",
    image: "/images/tours/cooking-experience.jpg",
    price: 900,
    priceNote: {
      en: "from",
      af: "vanaf",
      de: "ab",
      fr: "à partir de",
      da: "fra",
    },
    description: {
      en: [
        "Step into the colourful heart of Cape Town's Bo-Kaap and discover the magic of home-cooked Cape Malay cuisine with the legendary Faeeza Abrahams.",
        "Born and raised in this historic neighbourhood, Faeeza welcomes guests into her family home for an unforgettable cooking experience filled with warmth, laughter, and mouthwatering aromas.",
        "What began as a simple family dinner turned into one of Cape Town's most sought-after culinary encounters — featured on Netflix and beloved by travellers from around the world.",
      ],
      af: [
        "Betree die kleurvolle hart van Kaapstad se Bo-Kaap en ontdek die towerkrag van tuisgekookte Kaaps-Maleise kookkuns met die legendariese Faeeza Abrahams.",
        "Gebore en getoë in hierdie historiese buurt, verwelkom Faeeza gaste in haar familiehuis vir 'n onvergeetlike kookervaring vol warmte, gelag en heerlike geure.",
        "Wat as 'n eenvoudige familie-ete begin het, het een van Kaapstad se mees gesogte kulinêre ontmoetings geword — vertoon op Netflix en geliefd by reisigers van regoor die wêreld.",
      ],
      de: [
        "Tauchen Sie ein in das bunte Herz von Kapstadts Bo-Kaap und entdecken Sie den Zauber hausgemachter kapmalaiischer Küche mit der legendären Faeeza Abrahams.",
        "In diesem historischen Viertel geboren und aufgewachsen, empfängt Faeeza ihre Gäste in ihrem Familienheim zu einem unvergesslichen Kocherlebnis voller Wärme, Lachen und köstlicher Aromen.",
        "Was als einfaches Familienessen begann, wurde zu einer der begehrtesten kulinarischen Begegnungen Kapstadts — auf Netflix gezeigt und von Reisenden aus aller Welt geliebt.",
      ],
      fr: [
        "Plongez au cœur coloré du Bo-Kaap du Cap et découvrez la magie de la cuisine cap-malaise faite maison avec la légendaire Faeeza Abrahams.",
        "Née et élevée dans ce quartier historique, Faeeza accueille ses hôtes dans sa maison familiale pour une expérience culinaire inoubliable, pleine de chaleur, de rires et d'arômes alléchants.",
        "Ce qui a commencé comme un simple dîner de famille est devenu l'une des rencontres culinaires les plus prisées du Cap — diffusée sur Netflix et adorée par les voyageurs du monde entier.",
      ],
      da: [
        "Træd ind i det farverige hjerte af Cape Towns Bo-Kaap og oplev magien ved hjemmelavet cape malay-køkken med den legendariske Faeeza Abrahams.",
        "Født og opvokset i dette historiske kvarter byder Faeeza gæster velkommen i sit familiehjem til en uforglemmelig madlavningsoplevelse fyldt med varme, latter og lækre dufte.",
        "Det, der begyndte som en simpel familiemiddag, blev til et af Cape Towns mest eftertragtede kulinariske møder — vist på Netflix og elsket af rejsende fra hele verden.",
      ],
    },
    featured: true,
    order: 12,
  },
];

export const reviews: Review[] = [
  {
    _id: "review-audreym26-16-on-bree",
    author: "AudreyM26",
    authorLocation: "France",
    content:
      "The location is very convenient, close to the waterfront and the apartment matches the description. The welcome by the staff (Laz) was very good, very informative and caring. We recommend this establishment.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "16 On Bree", slug: "16-on-bree" },
    featured: true,
  },
  {
    _id: "review-maryem-16-on-bree",
    author: "Maryem",
    authorLocation: "Germany",
    content:
      "Wonderful apartment with a stunning view. Very well located in the heart of the city center, with everything at a walkable distance from you! The view is stunning and the room is clean and has all what you would need and more! The security of the building is very good and the overall experience was fantastic!",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "16 On Bree", slug: "16-on-bree" },
    featured: true,
  },
  {
    _id: "review-iris-16-on-bree",
    author: "Iris",
    authorLocation: "United States",
    content:
      "Perfection in all aspects. Very grateful for a wonderful experience.",
    rating: 5,
    source: "expedia",
    sourceScore: 10,
    property: { name: "16 On Bree", slug: "16-on-bree" },
    featured: true,
  },
  {
    _id: "review-ashutosh-the-rose",
    author: "Ashutosh",
    authorLocation: "India",
    content:
      "The host, Yam, was amazing and accommodating. I loved my stay at The Urban Elephant, The Rose.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Rose", slug: "the-rose" },
    featured: true,
  },
  {
    _id: "review-tan-the-rose",
    author: "Tan",
    authorLocation: "Singapore",
    content:
      "Definitely will stay there again when I come to Cape Town again. Fantastic location with a fantastic view of Table Mountain, Lion Heads and Signal Hill. Very clean, spacious and well maintained room with full facilities for cooking if needed. Security is also good with a guard on the ground floor and entry is only by photo image at the lift. Yam and Kenny are fast with respond to any questions and solved your issue immediately. Will definitely stay there again on my next visit.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Rose", slug: "the-rose" },
    featured: true,
  },
  {
    _id: "review-raymond-the-rose",
    author: "Raymond",
    authorLocation: "Tanzania",
    content:
      "What I really liked about Urban Elephant was the perfect balance between luxury and comfort. The apartment was modern, spotless, and beautifully furnished with amazing views of Cape Town and Table Mountain. The location was excellent — close to the V&A Waterfront, restaurants, cafés, and nightlife, yet still peaceful and secure. The staff were friendly and responsive, and the whole place felt safe, stylish, and ideal for both relaxing and working remotely. Small details like strong WiFi, comfortable beds, rooftop pool, Netflix, and a fully equipped kitchen made the stay even better. I'd definitely stay there again.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Rose", slug: "the-rose" },
    featured: true,
  },
  {
    _id: "review-gabrielle-docklands",
    author: "Gabrielle",
    authorLocation: "United States",
    content:
      "Fantastic apartment, wonderful hosts, extra amenities. The property was clean, a nice size, had a washer and dryer, and a beautiful patio. They provided extras such as coffee pods, tea, sugar, a bit of milk, and cold water in the refrigerator. There was dish soap and laundry detergent as well. There was also an extra blanket if needed. The hosts were wonderful. They provided a free parking space for our rental car and offered us early check-in and late check-out. They also checked on us regularly during our stay. There is security at the front so you feel safe as well.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Docklands", slug: "the-docklands" },
    featured: true,
  },
  {
    _id: "review-denise-docklands",
    author: "Denise",
    authorLocation: "Italy",
    content:
      "Best rooftop on V&A and Table Mountain. The safety first of all, there is always a guard at the reception. The location was super — in waterfront so near commercial and food services, the Table Mountain cable car is at 15min by car. The roof was amazing: best view of V&A, with barbecue and a pool to chill out. We had beautiful moments here! The apartment has all the necessary in the kitchen and it was really well cleaned.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Docklands", slug: "the-docklands" },
    featured: true,
  },
  {
    _id: "review-inga-docklands",
    author: "Inga",
    authorLocation: "Germany",
    content:
      "A comfortable place to stay, where nothing is lacking. Modern, fully equipped, clean and centrally located accommodation. The waterfront was within walking distance. We would come back anytime. The staff were very attentive and immediately brought a highchair for the baby upon request.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "The Docklands", slug: "the-docklands" },
    featured: true,
  },
  {
    _id: "review-liam-flamingo",
    author: "Liam",
    authorLocation: "Canada",
    content:
      "The room was the perfect size for me and had everything I needed. The building is basically brand new, and is in the perfect Sea Point location for walking to restaurants/cafes etc. I'd absolutely stay here again.",
    rating: 5,
    source: "expedia",
    sourceScore: 10,
    property: { name: "Flamingo Express", slug: "the-flamingo" },
    featured: true,
  },
  {
    _id: "review-mthokozisi-flamingo",
    author: "Mthokozisi",
    authorLocation: "South Africa",
    content:
      "I had an absolutely wonderful experience here. The apartment itself was exceptional — modern, clean, and very well-appointed. I was equally impressed by the facilities and the overall layout of the area, which felt incredibly safe and secure throughout my stay. What really set this place apart, however, was the staff. They are truly the best; you can tell they put genuine effort into making sure every guest is taken care of. I can't recommend this place enough, definitely gonna book again.",
    rating: 5,
    source: "booking",
    sourceScore: 10,
    property: { name: "Flamingo Express", slug: "the-flamingo" },
    featured: true,
  },
  {
    _id: "review-edson-flamingo",
    author: "Edson",
    authorLocation: "Brazil",
    content:
      "Accommodation with good facilities, with all the necessary utensils for cooking if needed. Comfortable room with amenities, bathrobes and towels available, which made everything ideal. Ironing board and iron available. Good wardrobe. Organized and cleaned every two days. Good location and staff and manager were super attentive and helpful at reception.",
    rating: 5,
    source: "expedia",
    sourceScore: 10,
    property: { name: "Flamingo Express", slug: "the-flamingo" },
    featured: true,
  },
];

export function getReviewsForProperty(slug: string): Review[] {
  return reviews.filter((r) => r.property?.slug === slug);
}

export const attractions: Attraction[] = [
  {
    _id: "attraction-v-and-a-waterfront",
    slug: "v-and-a-waterfront",
    name: "V&A Waterfront",
    category: "sightseeing",
    image: "/images/attractions/v-and-a-waterfront.png",
    description: {
      en: "Cape Town's working harbour and the most-visited destination in South Africa — shops, restaurants, and the original Robben Island ferry, all along the water.",
      af: "Kaapstad se werkende hawe en die mees besoekte bestemming in Suid-Afrika — winkels, restaurante en die oorspronklike Robbeneiland-veerboot, alles langs die water.",
      de: "Kapstadts aktiver Hafen und das meistbesuchte Reiseziel Südafrikas — Geschäfte, Restaurants und die ursprüngliche Robben-Island-Fähre, alles direkt am Wasser.",
      fr: "Le port en activité du Cap et la destination la plus visitée d'Afrique du Sud — boutiques, restaurants et le ferry historique de Robben Island, le tout au bord de l'eau.",
      da: "Cape Towns aktive havn og Sydafrikas mest besøgte destination — butikker, restauranter og den oprindelige Robben Island-færge, alt sammen langs vandet.",
    },
    hostNote: {
      en: "Go at golden hour. Stay on the harbour wall for sunset.",
      af: "Gaan tydens die goue uur. Bly op die hawemuur vir sonsondergang.",
      de: "Gehen Sie zur goldenen Stunde hin. Bleiben Sie zum Sonnenuntergang an der Hafenmauer.",
      fr: "Allez-y à l'heure dorée. Restez sur le quai pour le coucher du soleil.",
      da: "Tag derhen i den gyldne time. Bliv på havnemuren til solnedgang.",
    },
  },
  {
    _id: "attraction-table-mountain",
    slug: "table-mountain",
    name: "Table Mountain",
    category: "sightseeing",
    image: "/images/attractions/table-mountain.jpg",
    description: {
      en: "A New 7 Wonder of Nature and the city's defining landmark — take the cableway up, or hike Platteklip if your knees can take it.",
      af: "Een van die Nuwe 7 Natuurwonders en die stad se kenmerkende baken — neem die kabelbaan op, of stap Platteklip op as jou knieë dit kan vat.",
      de: "Eines der neuen 7 Naturweltwunder und das prägende Wahrzeichen der Stadt — fahren Sie mit der Seilbahn hinauf oder wandern Sie den Platteklip hinauf, wenn Ihre Knie mitmachen.",
      fr: "L'une des 7 nouvelles merveilles naturelles et le symbole de la ville — montez par le téléphérique, ou grimpez le Platteklip si vos genoux le supportent.",
      da: "Et af verdens 7 nye naturvidundere og byens definerende vartegn — tag svævebanen op, eller vandr ad Platteklip, hvis dine knæ kan klare det.",
    },
    hostNote: {
      en: "Catch the first cable car at 8am — beat the wind, beat the queue.",
      af: "Vang die eerste kabelbaan om 8vm — wees voor die wind, wees voor die tou.",
      de: "Nehmen Sie die erste Seilbahn um 8 Uhr — dem Wind und der Warteschlange zuvorkommen.",
      fr: "Prenez le premier téléphérique à 8 h — devancez le vent et la file d'attente.",
      da: "Tag den første svævebane kl. 8 — vær foran vinden, vær foran køen.",
    },
  },
  {
    _id: "attraction-bo-kaap",
    slug: "bo-kaap",
    name: "Bo-Kaap",
    category: "culture",
    image: "/images/attractions/bo-kaap.jpg",
    description: {
      en: "The colourful, cobble-stoned heart of Cape Malay culture — vibrant houses, warm hospitality and centuries of history a short walk from our CBD properties.",
      af: "Die kleurvolle, kasseisteen-bestrate hart van die Kaaps-Maleise kultuur — lewendige huise, warm gasvryheid en eeue se geskiedenis 'n kort entjie van ons SSK-eiendomme.",
      de: "Das bunte, mit Kopfsteinpflaster versehene Herz der kapmalaiischen Kultur — leuchtende Häuser, herzliche Gastfreundschaft und Jahrhunderte voller Geschichte, nur einen kurzen Spaziergang von unseren Unterkünften im CBD entfernt.",
      fr: "Le cœur coloré et pavé de la culture cap-malaise — maisons éclatantes, hospitalité chaleureuse et des siècles d'histoire, à quelques pas de nos hébergements du centre-ville.",
      da: "Det farverige, brostensbelagte hjerte af cape malay-kulturen — livlige huse, varm gæstfrihed og århundreders historie kun en kort gåtur fra vores boliger i CBD.",
    },
    hostNote: {
      en: "Sunday morning, after a coffee. Bring a camera; you'll need it.",
      af: "Sondagoggend, ná 'n koffie. Bring 'n kamera saam; jy gaan dit nodig kry.",
      de: "Am Sonntagmorgen, nach einem Kaffee. Bringen Sie eine Kamera mit; Sie werden sie brauchen.",
      fr: "Le dimanche matin, après un café. Apportez un appareil photo ; vous en aurez besoin.",
      da: "Søndag morgen, efter en kop kaffe. Tag et kamera med; du får brug for det.",
    },
  },
];

export const restaurants: Restaurant[] = [
  {
    _id: "restaurant-vixi-social-house",
    slug: "vixi-social-house",
    name: "Vixi Social House",
    mealType: "dinner",
    image: "/images/restaurants/vixi-social-house.jpg",
    description: {
      en: "A modern social-dining concept in De Waterkant — creative small plates, craft cocktails, and a buzzing atmosphere most nights of the week.",
      af: "'n Moderne sosiale-ete-konsep in De Waterkant — kreatiewe klein gereggies, ambagskemerkelkies en 'n bruisende atmosfeer die meeste aande van die week.",
      de: "Ein modernes Social-Dining-Konzept in De Waterkant — kreative kleine Gerichte, handgemachte Cocktails und an den meisten Abenden der Woche eine pulsierende Atmosphäre.",
      fr: "Un concept moderne de cuisine conviviale à De Waterkant — petites assiettes créatives, cocktails artisanaux et une ambiance animée la plupart des soirs de la semaine.",
      da: "Et moderne social-dining-koncept i De Waterkant — kreative småretter, håndlavede cocktails og en summende atmosfære de fleste aftener i ugen.",
    },
    hostNote: {
      en: "Go for the small plates. Stay for the music.",
      af: "Gaan vir die klein gereggies. Bly vir die musiek.",
      de: "Kommen Sie für die kleinen Gerichte. Bleiben Sie für die Musik.",
      fr: "Venez pour les petites assiettes. Restez pour la musique.",
      da: "Kom for småretterne. Bliv for musikken.",
    },
    perk: {
      en: "Show your room key — free welcome drink with any meal.",
      af: "Wys jou kamersleutel — gratis verwelkomingsdrankie met enige ete.",
      de: "Zeigen Sie Ihren Zimmerschlüssel — ein kostenloses Willkommensgetränk zu jeder Mahlzeit.",
      fr: "Présentez votre clé de chambre — boisson de bienvenue offerte avec tout repas.",
      da: "Vis din værelsesnøgle — gratis velkomstdrink til ethvert måltid.",
    },
  },
  {
    _id: "restaurant-villa-47",
    slug: "villa-47",
    name: "Villa 47",
    mealType: "breakfast",
    image: "/images/restaurants/villa-47.jpg",
    description: {
      en: "Bree Street brunch institution — light-filled rooms, all-day breakfast, and one of the city's best coffee menus.",
      af: "'n Bree Street-instelling vir laatontbyt — liggevulde vertrekke, heeldag-ontbyt en een van die stad se beste koffiekaarte.",
      de: "Eine Brunch-Institution in der Bree Street — lichtdurchflutete Räume, ganztägiges Frühstück und eine der besten Kaffeekarten der Stadt.",
      fr: "Une institution du brunch sur Bree Street — salles baignées de lumière, petit-déjeuner toute la journée et l'une des meilleures cartes de café de la ville.",
      da: "En brunch-institution på Bree Street — lyse rum, morgenmad hele dagen og en af byens bedste kaffekort.",
    },
    hostNote: {
      en: "Order the breakfast platter. Sit on the rooftop if there's space.",
      af: "Bestel die ontbytbord. Sit op die dak as daar plek is.",
      de: "Bestellen Sie die Frühstücksplatte. Setzen Sie sich auf die Dachterrasse, wenn Platz ist.",
      fr: "Commandez l'assiette de petit-déjeuner. Installez-vous sur le toit s'il y a de la place.",
      da: "Bestil morgenmadstallerkenen. Sæt dig på taget, hvis der er plads.",
    },
  },
  {
    _id: "restaurant-belthazar",
    slug: "belthazar",
    name: "Belthazar",
    mealType: "lunch",
    image: "/images/restaurants/belthazar.jpg",
    description: {
      en: "Award-winning V&A Waterfront steakhouse and wine bar, with a 600-strong wine list and unobstructed harbour views.",
      af: "Bekroonde V&A Waterfront-steakhuis en wynkroeg, met 'n wynkaart van 600 wyne en onbelemmerde hawe-uitsigte.",
      de: "Preisgekröntes Steakhouse und Weinbar an der V&A Waterfront, mit einer 600 Positionen umfassenden Weinkarte und freiem Blick auf den Hafen.",
      fr: "Steakhouse et bar à vin primé du V&A Waterfront, avec une carte des vins de 600 références et une vue dégagée sur le port.",
      da: "Prisbelønnet steakhouse og vinbar ved V&A Waterfront med et vinkort på 600 vine og uhindret udsigt over havnen.",
    },
    hostNote: {
      en: "The wine list runs 600 bottles deep — trust the sommelier.",
      af: "Die wynkaart strek 600 bottels diep — vertrou die wynkenner.",
      de: "Die Weinkarte umfasst 600 Flaschen — vertrauen Sie dem Sommelier.",
      fr: "La carte des vins compte 600 bouteilles — faites confiance au sommelier.",
      da: "Vinkortet rummer 600 flasker — stol på sommelieren.",
    },
  },
];

/**
 * Founder's letter for the /recommendations page — first-person voice
 * from Niles, used as the editorial intro to the curator's selections.
 */
export const recommendationsLetter = {
  intro: {
    en: [
      "Cape Town gives you more than somewhere to stay. The mountain, the harbour, the streets that change neighbourhood every two blocks. We've been here long enough to know where to send guests, and what to skip.",
      "This is our short list — three views every guest should see at least once, and three places we'd recommend to a friend for breakfast, lunch, and dinner. None of them pay us to be here.",
    ],
    af: [
      "Kaapstad gee jou meer as net 'n plek om te bly. Die berg, die hawe, die strate wat elke twee blokke van buurt verander. Ons is lank genoeg hier om te weet waarheen om gaste te stuur, en wat om oor te slaan.",
      "Dit is ons kort lys — drie uitsigte wat elke gas ten minste een keer behoort te sien, en drie plekke wat ons aan 'n vriend sou aanbeveel vir ontbyt, middagete en aandete. Nie een van hulle betaal ons om hier te wees nie.",
    ],
    de: [
      "Kapstadt bietet Ihnen mehr als nur einen Ort zum Übernachten. Der Berg, der Hafen, die Straßen, die alle zwei Blocks das Viertel wechseln. Wir sind lange genug hier, um zu wissen, wohin wir Gäste schicken und was man auslassen sollte.",
      "Dies ist unsere kurze Liste — drei Aussichten, die jeder Gast mindestens einmal sehen sollte, und drei Orte, die wir einem Freund für Frühstück, Mittag- und Abendessen empfehlen würden. Keiner von ihnen bezahlt uns dafür, hier zu stehen.",
    ],
    fr: [
      "Le Cap vous offre bien plus qu'un simple endroit où séjourner. La montagne, le port, les rues qui changent de quartier tous les deux pâtés de maisons. Nous sommes ici depuis assez longtemps pour savoir où envoyer nos hôtes, et ce qu'il vaut mieux éviter.",
      "Voici notre courte liste — trois panoramas que chaque hôte devrait voir au moins une fois, et trois adresses que nous recommanderions à un ami pour le petit-déjeuner, le déjeuner et le dîner. Aucun d'eux ne nous paie pour figurer ici.",
    ],
    da: [
      "Cape Town giver dig mere end blot et sted at bo. Bjerget, havnen, gaderne der skifter kvarter for hver anden husblok. Vi har været her længe nok til at vide, hvor vi skal sende gæster hen, og hvad man skal springe over.",
      "Dette er vores korte liste — tre udsigter, enhver gæst bør se mindst én gang, og tre steder, vi ville anbefale en ven til morgenmad, frokost og aftensmad. Ingen af dem betaler os for at være her.",
    ],
  },
  signature: "— Niles",
  signatureRole: {
    en: "Founder & Chief Elephant Wrangler",
    af: "Stigter & Hoof Olifant Tammer",
    de: "Gründer & Chef-Elefantenflüsterer",
    fr: "Fondateur et grand maître des éléphants",
    da: "Grundlægger og chef-elefantpasser",
  },
};

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
