import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    // Return mock data if no API key is provided for development
    return NextResponse.json({
      main: { temp: 24, humidity: 65 },
      weather: [{ main: "Clouds", description: "scattered clouds" }],
      wind: { speed: 3.5 },
      name: "Eco-Location",
      mock: true
    });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 600 } } // Cache for 10 minutes
    );

    if (!res.ok) {
      throw new Error("Weather API failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
