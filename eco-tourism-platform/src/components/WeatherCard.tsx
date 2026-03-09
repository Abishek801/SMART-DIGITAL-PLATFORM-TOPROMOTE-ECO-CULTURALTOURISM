import { useState } from "react";
import { getWeather } from "../services/weatherService";

function WeatherCard() {

  const [city, setCity] = useState<string>("");

  const [weather, setWeather] = useState<{
    name: string;
    main: { temp: number };
    weather: { main: string }[];
  } | null>(null);

  const fetchWeather = async () => {

    if (!city) return;

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
    }

  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">

      <h2 className="text-xl font-bold mb-4">
        Check Weather
      </h2>

      <input
        type="text"
        placeholder="Enter city"
        className="border p-2 w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={fetchWeather}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Get Weather
      </button>

      {weather && (
        <div className="mt-4">
          
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].main}</p>

        </div>
      )}

    </div>
  );
}

export default WeatherCard;