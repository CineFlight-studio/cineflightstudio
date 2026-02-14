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

  const [formData, setFormData] = useState({ name: "", email: "", location: "", date: "", time: "" })
  const [distanceKm, setDistanceKm] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false) // New: Loading state
  const [totalPrice, setTotalPrice] = useState(basePrice.toString())
  const [paid, setPaid] = useState(false)

  // Validation: Check if form is full AND not currently calculating distance
  const canPay = formData.name && formData.email && formData.location && formData.date && formData.time && !isCalculating;

  const handleLocationBlur = async () => {
    if (!formData.location) return
    setIsCalculating(true) // Start loading

    try {
      const fetchCoords = async (q) => {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`)
        const data = await res.json()
        return data[0]
      }

      const base = await fetchCoords(BASE_LOCATION)
      const user = await fetchCoords(formData.location)

      if (base && user) {
        const R = 6371 // Earth's radius
        const dLat = ((user.lat - base.lat) * Math.PI) / 180
        const dLon = ((user.lon - base.lon) * Math.PI) / 180
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(base.lat * Math.PI / 180) * Math.cos(user.lat * Math.PI / 180) * Math.sin(dLon / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c
        
        const extra = distance > INCLUDED_KM ? (distance - INCLUDED_KM) * PRICE_PER_KM : 0
        setDistanceKm(distance.toFixed(1))
        setTotalPrice((basePrice + extra).toFixed(2))
      }
    } catch (error) {
      console.error("Location error:", error)
    } finally {
      setIsCalculating(false) // Stop loading
    }
  }

  return (
    <section className="page-section booking-container">
      <div className="booking-card">
        <h2>Book Your Session</h2>
        <p className="selected-package">Package: <strong>{packageName}</strong> — €{basePrice}</p>

        {!paid ? (
          <>
            <form className="contact-form">
              <input name="name" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input name="email" type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input 
                name="location" 
                placeholder="Event Address (Street, City)" 
                onBlur={handleLocationBlur}
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
              />
              <div className="date-time">
                <input type="date" name="date" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                <input type="time" name="time" onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>
            </form>

            <div className="price-summary">
              <div className="price-line"><span>Base Price:</span> <span>€{basePrice}</span></div>
              {distanceKm && (
                <div className="price-line">
                  <span>Travel ({distanceKm} km):</span> 
                  <span>€{(totalPrice - basePrice).toFixed(2)}</span>
                </div>
              )}
              <div className="total-line"><h3>Total: €{totalPrice}</h3></div>
              {isCalculating && <p className="calculating-text">Calculating travel fees...</p>}
            </div>

            <div className="paypal-container">
              <PayPalScriptProvider options={{ "client-id": "sb", currency: "EUR" }}>
                <PayPalButtons
                  disabled={!canPay}
                  forceReRender={[totalPrice]} // Important: Redraws button if price changes
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: totalPrice } }],
                    })
                  }}
                  onApprove={(data, actions) => actions.order.capture().then(() => setPaid(true))}
                />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          <div className="success-message">
            <h3>🚀 Flight Reserved!</h3>
            <p>Check your email for confirmation. We'll be in touch soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Booking