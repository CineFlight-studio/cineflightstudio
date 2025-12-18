// src/pages/Home.jsx
import "./Home.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>CineFlight Studio</h1>
        <p>Cinematic drone visuals that elevate your story</p>

        <div className="hero-buttons">
          <a href="/services" className="btn primary">View Services</a>
          <a href="/booking" className="btn secondary">Book a Flight</a>
        </div>
      </div>
    </section>
  );
}
