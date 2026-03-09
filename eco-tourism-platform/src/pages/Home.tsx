import TourCard from "../components/TourCard";
import EcoMap from "../components/EcoMap";

function Home() {
  return (
    <div>

      {/* HERO SECTION */}

      <section className="h-[80vh] bg-[url('/hero.jpg')] bg-cover bg-center flex items-center justify-center">

        <div className="text-center bg-black/40 p-10 rounded text-white">

          <h1 className="text-5xl font-bold">
            Explore Eco Tourism
          </h1>

          <p className="mt-4 text-lg">
            Sustainable travel powered by AI
          </p>

          <button className="mt-6 bg-green-600 px-6 py-3 rounded">
            Plan Your Trip
          </button>

        </div>

      </section>

      {/* POPULAR TOURS */}

      <section className="max-w-6xl mx-auto py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Eco Tours
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <TourCard title="Munnar Eco Escape" price="₹12,000" />
          <TourCard title="Ooty Nature Retreat" price="₹10,500" />
          <TourCard title="Coorg Coffee Trails" price="₹11,500" />

        </div>

      </section>

      {/* DESTINATION MAP */}

      <section className="max-w-6xl mx-auto py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Eco Destinations
        </h2>

        <EcoMap />

      </section>

      {/* WHY CHOOSE US */}

      <section className="bg-green-100 py-16">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div>
            <h3 className="text-xl font-bold">Eco Friendly</h3>
            <p>Promoting sustainable tourism.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Local Culture</h3>
            <p>Supporting artisans and traditions.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">AI Travel Planner</h3>
            <p>Personalized trip generation.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;