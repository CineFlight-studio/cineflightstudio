import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Portfolio from "./pages/Portfolio"
import Contact from "./pages/Contact"
import Drones from "./pages/Drones"
import "./App.css"

function App() {
  return (
    <div>
      <header className="header">
        <Link to="/" className="logo-link">
          <img
            src="/logo.png" // <- your cinematic logo image
            alt="CineFlight Studio Logo"
            className="nav-logo"
          />
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/drones">Drones</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2025 CineFlight Studio</p>
      </footer>
    </div>
  )
}

export default App
