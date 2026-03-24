"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, MapPin, ShoppingBag, Calendar, TrendingUp, Wind,
  Award, ArrowRight, Package, User, History,
  Edit, Camera, CheckCircle2, Truck, XCircle, Star, CreditCard, Clock,
  Globe, Zap, ShieldCheck, ShoppingCart, LogOut
} from "lucide-react";
import Link from "next/link";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage, getProductImage } from "@/lib/images";
import { useSession, signOut } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/utils";
import { format, addHours, addDays } from "date-fns";
import toast from "react-hot-toast";

type Tab = "overview" | "bookings" | "orders" | "history" | "profile";

const STATUS_STYLE: Record<string, string> = {
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PENDING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  DELIVERED: "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  OUT_FOR_DELIVERY: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "My Summary", icon: <Globe size={15} /> },
  { key: "bookings", label: "Expeditions", icon: <Calendar size={15} /> },
  { key: "orders", label: "Treasures", icon: <ShoppingBag size={15} /> },
  { key: "history", label: "Chronology", icon: <History size={15} /> },
  { key: "profile", label: "Identity", icon: <User size={15} /> },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>("overview");

  const { data: bookings } = useSWR("/api/users/me/bookings", fetcher);
  const { data: orders, mutate: mutateOrders } = useSWR("/api/users/me/orders", fetcher);

  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setIsCancelling(orderId);
    try {
      const res = await fetch(`/api/users/me/orders?id=${orderId}&action=cancel`, { method: "PATCH" });
      if (!res.ok) throw new Error("Cancel failed");
      toast.success("Order cancelled successfully");
      mutateOrders();
    } catch (err) {
      toast.error("Failed to cancel order");
    } finally {
      setIsCancelling(null);
    }
  };

  const realUser = session?.user as any;
  if (!realUser) return <div className="min-h-screen pt-32 text-center text-stone-500">Authenticating connection...</div>;

  const validBookings = bookings || [];
  const validOrders = orders || [];

  // Computed User Stats based on real data
  const totalOrders = validOrders.length;
  const pendingOrders = validOrders.filter((o: any) => o.status === "PENDING" || o.status === "PROCESSING").length;
  const deliveredOrders = validOrders.filter((o: any) => o.status === "DELIVERED").length;
  const cancelledOrders = validOrders.filter((o: any) => o.status === "CANCELLED").length;
  const totalSpent = validOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
  const avgOrder = totalOrders > 0 ? (totalSpent / totalOrders).toFixed(0) : "0";

  const tripsCompleted = validBookings.filter((b: any) => b.status === "COMPLETED").length;
  const ecoScore = 150 + (tripsCompleted * 120) + (totalOrders * 25);
  const co2Saved = (tripsCompleted * 4.2) + (totalOrders * 0.8);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0D0B] text-stone-300 font-body">
      <div className="fixed inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-leaf/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex items-center gap-8">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-leaf to-[#2D5A3D] p-[2px] shadow-2xl">
                  <div className="w-full h-full bg-[#0E1410] rounded-[22px] flex items-center justify-center text-4xl font-display font-bold text-white uppercase">
                    {realUser.name?.[0] || "?"}
                  </div>
                </div>
              </motion.div>

              <div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-4xl text-white">{realUser.name}</h1>
                  <span className="px-3 py-1 bg-leaf/10 text-leaf border border-leaf/20 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">{realUser.role || "Member"}</span>
                </motion.div>
                <p className="text-stone-500 flex items-center gap-2 text-sm">
                  {realUser.email} · Member since 2026
                </p>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                  <LogOut size={12} /> Sign Out Session
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { label: "Eco Score", value: ecoScore, icon: <Leaf size={16} />, color: "text-leaf" },
                { label: "CO2 Offset", value: `${co2Saved.toFixed(1)}T`, icon: <Wind size={16} />, color: "text-blue-400" },
                { label: "Badges", value: tripsCompleted > 0 ? tripsCompleted + 2 : 1, icon: <Award size={16} />, color: "text-amber-400" },
              ].map((stat, i) => (
                <AntigravityCard key={i} mode="tilt" maxRotation={5}>
                  <div className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 min-w-[140px] hover:bg-white/[0.08] transition-all">
                    <div className={`flex items-center gap-2 mb-1 ${stat.color}`}>
                      {stat.icon}
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-display text-white">{stat.value}</p>
                  </div>
                </AntigravityCard>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-2 border-b border-white/5 bg-white/[0.02] p-1.5 rounded-2xl w-fit overflow-x-auto max-w-full">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  tab === t.key ? "text-white" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {tab === t.key && <motion.div layoutId="active-tab" className="absolute inset-0 bg-leaf shadow-[0_0_20px_rgba(74,139,92,0.3)] rounded-xl" />}
                <span className="relative z-10">{t.icon}</span>
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Order Summary & Real-time Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <StatBox label="Total Orders" value={totalOrders} icon={<Package size={16}/>} />
                   <StatBox label="Pending" value={pendingOrders} icon={<Clock size={16}/>} color="text-amber-400" />
                   <StatBox label="Delivered" value={deliveredOrders} icon={<CheckCircle2 size={16}/>} color="text-green-400" />
                   <StatBox label="Cancelled" value={cancelledOrders} icon={<XCircle size={16}/>} color="text-red-400" />
                   
                   <StatBox label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} icon={<CreditCard size={16}/>} className="col-span-2" />
                   <StatBox label="Avg Order Value" value={`₹${avgOrder.toLocaleString()}`} icon={<TrendingUp size={16}/>} className="col-span-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Activity: Bookings */}
                  <div className="p-8 rounded-card bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-display text-xl text-white">Latest Expeditions</h3>
                      <button onClick={() => setTab("bookings")} className="text-leaf hover:underline text-xs flex items-center gap-1">View All <ArrowRight size={14} /></button>
                    </div>
                    {validBookings.length === 0 ? (
                      <p className="text-stone-500 text-sm">No expeditions booked yet.</p>
                    ) : (
                      validBookings.slice(0, 2).map((booking: any, i: number) => (
                        <div key={i} className="group cursor-pointer mb-6 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                          <div className="relative h-40 rounded-2xl overflow-hidden mb-4 border border-white/5">
                            <SmartImage 
                              src={getDestinationImage((booking.destination || "").toLowerCase().replace(/\s+/g, '-'))} 
                              alt={booking.destination}
                              aspectRatio="landscape" className="w-full h-full"
                            />
                            <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-leaf border border-leaf/20 z-10">
                              {booking.status}
                            </div>
                          </div>
                          <h4 className="text-white font-medium text-lg leading-tight mb-1">{booking.destination}</h4>
                          <p className="text-xs text-stone-500 font-body">{format(new Date(booking.checkInDate || booking.checkIn), "MMM dd")} — {format(new Date(booking.checkOutDate || booking.checkOut), "MMM dd, yyyy")}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Vitals Summary */}
                  <div className="space-y-6">
                    <div className="p-8 rounded-card bg-leaf/5 border border-leaf/10">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="p-3 bg-leaf/20 rounded-xl text-leaf"><Zap size={24} /></div>
                         <div>
                            <h4 className="text-white font-medium">Eco-Impact Score</h4>
                            <p className="text-[10px] font-mono text-leaf uppercase tracking-widest font-bold">Top 12% Globally</p>
                         </div>
                      </div>
                      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-4">
                         <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((ecoScore / 2000) * 100, 100)}%` }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-gradient-to-r from-leaf to-emerald-400" />
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed font-body">Your recent activities reduced your carbon footprint by <span className="text-leaf">{co2Saved.toFixed(1)}kg CO2e</span>.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <section className="p-8 rounded-card bg-stone-950 border border-white/5">
                    <h3 className="text-xs font-mono text-stone-600 uppercase tracking-widest mb-8">Recent Shop Orders</h3>
                    <div className="space-y-4">
                       {validOrders.length === 0 ? (
                         <p className="text-stone-500 text-sm italic">No orders history.</p>
                       ) : (
                         validOrders.slice(0, 4).map((o: any) => (
                           <div key={o.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                              <div className="w-10 h-10 rounded bg-[#0E1410] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                 {o.items?.[0] ? <SmartImage src={getProductImage(o.items[0].product.id.toString())} alt="Product" className="w-full h-full"/> : <Package size={16} className="text-stone-500"/>}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm text-white truncate">{o.items?.[0]?.product?.name || "Order Items"}</p>
                                 <p className="text-[10px] text-stone-500">{format(new Date(o.createdAt), "MMM d, yyyy")} • {o.status.replace(/_/g, " ")}</p>
                              </div>
                           </div>
                         ))
                       )}
                    </div>
                    <button onClick={() => setTab("orders")} className="w-full py-3 mt-6 bg-white/5 border border-white/5 rounded-xl text-xs hover:bg-white/10 transition-all">View Full History</button>
                 </section>

                 <section className="p-8 rounded-card bg-leaf/10 border border-leaf/20 text-center">
                    <div className="w-16 h-16 bg-leaf/20 rounded-2xl flex items-center justify-center text-leaf mx-auto mb-6">
                       <ShoppingCart size={32} />
                    </div>
                    <h4 className="font-display text-xl text-white mb-2">Artisan Support</h4>
                    <p className="text-xs text-stone-400 font-body leading-relaxed mb-6">You've directly supported {Math.max(1, validOrders.length)} local families through sustainable purchases.</p>
                    <Link href="/shop" className="block w-full py-3 bg-leaf text-ink font-bold text-xs rounded-xl hover:scale-95 transition-all">Support More Crafts</Link>
                 </section>
              </div>
            </motion.div>
          )}

          {tab === "bookings" && (
            <motion.div key="bookings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl text-white">Your Expeditions</h2>
                <Link href="/destinations" className="bg-leaf text-ink px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all">Book New Journey</Link>
              </div>
              <div className="grid gap-6">
                {validBookings.map((b: any) => (
                  <div key={b.id} className="p-6 rounded-card bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-6 hover:border-white/10 transition-all">
                    <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                      <SmartImage src={getDestinationImage((b.destination || "").toLowerCase().replace(/\s+/g, '-'))} alt={b.destination} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_STYLE[b.status] || STATUS_STYLE.PENDING}`}>{b.status}</span>
                        <span className="text-stone-600 font-mono text-xs">{b.id}</span>
                      </div>
                      <h3 className="text-xl text-white font-medium mb-1">{b.destination}</h3>
                      <p className="text-stone-400 text-sm mb-4">Eco-Sanctuary · {b.guests} Guests</p>
                      <div className="flex items-center gap-6 text-xs text-stone-500">
                        <div className="flex items-center gap-2"><Calendar size={14} /> {format(new Date(b.checkInDate || b.checkIn), "MMM d")} - {format(new Date(b.checkOutDate || b.checkOut), "MMM d, yyyy")}</div>
                        <div className="flex items-center gap-2"><CreditCard size={14} /> ₹{b.totalCost?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {validBookings.length === 0 && <p className="text-stone-500">No expeditions found.</p>}
              </div>
            </motion.div>
          )}

          {tab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl text-white">Artisan Treasures</h2>
                <Link href="/shop" className="bg-[#D4A843] text-ink px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all">Visit Marketplace</Link>
              </div>
              <div className="grid gap-6">
                {validOrders.map((o: any) => (
                  <div key={o.id} className="p-6 rounded-card bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                      {o.items?.[0] ? <SmartImage src={getProductImage(o.items[0].product.id.toString())} alt="Product" className="w-full h-full"/> : <Package size={32}/>}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_STYLE[o.status] || STATUS_STYLE.PENDING}`}>{o.status.replace(/_/g, " ")}</span>
                        <span className="text-stone-600 font-mono text-xs">{o.id}</span>
                      </div>
                      <h3 className="text-lg text-white font-medium mb-1">
                        {o.items?.[0]?.name || "Eco Products"} {o.items?.length > 1 && `+ ${o.items.length - 1} more`}
                      </h3>
                      <p className="text-stone-500 text-xs mb-3">Ordered on {format(new Date(o.createdAt), "MMM d, yyyy")}</p>
                      
                      <div className="flex gap-2">
                         <button 
                           onClick={() => setTrackingOrder(trackingOrder === o.id ? null : o.id)}
                           className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-colors"
                         >
                           {trackingOrder === o.id ? "Hide Tracking" : "Track Order"}
                         </button>
                         
                         {(o.status === "PENDING" || o.status === "CONFIRMED") && (
                           <button 
                             onClick={() => handleCancelOrder(o.id)}
                             disabled={isCancelling === o.id}
                             className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                           >
                             {isCancelling === o.id ? "Cancelling..." : "Cancel"}
                           </button>
                         )}
                      </div>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto">
                       <p className="text-xl text-white font-heading font-bold mb-2">₹{o.total?.toLocaleString()}</p>
                    </div>
                    
                    {/* Inline Tracking Stepper */}
                    <AnimatePresence>
                      {trackingOrder === o.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: "auto" }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full mt-4 pt-6 border-t border-white/5"
                        >
                          <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-6">Delivery Timeline</h4>
                          <div className="flex items-center justify-between relative px-2">
                             <div className="absolute left-6 right-6 top-3 h-0.5 bg-white/5 -z-10" />
                             
                             {[
                                { s: "PENDING", label: "Placed", icon: <Package size={14} />, date: new Date(o.createdAt) },
                                { s: "CONFIRMED", label: "Confirmed", icon: <CheckCircle2 size={14} />, date: addHours(new Date(o.createdAt), 2) },
                                { s: "SHIPPED", label: "Shipped", icon: <Truck size={14} />, date: addHours(new Date(o.createdAt), 12) },
                                { s: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: <MapPin size={14} />, date: addHours(new Date(o.createdAt), 20) },
                                { s: "DELIVERED", label: "Delivered", icon: <CheckCircle2 size={14} />, date: addHours(new Date(o.createdAt), 24) },
                             ].map((step, idx, arr) => {
                                const statuses = arr.map(a => a.s);
                                const currentIndex = statuses.indexOf(o.status);
                                // If status is cancelled, freeze progress
                                const activeIndex = o.status === "CANCELLED" ? -1 : currentIndex;
                                const isCompleted = activeIndex >= idx;
                                const isCurrent = activeIndex === idx;
                                
                                return (
                                  <div key={step.s} className="flex flex-col items-center gap-2 group cursor-default">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${isCurrent ? "bg-leaf text-ink border-leaf shadow-[0_0_10px_rgba(74,139,92,0.4)]" : isCompleted ? "bg-[#1A261E] text-leaf border-leaf" : "bg-[#09090B] text-stone-600 border-white/10"}`}>
                                      {step.icon}
                                    </div>
                                    <div className="text-center">
                                      <p className={`text-[9px] font-mono tracking-widest uppercase ${isCurrent ? "text-leaf font-bold" : isCompleted ? "text-stone-300" : "text-stone-600"}`}>{step.label}</p>
                                      {isCompleted && <p className="text-[9px] text-stone-500 mt-0.5">{format(step.date, "h:mm a, MMM d")}</p>}
                                    </div>
                                  </div>
                                )
                             })}
                          </div>
                          {o.status === "CANCELLED" && (
                            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                              <XCircle size={16} /> Order was cancelled. Process paused.
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {validOrders.length === 0 && <p className="text-stone-500">No orders found.</p>}
              </div>
            </motion.div>
          )}

          {tab === "history" && (
             <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                  <h2 className="font-display text-3xl text-white">Eco Chronology</h2>
                </div>
                <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-leaf/40 before:to-transparent">
                   {validBookings.filter((b: any) => b.status === "COMPLETED").map((b: any, i: number) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[35px] top-6 w-3.5 h-3.5 rounded-full bg-[#0A0D0B] border-2 border-leaf shadow-[0_0_10px_rgba(74,139,92,0.5)] z-10" />
                        <div className="p-6 rounded-card bg-white/[0.02] border border-white/5">
                          <p className="text-[10px] font-mono text-leaf uppercase mb-2 tracking-widest">{format(new Date(b.checkOutDate || b.checkOut), "MMM yyyy")} · EXPEDITION COMPLETED</p>
                          <h3 className="text-xl text-white font-medium mb-4">{b.destination}</h3>
                          <div className="grid grid-cols-2 gap-6 text-sm text-stone-400">
                             <div>Impact: <span className="text-leaf font-bold">+{b.guests * 14} Points</span></div>
                          </div>
                        </div>
                     </div>
                   ))}
                   {validBookings.filter((b: any) => b.status === "COMPLETED").length === 0 && <p className="text-stone-500">Complete an expedition to build your chronology.</p>}
                </div>
             </motion.div>
          )}

          {tab === "profile" && (
             <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
                <div className="p-10 rounded-card bg-white/[0.02] border border-white/5 space-y-8">
                  <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/5">
                    <div className="w-24 h-24 rounded-3xl bg-leaf/20 flex items-center justify-center text-3xl font-bold text-leaf uppercase">
                      {realUser.name?.[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl text-white font-display mb-1">{realUser.name}</h3>
                      <p className="text-stone-500 text-sm">Identity verified via EcoChain</p>
                    </div>
                  </div>
                  <div className="grid gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-stone-600">Full Name</label>
                      <input disabled value={realUser.name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-stone-600">Email Address (Locked)</label>
                      <input disabled value={realUser.email} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-400 text-sm opacity-50 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, color = "text-stone-400", className = "" }: any) {
  return (
    <div className={`p-5 rounded-2xl bg-white/[0.02] border border-white/5 ${className}`}>
       <div className={`flex items-center gap-2 mb-2 ${color}`}>
          {icon} <span className="text-[10px] uppercase font-mono tracking-widest font-bold">{label}</span>
       </div>
       <p className="text-2xl font-display text-white">{value}</p>
    </div>
  );
}
