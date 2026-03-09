import { useState } from "react";

function Chatbot() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const generateReply = (msg: string) => {

    const text = msg.toLowerCase();

    if (text.includes("munnar")) {
      return "🌿 Munnar Eco Plan: Day 1 tea plantations, Day 2 waterfalls, Day 3 wildlife sanctuary.";
    }

    if (text.includes("ooty")) {
      return "🌄 Ooty Eco Plan: Botanical garden, Doddabetta peak, tea factory visit.";
    }

    if (text.includes("coorg")) {
      return "🌳 Coorg Eco Plan: Abbey falls, coffee plantations, wildlife trekking.";
    }

    return "🌍 Try asking: Plan a trip to Munnar, Ooty, or Coorg!";
  };

  const handleSend = () => {
    const reply = generateReply(message);
    setResponse(reply);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg"
      >
        💬 AI Travel
      </button>

      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg p-4">

          <h3 className="font-bold text-lg mb-2">
            Eco Travel Assistant
          </h3>

          <div className="text-sm text-gray-600 mb-3">
            Ask about eco trips 🌿
          </div>

          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="mt-2 bg-green-600 text-white px-3 py-2 rounded w-full"
          >
            Send
          </button>

          {response && (
            <div className="mt-3 p-2 bg-green-50 rounded text-sm">
              {response}
            </div>
          )}

        </div>
      )}

    </>
  );
}

export default Chatbot;