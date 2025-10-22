import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./Pages.css"

function Booking() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const packageName = query.get("package") || "Starter Flight"
  const priceFromQuery = query.get("price")
  const summary = query.get("summary") ? JSON.parse(decodeURIComponent(query.get("summary"))) : null

  // 🎯 base price table
  const PACKAGE_PRICES = {
    "Starter Flight": 275,
    "Cinematic Premium": 650,
    "Commercial Production": 1350,
    "Custom Project": priceFromQuery ? parseFloat(priceFromQuery) : 30,
  }

  const BASE_LOCATION = "Kastanjestraat 9, 5922 CA, Venlo, Netherlands"
  const PRICE_PER_KM = 0.6
  const INCLUDED_KM = 10

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: packageName,
    date: "",
    time: "",
    location: "",
  })

  const [distanceKm, setDistanceKm] = useState(null)
  const [travelFee, setTravelFee] = useState(0)
  const [totalPrice, setTotalPrice] = useState(PACKAGE_PRICES[packageName])
  const [canPay, setCanPay] = useState(false)
  const [paid, setPaid] = useState(false)

  // validate form
  useEffect(() => {
    const { name, email, service, date, time, location } = formData
    const valid = name && email && service && date && time && location
    setCanPay(valid)
  }, [formData])

  // recalc total when distance changes
  useEffect(() => {
    const base = PACKAGE_PRICES[packageName]
    const extra = distanceKm && distanceKm > INCLUDED_KM ? (distanceKm - INCLUDED_KM) * PRICE_PER_KM : 0
    setTravelFee(extra)
    setTotalPrice((base + extra).toFixed(2))
  }, [distanceKm, packageName])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🌍 Get distance using Nominatim API
  const handleLocationBlur = async () => {
    if (!formData.location) return
    try {
      const baseResp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(BASE_LOCATION)}`
      )
      const userResp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`
      )

      const [baseData] = await baseResp.json()
      const [userData] = await userResp.json()

      if (baseData && userData) {
        const R = 6371 // earth radius km
        const dLat = ((userData.lat - baseData.lat) * Math.PI) / 180
        const dLon = ((userData.lon - baseData.lon) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(baseData.lat * Math.PI / 180) *
            Math.cos(userData.lat * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const dist = R * c
        setDistanceKm(dist.toFixed(1))
      } else {
        setDistanceKm(null)
      }
    } catch (err) {
      console.error("Error fetching distance:", err)
      setDistanceKm(null)
    }
  }

  return (
    <section className="page-section">
      <h2>Book Your Drone Session</h2>
      <p>
        You selected <strong>{packageName}</strong> — base price €{PACKAGE_PRICES[packageName]}.
      </p>

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

            <label>Location / Address</label>
            <input
              type="text"
              name="location"
              placeholder="City or address"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleLocationBlur}
              required
            />

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

          {distanceKm && (
            <p>
              📍 Estimated distance: <strong>{distanceKm} km</strong> — travel fee €{travelFee.toFixed(2)}
            </p>
          )}

          <h3 style={{ marginTop: "1rem" }}>
            Total: €<span className="price-highlight">{totalPrice}</span>
          </h3>

          <div style={{ marginTop: "1.5rem" }}>
            <PayPalScriptProvider
              options={{
                "client-id": "AX5GzYOdK1JnKpoof6T-tRxXYpl_sX5NkpO9p2k0iuP2BNl8GFsqkfAIeeZ-MZtGBbDl-Vew1xeFhixf",
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
                        amount: { value: totalPrice },
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
                ⚠️ Please complete all fields before proceeding to payment.
              </p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>✅ Payment Successful!</h3>
          <p>
            Thank you, {formData.name}! Your booking for <strong>{formData.service}</strong> on{" "}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong> is confirmed.
          </p>
          <p>We’ll contact you soon to confirm travel details to {formData.location}.</p>
        </div>
      )}
    </section>
  )
}

export default Booking
