import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export default function CustomForm() {
  const navigate = useNavigate()

  // --- Base prices for each feature ---
  const BASE_PRICE = 30.0 // starting price if only raw footage
  const PRICE_PER_10MIN = 20.0
  const PRICE_EDIT_CLIP = 25.0
  const PRICE_COLOR = 60.0
  const PRICE_MUSIC = 50.0
  const PRICE_MOTION = 90.0
  const PRICE_RAW_ONLY = 30.0

  // --- User selections ---
  const [duration, setDuration] = useState(10)
  const [editClips, setEditClips] = useState(0)
  const [color, setColor] = useState(false)
  const [music, setMusic] = useState(false)
  const [motion, setMotion] = useState(false)
  const [raw, setRaw] = useState(false)
  const [notes, setNotes] = useState("")

  // --- Price calculation ---
  const calcPrice = () => {
    let price = BASE_PRICE

    // Flight time pricing (after 10 min)
    const extraSteps = Math.max(0, (duration - 10) / 10)
    price += extraSteps * PRICE_PER_10MIN

    if (editClips > 0) price += editClips * PRICE_EDIT_CLIP
    if (color) price += PRICE_COLOR
    if (music) price += PRICE_MUSIC
    if (motion) price += PRICE_MOTION
    if (raw && editClips === 0 && !color && !music && !motion) {
      // raw footage only
      price = PRICE_RAW_ONLY
    }

    return price.toFixed(2)
  }

  const total = calcPrice()

  const handleSubmit = (e) => {
    e.preventDefault()
    const summary = {
      duration,
      editClips,
      color,
      music,
      motion,
      raw,
      notes,
    }

    const query = new URLSearchParams({
      package: "Custom Project",
      price: total,
      summary: encodeURIComponent(JSON.stringify(summary)),
    })

    navigate(`/booking?${query.toString()}`)
  }

  return (
    <section className="page-section">
      <h2 className="page-title">🎬 Customize Your Drone Package</h2>
      <p className="page-subtitle">
        Select exactly what you need — from raw footage only to a full cinematic production.
      </p>

      <form className="custom-form" onSubmit={handleSubmit}>
        {/* Flight duration */}
        <label>
          Flight duration: <strong>{duration} min</strong>
        </label>
        <input
          type="range"
          min="10"
          max="180"
          step="10"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        {/* Edited clips */}
        <label>
          Number of edited clips: <strong>{editClips}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={editClips}
          onChange={(e) => setEditClips(Number(e.target.value))}
        />

        {/* Feature options */}
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              checked={color}
              onChange={() => setColor(!color)}
            />
            Color grading (+€{PRICE_COLOR})
          </label>

          <label>
            <input
              type="checkbox"
              checked={music}
              onChange={() => setMusic(!music)}
            />
            Licensed music (+€{PRICE_MUSIC})
          </label>

          <label>
            <input
              type="checkbox"
              checked={motion}
              onChange={() => setMotion(!motion)}
            />
            Motion graphics / logo intro (+€{PRICE_MOTION})
          </label>

          <label>
            <input
              type="checkbox"
              checked={raw}
              onChange={() => setRaw(!raw)}
            />
            Raw footage only (+€{PRICE_RAW_ONLY})
          </label>
        </div>

        {/* Notes */}
        <label>Notes / project details:</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe your idea or project..."
        />

        {/* Total */}
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "1.5rem",
            color: "#00BFFF",
            fontWeight: "bold",
          }}
        >
          Estimated Price: €{total}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button type="submit" className="btn primary">
            Continue to Booking
          </button>
        </div>
      </form>
    </section>
  )
}
