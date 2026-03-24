"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin, Leaf, TrendingDown, Clock, Users, CalendarDays, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { ALL_DESTINATIONS } from "@/lib/data/destinations";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage, DESTINATION_IMAGES } from "@/lib/images";
import { useWeather } from "@/hooks/useWeather";
import WeatherAnimations from "@/components/weather/WeatherAnimations";
import WeatherWidget from "@/components/weather/WeatherWidget";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DestinationDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [mounted, setMounted] = useState(false);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(4);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destination = ALL_DESTINATIONS.find((d) => d.slug === slug);
  if (!destination) {
    notFound();
  }

  const { data: weatherData, loading: weatherLoading } = useWeather(destination.lat, destination.lng);

  // Generic data for Radar Chart
  const sustainabilityData = [
    { subject: "Energy", A: 95, fullMark: 100 },
    { subject: "Water", A: 88, fullMark: 100 },
    { subject: "Waste", A: 92, fullMark: 100 },
    { subject: "Community", A: 98, fullMark: 100 },
    { subject: "Biodiversity", A: 85, fullMark: 100 },
  ];

  // Placeholder images for masonry
  const masonryGallery = [
    dGallery(destination.imageUrl, 1),
    dGallery(destination.imageUrl, 2),
    dGallery(destination.imageUrl, 3),
    dGallery(destination.imageUrl, 4),
  ];

  function dGallery(baseImg: string, index: number) {
    // Hacky way to get variations of the unsplash image for demo purposes
    if (baseImg.includes("unsplash")) {
      return baseImg.replace("w=600", `w=${600 + index}`).replace("w=800", `w=${800 + index}`);
    }
    return baseImg;
  }

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const totalCost = destination.avgCost * guests * nights * 85;

  const handleBook = async () => {
    if (isBooking) return;
    setIsBooking(true);
    try {
      // 1. Fetch live destination from backend via slug to get its UUID
      const destRes = await fetch(`/api/destinations/${destination.slug}`);
      if (!destRes.ok) throw new Error("Failed to resolve backend destination");
      const backendDest = await destRes.json();

      // 2. Post to our authenticated proxy
      const checkInDate = new Date();
      const checkOutDate = new Date();
      checkOutDate.setDate(checkOutDate.getDate() + nights);

      const bookRes = await fetch("/api/users/me/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationId: backendDest.id,
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          guests: guests,
          notes: "Booked direct from Destination Page"
        })
      });

      if (!bookRes.ok) throw new Error("Failed to create booking");
      
      toast.success(`Booking confirmed for ${destination.name}! Check your dashboard.`, { duration: 5000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to process booking. Please ensure backend is running.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink pb-32">
      {/* ─── MASSIVE PARALLAX HERO ────────────────────────────────── */}
      <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <SmartImage
            src={getDestinationImage(destination.slug)}
            alt={destination.name}
            aspectRatio="hero"
            priority
            className="w-full h-full"
          />
        </motion.div>
        
        {/* Weather Animation Overlay */}
        {weatherData && <WeatherAnimations condition={weatherData.condition} />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-xl z-10 pb-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl"
            >
              <Link href="/destinations" className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors mb-10 font-mono text-xs tracking-widest uppercase">
                <ArrowLeft size={14} /> Back to Directory
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded border border-white/20 bg-white/5 backdrop-blur font-mono text-[10px] uppercase tracking-widest text-white">
                  {destination.category.replace("_", " ")}
                </span>
                <span className="flex items-center gap-1.5 text-stone-300 font-body text-sm">
                  <MapPin size={14} className="text-leaf" /> {destination.region}, {destination.country}
                </span>
              </div>

              <h1 className="font-display text-[clamp(48px,6vw,96px)] font-light text-white leading-[0.9] tracking-tightest mb-6 drop-shadow-lg">
                {destination.name}
              </h1>
              
              <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md border-l-2 border-leaf pl-4">
                {destination.shortDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT GRID ───────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-xl py-16 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Column: Details & Masonry Grid */}
        <div className="w-full lg:w-[60%]">
          
          <div className="flex gap-4 md:gap-8 mb-16 border-b border-white/10 pb-10 overflow-x-auto">
            <div className="w-1/3 shrink-0">
              <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Pace</span>
              <span className="font-body text-lg text-white">{destination.difficulty}</span>
            </div>
            <div className="w-1/3 shrink-0">
              <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Ideal Window</span>
              <span className="font-body text-lg text-white">{destination.bestSeason}</span>
            </div>
            <div className="w-1/3 shrink-0">
              <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Scale</span>
              <span className="font-body text-lg text-white">12 Guests Max</span>
            </div>
          </div>

          <div className="prose prose-invert prose-stone max-w-none font-body mb-20">
            <h2 className="font-display text-4xl text-white font-light mb-8">The Experience</h2>
            <p className="text-lg text-stone-300 leading-relaxed mb-6">
              Immerse yourself in the authentic rhythm of {destination.name}, where every aspect of your stay is designed with profound ecological respect. As part of the {destination.region} biosphere, this sanctuary represents the pinnacle of regenerative luxury.
            </p>
            <p className="text-stone-400 leading-relaxed">
              Unlike commercial resorts, your presence here directly funds local conservation initiatives and empowers the indigenous communities that have protected this land for centuries. You'll wake up to the sound of untouched nature, engage in traditional practices, and leave with a verifiable zero-carbon footprint carefully tracked by our platform.
            </p>
          </div>

          {/* Masonry Image Gallery */}
          <div className="mb-20">
            <h3 className="font-display text-3xl text-white font-light mb-8">Visual Archives</h3>
               {((DESTINATION_IMAGES[destination.slug]?.gallery) || [
                 getDestinationImage(destination.slug),
                 getDestinationImage(destination.slug + "-1"),
                 getDestinationImage(destination.slug + "-2"),
                 getDestinationImage(destination.slug + "-3"),
               ]).map((img, i) => (
                 <div key={i} className={`relative w-full rounded-2xl overflow-hidden break-inside-avoid border border-white/5 ${i % 2 === 0 ? "h-64" : "h-96"}`}>
                   <SmartImage 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    aspectRatio="portrait"
                    hoverZoom={true}
                    className="w-full h-full" 
                   />
                 </div>
               ))}
          </div>

          {/* Sustainability Details */}
          <div>
            <h3 className="font-display text-3xl text-white font-light mb-8">Ecological Commitment</h3>
            <ul className="space-y-4">
              {[
                "100% powered by on-site renewable microgrids.",
                "Zero-waste food systems sourcing entirely from regenerative farms within a 50km radius.",
                `80% of booking fees are reinvested into the ${destination.region} community trust.`
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 p-6 glass rounded-2xl border border-white/5">
                  <CheckCircle2 className="text-leaf shrink-0 mt-0.5" size={20} />
                  <span className="text-stone-300 font-body leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget & Radar */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-32 z-20 space-y-8">
            
            {/* Live Weather Widget */}
            {weatherData && (
              <WeatherWidget data={weatherData} />
            )}
            
            {/* Eco Ratings Radar Widget */}
            <div className="glass rounded-panel p-8 border border-white/5 shadow-surface">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl text-white font-medium">Impact Matrix</h3>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-leaf/20 flex items-center justify-center text-leaf font-mono font-bold text-sm">
                    {destination.sustainabilityScore}
                  </div>
                </div>
              </div>
              
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={sustainabilityData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#4A8B5C" fill="#4A8B5C" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono tracking-widest uppercase text-stone-500">
                <TrendingDown size={14} className="text-gold" />
                <span>{destination.carbonSaved}T Carbon Mitigated</span>
              </div>
            </div>

            {/* Booking Configurator */}
            <div className="glass rounded-panel p-8 border border-white/5 shadow-surface">
              <h3 className="font-display text-2xl font-medium text-white mb-2">Configure Journey</h3>
              <p className="text-stone-400 text-sm font-body mb-8">Verified zero-emission expedition</p>

              <div className="space-y-4 mb-8">
                {/* Guests */}
                <div className="bg-ink-soft rounded-xl p-4 border border-white/5">
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-stone-500 mb-3 hover:text-white transition-colors">Party Size</label>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">-</button>
                    <span className="font-display text-2xl text-white">{guests}</span>
                    <button onClick={() => setGuests(Math.min(10, guests + 1))} className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">+</button>
                  </div>
                </div>

                {/* Nights */}
                <div className="bg-ink-soft rounded-xl p-4 border border-white/5">
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-stone-500 mb-3 hover:text-white transition-colors">Duration (Nights)</label>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">-</button>
                    <span className="font-display text-2xl text-white">{nights}</span>
                    <button onClick={() => setNights(Math.min(30, nights + 1))} className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-center mb-3 text-stone-300 font-body text-sm">
                  <span>Expedition cost</span>
                  <span className="font-mono text-white">₹{(destination.avgCost * guests * nights * 85).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-leaf font-body text-sm">
                  <span className="flex items-center gap-1.5"><Leaf size={14}/> Impact Rebate applied</span>
                  <span className="font-mono">-₹1,500</span>
                </div>
                
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-stone-500 font-mono text-[10px] uppercase tracking-widest">Total Investment</span>
                  <span className="font-display text-4xl font-light text-white">
                    {mounted ? `₹${(totalCost - 1500).toLocaleString()}` : '...'}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleBook}
                disabled={isBooking}
                className="w-full h-14 bg-white text-ink font-heading font-semibold tracking-wide text-lg rounded-pill hover:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isBooking ? (
                  <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Initiate Booking"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
