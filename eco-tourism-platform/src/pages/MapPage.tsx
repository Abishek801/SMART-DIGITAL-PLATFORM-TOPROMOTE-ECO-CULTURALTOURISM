import { useState } from "react";
import EcoMap from "../components/EcoMap";
import { generateTravelPlan } from "../services/travelService";
import WeatherCard from "../components/WeatherCard";

function MapPage() {

  const [destination, setDestination] = useState("");
  const [plan, setPlan] = useState("");

  const generatePlan = () => {
    const result = generateTravelPlan(destination, 3);
    setPlan(result);
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Eco Tourism Map Explorer
      </h1>

      <EcoMap />

      <div className="mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Selected Destination
        </h2>

        <input
          type="text"
          placeholder="Enter destination (Munnar, Ooty, Coorg)"
          className="border p-2 w-full"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button
          onClick={generatePlan}
          className="mt-3 bg-green-700 text-white px-4 py-2 rounded"
        >
          Generate AI Itinerary
        </button>

      </div>

      {plan && (
        <div className="mt-6 bg-green-50 p-4 rounded">

          <h3 className="font-bold mb-2">
            AI Travel Plan
          </h3>

          <pre>{plan}</pre>

        </div>
      )}

      <div className="mt-10">
        <WeatherCard />
      </div>

    </div>
  );
}

export default MapPage;