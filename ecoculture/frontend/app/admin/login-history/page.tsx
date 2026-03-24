"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Shield, Download, CheckCircle2, XCircle, Clock, Server } from "lucide-react";
import AdminTable from "@/components/admin/shared/AdminTable";
import { format } from "date-fns";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function LoginHistoryPage() {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("ALL");
  const [debouncedEmail, setDebouncedEmail] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedEmail(email), 500);
    return () => clearTimeout(t);
  }, [email]);

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: "25",
    ...(debouncedEmail ? { email: debouncedEmail } : {}),
    ...(status !== "ALL" ? { status } : {})
  });

  const { data, error, isLoading } = useSWR(`/api/admin/login-history?${queryParams}`, fetcher);

  const columns = useMemo(() => [
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => {
        const val = getValue();
        return val === "SUCCESSFUL" ? (
          <span className="flex items-center gap-1 text-green-400 text-xs font-bold"><CheckCircle2 size={14} /> OK</span>
        ) : (
          <span className="flex items-center gap-1 text-red-400 text-xs font-bold"><XCircle size={14} /> FAILED</span>
        );
      }
    },
    {
      header: "User Email",
      accessorKey: "email",
      cell: ({ getValue }: any) => <span className="text-sm text-stone-200">{getValue() || "Unknown"}</span>
    },
    {
      header: "Time",
      accessorKey: "loginTime",
      cell: ({ getValue }: any) => {
        if (!getValue()) return "-";
        return <span className="text-stone-400 text-xs font-mono">{format(new Date(getValue()), "dd MMM yyyy, HH:mm")}</span>;
      }
    },
    {
      header: "IP Address",
      accessorKey: "ipAddress",
      cell: ({ getValue }: any) => <span className="text-stone-500 font-mono text-xs"><Server size={12} className="inline mr-1"/>{getValue() || "N/A"}</span>
    },
    {
      header: "Device / Browser",
      accessorKey: "deviceType",
      cell: ({ row }: any) => (
        <span className="text-stone-400 text-xs">
          {row.original.deviceType} • {row.original.browser}
        </span>
      )
    },
    {
      header: "Reason",
      accessorKey: "failureReason",
      cell: ({ getValue }: any) => <span className="text-stone-500 text-xs italic">{getValue() || "-"}</span>
    }
  ], []);

  const handleExport = () => {
    if (!data?.content) return;
    const headers = ["Status", "Email", "Time", "IP Address", "Device", "Browser", "Failure Reason"].join(",");
    const rows = data.content.map((r: any) => 
      [r.status, r.email, r.loginTime, r.ipAddress, r.deviceType, r.browser, r.failureReason || ""].join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `login_history_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Shield className="text-blue-500" /> System Access Logs
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Audit trail of all login attempts and session data.</p>
        </div>

        <button onClick={handleExport} className="h-9 px-4 rounded-lg border border-[#3F3F46] text-xs font-bold text-stone-400 flex items-center gap-2 hover:bg-[#18181B] hover:text-white transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by user email..." 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#18181B] border border-[#27272A] rounded-lg h-11 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" 
          />
        </div>
        <select 
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="bg-[#18181B] border border-[#27272A] rounded-lg h-11 px-4 text-sm text-stone-300 focus:outline-none focus:border-blue-500/50"
        >
          <option value="ALL">All Status</option>
          <option value="SUCCESSFUL">Successful Only</option>
          <option value="FAILED">Failed Only</option>
        </select>
      </div>

      <div className="bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center text-stone-500 gap-2"><Clock className="animate-spin-slow"/> Fetching logs...</div>
        ) : error ? (
          <div className="w-full h-64 flex items-center justify-center text-red-500">Failed to load login history.</div>
        ) : (
          <>
            <AdminTable columns={columns} data={data?.content || []} />
            <div className="p-4 border-t border-[#27272A] flex justify-between items-center text-xs text-stone-500">
               <span>Showing page {page + 1} of {data?.totalPages || 1} ({data?.totalElements || 0} total)</span>
               <div className="flex gap-2">
                 <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:text-white disabled:opacity-50">Previous</button>
                 <button disabled={page >= (data?.totalPages || 1) - 1} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:text-white disabled:opacity-50">Next</button>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
