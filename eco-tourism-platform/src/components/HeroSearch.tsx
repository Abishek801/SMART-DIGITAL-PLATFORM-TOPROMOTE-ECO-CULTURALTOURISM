import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSearch() {

  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/planner?destination=${destination}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg flex gap-4">

      <input
        type="text"
        placeholder="Where do you want to go?"
        className="border p-2 flex-1"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-green-700 text-white px-6 py-2 rounded"
      >
        Search
      </button>

    </div>
  );
}

export default HeroSearch;