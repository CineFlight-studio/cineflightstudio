import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "./Pages.css";

function Contact() {
  // Replace YOUR_FORM_ID with the code from Formspree
  const [state, handleSubmit] = useForm("https://formspree.io/f/xpqjdqpo");

  if (state.succeeded) {
    return (
      <section className="page-section contact-page">
        <div className="success-card">
          <h2>🚀 Message Sent!</h2>
          <p>Thanks for reaching out. We'll get back to you at CineFlight Studio as soon as possible.</p>
          <button onClick={() => window.location.reload()} className="btn">Send another</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section contact-page">
      <div className="container">
        <header className="section-header">
          <h2>Contact Us</h2>
          <p>Ready for takeoff? Send us a message for bookings or inquiries.</p>
        </header>

        <div className="contact-grid">
          {/* Business Info */}
          <div className="contact-info">
            <div className="info-item">
              <h4>Email</h4>
              <a href="mailto:cineflight.studio@gmail.com">cineflight.studio@gmail.com</a>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <a href="tel:+31626397234">+31 626 397 234</a>
            </div>
            <div className="info-item">
              <h4>Location</h4>
              <p>Venlo, Netherlands</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <div className="field-wrap">
                  <label htmlFor="full-name">Name</label>
                  <input id="full-name" type="text" name="name" placeholder="John Doe" required />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="field-wrap">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" name="email" placeholder="john@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div className="field-wrap">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button type="submit" className="btn submit-btn" disabled={state.submitting}>
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
              
              {state.errors && <p className="error-text">Oops! There was an error. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;