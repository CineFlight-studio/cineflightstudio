import { Link } from "react-router-dom"
import "./Pages.css"

function Services() {
  return (
    <section className="page-section">
      <h2 className="page-title">📌 Our Services & Packages</h2>
      <p className="page-subtitle">
        At <strong>CineFlight Studio</strong>, we deliver cinematic drone footage tailored for weddings, real estate, commercials and events across the Netherlands. Choose your package below or contact us for a custom quote.
      </p>

      <div className="services-grid">
        {/* Starter Flight */}
        <div className="service-card">
          <h3>Starter Flight</h3>
          <p className="price">€275</p>
          <ul>
            <li>Up to 30 minutes flight time</li>
            <li>Full HD (1080p) drone footage</li>
            <li>2 curated edited drone clips</li>
            <li>Online delivery within 7 days</li>
          </ul>
          <Link to="/booking" className="cta">Book Now</Link>
        </div>

        {/* Cinematic Premium */}
        <div className="service-card">
          <h3>Cinematic Premium</h3>
          <p className="price">€650</p>
          <ul>
            <li>Up to 1 hour flight time</li>
            <li>4K cinematic drone video</li>
            <li>5 edited clips + 5 drone stills</li>
            <li>Licensed music + logo intro/outro</li>
            <li>Online & USB delivery</li>
          </ul>
          <Link to="/booking?package=starter" className="cta">Book Now</Link>
          <Link to="/booking?package=premium" className="cta">Book Now</Link>
          <Link to="/booking?package=commercial" className="cta">Book Now</Link>
          </div>

        {/* Commercial Production */}
        <div className="service-card">
          <h3>Commercial Production</h3>
          <p className="price">€1 350</p>
          <ul>
            <li>Up to 3 hours flight (multi-location)</li>
            <li>4K HDR drone footage</li>
            <li>10 edited clips + full photo set</li>
            <li>Colour grading, motion graphics & agency use rights</li>
            <li>Priority scheduling</li>
          </ul>
          <Link to="/booking" className="cta">Book Now</Link>
        </div>
      </div>

      <p style={{ marginTop: "2rem", textAlign: "center" }}>
        *Add-ons: extra flight time, rush delivery, No-Fly-Zone permits, travel outside NL service area — <Link to="/contact">Contact us</Link>.
      </p>
    </section>
  )
}

export default Services
