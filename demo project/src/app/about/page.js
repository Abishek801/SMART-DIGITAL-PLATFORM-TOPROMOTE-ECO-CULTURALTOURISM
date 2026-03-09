import {
  FaLeaf,
  FaGlobeAsia,
  FaHandHoldingHeart,
  FaSearchLocation,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import Image from "next/image";


export const metadata = {
  title: "Our Mission | EcoCulture",
  description:
    "Promoting sustainable and culturally enriching travel through AI and community-led initiatives.",
};

export default function AboutPage() {
  const stats = [
    {
      label: "Destinations",
      value: "500+",
      icon: FaSearchLocation,
      color: "text-emerald-400",
    },
    {
      label: "Local Artisans",
      value: "1,200",
      icon: FaHandHoldingHeart,
      color: "text-amber-400",
    },
    {
      label: "Carbon Saved",
      value: "12.4 Tons",
      icon: FaLeaf,
      color: "text-emerald-500",
    },
    {
      label: "Global Reach",
      value: "15 Countries",
      icon: FaGlobeAsia,
      color: "text-blue-400",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-24 animate-fade-in min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-4 animate-float">
          Sustainability First
        </div>
        <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-tight tracking-tighter">
          Redefining <span className="text-emerald-500">Tourism</span> for the
          Better.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed opacity-90">
          EcoCulture is a digital bridge connecting conscious travelers with the
          soulful heritage of India while preserving our planet's future.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {stats.map((s, i) => (
          <div
            key={i}
            className="glass-panel p-10 text-center border-white/5 bg-white/5 transform hover:-translate-y-2 transition-all group animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <s.icon
              className={`text-4xl mx-auto mb-6 ${s.color} group-hover:scale-110 transition-transform`}
            />
            <div className="text-3xl font-black text-white mb-1">{s.value}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
        <div className="space-y-10 order-2 lg:order-1">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Our Vision for a <br />{" "}
            <span className="text-emerald-400">Green Future</span>
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-medium">
            <p>
              We believe that travel shouldn't cost the Earth. Every itinerary
              we generate is optimized through AI to favor low-carbon transit
              methods and eco-certified stays.
            </p>
            <p>
              By diversifying tourism beyond the overcrowded 'hotspots', we
              protect fragile ecosystems and ensure that cultural wealth is
              distributed fairly among indigenous communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 animate-fade-in delay-2">
            <div className="flex items-center gap-4 text-white font-bold">
              <FaShieldAlt className="text-emerald-500 text-2xl" /> 100%
              Verified Stays
            </div>
            <div className="flex items-center gap-4 text-white font-bold">
              <FaChartLine className="text-emerald-500 text-2xl" /> Real-time
              Monitoring
            </div>
          </div>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200"
            alt="Ecotourism"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-110 transition-duration-1000 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="glass-panel p-12 md:p-24 border-white/5 relative overflow-hidden text-center mb-40">
        <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-3xl -z-10"></div>
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Empowering Artisans.
          </h2>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">
            "Your purchase is more than a souvenir; it's a lifeline. We provide
            a direct digital stage for local artists to showcase their
            generational skills to a global audience."
          </p>
          <div className="flex justify-center gap-6">
            <button className="btn btn-primary px-10 py-4 text-xs font-black uppercase tracking-widest">
              Join the Movement
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
