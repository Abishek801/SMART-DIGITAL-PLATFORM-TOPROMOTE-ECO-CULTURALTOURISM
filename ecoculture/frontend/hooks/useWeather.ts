"use client";

import { useState, useEffect } from "react";
import { WeatherCondition } from "@/components/weather/WeatherAnimations";

interface WeatherData {
  temp: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  locationName: string;
}

export function useWeather(lat?: number, lng?: number) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lng}`);
        const rawData = await res.json();

        if (rawData.error) throw new Error(rawData.error);

        // Map OpenWeather concepts to our WeatherCondition type
        let condition: WeatherCondition = "CLEAR_DAY";
        const main = rawData.weather?.[0]?.main;
        const id = rawData.weather?.[0]?.id;

        if (main === "Rain" || main === "Drizzle") condition = "RAIN";
        else if (main === "Thunderstorm") condition = "THUNDERSTORM";
        else if (main === "Snow") condition = "SNOW";
        else if (main === "Clouds") condition = "CLOUDY";
        else if (main === "Clear") condition = "CLEAR_DAY";
        else if (id >= 701 && id <= 781) condition = "FOG"; // Atmosphere ids

        // Temperature adjustments
        if (rawData.main.temp > 32) condition = "HOT";
        if (rawData.main.temp < 5) condition = "COLD" as any; // COLD is a valid condition in our types but Snow/Fog might override

        setData({
          temp: Math.round(rawData.main.temp),
          condition,
          description: rawData.weather?.[0]?.description,
          humidity: rawData.main.humidity,
          windSpeed: rawData.wind.speed,
          locationName: rawData.name
        });
      } catch (err: any) {
        setError(err.message);
        // Fallback to mock data on error
        setData({
          temp: 24,
          condition: "CLOUDY",
          description: "Partly cloudy",
          humidity: 60,
          windSpeed: 4,
          locationName: "Discovery Point"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lng]);

  return { data, loading, error };
}
