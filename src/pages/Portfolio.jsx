import "./Pages.css"

function Portfolio() {
  return (
    <section className="page-section">
      <h2>Our Portfolio</h2>
      <p>
        Explore a selection of our cinematic aerial projects. Each video is
        crafted with precision and creativity to capture unforgettable
        perspectives.
      </p>

      <div className="portfolio-grid">
        <div className="portfolio-item">
          <img src="/portfolio1.jpg" alt="Wedding Showcase" />
          <p>Wedding Aerial Highlights</p>
        </div>
        <div className="portfolio-item">
          <img src="/portfolio2.jpg" alt="Real Estate Property" />
          <p>Luxury Real Estate Showcase</p>
        </div>
        <div className="portfolio-item">
          <img src="/portfolio3.jpg" alt="Commercial Ad" />
          <p>Commercial Ad Production</p>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
