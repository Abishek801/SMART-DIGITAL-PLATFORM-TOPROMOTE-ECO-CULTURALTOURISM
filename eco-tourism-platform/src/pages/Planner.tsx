import TravelForm from "../components/TravelForm";
import WeatherCard from "../components/WeatherCard";

function Planner() {
  return (
    <div>

      <h1 className="text-4xl font-bold text-green-800 mb-6">
        AI Travel Planner
      </h1>

      <TravelForm />

      <div className="mt-10">
        <WeatherCard />
      </div>

    </div>
  );
}

export default Planner;