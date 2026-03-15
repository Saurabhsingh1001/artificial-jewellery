import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire this to an email service
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out anytime.</p>
      </div>

      <div className="contact-page container">
        {/* Info Cards */}
        <div className="contact-info-grid">
          {[
            { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
            { icon: '✉️', label: 'Email', value: 'info@shringaar.in' },
            { icon: '📍', label: 'Address', value: 'Mumbai, Maharashtra, India' },
            { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 10am–7pm' },
          ].map((item) => (
            <div className="contact-info-card" key={item.label}>
              <div className="contact-info-icon">{item.icon}</div>
              <div>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="contact-form-section">
          <h2>Send a Message</h2>
          <div className="divider" style={{ margin: '0.75rem 0 1.5rem' }}></div>
          {submitted ? (
            <div className="alert alert-success">
              ✅ Thank you! We'll get back to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here…" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
