import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"
import "./Pages.css"

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
  })
  const [paid, setPaid] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="page-section">
      <h2>Book a Drone Session</h2>
      <p>Reserve your cinematic flight with CineFlight Studio.</p>

      {!paid ? (
        <>
          <form className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
            />
            <select name="service" onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="Wedding Filming">Wedding Filming</option>
              <option value="Real Estate Drone Shots">Real Estate Drone Shots</option>
              <option value="Event Coverage">Event Coverage</option>
              <option value="Custom Project">Custom Project</option>
            </select>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
            />
          </form>

          {/* PayPal Button */}
          <PayPalScriptProvider
            options={{
              "client-id": "AX5GzYOdK1JnKpoof6T-tRxXYpl_sX5NkpO9p2k0iuP2BNl8GFsqkfAIeeZ-MZtGBbDl-Vew1xeFhixf",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "CineFlight Studio Booking",
                      amount: { value: "49.99" }, // change price here
                    },
                  ],
                })
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture()
                setPaid(true)
              }}
            />
          </PayPalScriptProvider>
        </>
      ) : (
        <div>
          <h3>✅ Payment Successful!</h3>
          <p>Thank you, {formData.name}! We’ll contact you shortly.</p>
        </div>
      )}
    </section>
  )
}

export default Booking
