import { useState } from "react";
import "./Home.css";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Fix for smooth typing and state handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Send email through your /api/sendEmail route
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("⚠️ Error sending message. Please try again later.");
    }
  };

  return (
    <>
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero" id="home">
        <video autoPlay loop muted playsInline className="background-video">
          <source
            src="https://isadybjjp1gn22uv.public.blob.vercel-storage.com/drone.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="overlay">
          <div className="logo-container">
            <img
              src="/logo.png"
              alt="CineFlight Studio Logo"
              className="logo-glow"
            />
          </div>

          <p className="subtitle">Cinematic Drone Experiences</p>

          <div className="button-group">
            <button
              className="btn"
              onClick={() =>
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              About Us
            </button>
            <button
              className="btn"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Us
            </button>
            <a href="/drones" className="btn">
              Meet Our Drones
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- About Section ---------------- */}
      <section id="about" className="page-section">
        <h2>About CineFlight Studio</h2>
        <p>
          At <strong>CineFlight Studio</strong>, we transform ordinary moments
          into extraordinary cinematic stories. With a passion for aerial
          cinematography, we specialize in capturing weddings, real estate,
          commercials, and events with stunning drone footage.
        </p>
        <p>
          Our mission is simple: deliver breathtaking visuals that leave a
          lasting impression. Whether it’s your wedding, a commercial, or a
          promotional shoot — we make every frame unforgettable.
        </p>
        <p>
          🚀 Built on creativity, precision, and cutting-edge technology, we’re
          here to elevate your vision to the skies.
        </p>
      </section>

      {/* ---------------- Certificate Section ---------------- */}
      <section className="page-section">
        <h2>📜 Certified Drone Pilot</h2>
        <p>
          CineFlight Studio is officially certified under{" "}
          <strong>European A1/A3 regulations</strong>, ensuring safe and legal
          drone operations.
        </p>
        <img
          src="/certificate.jpg"
          alt="Drone Certificate A1/A3"
          className="certificate-img"
        />
      </section>

      {/* ---------------- Contact Section ---------------- */}
      <section id="contact" className="page-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>

      {/* ---------------- WhatsApp Floating Button ---------------- */}
      <a
        href="https://wa.me/31626397234?text=Hello%20CineFlight!%20I%27m%20interested%20in%20your%20drone%20services."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/whatsapp.png" alt="WhatsApp" className="whatsapp-icon" />
      </a>
    </>
  );
}

export default Home;
