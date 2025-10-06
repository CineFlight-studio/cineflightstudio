import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" })
  }

  try {
    // ✉️ Create transporter (your Gmail account)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // set in Vercel
        pass: process.env.EMAIL_PASS, // app password (not your Gmail password!)
      },
    })

    // 📨 1. Send email to you
    await transporter.sendMail({
      from: `"CineFlight Studio" <${process.env.EMAIL_USER}>`,
      to: "cineflight.studio@gmail.com", // your email
      subject: `📩 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    })

    // 🤖 2. Send automatic reply to customer
    await transporter.sendMail({
      from: `"CineFlight Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎬 Thank you for contacting CineFlight Studio!",
      text: `Hi ${name},\n\nThank you for reaching out to CineFlight Studio! We’ve received your message and will respond as soon as possible.\n\nBest regards,\nThe CineFlight Team 🚀`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
