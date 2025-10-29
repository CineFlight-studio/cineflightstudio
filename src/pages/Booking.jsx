import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./Pages.css"

function Booking() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const packageName = query.get("package") || "Starter Flight"
  const priceFromQuery = parseFloat(query.get("price")) || null
  const summary = query.get("summary")
    ? JSON.parse(decodeURIComponent(query.get("summary")))
    : null

  // 🎯 Base prices
  const PACKAGE_PRICES = {
    "Starter Flight": 275,
    "Cinematic Premium": 650,
    "Commercial Production": 1350,
    "Custom Project": priceFromQuery || 30,
  }

  const basePrice =
    priceFromQuery ||
    PACKAGE_PRICES[packageName] ||
    PACKAGE_PRICES["Starter Flight"]

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
  const [totalPrice, setTotalPrice] = useState(basePrice)
  const [canPay, setCanPay] = useState(false)
  const [paid, setPaid] = useState(false)

  // ✅ Validate form before allowing payment
  useEffect(() => {
    const { name, email, date, time, location } = formData
    setCanPay(!!(name && email && date && time && location))
  }, [formData])

  // 💶 Recalculate total
  useEffect(() => {
    let extra = 0
    if (distanceKm && distanceKm > INCLUDED_KM) {
      extra = (distanceKm - INCLUDED_KM) * PRICE_PER_KM
    }
    const total = basePrice + extra
    setTravelFee(extra)
    setTotalPrice(total.toFixed(2))
  }, [distanceKm, basePrice])

  // 🌍 Auto-fetch distance as user types location
  useEffect(() => {
    const fetchDistance = async () => {
      if (!formData.location || formData.location.length < 3) return
      try {
        const [baseData] = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            BASE_LOCATION
          )}`
        ).then((r) => r.json())

        const [userData] = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            formData.location
          )}`
        ).then((r) => r.json())

        if (baseData && userData) {
          const R = 6371
          const dLat = ((userData.lat - baseData.lat) * Math.PI) / 180
          const dLon = ((userData.lon - baseData.lon) * Math.PI) / 180
          const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(baseData.lat * Math.PI / 180) *
              Math.cos(userData.lat * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          const dist = R * c
          setDistanceKm(parseFloat(dist.toFixed(1)))
        } else {
          setDistanceKm(null)
        }
      } catch {
        setDistanceKm(null)
      }
    }

    // debounce delay: wait 1 sec after typing stops
    const delay = setTimeout(fetchDistance, 1000)
    return () => clearTimeout(delay)
  }, [formData.location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="page-section">
      <h2>Book Your Drone Session</h2>
      <p>
        You selected <strong>{packageName}</strong> — Base price: €
        {basePrice}
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

            <input
              type="text"
              name="location"
              placeholder="Event location or city"
              value={formData.location}
              onChange={handleChange}
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

          {/* PRICE DISPLAY */}
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              lineHeight: "1.6",
            }}
          >
            {distanceKm && (
              <p style={{ color: "#aaa" }}>
                📍 {distanceKm} km from studio — travel fee €
                {travelFee.toFixed(2)}
              </p>
            )}

            <h3
              style={{
                fontSize: "1.6rem",
                color: "#00BFFF",
                marginTop: "0.4rem",
              }}
            >
              Total: €{!isNaN(totalPrice) ? totalPrice : basePrice.toFixed(2)}
            </h3>
          </div>

          {/* PAYPAL */}
          <div style={{ marginTop: "1.2rem" }}>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AX5GzYOdK1JnKpoof6T-tRxXYpl_sX5NkpO9p2k0iuP2BNl8GFsqkfAIeeZ-MZtGBbDl-Vew1xeFhixf",
                currency: "EUR",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={!canPay}
                createOrder={(data, actions) =>
                  actions.order.create({
                    purchase_units: [
                      {
                        description: `CineFlight Studio - ${formData.service}`,
                        amount: { value: totalPrice },
                      },
                    ],
                  })
                }
                onApprove={async (data, actions) => {
                  await actions.order.capture()
                  setPaid(true)
                }}
              />
            </PayPalScriptProvider>

            {!canPay && (
              <p className="warning-text">
                ⚠️ Please complete all fields before paying.
              </p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>✅ Payment Successful!</h3>
          <p>
            Thank you, {formData.name}! Your{" "}
            <strong>{formData.service}</strong> on{" "}
            <strong>{formData.date}</strong> at{" "}
            <strong>{formData.time}</strong> is confirmed.
          </p>
          <p>We’ll contact you soon with final details for {formData.location}.</p>
        </div>
      )}
    </section>
  )
}

export default Booking
