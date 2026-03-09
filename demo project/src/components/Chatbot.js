"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaMinus,
  FaLeaf,
} from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste! I'm your EcoCulture assistant. How can I help you discover India sustainably today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a bit of trouble connecting to the network. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow group relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
          <FaRobot className="text-3xl" />
          <span className="absolute -top-12 right-0 bg-white text-slate-900 text-[10px] font-black py-2 px-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest border-2 border-emerald-500">
            Chat with AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel w-80 md:w-96 h-[500px] flex flex-col overflow-hidden animate-slide-up border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.6)] bg-slate-900/90 backdrop-blur-3xl">
          {/* Header */}
          <div className="bg-emerald-500 p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white">
                <FaRobot />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none">
                  Eco Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-tighter">
                    AI Active
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <FaMinus size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-white rounded-tr-none"
                      : "bg-white/5 border border-white/5 text-slate-300 rounded-tl-none"
                  } shadow-md`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/5 border border-white/5 text-slate-400 rounded-2xl rounded-tl-none p-3 shadow-md flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Footer / Input */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-white/5 border-t border-white/5"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about destinations..."
                className="w-full bg-slate-800 border-none rounded-full py-3 px-6 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="flex justify-center mt-3 gap-2">
              <div className="flex items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <FaLeaf className="mr-1 text-emerald-500" /> Powered by
                EcoCulture AI
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
