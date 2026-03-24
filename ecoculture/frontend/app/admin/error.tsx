"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Page Crash:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-[#111113] border border-red-500/20 rounded-2xl m-6 h-[400px]">
      <h2 className="text-xl font-bold text-red-500 mb-4">Admin Dashboard Encountered an Error</h2>
      <p className="text-stone-400 font-mono text-xs mb-6 max-w-xl text-center bg-black/40 p-4 rounded-xl border border-red-500/10">
        {error.message || "Unknown rendering error."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
      >
        Attempt Recovery
      </button>
    </div>
  );
}
