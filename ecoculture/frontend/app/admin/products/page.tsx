"use client";

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  ShoppingBag,
  Package,
  Eye, 
  Edit3, 
  Trash2,
  AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";

// Components
import AdminTable from "@/components/admin/shared/AdminTable";
import AdminSlideOver from "@/components/admin/shared/AdminSlideOver";
import AddProductForm from "@/components/admin/forms/AddProductForm";

// Mock Data
const MOCK_PRODUCTS = [
  { id: "PRD-441", name: "Handwoven Bamboo Basket", category: "HOME_DECOR", artisan: "Lakshmi Devi", price: "₹2,450", stock: 12, score: 96, status: "ACTIVE", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=100" },
  { id: "PRD-442", name: "Organic Hibiscus Tea", category: "FOOD_DRINK", artisan: "Assam Cooperatives", price: "₹850", stock: 45, score: 92, status: "ACTIVE", image: "https://images.unsplash.com/photo-1544787210-282aa51e3acc?w=100" },
  { id: "PRD-443", name: "Recycled Earth Saree", category: "CLOTHING", artisan: "Bunkar Society", price: "₹7,200", stock: 3, score: 98, status: "ACTIVE", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100" },
  { id: "PRD-444", name: "Clay Terracotta Set", category: "HOME_DECOR", artisan: "Rahul Kumbhar", price: "₹1,800", stock: 0, score: 85, status: "INACTIVE", image: "https://images.unsplash.com/photo-1590204652932-5a213fd0770a?w=100" },
  { id: "PRD-445", name: "Neem Wood Comb", category: "WELLNESS", artisan: "Kerala Artisans", price: "₹450", stock: 82, score: 94, status: "ACTIVE", image: "https://images.unsplash.com/photo-1590159301136-13fc475141e2?w=100" },
];

export default function ProductsPage() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const columns = useMemo(() => [
    {
      header: "Product",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#27272A] bg-[#18181B] shrink-0">
            <img src={row.original.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{row.original.name}</p>
            <p className="text-[10px] text-stone-600 font-mono mt-0.5">{row.original.id}</p>
          </div>
        </div>
      )
    },
    {
      header: "Artisan",
      accessorKey: "artisan",
      cell: ({ getValue }: any) => <span className="text-stone-400 text-xs">{getValue()}</span>
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ getValue }: any) => <span className="font-mono text-white font-bold">{getValue()}</span>
    },
    {
      header: "Stock",
      accessorKey: "stock",
      cell: ({ getValue }: any) => (
        <div className="flex flex-col gap-1.5 min-w-[80px]">
           <div className="flex justify-between items-center text-[10px] font-bold">
              <span className={getValue() < 5 ? 'text-red-500' : 'text-stone-500'}>{getValue()} left</span>
           </div>
           <div className="h-1 bg-[#1F1F23] rounded-full overflow-hidden w-full">
              <div 
                className={`h-full ${getValue() < 5 ? 'bg-red-500' : getValue() < 15 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                style={{ width: `${Math.min(100, (getValue() / 50) * 100)}%` }} 
              />
           </div>
        </div>
      )
    },
    {
      header: "Eco Score",
      accessorKey: "score",
      cell: ({ getValue }: any) => (
        <span className="text-[11px] font-bold font-mono text-green-500/80">{getValue()}%</span>
      )
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
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Eco Shop Management</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Inventory control and artisan product oversight</p>
        </div>

        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="admin-btn-primary h-10 shadow-lg shadow-[#D4A843]/10"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by product name, SKU or artisan..." 
            className="admin-input pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
           <button className="h-11 px-4 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-stone-400 flex items-center gap-2 hover:text-white transition-all">
             <Filter size={14} /> Category
           </button>
           <button className="h-11 px-4 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-red-500/80 border-red-500/20 flex items-center gap-2 hover:bg-red-500/5 transition-all">
             <AlertTriangle size={14} /> Low Stock
           </button>
        </div>
      </div>

      {/* Data Table */}
      <AdminTable columns={columns} data={MOCK_PRODUCTS} />

      {/* Slide-Over Form */}
      <AdminSlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)}
        title="Add New Product"
      >
        <AddProductForm 
          onCancel={() => setIsSlideOverOpen(false)}
          onSuccess={() => {
            setIsSlideOverOpen(false);
            toast.success("Product added to inventory");
          }}
        />
      </AdminSlideOver>

    </div>
  );
}
