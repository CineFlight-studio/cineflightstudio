import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Portfolio from "./pages/Portfolio"
import Drones from "./pages/Drones"
import Contact from "./pages/Contact"
import "./App.css"
import Booking from "./pages/Booking"

function App() {
  return (
    <div className="app">
      {/* Navigation bar */}
      <Navbar />

      {/* Page routes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CineFlight Studio</p>
      </footer>

      {/* ✅ WhatsApp Floating Button (Visible on all pages) */}
      <a
        href="https://wa.me/31626397234?text=Hello%20CineFlight!%20I%27m%20interested%20in%20your%20drone%20services."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/whatsapp.png"
          alt="WhatsApp Chat"
          className="whatsapp-icon"
        />
      </a>
    </div>
  )
}

export default App
