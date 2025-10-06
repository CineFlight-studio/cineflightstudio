import { useState } from "react"
import "./Pages.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus("✅ Message sent successfully! Check your inbox.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus(`❌ ${data.error || "Failed to send message."}`)
      }
    } catch (error) {
      console.error(error)
      setStatus("⚠️ Error sending message. Please try again later.")
    }
  }

  return (
    <section className="page-section contact-page">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:cineflight.studio@gmail.com">cineflight.studio@gmail.com</a></p>
      <p>Phone: <a href="tel:+31626397234">+31 626 397 234</a></p>

      <div className="contact-form-container">
        <h3>Send us a message</h3>
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
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  )
}

export default Contact
