"use client";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-24 right-4 z-[99999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`glass-panel px-4 py-3 min-w-[250px] shadow-lg flex items-center gap-3 animate-fade-in ${
              toast.type === "error"
                ? "border-red-500/50 bg-red-900/20"
                : "border-emerald-500/50 bg-emerald-900/20"
            }`}
          >
            <span
              className={
                toast.type === "error" ? "text-red-400" : "text-emerald-400"
              }
            >
              {toast.type === "error" ? "❌" : "✓"}
            </span>
            <span className="text-white font-medium">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
