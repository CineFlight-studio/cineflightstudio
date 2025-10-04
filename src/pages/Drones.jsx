import "./Pages.css"

function Drones() {
  return (
    <section className="page-section">
      <h2>Our Drone Fleet</h2>
      <p>
        At CineFlight Studio, we use a versatile fleet of drones to ensure the
        perfect shot for every project. Each drone is selected for its unique
        capabilities, allowing us to adapt to different environments and client
        needs.
      </p>

      <div className="drone-grid">
        <div className="drone-card">
          <img src="/bee35.jpg" alt="SpeedyBee Bee35" />
          <h3>SpeedyBee Bee35</h3>
          <p>
            Ideal for indoor and close-range flights. Compact yet powerful,
            perfect for smooth cinematic tracking shots.
          </p>
        </div>

        <div className="drone-card">
          <img src="/bee25.jpg" alt="SpeedyBee Bee25" />
          <h3>SpeedyBee Bee25</h3>
          <p>
            Ultra-light and agile micro drone. Great for creative low-level
            shots and navigating tight spaces.
          </p>
        </div>

        <div className="drone-card">
          <img src="/nazgul.jpg" alt="iFlight Nazgul Evoque F6 V2" />
          <h3>iFlight Nazgul Evoque F6 V2</h3>
          <p>
            A powerhouse for outdoor shoots. Stable in windy conditions and
            capable of carrying larger cameras for high-quality footage.
          </p>
        </div>

        <div className="drone-card">
          <img src="/helion10.jpg" alt="iFlight Helion 10" />
          <h3>iFlight Helion 10</h3>
          <p>
            Long-range endurance drone designed for breathtaking landscapes and
            adventure filming. Perfect for high-altitude cinematic flights.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Drones
