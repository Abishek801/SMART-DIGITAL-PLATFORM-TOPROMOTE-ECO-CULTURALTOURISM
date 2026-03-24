"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Package, Truck, CheckCircle2, Clock, MoreHorizontal, ExternalLink, X, History, Save } from "lucide-react";
import AdminTable from "@/components/admin/shared/AdminTable";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import axios from "axios";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const { data: orders, mutate } = useSWR("/api/admin/orders", fetcher);
  
  // Filter locally for now
  const filteredOrders = orders?.filter((o: any) => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.items?.[0]?.product?.name?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const columns = useMemo(() => [
    {
      header: "Order ID",
      accessorKey: "id",
      cell: ({ getValue }: any) => <span className="font-mono text-[11px] text-[#D4A843] truncate w-24 block" title={getValue()}>{getValue()}</span>
    },
    {
      header: "Product / Item",
      accessorKey: "items",
      cell: ({ row }: any) => {
        const items = row.original.items || [];
        const main = items[0]?.product?.name || "Multiple Items";
        return <span className="text-sm font-medium text-white truncate w-48 block">{main} {items.length > 1 ? `+${items.length - 1}` : ""}</span>
      }
    },
    {
      header: "Customer",
      accessorKey: "user.name",
      cell: ({ row }: any) => <span className="text-sm text-stone-300">{row.original.user?.name || "Unknown"}</span>
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }: any) => <span className="text-stone-500 text-xs">{getValue() ? format(new Date(getValue()), "dd MMM yyyy") : "-"}</span>
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ getValue }: any) => <span className="font-mono font-bold text-white text-sm">₹{getValue()?.toLocaleString()}</span>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => <StatusBadge status={getValue()} />
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex justify-end gap-1">
          <button 
            onClick={() => setSelectedOrder(row.original)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#18181B] bg-white hover:bg-stone-200 transition-all flex items-center gap-1.5"
          >
            Manage <ExternalLink size={14} />
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Truck className="text-[#D4A843]" /> Delivery Management
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Order logistics, fulfillment, and status updates.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer, or Product..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#18181B] border border-[#27272A] rounded-lg h-11 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#D4A843]/50" 
          />
        </div>
      </div>

      <AdminTable columns={columns} data={filteredOrders} />

      {/* Slide-over Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderSlidePanel 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
            onUpdate={() => mutate()} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderSlidePanel({ order, onClose, onUpdate }: { order: any, onClose: () => void, onUpdate: () => void }) {
  const { data: history, mutate: mutateHistory } = useSWR(`/api/admin/orders/${order.id}/history`, fetcher);
  
  const [newStatus, setNewStatus] = useState(order.status);
  const [notes, setNotes] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "");
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/admin/orders/${order.id}/status`, {
        status: newStatus,
        notes,
        trackingNumber
      });
      mutateHistory();
      onUpdate();
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-[#09090B] border-l border-[#27272A] z-50 flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
      >
        <div className="p-6 border-b border-[#27272A] flex items-start justify-between bg-[#111113]/80 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h2 className="text-xl font-display font-bold text-white mb-1">Manage Order</h2>
            <p className="font-mono text-[10px] text-stone-500">ID: {order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-[#18181B] rounded-lg hover:text-white transition-colors text-stone-400"><X size={16}/></button>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Customer Info */}
          <div className="space-y-3">
             <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A843]">Customer Info</h3>
             <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm">
                <p className="text-white font-bold">{order.user?.name}</p>
                <p className="text-stone-400 mb-3">{order.user?.email}</p>
                <div className="pt-3 border-t border-[#27272A]">
                   <p className="text-[10px] font-mono text-stone-500 mb-1">SHIPPING ADDRESS</p>
                   <p className="text-stone-300">{order.address || "No address provided."}</p>
                </div>
             </div>
          </div>

          {/* Items Info */}
          <div className="space-y-3">
             <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A843]">Order Items</h3>
             <div className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden divide-y divide-[#27272A]">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-sm">
                     <span className="text-stone-300 truncate w-3/5">{item.product?.name}</span>
                     <span className="text-stone-500">x{item.quantity}</span>
                     <span className="text-white font-mono">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="p-3 bg-[#111113] flex justify-between font-bold">
                   <span className="text-stone-400">Total Amount</span>
                   <span className="text-[#D4A843] font-mono text-lg">₹{(order.total || 0).toLocaleString()}</span>
                </div>
             </div>
          </div>

          {/* Status Update Action */}
          <div className="space-y-4 p-5 bg-[#D4A843]/5 border border-[#D4A843]/20 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A843]/10 blur-[50px] rounded-full pointer-events-none" />
             <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A843] mb-4">Update Delivery Status</h3>
             
             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-stone-500">New Status</label>
                <select 
                  value={newStatus} 
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-[#27272A] rounded-lg px-3 text-white text-sm focus:border-[#D4A843] outline-none"
                >
                   <option value="PENDING">Pending Verification</option>
                   <option value="CONFIRMED">Payment Confirmed</option>
                   <option value="SHIPPED">Shipped (In Transit)</option>
                   <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
                   <option value="DELIVERED">Delivered Successfully</option>
                   <option value="ON_HOLD">On Hold</option>
                   <option value="CANCELLED">Cancelled</option>
                </select>
             </div>

             {(newStatus === "SHIPPED" || trackingNumber.length > 0 || order.trackingNumber) && (
               <div className="space-y-1">
                 <label className="text-[10px] uppercase font-bold text-stone-500">Tracking Number</label>
                 <input 
                   type="text" 
                   placeholder="e.g. BLUEDART12345" 
                   value={trackingNumber}
                   onChange={e => setTrackingNumber(e.target.value)}
                   className="w-full h-11 bg-[#18181B] border border-[#27272A] rounded-lg px-3 text-white text-sm focus:border-[#D4A843] outline-none font-mono"
                 />
               </div>
             )}

             <div className="space-y-1">
               <label className="text-[10px] uppercase font-bold text-stone-500">Internal Notes / Reason</label>
               <textarea 
                 value={notes}
                 onChange={e => setNotes(e.target.value)}
                 className="w-full h-20 bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white text-sm focus:border-[#D4A843] outline-none resize-none placeholder:text-stone-600"
                 placeholder="Add context for this status change..."
               />
             </div>

             <button 
               onClick={handleStatusUpdate}
               disabled={loading || (newStatus === order.status && !notes && trackingNumber === (order.trackingNumber || ""))}
               className="w-full h-11 bg-[#D4A843] hover:bg-[#C49A33] text-[#09090B] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
             >
               {loading ? <Clock className="animate-spin" size={16}/> : <Save size={16} />} 
               Commit Status Update
             </button>
          </div>

          {/* Timeline History */}
          <div className="space-y-6">
             <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A843] flex items-center gap-2">
               <History size={14}/> Audit Timeline
             </h3>
             <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#27272A]">
                {!history ? <p className="text-stone-500 text-xs text-center italic py-4">Loading timeline...</p> : 
                  history.length === 0 ? <p className="text-stone-500 text-xs text-center italic py-4">No status changes recorded yet.</p> :
                  history.map((h: any, i: number) => (
                    <div key={h.id} className="relative">
                       <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#D4A843] border border-[#09090B] shadow-[0_0_10px_rgba(212,168,67,0.5)] z-10" />
                       <div className="pl-4">
                         <div className="flex items-start justify-between mb-1">
                           <div className="flex items-center gap-2">
                             <StatusBadge status={h.toStatus} />
                             {h.fromStatus && <span className="text-[9px] text-stone-600 font-mono">prev: {h.fromStatus}</span>}
                           </div>
                           <span className="text-[10px] font-mono text-stone-500">{format(new Date(h.timestamp), "d MMM, HH:mm")}</span>
                         </div>
                         <p className="text-xs text-stone-400 mt-2"><span className="text-stone-600">By {h.changedBy}</span> {h.notes ? `— "${h.notes}"` : ""}</p>
                         {h.trackingNumber && <p className="text-[10px] font-mono text-[#D4A843] mt-1 tracking-wider bg-[#D4A843]/10 w-fit px-2 py-0.5 rounded border border-[#D4A843]/20">TRK: {h.trackingNumber}</p>}
                       </div>
                    </div>
                  ))
                }
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    PENDING: "text-purple-500 border-purple-500/20 bg-purple-500/5",
    CONFIRMED: "text-blue-500 border-blue-500/20 bg-blue-500/5",
    SHIPPED: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    OUT_FOR_DELIVERY: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
    DELIVERED: "text-green-500 border-green-500/20 bg-green-500/5",
    ON_HOLD: "text-orange-500 border-orange-500/20 bg-orange-500/5",
    CANCELLED: "text-red-500 border-red-500/20 bg-red-500/5",
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${styles[status] || styles.PENDING}`}>
       {(status || "PENDING").replace(/_/g, " ")}
    </span>
  );
}
