import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    // Send message to YOU
    await resend.emails.send({
      from: 'CineFlight Studio <onboarding@resend.dev>',
      to: 'cineflight.studio@gmail.com',
      subject: `📩 New message from ${name}`,
      html: `
        <h3>New contact form submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    // Auto-reply to customer
    await resend.emails.send({
      from: 'CineFlight Studio <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for reaching out to CineFlight Studio 🚁',
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for your message! We'll get back to you as soon as possible.</p>
        <p>Best,<br>The CineFlight Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
