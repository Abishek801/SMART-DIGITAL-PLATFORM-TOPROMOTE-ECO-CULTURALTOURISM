import {
  FaMapMarkerAlt,
  FaCloudSun,
  FaLeaf,
  FaSuitcaseRolling,
  FaCheckCircle,
  FaStar,
  FaInfoCircle,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Self-contained destination data — no DB required
const DESTINATIONS = {
  "mawlynnong-1": {
    id: "mawlynnong-1",
    name: "Mawlynnong Village",
    state: "Meghalaya",
    description:
      "Asia's cleanest village, a community-governed eco-paradise with living root bridges, bamboo walkways, and pristine natural beauty. A model for sustainable indigenous living.",
    image:
      "https://images.unsplash.com/photo-1593693397328-1fcda331ebd5?auto=format&fit=crop&q=80&w=1200",
    category: "Eco Village",
    sustainabilityScore: 98,
    latitude: 25.2072,
    longitude: 91.921,
    activities:
      "Root Bridge Trek,Village Walk,Bird Watching,Bamboo Walkway,Local Cuisine",
  },
  "spiti-2": {
    id: "spiti-2",
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    description:
      "A remote cold-desert mountain valley at 12,500 feet, home to ancient Buddhist monasteries and breathtaking Himalayan vistas that stretch to the horizon.",
    image:
      "https://images.unsplash.com/photo-1626714485844-cb72212f0f4a?auto=format&fit=crop&q=80&w=1200",
    category: "Adventure",
    sustainabilityScore: 90,
    latitude: 32.2461,
    longitude: 78.0357,
    activities:
      "Monastery Tours,High Altitude Trekking,Stargazing,Fossil Discovery,Yak Safari",
  },
  "majuli-3": {
    id: "majuli-3",
    name: "Majuli Island",
    state: "Assam",
    description:
      "The world's largest river island and a vibrant center of Assamese Neo-Vaishnavite culture, with centuries-old Satra monasteries and rich biodiversity.",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=1200",
    category: "Culture",
    sustainabilityScore: 85,
    latitude: 26.95,
    longitude: 94.1667,
    activities:
      "Mask Dance Workshops,Bamboo Craft,Boat Safaris,Satra Visits,Pottery Classes",
  },
  "khonoma-4": {
    id: "khonoma-4",
    name: "Khonoma Village",
    state: "Nagaland",
    description:
      "India's first green village and a remarkable conservation success story led by the Angami Naga tribe — protecting wildlife and cultural heritage for future generations.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
    category: "Eco Village",
    sustainabilityScore: 95,
    latitude: 25.6,
    longitude: 94.02,
    activities:
      "Tribal Culture Tour,Nature Walks,Homestay Dining,Wildlife Spotting,Photography",
  },
  "kumarakom-5": {
    id: "kumarakom-5",
    name: "Kumarakom",
    state: "Kerala",
    description:
      "A serene backwater paradise with a world-famous bird sanctuary, enchanting houseboat experiences through paddy-lined canals, and traditional Ayurvedic retreats.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    category: "Nature",
    sustainabilityScore: 88,
    latitude: 9.6167,
    longitude: 76.4333,
    activities:
      "Houseboat Cruise,Bird Watching,Ayurveda Spa,Village Cycling,Traditional Fishing",
  },
  "hampi-6": {
    id: "hampi-6",
    name: "Hampi",
    state: "Karnataka",
    description:
      "A UNESCO World Heritage Site rising from giant boulders amidst the ruins of the magnificent 14th-century Vijayanagara Empire — India's greatest medieval kingdom.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200",
    category: "Culture",
    sustainabilityScore: 82,
    latitude: 15.335,
    longitude: 76.4601,
    activities:
      "Temple Exploration,Coracle Ride,Rock Climbing,Cycle Tours,Sunset at Matanga Hill",
  },
};

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((id) => ({ id }));
}

export default async function DestinationDetail({ params }) {
  const { id } = await params;

  const destination = DESTINATIONS[id] || Object.values(DESTINATIONS)[0];

  const weather = { temp: 22, condition: "Clear Sky" };
  const ecoImpact = [
    "100% Solar Powered Stays",
    "Zero Plastic Zone",
    "Community-Led Tourism",
    "Direct Support to Artisans",
  ];
  const activities = destination.activities.split(",");

  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  const isRealKey = mapsKey && mapsKey !== "your-google-maps-api-key";
  const mapUrl = isRealKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${destination.latitude},${destination.longitude}`
    : `https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 animate-slide-up">
          <div className="flex items-center text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
            <FaMapMarkerAlt className="mr-2" /> {destination.state}
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 leading-tight tracking-tighter">
            {destination.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center">
              <FaLeaf className="mr-1.5" /> {destination.sustainabilityScore}{" "}
              Eco Score
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/20">
              {destination.category}
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-20">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center">
              <FaInfoCircle className="mr-4 text-emerald-400" /> About this
              Destination
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl font-medium">
              {destination.description}
            </p>
          </div>

          <div className="glass-panel p-10 border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <FaStar className="mr-3 text-emerald-400" /> Sustainability
              Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecoImpact.map((impact, i) => (
                <div
                  key={i}
                  className="flex items-center text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <FaCheckCircle className="text-emerald-500 mr-4 text-xl shrink-0" />
                  <span className="font-medium">{impact}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-8">
              Recommended Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className="glass-panel p-6 border-l-4 border-l-emerald-500 hover:translate-x-2 transition-transform cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-white">
                    {activity.trim()}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Sustainability Widget */}
          <div className="glass-panel p-8 border-emerald-500/20 bg-emerald-500/5 overflow-hidden relative">
            <FaLeaf className="absolute -right-8 -bottom-8 text-8xl text-emerald-500/10 -rotate-12" />
            <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Sustainability Pulse</h4>
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Eco-Score</span>
                <span className="text-white font-black text-3xl tracking-tighter leading-none">{destination.sustainabilityScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: `${destination.sustainabilityScore}%` }}></div>
              </div>
              <p className="text-slate-500 text-[10px] italic leading-relaxed">
                "Meeting highest benchmarks in zero-waste hospitality and biodiversity protection."
              </p>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="glass-panel p-8 border-amber-500/20 bg-amber-500/5">
            <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Real-time Atmos</h4>
            <div className="flex items-center gap-6 mb-6">
              <FaCloudSun className="text-4xl text-white opacity-80" />
              <div>
                <span className="text-4xl font-black text-white tracking-tighter">{weather.temp}°C</span>
                <p className="text-[10px] text-amber-500/60 font-black uppercase tracking-widest">{weather.condition}</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">
                Best time to visit: <span className="text-white">Oct - Mar</span>. Minimal rainfall expected.
              </p>
            </div>
          </div>

          {/* Location Mini-Map */}
          <div className="glass-panel p-0 h-64 overflow-hidden border-white/10 rounded-2xl relative group/map">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm pointer-events-none">
              <Link href="/map" className="btn btn-primary px-6 py-3 text-[10px] font-black uppercase tracking-widest pointer-events-auto">
                Expand Explorer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
