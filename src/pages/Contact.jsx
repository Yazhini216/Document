import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    sending: false,
    sent: false,
    error: null
  });

  // API base URL - adjust based on your environment
  const API_BASE_URL = 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        sending: false,
        sent: false,
        error: 'Please fill out all required fields'
      });
      setTimeout(() => setFormStatus({ sending: false, sent: false, error: null }), 3000);
      return;
    }
    
    // Validate email
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormStatus({
        sending: false,
        sent: false,
        error: 'Please enter a valid email address'
      });
      setTimeout(() => setFormStatus({ sending: false, sent: false, error: null }), 3000);
      return;
    }
    
    // Set sending state
    setFormStatus({
      sending: true,
      sent: false,
      error: null
    });
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        setFormStatus({
          sending: false,
          sent: true,
          error: null
        });
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Show success message temporarily
        setTimeout(() => {
          setFormStatus({
            sending: false,
            sent: false,
            error: null
          });
        }, 5000);
      } else {
        // API returned an error
        setFormStatus({
          sending: false,
          sent: false,
          error: data.message || 'Failed to send message'
        });
        
        setTimeout(() => {
          setFormStatus({
            sending: false,
            sent: false,
            error: null
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({
        sending: false,
        sent: false,
        error: 'Network error: Could not connect to server'
      });
      
      setTimeout(() => {
        setFormStatus({
          sending: false,
          sent: false,
          error: null
        });
      }, 5000);
    }
  };

  return (
    <div className="contact-container">
      <header className="main-header">
        <div className="header-content">
          <h1>Connect & Collaborate</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">Features</a></li>
              <li><a href="/price">Pricing</a></li>
              <li><a href="/contact" className="active">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="content-wrapper">
        <section className="contact-hero-section">
          <div className="contact-hero-content">
            <h2>Get in Touch</h2>
            <p>
              Have questions about our services or need assistance? 
              We're here to help! Reach out to our team using the form below, and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        <section className="contact-info-section">
          <div className="contact-grid">
            <div className="contact-info-card">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
              
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>support@connectcollaborate.com</p>
              <p>info@connectcollaborate.com</p>
            </div>
            
            
          </div>
        </section>

        <section className="contact-form-section">
          <div className="contact-form-container full-width">
            <h3>Send Us a Message</h3>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required 
                    disabled={formStatus.sending}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required 
                    disabled={formStatus.sending}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?" 
                  disabled={formStatus.sending}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..." 
                  rows="5" 
                  required 
                  disabled={formStatus.sending}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${formStatus.sending ? 'sending' : ''}`}
                disabled={formStatus.sending}
              >
                {formStatus.sending ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus.sent && <div className="success-message">Your message has been sent successfully! We'll be in touch soon.</div>}
              {formStatus.error && <div className="error-message">{formStatus.error}</div>}
            </form>
          </div>
        </section>
        
        <section className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What is Connect & Collaborate?</h4>
              <p>Connect & Collaborate is a real-time communication platform designed to help teams and individuals connect through instant messaging, collaborative tools, and more.</p>
            </div>
            
            <div className="faq-item">
              <h4>Is there a free trial available?</h4>
              <p>Yes! We offer a 14-day free trial of our premium features. No credit card required to start.</p>
            </div>
            
            <div className="faq-item">
              <h4>How secure is the platform?</h4>
              <p>We prioritize your privacy and security with end-to-end encryption, secure data storage, and strict access controls.</p>
            </div>
            
            <div className="faq-item">
              <h4>Can I use Connect & Collaborate on mobile?</h4>
              <p>Absolutely! Our platform is fully responsive and works on all devices, including smartphones and tablets.</p>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2025 Communication Platform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;