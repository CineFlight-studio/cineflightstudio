import { Link } from "react-router-dom"
import "./Pages.css"

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Cinematic FPV & Drone Videos<br />
          That Sell Your Brand, Event & Property
        </h1>

        <p className="hero-sub">
          Professional drone filming for real estate, businesses and events
          across the Netherlands.
        </p>

        <div className="hero-buttons">
          <Link to="/services" className="cta primary">
            View Packages
          </Link>
          <Link to="/custom" className="cta secondary">
            Build Custom Project
          </Link>
        </div>

        <p className="hero-trust">
          🎥 Licensed & insured • 📍 Based in NL • ⚡ Fast delivery
        </p>
      </div>
    </section>
  )
}

export default Home
