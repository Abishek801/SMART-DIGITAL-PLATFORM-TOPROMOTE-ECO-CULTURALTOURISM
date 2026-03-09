import { NextResponse } from "next/server";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Bamboo Woven Basket",
    description: "Hand-crafted basket made from locally sourced bamboo.",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=600",
    category: "Eco Crafts",
    state: "Assam",
  },
  {
    id: "2",
    name: "Warli Art Painting",
    description: "Traditional tribal art on hand-made paper.",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600",
    category: "Art",
    state: "Maharashtra",
  },
  {
    id: "3",
    name: "Pashmina Shawl",
    description: "Authentic hand-woven woolen shawl from Ladakh.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    category: "Cultural",
    state: "Jammu & Kashmir",
  },
  {
    id: "4",
    name: "Dokra Metal Craft",
    description: "Ancient lost wax technique metal figurine.",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600",
    category: "Art & Cultural",
    state: "Chhattisgarh",
  },
  {
    id: "5",
    name: "Jute Tote Bag",
    description: "Eco-friendly jute bag, hand-stitched by local women.",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?auto=format&fit=crop&q=80&w=600",
    category: "Eco Crafts",
    state: "West Bengal",
  },
  {
    id: "6",
    name: "Blue Pottery Vase",
    description: "Traditional Jaipur blue pottery art piece.",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=600",
    category: "Art",
    state: "Rajasthan",
  },
  {
    id: "7",
    name: "Madhubani Tapestry",
    description: "Colorful Madhubani art tapestry from Bihar.",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&q=80&w=600",
    category: "Art & Cultural",
    state: "Bihar",
  },
  {
    id: "8",
    name: "Coconut Shell Lamp",
    description: "Eco-lamp made from upcycled coconut shells.",
    price: 290,
    image:
      "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?auto=format&fit=crop&q=80&w=600",
    category: "Eco Crafts",
    state: "Kerala",
  },
  {
    id: "9",
    name: "Kondapalli Toy Set",
    description: "Hand-painted wooden toy set for children.",
    price: 530,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600",
    category: "Cultural",
    state: "Andhra Pradesh",
  },
];

export async function GET(req) {
  try {
    // Try to use Prisma if DB is available
    const prisma = (await import("../../../lib/db")).default;
    let products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (products.length === 0) {
      // Seed the DB with mock data
      await prisma.product.createMany({
        data: MOCK_PRODUCTS.map((p) => ({
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image,
          category: p.category,
          state: p.state,
        })),
      });
      products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.warn("DB not available, serving mock products:", error.message);
    return NextResponse.json(MOCK_PRODUCTS);
  }
}
