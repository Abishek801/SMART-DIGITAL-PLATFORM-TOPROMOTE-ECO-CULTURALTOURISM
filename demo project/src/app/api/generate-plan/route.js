import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { destination, days, interests, style, budget, save, userId } = body;

    // Fetch Weather (uses env variable check to avoid crash)
    let weatherData = {
      temp: 24,
      condition: "Partly Cloudy",
      alert:
        "Pleasant weather, perfect for outdoor exploration. Low chance of rain.",
    };

    const weatherKey = process.env.OPENWEATHER_API_KEY;
    if (
      weatherKey &&
      weatherKey !== "your-openweather-api-key" &&
      destination
    ) {
      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)},IN&units=metric&appid=${weatherKey}`,
        );
        if (weatherRes.ok) {
          const data = await weatherRes.json();
          weatherData = {
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            alert: `Humidity: ${data.main.humidity}%. Wind: ${data.wind.speed} m/s. Pack accordingly.`,
          };
        }
      } catch (e) {
        console.warn("Weather API call failed, using defaults.");
      }
    }

    const carbonSaved = (Math.random() * 25 + 30).toFixed(1);

    const activityMap = {
      Nature: [
        "Guided forest trail with a local naturalist",
        "Bird watching at a community reserve",
        "River kayaking through the valley",
      ],
      Culture: [
        "Workshop with local potters and artisans",
        "Traditional cooking class using farm produce",
        "Temple and heritage walk with a historian",
      ],
      Spirituality: [
        "Sunrise yoga by the riverside",
        "Meditation class at a community ashram",
        "Visit to ancient temples and sacred sites",
      ],
    };
    const activities = activityMap[interests] || activityMap["Nature"];

    const mockPlan = {
      weather: weatherData,
      route: {
        carbonSaved,
        suggestedTransport:
          budget === "Economy"
            ? "State Bus / Train"
            : budget === "Premium"
              ? "Private EV Cab"
              : "Electric Train / Carpool",
      },
      itinerary: Array.from({ length: parseInt(days) || 3 }).map((_, i) => ({
        day: i + 1,
        title: `${i === 0 ? "Arrival & Orientation" : i === parseInt(days) - 1 ? "Reflections & Departure" : `${interests} Immersion – Day ${i + 1}`}`,
        activities:
          i === 0
            ? `Arrive at ${destination || "your destination"}, check into your eco-certified ${style || "Comfort"}-style stay. Evening walk to get acquainted with the local community.`
            : i === parseInt(days) - 1
              ? `Final breakfast with homestay family. Visit the local artisan market for sustainable souvenirs. Depart with memories and impact.`
              : `Morning: ${activities[i % activities.length]}. Afternoon: Farm-to-table lunch with a local family. Evening: Cultural exchange and natural sunset viewing.`,
      })),
    };

    // Try saving to DB (won't crash if DB unavailable)
    if (save && userId) {
      try {
        const prisma = (await import("../../../lib/db")).default;
        await prisma.itinerary.create({
          data: {
            userId,
            destination: destination || "Unknown",
            interests: interests || "Nature",
            travelStyle: style || "Comfort",
            budget: budget || "Standard",
            duration: parseInt(days) || 3,
            planData: mockPlan,
            carbonFootprint: parseFloat(carbonSaved),
          },
        });
      } catch (dbErr) {
        console.warn("Could not save itinerary to DB:", dbErr.message);
      }
    }

    return NextResponse.json(mockPlan);
  } catch (error) {
    console.error("Generate plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 },
    );
  }
}
