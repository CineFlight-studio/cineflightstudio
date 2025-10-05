export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" })
    }

    // 👉 Here you could send an email or save to a DB.
    // For now, we’ll just log the data.
    console.log("📩 New contact message:", { name, email, message })

    // Respond success to the frontend
    return res.status(200).json({ success: true, message: "Message received!" })
  } catch (err) {
    console.error("❌ Error in /api/contact:", err)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}
