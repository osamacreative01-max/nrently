export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function categoryFrom(id: CategoryId): number {
  return CATEGORIES.find((c) => c.id === id)?.from ?? 0;
}

export function formatPKR(value: number): string {
  return `PKR ${value.toLocaleString("en-PK")}`;
}

export const SITE_URL = "https://www.nrently.pk";
export const PHONE_DISPLAY = "0306-6556934";
export const PHONE_INTL = "+923066556934";
export const SECOND_PHONE_DISPLAY = "+92 316 1068353";
export const SECOND_PHONE_INTL = "+923161068353";

const WHATSAPP_DEFAULT_MESSAGE = [
  "Hello Nrently,",
  "",
  "I want to rent a car.",
  "",
  "Please share available options and prices.",
].join("\n");

export const WHATSAPP_URL = `https://wa.me/${PHONE_INTL.replace(
  /[^0-9]/g,
  ""
)}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
export const EMAIL = "nrently@gmail.com";
export const BRAND_NAME = "Nrently";
export const BRAND_TAGLINE = "Best Car Rental Services in Karachi";

export const HERO = {
  heading: "Best Car Rental Services in Karachi",
  paragraph:
    "Looking for a reliable and affordable car rental in Karachi? We offer a wide range of vehicles to suit your needs, whether for business, travel, or daily use. Enjoy hassle-free booking, competitive rates, and excellent customer service. Rent your perfect car today and drive with confidence!",
  cta: "Book Your Ride",
  image: "/images/download-removebg-preview.png",
};

export const ABOUT = {
  heading: "Welcome To Nrently Car Rental in Karachi",
  paragraph:
    "Nrently makes it hassle-free to book a car for any occasion in Karachi, Pakistan. Whether it's a wedding, business trip, corporate event, or picnic, our online platform makes car hire in Karachi simple. Select your car, choose pick-up and drop-off locations, and schedule your rental with ease. Enjoy flexible options, competitive prices, and a smooth car rental experience in Karachi.",
  subheading1: "Find Your Best & Affordable Ride",
  subtext1: "Discover the best car rental services with driver in Pakistan.",
  subheading2: "Car Rental with Chauffeur",
  subheading3: "Luxury & Budget-Friendly Car Rental in Karachi",
  paragraph2:
    "Enjoy a smooth and affordable travel experience with our top car rental services in Karachi, Pakistan. Whether you're exploring the city or need a trustworthy driver, we offer a variety of well-maintained vehicles to suit your needs. At Nrently, we make sure every car is checked by our expert team for the best ride possible. Our easy online booking system lets you quickly choose your car, fill in your details, and get ready to hit the road—all at great prices.",
};

export type CategoryId = "budget" | "standard" | "luxury" | "suv" | "vans";

export interface Category {
  id: CategoryId;
  label: string;
  href: string;
  example: string;
  blurb: string;
  from: number;
  image: string;
  features: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "budget",
    label: "Budget",
    href: "/budget",
    example: "Daihatsu Mira or Similar",
    blurb: "Clean, reliable and easy on the budget — perfect for daily city runs.",
    from: 5000,
    image: "/images/Mira-ES-1024x735-Photoroom.png",
    features: ["Economical fuel", "City driving", "Great mileage"],
  },
  {
    id: "standard",
    label: "Standard",
    href: "/standard",
    example: "Toyota Corolla or Similar",
    blurb: "Comfortable sedans and saloons for families and business trips.",
    from: 6500,
    image: "/images/TOYOTA Corolla Altis-Photoroom.png",
    features: ["Spacious cabin", "Dual airbags", "Long-distance ready"],
  },
  {
    id: "luxury",
    label: "Luxury",
    href: "/luxury",
    example: "Mercedes Benz or Similar",
    blurb: "Executive German and premium marques for weddings and VIP travel.",
    from: 30000,
    image: "/images/MERCEDES S Class - S400.png",
    features: ["Leather interior", "Chauffeur option", "5-star comfort"],
  },
  {
    id: "suv",
    label: "SUV",
    href: "/suv",
    example: "Land Cruiser or Similar",
    blurb: "Powerful 4x4s and family SUVs for highways, hills and rough terrain.",
    from: 14000,
    image: "/images/TOYOTA LC 300-Photoroom.png",
    features: ["4x4 capability", "High ground clearance", "7-seater ready"],
  },
  {
    id: "vans",
    label: "Vans & Coasters",
    href: "/vans-and-coasters",
    example: "Toyota Coaster or Similar",
    blurb: "Hiace vans and coasters for groups, outings and events.",
    from: 8000,
    image: "/images/Hiace-card.png",
    features: ["Up to 28 seats", "Group travel", "Cargo space"],
  },
];

export interface Vehicle {
  id: string;
  name: string;
  category: CategoryId;
  pricePerDay: number;
  seats: number;
  luggage: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  ac: boolean;
  tag?: string;
  image: string;
  description: string;
  driverHours: number;
  overtimeRate: number;
}

export const VEHICLES: Vehicle[] = [
  {
    id: "suzuki-cultus",
    name: "Suzuki Cultus",
    category: "budget",
    pricePerDay: 5000,
    seats: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "Best Deal",
    image: "/images/SUZUKI Cultus-Photoroom.png",
    description:
      "A nimble, fuel-efficient hatchback that glides through city traffic. Perfect for daily commutes and short trips.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "suzuki-wagon-r",
    name: "Suzuki Wagon R",
    category: "budget",
    pricePerDay: 5000,
    seats: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/SUZUKI Wagon R-Photoroom.png",
    description:
      "Tall, roomy and easy to park. The Wagon R packs surprising space into a compact, affordable body.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "suzuki-alto",
    name: "Suzuki Alto",
    category: "budget",
    pricePerDay: 5000,
    seats: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/Suzuki Alto-Photoroom.png",
    description:
      "A dependable little runabout with tiny running costs and easy city parking — the classic first choice.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "toyota-corolla-grande",
    name: "Toyota Corolla Grande",
    category: "standard",
    pricePerDay: 8000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "Most Popular",
    image: "/images/TOYOTA Corolla Altis-Photoroom.png",
    description:
      "Pakistan's favourite saloon in its top Grande trim. Smooth ride, generous boot and dependable comfort.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "toyota-corolla-altise",
    name: "Toyota Corolla Altise",
    category: "standard",
    pricePerDay: 7000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/TOYOTA Corolla Altis-Photoroom.png",
    description:
      "A refined Altise trim with premium interior touches — built for long, comfortable road trips.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "toyota-yaris",
    name: "Toyota Yaris",
    category: "standard",
    pricePerDay: 6500,
    seats: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/TOYOTA Yaris-Photoroom.png",
    description:
      "A modern, well-appointed sedan with crisp handling and a comfortable cabin for every kind of trip.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "toyota-gli",
    name: "Toyota GLI",
    category: "standard",
    pricePerDay: 6500,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/TOYOTA Corolla Gli-Photoroom.png",
    description:
      "Business-class comfort with immaculate cabin finish. A favourite for corporate and family city travel.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "honda-civic",
    name: "Honda Civic",
    category: "standard",
    pricePerDay: 9000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/HONDA Civic-Photoroom.png",
    description:
      "A sporty-yet-refined sedan with premium interiors and punchy performance — ideal for long road trips.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "honda-civic-x",
    name: "Honda Civic X",
    category: "standard",
    pricePerDay: 14000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "Premium Sedan",
    image: "/images/Honda Civic X.webp",
    description:
      "The top-tier Civic X — turbo-charged performance, sporty styling and a premium cabin for drivers who want more.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "audi-a4",
    name: "Audi A4",
    category: "luxury",
    pricePerDay: 30000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/AUDI A4-Photoroom.png",
    description:
      "Athletic German engineering with a beautifully crafted cabin — the executive's everyday grand entrance.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "audi-a5",
    name: "Audi A5",
    category: "luxury",
    pricePerDay: 40000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "VIP Choice",
    image: "/images/AUDI A5.png",
    description:
      "Striking coupe-like proportions with quattro grip — style and sure-footed confidence in one package.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    category: "luxury",
    pricePerDay: 40000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "Executive Choice",
    image: "/images/AUDI A6.png",
    description:
      "A refined executive sedan with quattro grip, a tech-forward cabin and effortless highway presence.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "mercedes-cla200",
    name: "Mercedes CLA200",
    category: "luxury",
    pricePerDay: 40000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/MERCEDES CLA200.png",
    description:
      "Sleek, coupe-styled elegance with the three-pointed star. A head-turner for weddings and VIP pickups.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "mercedes-s400",
    name: "Mercedes S400",
    category: "luxury",
    pricePerDay: 120000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/MERCEDES S Class - S400.png",
    description:
      "The flagship S-Class. First-class appointments, whisper-quiet refinement and timeless authority.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    category: "suv",
    pricePerDay: 35000,
    seats: 7,
    luggage: 6,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    tag: "Family Favourite",
    image: "/images/TOYOTA LC 300-Photoroom.png",
    description:
      "The ultimate overlander. Legendary durability, triple-zone climate control and space for the whole crew.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "toyota-prado",
    name: "Toyota Land Cruiser Prado",
    category: "suv",
    pricePerDay: 20000,
    seats: 7,
    luggage: 6,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    image: "/images/TOYOTA Prado-Photoroom.png",
    description:
      "A refined yet unstoppable 4x4 with luxurious appointments — equally at home on city avenues and mountain passes.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "suv",
    pricePerDay: 18000,
    seats: 7,
    luggage: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    image: "/images/TOYOTA Fortuner-Photoroom.png",
    description:
      "A muscular 7-seat SUV that swallows highways and climbs northern hills with total confidence.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "toyota-hiace-15",
    name: "Toyota Hiace 15 Seater",
    category: "vans",
    pricePerDay: 13000,
    seats: 15,
    luggage: 8,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    tag: "Group Pick",
    image: "/images/Hiace-card.png",
    description:
      "A spacious 15-seat passenger van for outings, pickups and group travel — comfortable and dependable.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "saloon-4c-28seater",
    name: "Saloon 4C 28 Seater",
    category: "vans",
    pricePerDay: 20000,
    seats: 28,
    luggage: 15,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    image: "/images/Saloon 4C.png",
    description:
      "A full-size 28-seat coast for weddings, corporate retreats and large family gatherings.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "changan-karvaan",
    name: "Changan Karvaan",
    category: "vans",
    pricePerDay: 8000,
    seats: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/changan-karvaan.webp",
    description:
      "A comfortable 7-seat passenger van — smooth ride, spacious cabin and ideal for family outings and group travel.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "toyota-land-cruiser-v8",
    name: "Toyota Land Cruiser V8",
    category: "suv",
    pricePerDay: 25000,
    seats: 7,
    luggage: 6,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    tag: "Premium SUV",
    image: "/images/TOYOTA Land Cruiser v8-Photoroom.png",
    description:
      "The legendary V8 Land Cruiser — unmatched power, prestige and presence for VIP travel and long highway runs.",
    driverHours: 10,
    overtimeRate: 1000,
  },
  {
    id: "toyota-revo",
    name: "Toyota Revo",
    category: "suv",
    pricePerDay: 14000,
    seats: 4,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    image: "/images/1669808904518-Revo.png",
    description:
      "A rugged pickup-SUV hybrid with off-road muscle and modern comfort — perfect for adventure and utility.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "kia-sportage",
    name: "KIA Sportage",
    category: "suv",
    pricePerDay: 11000,
    seats: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/1730196203333-Kia_Sportage_crpt-removebg-preview (1)-Photoroom.png",
    description:
      "A stylish mid-size SUV with premium interiors, smooth ride and advanced tech features for modern families.",
    driverHours: 10,
    overtimeRate: 500,
  },
  {
    id: "honda-brv",
    name: "Honda BR-V",
    category: "suv",
    pricePerDay: 9000,
    seats: 7,
    luggage: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    ac: true,
    image: "/images/HONDA BRV-Photoroom.png",
    description:
      "A versatile 7-seat crossover with Honda reliability — spacious cabin, smooth drive and excellent fuel economy.",
    driverHours: 10,
    overtimeRate: 500,
  },
];

export interface CityInfo {
  id: string;
  name: string;
  href: string;
  blurb: string;
  image: string;
  from: number;
  areas: string[];
  address: string;
}

export const CITIES: CityInfo[] = [
  {
    id: "karachi",
    name: "Karachi",
    href: "/karachi",
    blurb:
      "The city that never sleeps. From Clifton beaches to the airport runways, get around easefully.",
    image: "/images/TOYOTA Corolla Altis-Photoroom.png",
    from: 5000,
    areas: [
      "Gulshan-e-Iqbal",
      "Gulistan-e-Johar",
      "Defense",
      "Clifton",
      "Gulberg",
      "North Nazimabad",
      "North Karachi",
      "Malir",
      "Landi",
      "Korangi",
      "Shah Faisal",
      "Shahrah-e-Faisal",
      "Saddar",
      "Garden",
      "Model Colony",
      "Scheme 33",
      "Highway",
      "Sakhi Hassan",
    ],
    address: "Shahrah e Faisal Near Airport Road, Faisal Cantonment, Karachi, Pakistan",
  },
  {
    id: "lahore",
    name: "Lahore",
    href: "/lahore",
    blurb:
      "Food, culture and history — explore the heart of Punjab in effortless style.",
    image: "/images/HONDA Civic-Photoroom.png",
    from: 6000,
    areas: [
      "Gulberg",
      "DHA Phase 5 & 6",
      "Model Town",
      "Johar Town",
      "Liberty Market",
      "Cantt",
    ],
    address: "1st Floor, Madina Market, Shop No 5, DHA Block H, Gazi Road, Lahore, Pakistan",
  },
  {
    id: "islamabad",
    name: "Islamabad",
    href: "/islamabad",
    blurb:
      "The serene capital — green avenues, marbled boulevards and scenic northern gateway.",
    image: "/images/MERCEDES CLA200.png",
    from: 6000,
    areas: [
      "F-6 & F-7",
      "Blue Area",
      "E-11",
      "G-9",
      "DHA Phase 2",
      "Bani Gala",
    ],
    address: "House No 57, Street No 36, F6/1, Islamabad, Pakistan",
  },
  {
    id: "multan",
    name: "Multan",
    href: "/location",
    blurb:
      "The city of saints and mangoes — served with our full fleet on road trips.",
    image: "/images/TOYOTA Yaris-Photoroom.png",
    from: 5500,
    areas: ["Cantt", "Nabi Pura", "Gulgasht", "Rashidabad"],
    address: "Abdali Road, Multan, Pakistan",
  },
  {
    id: "sukkur",
    name: "Sukkur",
    href: "/location",
    blurb:
      "Gateway to upper Sindh — dependable wheels for business and travel.",
    image: "/images/Suzuki Alto-Photoroom.png",
    from: 5000,
    areas: ["Sukkur Cantt", "City Centre", "Airport Road"],
    address: "Airport Road, Sukkur, Pakistan",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    href: "/location",
    blurb:
      "City of pearls — convenient pickup and delivery right across the city.",
    image: "/images/TOYOTA Fortuner-Photoroom.png",
    from: 5000,
    areas: ["Auto Bhan Road", "Latifabad", "Qasimabad", "City Centre"],
    address: "Auto Bhan Road, Hyderabad, Pakistan",
  },
];

export const KARACHI_HIGHLIGHTS = {
  heading: "Rent A Car in Karachi",
  subheading: "Hire a Car in Karachi for a Memorable Trip",
  intro:
    "We prioritize both quality and affordability, ensuring a safe ride for our valued visitors across Karachi. This makes Nrently one of the top car rental companies in the city.",
  callToBook: {
    heading: "CALL US & BOOK A CAR TODAY WITH NRENTLY!",
    text: "Explore Karachi's top attractions with the most trusted car rental service — Nrently",
    phone: "0306-6556934",
  },
};

export interface HighlightItem {
  name: string;
  text: string;
  image: string;
}

export const CITY_HIGHLIGHTS: HighlightItem[] = [
  {
    name: "Clifton Beach—Just 1.6 KM Away!",
    text: "Clifton Beach is a beloved getaway in Karachi, offering a peaceful retreat from the hustle and bustle of the city. Whether you're strolling along the shoreline, enjoying a camel ride, or simply relaxing as the sun sets, it's the perfect place to unwind. The beach is a favorite spot for families, couples, and friends, especially in the evenings when the cool breeze brings a refreshing vibe. To make your visit even more enjoyable, we offer affordable car rental options, allowing you to travel comfortably by the day or month without breaking the bank.",
    image: "/images/Clifton Beach.jpg",
  },
  {
    name: "St. Patrick's Cathedral",
    text: "Step into the grandeur of St. Patrick's Cathedral, a magnificent 19th-century masterpiece renowned for its gothic architecture and serene ambiance. Perfect for history buffs, architecture enthusiasts, and those seeking a tranquil escape, this iconic landmark promises a truly spiritual experience. Whether you're capturing stunning photographs or exploring its rich heritage, your visit will be unforgettable. Plus, with our chauffeur-driven rentals, you can relax and soak in the beauty of the journey while we handle the road.",
    image: "/images/St. Patrick's Cathedral.jpg",
  },
  {
    name: "Frere Hall",
    text: "Nestled in the heart of Karachi, Frere Hall stands as a timeless symbol of the city's colonial heritage. This iconic structure captivates history enthusiasts, photographers, and art lovers alike. Surrounded by lush gardens, it's an ideal spot for a peaceful evening stroll. On Sundays, the vibrant book market offers a treasure trove of rare finds for bookworms. Whether you prefer the freedom of a self-drive experience or the comfort of a professional driver, our services ensure a seamless and enjoyable visit.",
    image: "/images/Frere Hall.jpg",
  },
  {
    name: "Mazar-e-Quaid",
    text: "A trip to Karachi is incomplete without visiting the iconic Mazar-e-Quaid, the final resting place of Quaid-e-Azam Muhammad Ali Jinnah. Surrounded by lush gardens and a serene atmosphere, this national monument offers a truly memorable experience. Whether you're visiting with family, elderly relatives, or guests from out of town, our chauffeur-driven rentals ensure a smooth and hassle-free journey. Forget the stress of traffic and parking — simply relax and immerse yourself in the historic beauty of this landmark. With our flexible per-day service, you can visit at your preferred time, be it a peaceful morning or a calming evening.",
    image: "/images/Mazar e Quaid.jpg",
  },
  {
    name: "Empress Market",
    text: "Empress Market, one of Karachi's oldest and busiest markets, is a shopper's paradise. From fresh fruits and spices to textiles and household items, you'll find everything at the best prices. However, with the heavy crowd and limited parking, getting around can be tricky. To make your visit hassle-free, choose our self-drive or monthly rental options. Need extra space for your shopping bags? We offer the most affordable car rentals to make your trip smooth and convenient.",
    image: "/images/Empress Market.jpg",
  },
  {
    name: "Pakistan Air Force (PAF) Museum",
    text: "The PAF Museum in Karachi is a must-visit for aviation lovers and history enthusiasts. With a fascinating collection of vintage aircraft, fighter jets, and war memorabilia, it offers a fun and educational experience for both kids and adults. The museum's outdoor displays and picnic areas make it a popular spot, especially on weekends. To make your visit smooth and hassle-free, choose our rental with a driver or enjoy the freedom of a self-drive option.",
    image: "/images/PAF.jpg",
  },
];

export const SHOPPING_SECTION = {
  heading: "Shopping In Karachi",
  intro:
    "Whether you're shopping solo or with family, nrently.pk guarantees a smooth and hassle-free ride. From top malls to local markets in Karachi, enjoy clean cars and friendly drivers who help with your bags and patiently wait while you shop stress-free.",
};

export interface ShoppingGroup {
  label: string;
  items: string[];
}

export const SHOPPING_GROUPS: ShoppingGroup[] = [
  {
    label: "Markets",
    items: [
      "Bolton Market",
      "Empress Market",
      "Paper Market",
      "Soldier Bazaar",
      "Sunday Bazaar",
      "Tariq Road",
      "Urdu Bazaar",
      "Zainab Market",
    ],
  },
  {
    label: "Supermarkets",
    items: [
      "Al-Fatah",
      "Bin Hashim",
      "Carrefour",
      "Chase Up",
      "Imtiaz Supermarket",
      "Metro",
      "SPAR Supermarket",
    ],
  },
  {
    label: "Malls",
    items: [
      "Atrium Mall",
      "Dolmen Mall",
      "Lucky One Mall",
      "Millennium Mall",
      "Ocean Mall",
    ],
  },
  {
    label: "Areas",
    items: [
      "Clifton",
      "DHA (Defence Housing Authority)",
      "Gulshan-e-Iqbal",
      "Saddar",
      "Bahria Town",
      "Shah Faisal Colony",
      "PECHS Shah re Faisal",
      "Gulistan e Johar",
      "Nazimabad",
    ],
  },
  {
    label: "Transport Hubs",
    items: [
      "Jinnah International Airport",
      "Cantt Railway Station",
      "City Railway Station",
      "Karachi Port",
      "Sohrab Goth Bus Terminal",
    ],
  },
  {
    label: "Parks",
    items: [
      "Bagh Ibn-e-Qasim",
      "Hill Park",
      "Safari Park",
      "Aziz Bhatti Park",
      "Benazir Bhutto Park",
    ],
  },
];

export const EVENTS_SECTION = {
  heading: "Rent a Car for Your Event in Karachi",
  text: "Got a wedding to attend at a hall, auditorium, or golf club? With nrently.pk, travel in style and comfort. Whether it's picking up loved ones, visiting the salon, or grabbing gifts, our professional service ensures smooth rides and timely pickups for a perfect, stress-free experience!",
};

export interface EventItem {
  icon: string;
  title: string;
  text: string;
}

export const EVENTS: EventItem[] = [
  {
    icon: "Users",
    title: "Experienced & Certified Drivers",
    text: "Need a ride in Karachi? Book your car online and enjoy a smooth trip with our skilled drivers who are always on time and take the best routes.",
  },
  {
    icon: "Plane",
    title: "Convenient Round-Trip Airport Car Rental",
    text: "Flying in or out of Karachi? Or picking up a special guest? Our Karachi airport car service ensures a smooth and comfortable ride with luxury rentals and 24/7 online booking. Say goodbye to delays and travel stress-free!",
  },
  {
    icon: "Briefcase",
    title: "Book Premium Cars for Business Travel",
    text: "Want to make a grand entrance? Book our luxury car rental in Karachi with a professional chauffeur and arrive in style. Perfect for business meetings and special events!",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "How can I rent a car in Karachi, Pakistan?",
    a: `It is very easy to book a car from our website. You need to follow basic simple steps. Please visit the rent-a-car area of Nrently, choose the vehicle you want to hire, and then click the "book now" button. But ensure you have a current driver's license and NIC if you live in Pakistan.`,
  },
  {
    q: "What is the maximum duration a car may be hired for?",
    a: "Traditionally, if you want to rent a car in Karachi, you have a 30-day time limit.",
  },
  {
    q: "Which rental vehicle company is most popular in Karachi?",
    a: "Karachi's most popular rental car category is an economy car, such as a Toyota, Civic, Suzuki Alto VXL, Daihatsu Mira, Suzuki Cultus VXL, Suzuki Wagon R VXL, or comparable model. Nrently offers many different types of vehicles, from affordable models to expensive ones.",
  },
  {
    q: "Can I rent a car from Nrently without a driver?",
    a: "Yes, you can easily rent a car you want for your event. We offer both cars with a driver and without a driver for both automatic and manual cars.",
  },
  {
    q: "Why do people rent cars in Karachi?",
    a: "Going around Karachi without a vehicle is challenging because it is a large metropolis. You may travel conveniently and on schedule with Nrently. To guarantee the best car hire in Karachi, our crew is extremely helpful and fast.",
  },
  {
    q: "Should I pay a fee in addition to my traffic fine?",
    a: "If you're not using Nrently's driver service, then you must pay the traffic fine.",
  },
  {
    q: "For which event can I book your car in Karachi?",
    a: "You can rent a car in Karachi for any event, picnic, wedding, shopping, casual and executive trips. Cars like the Corolla and Civic offer you the best options for weddings. So, you can easily rent a car in Karachi for weddings from our website and get the car you want.",
  },
  {
    q: "What areas do you cover in Karachi?",
    a: "Our car rental service includes all the areas in Karachi, including Gulshan-e-Iqbal, Gulistan-e-Johar, Defense, Clifton, Gulberg, North Nazimabad, North Karachi, Malir, Landi, Korangi, Shah Faisal, Shahrah-e-Faisal, Saddar, Garden, Model Colony, Town, Scheme 33, Highway, Sakhi Hassan.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "karachi-road-trip-guide",
    title: "The Ultimate Karachi Road Trip Guide",
    excerpt:
      "From Clifton sunsets to Hawksbay, here's exactly how to plan the perfect drive around Pakistan's biggest city.",
    date: "2026-08-14",
    category: "Travel Tips",
    image: "/images/blog-karachi-road-trip.webp",
    readTime: "6 min read",
  },
  {
    slug: "choosing-the-right-car",
    title: "How to Choose the Right Rental Car for You",
    excerpt:
      "Budget hatch or beaming luxury sedan? A practical guide to matching the perfect vehicle to your trip.",
    date: "2026-07-28",
    category: "Guides",
    image: "/images/blog-choosing-car.webp",
    readTime: "8 min read",
  },
  {
    slug: "wedding-fleet-essentials",
    title: "Building the Perfect Wedding Car Fleet",
    excerpt:
      "Coasters, luxury sedans and baraat buses — how to coordinate a seamless, stunning wedding convoy.",
    date: "2026-06-30",
    category: "Events",
    image: "/images/blog-wedding-fleet.webp",
    readTime: "5 min read",
  },
  {
    slug: "airport-transfer-guide",
    title: "Airport Transfers Without the Stress",
    excerpt:
      "Why booking a reliable airport transfer beats waiting in a taxi line after a long international flight.",
    date: "2026-05-19",
    category: "Tips",
    image: "/images/blog-airport-transfer.webp",
    readTime: "4 min read",
  },
  {
    slug: "long-term-rental-advantages",
    title: "Long-Term Rentals: Save More on Monthly Deals",
    excerpt:
      "Staying in one city for a while? Discover how monthly contracts cut your per-day cost dramatically.",
    date: "2026-04-08",
    category: "Guides",
    image: "/images/blog-long-term-rental.webp",
    readTime: "7 min read",
  },
  {
    slug: "driving-from-lahore-to-islamabad",
    title: "Lahore to Islamabad: The M-2 Motorway Drive",
    excerpt:
      "Salt Range vistas, Kallar Kahar stops and perfect rest breaks — your scenic M-2 road trip itinerary.",
    date: "2026-03-15",
    category: "Road Trips",
    image: "/images/blog-m2-motorway.webp",
    readTime: "6 min read",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Vehicles Delivered" },
  { value: 6, suffix: "+", label: "Cities Served" },
  { value: 2000, suffix: "+", label: "Happy Customers" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimal: true },
];

