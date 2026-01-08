import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./Pages.css"

function Booking() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const packageName = query.get("package") || "Starter Flight"

  const PACKAGE_PRICES = {
    "Starter Flight": 275,
    "Cinematic Premium": 650,
    "Commercial Production": 1350,
  }

  const BASE_LOCATION = "Kastanjestraat 9, Venlo, Netherlands"
  const INCLUDED_KM = 10
  const PRICE_PER_KM = 0.6

  const basePrice = PACKAGE_PRICES[packageName] || 0

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    date: "",
    time: "",
  })

  const [distanceKm, setDistanceKm] = useState(null)
  const [travelFee, setTravelFee] = useState(0)
  const [totalPrice, setTotalPrice] = useState(basePrice)
  const [canPay, setCanPay] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    const valid =
      formData.name &&
      formData.email &&
      formData.location &&
      formData.date &&
      formData.time
    setCanPay(valid)
  }, [formData])

  useEffect(() => {
    const extra =
      distanceKm && distanceKm > INCLUDED_KM
        ? (distanceKm - INCLUDED_KM) * PRICE_PER_KM
        : 0

    setTravelFee(extra)
    setTotalPrice((basePrice + extra).toFixed(2))
  }, [distanceKm, basePrice])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLocationBlur = async () => {
    if (!formData.location) return

    const fetchCoords = async (q) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      )
      const data = await res.json()
      return data[0]
    }

    const base = await fetchCoords(BASE_LOCATION)
    const user = await fetchCoords(formData.location)

    if (!base || !user) return

    const R = 6371
    const dLat = ((user.lat - base.lat) * Math.PI) / 180
    const dLon = ((user.lon - base.lon) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(base.lat * Math.PI / 180) *
        Math.cos(user.lat * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    setDistanceKm((R * c).toFixed(1))
  }

  return (
    <section className="page-section">
      <h2>Booking</h2>

      <p>
        <strong>{packageName}</strong> — €{basePrice}
      </p>

      {!paid ? (
        <>
          <form className="contact-form">
            <input name="name" placeholder="Your name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
              name="location"
              placeholder="Event location"
              onChange={handleChange}
              onBlur={handleLocationBlur}
            />

            <div className="date-time">
              <input type="date" name="date" onChange={handleChange} />
              <input type="time" name="time" onChange={handleChange} />
            </div>
          </form>

          {/* PRICE BREAKDOWN */}
          <div className="price-box">
            <p>Package: €{basePrice}</p>
            {distanceKm && (
              <p>
                Travel fee ({distanceKm} km): €{travelFee.toFixed(2)}
              </p>
            )}
            <h3>Total: €{totalPrice}</h3>
          </div>

          <PayPalScriptProvider
            options={{ "client-id": "YOUR_CLIENT_ID", currency: "EUR" }}
          >
            <PayPalButtons
              disabled={!canPay}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: totalPrice },
                    },
                  ],
                })
              }
              onApprove={(data, actions) =>
                actions.order.capture().then(() => setPaid(true))
              }
            />
          </PayPalScriptProvider>

          {!canPay && (
            <p className="warning-text">
              Please fill all fields to continue
            </p>
          )}
        </>
      ) : (
        <h3>✅ Booking confirmed – we’ll contact you shortly</h3>
      )}
    </section>
  )
}

export default Booking
