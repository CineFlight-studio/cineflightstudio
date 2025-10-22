// src/pages/Services.jsx
import { Link } from "react-router-dom"
import "./Pages.css"

function Services() {
  const packages = [
    {
      name: "Starter Flight",
      price: "€275",
      description: [
        "Up to 30 minutes flight time",
        "Full HD (1080p) drone footage",
        "2 curated edited drone clips",
        "Online delivery within 7 days",
      ],
      link: "/booking?package=starter",
    },
    {
      name: "Cinematic Premium",
      price: "€650",
      description: [
        "Up to 1 hour flight time",
        "4K cinematic drone video",
        "5 edited clips + 5 drone stills",
        "Licensed music + logo intro/outro",
        "Online & USB delivery",
      ],
      link: "/booking?package=premium",
    },
    {
      name: "Commercial Production",
      price: "€1 350",
      description: [
        "Up to 3 hours flight (multi-location)",
        "4K HDR drone footage",
        "10 edited clips + full photo set",
        "Colour grading, motion graphics & agency use rights",
        "Priority scheduling",
      ],
      link: "/booking?package=commercial",
    },
  ]

  return (
    <section className="page-section services">
      <h2 className="page-title">Our Drone Packages</h2>
      <div className="service-cards">
        {packages.map((pkg, index) => (
          <div className="service-card" key={index}>
            <h3>{pkg.name}</h3>
            <p className="price">{pkg.price}</p>
            <ul>
              {pkg.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <Link to={pkg.link} className="cta">
              Book Now
            </Link>
          </div>
        ))}

        {/* ✅ Custom Project card */}
        <div className="service-card custom">
          <h3>Custom Project</h3>
          <p className="price">From €30</p>
          <ul>
            <li>Build your own package</li>
            <li>Adjust duration, editing & extras</li>
            <li>Instant price estimation</li>
            <li>Book directly online</li>
          </ul>
          <Link to="/custom" className="cta">
            Custom Project
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