export const MISSION = ABOUT.paragraph;

export interface RentalPolicyItem {
  label: string;
  value: string;
  known: boolean;
}

export const RENTAL_POLICY: RentalPolicyItem[] = [
  {
    label: "Driver",
    value: "Included with every booking — 10 standard hours per day.",
    known: true,
  },
  {
    label: "Self-Drive",
    value: "Coming soon — please confirm availability on WhatsApp.",
    known: false,
  },
  {
    label: "Driver Charges",
    value: "Included in the daily rate. Overtime billed separately.",
    known: true,
  },
  {
    label: "Fuel",
    value:
      "Car is delivered without fuel — fuel cost is not included, you pay for what you use.",
    known: true,
  },
  {
    label: "Security Deposit",
    value: "Refundable deposit required — amount confirmed on booking.",
    known: false,
  },
  {
    label: "Required Documents",
    value: "CNIC (original) with a valid driving licence. Confirmed on WhatsApp.",
    known: false,
  },
  {
    label: "Minimum Duration",
    value: "Basic plan starts from 1 day; monthly plans available.",
    known: false,
  },
  {
    label: "Traffic Fines",
    value: "Any fines incurred during the rental are the renter's responsibility.",
    known: false,
  },
  {
    label: "Cancellation",
    value: "Flexible cancellations — please message us at least 24 hours in advance.",
    known: false,
  },
];

