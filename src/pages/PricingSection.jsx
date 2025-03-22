import React from 'react';
import { useNavigate } from "react-router-dom";
const PricingSection = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2>Choose Your Plan</h2>
        <p>Find the perfect plan for your communication needs</p>
      </div>
      
      <div className="pricing-grid">
        <div className="pricing-card basic">
          <div className="pricing-card-header">
            <h3>Basic</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">0</span>
              <span className="period">/month</span>
            </div>
          </div>
          <div className="pricing-card-body">
            <ul className="features-list">
              <li>Up to 5 active chats</li>
              <li>Basic messaging features</li>
              <li>7-day message history</li>
              <li>Email sharing (5 invites/day)</li>
              <li>Mobile access</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button className="plan-button">Get Started</button>
          </div>
        </div>
        
        <div className="pricing-card premium">
          <div className="popular-badge">Most Popular</div>
          <div className="pricing-card-header">
            <h3>Premium</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">9.99</span>
              <span className="period">/month</span>
            </div>
          </div>
          <div className="pricing-card-body">
            <ul className="features-list">
              <li>Unlimited active chats</li>
              <li>Advanced messaging features</li>
              <li>30-day message history</li>
              <li>Email sharing (50 invites/day)</li>
              <li>File sharing up to 100MB</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button className="plan-button featured">Subscribe Now</button>
          </div>
        </div>
        
        <div className="pricing-card business">
          <div className="pricing-card-header">
            <h3>Business</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">24.99</span>
              <span className="period">/month</span>
            </div>
          </div>
          <div className="pricing-card-body">
            <ul className="features-list">
              <li>Unlimited everything</li>
              <li>Team management tools</li>
              <li>Unlimited message history</li>
              <li>Custom branding options</li>
              <li>File sharing up to 1GB</li>
              <li>API access</li>
              <li>24/7 dedicated support</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button className="plan-button">Contact Sales</button>
          </div>
        </div>
      </div>
      
      <div className="pricing-footer">
        <div className="guarantee-badge">
          <span className="guarantee-icon">✓</span>
          <span className="guarantee-text">30-Day Money Back Guarantee</span>
        </div>
        <p className="pricing-note">All plans include our core features: real-time messaging, mobile access, and basic encryption</p>
      </div>
    </section>
  );
};

export default PricingSection;