// src/pages/CustomForm.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export default function CustomForm() {
  const navigate = useNavigate()

  // base values
  const BASE_PRICE = 30.0
  const PRICE_PER_30MIN = 60.0        // per 30min step after base 30min
  const PRICE_EDITING = 80.0
  const PRICE_COLOR = 60.0
  const PRICE_RAW = 10.0              // small fee for raw footage delivery
  const PRICE_PER_EXTRA_CLIP = 12.0
  const PRICE_PER_KM_TRAVEL = 0.6     // example: €0.6 / km travel beyond included radius

  const [durationMins, setDurationMins] = useState(30) // slider: 30,60,90,120...
  const [editing, setEditing] = useState(true)
  const [colorGrade, setColorGrade] = useState(true)
  const [rawFootage, setRawFootage] = useState(false)
  const [extraClips, setExtraClips] = useState(0)
  const [travelKm, setTravelKm] = useState(0)
  const [notes, setNotes] = useState("")

  // price calculator
  const calcPrice = () => {
    let price = BASE_PRICE

    // Add duration price: every 30min after the first 30 adds PRICE_PER_30MIN
    const extra30Steps = Math.max(0, Math.floor((durationMins - 30) / 30))
    price += extra30Steps * PRICE_PER_30MIN

    if (editing) price += PRICE_EDITING
    if (colorGrade) price += PRICE_COLOR
    if (rawFootage) price += PRICE_RAW
    price += extraClips * PRICE_PER_EXTRA_CLIP

    // travel cost only applied if travelKm > 10 (example); adjust as you like
    const INCLUDED_KM = 10
    if (travelKm > INCLUDED_KM) {
      price += (travelKm - INCLUDED_KM) * PRICE_PER_KM_TRAVEL
    }

    // round to two decimals
    return price.toFixed(2)
  }

  const price = calcPrice()

  const handleContinue = (e) => {
    e.preventDefault()
    // Prepare summary to pass to booking page
    const summary = {
      durationMins,
      editing,
      colorGrade,
      rawFootage,
      extraClips,
      travelKm,
      notes,
    }

    // Pass via querystring (price + encoded summary)
    const query = new URLSearchParams({
      package: "custom",
      price,
      summary: encodeURIComponent(JSON.stringify(summary)),
    })

    navigate(`/booking?${query.toString()}`)
  }

  return (
    <section className="page-section">
      <h2 className="page-title">🎛️ Build Your Custom Package</h2>
      <p className="page-subtitle">
        Create a tailored drone package — start from <strong>€30</strong>. Adjust duration, editing, color grading and extras. Press <strong>Continue to Booking</strong> to fill your contact details and pay.
      </p>

      <form className="custom-form" onSubmit={handleContinue}>
        <label>
          Flight duration: <strong>{durationMins} min</strong>
        </label>
        <input
          type="range"
          min="30"
          max="240"
          step="30"
          value={durationMins}
          onChange={(e) => setDurationMins(Number(e.target.value))}
        />

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

        <div className="checkbox-row">
          <label>
            <input type="checkbox" checked={rawFootage} onChange={() => setRawFootage(!rawFootage)} />
            Raw footage (raw files delivery)
          </label>
        </div>

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

        <label>
          Travel beyond {10} km (approx): <strong>{travelKm} km</strong>
        </label>
        <input
          type="range"
          min="0"
          max="300"
          step="1"
          value={travelKm}
          onChange={(e) => setTravelKm(Number(e.target.value))}
        />

        <label>
          Notes / location / special requests:
        </label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. event address, preferred shots, time of day..."
        />

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
