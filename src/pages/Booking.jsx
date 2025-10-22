// src/pages/Booking.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import "./Pages.css"

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    location: "",
  })
  const [paid, setPaid] = useState(false)
  const [searchParams] = useSearchParams()
  const [selectedPackage, setSelectedPackage] = useState({
    name: "Custom Booking",
    price: "0.00",
    summary: null,
  })

  useEffect(() => {
    const pkg = searchParams.get("package")
    // preset packages
    if (pkg === "starter") {
      setSelectedPackage({ name: "Starter Flight", price: "275.00", summary: null })
    } else if (pkg === "premium") {
      setSelectedPackage({ name: "Cinematic Premium", price: "650.00", summary: null })
    } else if (pkg === "commercial") {
      setSelectedPackage({ name: "Commercial Production", price: "1350.00", summary: null })
    } else if (pkg === "custom") {
      const price = searchParams.get("price") || "0.00"
      const rawSummary = searchParams.get("summary")
      let summary = null
      try {
        if (rawSummary) summary = JSON.parse(decodeURIComponent(rawSummary))
      } catch (err) {
        summary = null
      }
      setSelectedPackage({ name: "Custom Package", price: Number(price).toFixed(2), summary })
    } else {
      setSelectedPackage({ name: "Custom Booking", price: "0.00", summary: null })
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handlePaymentSuccess = async (orderData) => {
    // you can call your backend here to save booking & notify (optional)
    setPaid(true)

    // Example: send to an API endpoint to save booking (not included)
    // await fetch('/api/book', { method: 'POST', body: JSON.stringify({ formData, selectedPackage, orderData }) })
  }

  return (
    <section className="page-section">
      <h2 className="page-title">Book Your Drone Session</h2>

      <p style={{ textAlign: "center" }}>
        Package: <strong>{selectedPackage.name}</strong> — <span className="price">€{selectedPackage.price}</span>
      </p>

      {selectedPackage.summary && (
        <div className="custom-summary">
          <h4>Custom details</h4>
          <ul>
            <li>Duration: {selectedPackage.summary.durationMins} min</li>
            <li>Editing: {selectedPackage.summary.editing ? "Yes" : "No"}</li>
            <li>Color grade: {selectedPackage.summary.colorGrade ? "Yes" : "No"}</li>
            <li>Raw footage: {selectedPackage.summary.rawFootage ? "Yes" : "No"}</li>
            <li>Extra clips: {selectedPackage.summary.extraClips}</li>
            <li>Travel km (approx): {selectedPackage.summary.travelKm} km</li>
            <li>Notes: {selectedPackage.summary.notes || "—"}</li>
          </ul>
        </div>
      )}

      {!paid ? (
        <>
          <form className="contact-form" style={{ maxWidth: 620, margin: "0 auto" }}>
            <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
            <input name="location" placeholder="Location / Address" value={formData.location} onChange={handleChange} />
          </form>

          <div style={{ maxWidth: 420, margin: "2rem auto", textAlign: "center" }}>
            {/* PayPal SDK - replace YOUR_PAYPAL_CLIENT_ID with your actual ID */}
            <PayPalScriptProvider
              options={{
                "client-id": "AX5GzYOdK1JnKpoof6T-tRxXYpl_sX5NkpO9p2k0iuP2BNl8GFsqkfAIeeZ-MZtGBbDl-Vew1xeFhixf", // sandbox/live ID
                currency: "EUR",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: `${selectedPackage.name} - CineFlight Studio`,
                        amount: { value: selectedPackage.price },
                      },
                    ],
                  })
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture()
                  await handlePaymentSuccess(order)
                }}
              />
            </PayPalScriptProvider>
          </div>
        </>
      ) : (
        <div className="success">
          <h3>✅ Payment Successful!</h3>
          <p>
            Thanks {formData.name || "customer"} — we received your payment of €
            {selectedPackage.price}. We'll contact you at {formData.email}.
          </p>
        </div>
      )}
    </section>
  )
}
