import { Link } from "react-router-dom"
import "./Pages.css"

function Home() {
  return (
    <div className="home-container">
      {/* 1. HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="hero">
        <div className="video-overlay"></div>
        {/* Pro Tip: Use a small, compressed .mp4 for speed */}
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/hero-drone-reel.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>
            Cinematic FPV & Drone Videos<br />
            <span>That Sell Your Brand & Property</span>
          </h1>

          <p className="hero-sub">
            Professional aerial cinematography for real estate and events 
            across the Netherlands.
          </p>

          <div className="hero-buttons">
            <Link to="/services" className="cta primary">View Packages</Link>
            <Link to="/booking" className="cta secondary">Book a Flight</Link>
          </div>
        </div>
      </section>

      {/* 2. STATS / TRUST BAR */}
      <div className="trust-bar">
        <span>🎥 Licensed & Insured</span>
        <span>📍 Based in Venlo</span>
        <span>⚡ 48h Delivery</span>
        <span>🎬 4K / 5.4K Quality</span>
      </div>

      {/* 3. QUICK SERVICES PREVIEW */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="icon">🏡</div>
          <h3>Real Estate</h3>
          <p>Unique FPV fly-throughs that show off every corner of a property.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🏎️</div>
          <h3>Events & Sports</h3>
          <p>High-speed tracking shots for festivals, cars, and outdoor sports.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🏢</div>
          <h3>Commercials</h3>
          <p>High-end cinematic b-roll for your brand's promotional videos.</p>
        </div>
      </section>

      {/* 4. "HOW IT WORKS" SECTION */}
      <section className="process">
        <h2>How it Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">01</span>
            <h4>Book</h4>
            <p>Pick a package and choose your date.</p>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <h4>Fly</h4>
            <p>We capture the magic with FPV & GPS drones.</p>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <h4>Deliver</h4>
            <p>Receive your edited 4K footage within 48 hours.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home