export const VALUES = [
  {
    icon: "ShieldCheck",
    title: "Transparent Pricing",
    text: "Fixed daily rates with zero hidden charges and a clear quote before you confirm.",
  },
  {
    icon: "Clock",
    title: "On-Time, Every Time",
    text: "Chauffeurs and cars arrive early. Reliability is the foundation of our brand.",
  },
  {
    icon: "Sparkles",
    title: "Showroom-Clean Fleet",
    text: "Every vehicle is sanitised, serviced and inspected before each and every booking.",
  },
  {
    icon: "Headset",
    title: "24/7 Support",
    text: "Real humans on WhatsApp and phone, around the clock, in English and Urdu.",
  },
];

export const customerCenters = [
  { city: "Karachi", phones: ["+92-306-6556934", "+923-161-068353"], email: "nrently@gmail.com" },
  { city: "Lahore", phones: ["+92-306-6556934", "+92-316-1068353"], email: "nrently@gmail.com" },
  { city: "Islamabad", phones: ["+92-306-6556934", "+92-316-1068353"], email: "nrently@gmail.com" },
  { city: "Multan", phones: ["+92-306-6556934", "+92-316-1068353"], email: "nrently@gmail.com" },
  { city: "Sukkur", phones: ["+92-306-6556934", "+9231-610-68353"], email: "nrently@gmail.com" },
  { city: "Hyderabad", phones: ["+92-306-6556934", "+92-316-1068353"], email: "nrently@gmail.com" },
];

