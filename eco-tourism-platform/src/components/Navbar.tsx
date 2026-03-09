import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold text-green-700">
          EcoTour AI
        </h1>

        <div className="space-x-6 font-medium">

          <Link to="/">Home</Link>
          <Link to="/india">Destinations</Link>
          <Link to="/planner">Trip Planner</Link>
          <Link to="/map">Eco Map</Link>
          <Link to="/contact">Contact</Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;