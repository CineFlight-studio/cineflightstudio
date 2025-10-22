import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./Pages.css"

function Booking() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  // Read query params (if coming from CustomForm)
  const packageName = query.get("package") || "standard"
  const priceFromQuery = query.get("price")
  const summary = query.get("summary") ? JSON.parse(decodeURIComponent(query.get("summary"))) : null

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: packageName !== "custom" ? packageName : "Custom Project",
    date: "",
    time: "",
  })

  const [paid, setPaid] = useState(false)
  const [canPay, setCanPay] = useState(false)

  // Validate required fields before allowing payment
  useEffect(() => {
    const { name, email, service, date, time } = formData
    const valid = name && email && service && date && time
    setCanPay(valid)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Determine price
  const price = priceFromQuery || "49.99"

  return (
    <section className="page-section">
      <h2>Book Your Drone Session</h2>
      <p>Reserve your flight with CineFlight Studio and confirm payment securely via PayPal.</p>

      {!paid ? (
        <>
          <form className="contact-form">
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

            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="Starter Flight">Starter Flight</option>
              <option value="Cinematic Premium">Cinematic Premium</option>
              <option value="Commercial Production">Commercial Production</option>
              <option value="Custom Project">Custom Project</option>
            </select>

            <div className="date-time">
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </form>

          {summary && (
            <div className="summary-box">
              <h4>Custom Package Summary</h4>
              <pre>{JSON.stringify(summary, null, 2)}</pre>
            </div>
          )}

          {/* PayPal Button */}
          <div style={{ marginTop: "1.5rem" }}>
            <PayPalScriptProvider
              options={{
                "client-id": "YOUR_PAYPAL_CLIENT_ID",
                currency: "EUR",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={!canPay}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: `CineFlight Studio - ${formData.service}`,
                        amount: { value: price },
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

            {!canPay && (
              <p className="warning-text">
                ⚠️ Please fill in all required fields before paying.
              </p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>✅ Payment Successful!</h3>
          <p>
            Thank you, {formData.name}! Your booking for{" "}
            <strong>{formData.service}</strong> on{" "}
            <strong>{formData.date}</strong> at{" "}
            <strong>{formData.time}</strong> is confirmed.
          </p>
          <p>We’ll contact you soon to finalize the details.</p>
        </div>
      )}
    </section>
  )
}

export default Booking
