"use client";

import { useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  MoreHorizontal,
  Mail,
  Phone
} from "lucide-react";

// Components
import AdminTable from "@/components/admin/shared/AdminTable";

// Mock Data
const MOCK_BOOKINGS = [
  { id: "BK-8291", customer: "Arjun Mehta", email: "arjun@example.com", destination: "Munnar Eco Village", date: "20 Mar 2026", amount: "₹18,500", status: "CONFIRMED" },
  { id: "BK-8292", customer: "Sarah Chen", email: "sarah.c@gmail.com", destination: "Ziro Valley Trek", date: "21 Mar 2026", amount: "₹24,200", status: "PENDING" },
  { id: "BK-8293", customer: "Rahul Das", email: "rahul.das@outlook.com", destination: "Sundarbans Stay", date: "22 Mar 2026", amount: "₹12,800", status: "COMPLETED" },
  { id: "BK-8294", customer: "Elena Rodriguez", email: "elena@travel.com", destination: "Coorg Estate", date: "24 Mar 2026", amount: "₹31,000", status: "CONFIRMED" },
  { id: "BK-8295", customer: "Vikram Singh", email: "vikram.s@live.in", destination: "Spiti Homestay", date: "25 Mar 2026", amount: "₹15,400", status: "CANCELLED" },
];

export default function BookingsPage() {
  const columns = useMemo(() => [
    {
      header: "Booking ID",
      accessorKey: "id",
      cell: ({ getValue }: any) => <span className="font-mono text-[11px] text-stone-500">{getValue()}</span>
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{row.original.customer}</span>
          <span className="text-[10px] text-stone-600 font-medium">{row.original.email}</span>
        </div>
      )
    },
    {
      header: "Destination",
      accessorKey: "destination",
      cell: ({ getValue }: any) => <span className="text-stone-300 text-xs">{getValue()}</span>
    },
    {
      header: "Travel Date",
      accessorKey: "date",
      cell: ({ getValue }: any) => <span className="text-stone-400 text-xs">{getValue()}</span>
    },
    {
      header: "Total",
      accessorKey: "amount",
      cell: ({ getValue }: any) => <span className="font-mono font-bold text-white text-sm">{getValue()}</span>
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
          <button className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#18181B] transition-all"><MoreHorizontal size={14} /></button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Bookings Console</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Monitor and manage eco-tourism reservations</p>
        </div>

        <div className="flex gap-2">
           <button className="h-10 px-4 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-stone-400 flex items-center gap-2 hover:bg-[#18181B] hover:text-white transition-all">
             <Calendar size={14} /> Schedule View
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors" />
          <input type="text" placeholder="Search by ID, Customer, or Email..." className="admin-input pl-10 h-11" />
        </div>
        <div className="flex gap-2">
           <button className="h-11 px-6 bg-[#111113] border border-[#27272A] rounded-lg text-xs font-bold text-stone-400 flex items-center gap-2 hover:text-white transition-all">
             <Filter size={14} /> Filter
           </button>
        </div>
      </div>

      <AdminTable columns={columns} data={MOCK_BOOKINGS} />

    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    CONFIRMED: "text-blue-500 border-blue-500/20 bg-blue-500/5",
    PENDING: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
    COMPLETED: "text-green-500 border-green-500/20 bg-green-500/5",
    CANCELLED: "text-red-500 border-red-500/20 bg-red-500/5",
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${styles[status]}`}>
       {status}
    </span>
  );
}
