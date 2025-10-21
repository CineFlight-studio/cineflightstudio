import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      {/* Logo */}
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <img src="/logo.png" alt="CineFlight Studio" />
      </Link>

      {/* Mobile menu toggle */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Navigation links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <Link to="/drones" onClick={() => setMenuOpen(false)}>Drones</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/booking" onClick={() => setMenuOpen(false)}>Booking</Link> {/* ✅ Added Booking */}
      </nav>
    </header>
  )
}

export default Navbar
