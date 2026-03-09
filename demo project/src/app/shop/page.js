"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "../../components/LoginModal";
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";
import Image from "next/image";
import { useToast } from "../../components/Toast";

function ProductSkeleton() {
  return (
    <div className="glass-panel p-0 overflow-hidden flex flex-col h-full border-white/5">
      <div className="h-56 skeleton w-full"></div>
      <div className="p-6 space-y-3">
        <div className="h-2 skeleton w-16"></div>
        <div className="h-6 skeleton w-full"></div>
        <div className="h-10 skeleton w-full"></div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { status } = useSession();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Eco Crafts", "Art", "Cultural", "Art & Cultural"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const states = ["All", ...new Set(products.map((p) => p.state))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchesState = filterState === "All" || p.state === filterState;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesState && matchesSearch;
  });

  const handleAddToCart = (productName) => {
    if (status === "unauthenticated") {
      setShowLogin(true);
    } else {
      addToast(`"${productName}" added to your eco-cart!`, "success");
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 animate-fade-in min-h-screen">
      {/* Header - Compacted */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 leading-tight tracking-tighter">
          Artisan Hub
        </h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Indigenous handicrafts and sustainable treasures curated from local heartlands.
        </p>
      </div>

      {/* Filters Bar - Compacted */}
      <div className="glass-panel p-1.5 mb-12 flex flex-col xl:flex-row items-center gap-1.5 shadow-xl border-white/5 rounded-2xl">
        <div className="relative w-full xl:w-72 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 text-sm" />
          <input
            type="text"
            placeholder="Search crafts..."
            className="input-glass pl-10 py-3 bg-transparent border-none focus:ring-0 text-sm font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="h-px xl:h-8 w-full xl:w-px bg-white/10"></div>

        <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0">
              Category:
            </span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${filterCategory === cat
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "bg-white/5 text-slate-500 hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0">
              State:
            </span>
            <select
              className="bg-slate-900 border border-white/10 rounded-lg py-1.5 px-4 text-[9px] font-black uppercase text-white tracking-widest focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid - Compacted */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => <ProductSkeleton key={i} />)
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className="glass-panel p-0 overflow-hidden grid-card-container group hover:border-emerald-500/40 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-52 relative overflow-hidden bg-slate-800 shrink-0">
                <div className="absolute top-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[7px] font-black text-white uppercase tracking-widest border border-white/10">
                  {product.category}
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center text-emerald-500 text-[7px] font-black uppercase tracking-widest mb-1.5">
                  <FaMapMarkerAlt className="mr-1.5" /> {product.state}
                </div>
                <h3 className="text-base font-black text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors font-heading tracking-tight">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-[10px] leading-relaxed mb-6 line-clamp-2-eco font-medium opacity-80">
                  {product.description ||
                    "Authentic regional handicraft supporting local sustainable livelihood."}
                </p>

                <div className="grid-card-footer border-t border-white/5 flex justify-between items-center">
                  <span className="text-lg font-black text-white tracking-tight">
                    ₹{product.price}
                  </span>
                  <button
                    className="btn btn-primary px-4 py-2 text-[8px] flex items-center shadow-lg"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <FaShoppingCart className="mr-2" /> Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-40 glass-panel border-dashed border-white/10 opacity-40">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">
              No results found.
            </p>
          </div>
        )}
      </div>

      {/* Artisan Stories - NEW */}
      <section className="mt-32 pt-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-4 tracking-tighter uppercase">
              Artisan Voices
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Meet the masters preserving centuries of cultural heritage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Amala Devi",
              craft: "Pashmina Weaving",
              region: "Leh, Ladakh",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
              story: "Amala has been weaving Pashmina for 40 years, keeping the nomadic traditions of the Changpa tribe alive through sustainable mountain wool."
            },
            {
              name: "Karan Murmu",
              craft: "Dhokra Art",
              region: "Bastar, Chhattisgarh",
              img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
              story: "Using the lost-wax casting technique, Karan creates bronze artifacts that tell the stories of forest deities and tribal folklore."
            }
          ].map((artisan, i) => (
            <div key={i} className="glass-panel p-6 flex flex-col sm:flex-row gap-8 items-center border-white/5 group hover:bg-white/[0.02]">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/20 shrink-0 relative">
                <Image src={artisan.img} alt={artisan.name} fill className="object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-emerald-500 text-[8px] font-black uppercase tracking-widest mb-1">{artisan.region}</div>
                <h3 className="text-xl font-black text-white mb-2">{artisan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed italic opacity-80 mb-4">"{artisan.story}"</p>
                <div className="text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full inline-block">
                  Master of {artisan.craft}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}
