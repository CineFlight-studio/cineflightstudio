import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Drones from "./pages/Drones";
import Contact from "./pages/Contact";
import CustomForm from "./pages/CustomForm";
import Booking from "./pages/Booking";
import "./App.css";

// ✅ Professional Touch: Automatically scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      
      <header>
        <Navbar />
      </header>

      {/* Using a wrapper class helps with 'Sticky Footer' layouts */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom" element={<CustomForm />} />
          <Route path="/booking" element={<Booking />} />
          {/* Catch-all for 404s can go here later */}
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} CineFlight Studio</p>
          {/* Pro tip: use JS to keep the year current automatically */}
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/31626397234?text=Hello%20CineFlight!%20I%27m%20interested%20in%20your%20drone%20services."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp" 
      >
        <img src="/whatsapp.png" alt="WhatsApp" className="whatsapp-icon" />
      </a>
    </div>
  );
}

export default App;