import { PrismaClient } from '@prisma/client';
import { destinations } from './data/destinations';
import { products } from './data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Clear existing data in correct order to avoid foreign key violations
    console.log('🧹 Cleaning up database...');
    // We can use a direct query to speed up and be safe
    const tables = [
      'OrderItem', 'Order', 'Booking', 'Review', 'SavedDestination',
      'ItineraryItem', 'Itinerary', 'Product', 'Destination', 'User'
    ];
    
    // In SQLite we can't easily turn off FKs without a pragma, but we delete in order
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.savedDestination.deleteMany({});
    await prisma.itineraryItem.deleteMany({});
    await prisma.itinerary.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.destination.deleteMany({});
    // Keep users to avoid breaking things, or delete if wanted. We'll keep them for now.

    // 2. Seed Destinations
    console.log(`📍 Seeding ${destinations.length} destinations...`);
    for (const dest of destinations) {
      const { galleryUrls, highlights, ...rest } = dest;
      await prisma.destination.upsert({
        where: { slug: dest.slug },
        update: {
          ...(rest as any),
          galleryUrls: JSON.stringify(galleryUrls),
          highlights: JSON.stringify(highlights),
        },
        create: {
          ...(rest as any),
          galleryUrls: JSON.stringify(galleryUrls),
          highlights: JSON.stringify(highlights),
        },
      });
    }

    // 3. Seed Products
    console.log(`🛍️ Seeding ${products.length} products...`);
    for (const product of products) {
      const { galleryUrls, certifications, ...rest } = product;
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          ...(rest as any),
          galleryUrls: JSON.stringify(galleryUrls),
          certifications: JSON.stringify(certifications),
        },
        create: {
          ...(rest as any),
          galleryUrls: JSON.stringify(galleryUrls),
          certifications: JSON.stringify(certifications),
        },
      });
    }

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
