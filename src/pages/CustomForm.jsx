import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export default function CustomForm() {
  const navigate = useNavigate()

  // Base package tiers
  const BASE_PACKAGES = {
    Starter: { name: "Starter Flight", base: 275 },
    Cinematic: { name: "Cinematic Premium", base: 650 },
    Commercial: { name: "Commercial Production", base: 1350 },
  }

  // Feature prices
  const PRICE_RAW = 30.0
  const PRICE_EXTRA_CLIP = 20.0
  const PRICE_COLOR_GRADING = 80.0
  const PRICE_LICENSE_MUSIC = 50.0

  // Form states
  const [basePackage, setBasePackage] = useState("Starter")
  const [duration, setDuration] = useState(30)
  const [extraClips, setExtraClips] = useState(0)
  const [colorGrading, setColorGrading] = useState(true)
  const [licensedMusic, setLicensedMusic] = useState(false)
  const [rawFootage, setRawFootage] = useState(false)
  const [notes, setNotes] = useState("")

  // 💶 Price calculator
  const calcPrice = () => {
    let basePrice = BASE_PACKAGES[basePackage].base

    // Duration effect: every 30 min adds 10% of base
    const extraTime = Math.max(0, (duration - 30) / 30)
    basePrice += extraTime * (BASE_PACKAGES[basePackage].base * 0.1)

    if (colorGrading) basePrice += PRICE_COLOR_GRADING
    if (licensedMusic) basePrice += PRICE_LICENSE_MUSIC
    if (rawFootage) basePrice += PRICE_RAW
    basePrice += extraClips * PRICE_EXTRA_CLIP

    return basePrice.toFixed(2)
  }

  const totalPrice = calcPrice()

  const handleContinue = (e) => {
    e.preventDefault()
    const summary = {
      basePackage,
      duration,
      extraClips,
      colorGrading,
      licensedMusic,
      rawFootage,
      notes,
    }

    const query = new URLSearchParams({
      package: "Custom Project",
      price: totalPrice,
      summary: encodeURIComponent(JSON.stringify(summary)),
    })

    navigate(`/booking?${query.toString()}`)
  }

  return (
    <section className="page-section">
      <h2 className="page-title">🎛️ Create Your Custom Drone Package</h2>
      <p className="page-subtitle">
        Start from one of our base packages and add features to fit your exact needs.
        You’ll see the live price update below.
      </p>

      <form className="custom-form" onSubmit={handleContinue}>
        {/* Base package select */}
        <label>Choose base package:</label>
        <select
          value={basePackage}
          onChange={(e) => setBasePackage(e.target.value)}
        >
          {Object.entries(BASE_PACKAGES).map(([key, pkg]) => (
            <option key={key} value={key}>
              {pkg.name} — €{pkg.base}
            </option>
          ))}
        </select>

        {/* Duration */}
        <label>
          Flight duration: <strong>{duration} min</strong>
        </label>
        <input
          type="range"
          min="30"
          max="240"
          step="30"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        {/* Options */}
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              checked={colorGrading}
              onChange={() => setColorGrading(!colorGrading)}
            />
            Advanced color grading (+€{PRICE_COLOR_GRADING})
          </label>
          <label>
            <input
              type="checkbox"
              checked={licensedMusic}
              onChange={() => setLicensedMusic(!licensedMusic)}
            />
            Licensed music (+€{PRICE_LICENSE_MUSIC})
          </label>
          <label>
            <input
              type="checkbox"
              checked={rawFootage}
              onChange={() => setRawFootage(!rawFootage)}
            />
            Include raw footage (+€{PRICE_RAW})
          </label>
        </div>

        {/* Extra clips */}
        <label>
          Additional edited clips: <strong>{extraClips}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={extraClips}
          onChange={(e) => setExtraClips(Number(e.target.value))}
        />

        {/* Notes */}
        <label>Special requests or project notes:</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. event type, location, or filming ideas..."
        />

        {/* Total price */}
        <div
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
            marginTop: "1rem",
            color: "#00BFFF",
          }}
        >
          Estimated Price: €{totalPrice}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button type="submit" className="btn primary">
            Continue to Booking
          </button>
        </div>
      </form>
    </section>
  )
}
