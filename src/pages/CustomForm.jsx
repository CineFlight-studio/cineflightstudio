import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export default function CustomForm() {
  const navigate = useNavigate()

  // ===== Base Pricing =====
  const BASE_PRICE = 30.0
  const PRICE_PER_10MIN = 6.0          // per 10min step after base 10min
  const PRICE_EDITING = 80.0
  const PRICE_COLOR = 60.0
  const PRICE_RAW = 10.0
  const PRICE_PER_EXTRA_CLIP = 12.0
  const PRICE_PER_KM_TRAVEL = 0.6      // €0.6 / km beyond included radius
  const INCLUDED_KM = 10

  // ===== Form States =====
  const [durationMins, setDurationMins] = useState(10) // slider: 10–180 min
  const [editing, setEditing] = useState(true)
  const [colorGrade, setColorGrade] = useState(true)
  const [rawFootage, setRawFootage] = useState(false)
  const [extraClips, setExtraClips] = useState(0)
  const [travelKm, setTravelKm] = useState(0)
  const [notes, setNotes] = useState("")

  // ===== Price Calculation =====
  const calcPrice = () => {
    let price = BASE_PRICE

    // Add duration cost: every 10min after the first adds PRICE_PER_10MIN
    const extraSteps = Math.max(0, Math.floor((durationMins - 10) / 10))
    price += extraSteps * PRICE_PER_10MIN

    if (editing) price += PRICE_EDITING
    if (colorGrade) price += PRICE_COLOR
    if (rawFootage) price += PRICE_RAW
    price += extraClips * PRICE_PER_EXTRA_CLIP

    // travel cost only beyond included radius
    if (travelKm > INCLUDED_KM) {
      price += (travelKm - INCLUDED_KM) * PRICE_PER_KM_TRAVEL
    }

    return price.toFixed(2)
  }

  const price = calcPrice()

  // ===== Continue to Booking =====
  const handleContinue = (e) => {
    e.preventDefault()

    const summary = {
      durationMins,
      editing,
      colorGrade,
      rawFootage,
      extraClips,
      travelKm,
      notes,
    }

    const query = new URLSearchParams({
      package: "custom",
      price,
      summary: encodeURIComponent(JSON.stringify(summary)),
    })

    navigate(`/booking?${query.toString()}`)
  }

  // ===== UI =====
  return (
    <section className="page-section">
      <h2 className="page-title">🎛️ Build Your Custom Package</h2>
      <p className="page-subtitle">
        Create a tailored drone project starting from <strong>€30</strong>.  
        Adjust flight time, editing, color grading, and extras.  
        Click <strong>Continue to Booking</strong> to enter your info and pay.
      </p>

      <form className="custom-form" onSubmit={handleContinue}>
        {/* Flight Duration */}
        <label>
          Flight duration: <strong>{durationMins} min</strong>
        </label>
        <input
          type="range"
          min="10"
          max="180"
          step="10"
          value={durationMins}
          onChange={(e) => setDurationMins(Number(e.target.value))}
        />

        {/* Editing Options */}
        <div className="checkbox-row">
          <label>
            <input type="checkbox" checked={editing} onChange={() => setEditing(!editing)} />
            Professional editing (cuts + basic color)
          </label>
          <label>
            <input type="checkbox" checked={colorGrade} onChange={() => setColorGrade(!colorGrade)} />
            Advanced color grading
          </label>
        </div>

        {/* Raw Footage */}
        <div className="checkbox-row">
          <label>
            <input type="checkbox" checked={rawFootage} onChange={() => setRawFootage(!rawFootage)} />
            Raw footage delivery (+€10)
          </label>
        </div>

        {/* Extra Clips */}
        <label>
          Extra edited clips: <strong>{extraClips}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={extraClips}
          onChange={(e) => setExtraClips(Number(e.target.value))}
        />

        {/* Travel Distance */}
        <label>
          Travel beyond {INCLUDED_KM} km: <strong>{travelKm} km</strong>
        </label>
        <input
          type="range"
          min="0"
          max="300"
          step="1"
          value={travelKm}
          onChange={(e) => setTravelKm(Number(e.target.value))}
        />

        {/* Notes */}
        <label>Notes / location / special requests:</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. event address, preferred shots, time of day..."
        />

        {/* Total Price */}
        <div className="custom-price">
          <p>
            <strong>Estimated price:</strong> €<span className="price-highlight">{price}</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "1rem" }}>
          <button type="submit" className="btn primary">
            Continue to Booking
          </button>
        </div>
      </form>
    </section>
  )
}
