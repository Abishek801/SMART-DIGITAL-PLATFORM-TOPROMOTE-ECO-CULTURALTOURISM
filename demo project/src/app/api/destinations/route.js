import { NextResponse } from "next/server";

const MOCK_DESTINATIONS = [
  {
    id: "mawlynnong-1",
    name: "Mawlynnong Village",
    state: "Meghalaya",
    description:
      "Asia's cleanest village, known for its community-driven sanitation and stunning root bridges.",
    image:
      "https://images.unsplash.com/photo-1593693397328-1fcda331ebd5?auto=format&fit=crop&q=80&w=800",
    category: "Eco Village",
    sustainabilityScore: 98,
    latitude: 25.2072,
    longitude: 91.921,
    activities: "Root Bridge Trek,Village Walk,Bird Watching,Local Cuisine",
    createdAt: new Date().toISOString(),
  },
  {
    id: "spiti-2",
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    description:
      "A cold desert mountain valley known for ancient monasteries and stark, breathtaking landscapes.",
    image:
      "https://images.unsplash.com/photo-1626714485844-cb72212f0f4a?auto=format&fit=crop&q=80&w=800",
    category: "Adventure",
    sustainabilityScore: 90,
    latitude: 32.2461,
    longitude: 78.0357,
    activities: "Monastery Tours,High Altitude Trekking,Stargazing,Yak Safari",
    createdAt: new Date().toISOString(),
  },
  {
    id: "majuli-3",
    name: "Majuli Island",
    state: "Assam",
    description:
      "The world's largest river island, a vibrant center of Assamese culture and Vaishnavite monasteries.",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800",
    category: "Culture",
    sustainabilityScore: 85,
    latitude: 26.95,
    longitude: 94.1667,
    activities: "Mask Dance Workshops,Bamboo Craft,Boat Safaris,Satra Visits",
    createdAt: new Date().toISOString(),
  },
  {
    id: "khonoma-4",
    name: "Khonoma Village",
    state: "Nagaland",
    description:
      "India's first green village, a conservation success story of the Ao Naga tribe.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    category: "Eco Village",
    sustainabilityScore: 95,
    latitude: 25.6,
    longitude: 94.02,
    activities: "Tribal Culture Tour,Nature Walks,Homestay Dining,Photography",
    createdAt: new Date().toISOString(),
  },
  {
    id: "kumarakom-5",
    name: "Kumarakom",
    state: "Kerala",
    description:
      "A backwater paradise with a bird sanctuary, houseboat experiences, and lush paddy fields.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    category: "Nature",
    sustainabilityScore: 88,
    latitude: 9.6167,
    longitude: 76.4333,
    activities: "Houseboat Cruise,Bird Watching,Ayurveda Spa,Village Cycling",
    createdAt: new Date().toISOString(),
  },
  {
    id: "hampi-6",
    name: "Hampi",
    state: "Karnataka",
    description:
      "A UNESCO World Heritage Site with the ruins of the magnificent Vijayanagara Empire.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    category: "Culture",
    sustainabilityScore: 82,
    latitude: 15.335,
    longitude: 76.4601,
    activities: "Temple Exploration,Coracle Ride,Rock Climbing,Cycle Tours",
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const category = searchParams.get("category");

  try {
    const prisma = (await import("../../../lib/db")).default;
    const where = {};
    if (state) where.state = state;
    if (category) where.category = category;

    let destinations = await prisma.destination.findMany({
      where,
      orderBy: { sustainabilityScore: "desc" },
    });

    if (destinations.length === 0) {
      await prisma.destination.createMany({
        data: MOCK_DESTINATIONS.map((d) => ({
          id: d.id,
          name: d.name,
          state: d.state,
          description: d.description,
          image: d.image,
          category: d.category,
          sustainabilityScore: d.sustainabilityScore,
          latitude: d.latitude,
          longitude: d.longitude,
          activities: d.activities,
        })),
        skipDuplicates: true,
      });
      destinations = await prisma.destination.findMany({
        where,
        orderBy: { sustainabilityScore: "desc" },
      });
    }
    return NextResponse.json(destinations);
  } catch (error) {
    console.warn("DB not available, serving mock destinations:", error.message);
    let filtered = MOCK_DESTINATIONS;
    if (state) filtered = filtered.filter((d) => d.state === state);
    if (category) filtered = filtered.filter((d) => d.category === category);
    return NextResponse.json(filtered);
  }
}
