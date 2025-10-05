import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="CineFlight Studio" />
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <Link to="/drones" onClick={() => setMenuOpen(false)}>Drones</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
    </header>
  )
}

export default Navbar
