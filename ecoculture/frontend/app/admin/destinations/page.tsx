"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  Star, 
  Eye, 
  Edit3, 
  Trash2,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import toast from "react-hot-toast";

// Components
import AdminTable from "@/components/admin/shared/AdminTable";
import AdminSlideOver from "@/components/admin/shared/AdminSlideOver";
import AddDestinationForm from "@/components/admin/forms/AddDestinationForm";

// Mock Data
const MOCK_DESTINATIONS = [
  { id: "DEST-001", name: "Munnar Eco Village", category: "ECO_VILLAGE", region: "Kerala", score: 94, bookings: 348, revenue: "₹8.4L", status: "ACTIVE", image: "https://images.unsplash.com/photo-1593693397690-362ae966b750?w=100" },
  { id: "DEST-002", name: "Ziro Valley Trek", category: "TREKKING", region: "Arunachal", score: 88, bookings: 215, revenue: "₹4.2L", status: "ACTIVE", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100" },
  { id: "DEST-003", name: "Sundarbans Stay", category: "WILDLIFE", region: "West Bengal", score: 82, bookings: 184, revenue: "₹3.1L", status: "PENDING", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100" },
  { id: "DEST-004", name: "Coorg Estate", category: "NATURE", region: "Karnataka", score: 91, bookings: 276, revenue: "₹6.8L", status: "ACTIVE", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=100" },
  { id: "DEST-005", name: "Spiti Homestay", category: "CULTURE", region: "Himachal", score: 96, bookings: 98, revenue: "₹2.1L", status: "INACTIVE", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100" },
];

export default function DestinationsPage() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = useMemo(() => [
    {
      header: "Destination",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#27272A] bg-[#18181B] shrink-0">
            <img src={row.original.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{row.original.name}</p>
            <p className="text-[10px] text-stone-600 font-mono mt-0.5">{row.original.id}</p>
          </div>
        </div>
      )
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ getValue }: any) => (
        <span className="px-2 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none">
          {getValue().replace('_', ' ')}
        </span>
      )
    },
    {
      header: "Region",
      accessorKey: "region",
    },
    {
       header: "Eco Score",
       accessorKey: "score",
       cell: ({ getValue }: any) => (
         <div className="flex items-center gap-2">
            <div className="w-12 h-1.5 bg-[#1F1F23] rounded-full overflow-hidden">
               <div className="h-full bg-[#D4A843]" style={{ width: `${getValue()}%` }} />
            </div>
            <span className="text-[11px] font-bold font-mono text-stone-400">{getValue()}%</span>
         </div>
       )
    },
    {
      header: "Bookings",
      accessorKey: "bookings",
      cell: ({ getValue }: any) => <span className="font-mono text-stone-400">{getValue()}</span>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => <StatusBadge status={getValue()} />
    },
    {
      header: "",
      id: "actions",
      cell: () => (
        <div className="flex justify-end gap-1">
          <button className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#18181B] transition-all"><Eye size={14} /></button>
          <button className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#18181B] transition-all"><Edit3 size={14} /></button>
          <button className="p-1.5 rounded-lg text-stone-600 hover:text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={14} /></button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Destinations</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Manage eco-certified locations and performance metrics</p>
        </div>

        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="admin-btn-primary h-10 shadow-lg shadow-[#D4A843]/10"
        >
          <Plus size={18} /> Add Destination
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, region or category..." 
            className="admin-input pl-10 h-11"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           <button className="h-11 px-4 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-stone-400 flex items-center gap-2 hover:text-white transition-all">
             <Filter size={14} /> Filters
           </button>
           <button className="h-11 px-4 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-stone-400 flex items-center gap-2 hover:text-white transition-all">
             Sort: Newest
           </button>
        </div>
      </div>

      {/* Data Table */}
      <AdminTable columns={columns} data={MOCK_DESTINATIONS} />

      {/* Slide-Over Form */}
      <AdminSlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)}
        title="Create New Destination"
      >
        <AddDestinationForm 
          onCancel={() => setIsSlideOverOpen(false)}
          onSuccess={() => {
            setIsSlideOverOpen(false);
            toast.success("Destination published successfully");
          }}
        />
      </AdminSlideOver>

    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    ACTIVE: "text-green-500 border-green-500/20 bg-green-500/5",
    PENDING: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
    INACTIVE: "text-stone-500 border-[#27272A] bg-stone-500/5",
  };
  
  const icons: any = {
    ACTIVE: <CheckCircle2 size={10} />,
    PENDING: <Clock size={10} />,
    INACTIVE: <XCircle size={10} />,
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${styles[status]}`}>
       {icons[status]} {status}
    </span>
  );
}
