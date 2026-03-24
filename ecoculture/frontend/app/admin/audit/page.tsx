"use client";

import { useMemo } from "react";
import { 
  Search, 
  History,
  Shield,
  User,
  AlertTriangle,
  Info,
  Terminal,
  ArrowRight
} from "lucide-react";

// Components
import AdminTable from "@/components/admin/shared/AdminTable";

// Mock Data
const MOCK_AUDITS = [
  { id: "LOG-0182", event: "DESTINATION_UPDATE", user: "Admin (Elena R.)", target: "Munnar Eco Village", status: "SUCCESS", timestamp: "20 Mar 2026 14:22:10" },
  { id: "LOG-0181", event: "PRODUCT_CREATED", user: "Admin (Elena R.)", target: "Recycled Earth Saree", status: "SUCCESS", timestamp: "20 Mar 2026 13:45:02" },
  { id: "LOG-0180", event: "SYSTEM_AUTH_FAILURE", user: "112.196.22.4", target: "Admin Login", status: "FAILURE", timestamp: "20 Mar 2026 12:10:55" },
  { id: "LOG-0179", event: "BOOKING_REFUND", user: "Finance (Rajiv I.)", target: "BK-8295", status: "SUCCESS", timestamp: "20 Mar 2026 11:30:00" },
  { id: "LOG-0178", event: "LOCATION_PIN_MOVED", user: "Admin (Elena R.)", target: "Ziro Valley", status: "SUCCESS", timestamp: "19 Mar 2026 18:05:22" },
];

export default function AuditLogPage() {
  const columns = useMemo(() => [
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      cell: ({ getValue }: any) => <span className="font-mono text-[10px] text-stone-500">{getValue()}</span>
    },
    {
      header: "Event Type",
      accessorKey: "event",
      cell: ({ getValue }: any) => (
        <span className="text-[10px] font-bold text-stone-300 bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A] flex items-center gap-1.5 w-fit">
           <Terminal size={10} className="text-[#D4A843]" /> {getValue()}
        </span>
      )
    },
    {
      header: "Actor",
      accessorKey: "user",
      cell: ({ getValue }: any) => (
        <div className="flex items-center gap-2">
           <User size={12} className="text-stone-600" />
           <span className="text-xs font-medium text-stone-400">{getValue()}</span>
        </div>
      )
    },
    {
      header: "Target Entity",
      accessorKey: "target",
      cell: ({ getValue }: any) => <span className="text-xs text-white">{getValue()}</span>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <span className={`text-[10px] font-bold ${getValue() === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>
           {getValue()}
        </span>
      )
    },
    {
      header: "",
      id: "details",
      cell: () => (
        <button className="text-[10px] font-bold text-[#D4A843] uppercase tracking-widest hover:underline flex items-center gap-1">
           Details <ArrowRight size={10} />
        </button>
      )
    }
  ], []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">System Integrity Log</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Immutable audit trail of all platform administrative actions</p>
        </div>

        <div className="flex gap-2">
           <div className="flex bg-[#111113] border border-[#27272A] p-0.5 rounded-lg">
              <button className="px-3 py-1.5 text-[10px] font-bold text-stone-500 hover:text-white transition-all uppercase tracking-widest">Today</button>
              <button className="px-3 py-1.5 text-[10px] font-bold bg-[#D4A843] text-[#09090B] rounded-md uppercase tracking-widest">Last 7 Days</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-[#111113] border border-[#27272A] p-5 rounded-xl">
            <div className="flex items-center gap-2 text-stone-500 mb-2">
               <Shield size={14} /> <span className="text-[11px] font-bold uppercase tracking-widest">Security Level</span>
            </div>
            <p className="text-xl font-bold text-green-500">MAXIMUM</p>
            <p className="text-[10px] text-stone-600 mt-1">All 2FA protocols active</p>
         </div>
         <div className="bg-[#111113] border border-[#27272A] p-5 rounded-xl">
            <div className="flex items-center gap-2 text-stone-500 mb-2">
               <History size={14} /> <span className="text-[11px] font-bold uppercase tracking-widest">Total Events</span>
            </div>
            <p className="text-xl font-bold text-white">12,482</p>
            <p className="text-[10px] text-stone-600 mt-1">Synced across 4 instances</p>
         </div>
         <div className="bg-[#111113] border border-red-500/20 p-5 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-red-500/60 mb-2">
               <AlertTriangle size={14} /> <span className="text-[11px] font-bold uppercase tracking-widest">Anomalies</span>
            </div>
            <p className="text-xl font-bold text-red-500">03</p>
            <p className="text-[10px] text-stone-600 mt-1">Requires manual review</p>
         </div>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden">
         <div className="px-6 py-4 border-b border-[#27272A] flex items-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse mr-3" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Live Event Stream</h3>
            <div className="ml-auto flex items-center gap-2 overflow-hidden">
               <input type="text" placeholder="Search logs..." className="bg-transparent border-0 text-xs text-white placeholder:text-stone-700 focus:outline-none w-48" />
               <Search size={14} className="text-stone-700" />
            </div>
         </div>
         <AdminTable columns={columns} data={MOCK_AUDITS} />
      </div>

    </div>
  );
}
