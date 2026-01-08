import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./Pages.css"

const PACKAGE_MAP = {
  starter: { name: "Starter Flight", price: 275 },
  premium: { name: "Cinematic Premium", price: 650 },
  commercial: { name: "Commercial Production", price: 1350 },
  custom: { name: "Custom Project", price: 30 },
}

function Booking() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const pkgKey = query.get("package") || "starter"
  const customPrice = parseFloat(query.get("price"))

  const basePackage = PACKAGE_MAP[pkgKey] || PACKAGE_MAP.starter
  const basePrice = pkgKey === "custom" && customPrice ? customPrice : basePackage.price

  const INCLUDED_KM = 10
  const PRICE_PER_KM = 0.6

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    location: "",
  })

  const [distanceKm, setDistanceKm] = useState(null)
  const [travelFee, setTravelFee] = useState(0)
  const [total, setTotal] = useState(basePrice)
  const [canPay, setCanPay] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    const valid = Object.values(form).every(Boolean)
    setCanPay(valid)
  }, [form])

  useEffect(() => {
    const extra = distanceKm && distanceKm > INCLUDED_KM
      ? (distanceKm - INCLUDED_KM) * PRICE_PER_KM
      : 0

    setTravelFee(extra)
    setTotal((basePrice + extra).toFixed(2))
  }, [distanceKm, basePrice])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <section className="page-section">
      <h2>Booking – {basePackage.name}</h2>

      <form className="contact-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="location" placeholder="Location / City" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="time" type="time" onChange={handleChange} required />
      </form>

      <div className="price-box">
        <p>🎬 Package: €{basePrice}</p>
        {distanceKm && <p>🚗 Travel fee: €{travelFee.toFixed(2)}</p>}
        <h3>Total: €{total}</h3>
      </div>

      <PayPalScriptProvider
        options={{
          "client-id": "YOUR_PAYPAL_CLIENT_ID",
          currency: "EUR",
        }}
      >
        <PayPalButtons
          disabled={!canPay}
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description: basePackage.name,
                  amount: { value: total },
                },
              ],
            })
          }
          onApprove={async (_, actions) => {
            await actions.order.capture()
            setPaid(true)
          }}
        />
      </PayPalScriptProvider>

      {!canPay && <p className="warning-text">Fill all fields to pay</p>}
      {paid && <h3>✅ Payment successful – we will contact you</h3>}
    </section>
  )
}

export default Booking
