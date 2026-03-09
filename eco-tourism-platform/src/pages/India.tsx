import TravelCard from "../components/TravelCard";

function India() {

  const ecoDestinations = [
    "Ooty",
    "Munnar",
    "Coorg",
    "Wayanad",
    "Kaziranga",
    "Sundarbans"
  ];

  return (
    <div>

      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Eco Tourism in India
      </h1>

      <p className="mb-8 text-gray-700">
        Discover some of the best eco-friendly travel destinations across India
        including forests, wildlife sanctuaries and cultural heritage sites.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {ecoDestinations.map((place, index) => (
          <TravelCard key={index} place={place} />
        ))}

      </div>

    </div>
  );
}

export default India;