import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mock logic based on keywords
    let reply =
      "I can help you filter destinations based on your interests, travel style, budget, and duration. Ask me something like 'suggest a low-budget trip for 4 days'!";

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("waterfall") || lowerMsg.includes("nature")) {
      reply =
        "For nature lovers, I highly recommend Meghalaya or Kerala. Both offer incredible waterfalls and eco-stays.";
    } else if (lowerMsg.includes("culture") || lowerMsg.includes("artisan")) {
      reply =
        "If you're interested in culture and artisans, you should explore Hampi or Majuli! Our platform connects you directly with local craftspeople.";
    } else if (lowerMsg.includes("budget") || lowerMsg.includes("cheap")) {
      reply =
        "Backpacking to Spiti Valley or local homestays in Nagaland are great options for a low budget while supporting the rural economy.";
    } else if (lowerMsg.includes("plan") || lowerMsg.includes("book")) {
      reply =
        "You can generate a detailed, personalized itinerary by visiting our 'Plan Trip' page from the top navigation bar.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 },
    );
  }
}
