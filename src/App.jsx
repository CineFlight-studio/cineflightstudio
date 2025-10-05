import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Portfolio from "./pages/Portfolio"
import Drones from "./pages/Drones"
import Contact from "./pages/Contact"
import "./App.css"

function App() {
  return (
    <div className="app">
      {/* Navigation bar */}
      <Navbar />

      {/* Page routes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CineFlight Studio</p>
      </footer>
    </div>
  )
}

export default App