export const CONTACT = {
  heading: "Contact Nrently — Car Rental Services",
  text: "Explore Karachi's top attractions with nrently.pk — your trusted travel partner for a smooth and comfortable ride!",
  location: "Shahrah-E-Faisal, Karachi",
  phones: ["+92-306-6556934", "+92-316-1068353"],
  email: "nrently@gmail.com",
  mapEmbeds: {
    karachi:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3619.400949236987!2d67.16665177537165!3d24.88430167791371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDUzJzAzLjUiTiA2N8KwMTAnMDkuMiJF!5e0!3m2!1sen!2s!4v1776634884014!5m2!1sen!2s",
    lahore:
      "https://maps.google.com/maps?q=1st%20flore%20madina%20market%2Cshop%20no%205%2CDHA%20block%20H%2CGazi%20Road%20Lahore&t=m&z=10&output=embed&iwloc=near",
    islamabad:
      "https://maps.google.com/maps?q=House%20no%2057%20%2Cstreet%20no%2036%20%2CF6%2F1%2CIslamabad&t=m&z=10&output=embed&iwloc=near",
  },
};

export const FOOTER = {
  tagline:
    "Nrently car Services is your go-to choice for premium car rentals. Whether it's a party, event, or picnic, book your ride online in Karachi and travel in style.",
  social: {
    facebook: "https://www.facebook.com/share/1L5rE5ZQyJ/",
  },
  quickLinks: ["Home", "About", "Vehicles", "Location", "Contact us", "Blog"],
  areasServed: ["Karachi", "Lahore", "Islamabad", "Sukkur", "Multan"],
  getInTouch: {
    phones: ["+92-306-6556934", "+92-316-1068353"],
    email: "nrently@gmail.com",
    address: "Shahrah e Faisal Near Airport Road, Faisal Cantonment, Karachi, Pakistan",
    mapLink: "https://maps.app.goo.gl/rD6A85oecnyReeQJ6",
  },
};