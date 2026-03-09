import { useState } from "react";
import { generateTravelPlan } from "../services/travelService";

function TravelForm() {

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [plan, setPlan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = generateTravelPlan(destination, Number(days));
    setPlan(result);
  };

  return (
    <div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >

        <input
          type="text"
          placeholder="Destination"
          className="border p-2 w-full"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Days"
          className="border p-2 w-full"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Generate AI Plan
        </button>

      </form>

      {plan && (
        <div className="mt-6 bg-green-50 p-4 rounded">

          <h3 className="font-bold mb-2">
            AI Travel Plan
          </h3>

          <pre>{plan}</pre>

        </div>
      )}

    </div>
  );
}

export default TravelForm;