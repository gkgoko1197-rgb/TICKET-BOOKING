export type Amenity =
  | "wifi"
  | "pool"
  | "parking"
  | "gym"
  | "spa"
  | "restaurant";

export type Accommodation = {
  id: string;
  name: string;
  type: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  location: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  amenities: Amenity[];
  images: { url: string; hint: string }[];
};

export const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "The Grand Parisian",
    type: "Hotel",
    description: "Elegant hotel near the Eiffel Tower with classic French decor.",
    longDescription: "Immerse yourself in Parisian luxury at The Grand Parisian. Located just steps from the Eiffel Tower, our hotel offers breathtaking views, exquisite dining, and opulent rooms. Enjoy our world-class spa and personalized service.",
    price: 350,
    rating: 4.8,
    location: {
      address: "123 Rue de Rivoli",
      city: "Paris",
      lat: 48.8566,
      lng: 2.3522,
    },
    amenities: ["wifi", "restaurant", "spa", "gym"],
    images: [
      { url: "https://picsum.photos/seed/h1/800/600", hint: "modern hotel" },
      { url: "https://picsum.photos/seed/lobby/800/600", hint: "hotel lobby" },
      { url: "https://picsum.photos/seed/h2/800/600", hint: "hotel room" },
    ],
  },
  {
    id: "2",
    name: "Tokyo Zen Garden Inn",
    type: "Hotel",
    description: "A tranquil retreat in the heart of bustling Shinjuku.",
    longDescription: "Find your peace at Tokyo Zen Garden Inn. Amidst the vibrant energy of Shinjuku, our inn provides a serene escape with traditional Japanese gardens, minimalist rooms, and a calming atmosphere. Perfect for business and leisure travelers.",
    price: 220,
    rating: 4.5,
    location: {
      address: "45 Shinjuku Gyoen",
      city: "Tokyo",
      lat: 35.690921,
      lng: 139.700258,
    },
    amenities: ["wifi", "restaurant", "spa"],
    images: [
      { url: "https://picsum.photos/seed/h2/800/600", hint: "hotel room" },
      { url: "https://picsum.photos/seed/g1/800/600", hint: "charming guesthouse" },
      { url: "https://picsum.photos/seed/spa/800/600", hint: "spa" },
    ],
  },
  {
    id: "3",
    name: "NYC Central View",
    type: "Apartment",
    description: "Modern apartment with stunning views of Central Park.",
    longDescription: "Live like a New Yorker in our stylish apartment overlooking Central Park. This fully-equipped rental offers all the comforts of home with a touch of luxury. The prime location provides easy access to museums, theaters, and shopping.",
    price: 450,
    rating: 4.9,
    location: {
      address: "50 Central Park West",
      city: "New York",
      lat: 40.7128,
      lng: -74.006,
    },
    amenities: ["wifi", "parking", "gym"],
    images: [
      { url: "https://picsum.photos/seed/a1/800/600", hint: "modern apartment" },
      { url: "https://picsum.photos/seed/a2/800/600", hint: "apartment kitchen" },
      { url: "https://picsum.photos/seed/ny/800/600", hint: "city view" },
    ],
  },
  {
    id: "4",
    name: "Sydney Harbour Resort",
    type: "Resort",
    description: "Luxury resort with a rooftop pool and views of the Opera House.",
    longDescription: "Experience the best of Sydney at our Harbour Resort. Featuring a stunning rooftop infinity pool, award-winning restaurants, and rooms with panoramic views of the Sydney Opera House and Harbour Bridge.",
    price: 400,
    rating: 4.7,
    location: {
      address: "789 Circular Quay",
      city: "Sydney",
      lat: -33.8688,
      lng: 151.2093,
    },
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    images: [
      { url: "https://picsum.photos/seed/r1/800/600", hint: "beach resort" },
      { url: "https://picsum.photos/seed/pool/800/600", hint: "hotel pool" },
      { url: "https://picsum.photos/seed/sydney/800/600", hint: "city skyline" },
    ],
  },
  {
    id: "5",
    name: "Alpine Cozy Cabin",
    type: "Cabin",
    description: "A rustic cabin in the Swiss Alps, perfect for a mountain getaway.",
    longDescription: "Escape to the mountains in our Alpine Cozy Cabin. Surrounded by the majestic Swiss Alps, this rustic yet comfortable cabin is perfect for hiking in the summer and skiing in the winter. Features a fireplace and a fully equipped kitchen.",
    price: 180,
    rating: 4.6,
    location: {
      address: "10 Alpine Way",
      city: "Grindelwald",
      lat: 46.6242,
      lng: 8.0333,
    },
    amenities: ["wifi", "parking"],
    images: [
      { url: "https://picsum.photos/seed/c1/800/600", hint: "forest cabin" },
      { url: "https://picsum.photos/seed/alps/800/600", hint: "mountain view" },
      { url: "https://picsum.photos/seed/cabin-int/800/600", hint: "cabin interior" },
    ],
  },
  {
    id: "6",
    name: "The Londoner's Flat",
    type: "Apartment",
    description: "Chic and centrally located flat in Covent Garden.",
    longDescription: "Stay in the heart of London's theatre district. This chic flat in Covent Garden is the perfect base for exploring the city. It's walking distance to top attractions, restaurants, and shops.",
    price: 300,
    rating: 4.5,
    location: {
      address: "25 Long Acre",
      city: "London",
      lat: 51.5074,
      lng: -0.1278,
    },
    amenities: ["wifi", "gym"],
    images: [
      { url: "https://picsum.photos/seed/a2/800/600", hint: "apartment kitchen" },
      { url: "https://picsum.photos/seed/london-apt/800/600", hint: "apartment living room" },
      { url: "https://picsum.photos/seed/london-street/800/600", hint: "london street" },
    ],
  },
  {
    id: "7",
    name: "Rome Ancient Boutique",
    type: "Guesthouse",
    description: "Charming guesthouse near the Colosseum.",
    longDescription: "Step back in time at our Ancient Boutique guesthouse. Located on a cobblestone street near the Colosseum, we offer a unique blend of modern comfort and historic charm. Enjoy a complimentary Italian breakfast on our rooftop terrace.",
    price: 150,
    rating: 4.8,
    location: {
      address: "Via dei Fori Imperiali",
      city: "Rome",
      lat: 41.9028,
      lng: 12.4964,
    },
    amenities: ["wifi", "restaurant"],
    images: [
      { url: "https://picsum.photos/seed/g1/800/600", hint: "charming guesthouse" },
      { url: "https://picsum.photos/seed/rome-view/800/600", hint: "city view" },
      { url: "https://picsum.photos/seed/rome-room/800/600", hint: "cozy room" },
    ],
  },
  {
    id: "8",
    name: "Bali Beachfront Villa",
    type: "Villa",
    description: "Stunning private villa with direct beach access in Seminyak.",
    longDescription: "Your tropical paradise awaits. Our Bali Beachfront Villa in Seminyak offers a private pool, lush gardens, and direct access to the beach. The villa is staffed with a private chef and butler to cater to your every need.",
    price: 600,
    rating: 5.0,
    location: {
      address: "Jalan Pantai",
      city: "Seminyak",
      lat: -8.6912,
      lng: 115.158,
    },
    amenities: ["wifi", "pool", "parking", "spa"],
    images: [
      { url: "https://picsum.photos/seed/v1/800/600", hint: "private villa" },
      { url: "https://picsum.photos/seed/bali-beach/800/600", hint: "beach" },
      { url: "https://picsum.photos/seed/villa-pool/800/600", hint: "villa pool" },
    ],
  },
  {
    id: "9",
    name: "The Globetrotter Hostel",
    type: "Hostel",
    description: "A friendly and social hostel in Berlin's vibrant Kreuzberg.",
    longDescription: "Meet fellow travelers at The Globetrotter Hostel. Located in the heart of Kreuzberg, we're surrounded by art, culture, and nightlife. We offer clean dorms, private rooms, a communal kitchen, and daily social events.",
    price: 40,
    rating: 4.3,
    location: {
      address: "Oranienstrasse 10",
      city: "Berlin",
      lat: 52.52,
      lng: 13.405,
    },
    amenities: ["wifi"],
    images: [
      { url: "https://picsum.photos/seed/ho1/800/600", hint: "hostel room" },
      { url: "https://picsum.photos/seed/berlin-street/800/600", hint: "city street" },
      { url: "https://picsum.photos/seed/hostel-common/800/600", hint: "common room" },
    ],
  },
  {
    id: "10",
    name: "Cape Town Mountain View",
    type: "Apartment",
    description: "Apartment with a balcony overlooking Table Mountain.",
    longDescription: "Wake up to incredible views of Table Mountain. This modern apartment in Cape Town is bright, airy, and features a large balcony. It's a short drive to the city center, beaches, and hiking trails.",
    price: 250,
    rating: 4.7,
    location: {
      address: "Tafelberg Road",
      city: "Cape Town",
      lat: -33.9249,
      lng: 18.4241,
    },
    amenities: ["wifi", "parking", "pool"],
    images: [
      { url: "https://picsum.photos/seed/a1/800/600", hint: "modern apartment" },
      { url: "https://picsum.photos/seed/cape-town/800/600", hint: "mountain view" },
      { url: "https://picsum.photos/seed/apt-balcony/800/600", hint: "apartment balcony" },
    ],
  },
];
