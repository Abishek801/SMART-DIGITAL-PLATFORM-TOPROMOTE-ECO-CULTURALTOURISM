export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  origin: string;
  artisan: string;
  ecoScore: number;
  certifications: string[];
  featured: boolean;
  rating: number;
  reviews: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Handwoven Bamboo Basket Set",
    description: "Crafted by Assamese tribal artisans using locally sourced bamboo.",
    price: 1850,
    category: "HOME_DECOR",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    stock: 35,
    origin: "Assam, India",
    artisan: "Mishing Tribe Cooperative",
    ecoScore: 98,
    certifications: ["Fair Trade", "Zero Waste"],
    featured: true,
    rating: 4.9,
    reviews: 47,
  },
  {
    id: "p2",
    name: "Organic Nilgiri Blue Mountain Tea",
    description: "Single-origin Orthodox tea from the high-altitude Nilgiri mountains.",
    price: 650,
    category: "FOOD",
    imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
    stock: 120,
    origin: "Nilgiris, Tamil Nadu",
    artisan: "Glenmore Estate",
    ecoScore: 95,
    certifications: ["Organic India", "Rainforest Alliance"],
    featured: true,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "p3",
    name: "Madhubani Hand-Painted Silk Scarf",
    description: "Genuine Madhubani art painted on natural Tussar silk with vegetable-based dyes.",
    price: 2200,
    category: "CLOTHING",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
    stock: 18,
    origin: "Mithila, Bihar",
    artisan: "Padma Devi Artisan Group",
    ecoScore: 92,
    certifications: ["GI Tag", "Women Artisan"],
    featured: true,
    rating: 5.0,
    reviews: 28,
  },
  {
    id: "p4",
    name: "Cold-Pressed Coconut Oil (500ml)",
    description: "Virgin coconut oil cold-pressed from hand-picked Kerala coconuts.",
    price: 420,
    category: "WELLNESS",
    imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800",
    stock: 200,
    origin: "Thrissur, Kerala",
    artisan: "Coastal Farmer Cooperative",
    ecoScore: 99,
    certifications: ["FSSAI Organic", "Glass Packaged"],
    featured: false,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "p5",
    name: "Terracotta Planter Set (Set of 3)",
    description: "Hand-thrown terracotta planters from the pottery village of Khurja.",
    price: 1100,
    category: "HOME_DECOR",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    stock: 45,
    origin: "Khurja, Uttar Pradesh",
    artisan: "Potter's Guild of Khurja",
    ecoScore: 96,
    certifications: ["Natural Materials", "GI Tag"],
    featured: false,
    rating: 4.6,
    reviews: 34,
  },
  {
    id: "p6",
    name: "Cane & Jute Sling Bag",
    description: "Handcrafted sling bag combining cane lattice and hand-woven jute by women's SHGs.",
    price: 1350,
    category: "ACCESSORIES",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    stock: 28,
    origin: "Imphal, Manipur",
    artisan: "Ima Keithel Collective",
    ecoScore: 94,
    certifications: ["Women Artisan", "Zero Plastic"],
    featured: true,
    rating: 4.8,
    reviews: 19,
  },
];
