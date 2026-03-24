import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const destCount = await prisma.destination.count();
  const prodCount = await prisma.product.count();
  
  console.log(`Destination count: ${destCount}`);
  console.log(`Product count: ${prodCount}`);
  
  if (destCount === 24 && prodCount === 30) {
    console.log('✅ Counts are correct!');
  } else {
    console.log('❌ Counts are incorrect!');
  }
}

main().finally(() => prisma.$disconnect());
