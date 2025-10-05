import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" })
    }

    // Send email to YOU (your address)
    await resend.emails.send({
      from: "CineFlight Studio <cineflight.studio@gmail.com>", // domain can be your own or default resend.dev domain
      to: "cineflight.studio@gmail.com", // <-- replace with your real email
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New message from CineFlight contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    })

    // Auto-reply to customer
    await resend.emails.send({
      from: "CineFlight Studio <cineflight.studio@gmail.com>",
      to: email,
      subject: "📸 We received your message!",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out to <strong>CineFlight Studio</strong>! ✈️</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>CineFlight Studio Team</p>
      `,
    })

    console.log("📩 Email sent successfully")

    return res.status(200).json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}
