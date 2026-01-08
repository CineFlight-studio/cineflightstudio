import { useState } from "react"
import "./Home.css"

function Home() {
  return (
    <>
      <section className="hero" id="home">
        <video autoPlay loop muted playsInline className="background-video">
          <source
            src="https://isadybjjp1gn22uv.public.blob.vercel-storage.com/drone.mp4"
            type="video/mp4"
          />
        </video>

        <div className="overlay">
          <div className="logo-container">
            <img src="/logo.png" alt="CineFlight Studio" className="logo-glow" />
          </div>

          <p className="subtitle">Professional Cinematic Drone Services</p>

          {/* TRUST BULLETS */}
          <div className="trust-bullets">
            <span>✔ EU A1/A3 Certified Pilot</span>
            <span>✔ Fully Insured & Legal Flights</span>
            <span>✔ Fast Delivery – 48–72h Preview</span>
          </div>

          <div className="button-group">
            <a href="/services" className="btn primary">View Packages</a>
            <a href="/custom" className="btn">Build Custom Package</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
