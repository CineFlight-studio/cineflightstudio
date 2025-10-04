import "./Pages.css"

function Services() {
  return (
    <section className="page-section">
      <h2 className="page-title">✨ Our Services</h2>
      <p className="page-subtitle">
        At <strong>CineFlight Studio</strong>, we provide premium drone services
        for every type of project. From unforgettable events to professional
        branding, we deliver cinematic results.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <img src="/services/wedding.jpg" alt="Weddings" />
          <h3>Weddings & Events 🎉</h3>
          <p>
            Capture your most important day with breathtaking aerial shots.
            Perfect for weddings, birthdays, and festivals.
          </p>
          <a href="/contact" className="btn">Request a Quote</a>
        </div>

        <div className="service-card">
          <img src="/services/realestate.jpg" alt="Real Estate" />
          <h3>Real Estate 🏡</h3>
          <p>
            Stunning aerial tours of properties, hotels, and Airbnb listings.
            Attract buyers with cinematic perspectives.
          </p>
          <a href="/contact" className="btn">Request a Quote</a>
        </div>

        <div className="service-card">
          <img src="/services/commercial.jpg" alt="Commercials" />
          <h3>Commercials & Ads 📺</h3>
          <p>
            Creative and professional drone content for businesses, ads, and
            campaigns in 4K/6K.
          </p>
          <a href="/contact" className="btn">Request a Quote</a>
        </div>

        <div className="service-card">
          <img src="/services/custom.jpg" alt="Custom Projects" />
          <h3>Custom Projects 🎬</h3>
          <p>
            Have a unique idea? From sports to travel films, we’ll turn your
            vision into cinematic reality.
          </p>
          <a href="/contact" className="btn">Request a Quote</a>
        </div>
      </div>
    </section>
  )
}

export default Services
