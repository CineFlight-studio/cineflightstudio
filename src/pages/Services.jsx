import { Link } from "react-router-dom"
import "./Pages.css"

function Services() {
  const packages = [
    {
      name: "Starter Flight",
      price: 275,
      features: [
        "Up to 30 min flight time",
        "Full HD drone footage",
        "2 edited cinematic clips",
        "Online delivery",
      ],
      slug: "starter",
    },
    {
      name: "Cinematic Premium",
      price: 650,
      features: [
        "Up to 1 hour flight",
        "4K cinematic video",
        "5 edited clips + drone photos",
        "Licensed music & branding",
      ],
      slug: "premium",
    },
    {
      name: "Commercial Production",
      price: 1350,
      features: [
        "Up to 3 hours (multi-location)",
        "4K HDR footage",
        "Agency & commercial usage",
        "Priority scheduling",
      ],
      slug: "commercial",
    },
  ]

  return (
    <section className="page-section services">
      <h2 className="page-title">Drone Packages</h2>

      <div className="service-cards">
        {packages.map((p, i) => (
          <div className="service-card" key={i}>
            <h3>{p.name}</h3>
            <p className="price">€{p.price}</p>

            <ul>
              {p.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>

            <Link
              to={`/booking?package=${p.slug}`}
              className="cta"
            >
              Book Now
            </Link>
          </div>
        ))}

        {/* CUSTOM */}
        <div className="service-card custom">
          <h3>Custom Project</h3>
          <p className="price">From €30</p>
          <ul>
            <li>Choose only what you need</li>
            <li>Based on real packages</li>
            <li>Instant price calculation</li>
          </ul>
          <Link to="/custom" className="cta">
            Build Custom Package
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
