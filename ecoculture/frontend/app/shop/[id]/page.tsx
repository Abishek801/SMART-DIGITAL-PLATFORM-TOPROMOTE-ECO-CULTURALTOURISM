"use client";

import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/useCartStore";
import { motion } from "framer-motion";
import { Leaf, Award, ShoppingCart, Star, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getProductImage } from "@/lib/images";
import toast from "react-hot-toast";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  const { addItem, setCartOpen } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    setCartOpen(true);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">

        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-stone-500 hover:text-white font-mono text-xs uppercase tracking-widest mb-10 transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Panel */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/5 shadow-2xl">
              <SmartImage
                src={getProductImage(product.id)}
                alt={product.name}
                aspectRatio="square"
                hoverZoom={true}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 text-leaf border border-leaf/20">
                  <Leaf size={11} />
                  <span className="text-[11px] font-mono font-bold">Eco Score {product.ecoScore}</span>
                </div>
                {product.featured && (
                  <div className="flex items-center gap-1.5 bg-clay/20 backdrop-blur-md rounded-full px-3 py-1.5 text-clay border border-clay/20">
                    <Award size={11} />
                    <span className="text-[11px] font-mono font-bold uppercase">Featured</span>
                  </div>
                )}
              </div>
            </div>

            {/* Extra image placeholders for gallery feel */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-xl overflow-hidden border border-white/5 aspect-square opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <SmartImage src={getProductImage(product.id)} alt={product.name} aspectRatio="square" className="w-full h-full" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details Panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">{product.category.replace("_", " ")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-medium text-white mb-3 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? "text-clay fill-clay" : "text-stone-700"} />
                ))}
              </div>
              <span className="font-mono text-xs text-stone-400">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="font-body text-stone-300 text-base leading-relaxed mb-8">{product.description}</p>

            {/* Artisan Story */}
            <div className="glass rounded-2xl p-5 mb-8 border border-white/5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">Artisan</h3>
              <p className="font-display text-lg font-medium text-white mb-1">{product.artisan}</p>
              <p className="font-body text-xs text-stone-400 flex items-center gap-1.5">
                <Package size={11} /> Sourced from {product.origin}
              </p>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.certifications.map((cert) => (
                <span key={cert} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-stone-300 font-mono tracking-wider bg-white/5">
                  {cert}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-600 mb-1">Exchange</p>
                <p className="font-display text-4xl text-white font-medium">₹{product.price.toLocaleString()}</p>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-full bg-white text-ink font-heading font-bold flex items-center justify-center gap-3 hover:scale-[0.98] active:scale-[0.96] transition-transform shadow-xl"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>

            {/* Stock */}
            <p className="font-mono text-xs text-stone-500 mt-4">
              {product.stock < 20 ? (
                <span className="text-clay">⚡ Only {product.stock} left in stock</span>
              ) : (
                <span>In Stock ({product.stock} units)</span>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
