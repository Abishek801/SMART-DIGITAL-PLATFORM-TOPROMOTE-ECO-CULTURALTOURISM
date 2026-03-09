interface Props {
  place: string;
}

function TravelCard({ place }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition">

      <h3 className="text-xl font-bold text-green-700">
        {place}
      </h3>

      <p className="mt-2 text-gray-600">
        Eco-friendly destination known for nature and culture.
      </p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Explore
      </button>

    </div>
  );
}

export default TravelCard;