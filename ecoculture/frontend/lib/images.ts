// lib/images.ts
// Central registry — change URLs in ONE place

export const DESTINATION_IMAGES: Record<string, {
  hero: string;
  gallery: string[];
  thumbnail: string;
  fallback: string;
}> = {
  "munnar-eco-village": {
    hero: "https://picsum.photos/seed/munnar-eco-village-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/munnar-eco-village-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/munnar-gallery-1/800/600",
      "https://picsum.photos/seed/munnar-gallery-2/800/600",
      "https://picsum.photos/seed/munnar-gallery-3/800/600",
      "https://picsum.photos/seed/munnar-gallery-4/800/600",
    ],
    fallback: "https://picsum.photos/seed/munnar-fallback/800/600",
  },
  "hampi-cultural-heritage": {
    hero: "https://picsum.photos/seed/hampi-cultural-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/hampi-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/hampi-gallery-1/800/600",
      "https://picsum.photos/seed/hampi-gallery-2/800/600",
      "https://picsum.photos/seed/hampi-gallery-3/800/600",
    ],
    fallback: "https://picsum.photos/seed/hampi-fallback/800/600",
  },
  "valley-of-flowers-trek": {
    hero: "https://picsum.photos/seed/valley-flowers-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/valley-flowers-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/valley-gallery-1/800/600",
      "https://picsum.photos/seed/valley-gallery-2/800/600",
    ],
    fallback: "https://picsum.photos/seed/valley-fallback/800/600",
  },
  "sundarbans-wildlife": {
    hero: "https://picsum.photos/seed/sundarbans-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/sundarbans-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/sundarbans-gallery-1/800/600",
      "https://picsum.photos/seed/sundarbans-gallery-2/800/600",
    ],
    fallback: "https://picsum.photos/seed/sundarbans-fallback/800/600",
  },
  "auroville-township": {
    hero: "https://picsum.photos/seed/auroville-township-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/auroville-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/auroville-gallery-1/800/600",
      "https://picsum.photos/seed/auroville-gallery-2/800/600",
    ],
    fallback: "https://picsum.photos/seed/auroville-fallback/800/600",
  },
  "spiti-valley-desert": {
    hero: "https://picsum.photos/seed/spiti-valley-hero/1200/800",
    thumbnail: "https://picsum.photos/seed/spiti-thumb/400/300",
    gallery: [
      "https://picsum.photos/seed/spiti-gallery-1/800/600",
      "https://picsum.photos/seed/spiti-gallery-2/800/600",
    ],
    fallback: "https://picsum.photos/seed/spiti-fallback/800/600",
  },
};

export const PRODUCT_IMAGES: Record<string, {
  main: string;
  gallery: string[];
  lifestyle: string;
}> = {
  "p1": {
    main: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    lifestyle: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    ],
  },
  "p2": {
    main: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
    lifestyle: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600",
    ],
  },
  "p3": {
    main: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
    lifestyle: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200",
    gallery: [],
  },
  "p4": {
    main: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800",
    lifestyle: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=1200",
    gallery: [],
  },
  "p5": {
    main: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    lifestyle: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
    gallery: [],
  },
  "p6": {
    main: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    lifestyle: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200",
    gallery: [],
  },
};

// Avatar generator (never breaks)
export function getAvatarUrl(seed: string, style: "avataaars" | "personas" | "initials" = "avataaars"): string {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1C3829`;
}

// Generic fallback for unknown slugs
export function getDestinationImage(slug: string): string {
  return DESTINATION_IMAGES[slug]?.hero || 
    `https://picsum.photos/seed/${slug}/1200/800`;
}

export function getProductImage(slug: string): string {
  return PRODUCT_IMAGES[slug]?.main ||
    `https://picsum.photos/seed/${slug}-product/500/500`;
}
