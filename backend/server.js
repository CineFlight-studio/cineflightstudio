// backend/server.js
import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Contact route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    // Setup transporter (Gmail + App Password required!)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cineflight.studio@gmail.com",   // your Gmail
        pass: "dbmbozogithbhgpp"               // your Gmail App Password
      }
    })

    // Send email
    let info = await transporter.sendMail({
      from: "cineflight.studio@gmail.com",     // must be your Gmail
      to: "cineflight.studio@gmail.com",       // where you want to receive messages
      subject: "📩 New Contact Form Submission",
      text: `
        You have a new message from CineFlight Studio:

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      replyTo: email // lets you click "Reply" in Gmail
    })

    console.log("✅ Email sent:", info.response)
    res.status(200).json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("❌ Nodemailer Error:", error.message)
    if (error.response) {
      console.error("📨 SMTP Response:", error.response)
    }
    res.status(500).json({ success: false, error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
