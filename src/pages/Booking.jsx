import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import "./Pages.css"

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
  })
  const [paid, setPaid] = useState(false)
  const [searchParams] = useSearchParams()
  const [selectedPackage, setSelectedPackage] = useState({
    name: "Custom Booking",
    price: "0.00",
  })

  // Detect selected package from URL
  useEffect(() => {
    const pkg = searchParams.get("package")
    switch (pkg) {
      case "starter":
        setSelectedPackage({ name: "Starter Flight", price: "275.00" })
        break
      case "premium":
        setSelectedPackage({ name: "Cinematic Premium", price: "650.00" })
        break
      case "commercial":
        setSelectedPackage({ name: "Commercial Production", price: "1350.00" })
        break
      default:
        setSelectedPackage({ name: "Custom Booking", price: "0.00" })
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="page-section">
      <h2>Book Your Drone Session</h2>
      <p>
        Package: <strong>{selectedPackage.name}</strong> —{" "}
        <span className="price">€{selectedPackage.price}</span>
      </p>

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
              "client-id": "AX5GzYOdK1JnKpoof6T-tRxXYpl_sX5NkpO9p2k0iuP2BNl8GFsqkfAIeeZ-MZtGBbDl-Vew1xeFhixf", // replace with your PayPal ID
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: selectedPackage.name,
                      amount: { value: selectedPackage.price },
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
