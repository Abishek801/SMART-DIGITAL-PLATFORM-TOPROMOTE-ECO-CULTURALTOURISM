import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

import Home from "./pages/Home";
import India from "./pages/India";
import Planner from "./pages/Planner";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MapPage from "./pages/MapPage";
function App() {
  return (
    <BrowserRouter>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen p-6">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/india" element={<India />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </div>

      {/* Footer */}
      <Footer />

      {/* AI Chatbot Popup */}
      <Chatbot />

    </BrowserRouter>
  );
}

export default App;