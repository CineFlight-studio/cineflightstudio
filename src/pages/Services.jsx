import { Link } from "react-router-dom"
import "./Pages.css"

function Services() {
  const packages = [
    {
      name: "Starter Flight",
      price: 275,
      description: [
        "Perfect for small businesses & private projects",
        "Up to 30 min flight time",
        "Full HD / 4K drone footage",
        "2 professionally edited clips",
        "Online delivery within 7 days",
      ],
      link: "/booking?package=Starter Flight",
    },
    {
      name: "Cinematic Premium",
      price: 650,
      description: [
        "High-end cinematic content",
        "Up to 1 hour flight time",
        "4K cinematic video",
        "5 edited clips + drone photos",
        "Music & logo intro/outro",
      ],
      link: "/booking?package=Cinematic Premium",
    },
    {
      name: "Commercial Production",
      price: 1350,
      description: [
        "For agencies & serious brands",
        "Multi-location shooting",
        "4K HDR footage",
        "Advanced color grading & motion graphics",
        "Commercial usage rights",
      ],
      link: "/booking?package=Commercial Production",
    },
  ]

  return (
    <section className="page-section services">
      <h2 className="page-title">Drone Packages</h2>

      <div className="service-cards">
        {packages.map((pkg, i) => (
          <div className="service-card" key={i}>
            <h3>{pkg.name}</h3>
            <p className="price">€{pkg.price}</p>

            <ul>
              {pkg.description.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>

            <Link to={pkg.link} className="cta">
              Book Now
            </Link>
          </div>
        ))}

        {/* CUSTOM */}
        <div className="service-card custom">
          <h3>Custom Project</h3>
          <p className="price">From €30</p>

          <ul>
            <li>Select only what you need</li>
            <li>Raw footage, edits, extras</li>
            <li>Instant price calculation</li>
            <li>Pay & book online</li>
          </ul>

          <Link to="/custom" className="cta">
            Build Custom Project
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
