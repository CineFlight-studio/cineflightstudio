import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, message } = req.body;

  try {
    // Send message to your Gmail
    await resend.emails.send({
      from: 'CineFlight Studio <onboarding@resend.dev>', // verified sender
      to: 'jarinosrank@gmail.com', // your Gmail
      subject: `📩 New message from ${name}`,
      html: `
        <h2>New Message from CineFlight Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // Auto-reply to the customer
    await resend.emails.send({
      from: 'CineFlight Studio <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for contacting CineFlight Studio 🚁',
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out! We’ve received your message and will get back to you shortly.</p>
        <p>– The CineFlight Studio Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
