import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export default function CustomForm() {
  const navigate = useNavigate()

  const BASE = 30
  const EDITING = 80
  const COLOR = 60
  const RAW = 30

  const [options, setOptions] = useState({
    editing: true,
    color: false,
    raw: false,
  })

  const price =
    BASE +
    (options.editing ? EDITING : 0) +
    (options.color ? COLOR : 0) +
    (options.raw ? RAW : 0)

  const goBooking = () => {
    navigate(`/booking?package=custom&price=${price}`)
  }

  return (
    <section className="page-section">
      <h2>Custom Drone Package</h2>
      <p>Build a package based on our professional services</p>

      <label>
        <input type="checkbox" checked={options.editing}
          onChange={() => setOptions({ ...options, editing: !options.editing })} />
        Professional editing
      </label>

      <label>
        <input type="checkbox" checked={options.color}
          onChange={() => setOptions({ ...options, color: !options.color })} />
        Advanced color grading
      </label>

      <label>
        <input type="checkbox" checked={options.raw}
          onChange={() => setOptions({ ...options, raw: !options.raw })} />
        Raw footage delivery (+€30)
      </label>

      <h3>Total: €{price}</h3>

      <button className="btn primary" onClick={goBooking}>
        Continue to Booking
      </button>
    </section>
  )
}
